import ChatMessage from "../models/ChatMessage.js";
import Community from "../models/community.js";

// Send message in a community
export const sendMessage = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { message } = req.body;
    const userId = req.user._id;

    if (!message) return res.status(400).json({ message: "Message required" });

    // Check if user is in this community
    const community = await Community.findById(communityId);
    if (!community) return res.status(404).json({ message: "Community not found" });

    if (!community.members.includes(userId)) {
      return res.status(403).json({ message: "You are not a member of this community" });
    }

    const newMsg = await ChatMessage.create({
      community: communityId,
      sender: userId,
      message,
    });

    return res.status(201).json({ message: "Message sent", chat: newMsg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all messages in a community
export const getCommunityMessages = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user._id;

    const community = await Community.findById(communityId);
    if (!community) return res.status(404).json({ message: "Community not found" });

    if (!community.members.includes(userId)) {
      return res.status(403).json({ message: "You are not a member of this community" });
    }

    const messages = await ChatMessage.find({ community: communityId })
      .populate("sender", "firstName lastName classGrade")
      .sort({ createdAt: 1 });

    return res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
