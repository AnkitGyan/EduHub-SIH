import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const chatMessageSchema = new Schema(
  {
    community: { type: Types.ObjectId, ref: "Community", required: true },
    sender: { type: Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ChatMessage", chatMessageSchema);
