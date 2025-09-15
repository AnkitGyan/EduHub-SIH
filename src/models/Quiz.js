import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [{ 
    question: String, 
    options: [String], 
    correctAnswer: String, 
    points: Number 
  }],
  assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Quiz", quizSchema);
