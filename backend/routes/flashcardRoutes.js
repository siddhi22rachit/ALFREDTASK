import express from "express";
import { addFlashcard, getFlashcards, updateFlashcard ,getFlashcardsByDates } from "../controllers/flashcardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addFlashcard);
router.get("/", protect, getFlashcards);
router.get("/date", protect, getFlashcardsByDates);
router.put("/:id", protect, updateFlashcard);

export default router;
