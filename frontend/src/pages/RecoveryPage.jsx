import React from "react";
import { Link } from "react-router-dom";
import { recoveryDetails } from "../data/recoveryDetails";

export default function RecoveryPage() {
  return (
    <main style={{ paddingTop: "140px", maxWidth: "1000px", margin: "0 auto", padding: "140px 1.5rem 4rem" }}>
      <h1>Recover Access. Rebuild With Confidence.</h1>
      <p>
        Our Digital Account Recovery Services help individuals and businesses navigate account
        suspensions, disabling, restrictions, unauthorized access, and platform-related issues
        through structured investigation, evidence preparation, official appeal processes, and
        platform escalation.
      </p>
      <p style={{ color: "#666", fontSize: "0.95rem" }}>
        Whether your Instagram account is disabled, Facebook account is restricted, social media
        profile is suspended, or YouTube channel has been terminated, our recovery specialists
        assess the situation and develop an appropriate recovery strategy based on the platform's
        policies and the nature of the issue.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.2rem", marginTop: "2rem" }}>
        {Object.entries(recoveryDetails).map(([slug, item]) => (
          <Link
            key={slug}
            to={`/recovery/${slug}`}
            style={{ padding: "1.5rem", border: "1px solid #ddd", borderRadius: "0.8rem", textDecoration: "none" }}
          >
            <h3>{item.title}</h3>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>{item.intro.slice(0, 100)}...</p>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "3rem", padding: "2rem", background: "#f5f5f5", borderRadius: "1rem", textAlign: "center" }}>
        <h3>Need Help Recovering Your Account?</h3>
        <p>Talk to our recovery specialist.</p>
        <Link to="/contact" style={{ display: "inline-block", marginTop: "1rem", padding: "0.7rem 1.5rem", background: "#05caf2", color: "#000", borderRadius: "2rem", textDecoration: "none", fontWeight: 600 }}>
          Contact Today
        </Link>
      </div>
    </main>
  );
}