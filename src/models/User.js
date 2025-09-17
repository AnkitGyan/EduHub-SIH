import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
  profile: { avatar: String },

  stats: {
    totalPoints: { type: Number, default: 0 },
    quizzesCompleted: { type: Number, default: 0 },
    simulationsCompleted: { type: Number, default: 0 },
    challengesSolved: { type: Number, default: 0 },
    streak: { type: Number, default: 0 }
  },

  badges: [{ badgeId: { type: mongoose.Schema.Types.ObjectId, ref: "Badge" } }],

  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
