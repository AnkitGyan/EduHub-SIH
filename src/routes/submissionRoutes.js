import express from "express";
import { submitAnswer } from "../controllers/submissionController.js";
import { protect, isStudent } from "../middleware/auth.js";

const router = express.Router();

router.post("/submit", protect, isStudent, submitAnswer);

// Optional: fetch solved questions for a student
router.get("/student/:id", protect, isStudentOrFollower, getSubmissionsByStudent);

export default router;
