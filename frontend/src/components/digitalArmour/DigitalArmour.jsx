import React from "react";
import styles from "./DigitalArmour.module.css";

const pillars = ["Technology", "Strategy", "Communication", "Monitoring", "Execution"];

export default function DigitalArmour() {
  return (
    <section className={styles.section} id="digital-armour">
      <div className={styles.inner}>
        <span className={styles.label} data-inview>
          <span className={styles.labelDot} /> &#123;A&#125; Our Approach
        </span>

        <h2 className={styles.title} data-inview>
          BUILDING DIGITAL ARMOUR FOR MODERN BRANDS
        </h2>

        <p className={styles.copy} data-inview>
          The internet moves fast. Negative content can spread within minutes.
          Fake accounts can confuse customers. Unauthorized content can be
          replicated across multiple platforms. Pirated content can reach
          thousands of viewers before a brand becomes aware of it.
        </p>
        <p className={styles.copy} data-inview>
          And a single viral incident can quickly become a reputation crisis.
        </p>
        <p className={styles.copy} data-inview>
          Welcome to <strong>First Reach Digital</strong>, where we approach
          these challenges through a combination of:
        </p>

        <div className={styles.pillars} data-inview>
          {pillars.map((p) => (
            <span key={p} className={styles.pillar}>
              <span className={styles.pillarDot} />
              {p}
            </span>
          ))}
        </div>

        <p className={styles.closing} data-inview>
          The objective isn't simply to react to problems; It's to build a
          stronger digital ecosystem around the brand.
        </p>

        <div className={styles.mottoBox} data-inview>
          <span className={styles.mottoLabel}>Our Motto</span>
          <p className={styles.mottoText}>
            Help businesses reach the right audience, build a stronger
            digital identity, and protect what they have built.
          </p>
        </div>
      </div>
    </section>
  );
}