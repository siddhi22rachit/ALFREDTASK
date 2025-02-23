import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  boxNumber: { type: Number, default: 1 }, // Leitner system
  nextReviewDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User reference
});

export default mongoose.model("Flashcard", flashcardSchema);
