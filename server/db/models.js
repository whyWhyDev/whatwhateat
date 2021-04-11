const mongoose = require('mongoose');

// const MONGO_URI = 'mongodb+srv://WhyWhyDev:happyjs@cluster0.eprir.mongodb.net/Cluster0?retryWrites=true&w=majority';
const MONGO_URI = 'mongodb://localhost/WWE';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`Connected to Mongo DB. ${MONGO_URI}`))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// const recipeSchema = new Schema({
//   Title: { type: String, required: true },
//   ID: Number,
//   Vegetarian: String,
//   Vegan: String,
//   GlutenFree: String,
//   DairyFree: String,
//   HealthScore: Number,
//   ReadyInMinutes: Number,
//   Servings: Number,
//   Summary: String,
//   Image: String,
// });

const recipeSchema = new Schema({
  Type: { type: Object, required: true },
});

const Recipe = mongoose.model('recipe', recipeSchema);
// exports all the models in an object to be used in the controller
module.exports = { Recipe };
