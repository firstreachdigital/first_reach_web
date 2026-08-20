import React from "react";
import { Link } from "react-router-dom";
import { removalDetails } from "../data/removalDetails";

export default function RemovalPage() {
  return (
    <main style={{ paddingTop: "140px", maxWidth: "1000px", margin: "0 auto", padding: "140px 1.5rem 4rem" }}>
      <h1>Restore Your Digital Reputation.</h1>
      <p>
        Negative search results, unauthorized content, and compromised business assets can
        significantly impact trust and business growth. Our removal services focus on
        legitimate, policy-compliant strategies to address eligible online issues and restore
        your digital reputation.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.2rem", marginTop: "2rem" }}>
        {Object.entries(removalDetails).map(([slug, item]) => (
          <Link
            key={slug}
            to={`/removal/${slug}`}
            style={{ padding: "1.5rem", border: "1px solid #ddd", borderRadius: "0.8rem", textDecoration: "none" }}
          >
            <h3>{item.title}</h3>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>{item.intro.slice(0, 100)}...</p>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "3rem", padding: "2rem", background: "#f5f5f5", borderRadius: "1rem", textAlign: "center" }}>
        <h3>Don't Let a Locked Account Stop Your Business.</h3>
        <Link to="/contact" style={{ display: "inline-block", marginTop: "1rem", padding: "0.7rem 1.5rem", background: "#05caf2", color: "#000", borderRadius: "2rem", textDecoration: "none", fontWeight: 600 }}>
          Contact Today
        </Link>
      </div>
    </main>
  );
}