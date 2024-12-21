// server/services/llmService.js
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY; // Ensure the environment variable name is correct

export async function generateRecipeSuggestion(preferences, availableIngredients) {
  const prompt = `
    You are a cooking assistant. The user wants a recipe based on their preferences and the ingredients they have.
    Preferences: ${preferences}
    Available Ingredients: ${availableIngredients.join(', ')}
    Suggest a recipe that matches these. 
  `;

  try {
    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate a response using the Gemini API
    const result = await model.generateContent([prompt]);
    const response = await result.response;

    // Extract the text response
    const generatedText = response.text();

    return generatedText.trim();
  } catch (error) {
    console.error("Error generating recipe suggestion:", error);
    throw error;
  }
}
