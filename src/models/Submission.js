// src/models/Submission.js
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemTitle: { type: String, required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  status: { type: String, enum: ["pending","accepted","wrong-answer"], default: "pending" },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Submission", submissionSchema);
