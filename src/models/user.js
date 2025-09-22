import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  grade: { type: Number, required: true }, // 6–12
  classes: [{ type: Types.ObjectId, ref: "Class" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
