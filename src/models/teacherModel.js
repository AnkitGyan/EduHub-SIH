import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const teacherSchema = new Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, unique: true, required: true },
  password:  { type: String, required: true },
  assignedClasses: [{ type: Types.ObjectId, ref: "Class" }],
}, { timestamps: true });

export default mongoose.model("Teacher", teacherSchema);
