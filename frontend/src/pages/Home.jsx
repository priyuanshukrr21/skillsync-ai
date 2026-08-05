import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(180deg,#0f172a 0%, #071020 100%)",
        color: "white",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 20px",
      }}
    >
      <h1 style={{ marginTop: 8 }}>🚀 SkillSync AI</h1>
      <p style={{ opacity: 0.85, marginTop: 6 }}>Your AI Career Assistant</p>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => navigate("/chat")}
          className="primary-btn"
        >
          Start AI Chat
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "48px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FeatureCard
          icon="🤖"
          title="AI Chat"
          desc="Talk with your personal AI career assistant."
          onClick={() => navigate("/chat")}
        />

        <FeatureCard
          icon="📄"
          title="Resume Analysis"
          desc="Get AI feedback on your resume instantly."
          onClick={() => navigate("/resume-analysis")}
        />

        <FeatureCard
          icon="💼"
          title="Job Recommendations"
          desc="Find jobs based on your skills using AI."
          onClick={() => navigate("/job-recommendations")}
        />
      </div>
    </div>
  );
}

export default Home;