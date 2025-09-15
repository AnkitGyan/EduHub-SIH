import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { followStudent, getFollowData, getStudentPerformance } from "../controllers/studentController.js";

const router = express.Router();

router.post("/follow", protect, followStudent);
router.get("/follow-data", protect, getFollowData);
router.get("/performance/:studentId", protect, getStudentPerformance); // teacher can access

export default router;
