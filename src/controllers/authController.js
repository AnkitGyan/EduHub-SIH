import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../helpers/generateToken.js";


export const signup = async (req, res) => {
  try {
    const { username, email, password, role, classId } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email, password required" });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      username, email, password: hashed, role: role || "student", classes: classId ? [classId] : []
    });

    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("signup:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "email and password required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("login:", err);
    res.status(500).json({ message: "Server error" });
  }
};
