function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(15,23,42,0.75)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ color: "white", margin: 0 }}>
        🚀 SkillSync AI
      </h2>

      <div style={{ display: "flex", gap: "25px" }}>
        <a href="/" style={linkStyle}>Home</a>
        <a href="/resume-analysis" style={linkStyle}>Resume</a>
        <a href="/job-recommendations" style={linkStyle}>Jobs</a>
        <a href="/login" style={linkStyle}>Login</a>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
};

export default Navbar;