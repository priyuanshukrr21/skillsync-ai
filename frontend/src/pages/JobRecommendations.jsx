import { useState } from "react";
import axios from "axios";

function JobRecommendations() {
	const [skills, setSkills] = useState("");
	const [jobs, setJobs] = useState(null);

	const getRecommendations = async () => {
		try {
			const message = `Recommend jobs for these skills: ${skills}`;
			const res = await axios.post("/chat", { message });
			// Backend returns `{ reply: ... }` so store the reply string as a single-item list
			const reply = res.data?.reply ?? res.data;
			setJobs([ { title: reply, company: "SkillSync AI" } ]);
		} catch (err) {
			console.error(err);
			alert("Failed to fetch recommendations (backend may not be running).");
		}
	};

	return (
		<div style={{ padding: 24, maxWidth: 900, margin: "96px auto" }}>
			<h1>Job Recommendations</h1>
			<p>Enter a comma-separated list of your skills and click Get Recommendations.</p>
			<div style={{ display: "flex", gap: 12, marginTop: 12 }}>
				<input
					value={skills}
					onChange={(e) => setSkills(e.target.value)}
					placeholder="e.g. React, Python, AWS"
					style={{ flex: 1, padding: 10, borderRadius: 6 }}
				/>

				<button onClick={getRecommendations} style={{ padding: 10, borderRadius: 6 }}>
					Get Recommendations
				</button>
			</div>

			{jobs && (
				<ul style={{ marginTop: 20 }}>
					{jobs.map((j, i) => (
						<li key={i} style={{ marginBottom: 8 }}>
							<strong>{j.title}</strong> — {j.company}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default JobRecommendations;
