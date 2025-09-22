import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const studentSignup = async (req, res) => {
  const { firstName, lastName, email, password, classId } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const student = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    class: classId
  });

  res.status(201).json({ message: "Student created successfully", student });
};


export const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  const student = await User.findOne({ email });
  if (!student) return res.status(404).json({ message: "Student not found" });

  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, student });
};


export const getStudentProfile = async (req, res) => {
  const student = req.user; // from auth middleware
  res.json({ student });
};


