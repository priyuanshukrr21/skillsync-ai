
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import JobRecommendations from "./pages/JobRecommendations";

function App() {
  return (
    <Routes>
      {/* Main dashboard */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Career features */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/resume-analysis" element={<ResumeAnalysis />} />
      <Route path="/jobs" element={<JobRecommendations />} />
      <Route path="/job-recommendations" element={<JobRecommendations />} />

      {/* Unknown URLs */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
