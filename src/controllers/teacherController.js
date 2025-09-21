import Teacher from "../models/teacherModel.js";
import generateToken from "../utils/generateToken.js";

export const registerTeacher = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) return res.status(400).json({ message: "Teacher already exists" });

    const teacher = await Teacher.create({ firstName, lastName, email, password });

    res.status(201).json({
      _id: teacher._id,
      name: `${teacher.firstName} ${teacher.lastName}`,
      email: teacher.email,
      token: generateToken(teacher._id, "teacher"),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });

    if (teacher && (await teacher.matchPassword(password))) {
      res.json({
        _id: teacher._id,
        name: `${teacher.firstName} ${teacher.lastName}`,
        email: teacher.email,
        token: generateToken(teacher._id, "teacher"),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
