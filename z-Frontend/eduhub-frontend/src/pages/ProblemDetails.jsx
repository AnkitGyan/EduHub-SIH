import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";

const ProblemDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data } = await axios.get(`/api/questions/${id}`);
        setQuestion(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleSubmit = async () => {
    if (!writtenAnswer && selectedOption === null) {
      setMessage("Please select an option or write an answer before submitting.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "/api/submissions",
        {
          questionId: id,
          writtenAnswer,
          selectedOption
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage(data.message || "Answer submitted!");
    } catch (err) {
      console.error(err);
      setMessage("Error submitting answer.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!question) return <div className="text-center mt-10">Question not found.</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white rounded-xl p-5 mb-6">
            <h1 className="text-3xl font-bold">{question.title}</h1>
            <p className="mt-2 text-lg">{question.difficulty} • {question.points} Points</p>
          </div>

          {/* Description */}
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            {question.description}
          </p>

          {/* Options */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Select an Option:</h2>
            {question.options.map((opt, index) => (
              <label
                key={index}
                className="flex items-center mb-2 cursor-pointer p-3 rounded-lg border hover:shadow-md
                           bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white"
              >
                <input
                  type="radio"
                  name="option"
                  value={index}
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                  className="mr-3 w-5 h-5"
                />
                {opt.text}
              </label>
            ))}
          </div>

          {/* Written Answer */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Or Write Your Answer:</h2>
            <textarea
              className="w-full h-32 p-3 rounded-lg border border-gray-300 focus:outline-none
                         focus:ring-2 focus:ring-purple-500"
              placeholder="Write your detailed answer here..."
              value={writtenAnswer}
              onChange={(e) => setWrittenAnswer(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 text-lg font-bold rounded-xl shadow-md
                       bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600
                       hover:opacity-90 transition duration-200"
          >
            Submit Code
          </button>

          {message && (
            <div className="mt-4 text-center text-lg font-semibold text-gray-700">
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProblemDetailPage;
