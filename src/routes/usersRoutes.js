import express from "express";
import { studentSignup, studentLogin, followStudent, unfollowStudent, getFollowersFollowing} from "../controllers/usersController.js";
import { protectUser } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/signup", studentSignup);
router.post("/login", studentLogin);

router.post("/follow",protectUser, followStudent);
router.post("/unfollow",protectUser, unfollowStudent);
router.get("/:studentId/social",protectUser, getFollowersFollowing);

// Protected routes
// router.get("/me", protectUser);   
// router.get("/problems", protectUser, getClassProblems);

export default router;
