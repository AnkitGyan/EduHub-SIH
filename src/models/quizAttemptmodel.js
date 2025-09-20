import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  selectedOptions: [Number], // indices selected by student
  isCorrect: { type: Boolean }
});

const quizAttemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [answerSchema],
  score: { type: Number, default: 0 },
  attemptedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("QuizAttempt", quizAttemptSchema);
