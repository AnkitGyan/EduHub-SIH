import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { submitSolution, getProblemSolvers, getStudentSolution } from "../controllers/solutionController.js";

const router = express.Router();

router.post("/submit", protect, submitSolution);
router.get("/:problemId/solvers", protect, getProblemSolvers);
router.get("/:problemId/solution/:studentId", protect, getStudentSolution);

export default router;
