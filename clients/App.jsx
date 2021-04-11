/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import SignupContainer from './containers/SignupContainer.jsx';
// class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//         <MainContainer />
//       </div>
//     );
//   }
// }

const App = (props) => {
  return (
    <main className="router">
      <div>
        <Switch>
          <Route exact path="/" component={MainContainer} />
          {/* <Route exact path="/signup" component={SignupContainer} /> */}
        </Switch>
      </div>
    </main>
  );
};

export default App;
