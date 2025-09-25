import express from "express";
import { getProblemsByClass } from "../controllers/questionController.js";
import { protectUser } from "../middleware/auth.js";

const router = express.Router();


router.get("/problems", protectUser, getProblemsByClass);

export default router;
