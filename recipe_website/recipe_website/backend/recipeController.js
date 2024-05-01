const axios = require('axios');
const Recipe = require('../backend/models/Recipe'); // Correct path

exports.saveRecipe = async (req, res) => {
  const { id, title, image, cuisines, ingredients, instructions, dietaryPreferences, cookingTime, difficulty, nutritionalInfo, healthBenefits, ratings, shoppingList, pricePerServing, spoonacularScore } = req.body;
  try {
      let recipe = await Recipe.findOne({ id });
      if (recipe) {
          return res.status(400).json({ msg: 'Recipe already exists' });
      }
      const newRecipe = new Recipe({ 
        id, 
        title, 
        image, 
        cuisines, 
        ingredients, 
        instructions, 
        dietaryPreferences, 
        cookingTime, 
        difficulty, 
        nutritionalInfo, 
        healthBenefits, 
        ratings,
        shoppingList, 
        pricePerServing,
        spoonacularScore
      });
      await newRecipe.save();
      res.json({ msg: 'Recipe saved successfully' });
  } catch (error) {
      console.error('Error saving the recipe:', error);
      res.status(500).json({ msg: 'Failed to save the recipe', error });
  }
};
exports.getRecipes = async (req, res) => {
  try {
      const recipes = await Recipe.find({});
      res.json(recipes);
  } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ msg: 'Failed to fetch recipes', error });
  }
};

exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findOneAndDelete({ id });
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.json({ msg: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting the recipe:', error);
    res.status(500).json({ msg: 'Failed to delete the recipe', error });
  }
};