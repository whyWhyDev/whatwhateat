/**
 * ************************************
 *
 * @module  recipesReducer
 * @author
 * @date
 * @description reducer for market data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

const initialState = {
  recipesList: {},
};

const recipesReducer = (state = initialState, action) => {
  let recipesList;
  switch (action.type) {
    case types.LOAD_RECIPES: {
      recipesList = action.payload;
      return { ...state, recipesList: recipesList };
    }

    default:
      return state;
  }
};

export default recipesReducer;
