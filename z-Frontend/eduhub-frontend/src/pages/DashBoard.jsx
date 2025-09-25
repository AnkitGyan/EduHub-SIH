import React, { useState } from 'react';
import { Trophy, Star, Calendar, TrendingUp, Award, CheckCircle, BookOpen, Target, Flame, Zap, Medal, Crown, Home, BarChart3, MessageCircle, Menu, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const StudentDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Sample data for the student
  const studentData = {
    name: "Alex Johnson",
    grade: "10th Grade",
    level: 5,
    totalPoints: 385,
    problemsSolved: 12,
    streak: 7,
    badges: [
      {
        id: 1,
        name: "Problem Solver",
        description: "Solved 10+ problems",
        icon: "🏆",
        earned: true,
        earnedDate: "2024-09-15"
      },
      {
        id: 2,
        name: "Speed Demon",
        description: "Solved 5 problems in one day",
        icon: "⚡",
        earned: true,
        earnedDate: "2024-09-20"
      },
      {
        id: 3,
        name: "Math Master",
        description: "Perfect score in 5 math problems",
        icon: "🔢",
        earned: false
      },
      {
        id: 4,
        name: "Science Star",
        description: "Complete 20 physics problems",
        icon: "🔬",
        earned: false
      }
    ],
    solvedProblems: [
      { id: 1, title: "Sum of Two Numbers", category: "Math", difficulty: "Easy", points: 10, date: "2024-09-15", time: "2m 30s" },
      { id: 2, title: "Area of Circle Calculator", category: "Geometry", difficulty: "Easy", points: 10, date: "2024-09-15", time: "3m 15s" },
      { id: 3, title: "Distance Formula", category: "Coordinate Geometry", difficulty: "Easy", points: 15, date: "2024-09-16", time: "4m 45s" },
      { id: 4, title: "Kinetic Energy Calculator", category: "Physics", difficulty: "Medium", points: 25, date: "2024-09-17", time: "8m 20s" },
      { id: 5, title: "Quadratic Formula Solver", category: "Algebra", difficulty: "Medium", points: 20, date: "2024-09-18", time: "6m 10s" },
      { id: 6, title: "Physics: Ohm's Law Calculator", category: "Physics", difficulty: "Easy", points: 15, date: "2024-09-19", time: "3m 45s" },
      { id: 7, title: "Compound Interest Calculator", category: "Finance Math", difficulty: "Medium", points: 25, date: "2024-09-20", time: "7m 30s" },
      { id: 8, title: "Factorial Calculator", category: "Recursion", difficulty: "Medium", points: 25, date: "2024-09-20", time: "5m 55s" },
      { id: 9, title: "Count Vowels", category: "Strings", difficulty: "Easy", points: 15, date: "2024-09-21", time: "4m 20s" },
      { id: 10, title: "Find Maximum in Array", category: "Arrays", difficulty: "Medium", points: 20, date: "2024-09-22", time: "5m 40s" },
      { id: 11, title: "Palindrome Checker", category: "Strings", difficulty: "Hard", points: 30, date: "2024-09-23", time: "12m 15s" },
      { id: 12, title: "Standard Deviation", category: "Statistics", difficulty: "Hard", points: 35, date: "2024-09-24", time: "15m 30s" }
    ]
  };

  // Data for progress chart
  const progressData = [
    { day: 'Sep 15', problems: 2, points: 20 },
    { day: 'Sep 16', problems: 3, points: 35 },
    { day: 'Sep 17', problems: 4, points: 60 },
    { day: 'Sep 18', problems: 5, points: 80 },
    { day: 'Sep 19', problems: 6, points: 95 },
    { day: 'Sep 20', problems: 8, points: 145 },
    { day: 'Sep 21', problems: 9, points: 160 },
    { day: 'Sep 22', problems: 10, points: 180 },
    { day: 'Sep 23', problems: 11, points: 210 },
    { day: 'Sep 24', problems: 12, points: 245 }
  ];

  // Category distribution data
  const categoryData = [
    { name: 'Math', value: 4, color: '#8B5CF6' },
    { name: 'Physics', value: 3, color: '#06B6D4' },
    { name: 'Geometry', value: 2, color: '#10B981' },
    { name: 'Programming', value: 3, color: '#F59E0B' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';  
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Vidya-Verse
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#" 
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-2 text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg font-medium"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Social</span>
              </a>
            </div>

            {/* User Profile */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-indigo-100 px-4 py-2 rounded-lg">
                <span className="text-indigo-800 font-semibold text-sm">Level {studentData.level}</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{studentData.name.charAt(0)}</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <a 
                href="#" 
                className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition-colors font-medium py-2"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-3 text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg font-medium"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition-colors font-medium py-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Social</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {studentData.name}! 👋</h1>
          <p className="text-gray-600">{studentData.grade} • Keep up the great work on your learning journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Points</p>
                <p className="text-3xl font-bold text-gray-900">{studentData.totalPoints}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Problems Solved</p>
                <p className="text-3xl font-bold text-gray-900">{studentData.problemsSolved}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Current Streak</p>
                <p className="text-3xl font-bold text-gray-900">{studentData.streak} days</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Current Level</p>
                <p className="text-3xl font-bold text-gray-900">Level {studentData.level}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Badges Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span>Achievement Badges</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {studentData.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    badge.earned
                      ? 'border-yellow-300 bg-yellow-50 shadow-md'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h3 className="font-semibold text-sm text-gray-900">{badge.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                  {badge.earned && (
                    <div className="mt-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Earned!
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <span>Progress Over Time</span>
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="problems" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Problems Solved List */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span>Recently Solved Problems</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 rounded-lg">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Problem</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Difficulty</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Points</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentData.solvedProblems.slice().reverse().slice(0, 8).map((problem) => (
                  <tr key={problem.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{problem.title}</td>
                    <td className="py-3 px-4 text-gray-600">{problem.category}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-indigo-600">+{problem.points}</td>
                    <td className="py-3 px-4 text-gray-600">{problem.time}</td>
                    <td className="py-3 px-4 text-gray-600">{problem.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Target className="w-6 h-6 text-indigo-500" />
              <span>Category Distribution</span>
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm text-gray-600">{category.name} ({category.value})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Continue Learning</span>
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>View All Badges</span>
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Join Study Group</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;