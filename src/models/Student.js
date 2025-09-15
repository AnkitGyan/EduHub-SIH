import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  points: { type: Number, default: 0 },
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }],
  solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
  
  // New Fields
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});

export default mongoose.model("Student", studentSchema);
