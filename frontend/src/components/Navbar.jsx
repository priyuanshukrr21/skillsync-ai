import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const current = localStorage.getItem("skillSyncUser");
    setUser(current ? JSON.parse(current) : null);

    const updateUser = () => {
      const stored = localStorage.getItem("skillSyncUser");
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  function handleLogout() {
    localStorage.removeItem("skillSyncUser");
    navigate("/login");
  }

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "14px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(15,23,42,0.85)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <img src="/logo.svg" alt="SkillSync logo" style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.08)", padding: 8 }} />
        <div>
          <h2 style={{ color: "white", margin: 0, fontSize: 18 }}>SkillSync</h2>
          <p style={{ color: "rgba(255,255,255,0.72)", margin: 0, fontSize: 13 }}>AI career assistant</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "18px", alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/resume-analysis" style={linkStyle}>Resume</Link>
        <Link to="/job-recommendations" style={linkStyle}>Jobs</Link>
        {user ? (
          <>
            <Link to="/profile" style={linkStyle}>Profile</Link>
            <button
              onClick={handleLogout}
              style={{
                color: "white",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.28)",
                padding: "8px 14px",
                borderRadius: 12,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={{ ...linkStyle, padding: '10px 18px', background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', borderRadius: 12, boxShadow: '0 16px 30px rgba(124,58,237,0.18)' }}>Get started</Link>
          </>
        )}
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