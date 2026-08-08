import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#0f172a",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              marginBottom: "20px",
            }}
          >
            Welcome to SkillSync AI 🤖
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#cbd5e1",
              marginBottom: "30px",
            }}
          >
            Your AI-powered career assistant
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => (window.location.href = "/chat")}
              style={{
                padding: "14px 28px",
                background: "#6366f1",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              🤖 Chat with AI
            </button>

            <button
              onClick={() => (window.location.href = "/resume")}
              style={{
                padding: "14px 28px",
                background: "#334155",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              📄 Analyze Resume
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;