import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    ingredients: [String],
    taste: String,
    reviews: {
        type: Number,
        default: 0,
    },
    cuisineType: String,
    prepTime: String,
}, { timestamps: true });

export const Recipe = mongoose.model("Recipe", recipeSchema);
