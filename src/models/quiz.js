import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const optionSchema = new Schema({
  type: { type: String, enum: ["text", "image", "video"], required: true },
  value: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
});

const questionSchema = new Schema({
  type: { type: String, enum: ["text", "image", "video"], required: true },
  content: { type: String, required: true },
  options: [optionSchema]
});

const quizSchema = new Schema({
  title: { type: String, required: true },
  teacher: { type: Types.ObjectId, ref: "Teacher", required: true },
  class: { type: Types.ObjectId, ref: "Class", required: true },
  subject: { type: String, required: true },
  questions: [questionSchema],
  studentsCompleted: [
    {
      student: { type: Types.ObjectId, ref: "User" },
      score: { type: Number },
      passed: { type: Boolean } 
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Quiz", quizSchema);
