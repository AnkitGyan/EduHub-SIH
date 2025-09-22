import express from "express";
import { registerTeacher, loginTeacher, addClassesToTeacher } from "../controllers/teacherController.js";
import { protectTeacher } from "../middleware/teacherAuthMiddleware.js";

const router = express.Router();

router.post("/signup", registerTeacher);
router.post("/login", loginTeacher);
router.post("/add-classes", protectTeacher, addClassesToTeacher);

export default router;
