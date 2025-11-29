import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trophy, CheckCircle, Flame, Star, User } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "Hero Student",
    email: "hero@example.com",
    points: 250,
    streak: 7,
    solved: { easy: 5, medium: 3, hard: 1 },
    badges: [
      { name: "Starter", reward: "Completed 1 problem" },
      { name: "Achiever", reward: "Scored 200+ points" }
    ],
    classGrade: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/dashboard/USER_ID");
        setUser(res.data);
      } catch (err) {
        console.log("Backend not connected, showing dummy data...");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
        <User className="text-blue-600" size={40} /> Deepak
      </h1>

      {/* Top Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold text-gray-700 mb-2">Total Points</h3>
          <p className="text-3xl font-bold flex items-center gap-2 text-yellow-600">
            <Trophy /> {user.points}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold text-gray-700 mb-2">Current Streak</h3>
          <p className="text-3xl font-bold flex items-center gap-2 text-orange-600">
            <Flame /> {user.streak} days
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold text-gray-700 mb-2">Problems Solved</h3>
          <p className="text-3xl font-bold flex items-center gap-2 text-green-600">
            <CheckCircle /> {user.solved.easy + user.solved.medium + user.solved.hard}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="font-semibold text-gray-700 mb-2">Class</h3>
          <p className="text-3xl font-bold text-purple-600">
            {user.classGrade}
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-xl p-8 shadow mb-10">
        <h2 className="font-bold text-2xl mb-6">Subject Progress</h2>

        <div className="space-y-5">
          {[
            { subject: "Easy", value: user.solved.easy, color: "bg-green-500" },
            { subject: "Medium", value: user.solved.medium, color: "bg-yellow-500" },
            { subject: "Hard", value: user.solved.hard, color: "bg-red-500" },
          ].map((item) => (
            <div key={item.subject}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{item.subject}</span>
                <span className="text-gray-600">{item.value} solved</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className={`h-3 rounded-full ${item.color}`}
                  style={{ width: `${item.value * 10}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white rounded-xl p-8 shadow">
        <h2 className="font-bold text-2xl mb-6">Badges Earned</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {user.badges.map((badge, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 shadow flex items-center gap-4"
            >
              <Star className="text-yellow-600" size={40} />
              <div>
                <h3 className="font-bold text-lg">{badge.name}</h3>
                <p className="text-gray-600 text-sm">{badge.reward}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
