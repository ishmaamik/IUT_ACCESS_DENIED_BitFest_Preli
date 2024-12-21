import { Recipe } from "../model/Recipe.js";
import { saveRecipeToFile, parseImage } from "../utils/recipeFileUtils.js";
import { refineRecipeText } from "../services/LLMservices.js";

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
import { generateRecipeSuggestion } from "../services/LLMservices.js";

export const addRecipeFromImageOrText = async (req, res) => {
    try {
        const { title, instructions, ingredients, taste, reviews, cuisineType, prepTime } = req.body;
        let refinedRecipe = {};
        let parsedIngredients = [];
        let suggestions = "";

        // Process image if uploaded
        if (req.file) {
            const rawText = await parseImage(req.file.path); // Extract raw text using OCR
            try {
                const refinedText = await refineRecipeText(rawText); // Refine text using LLM
                refinedRecipe = JSON.parse(refinedText); // Parse structured response
            } catch (error) {
                console.error("Error refining recipe text:", error);
                refinedRecipe = {}; // Fallback to empty object
            }
        }

        // Process ingredients (from input or refined recipe)
        if (ingredients) {
            parsedIngredients = Array.isArray(ingredients)
                ? ingredients
                : ingredients.split(",").map((ing) => ing.trim());
        } else if (refinedRecipe.ingredients) {
            parsedIngredients = refinedRecipe.ingredients.split(",").map((ing) => ing.trim());
        }

        // Generate recipe suggestions
        try {
            suggestions = await generateRecipeSuggestion(
                `Ingredients: ${parsedIngredients.join(", ")}; Taste: ${taste || "N/A"};`,
                parsedIngredients
            );
        } catch (error) {
            console.error("Error generating recipe suggestions:", error);
        }

        const recipeData = {
            title: title || refinedRecipe.title || "Untitled Recipe",
            instructions: instructions || refinedRecipe.instructions || "No instructions provided",
            ingredients: parsedIngredients,
            taste: taste || refinedRecipe.taste || "N/A",
            reviews: isNaN(Number(reviews)) ? 0 : Number(reviews), // Default to 0 if invalid
            cuisineType: cuisineType || refinedRecipe.cuisineType || "Unknown",
            prepTime: prepTime || refinedRecipe.prepTime || "N/A",
        };

        // Save to database
        const newRecipe = new Recipe(recipeData);
        await newRecipe.save();

        // Save to text file with suggestions
        saveRecipeToFile(recipeData, suggestions);

        res.json({
            recipe: newRecipe,
            suggestions: suggestions || "No suggestions generated.",
        });
    } catch (error) {
        console.error("Error adding recipe:", error);
        res.status(500).json({ error: "Server Error" });
    }
};
