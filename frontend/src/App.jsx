import { useEffect } from "react";
import Home from "./pages/Home";
import JobRecommendations from "./pages/JobRecommendations";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ChatBox from "./components/ChatBox";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("skillSyncPrefs") || "{}");
    document.documentElement.dataset.theme = settings.theme || "light";
  }, []);
  return (
    <div>
      <Navbar />

      <main style={{ paddingTop: 90 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job-recommendations" element={<JobRecommendations />} />
          <Route path="/resume-analysis" element={<ResumeAnalysis />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<ChatBox />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;