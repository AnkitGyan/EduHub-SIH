import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


export const studentSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, grade } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Student already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create student
    const student = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      grade,
    });

    res.status(201).json({
      message: "Student registered successfully",
      token: generateToken(student._id, "student"),
      student: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        grade: student.grade,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error: error.message });
  }
};

export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await User.findOne({ email });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      token: generateToken(student._id, "student"),
      student: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        grade: student.grade,
        classes: student.classes
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in student", error: error.message });
  }
};