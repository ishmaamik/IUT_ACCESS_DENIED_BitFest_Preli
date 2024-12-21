import express from "express";
import multer from "multer";
import { getRecipes, addRecipeFromImageOrText } from "../controller/RecipeController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary file storage

router.get("/", getRecipes);
router.post("/add", upload.single("recipeImage"), addRecipeFromImageOrText);

export default router;
