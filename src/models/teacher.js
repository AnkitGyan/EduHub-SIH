import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const teacherSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  classes: [{ type: Types.ObjectId, ref: "Class" }]
}, { timestamps: true });

export default mongoose.model("Teacher", teacherSchema);

