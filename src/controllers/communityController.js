import Community from "../models/community.js";
import User from "../models/user.js";

export const createCommunity = async (req, res) => {
  try {
    const { name, description } = req.body;
    const ownerId = req.user._id;

    const community = new Community({
      name,
      description,
      owner: ownerId,
      members: [ownerId]  // creator automatically added
    });

    await community.save();
    return res.status(201).json({ message: "Community created", community });
  } catch (err) {
    return res.status(500).json({ message: "Error creating community", error: err.message });
  }
};

// 2. Invite students
export const inviteToCommunity = async (req, res) => {
  try {
    const { communityId, targetId } = req.body;
    const community = await Community.findById(communityId);

    if (!community) return res.status(404).json({ message: "Community not found" });

    // Only owner can invite
    if (community.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only owner can invite" });
    }

    // Avoid duplicates
    if (!community.members.includes(targetId) && !community.pendingInvites.includes(targetId)) {
      community.pendingInvites.push(targetId);
      await community.save();
    }

    return res.json({ message: "Student invited successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error inviting student", error: err.message });
  }
};

// 3. Respond to invite (accept/reject)
export const respondToInvite = async (req, res) => {
  try {
    const { communityId, accept } = req.body;
    const studentId = req.user._id;

    const community = await Community.findById(communityId);
    if (!community) return res.status(404).json({ message: "Community not found" });

    // Check if student was invited
    if (!community.pendingInvites.includes(studentId)) {
      return res.status(400).json({ message: "No pending invite for this student" });
    }

    // Remove from pending
    community.pendingInvites = community.pendingInvites.filter(id => id.toString() !== studentId.toString());

    // If accepted, add to members
    if (accept) community.members.push(studentId);

    await community.save();
    return res.json({ message: accept ? "Joined community" : "Invite rejected" });
  } catch (err) {
    return res.status(500).json({ message: "Error responding to invite", error: err.message });
  }
};

// 4. Get community info
export const getCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const community = await Community.findById(id)
      .populate("owner", "firstName lastName classGrade dp")
      .populate("members", "firstName lastName classGrade dp")
      .populate("pendingInvites", "firstName lastName classGrade dp");

    if (!community) return res.status(404).json({ message: "Community not found" });

    return res.json({ community });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching community", error: err.message });
  }
};

// 5. Get all communities of a student
export const getMyCommunities = async (req, res) => {
  try {
    const studentId = req.user._id;
    const communities = await Community.find({ members: studentId })
      .populate("owner", "firstName lastName classGrade dp")
      .populate("members", "firstName lastName classGrade dp");

    return res.json({ communities });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching communities", error: err.message });
  }
};
