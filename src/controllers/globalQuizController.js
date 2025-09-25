import GlobalQuiz from "../models/GlobalQuiz.js";
import Question from "../models/questionModel.js";
import Submission from "../models/submissionModel.js";
import User from "../models/user.js";
import Community from "../models/community.js";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Admin: create a global quiz
export const createGlobalQuiz = async (req, res) => {
  try {
    const adminId = req.user._id; // assume isAdmin middleware
    const { title, group, questions, timeLimitMinutes, startAt, endAt } = req.body;

    // Basic validation
    if (!title || !group || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Optionally validate question ids exist
    const qCount = await Question.countDocuments({ _id: { $in: questions } });
    if (qCount !== questions.length) {
      return res.status(400).json({ message: "One or more questions not found" });
    }

    const quiz = await GlobalQuiz.create({
      title, group, questions, timeLimitMinutes, startAt, endAt, createdBy: adminId
    });

    return res.status(201).json({ message: "Global quiz created", quiz });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// Student: submit global quiz (answers array)
export const submitGlobalQuiz = async (req, res) => {
  try {
    const studentId = req.user._id; // protect + isStudent
    const { quizId } = req.params;
    const { answers } = req.body;
    // answers = [{ questionId, selectedOption (index), writtenAnswer (optional) }, ...]

    const quiz = await GlobalQuiz.findById(quizId).populate("questions");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Check group eligibility: map student's classGrade to group
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Determine student's group
    const grade = student.classGrade;
    const gradeToGroup = (g) => (g >=6 && g <=8 ? "6-8" : (g>=9 && g<=10 ? "9-10" : "11-12"));
    if (gradeToGroup(grade) !== quiz.group) {
      return res.status(403).json({ message: "Quiz not available for your class group" });
    }

    // Iterate questions -> evaluate each
    let totalEarned = 0;
    const perQuestionResults = [];

    for (const q of quiz.questions) {
      // extract answer object from body
      const ansObj = answers.find(a => a.questionId.toString() === q._id.toString());
      const selectedOption = ansObj ? ansObj.selectedOption : null;
      const writtenAnswer = ansObj ? ansObj.writtenAnswer : "";

      // Default gptResult and points
      let gptResult = null;
      // If there is a correctAnswerText in question, use GPT to check written answer
      if (q.correctAnswerText) {
        const prompt = `Check if the student's written answer is correct.
Question: ${q.questionText || ""} 
Correct answer: ${q.correctAnswerText}
Student answer: ${writtenAnswer}
Respond with one word: "correct" or "incorrect".`;
        // call OpenAI
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini", // or the model you use
          messages: [{ role: "user", content: prompt }],
          max_tokens: 30
        });
        gptResult = (completion.choices?.[0]?.message?.content || "").toLowerCase();
      } else {
        gptResult = "n/a";
      }

      // Evaluate selected option correctness
      const isOptionCorrect = (selectedOption !== null && selectedOption === q.correctOption);

      // Points rules (admin question points already in q.points)
      let earned = 0;
      if ((gptResult && gptResult.includes("correct") || gptResult === "n/a") && isOptionCorrect) {
        // Both correct => full points
        earned = q.points;
      } else if ( (gptResult && gptResult.includes("correct")) || isOptionCorrect) {
        // one correct => half points (rounded down)
        earned = Math.floor(q.points / 2);
      } else {
        earned = 0;
      }

      totalEarned += earned;

      // Save submission record for each question
      await Submission.create({
        student: studentId,
        question: q._id,
        writtenAnswer,
        selectedOption,
        gptResult,
        pointsEarned: earned,
        dateSolved: new Date()
      });

      perQuestionResults.push({
        questionId: q._id,
        pointsEarned: earned,
        gptResult,
        isOptionCorrect
      });
    }

    // Update student total points
    student.totalPoints = (student.totalPoints || 0) + totalEarned;
    await student.save();

    // If student belongs to a community, add their earned points to community.total
    // There might be multiple communities; typically we add to communities where student is active.
    // Here we increment all communities the student is a member of (or you can choose a "current" community)
    const communities = await Community.find({ members: studentId });
    for (const c of communities) {
      c.points = (c.points || 0) + totalEarned;
      await c.save();
    }

    return res.json({
      message: "Quiz submitted",
      totalEarned,
      perQuestionResults
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// Leaderboards
export const getTopStudents = async (req, res) => {
  try {
    // top 50 by totalPoints
    const top = await User.find().sort({ totalPoints: -1 }).limit(50)
      .select("firstName lastName classGrade totalPoints badges");
    res.json({ leaderboard: top });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTopCommunities = async (req, res) => {
  try {
    const top = await Community.find().sort({ points: -1 }).limit(50)
      .select("name owner members points");
    res.json({ leaderboard: top });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
