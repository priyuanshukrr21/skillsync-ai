
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    // Frontend preview only. Real authentication needs a backend.
    setMessage("Login UI is working. Backend authentication is not connected yet.");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <header className="brand">
          <div className="brand-icon">🚀</div>
          <h1>SkillSync <span>AI</span></h1>
          <p>Career Intelligence</p>
        </header>

        <h2 className="auth-heading">Welcome Back</h2>
        <p className="auth-subtitle">
          Continue your career journey with AI.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="primary-btn" type="submit">
            Login →
          </button>
        </form>

        {message && <div className="status-message" role="status">{message}</div>}

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </section>
    </main>
  );
}
