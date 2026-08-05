import React, { useState } from "react";

function ResumeAnalysis() {
  const [fileName, setFileName] = useState(null);

  function handleUpload(e) {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  }

  return (
    <div style={{ padding: 32, minHeight: '60vh' }}>
      <h2>Resume Analysis</h2>
      <p style={{ opacity: 0.85 }}>Upload your resume and get instant AI feedback.</p>

      <div style={{ marginTop: 18 }}>
        <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleUpload} />
        {fileName && <div style={{ marginTop: 10 }}>Selected: <strong>{fileName}</strong></div>}
      </div>

      <div style={{ marginTop: 20 }}>
        <button className="primary-btn">Analyze Resume</button>
      </div>
    </div>
  );
}

export default ResumeAnalysis;
