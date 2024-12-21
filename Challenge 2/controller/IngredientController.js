import { Ingredient } from "../model/Ingredient.js";

// Get all ingredients
export const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Add new ingredient
export const addIngredient = async (req, res) => {
  try {
    const { name, quantity, unit } = req.body;
    const newIngredient = new Ingredient({ name, quantity, unit });
    await newIngredient.save();
    res.json(newIngredient);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update ingredient
export const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, unit } = req.body;
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      id,
      { name, quantity, unit },
      { new: true }
    );
    res.json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete ingredient
export const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    await Ingredient.findByIdAndDelete(id);
    res.json({ message: 'Ingredient deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
