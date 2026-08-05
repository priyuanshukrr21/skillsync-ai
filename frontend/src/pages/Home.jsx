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
          flexDirection: "column",
          paddingTop: "80px",
        }}
      >
        <h1>🚀 SkillSync AI</h1>

        <p>Your AI Career Assistant</p>

        <button
          style={{
            padding: "12px 25px",
            marginTop: "20px",
            fontSize: "18px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
         <div
  style={{
    display: "flex",
    gap: "20px",
    marginTop: "60px",
    flexWrap: "wrap",
    justifyContent: "center",
  }}
>
  <div
    style={{
      width: "250px",
      background: "rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "20px",
      color: "white",
      backdropFilter: "blur(10px)",
      textAlign: "center",
    }}
  >
    🤖
    <h3>AI Chat</h3>
    <p>Talk with your personal AI career assistant.</p>
  </div>

  <div
    style={{
      width: "250px",
      background: "rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "20px",
      color: "white",
      backdropFilter: "blur(10px)",
      textAlign: "center",
    }}
  >
    📄
    <h3>Resume Analysis</h3>
    <p>Get AI feedback on your resume instantly.</p>
  </div>

  <div
    style={{
      width: "250px",
      background: "rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "20px",
      color: "white",
      backdropFilter: "blur(10px)",
      textAlign: "center",
    }}
  >
    💼
    <h3>Job Recommendations</h3>
    <p>Find jobs based on your skills using AI.</p>
  </div>
</div> Start AI Chat
        </button>
      </div>
    </>
  );
}

export default Home;