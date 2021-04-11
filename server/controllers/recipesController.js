const axios = require('axios');

const recipesController = {};

const recipesSorter = (obj) => {
  return {
    Title: obj.title,
    ID: obj.id,
    Vegetarian: `${obj.vegetarian}`,
    Vegan: `${obj.vegan}`,
    GlutenFree: `${obj.glutenFree}`,
    DairyFree: `${obj.dairyFree}`,
    HealthScore: obj.healthScore,
    ReadyInMinutes: obj.readyInMinutes,
    Servings: obj.servings,
    Summary: obj.summary,
    Image: obj.image,
  };
};

recipesController.getRecipes = (req, res, next) => {
  console.log('im recipesController.getRecipes');
  const mealTypes = ['bread', 'breakfast', 'snack', 'salad', 'appetizer', 'main course', 'soup', 'marinade', 'dessert'];
  // const mealTypes = ['bread'];
  const promises = mealTypes.map((type) =>
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=15b3f4802c0e4563b2bded336d9fe84e&type=${type}&addRecipeNutrition=true&fillIngredients=true&number=1`
      )
      .then((response) => {
        console.log('getinnnnnnnnnnnnn');
        phase1.push(recipesSorter(response.data.results[0]));
      })
      .catch((error) => next(error))
  );
  const phase1 = [];
  const recipes = {};
  Promise.all(promises).then((results) => {
    for (let i = 0; i < mealTypes.length; i++) {
      recipes[mealTypes[i]] = phase1[i];
    }
    console.log(recipes);
    res.locals.recipes = recipes;
    return next();
  });
  // axios
  //   .get('https://api.spoonacular.com/recipes/632347/information?apiKey=2cb2288f93d441528099bd7df94f6b1a')
  //   .then((data) => console.log(data))
  //   .catch((error) => console.log(error));
};

recipesController.updateRecipe = (req, res, next) => {
  console.log('im recipesController.updateRecipes', req.params.type);

  // const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=f470747f26984405bc334aa91f91c166&type=${req.params.type}&addRecipeNutrition=true&fillIngredients=true&number=1`;
  const url = `https://api.spoonacular.com/recipes/random?apiKey=f470747f26984405bc334aa91f91c166&number=1&tags=${req.params.type}`;
  axios
    .get(url)
    .then((result) => {
      console.log('axios result', result.data.recipes);
      res.locals.recipe = recipesSorter(result.data.recipes[0]);
      console.log(res.locals.recipe);
      console.log('im getRecipes.axios');
      return next();
    })
    .catch((error) => next(error));
};

module.exports = recipesController;
