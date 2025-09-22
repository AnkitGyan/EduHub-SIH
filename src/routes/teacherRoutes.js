import express from "express";
import { registerTeacher, loginTeacher, addStudentToClass, createClass } from "../controllers/teacherController.js";
import { protectTeacher } from "../middleware/teacherAuthMiddleware.js";

const router = express.Router();

router.post("/signup", registerTeacher);
router.post("/login", loginTeacher);
router.post("/:class/add-student", protectTeacher, addStudentToClass);
router.post("/create-class",protectTeacher, createClass);

export default router;
