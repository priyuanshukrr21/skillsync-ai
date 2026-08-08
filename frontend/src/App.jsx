import { useState } from "react";
import "./App.css";

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    type: "Full Time",
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    title: "Python Developer",
    company: "CodeSphere",
    location: "Bangalore",
    type: "Internship",
    skills: ["Python", "FastAPI", "SQL"],
  },
  {
    title: "AI / ML Intern",
    company: "InnovateAI",
    location: "Remote",
    type: "Internship",
    skills: ["Python", "AI", "Machine Learning"],
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("skillsyncUser")) || null
  );

  const navigate = (p) => {
    setPage(p);
    setProfileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logout = () => {
    localStorage.removeItem("skillsyncUser");
    setUser(null);
    setPage("home");
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="brand" onClick={() => navigate("home")}>
          <div className="brand-icon">🚀</div>
          <div>
            <strong>SkillSync AI</strong>
            <span>Career Intelligence</span>
          </div>
        </div>

        <div className="nav-links">
          <button
            className={page === "home" ? "active" : ""}
            onClick={() => navigate("home")}
          >
            Home
          </button>

          <button onClick={() => navigate("resume")}>
            Resume
          </button>

          <button onClick={() => navigate("jobs")}>
            Jobs
          </button>

          <button onClick={() => navigate("chat")}>
            AI Chat
          </button>
        </div>

        <div className="nav-right">
          {user ? (
            <div className="profile-wrapper">
              <button
                className="profile-button"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="avatar">
                  {user.name?.charAt(0).toUpperCase() || "P"}
                </div>
                <span>{user.name || "Profile"}</span>
                <span>⌄</span>
              </button>

              {profileOpen && (
                <div className="profile-menu">
                  <div className="profile-menu-header">
                    <div className="big-avatar">
                      {user.name?.charAt(0).toUpperCase() || "P"}
                    </div>
                    <div>
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                    </div>
                  </div>

                  <button onClick={() => navigate("profile")}>
                    👤 My Profile
                  </button>

                  <button onClick={() => navigate("dashboard")}>
                    📊 Dashboard
                  </button>

                  <button onClick={() => navigate("settings")}>
                    ⚙️ Settings
                  </button>

                  <button className="logout" onClick={logout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate("login")}>
                Login
              </button>

              <button className="signup-btn" onClick={() => navigate("signup")}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* PAGE CONTENT */}
      {page === "home" && <Home navigate={navigate} />}
      {page === "resume" && <Resume />}
      {page === "jobs" && <Jobs />}
      {page === "chat" && <Chat />}
      {page === "login" && (
        <Login setUser={setUser} navigate={navigate} />
      )}
      {page === "signup" && (
        <Signup setUser={setUser} navigate={navigate} />
      )}
      {page === "profile" && (
        <Profile user={user} setUser={setUser} />
      )}
      {page === "dashboard" && <Dashboard user={user} />}
      {page === "settings" && <Settings />}
    </div>
  );
}

/* =========================
   HOME
========================= */

function Home({ navigate }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="badge">
            ✨ AI-POWERED CAREER PLATFORM
          </div>

          <h1>
            Build Your Career
            <br />
            <span>Smarter With AI</span>
          </h1>

          <p>
            SkillSync AI analyzes your skills, improves your resume,
            discovers relevant jobs and helps you prepare for your
            next career opportunity.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("chat")}
            >
              🤖 Chat with AI
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("resume")}
            >
              📄 Analyze Resume
            </button>
          </div>

          <div className="trust-row">
            <div>
              <strong>10K+</strong>
              <span>Career Users</span>
            </div>

            <div>
              <strong>95%</strong>
              <span>AI Accuracy</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>AI Assistance</span>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="ai-orb">
            <div>🤖</div>
          </div>

          <h3>Your AI Career Assistant</h3>

          <p>
            Ask anything about your career, resume, skills or job search.
          </p>

          <div className="mini-chat">
            <div className="ai-message">
              👋 Hi! I'm your SkillSync AI assistant.
            </div>

            <div className="user-message">
              How can I improve my career?
            </div>

            <div className="ai-message">
              🚀 Let's analyze your skills and build a career roadmap.
            </div>
          </div>

          <button
            className="full-btn"
            onClick={() => navigate("chat")}
          >
            Start Conversation →
          </button>
        </div>
      </section>

      <section className="features">
        <div className="section-title">
          <span>POWERFUL FEATURES</span>
          <h2>Everything You Need To Grow</h2>
          <p>
            One intelligent platform for your complete career journey.
          </p>
        </div>

        <div className="feature-grid">
          <Feature
            icon="🤖"
            title="AI Career Assistant"
            text="Get personalized career guidance using AI."
            onClick={() => navigate("chat")}
          />

          <Feature
            icon="📄"
            title="Resume Analyzer"
            text="Analyze your resume and identify improvement areas."
            onClick={() => navigate("resume")}
          />

          <Feature
            icon="💼"
            title="Smart Job Search"
            text="Discover jobs matching your skills and interests."
            onClick={() => navigate("jobs")}
          />

          <Feature
            icon="📊"
            title="Career Dashboard"
            text="Track your career progress and skills."
            onClick={() => navigate("dashboard")}
          />
        </div>
      </section>

      <section className="cta">
        <h2>Ready to level up your career?</h2>
        <p>
          Let SkillSync AI become your personal career assistant.
        </p>

        <button
          className="primary-btn"
          onClick={() => navigate("signup")}
        >
          Get Started Free →
        </button>
      </section>
    </main>
  );
}

