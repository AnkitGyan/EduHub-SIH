import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// A student can have only one solution per problem
solutionSchema.index({ problem: 1, student: 1 }, { unique: true });

export default mongoose.model("Solution", solutionSchema);
