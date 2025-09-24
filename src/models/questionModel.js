import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const questionSchema = new Schema({
  classGrade: { type: Number, required: true },   
  subject: { type: String, required: true },    
  level: { type: String, enum: ["easy", "medium", "hard"], required: true },
  questionText: { type: String },
  questionMedia: { type: String }, 
  options: [
    {
      text: { type: String },
      media: { type: String }, 
    }
  ],
  correctOption: { type: Number }, // index of correct option
  points: { type: Number, default: 0 }, // e.g., easy-2, medium-5, hard-10
}, { timestamps: true });

export default mongoose.model("Question", questionSchema);
