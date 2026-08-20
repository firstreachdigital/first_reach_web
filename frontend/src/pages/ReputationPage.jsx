import React from "react";
import { Link } from "react-router-dom";
import { reputationDetails } from "../data/reputationDetails";

export default function ReputationPage() {
  return (
    <main style={{ paddingTop: "140px", maxWidth: "1000px", margin: "0 auto", padding: "140px 1.5rem 4rem" }}>
      <h1>Build Your Reputation. Control Your Digital Identity.</h1>
      <p>
        At First Reach Digital, we help individuals and businesses establish, strengthen, and
        protect their online reputation through strategic branding, digital verification, AI
        visibility, and search engine optimization.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.2rem", marginTop: "2rem" }}>
        {Object.entries(reputationDetails).map(([slug, item]) => (
          <Link key={slug} to={`/reputation/${slug}`} style={{ padding: "1.5rem", border: "1px solid #ddd", borderRadius: "0.8rem", textDecoration: "none" }}>
            <h3>{item.title}</h3>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>{item.intro.slice(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </main>
  );
}