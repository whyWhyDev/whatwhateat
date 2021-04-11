const modals = require('../db/models');

const mongooseController = {};

mongooseController.getRecipes = (req, res, next) => {
  modals.Recipe.find({}, (err, result) => {
    if (err) return next(err);
    console.log(result);
    if (result[0]) {
      res.locals.recipes = { ...result };
      return;
    } else {
      return next();
    }
  });
};

mongooseController.saveRecipes = (req, res, next) => {
  const tempObj = res.locals.recipes;
  for (let obj of tempObj) {
    modals.Recipe.create({ [obj]: tempObj[obj] });
  }
  return next();
};

module.exports = mongooseController;
