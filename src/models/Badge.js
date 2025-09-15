import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  name: String,
  description: String,
  criteria: String,
  points: Number,
  rarity: String,
  category: String
});

export default mongoose.model("Badge", badgeSchema);
