# Recipe Management API

This API allows users to manage recipes by adding, refining, and generating suggestions based on available ingredients and user preferences.

---

## API Documentation

### **1. Get All Recipes**
- **Route**: `/api/recipes`
- **Method**: `GET`
- **Description**: Retrieves all saved recipes.
- **Sample Response**:
```json
[
    {
        "id": "1",
        "title": "Egg Omelet",
        "ingredients": ["Eggs", "Salt", "Oil"],
        "instructions": "Whisk the eggs, add salt, and cook in a heated pan with oil.",
        "taste": "Savory",
        "cuisineType": "Indian",
        "prepTime": "10 minutes",
        "reviews": 4.5
    }
]
```

---

### **2. Add a Recipe**
- **Route**: `/api/recipes/add`
- **Method**: `POST`
- **Description**: Adds a new recipe to the system. Accepts raw text, structured JSON, or an image.
- **Sample Payload**:
```json
{
    "title": "Egg Omelet",
    "ingredients": ["Eggs", "Salt", "Oil"],
    "instructions": "Whisk the eggs, add salt, and cook in a heated pan with oil.",
    "taste": "Savory",
    "cuisineType": "Indian",
    "prepTime": "10 minutes",
    "reviews": 4
}
```
- **Sample Response**:
```json
{
    "recipe": {
        "id": "1",
        "title": "Egg Omelet",
        "ingredients": ["Eggs", "Salt", "Oil"],
        "instructions": "Whisk the eggs, add salt, and cook in a heated pan with oil.",
        "taste": "Savory",
        "cuisineType": "Indian",
        "prepTime": "10 minutes",
        "reviews": 4
    },
    "suggestions": "Title: Cheese Omelet\nIngredients: Eggs, Cheese, Salt\nInstructions: Whisk the eggs, add grated cheese, and cook in a heated pan until fluffy."
}
```

---

### **3. Generate Recipe Suggestions**
- **Route**: `/api/chatbot`
- **Method**: `POST`
- **Description**: Generates a recipe suggestion based on user preferences and available ingredients.
- **Sample Payload**:
```json
{
    "preferences": "I want something sweet and quick."
}
```
- **Sample Response**:
```json
{
    "message": "We have the following ingredients available: Sugar, Eggs, Milk, Butter, Flour.",
    "preferences": "I want something sweet and quick.",
    "recipeSuggestion": {
        "title": "Quick Pancakes",
        "ingredients": ["1 cup Flour", "2 tbsp Sugar", "1 Egg", "1 cup Milk", "1 tsp Baking Powder"],
        "instructions": "Mix all ingredients, heat a non-stick pan, and cook until golden brown on both sides. Serve with syrup."
    }
}
```

---

### **4. Refine Raw Recipe Text**
- **Route**: `/api/recipes/refine`
- **Method**: `POST`
- **Description**: Refines raw text or image-based recipe inputs into structured JSON format.
- **Sample Payload**:
```json
{
    "rawText": "Eggs, Salt, Oil - Whisk eggs, add salt, cook in oil. Savory. Indian. 10 minutes."
}
```
- **Sample Response**:
```json
{
    "title": "Egg Omelet",
    "ingredients": ["Eggs", "Salt", "Oil"],
    "instructions": "Whisk the eggs, add salt, and cook in a heated pan with oil.",
    "taste": "Savory",
    "cuisineType": "Indian",
    "prepTime": "10 minutes",
    "reviews": 4.5
}
```

---

### **5. Get Available Ingredients**
- **Route**: `/api/ingredients`
- **Method**: `GET`
- **Description**: Retrieves all available ingredients from the database.
- **Sample Response**:
```json
[
    {
        "id": "1",
        "name": "Eggs",
        "quantity": 12,
        "unit": "pieces"
    },
    {
        "id": "2",
        "name": "Milk",
        "quantity": 2,
        "unit": "liters"
    }
]
```

---

## Notes
- For all POST requests, ensure the payload matches the documented format.
- Use proper headers for requests:
  - `Content-Type: application/json` for JSON payloads.
  - `Content-Type: multipart/form-data` for image uploads.
