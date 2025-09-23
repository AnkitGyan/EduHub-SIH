import express from "express";
import { assignQuiz, submitQuiz, getClassQuizzes, getStudentQuizzes } from "../controllers/quizController.js";
import { protect, isTeacher, isStudent } from "../middleware/auth.js";

const router = express.Router();

// Teacher routes
router.post("/class/:classId", protect, isTeacher, assignQuiz);
router.get("/class/:classId", protect, isTeacher, getClassQuizzes);

// Student routes
router.post("/:quizId/submit", protect, isStudent, submitQuiz);
router.get("/student", protect, isStudent, getStudentQuizzes);

export default router;
