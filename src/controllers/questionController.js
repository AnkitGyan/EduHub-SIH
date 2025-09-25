import Question from "../models/questionModel.js";

export const addQuestion = async (req, res) => {
  try {
    const { classGrade, subject, level, questionText, questionMedia, options, correctOption, correctAnswerText, points } = req.body;

    const question = await Question.create({
      classGrade,
      subject,
      level,
      questionText,
      questionMedia,
      options,
      correctOption,
      correctAnswerText,
      points
    });

    res.status(201).json({ message: "Question added successfully", question });
  } catch (error) {
    res.status(400).json({ message: "Error adding question", error: error.message });
  }
};


export const getProblemsByClass = async (req, res) => {
  try {
    const { studentId } = req.user; 
    const student = req.user; 
    console.log(student.classGrade);
    if (!student || !student.classGrade) {
      return res.status(400).json({ message: "Student classGrade not found" });
    }

    // Fetch problems for the student's class
    const problems = await Question.find({ classGrade: student.classGrade }).sort({ createdAt: -1 });

    // Group by subject
    const grouped = problems.reduce((acc, problem) => {
      if (!acc[problem.subject]) acc[problem.subject] = [];
      acc[problem.subject].push(problem);
      return acc;
    }, {});
    console.log(grouped);
    res.json(grouped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching problems", error: error.message });
  }
};

