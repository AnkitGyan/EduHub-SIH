import mongoose from "mongoose";

const simulationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  phETLink: String,
  assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  pointsReward: { type: Number, default: 50 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Simulation", simulationSchema);
