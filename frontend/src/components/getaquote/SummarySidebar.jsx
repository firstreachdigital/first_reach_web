import React from "react";
import styles from "./GetAQuoteSteps.module.css";
import { SERVICES } from "./Step1Services";

const ALL_SVCS = Object.values(SERVICES).flat();

export default function SummarySidebar({ selected, requirements }) {
  const items = [...selected]
    .map((id) => ALL_SVCS.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className={styles.summary}>
      <h3 className={styles.summaryTitle}>Your Monthly Plan</h3>
      {items.length === 0 ? (
        <p className={styles.summaryEmpty}>No services selected yet</p>
      ) : (
        <>
          {items.map((s) => (
            <div key={s.id} className={styles.summaryItem}>
              <span className={styles.summaryDot} />
              <span className={styles.summaryName}>{s.name}</span>
              {requirements[s.id] && (
                <span className={styles.summaryCount}>{requirements[s.id]}</span>
              )}
            </div>
          ))}
          <div className={styles.summaryFooter}>
            {items.length} service{items.length > 1 ? "s" : ""} selected
          </div>
        </>
      )}
    </div>
  );
}