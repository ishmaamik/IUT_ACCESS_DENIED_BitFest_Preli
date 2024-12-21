// server/routes/ingredientRoutes.js
import express from "express"
const router = express.Router();

import { addIngredient, deleteIngredient, updateIngredient, getIngredients } from "../controller/IngredientController.js";

router.get('/', getIngredients);
router.post('/', addIngredient);
router.put('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);

export default router
