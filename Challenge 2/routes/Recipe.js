// server/routes/recipeRoutes.js
import express from "express"
const router = express.Router();
import { getRecipes,addRecipe } from "../controller/RecipeController.js";

// Retrieve all recipes
router.get('/', getRecipes);

// Add a new favorite recipe manually
router.post('/', addRecipe);

export default router