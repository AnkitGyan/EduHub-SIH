import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const submissionSchema = new Schema({
  student: { type: Types.ObjectId, ref: "User", required: true },   
  question: { type: Types.ObjectId, ref: "Question", required: true },
  writtenAnswer: { type: String }, 
  selectedOption: { type: Number }, 
  gptResult: { type: String },    
  pointsEarned: { type: Number, default: 0 }, 
  dateSolved: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Submission", submissionSchema);
