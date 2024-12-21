import fs from "fs";
import Tesseract from "tesseract.js";


export const saveRecipeToFile = (recipe, suggestions = "") => {
    const filePath = "./my_fav_recipes.txt";
    const ingredients = Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(", ")
        : recipe.ingredients;

    const recipeDetails = `
Title: ${recipe.title}
Ingredients: ${ingredients}
Instructions: ${recipe.instructions}
Taste: ${recipe.taste || "N/A"}
Cuisine Type: ${recipe.cuisineType || "N/A"}
Preparation Time: ${recipe.prepTime || "N/A"}
Reviews: ${recipe.reviews || "N/A"}
Suggestions: ${suggestions || "No suggestions available."}
-------------------------
`;
    fs.appendFileSync(filePath, recipeDetails, "utf8");
};

export const parseImage = async (imagePath) => {
    const { data: { text } } = await Tesseract.recognize(imagePath);
    return text.trim();
};
