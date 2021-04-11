/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

import axios from 'axios';
import * as types from '../constants/actionTypes';

export const likeCard = (cardId) => ({
  type: types.LIKE_CARD,
  payload: cardId,
});

export const dislikeCard = (cardId) => ({
  type: types.DISLIKE_CARD,
  payload: cardId,
});

export const garbageCard = (cardId) => ({
  type: types.GARBAGE_CARD,
  payload: cardId,
});

export const loadRecipes = () => (dispatch) => {
  axios
    .get('/recipes')
    .then(({ data }) => {
      dispatch({
        type: type.LOAD_RECIPES,
        payload: data,
      });
    })
    .catch(console.error);
};

// export const getReceip = (foodtype) => (dispatch) => {
//   axios.get(`/recipes/${foodtype}`).then(({ data }) => {
//     dispatch({
//       type: types.GET_RECEIP,
//       payload: { [foodtype]: data },
//     });
//   });
// };
