import { useState } from "react";
import "./Chatbot.css";

const Chatbot = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null; // 🔑 controlled visibility

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Server error. Try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chatbot-box">
      <div className="chatbot-header">
        <span>Support Chat</span>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="chatbot-body">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.from}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="msg bot">Typing...</div>}
      </div>

      <div className="chatbot-footer">
        <input
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
