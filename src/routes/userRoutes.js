import express from "express";
import { studentSignup, studentLogin} from "../controllers/usersController.js";
import { protectUser } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/signup", studentSignup);
router.post("/login", studentLogin);

// Protected routes
// router.get("/me", protectUser);   
// router.get("/problems", protectUser, getClassProblems);

export default router;
