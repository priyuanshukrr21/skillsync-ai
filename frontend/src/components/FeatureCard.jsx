import React from "react";

function FeatureCard({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick && onClick()}
      style={{
        width: 260,
        background: "rgba(255,255,255,0.04)",
        borderRadius: 16,
        padding: 20,
        color: "white",
        backdropFilter: "blur(8px)",
        textAlign: "center",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        boxShadow: "0 6px 18px rgba(2,6,23,0.4)",
      }}
    >
      <div style={{ fontSize: 40 }}>{icon}</div>
      <h3 style={{ margin: "12px 0 6px" }}>{title}</h3>
      <p style={{ margin: 0, opacity: 0.9, fontSize: 15 }}>{desc}</p>
    </div>
  );
}

export default FeatureCard;
