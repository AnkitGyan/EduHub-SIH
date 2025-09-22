import Teacher from "../models/teacher.js";
import User from "../models/user.js";
import Class from '../models/Class.js'
import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken.js";

export const registerTeacher = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) return res.status(400).json({ message: "Teacher already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Teacher registered successfully",
      token: generateToken(teacher._id, "teacher"),
      teacher: {
        id: teacher._id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering teacher", error: error.message });
  }
};

export const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      token: generateToken(teacher._id, "teacher"),
      teacher: {
        id: teacher._id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        classes: teacher.classes
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in teacher", error: error.message });
  }
};



export const addStudentToClass = async (req, res) => {
  try {
    const { teacherId } = req.teacher;
    const { classId } = req.params;
    const { studentEmail } = req.body;


    const teacherClass = await Class.findOne({ _id: classId, teacher: teacherId });
    if (!teacherClass) {
      return res.status(404).json({ message: "Class not found or not owned by this teacher" });
    }

    const student = await User.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }


    if (student.grade !== teacherClass.level) {
      return res.status(400).json({ message: "Student grade does not match class level" });
    }

    if (!teacherClass.students.includes(student._id)) {
      teacherClass.students.push(student._id);
      await teacherClass.save();
    }

    if (!student.classes.includes(classId)) {
      student.classes.push(classId);
      await student.save();
    }

    res.status(200).json({ message: "Student added to class successfully", class: teacherClass });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding student to class", error: error.message });
  }
};

export const createClass = async (req, res) => {
  try {
    const teacherId = req.teacher.id;
    const { name, level, subjects } = req.body;

    // Create new class
    const newClass = await Class.create({
      name,
      level,
      teacher: teacherId,
      subjects: subjects || []
    });

    // Add class reference to teacher
    await Teacher.findByIdAndUpdate(
      teacherId,
      { $push: { classes: newClass._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Class created successfully",
      class: newClass
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating class", error: error.message });
  }
};
