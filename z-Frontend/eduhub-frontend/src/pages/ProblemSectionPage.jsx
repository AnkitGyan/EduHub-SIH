import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { FaSearch, FaCode } from "react-icons/fa";

const Problems = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔸 Subject cards with new gradient (blue → purple)
  const subjects = [
    { name: "Mathematics" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
  ];

  const problems = [
    { id: 1, title: "Linear Equations", difficulty: "Easy", subject: "Mathematics" },
    { id: 2, title: "Newton’s Laws", difficulty: "Medium", subject: "Physics" },
    { id: 3, title: "Organic Reactions", difficulty: "Hard", subject: "Chemistry" },
    { id: 4, title: "Cell Division", difficulty: "Easy", subject: "Biology" },
    { id: 5, title: "Integration Problems", difficulty: "Medium", subject: "Mathematics" },
  ];

  const filteredProblems = problems.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">

          {/* 🔹 Subject Cards (now blue-purple gradient like button) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {subjects.map((subj) => (
              <div
                key={subj.name}
                className={`cursor-pointer text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 rounded-xl p-10 text-white text-lg font-semibold shadow-lg hover:scale-105 transition-transform`}
              >
                {subj.name}
              </div>
            ))}
          </div>

          {/* 🔍 Search Bar */}
          <div className="mb-6 flex items-center justify-center">
            <div className="relative w-full md:w-2/3">
              <FaSearch className="absolute left-3 top-3 text-orange-500 text-lg" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm"
              />
            </div>
          </div>

          {/* 📜 Problem List Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* ✅ Problem section header uses SAME gradient as Navbar */}
            <table className="w-full text-left border-collapse">
              <thead className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 text-white">
                <tr>
                  <th className="py-4 px-4 text-lg">#</th>
                  <th className="py-4 px-4 text-lg">Title</th>
                  <th className="py-4 px-4 text-lg">Difficulty</th>
                  <th className="py-4 px-4 text-lg">Subject</th>
                  <th className="py-4 px-4 text-lg text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-gray-500">
                      No problems found
                    </td>
                  </tr>
                ) : (
                  filteredProblems.map((p, idx) => (
                    <tr
                      key={p.id}
                      className="border-b hover:bg-orange-50 transition-colors"
                    >
                      <td className="py-3 px-4">{idx + 1}</td>
                      <td className="py-3 px-4 font-medium text-indigo-700">
                        {p.title}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium 
                            ${
                              p.difficulty === "Easy"
                                ? "bg-green-100 text-green-600"
                                : p.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-600"
                            }`}
                        >
                          {p.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4">{p.subject}</td>
                      <td className="py-3 px-4 text-center">
                        {/* ✅ Solve Button same blue-purple gradient as subject cards */}
                        <button className="flex items-center gap-1 mx-auto px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white rounded-full shadow-md hover:scale-105 transition-transform">
                          <FaCode /> Solve
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default Problems;
