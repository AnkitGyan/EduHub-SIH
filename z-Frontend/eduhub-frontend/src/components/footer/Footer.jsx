import {
  FaGraduationCap,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  const footerLinks = {
    Learn: ["Courses", "Subjects", "Tutorials", "Practice Tests", "Certifications"],
    Community: ["Forums", "Study Groups", "Mentorship", "Events", "Blog"],
    Support: ["Help Center", "Contact Us", "FAQ", "Technical Support", "Feedback"],
    Company: ["About Us", "Careers", "Privacy Policy", "Terms of Service", "Press"],
  };

  const socialLinks = [
    { name: "Facebook", icon: <FaFacebookF />, color: "hover:bg-blue-500" },
    { name: "Twitter", icon: <FaTwitter />, color: "hover:bg-sky-400" },
    { name: "Instagram", icon: <FaInstagram />, color: "hover:bg-pink-500" },
    { name: "YouTube", icon: <FaYoutube />, color: "hover:bg-red-500" },
    { name: "LinkedIn", icon: <FaLinkedinIn />, color: "hover:bg-blue-600" },
  ];

  return (
    <div className="bg-gray-50 mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* --- Top Section: Brand & Links --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-green-400 rounded-xl flex items-center justify-center text-xl text-white shadow">
                <img src={logo} alt="logo.png" />
              </div>
              <span className="text-xl font-bold text-gray-800">Vidya-Verse</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Empowering students with interactive learning experiences and
              comprehensive educational resources.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 transition-all duration-300 ${social.color} hover:text-white hover:scale-110`}
                  title={social.name}
                >
                  <span className="text-lg text-gray-600">{social.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-lg mb-4 text-gray-800">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-sky-500 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-6 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            © 2025 Vidya-Verse. All rights reserved. | Made with ❤️ for learners worldwide
          </p>
        </div>

      </div>
    </div>
  );
};

export default Footer;
