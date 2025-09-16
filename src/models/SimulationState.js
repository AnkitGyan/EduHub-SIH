// src/models/SimulationState.js
import mongoose from "mongoose";

const simulationStateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  simulationId: { type: mongoose.Schema.Types.ObjectId, ref: "Simulation" },
  completed: { type: Boolean, default: false },
  pointsEarned: { type: Number, default: 0 },
  completedAt: Date
}, { timestamps: true });

export default mongoose.model("SimulationState", simulationStateSchema);
