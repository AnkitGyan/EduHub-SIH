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
