import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const teacherStudentMapSchema = new Schema({
  teacher: { type: Types.ObjectId, ref: "User", required: true },
  student: { type: Types.ObjectId, ref: "User", required: true },
  class: { type:  Types.ObjectId, ref: "Class", required: true }
});

export default mongoose.model("TeacherStudentMap", teacherStudentMapSchema);
