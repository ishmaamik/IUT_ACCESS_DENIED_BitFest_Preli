// server/controllers/chatbotController.js
import { generateRecipeSuggestion } from "../services/LLMservices.js";
import {Ingredient} from "../model/Ingredient.js"; // Assuming you have an Ingredient model

export async function chatWithBot(req, res) {
  try {
    const { preferences } = req.body; // e.g., "I want something sweet today"

    // Fetch available ingredients from the database
    const ingredients = await Ingredient.find();
    const ingredientNames = ingredients.map(ingredient => ingredient.name);

    // Generate recipe suggestion using Gemini API
    const suggestion = await generateRecipeSuggestion(preferences, ingredientNames);

    res.json({ suggestion });
  } catch (error) {
    console.error("Error in chatWithBot:", error);
    res.status(500).json({ error: "Failed to generate recipe suggestion." });
  }
}
