
import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String, 
    default: ''
  },
  
}, { timestamps: true });

export const Ingredient = mongoose.model('Ingredient', ingredientSchema);
