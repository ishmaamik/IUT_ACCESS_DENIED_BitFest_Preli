import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
    throw new Error("API key for Google Generative AI is missing. Please set GEMINI_API_KEY in the .env file.");
}

// Refine raw recipe text into a structured format
export async function refineRecipeText(rawText) {
  const prompt = `
      You are a cooking assistant. Refine the following raw recipe text into clear sections:
      ---
      ${rawText}
      ---
      The sections should include Title, Ingredients, Instructions, Taste, Cuisine Type, Preparation Time, and Reviews. If anything is unclear, make an educated guess.
  `;

  try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent([prompt]);
      console.log("API Response for Refinement:", result);

      // Accessing the correct structure
      const generatedText = result.response?.candidates?.[0]?.content;
      if (!generatedText || typeof generatedText !== "string") {
          throw new Error("Unexpected API response format for refinement.");
      }

      return generatedText.trim();
  } catch (error) {
      console.error("Error refining recipe text:", error);
      throw error;
  }
}

export async function generateRecipeSuggestion(preferences, availableIngredients) {
  const prompt = `
      You are a recipe assistant. Suggest a recipe based on the following preferences and available ingredients:
      Preferences: ${preferences}
      Ingredients: ${availableIngredients.join(", ")}
      Provide the recipe with clear sections: Title, Ingredients, and Instructions.
  `;

  try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent([prompt]);
      console.log("API Response for Suggestion:", result);

      // Accessing the correct structure
      const suggestion = result.response?.candidates?.[0]?.content;
      if (!suggestion || typeof suggestion !== "string") {
          throw new Error("Unexpected API response format for recipe suggestion.");
      }

      return suggestion.trim();
  } catch (error) {
      console.error("Error generating recipe suggestion:", error);
      throw error;
  }
}
