import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["teacher", "student"], required: true },
    points: { type: Number, default: 0 },
    badges: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
