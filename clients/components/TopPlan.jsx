/**
 * ************************************
 *
 * @module  TopPlan
 * @author
 * @date
 * @description presentation component that renders n MarketDisplay components
 *
 * ************************************
 */

import React from 'react';
import CardCreator from './CardCreator';

const TopPlan = ({ typesList, recipesList }) => {
  const topcard = typesList.map((type) => <CardCreator recipe={recipesList[type]} />);

  return { topcards };
};

export default TopPlan;
