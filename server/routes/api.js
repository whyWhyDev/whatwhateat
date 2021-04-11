const express = require('express');
const router = express.Router();
const path = require('path');
const recipesController = require('../controllers/recipesController');
const mongooseController = require('../controllers/mongooseController');
const oAuthController = require('../controllers/Oatuh');

// router.get('/recipe/:type', recipesController.getRecipe, (req, res) => {
//   res.status(200).json(res.locals.recipe);
// });

router.get('/recipes/:type', recipesController.updateRecipe, (req, res) => {
  res.status(200).json(res.locals.recipe);
});

router.get('/recipes', recipesController.getRecipes, (req, res) => {
  res.status(200).json(res.locals.recipes);
});

router.get('/login', oAuthController.getCode, (req, res) => {
  return res.redirect('/');
});

router.get('/poopcoins', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

router.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

module.exports = router;
