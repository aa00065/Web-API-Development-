const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Correct path

/**
 * @swagger
 * /api/recipes/save:
 *   post:
 *     summary: Save a new recipe
 *     description: Adds a new recipe to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Recipe saved successfully
 *       400:
 *         description: Error saving the recipe
 */



/**
 * @swagger
 * /api/recipes/recipes:
 *   get:
 *     summary: Get all recipes
 *     description: Retrieves a list of all recipes in the database.
 *     responses:
 *       200:
 *         description: Recipes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The recipe ID
 *                   title:
 *                     type: string
 *                     description: The title of the recipe
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of ingredients for the recipe
 *       500:
 *         description: Error retrieving the recipes
 */

















/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     description: Deletes a recipe from the database based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the recipe to delete.
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Recipe not found
 *       400:
 *         description: Error deleting the recipe
 */













const { saveRecipe, deleteRecipe, getRecipes } = require('../recipeController');
router.post('/save', saveRecipe);
router.delete('/:id', deleteRecipe);
router.get('/recipes', getRecipes);

module.exports = router;
