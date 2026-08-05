function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "12px 28px",
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="/logo192.png" alt="logo" style={{ width: 40, height: 40, borderRadius: 8 }} />
        <h2 style={{ color: "white", margin: 0, fontSize: 18 }}>
          SkillSync
        </h2>
      </div>

      <div style={{ display: "flex", gap: "18px", alignItems: 'center' }}>
        <a href="/" style={linkStyle}>Home</a>
        <a href="/resume-analysis" style={linkStyle}>Resume</a>
        <a href="/job-recommendations" style={linkStyle}>Jobs</a>
        <a href="/login" style={linkStyle}>Login</a>
        <a href="/signup" style={{...linkStyle, padding: '6px 12px', background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', borderRadius: 8}}>Get started</a>
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