import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const communitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  members: [{ type: Types.ObjectId, ref: "User" }],      
  pendingInvites: [{ type: Types.ObjectId, ref: "User" }], 
}, { timestamps: true });

export default mongoose.model("Community", communitySchema);
