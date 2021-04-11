/**
 * ************************************
 *
 * @module  CardCreator
 * @author
 * @date
 * @description presentation component that takes user input for new market creation
 *
 * ************************************
 */

import React from 'react';
import LabeledText from './LabeledText';

const CardCreator = ({ recipe }) => (
  <section>
    <h3>{recipe.title}</h3>
    <img src={img} alt="Food Img" width="500" height="600"></img>
    <LabeledText label="GlutenFree:" text={recipe.glutenFree} />
    <LabeledText label="" text={} />
    <LabeledText label="" text={} />
    <LabeledText label="" text={} />
    <div className="flex">
      <button className="addCard" onClick={GarbageCoin}>
        GarbageCoin
      </button>
      <button className="deleteCard" onClick={like}>
        Like
      </button>
      <button className="deleteCard" onClick={dislike}>
        Dislike
      </button>
    </div>
  </section>
);

export default CardCreator;
