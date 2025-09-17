import Quiz from "../models/Quiz.js";
import User from "../models/User.js";

// Assign quiz to a class
export const assignQuiz = async (req, res) => {
  try {
    const { title, classId, questions } = req.body;
    const teacherId = req.user.id; // from auth middleware

    const quiz = await Quiz.create({
      title,
      classId,
      teacherId,
      questions
    });

    res.status(201).json({ message: "Quiz assigned successfully", quiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View overall class performance
export const getClassPerformance = async (req, res) => {
  try {
    const { classId } = req.params;

    const students = await User.find({ classes: classId, role: "student" })
      .select("username stats");

    res.status(200).json({ classId, students });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View individual student performance
export const getStudentPerformance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findById(studentId).select("username stats badges");

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
