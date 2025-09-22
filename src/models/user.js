import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, unique: true, required: true },
  password:  { type: String, required: true },
  class:     { type: Types.ObjectId, ref: "Class", required: true }, 
}, { timestamps: true });

export default mongoose.model("User", userSchema);
