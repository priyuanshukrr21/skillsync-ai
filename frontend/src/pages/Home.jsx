
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const activities = [
  { icon: "📄", title: "Resume Analyzer", detail: "Upload your resume for analysis", path: "/resume-analysis", tag: "Get started" },
  { icon: "💼", title: "Job Recommendations", detail: "Explore career opportunities", path: "/jobs", tag: "Explore jobs" },
  { icon: "🤖", title: "AI Career Assistant", detail: "Ask questions about your career", path: "/chat", tag: "Start chat" },
];

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (path) => navigate(path);

  return (
    <div className="career-app">
      <aside className={`career-sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <Link to="/dashboard" className="career-brand">
          <span className="brand-mark">✦</span>
          <span>SkillSync <b>AI</b><small>CAREER INTELLIGENCE</small></span>
        </Link>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-link active">
            <span>◫</span> Dashboard
          </Link>
          <Link to="/chat" className="nav-link">
            <span>✧</span> AI Career Chat
          </Link>
          <Link to="/resume-analysis" className="nav-link">
            <span>▤</span> Resume Analyzer
          </Link>
          <Link to="/jobs" className="nav-link">
            <span>▣</span> Job Recommendations
          </Link>
          <Link to="/profile" className="nav-link">
            <span>◎</span> My Profile
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span>✦</span>
            <h4>Your next career move starts here.</h4>
            <p>Build skills. Improve your resume. Discover opportunities.</p>
          </div>
          <Link to="/settings" className="nav-link">⚙ Settings</Link>
          <Link to="/login" className="nav-link">↪ Logout</Link>
        </div>
      </aside>

      <main className="career-main">
        <header className="career-topbar">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <div className="breadcrumb">Workspace <span>/</span> Dashboard</div>
          <div className="topbar-right">
            <span className="status-dot"></span>
            <span className="online-label">AI Assistant Online</span>
            <Link to="/profile" className="avatar">P</Link>
          </div>
        </header>

        <div className="career-content">
          <section className="welcome-banner">
            <div className="welcome-copy">
              <span className="eyebrow">YOUR PERSONAL CAREER WORKSPACE</span>
              <h1>Build your future with <span>SkillSync AI.</span></h1>
              <p>Your AI-powered career companion to help you prepare, grow and find your next opportunity.</p>
              <div className="welcome-actions">
                <button className="btn-primary" onClick={() => goTo("/resume-analysis")}>
                  Analyze my resume <span>→</span>
                </button>
                <button className="btn-secondary" onClick={() => goTo("/chat")}>
                  Talk to AI <span>✧</span>
                </button>
              </div>
            </div>
            <div className="welcome-art" aria-hidden="true">
              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>
              <div className="hero-core">✦</div>
              <div className="float-card float-top">✧ AI Career Coach</div>
              <div className="float-card float-bottom">↗ Career Growth</div>
            </div>
          </section>

          <div className="section-heading">
            <div>
              <h2>Your career overview</h2>
              <p>Everything you need to move forward.</p>
            </div>
            <span className="demo-label">PERSONAL WORKSPACE</span>
          </div>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-icon purple">▤</div>
              <span className="stat-caption">Resume analyses</span>
              <h3>Get started</h3>
              <p>Review your resume and identify areas to improve.</p>
            </article>
            <article className="stat-card">
              <div className="stat-icon blue">⌕</div>
              <span className="stat-caption">Job opportunities</span>
              <h3>Find your fit</h3>
              <p>Explore roles that match your career interests.</p>
            </article>
            <article className="stat-card">
              <div className="stat-icon green">✧</div>
              <span className="stat-caption">AI career support</span>
              <h3>Always ready</h3>
              <p>Get guidance for skills, interviews and career planning.</p>
            </article>
            <article className="stat-card">
              <div className="stat-icon orange">◎</div>
              <span className="stat-caption">Your next milestone</span>
              <h3>One step at a time</h3>
              <p>Build your profile and track your progress.</p>
            </article>
          </section>

          <div className="dashboard-columns">
            <section className="panel quick-panel">
              <div className="section-heading compact">
                <div>
                  <h2>Quick actions</h2>
                  <p>Pick up where your career journey begins.</p>
                </div>
              </div>

              <div className="action-list">
                {activities.map((item) => (
                  <button
                    key={item.title}
                    className="action-item"
                    onClick={() => goTo(item.path)}
                  >
                    <span className="action-icon">{item.icon}</span>
                    <span className="action-copy">
                      <strong>{item.title}</strong>
                      <small>{item.detail}</small>
                    </span>
                    <span className="action-arrow">↗</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="panel assistant-panel">
              <div className="assistant-symbol">✦</div>
              <span className="eyebrow">MEET YOUR AI ASSISTANT</span>
              <h2>A little guidance can change everything.</h2>
              <p>Preparing for an interview? Choosing a tech stack? Planning your career? Start a conversation with your AI career assistant.</p>
              <button className="btn-primary full-button" onClick={() => goTo("/chat")}>
                Start a conversation →
              </button>
              <div className="suggestion-chips">
                <span>Resume tips</span>
                <span>Interview prep</span>
                <span>Career roadmap</span>
              </div>
            </section>
          </div>

          <footer className="career-footer">
            <span>© {new Date().getFullYear()} SkillSync AI</span>
            <span>Designed for your next career move.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Home;
