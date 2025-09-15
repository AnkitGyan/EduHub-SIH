import Student from "../models/Student.js";
import Solution from "../models/Solution.js";

// Follow another student
export const followStudent = async (req, res) => {
  try {
    const studentId = req.userId; 
    const { followId } = req.body;

    if (studentId === followId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const student = await Student.findById(studentId);
    const target = await Student.findById(followId);

    if (!student || !target) return res.status(404).json({ message: "Student not found" });

    if (!student.following.includes(followId)) {
      student.following.push(followId);
      target.followers.push(studentId);
      await student.save();
      await target.save();
    }

    res.json({ message: `You are now following ${target.name}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowData = async (req, res) => {
  try {
    const student = await Student.findById(req.userId)
      .populate("followers", "name")
      .populate("following", "name");

    res.json({
      followers: student.followers,
      following: student.following
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Teacher can see individual student performance
export const getStudentPerformance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId)
      .populate("badges")
      .populate("groups")
      .populate({
        path: "solvedProblems",
        select: "title difficulty"
      });

    if (!student) return res.status(404).json({ message: "Student not found" });

    // Quiz and simulation stats can be added from existing collections
    res.json({
      student: {
        id: student._id,
        name: student.name,
        badges: student.badges,
        groups: student.groups,
        points: student.points,
        solvedProblems: student.solvedProblems
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
