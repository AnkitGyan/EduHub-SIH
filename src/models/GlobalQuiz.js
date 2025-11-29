import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const globalQuizSchema = new Schema({
  title: { type: String, required: true },
  group: { type: String, enum: ["6-8","9-10","11-12"], required: true }, 
  questions: [{ type: Types.ObjectId, ref: "Question", required: true }],
  timeLimitMinutes: { type: Number, default: 60 },
  startAt: { type: Date }, 
  endAt: { type: Date },  
  createdBy: { type: Types.ObjectId, ref: "Admin", required: true }
}, { timestamps: true });

export default mongoose.model("GlobalQuiz", globalQuizSchema);
