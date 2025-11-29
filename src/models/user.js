import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: String,
  classGrade: { type: Number, required: true, default: 10},
  solvedProblems: {
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 },
    daily: { type: Number, default: 0 },
  },
  totalPoints: { type: Number, default: 0 },

  badges: [{
    name: String,
    reward: String,
    earnedAt: { type: Date, default: Date.now }
  }],

  // social layer
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
