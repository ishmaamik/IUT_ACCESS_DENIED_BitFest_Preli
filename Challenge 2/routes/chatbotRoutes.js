// server/routes/chatbotRoutes.js
import express from "express";
import { chatWithBot } from "../controller/chatbotController.js"; // Fixed import path typo

const router = express.Router();

// POST /api/chatbot
router.post("/", chatWithBot);

export default router;
