import express from "express";
import { protectUser } from "../middleware/auth.js";
import {
  createCommunity,
  inviteToCommunity,
  respondToInvite,
  getCommunity,
  getMyCommunities
} from "../controllers/communityController.js";

const router = express.Router();

router.post("/create", protectUser, createCommunity);
router.post("/invite", protectUser, inviteToCommunity);
router.post("/respond", protectUser, respondToInvite);
router.get("/:id", protectUser, getCommunity);
router.get("/", protectUser, getMyCommunities);

export default router;
