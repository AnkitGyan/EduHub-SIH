import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen, Menu, X, LayoutDashboard,
  ListChecks, Trophy, User,
  Settings, LogOut, Sparkles,
  TrendingUp, Target, Zap
} from "lucide-react";    

export const Header = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // const navigate = (page) => {
  //   setCurrentPage(page);
  //   setMobileMenuOpen(false);
  //   setUserMenuOpen(false);
  // };
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 w-full">
        <div className="w-full px-4">   {/* FULL WIDTH FIXED HERE */}
          <div className="flex items-center justify-between h-16 w-full">

            {/* LOGO */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                LearnQuest
              </span>
            </div>

            {/* NAVIGATION (Desktop) */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate("/")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
                  currentPage === "home"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Home
              </button>

              <button
                onClick={() => navigate("/problems")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
                  currentPage === "problems"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <ListChecks className="w-4 h-4" />
                Problems
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
                  currentPage === "dashboard"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">

              {/* Points */}
              <div className="hidden sm:flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-700">250 pts</span>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition"
                >
                  H
                </button>

                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b">
                      <p className="font-semibold">Hero Student</p>
                      <p className="text-sm text-gray-600">hero@learnquest.com</p>
                    </div>

                    <button
                      onClick={() => navigate("profile")}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                    >
                      <User className="w-5 h-5" /> Profile
                    </button>

                    <button
                      onClick={() => navigate("settings")}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                    >
                      <Settings className="w-5 h-5" /> Settings
                    </button>

                    <div className="border-t">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-gray-50 text-left">
                        <LogOut className="w-5 h-5" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white w-full">
            <div className="px-4 py-2 space-y-1 w-full">
              <button
                onClick={() => navigate("home")}
                className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
              >
                <BookOpen className="w-5 h-5" /> Home
              </button>

              <button
                onClick={() => navigate("problems")}
                className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
              >
                <ListChecks className="w-5 h-5" /> Problems
              </button>

              <button
                onClick={() => navigate("dashboard")}
                className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
              >
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </button>
            </div>
          </div>
        )}
      </header>

      {/* OVERLAY */}
      {(mobileMenuOpen || userMenuOpen) && (
        <div
          onClick={() => {
            setMobileMenuOpen(false);
            setUserMenuOpen(false);
          }}
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
        ></div>
      )}
    </>
  );
};
