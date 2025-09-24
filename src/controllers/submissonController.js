import Submission from "../models/submissionModel.js";
import Question from "../models/questionModel.js";
import User from "../models/userModel.js";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const submitAnswer = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { questionId, writtenAnswer, selectedOption } = req.body;

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    // Check written answer using ChatGPT
    const prompt = `
      Check if this answer is correct for the following question:
      Question: ${question.questionText}
      Correct Option: ${question.options[question.correctOption].text}
      Student Answer: ${writtenAnswer}
      Reply only "correct" or "incorrect".
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    });

    const gptResult = response.choices[0].message.content.toLowerCase();

    let pointsEarned = 0;
    if (gptResult.includes("correct") && selectedOption === question.correctOption) {
      pointsEarned = question.points;
    } else if (gptResult.includes("correct") || selectedOption === question.correctOption) {
      pointsEarned = Math.floor(question.points / 2);
    }

    // Save submission
    const submission = await Submission.create({
      student: studentId,
      question: questionId,
      writtenAnswer,
      selectedOption,
      gptResult,
      pointsEarned
    });

    const student = await User.findById(studentId);
    student.points = (student.points || 0) + pointsEarned;
    await student.save();

    res.json({ message: "Answer submitted", submission });
  } catch (error) {
    res.status(400).json({ message: "Error submitting answer", error: error.message });
  }
};
