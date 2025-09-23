import Quiz from "../models/quiz.js";
import User from "../models/user.js";

export const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // [{questionId, selectedOptionId}]
    const studentId = req.user._id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach(q => {
      const studentAnswer = answers.find(a => a.questionId == q._id.toString());
      if (studentAnswer) {
        const correctOption = q.options.find(o => o.isCorrect);
        if (correctOption._id.toString() === studentAnswer.selectedOptionId) correctCount++;
      }
    });

    const scorePercentage = (correctCount / quiz.questions.length) * 100;
    const passed = scorePercentage >= 80;

    // Save submission record
    quiz.studentsCompleted.push({ student: studentId, score: scorePercentage, passed });
    await quiz.save();

    // Update student badge tracking
    if (passed) {
      const student = await User.findById(studentId);
      student.completedTeacherQuizzes += 1;

      // Check for badge unlock after 10 successful teacher quizzes
      if (student.completedTeacherQuizzes === 10) {
        student.badges.push({
          name: "Teacher Quiz Master",
          reward: "extra20minGlobalQuiz",
          unlockedAt: new Date()
        });
      }

      await student.save();
    }

    res.status(200).json({ 
      message: "Quiz submitted",
      scorePercentage,
      passed,
      badgeUnlocked: passed && scorePercentage >= 80 && quiz.studentsCompleted.length === 10 ? "Teacher Quiz Master" : null
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
