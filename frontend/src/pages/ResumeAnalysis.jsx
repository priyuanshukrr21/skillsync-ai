
import { useRef, useState } from "react";

export default function ResumeAnalysis() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  function handleFile(selectedFile) {
    setMessage("");

    if (!selectedFile) return;

    const extension = selectedFile.name.split(".").pop().toLowerCase();
    const allowed = ["pdf", "docx"];

    if (!allowed.includes(extension)) {
      setFile(null);
      setMessage("Please upload a PDF or DOCX file.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setFile(null);
      setMessage("File size must be 10 MB or less.");
      return;
    }

    setFile(selectedFile);
  }

  function handleAnalyze() {
    if (!file) {
      setMessage("Please choose your resume first.");
      return;
    }

    setMessage(
      "Resume selected successfully. Connect the backend to generate your actual analysis."
    );
  }

  return (
    <>
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">🚀</div>
          <div>
            <h1>SkillSync <span>AI</span></h1>
            <p>Career Intelligence</p>
          </div>
        </div>
        <span className="muted">Resume Analyzer</span>
      </header>

      <main className="resume-page">
        <section className="resume-card">
          <div className="brand-icon">📄</div>

          <h2>Upload Your Resume</h2>
          <p>
            Upload your PDF or DOCX resume and prepare for your next career move.
          </p>

          <div
            className="upload-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFile(e.dataTransfer.files[0]);
            }}
          >
            <div className="upload-icon">☁️</div>

            <p>
              <strong>Drag and drop your resume here</strong>
            </p>
            <p className="muted">or choose a file from your computer</p>

            <input
              ref={fileRef}
              className="file-input"
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            <button
              type="button"
              className="choose-btn"
              onClick={() => fileRef.current?.click()}
            >
              Choose Resume
            </button>

            <span className="upload-help">
              PDF or DOCX · Maximum size 10 MB
            </span>
          </div>

          {file && (
            <div className="status-message">
              Selected: {file.name} · {(file.size / 1024).toFixed(1)} KB
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setMessage("");
                  if (fileRef.current) fileRef.current.value = "";
                }}
                style={{
                  float: "right",
                  border: 0,
                  background: "transparent",
                  color: "#c4b7ff"
                }}
              >
                Remove
              </button>
            </div>
          )}

          <button
            className="primary-btn"
            type="button"
            onClick={handleAnalyze}
          >
            ✨ Analyze Resume →
          </button>

          {message && (
            <div className="status-message" role="status">
              {message}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
