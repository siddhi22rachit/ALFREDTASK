import Flashcard from "../models/Flashcard.js";

export const addFlashcard = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const flashcard = new Flashcard({ question, answer, userId: req.userId });
    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ userId: req.userId }).sort({ nextReviewDate: 1 });
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFlashcardsByDates = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    const flashcards = await Flashcard.find({
      userId: req.userId,
      nextReviewDate: { $gte: today, $lt: new Date(today.getTime() + 86400000) } // Only today’s flashcards
    }).sort({ nextReviewDate: 1 });

    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });

    const isCorrect = req.body.correct;
    flashcard.boxNumber = isCorrect ? flashcard.boxNumber + 1 : 1;
    flashcard.nextReviewDate = new Date(Date.now() + (isCorrect ? flashcard.boxNumber * 24 * 60 * 60 * 1000 : 0));
    await flashcard.save();

    res.status(200).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
