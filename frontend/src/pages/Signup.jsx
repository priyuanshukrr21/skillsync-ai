import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const user = { name, email, token: "signup-token" };
    localStorage.setItem("skillSyncUser", JSON.stringify(user));
    if (!localStorage.getItem("skillSyncPrefs")) {
      localStorage.setItem("skillSyncPrefs", JSON.stringify({ theme: "light", language: "english" }));
    }
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <aside className="auth-side">
          <div className="brand-mark">
            <img src="/logo.svg" alt="SkillSync logo" />
            <div>
              <p>SkillSync</p>
              <strong>Launch your career</strong>
            </div>
          </div>

          <h1>Get started</h1>
          <p>Create your account to unlock AI-powered resume review, job matching, and skill guidance.</p>

          <ul>
            <li>Build a stronger resume</li>
            <li>Discover tailored job opportunities</li>
            <li>Track your progress over time</li>
          </ul>
        </aside>

        <section className="auth-form-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
            <div>
              <h2>Create account</h2>
              <p>Join SkillSync and start building your career with generative AI support.</p>
            </div>
            <img src="/logo.svg" alt="SkillSync mark" style={{ width: 42, height: 42 }} />
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="signup-name">Full name</label>
              <input
                id="signup-name"
                className="auth-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jane Doe"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@company.com"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a secure password"
              />
            </div>

            <div className="auth-actions">
              <button className="primary-btn" type="submit">
                Create account
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <span>Already have an account?</span>{" "}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Signup;
