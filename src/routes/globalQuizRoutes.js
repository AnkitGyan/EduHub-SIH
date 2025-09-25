import express from "express";
import { protectUser } from "../middleware/auth.js";
import {protectAdmin} from "../middleware/adminAuthMiddleware.js"
import {
  createGlobalQuiz,
  submitGlobalQuiz,
  getTopStudents,
  getTopCommunities
} from "../controllers/globalQuizController.js";

const router = express.Router();

router.post("/", protectAdmin, createGlobalQuiz);

router.post("/:quizId/submit", protectUser, submitGlobalQuiz);

// Leaderboards
router.get("/leaderboard/students", getTopStudents);
router.get("/leaderboard/communities", getTopCommunities);

export default router;
