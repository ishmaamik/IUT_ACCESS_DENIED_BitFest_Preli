# Recipe Management System

A Node.js-based application for managing recipes. It supports uploading recipes via text or images, refining recipe text using AI, and generating recipe suggestions based on preferences.

## Features
- Add recipes via text or image (OCR + AI refinement).
- Retrieve all stored recipes.
- Generate recipe suggestions based on preferences and available ingredients.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```plaintext
   MONGO_URL=<your_mongodb_connection_string>
   GEMINI_API_KEY=<your_google_generative_ai_key>
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints

### 1. **Add Recipe**
**POST** `/api/recipes/add`

Upload a new recipe via text or image.

- **Headers:**
  `Content-Type: multipart/form-data`

- **Body Parameters:**
  - `title` (string, optional): Recipe title.
  - `ingredients` (string, optional): Comma-separated ingredients.
  - `instructions` (string, optional): Recipe instructions.
  - `taste` (string, optional): Taste of the recipe.
  - `cuisineType` (string, optional): Type of cuisine (e.g., Indian, Italian).
  - `prepTime` (string, optional): Preparation time.
  - `recipeImage` (file, optional): An image of the recipe.

- **Response:**
  ```json
  {
    "title": "Egg Omelette",
    "ingredients": ["Eggs", "Salt", "Pepper"],
    "instructions": "1. Crack eggs ...",
    "taste": "Savory",
    "cuisineType": "Indian",
    "prepTime": "10 minutes",
    "reviews": 0,
    "createdAt": "2024-12-21T12:00:00Z"
  }
  ```

---

### 2. **Get All Recipes**
**GET** `/api/recipes`

Retrieve all stored recipes.

- **Response:**
  ```json
  [
    {
      "title": "Egg Omelette",
      "ingredients": ["Eggs", "Salt", "Pepper"],
      "instructions": "1. Crack eggs ...",
      "taste": "Savory",
      "cuisineType": "Indian",
      "prepTime": "10 minutes",
      "reviews": 0,
      "createdAt": "2024-12-21T12:00:00Z"
    }
  ]
  ```

---

### 3. **Generate Recipe Suggestion**
**POST** `/api/chatbot`

Generate a recipe suggestion based on user preferences and available ingredients.

- **Headers:**
  `Content-Type: application/json`

- **Body Parameters:**
  - `preferences` (string): User's preferences (e.g., "I want something sweet").

- **Response:**
  ```json
  {
    "suggestion": {
      "title": "Chocolate Cake",
      "ingredients": ["Flour", "Sugar", "Cocoa Powder", "Eggs"],
      "instructions": "1. Preheat oven ...",
    }
  }
  ```

---

## Folder Structure

```
├── config
│   └── db.js            # Database connection
├── controller
│   ├── RecipeController.js  # Recipe management logic
│   └── chatbotController.js # Recipe suggestion logic
├── model
│   ├── Recipe.js        # Recipe schema
│   └── Ingredient.js    # Ingredient schema
├── routes
│   ├── recipeRoutes.js  # Routes for recipe APIs
│   └── chatbotRoutes.js # Routes for chatbot APIs
├── services
│   └── LLMservices.js   # AI services (refinement and suggestions)
├── utils
│   └── recipeFileUtils.js # OCR and file handling utilities
└── index.js             # Application entry point
```
