import React from "react";
import FeatureCard from "../components/FeatureCard";

function JobRecommendations() {
  const exampleJobs = [
    { title: "Frontend Engineer", company: "Acme Inc.", tags: ["React","JavaScript"] },
    { title: "Data Analyst", company: "DataWorks", tags: ["SQL","Python"] },
    { title: "ML Engineer", company: "ModelFlow", tags: ["Python","PyTorch"] },
  ];

  return (
    <div style={{ padding: 32, minHeight: '60vh' }}>
      <h2>Job Recommendations</h2>
      <p style={{ opacity: 0.85 }}>Personalized openings based on your skills.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginTop: 20 }}>
        {exampleJobs.map((job, idx) => (
          <div key={idx} style={{ padding: 18, borderRadius: 12, background: 'rgba(0,0,0,0.03)' }}>
            <h3 style={{ margin: 0 }}>{job.title}</h3>
            <p style={{ margin: '6px 0 12px', opacity: 0.8 }}>{job.company}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {job.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="primary-btn">View</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <FeatureCard
          icon="🔍"
          title="Improve matches"
          desc="Add your skills to get more relevant job suggestions."
        />
      </div>
    </div>
  );
}

export default JobRecommendations;
