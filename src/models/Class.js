import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const classSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  teacher: { type: Types.ObjectId, ref: "Teacher" },
  students: [{ type: Types.ObjectId, ref: "User" }],
  subjects: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("Class", classSchema);
