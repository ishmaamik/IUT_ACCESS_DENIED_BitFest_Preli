// server/index.js
import cors from "cors"
import express from "express"
import dotenv from "dotenv"

dotenv.config()

import { connectDB } from "./config/db.js"
import IngredientRoutes from "./routes/Ingredients.js"
import RecipeRoutes from "./routes/Recipe.js"
import chatbotRoutes from "./routes/chatbotRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ingredients', IngredientRoutes);
app.use('/api/recipes', RecipeRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
