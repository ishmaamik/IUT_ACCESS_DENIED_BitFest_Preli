import { generateRecipeSuggestion } from "../services/LLMservices.js"; // Importing the LLM service
import { Ingredient } from "../model/Ingredient.js";

export async function chatWithBot(req, res) {
    try {
        const { preferences } = req.body; // User preferences for recipe suggestions

        // Fetch available ingredients from the database
        const ingredients = await Ingredient.find();
        const ingredientNames = ingredients.map((ingredient) => ingredient.name);

        // Generate recipe suggestion using LLM
        let suggestion = "No recipe suggestion could be generated.";
        if (preferences && ingredientNames.length > 0) {
            try {
                suggestion = await generateRecipeSuggestion(preferences, ingredientNames);
            } catch (error) {
                console.error("Error generating recipe suggestion:", error);
                suggestion = "An error occurred while generating the recipe suggestion.";
            }
        }

        // Respond with the suggestion and available ingredients
        res.json({
            message: `We have the following ingredients available: ${ingredientNames.join(", ")}.`,
            preferences: preferences || "No specific preferences provided.",
            recipeSuggestion: suggestion,
        });
    } catch (error) {
        console.error("Error in chatWithBot:", error);
        res.status(500).json({ error: "Failed to process chatbot request." });
    }
}
