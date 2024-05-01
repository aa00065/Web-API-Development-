const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Correct path


const { saveRecipe, deleteRecipe, getRecipes } = require('../recipeController');
router.post('/save', saveRecipe);
router.delete('/:id', deleteRecipe);
router.get('/recipes', getRecipes);

module.exports = router;
