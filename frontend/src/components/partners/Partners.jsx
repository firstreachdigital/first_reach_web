import React from "react";
import styles from "./Partners.module.css";

// Replace src with actual logo image imports
const featuredLogos = [
  { name: "ThePrint", src: "" },
  { name: "Deccan Herald", src: "" },
  { name: "Outlook", src: "" },
  { name: "Times of India", src: "" },
  { name: "The Tribune", src: "" },
  { name: "Mashable", src: "" },
  { name: "News18", src: "" },
  { name: "India Today", src: "" },
  { name: "The Telegraph", src: "" },
];

const partnerLogos = ["Microsoft India", "META", "Google", "Kerala Police"];

export default function Partners() {
  return (
    <section className={styles.section} id="partners">
      <div className={styles.block} data-inview>
        <span className={styles.label}>Featured On</span>
        <div className={styles.logoRow}>
          {featuredLogos.map((l) => (
            <div key={l.name} className={styles.logoCircle} title={l.name}>
              {l.src ? (
                <img src={l.src} alt={l.name} />
              ) : (
                <span className={styles.logoFallback}>{l.name.slice(0, 2)}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.block} data-inview>
        <span className={styles.label}>Partnered With</span>
        <div className={styles.partnerRow}>
          {partnerLogos.map((name) => (
            <span key={name} className={styles.partnerName}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}