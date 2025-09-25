import React, { useState, useEffect } from "react";
import { getAuthHeaders } from "../api/auth";

import {
  Trophy, Star, Calendar, TrendingUp, Award, CheckCircle, BookOpen,
  Target, Flame, Crown, Home, BarChart3, MessageCircle, Menu, X, Users
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import axios from "axios";
const API_URL = "http://localhost:5000/api";

const StudentDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  // Fetch student profile + solved problems
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch student info
        const userRes = await axios.get(`${API_URL}/users/me`, {
          headers: getAuthHeaders(),
        });
        setStudent(userRes.data);

        // 2. Fetch solved problems
        const submissionRes = await axios.get(
          `${API_URL}/submissions/student/${userRes.data._id}`,
          { headers: getAuthHeaders() }
        );
        setSolvedProblems(submissionRes.data);

        // 3. Build category distribution
        const categoryCount = {};
        submissionRes.data.forEach((s) => {
          const cat = s.question.subject;
          categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        });
        setCategoryData(
          Object.entries(categoryCount).map(([name, value], i) => ({
            name,
            value,
            color: ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#F43F5E"][i % 5],
          }))
        );
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };

    fetchData();
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!student) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 🔹 Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        {/* Same navbar as before */}
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome */}
        <h1 className="text-3xl font-bold mb-2">Welcome back, {student.name}! 👋</h1>
        <p className="text-gray-600">{student.classGrade} • Keep learning!</p>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          <StatCard title="Total Points" value={student.totalPoints} icon={<Star className="w-6 h-6 text-indigo-600" />} color="indigo" />
          <StatCard title="Problems Solved" value={solvedProblems.length} icon={<CheckCircle className="w-6 h-6 text-green-600" />} color="green" />
          <StatCard title="Current Streak" value={`${student.streak || 0} days`} icon={<Flame className="w-6 h-6 text-orange-600" />} color="orange" />
          <StatCard title="Current Level" value={`Level ${student.level || 1}`} icon={<Crown className="w-6 h-6 text-purple-600" />} color="purple" />
        </div>

        {/* Problems Solved Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" /> Recently Solved Problems
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4">Problem</th>
                  <th className="text-left py-3 px-4">Subject</th>
                  <th className="text-left py-3 px-4">Difficulty</th>
                  <th className="text-left py-3 px-4">Points</th>
                  <th className="text-left py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {solvedProblems.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{s.question.questionText}</td>
                    <td className="py-3 px-4">{s.question.subject}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs border ${getDifficultyColor(s.question.level)}`}>
                        {s.question.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-indigo-600">+{s.pointsEarned}</td>
                    <td className="py-3 px-4">{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Target className="w-6 h-6 text-indigo-500 mr-2" /> Category Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};


const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${color}-500`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`bg-${color}-100 p-3 rounded-lg`}>{icon}</div>
    </div>
  </div>
);

export default StudentDashboard;
