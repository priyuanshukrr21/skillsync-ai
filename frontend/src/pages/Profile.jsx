import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const languages = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "punjabi", label: "Punjabi" },
  { value: "spanish", label: "Spanish" },
];

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [prefs, setPrefs] = useState({ theme: "light", language: "english" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("skillSyncUser");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    const storedPrefs = JSON.parse(localStorage.getItem("skillSyncPrefs") || "{}");
    setPrefs({ theme: storedPrefs.theme || "light", language: storedPrefs.language || "english" });
  }, [navigate]);

  function updatePrefs(field, value) {
    const next = { ...prefs, [field]: value };
    setPrefs(next);
    localStorage.setItem("skillSyncPrefs", JSON.stringify(next));
    if (field === "theme") {
      document.documentElement.dataset.theme = value;
    }
  }

  function handlePasswordChange(e) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (!password || !confirmPassword) {
      setError("Enter both password fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setMessage("Password updated successfully.");
    setPassword("");
    setConfirmPassword("");
  }

  function handleLogout() {
    localStorage.removeItem("skillSyncUser");
    navigate("/login");
  }

  function handleDeleteAccount() {
    localStorage.removeItem("skillSyncUser");
    localStorage.removeItem("skillSyncPrefs");
    navigate("/signup");
  }

  const initials = user
    ? (user.name
        ? user.name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0].toUpperCase())
            .join("")
        : user.email?.slice(0, 2).toUpperCase())
    : "U";

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-summary">
          <div>
            <h1>Profile settings</h1>
            <p>Manage your SkillSync account, language preferences, theme, and security options.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div className="profile-avatar">{initials}</div>
            <div>
              <div style={{ fontWeight: 700, color: "var(--text-h)", fontSize: 16 }}>Signed in as</div>
              <div style={{ marginTop: 8, fontSize: 18, fontWeight: 600 }}>{user.name || user.email}</div>
              <div style={{ marginTop: 4, color: "#64748b" }}>{user.email}</div>
            </div>
          </div>
        </div>

        {message && <div className="profile-alert success">{message}</div>}
        {error && <div className="profile-alert error">{error}</div>}

        <div className="profile-panel">
          <div>
            <h2>Appearance</h2>
            <p>Switch between light and dark mode for a comfortable workspace.</p>
          </div>
          <div className="setting-grid">
            <div className="setting-row">
              <label htmlFor="theme-select">Theme</label>
              <select
                id="theme-select"
                className="auth-input"
                value={prefs.theme}
                onChange={(e) => updatePrefs("theme", e.target.value)}
              >
                <option value="light">Light mode</option>
                <option value="dark">Dark mode</option>
              </select>
            </div>
            <div className="setting-row">
              <label htmlFor="language-select">Language</label>
              <select
                id="language-select"
                className="auth-input"
                value={prefs.language}
                onChange={(e) => updatePrefs("language", e.target.value)}
              >
                {languages.map((lang) => (
                  <option value={lang.value} key={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="profile-panel">
          <div>
            <h2>Security</h2>
            <p>Change your password or sign out from this device.</p>
          </div>
          <form className="setting-grid" onSubmit={handlePasswordChange}>
            <div className="setting-row">
              <label htmlFor="new-password">New password</label>
              <input
                id="new-password"
                type="password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="setting-row">
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                id="confirm-password"
                type="password"
                className="auth-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            <div className="profile-footer" style={{ gridColumn: "1 / -1" }}>
              <button type="submit" className="primary-btn">Update password</button>
            </div>
          </form>
        </div>

        <div className="profile-panel">
          <div>
            <h2>Account</h2>
            <p>Log out or delete your account from SkillSync.</p>
          </div>
          <div className="profile-footer">
            <button className="secondary-btn" onClick={handleLogout}>Logout</button>
            <button className="secondary-btn" style={{ background: "#fee2e7", color: "#9b123f", borderColor: "#fecdd3" }} onClick={handleDeleteAccount}>Delete account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
