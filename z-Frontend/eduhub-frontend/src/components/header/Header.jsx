import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen, Menu, X, LayoutDashboard,
  ListChecks, Trophy, User,
  Settings, LogOut, MessageCircle
} from "lucide-react";
import logo from "../../assets/logo.png";
import Chatbot from "../chatbot/Chatbot";

export const Header = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 w-full">
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-16 w-full">

            {/* LOGO */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img src={logo} alt="logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                VidyaVerse
              </span>
            </div>

            {/* NAVIGATION (Desktop) */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-50"
              >
                <BookOpen className="w-4 h-4" /> Home
              </button>

              <button
                onClick={() => navigate("/problems")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-50"
              >
                <ListChecks className="w-4 h-4" /> Problems
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-50"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </button>

              {/* CHAT BUTTON (Desktop) */}
              <button
                onClick={() => setChatOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
              >
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">

              {/* POINTS */}
              <div className="hidden sm:flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-700">250 pts</span>
              </div>

              {/* CHAT ICON (Mobile) */}
              <button
                onClick={() => setChatOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <MessageCircle className="w-5 h-5 text-gray-700" />
              </button>

              {/* USER MENU */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold"
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
                      onClick={() => navigate("/profile")}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      <User className="w-5 h-5" /> Profile
                    </button>

                    <button
                      onClick={() => navigate("/settings")}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      <Settings className="w-5 h-5" /> Settings
                    </button>

                    <div className="border-t">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-gray-50">
                        <LogOut className="w-5 h-5" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-2 space-y-1">
              <button onClick={() => navigate("/")} className="flex w-full gap-3 px-4 py-3 hover:bg-gray-50">
                <BookOpen className="w-5 h-5" /> Home
              </button>
              <button onClick={() => navigate("/problems")} className="flex w-full gap-3 px-4 py-3 hover:bg-gray-50">
                <ListChecks className="w-5 h-5" /> Problems
              </button>
              <button onClick={() => navigate("/dashboard")} className="flex w-full gap-3 px-4 py-3 hover:bg-gray-50">
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </button>
            </div>
          </div>
        )}
      </header>

      {/* CHATBOT */}
      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};
