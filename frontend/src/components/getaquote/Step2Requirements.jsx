import React from "react";
import styles from "./GetAQuoteSteps.module.css";
import { SERVICES } from "./Step1Services";

const ALL_SVCS = Object.values(SERVICES).flat();

const COUNTER_IDS = ["poster","carousel","story","reels","video","motion","youtube","thumbnail","calendar"];

export default function Step2Requirements({ selected, requirements, updateRequirement }) {
  const selectedSvcs = [...selected].map((id) => ALL_SVCS.find((s) => s.id === id)).filter(Boolean);

  const handleCounter = (id, action) => {
    const cur = typeof requirements[id] === "number" ? requirements[id] : 5;
    const next = action === "inc" ? Math.min(cur + 1, 99) : Math.max(cur - 1, 1);
    updateRequirement(id, next);
  };

  const getVal = (id, fallback = 5) =>
    typeof requirements[id] === "number" ? requirements[id] : fallback;

  return (
    <div>
      <div className={styles.stepHead}>
        <h2 className={styles.stepTitle}>Tell Us Your Monthly Requirements</h2>
        <p className={styles.stepSubtitle}>Specify how much of each service you need every month.</p>
      </div>

      {selectedSvcs.map((svc) => (
        <div key={svc.id} className={styles.reqGroup}>
          <div className={styles.reqLabel}>
            <span className={styles.reqIcon}>{svc.icon}</span>
            {svc.name}
          </div>

          {COUNTER_IDS.includes(svc.id) && (
            <div className={styles.stepper}>
              <button
                className={styles.stepperBtn}
                onClick={() => handleCounter(svc.id, "dec")}
              >−</button>
              <span className={styles.stepperVal}>
                {svc.id === "calendar" ? getVal(svc.id, 1) : getVal(svc.id, 5)}
              </span>
              <button
                className={styles.stepperBtn}
                onClick={() => handleCounter(svc.id, "inc")}
              >+</button>
              <span className={styles.stepperUnit}>
                {svc.id === "calendar" ? "month(s)" : "per month"}
              </span>
            </div>
          )}

          {svc.id === "seo" && (
            <select
              className={styles.reqSelect}
              value={requirements[svc.id] || "Local SEO"}
              onChange={(e) => updateRequirement(svc.id, e.target.value)}
            >
              {["Local SEO", "National SEO", "Ecommerce SEO", "International SEO"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}

          {(svc.id === "meta" || svc.id === "google") && (
            <select
              className={styles.reqSelect}
              value={requirements[svc.id] || "Meta Ads"}
              onChange={(e) => updateRequirement(svc.id, e.target.value)}
            >
              {["Meta Ads", "Google Ads", "Both"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}

          {svc.id === "webmaint" && (
            <select
              className={styles.reqSelect}
              value={requirements[svc.id] || "Business Website"}
              onChange={(e) => updateRequirement(svc.id, e.target.value)}
            >
              {["Business Website", "Ecommerce Website", "Landing Page", "Custom Portal"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}

          {!COUNTER_IDS.includes(svc.id) &&
            !["seo", "meta", "google", "webmaint"].includes(svc.id) && (
              <p className={styles.reqIncluded}>Included in your monthly plan</p>
            )}
        </div>
      ))}
    </div>
  );
}