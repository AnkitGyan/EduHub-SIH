// src/routes/userRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import {
  getProfile,
  updateProfile,
  getDashboard,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFriendSolvedProblems
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, upload.single("avatar"), updateProfile);

router.get("/dashboard", protect, getDashboard);

router.post("/follow/:userId", protect, followUser);
router.post("/unfollow/:userId", protect, unfollowUser);

router.get("/followers", protect, getFollowers);
router.get("/following", protect, getFollowing);

router.get("/friend/:friendId/solutions", protect, getFriendSolvedProblems);

export default router;
