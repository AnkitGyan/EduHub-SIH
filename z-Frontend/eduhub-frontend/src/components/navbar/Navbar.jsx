import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaTasks, FaChartPie, FaShareAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); 
  };

  const navLinks = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Problems", icon: <FaTasks />, path: "/problems" },
    { name: "Dashboard", icon: <FaChartPie />, path: "/dashboard" },
    { name: "Social", icon: <FaShareAlt />, path: "/social" },
  ];

  return (
    <nav className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
         
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <div className="bg-white p-2 rounded-xl shadow">
              <span className="text-2xl font-extrabold text-orange-600">V</span>
            </div>

          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 text-white font-medium">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.path)}
                className="flex items-center gap-2 hover:text-yellow-200 transition-colors"
              >
                {link.icon} {link.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none text-2xl"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.path)}
              className="flex w-full text-left items-center gap-2 text-white font-medium py-2 border-b border-white/20 hover:text-yellow-200 transition-colors"
            >
              {link.icon} {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
