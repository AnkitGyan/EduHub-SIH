import Solution from "../models/Solution.js";
import Student from "../models/Student.js";

// Submit a solution
export const submitSolution = async (req, res) => {
  try {
    const { problemId, code } = req.body;
    const studentId = req.userId;

    const solution = await Solution.findOneAndUpdate(
      { problem: problemId, student: studentId },
      { code },
      { upsert: true, new: true }
    );

    // Add problem to student's solvedProblems if not already
    await Student.findByIdAndUpdate(studentId, {
      $addToSet: { solvedProblems: problemId }
    });

    res.status(201).json(solution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all students who solved a problem (only names)
export const getProblemSolvers = async (req, res) => {
  try {
    const { problemId } = req.params;

    const solvers = await Solution.find({ problem: problemId })
      .populate("student", "name")
      .select("student createdAt");

    res.json(solvers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific student's solution (only code)
export const getStudentSolution = async (req, res) => {
  try {
    const { problemId, studentId } = req.params;

    const solution = await Solution.findOne({ problem: problemId, student: studentId })
      .select("code createdAt");

    if (!solution) return res.status(404).json({ message: "Solution not found" });

    res.json(solution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
