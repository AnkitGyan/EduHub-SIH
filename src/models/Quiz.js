import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: String,
  mediaUrl: String // image/video 
});

const questionSchema = new mongoose.Schema({
  questionText: String,
  mediaUrl: String, // optional image/video
  options: [optionSchema],
  correctOption: { type: Number, required: true } // index of correct answer
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questions: [questionSchema],
  assignedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Quiz", quizSchema);
