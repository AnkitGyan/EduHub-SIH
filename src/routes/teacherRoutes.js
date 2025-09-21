import express from "express";
import { teacherSignup, teacherLogin, addClassesToTeacher } from "../controllers/teacherController.js";
import { protectTeacher } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", teacherSignup);
router.post("/login", teacherLogin);
router.post("/add-classes", protectTeacher, addClassesToTeacher);

export default router;
