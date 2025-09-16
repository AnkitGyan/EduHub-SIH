import User from "../models/User.js";
import Submission from "../models/Submission.js";
import SimulationState from "../models/SimulationState.js";


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("classes", "name")   // if Class model exists
      .populate("badges.badgeId");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("getProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;
    if (req.file) {
      // save avatar path
      updates["profile.avatar"] = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select("-password");
    res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error("updateProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password").populate("classes", "name");
    if (!user) return res.status(404).json({ message: "User not found" });

    const solvedCount = await Submission.countDocuments({ user: req.userId, status: "accepted" });
    const simsCompleted = await SimulationState.countDocuments({ user: req.userId, completed: true });

    res.json({
      profile: {
        id: user._id,
        username: user.username,
        avatar: user.profile?.avatar || null,
        classes: user.classes
      },
      stats: user.stats,
      badges: user.badges,
      solvedProblems: solvedCount,
      simulationsCompleted: simsCompleted,
      followersCount: (user.followers || []).length,
      followingCount: (user.following || []).length
    });
  } catch (err) {
    console.error("getDashboard:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const followUser = async (req, res) => {
  try {
    const me = req.userId;
    const targetId = req.params.userId;
    if (me === targetId) return res.status(400).json({ message: "Cannot follow yourself" });

    await User.findByIdAndUpdate(me, { $addToSet: { following: targetId } });
    await User.findByIdAndUpdate(targetId, { $addToSet: { followers: me } });

    res.json({ message: "Followed" });
  } catch (err) {
    console.error("followUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const unfollowUser = async (req, res) => {
  try {
    const me = req.userId;
    const targetId = req.params.userId;

    await User.findByIdAndUpdate(me, { $pull: { following: targetId } });
    await User.findByIdAndUpdate(targetId, { $pull: { followers: me } });

    res.json({ message: "Unfollowed" });
  } catch (err) {
    console.error("unfollowUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("followers", "username profile");
    res.json(user.followers || []);
  } catch (err) {
    console.error("getFollowers:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("following", "username profile");
    res.json(user.following || []);
  } catch (err) {
    console.error("getFollowing:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getFriendSolvedProblems = async (req, res) => {
  try {
    const friendId = req.params.friendId;
    const me = await User.findById(req.userId);
    if (!me.following || !me.following.map(String).includes(String(friendId))) {
      return res.status(403).json({ message: "You can only view solved problems of followed friends." });
    }

    const submissions = await Submission.find({ user: friendId, status: "accepted" })
      .select("problemTitle points createdAt")
      .sort({ createdAt: -1 });

    const safe = submissions.map(s => ({
      problemTitle: s.problemTitle,
      points: s.points,
      solvedAt: s.createdAt
    }));

    res.json(safe);
  } catch (err) {
    console.error("getFriendSolvedProblems:", err);
    res.status(500).json({ message: "Server error" });
  }
};
