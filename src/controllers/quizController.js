import Quiz from "../models/quiz.model.js";
import QuizAttempt from "../models/quizAttempt.model.js";
import Class from "../models/class.model.js";
import User from "../models/user.model.js";

// ✅ Create a quiz (teacher only)
export const createQuiz = async (req, res) => {
  try {
    const { title, classId, questions } = req.body;
    const teacherId = req.user.id;

    // check teacher owns this class
    const classDoc = await Class.findOne({ _id: classId, teacher: teacherId });
    if (!classDoc) return res.status(403).json({ message: "Not authorized for this class" });

    const quiz = await Quiz.create({ title, classId, teacherId, questions });
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Error creating quiz", error: err.message });
  }
};

// ✅ Get all quizzes created by a teacher
export const getQuizzesByTeacher = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const quizzes = await Quiz.find({ teacherId }).populate("classId", "name");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quizzes", error: err.message });
  }
};

// ✅ Get quizzes for a student (only from their assigned classes)
export const getQuizzesForStudent = async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await User.findById(studentId).populate("classes");
    const classIds = student.classes.map(c => c._id);

    const quizzes = await Quiz.find({ classId: { $in: classIds } })
      .populate("teacherId", "username")
      .populate("classId", "name");

    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student quizzes", error: err.message });
  }
};

// ✅ Student submits quiz attempt
export const submitQuizAttempt = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const studentId = req.user.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    const evaluatedAnswers = answers.map(ans => {
      const q = quiz.questions.id(ans.questionId);
      const isCorrect = JSON.stringify(q.correctOptions.sort()) === JSON.stringify(ans.selectedOptions.sort());
      if (isCorrect) score += q.points;
      return { ...ans, isCorrect };
    });

    const attempt = await QuizAttempt.create({ quizId, studentId, answers: evaluatedAnswers, score });
    res.status(201).json(attempt);
  } catch (err) {
    res.status(500).json({ message: "Error submitting quiz", error: err.message });
  }
};

// ✅ Teacher views attempts for their quiz
export const getQuizAttempts = async (req, res) => {
  try {
    const { quizId } = req.params;
    const teacherId = req.user.id;

    const quiz = await Quiz.findOne({ _id: quizId, teacherId });
    if (!quiz) return res.status(403).json({ message: "Not authorized" });

    const attempts = await QuizAttempt.find({ quizId }).populate("studentId", "username email");
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attempts", error: err.message });
  }
};
