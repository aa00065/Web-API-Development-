const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: String,
    rating: Number
});

const recipeSchema = new mongoose.Schema({
    id: String,
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: String,
    cuisines: {
        type: Array,
        required: true,
        trim: true
    },
    ingredients: [{
        name: String,
        quantity: String
    }],
    instructions: String,
    dietaryPreferences: [{
        type: String
    }],
    cookingTime: {
        type: Number, // minutes
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard']
    },
    nutritionalInfo: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fats: Number
    },
    healthBenefits: String,
    ratings: {
        averageRating: Number,
        details: [ratingSchema] 
    },
    spoonacularScore: {
        type: Number, 
    },
    pricePerServing: {
        type: Number 
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
