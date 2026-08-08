import { useState } from "react";
import axios from "axios";

function ResumeAnalysis() {
	const [file, setFile] = useState(null);
	const [result, setResult] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) return alert("Please choose a resume file first.");

		// The backend currently exposes a `/chat` endpoint. Send a descriptive message
		// to the chat endpoint as a temporary placeholder for resume analysis.
		try {
			const message = `Please analyze the resume file named: ${file.name}`;
			const res = await axios.post("/chat", { message });
			setResult(res.data.reply || res.data);
		} catch (err) {
			console.error(err);
			alert("Analysis failed (backend may not be running).");
		}
	};

	return (
		<div style={{ padding: 24, maxWidth: 900, margin: "96px auto" }}>
			<h1>Resume Analysis</h1>
			<form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
				<input
					type="file"
					accept=".pdf,.doc,.docx"
					onChange={(e) => setFile(e.target.files[0])}
				/>

				<button type="submit" style={{ padding: 10, borderRadius: 6 }}>
					Analyze Resume
				</button>
			</form>

			{result && (
				<div style={{ marginTop: 20 }}>
					<h3>Analysis Result</h3>
					<pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(result, null, 2)}</pre>
				</div>
			)}
		</div>
	);
}

export default ResumeAnalysis;
