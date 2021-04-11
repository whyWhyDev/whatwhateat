import React, { Component } from 'react';
import { render } from 'react-dom';
import tempObj from './tempObj.js';
import parse from 'html-react-parser';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  Card,
  ListGroup,
  CardGroup,
  Image,
  Accordion,
  DropdownButton,
  Dropdown,
  Nav,
  Navbar,
  Toast,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="p-3 mb-2 bg-light text-secondary">
        <HeaderBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/poopcoins" component={() => <PoopCoin />} />
            <Route exact path="/" component={() => <MainContainer />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesList: {},
      isLoaded: false,
      error: null,
    };
    this.updateRecipe = this.updateRecipe.bind(this);
  }

  componentDidMount() {
    axios.get('/recipes').then(
      (result) => {
        this.setState({
          recipesList: result.data,
          isLoaded: true,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  updateRecipe(type) {
    console.log('updateclick', type);
    axios.get(`/recipes/${type}`).then((res) => {
      console.log('update', res.data);
      this.setState({ ...this.state, recipesList: { ...this.state.recipesList, [type]: res.data } });
    });
  }

  render() {
    // console.log(this.state.recipesList);
    const { error, isLoaded, recipesList } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log('ling85', this.state.recipesList);
      return (
        <div>
          <RecipesContainer recipesList={this.state.recipesList} updateRecipe={this.updateRecipe} />
        </div>
      );
    }
  }
}

class RecipesContainer extends Component {
  render() {
    const mealTypes = [
      ['bread', 'breakfast', 'snack'],
      ['salad', 'appetizer', 'main course'],
      ['soup', 'marinade', 'dessert'],
    ];

    const time = new Date().getHours();

    let top, middle, bottom;

    if (time >= 2 && time <= 9) {
      top = [mealTypes[0], 'Breakfast'];
      middle = [mealTypes[1], 'Lunch'];
      bottom = [mealTypes[2], 'Dinner'];
    } else if (time >= 10 && time <= 15) {
      top = [mealTypes[1], 'Lunch'];
      middle = [mealTypes[2], 'Dinner'];
      bottom = [mealTypes[0], 'Breakfast'];
    } else {
      top = [mealTypes[2], 'Dinner'];
      middle = [mealTypes[0], 'Breakfast'];
      bottom = [mealTypes[1], 'Lunch'];
    }
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '50px',
        }}
      >
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              {top[1]}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Panel
                  key={'panel1'}
                  mealTypes={top[0]}
                  recipesList={this.props.recipesList}
                  updateRecipe={this.props.updateRecipe}
                />
                <br />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
              {middle[1]}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Panel
                  key={'panel2'}
                  mealTypes={middle[0]}
                  recipesList={this.props.recipesList}
                  updateRecipe={this.props.updateRecipe}
                />
                <br />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
              {bottom[1]}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Panel
                  key={'panel3'}
                  mealTypes={bottom[0]}
                  recipesList={this.props.recipesList}
                  updateRecipe={this.props.updateRecipe}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

// create row Class
class Panel extends Component {
  render() {
    const cardCreator = [];
    const mealTypes = this.props.mealTypes;
    for (let i = 0; i < mealTypes.length; i++) {
      cardCreator.push(
        <CardCreator
          className="cardCreator"
          key={`cardCreator${i}`}
          type={mealTypes[i]}
          recipeObj={this.props.recipesList[mealTypes[i]]}
          updateRecipe={this.props.updateRecipe}
        />
      );
    }
    return <CardGroup style={{ width: '50rem' }}>{cardCreator}</CardGroup>;
  }
}
// create box Class
class CardCreator extends Component {
  render() {
    const labeledText = [];
    const recipeObj = { ...this.props.recipeObj, Summary: parse(this.props.recipeObj.Summary) };
    const keyArray = Object.keys(this.props.recipeObj);
    console.log('line118', keyArray);
    for (let i = 1; i < keyArray.length - 2; i++) {
      labeledText.push(<LabeledText key={`labeledText${i}`} label={keyArray[i]} text={recipeObj[keyArray[i]]} />);
    }

    return (
      <Card border="secondary">
        <Card.Header>
          <strong>{recipeObj.Title}</strong>
        </Card.Header>
        <Image
          variant="top"
          src={recipeObj.Image}
          style={{ position: 'center', maxHeight: '80px', maxWidth: '150px' }}
          alt="Food Img"
        />
        <Card.Body>
          <Card.Text style={{ fontSize: '.6rem' }}>
            <strong>Summary: </strong>
            {recipeObj.Summary}
          </Card.Text>
          <ListGroup className="labedledText" style={{ fontSize: '.6rem' }}>
            {labeledText}
          </ListGroup>
          <br />
          <Button
            variant="outline-dark"
            onClick={() => {
              this.props.updateRecipe(this.props.type);
            }}
          >
            {' '}
            💩{' '}
          </Button>{' '}
          <Button variant="outline-warning"> 👎 </Button> <Button variant="outline-primary"> 👍 </Button>
          <DropdownButton variant="success" id="dropdown-basic-button" title="Shop All Ingredients NOW">
            <Dropdown.Item href="#/action-1">Amazon Fresh</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Stop & Shop</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Instacart</Dropdown.Item>
          </DropdownButton>
        </Card.Body>
      </Card>
    );
  }
}

function LabeledText(props) {
  return <ListGroup.Item>{`${props.label}: ${props.text}`}</ListGroup.Item>;
}

class HeaderBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand href="/about">
          <strong> WhatWhatEat</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/poopcoins">PoopCoins</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/">GitHub Login</Nav.Link>
            <Nav.Link href="/">Sing Up / Login </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class PoopCoin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '50px',
        }}
      >
        <PoopCard />
        <strong class="text-secondary">
          Proceeds will be donated to "Action Against Hunger" to fight hunger worldwide
        </strong>
        <Image
          style={{ position: 'center', maxHeight: '80px', maxWidth: '150px' }}
          src={'https://upload.wikimedia.org/wikipedia/commons/1/19/Eng_Col_RGB_-_Copy.png'}
        />
      </div>
    );
  }
}

function PoopCard(props) {
  return (
    <CardGroup>
      <Card>
        <Card.Header>First Pack</Card.Header>
        <Image style={{ position: 'center', width: '20%' }} src={'https://i.ibb.co/V30p1Dk/1535578457229.png'} />
        <ListGroup style={{ fontSize: '.7rem' }}>
          <ListGroup.Item>Price: $1.99</ListGroup.Item>
          <ListGroup.Item>Coin: 10 PoopCoins</ListGroup.Item>
          <Button variant="info">Buy Now</Button>
        </ListGroup>
      </Card>
      <Card>
        <Card.Header>Second Pack</Card.Header>
        <Image style={{ position: 'center', width: '20%' }} src={'https://i.ibb.co/V30p1Dk/1535578457229.png'} />
        <ListGroup style={{ fontSize: '.7rem' }}>
          <ListGroup.Item>Price: $9.99</ListGroup.Item>
          <ListGroup.Item>Coin: 150 PoopCoins</ListGroup.Item>
          <Button variant="info">Buy Now</Button>
        </ListGroup>
      </Card>
      <Card>
        <Card.Header>HanDump Pack</Card.Header>
        <Image style={{ position: 'center', width: '20%' }} src={'https://i.ibb.co/V30p1Dk/1535578457229.png'} />
        <ListGroup style={{ fontSize: '.7rem' }}>
          <ListGroup.Item>Price: $49.99</ListGroup.Item>
          <ListGroup.Item>Coin: 799 PoopCoins</ListGroup.Item>
          <Button variant="info">Buy Now</Button>
        </ListGroup>
      </Card>
    </CardGroup>
  );
}

// class AboutMe extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return (
//       <div>
//         <Toast>
//           <Toast.Header>
//             <img
//               src="https://i.ibb.co/tcbzrb9/kisspng-github-logo-repository-computer-icons-5afa376c51ca94-387166531526347628335.png"
//               style={{ position: 'center', maxWidth: '20px' }}
//               className="rounded mr-2"
//               alt=""
//             />
//             <strong className="mr-auto">GitHub</strong>
//             <small>just now</small>
//           </Toast.Header>
//           <Toast.Body>https://github.com/whyWhyDev</Toast.Body>
//         </Toast>
//         <Toast>
//           <Toast.Header>
//             <img
//               src="https://i.ibb.co/gzBfy74/pngwing-com.png"
//               style={{ position: 'center', maxWidth: '20px' }}
//               className="rounded mr-2"
//               alt=""
//             />
//             <strong className="mr-auto">LinkedLin</strong>
//             <small>just now</small>
//           </Toast.Header>
//           <Toast.Body>https://Linkedin.com/in/HanjiChen</Toast.Body>
//         </Toast>
//         <Toast>
//           <Toast.Header>
//             <img
//               src="https://i.ibb.co/3Wk792S/pngwing-com-1.png"
//               style={{ position: 'center', maxWidth: '20px' }}
//               className="rounded mr-2"
//               alt=""
//             />
//             <strong className="mr-auto">EMail</strong>
//             <small>just now</small>
//           </Toast.Header>
//           <Toast.Body>HChen0117@gmail.com</Toast.Body>
//         </Toast>
//       </div>
//     );
//   }
// }

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
