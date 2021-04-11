/**
 * ************************************
 *
 * @module  RecipesContainer
 * @author
 * @date
 * @description component that renders MarketCreator and MarketDisplay
 *
 * ************************************
 */

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';
import TopPlan from '../components/TopPlan';
// import MiddlePlan from '../components/MiddlePlan';
// import BottomPlan from '../components/BottomPlan';

const mapStateToProps = ({ recipes }) => ({
  // getReceip: recipes.getReceip,
  recipesList: recipes.recipesList,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

const mealTypes = [
  ['bread', 'breakfast', 'snack'],
  ['salad', 'appetizer', 'main course'],
  ['soup', 'marinade', 'dessert'],
];

const RecipesContainer = (props) => {
  const time = new Date().getHours();

  let top, middle, bottom;

  if (time >= 2 && time <= 9) {
    top = mealTypes[0];
    middle = mealTypes[1];
    bottom = mealTypes[2];
  } else if (time >= 10 && time <= 15) {
    top = mealTypes[1];
    middle = mealTypes[2];
    bottom = mealTypes[0];
  } else {
    top = mealTypes[2];
    middle = mealTypes[0];
    bottom = mealTypes[1];
  }
  return (
    <div className="innerbox">
      <h2>recipes</h2>
      <TopPlan typesList={top} recipesList={props.recipesList} />
      {/* <MiddlePlan typesList={middle} recipesList={props.recipesList} />
      <BottomPlan typesList={bottom} recipesList={props.recipesList} /> */}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesContainer);
