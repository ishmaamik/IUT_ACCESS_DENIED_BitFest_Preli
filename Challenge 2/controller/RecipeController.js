// server/controllers/recipeController.js
import { Recipe } from "../model/Recipe.js";

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const addRecipe = async (req, res) => {
  try {
    const { title, instructions, ingredients, taste, reviews, cuisineType, prepTime } = req.body;
    const newRecipe = new Recipe({ title, instructions, ingredients, taste, reviews, cuisineType, prepTime });
    await newRecipe.save();
    res.json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
