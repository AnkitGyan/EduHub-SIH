import mongoose from "mongoose";

const simulationStateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  simulation: { type: mongoose.Schema.Types.ObjectId, ref: "Simulation", required: true },
  state: Object,
  interactions: Array,
  completed: { type: Boolean, default: false },
  pointsEarned: { type: Number, default: 0 },
  completedAt: Date
});

export default mongoose.model("SimulationState", simulationStateSchema);
