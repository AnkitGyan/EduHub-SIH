import { useState } from "react";
import { X, Mail, Lock, User, GraduationCap } from "lucide-react";
import { loginUser, registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({ isOpen, initialForm = "login", onClose }) => {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState(initialForm);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    grade: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(loginData);
      console.log("Login successful:", data);
      onClose();
      navigate("/problems")
    } catch (err) {
      console.log(err);
      setError(err.message || "Login failed");
      if (err.message?.includes("User not found")) {
        setCurrentForm("register");
        setRegisterData({ ...registerData, email: loginData.email });
      }
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await registerUser(registerData);
      console.log("Registration successful:", data);
      onClose();
    } catch (err) {
      console.log(err);
      setError(err.message || "Registration failed");
    }
    setLoading(false);
  };

  if (!isOpen) return null; // Do not render if popup is closed

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        {currentForm === "login" ? (
          <div>
            <div className="text-center mb-8">
              <User className="w-12 h-12 text-white mx-auto mb-2" />
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="w-full px-4 py-3 mb-4 rounded-xl bg-white/10 text-white placeholder-white/50"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full px-4 py-3 mb-4 rounded-xl bg-white/10 text-white placeholder-white/50"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <p className="text-white/60 text-center mt-4">
              Don't have an account?{" "}
              <button onClick={() => setCurrentForm("register")} className="underline">
                Register
              </button>
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <GraduationCap className="w-12 h-12 text-white mx-auto mb-2" />
              <h2 className="text-3xl font-bold text-white">Join Us</h2>
            </div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={registerData.firstName}
              onChange={handleRegisterChange}
              className="w-full px-4 py-3 mb-3 rounded-xl bg-white/10 text-white placeholder-white/50"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={registerData.lastName}
              onChange={handleRegisterChange}
              className="w-full px-4 py-3 mb-3 rounded-xl bg-white/10 text-white placeholder-white/50"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className="w-full px-4 py-3 mb-3 rounded-xl bg-white/10 text-white placeholder-white/50"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              className="w-full px-4 py-3 mb-4 rounded-xl bg-white/10 text-white placeholder-white/50"
            />
            <select
              name="grade"
              value={registerData.grade}
              onChange={handleRegisterChange}
              className="w-full px-4 py-3 mb-3 rounded-xl bg-white/10 text-white"
            >
              <option value="">Select Class</option>
              {Array.from({ length: 7 }, (_, i) => i + 6).map((g) => (
                <option key={g} value={g} className="text-black">
                  {g}
                </option>
              ))}
            </select>
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold"
            >
              {loading ? "Creating..." : "Register"}
            </button>
            <p className="text-white/60 text-center mt-4">
              Already have an account?{" "}
              <button onClick={() => setCurrentForm("login")} className="underline">
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
