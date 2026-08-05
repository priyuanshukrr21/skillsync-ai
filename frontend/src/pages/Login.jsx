import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../services/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPwd, setShowPwd] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!email.trim()) return setError("Please enter your email");
    if (!password) return setError("Please enter your password");

    setLoading(true);
    try {
      const user = await auth.login(email.trim(), password);
      localStorage.setItem("skillSyncUser", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  function fillDemo() {
    setEmail("demo@skill.com");
    setPassword("password");
  }

  return (
    <div style={{ padding: 32, minHeight: "60vh" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 420, marginTop: 16 }}>
        {error && (
          <div style={{ marginBottom: 12, color: "#fee2e2", background: "#2b0608", padding: 10, borderRadius: 8 }} role="alert">
            {error}
          </div>
        )}

        <div style={{ marginBottom: 12, textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: 6 }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@company.com"
            style={{ width: "100%", padding: 10, marginTop: 6, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)" }}
          />
        </div>

        <div style={{ marginBottom: 12, textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: 6 }}>Password</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
              style={{ flex: 1, padding: 10, marginTop: 6, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)" }}
            />
            <button type="button" onClick={() => setShowPwd((s) => !s)} style={{ padding: 10, borderRadius: 8 }}>
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="primary-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button type="button" onClick={fillDemo} style={{ background: "transparent", border: "none", color: "#6b7280", cursor: "pointer" }}>
            Use demo
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <a href="#" onClick={(e)=>{e.preventDefault(); alert('Forgot password flow not implemented yet.')}} style={{ color: '#6b7280' }}>Forgot password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
