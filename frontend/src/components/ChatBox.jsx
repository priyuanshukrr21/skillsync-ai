import { useState } from "react";

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I am SkillSync AI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const aiMessage = {
      sender: "ai",
      text: "🤖 AI Response: This feature will be connected to AI in the next step.",
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        background: "#1e293b",
        padding: "20px",
        borderRadius: "15px",
        color: "white",
      }}
    >
      <h2>🤖 SkillSync AI Chat</h2>

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          background: "#0f172a",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      >
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
            }}
          >
            <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "75%",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatBox;