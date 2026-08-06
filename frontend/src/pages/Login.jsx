import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      const normalized = {
        ...user,
        name: user.name || user.email?.split("@")[0] || "User",
      };
      localStorage.setItem("skillSyncUser", JSON.stringify(normalized));
      if (!localStorage.getItem("skillSyncPrefs")) {
        localStorage.setItem("skillSyncPrefs", JSON.stringify({ theme: "light", language: "english" }));
      }
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
    <div className="auth-page">
      <div className="auth-card">
        <aside className="auth-side">
          <div className="brand-mark">
            <img src="/logo.svg" alt="SkillSync logo" />
            <div>
              <p>SkillSync</p>
              <strong>AI Career Assistant</strong>
            </div>
          </div>

          <h1>Welcome back</h1>
          <p>Sign in to access your AI career assistant, resume insights, and job recommendations.</p>

          <ul>
            <li>Smart resume optimization</li>
            <li>AI-driven job matching</li>
            <li>Personalized career suggestions</li>
          </ul>
        </aside>

        <section className="auth-form-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
            <div>
              <h2>Sign in</h2>
              <p>Use your email and password to continue.</p>
            </div>
            <img src="/logo.svg" alt="SkillSync mark" style={{ width: 42, height: 42 }} />
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-error" role="alert">{error}</div>}

            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@company.com"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <div className="password-row">
                <input
                  id="login-password"
                  type={showPwd ? "text" : "password"}
                  className="auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <button type="button" className="password-toggle" onClick={() => setShowPwd((s) => !s)}>
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="auth-actions">
              <button className="primary-btn" disabled={loading} style={{ opacity: loading ? 0.8 : 1 }}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <button type="button" className="secondary-btn" onClick={fillDemo}>
                Use demo
              </button>
            </div>

            <div className="auth-note">
              <Link to="#" onClick={(e) => e.preventDefault()} className="auth-link">
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="auth-footer">
            <span>Don't have an account?</span>{" "}
            <Link to="/signup" className="auth-link">
              Create one
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
