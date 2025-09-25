import express from "express";
import { protect, isStudent } from "../middleware/auth.js";
import { sendMessage, getCommunityMessages } from "../controllers/chatController.js";

const router = express.Router();

// Send message
router.post("/:communityId/messages", protect, isStudent, sendMessage);

// Get community messages
router.get("/:communityId/messages", protect, isStudent, getCommunityMessages);

export default router;
