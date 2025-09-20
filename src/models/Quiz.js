import mongoose from "mongoose";

// Option for a question
const optionSchema = new mongoose.Schema({
  text: { type: String }, // optional text
  mediaUrl: { type: String } // optional image/video
});

// Question inside quiz
const questionSchema = new mongoose.Schema({
  questionText: { type: String },
  mediaUrl: { type: String }, // optional image/video for question
  options: [optionSchema], // multiple options
  correctOptions: [{ type: Number, required: true }], // indices of correct answers
  points: { type: Number, default: 1 } // points per question
});

// Quiz schema
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questions: [questionSchema],
  assignedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Quiz", quizSchema);
