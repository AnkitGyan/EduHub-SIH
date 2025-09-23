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

export const followStudent = async (req, res) => {
  const studentId = req.user;
  const { targetId } = req.body; 

  if (studentId === targetId) return res.status(400).json({ message: "Cannot follow yourself" });

  const student = await User.findById(studentId);
  const target = await User.findById(targetId);

  if (!student || !target) return res.status(404).json({ message: "Student not found" });

  if (!student.following.includes(targetId)) student.following.push(targetId);
  if (!target.followers.includes(studentId)) target.followers.push(studentId);

  await student.save();
  await target.save();

  return res.json({ message: `You are now following ${target.firstName}` });
};

export const unfollowStudent = async (req, res) => {
  const { studentId } = req.user;
  const { targetId } = req.body;

  const student = await User.findById(studentId);
  const target = await User.findById(targetId);

  if (!student || !target) return res.status(404).json({ message: "Student not found" });

  student.following = student.following.filter(id => id.toString() !== targetId);
  target.followers = target.followers.filter(id => id.toString() !== studentId);

  await student.save();
  await target.save();

  return res.json({ message: `You unfollowed ${target.firstName}` });
};

// Get followers & following
export const getFollowersFollowing = async (req, res) => {
  const { studentId } = req.params;

  const student = await User.findById(studentId)
    .populate("followers", "firstName lastName classGrade")
    .populate("following", "firstName lastName classGrade");

  if (!student) return res.status(404).json({ message: "Student not found" });

  return res.json({
    followers: student.followers,
    following: student.following
  });
};