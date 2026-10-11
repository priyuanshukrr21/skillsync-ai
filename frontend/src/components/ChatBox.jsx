import { useState } from "react";

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I am SkillSync AI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const message = input.trim();

    if (!message || loading) return;

    // Add user message immediately
    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Send message to FastAPI backend
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Add Gemini response
      const aiMessage = {
        sender: "ai",
        text: data.reply || "Sorry, I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat API Error:", error);

      const errorMessage = {
        sender: "ai",
        text: "❌ Unable to connect to SkillSync AI. Please make sure the backend server is running.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Send message by pressing Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
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
      <h2 style={{ marginBottom: "20px" }}>
        🤖 SkillSync AI Chat
      </h2>

      {/* Messages */}
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
          <div
            key={index}
            style={{
              textAlign:
                msg.sender === "user" ? "right" : "left",
              marginBottom: "15px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                maxWidth: "80%",
                padding: "10px 14px",
                borderRadius: "10px",
                background:
                  msg.sender === "user"
                    ? "#2563eb"
                    : "#312e81",
                color: "white",
                lineHeight: "1.5",
              }}
            >
              <strong>
                {msg.sender === "user" ? "You" : "AI"}
              </strong>
              <br />
              {msg.text}
            </span>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div
            style={{
              textAlign: "left",
              marginTop: "10px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: "10px",
                background: "#312e81",
                color: "#c7d2fe",
              }}
            >
              🤖 AI is thinking...
            </span>
          </div>
        )}
      </div>

      {/* Input + Send */}
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Ask anything about your career..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            cursor:
              loading || !input.trim()
                ? "not-allowed"
                : "pointer",
            background:
              loading || !input.trim()
                ? "#64748b"
                : "#6366f1",
            color: "white",
            fontWeight: "600",
          }}
        >
          {loading ? "..." : "➤"}
        </button>
      </div>
    </div>
  );
}

export default ChatBox; 