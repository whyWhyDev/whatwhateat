/**
 * ************************************
 *
 * @module  MainContainer
 * @author
 * @date
 * @description stateful component that renders TotalsDisplay and RecipesContainer
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import RecipesContainer from './RecipesContainer';

const mapStateToProps = (state) => ({
  recipesList: state.recipes.recipesList,
});

// const MainContainer = (props) => (
//   <div className="container">
//     <div className="outerBox">
//       <h1 id="header">whatWhatEat?</h1>
//       <h2>{recipesList}</h2>
//       {/* <RecipesContainer /> */}
//     </div>
//   </div>
// );
class MainContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="outerBox">
          <h1 id="header">whatWhatEat?</h1>
          {/* <h2>{recipesList}</h2> */}
          {/* <RecipesContainer /> */}
        </div>
      </div>
    );
  }
}
// export default MainContainer;
export default connect(mapStateToProps)(MainContainer);
