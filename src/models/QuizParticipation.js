import mongoose from "mongoose";

const participationSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: Array,
  score: {
    totalPoints: Number,
    correctAnswers: Number
  },
  completedAt: Date
});

export default mongoose.model("QuizParticipation", participationSchema);