function Feature({ icon, title, text, onClick }) {
  return (
    <div className="feature-card" onClick={onClick}>
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span>Explore →</span>
    </div>
  );
}

/* =========================
   RESUME
========================= */

function Resume() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);

  const analyze = () => {
    if (!file) {
      alert("Please upload your resume first.");
      return;
    }

    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 1500);
  };

  return (
    <Page title="Resume Analyzer" subtitle="Make your resume stronger with AI.">
      <div className="resume-box">
        <div className="upload-area">
          <div className="upload-icon">📄</div>

          <h2>Upload Your Resume</h2>

          <p>
            Upload your PDF or DOCX resume and analyze it.
          </p>

          <label className="upload-btn">
            Choose Resume
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {file && (
            <div className="selected-file">
              ✅ {file.name}
            </div>
          )}

          <button
            className="primary-btn analyze-btn"
            onClick={analyze}
          >
            {analyzing ? "Analyzing..." : "Analyze Resume →"}
          </button>
        </div>

        {result && (
          <div className="analysis-result">
            <h2>Resume Analysis</h2>

            <div className="score">
              <div className="score-circle">82</div>

              <div>
                <h3>Good Resume!</h3>
                <p>Your resume has strong potential.</p>
              </div>
            </div>

            <div className="analysis-grid">
              <div>
                <strong>90%</strong>
                <span>Skills</span>
              </div>

              <div>
                <strong>78%</strong>
                <span>ATS Score</span>
              </div>

              <div>
                <strong>80%</strong>
                <span>Experience</span>
              </div>
            </div>

            <div className="suggestions">
              <h3>AI Suggestions</h3>
              <p>✓ Add measurable achievements.</p>
              <p>✓ Improve professional summary.</p>
              <p>✓ Add more relevant technical skills.</p>
              <p>✓ Use stronger action verbs.</p>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

/* =========================
   JOBS
========================= */

function Jobs() {
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Page
      title="Smart Job Search"
      subtitle="Find opportunities that match your skills."
    >
      <div className="search-box">
        🔍
        <input
          placeholder="Search jobs, skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="jobs-grid">
        {filteredJobs.map((job, index) => (
          <div className="job-card" key={index}>
            <div className="company-logo">
              {job.company.charAt(0)}
            </div>

            <span className="job-type">{job.type}</span>

            <h2>{job.title}</h2>

            <h4>{job.company}</h4>

            <p>📍 {job.location}</p>

            <div className="skills">
              {job.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <button className="apply-btn">
              View Opportunity →
            </button>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* =========================
   CHAT
========================= */

function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! 👋 I'm your SkillSync AI career assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const message = input;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: message },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply || "No response received.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Backend connection failed. Please make sure FastAPI is running on port 8000.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <Page
      title="SkillSync AI"
      subtitle="Your personal AI career assistant."
    >
      <div className="chat-container">
        <div className="chat-header">
          <div className="ai-avatar">🤖</div>

          <div>
            <strong>SkillSync AI</strong>
            <span>● Online</span>
          </div>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "user"
                  ? "message user"
                  : "message ai"
              }
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="message ai">
              🤖 Thinking...
            </div>
          )}
        </div>

        <div className="chat-input">
          <input
            value={input}
            placeholder="Ask anything about your career..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button onClick={sendMessage}>
            ➤
          </button>
        </div>
      </div>
    </Page>
  );
}

/* =========================
   LOGIN
========================= */

function Login({ setUser, navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const user = {
      name: email.split("@")[0],
      email,
    };

    localStorage.setItem("skillsyncUser", JSON.stringify(user));

    setUser(user);
    navigate("home");
  };

  return (
    <AuthPage
      title="Welcome Back"
      subtitle="Continue your career journey."
    >
      <form onSubmit={login}>
        <label>Email</label>

        <input
          className="form-input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>

        <input
          className="form-input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn full-width">
          Login →
        </button>

        <p className="auth-bottom">
          Don't have an account?{" "}
          <span onClick={() => navigate("signup")}>
            Create one
          </span>
        </p>
      </form>
    </AuthPage>
  );
}

/* =========================
   SIGNUP
========================= */

function Signup({ setUser, navigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const user = {
      name,
      email,
    };

    localStorage.setItem("skillsyncUser", JSON.stringify(user));

    setUser(user);
    navigate("home");
  };

  return (
    <AuthPage
      title="Create Your Account"
      subtitle="Start building your career with AI."
    >
      <form onSubmit={signup}>
        <label>Full Name</label>

        <input
          className="form-input"
          placeholder="Priyanshu Kumar"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>

        <input
          className="form-input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>

        <input
          className="form-input"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn full-width">
          Create Account →
        </button>

        <p className="auth-bottom">
          Already have an account?{" "}
          <span onClick={() => navigate("login")}>
            Login
          </span>
        </p>
      </form>
    </AuthPage>
  );
}

function AuthPage({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🚀</div>

        <h1>{title}</h1>
        <p>{subtitle}</p>

        {children}
      </div>
    </div>
  );
}

/* =========================
   PROFILE
========================= */

function Profile({ user, setUser }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const saveProfile = () => {
    const updated = { name, email };

    localStorage.setItem(
      "skillsyncUser",
      JSON.stringify(updated)
    );

    setUser(updated);

    alert("Profile updated successfully!");
  };

  return (
    <Page
      title="My Profile"
      subtitle="Manage your personal career information."
    >
      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">
            {name?.charAt(0).toUpperCase() || "P"}
          </div>

          <div>
            <h2>{name || "Your Name"}</h2>
            <p>{email}</p>
          </div>
        </div>

        <div className="profile-form">
          <label>Full Name</label>

          <input
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>

          <input
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="primary-btn"
            onClick={saveProfile}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Page>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard({ user }) {
  return (
    <Page
      title={`Hello, ${user?.name || "there"} 👋`}
      subtitle="Here's your career progress."
    >
      <div className="dashboard-grid">
        <Stat icon="📄" value="82%" label="Resume Score" />
        <Stat icon="🎯" value="76%" label="Skill Match" />
        <Stat icon="💼" value="24" label="Jobs Found" />
        <Stat icon="🚀" value="12" label="Skills Tracked" />
      </div>

      <div className="dashboard-card">
        <h2>Career Progress</h2>

        <div className="progress-item">
          <span>Technical Skills</span>
          <strong>85%</strong>
          <div className="progress">
            <div style={{ width: "85%" }}></div>
          </div>
        </div>

        <div className="progress-item">
          <span>Resume Quality</span>
          <strong>82%</strong>
          <div className="progress">
            <div style={{ width: "82%" }}></div>
          </div>
        </div>

        <div className="progress-item">
          <span>Interview Preparation</span>
          <strong>68%</strong>
          <div className="progress">
            <div style={{ width: "68%" }}></div>
          </div>
        </div>
      </div>
    </Page>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="stat-card">
      <span>{icon}</span>
      <strong>{value}</strong>
      <p>{label}</p>
    </div>
  );
}

/* =========================
   SETTINGS
========================= */

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [dark, setDark] = useState(true);

  return (
    <Page
      title="Settings"
      subtitle="Customize your SkillSync experience."
    >
      <div className="settings-card">
        <Setting
          title="Notifications"
          text="Receive career and job notifications."
          checked={notifications}
          setChecked={setNotifications}
        />

        <Setting
          title="Dark Mode"
          text="Use the premium dark interface."
          checked={dark}
          setChecked={setDark}
        />

        <Setting
          title="AI Recommendations"
          text="Allow AI to personalize recommendations."
          checked={true}
          setChecked={() => {}}
        />
      </div>
    </Page>
  );
}

function Setting({ title, text, checked, setChecked }) {
  return (
    <div className="setting">
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <button
        className={`switch ${checked ? "on" : ""}`}
        onClick={() => setChecked(!checked)}
      >
        <span></span>
      </button>
    </div>
  );
}

/* =========================
   PAGE WRAPPER
========================= */

function Page({ title, subtitle, children }) {
  return (
    <main className="page">
      <div className="page-heading">
        <div className="badge">SKILLSYNC AI</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <footer className="creator-footer">
  <div className="creator-line"></div>

  <div className="creator-content">
    <span className="creator-text">Built with</span>

    <span className="creator-heart">♥</span>

    <span className="creator-text">by</span>

    <span className="creator-name">Priyanshu Kumar</span>
  </div>

  <div className="creator-subtitle">
    SkillSync AI • AI-Powered Career Intelligence
  </div>
</footer>
      </div>

      {children}
    </main>
  );
}

export default App;