import express from "express";
import { createQuiz, getQuizzesByTeacher, getQuizzesForStudent, submitQuizAttempt, getQuizAttempts } from "../controllers/quiz.controller.js";
import { protect, isTeacher, isStudent } from "../middleware/auth.js";

const router = express.Router();

// teacher
router.post("/", protect, isTeacher, createQuiz);
router.get("/teacher", protect, isTeacher, getQuizzesByTeacher);
router.get("/:quizId/attempts", protect, isTeacher, getQuizAttempts);

// student
router.get("/student", protect, isStudent, getQuizzesForStudent);
router.post("/attempt", protect, isStudent, submitQuizAttempt);

export default router;
