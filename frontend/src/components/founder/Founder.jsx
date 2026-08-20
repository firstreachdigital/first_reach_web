import React from "react";
import styles from "./Founder.module.css";
import { FaInstagram, FaLinkedin, FaXTwitter, FaTelegram } from "react-icons/fa6";
import founderImg from "../../assets/mosas.png"; // ← replace with actual founder image path

const stats = [
  { num: "1,000+", label: "Links Removed" },
  { num: "80+", label: "Movies Protected" },
  { num: "100+", label: "Brands & Entrepreneurs" },
  { num: "10+", label: "Years Industry Experience" },
];

export default function Founder() {
  return (
    <section className={styles.section} id="founder">
      <div className={styles.header}>
        <span className={styles.label} data-inview>
          <span className={styles.labelDot} /> &#123;B&#125; Leadership
        </span>
        <h2 className={styles.title} data-inview>
          Meet the Founder
        </h2>
      </div>

      <div className={styles.grid}>
        <div className={styles.imgWrap} data-inview>
            
          <img src={founderImg} alt="Mosas Babu — Founder, First Reach Digital" className={styles.img} />
        </div>

        <div className={styles.content} data-inview>
          <h3 className={styles.name}>Mosas Babu</h3>

          <p className={styles.copy}>
            As the Founder of <strong>First Reach Digital</strong>, Mosas Babu
            has spent 10+ years working across digital marketing, reputation
            management, public relations, anti-piracy, SEO, web development,
            performance marketing, and digital brand protection. His work is
            driven by one simple philosophy — "A strong brand isn't just
            built. It must be protected."
          </p>

          <p className={styles.copy}>
            He began his journey in the digital industry helping businesses
            establish their presence and connect with their audiences online.
            As the digital landscape evolved, he recognized that businesses
            today need more than marketing. They need visibility. Credibility.
            Protection. Preparedness. And a digital crisis can escalate
            before a business has the opportunity to respond.
          </p>

          <p className={styles.copy}>
            This realization shaped his approach to digital growth into one
            strategy that combines marketing, technology, reputation,
            communication, and protection under one ecosystem.
          </p>

          <div className={styles.statGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statBox}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.mottoBox}>
            <span className={styles.mottoLabel}>His Objective</span>
            <p className={styles.mottoText}>
              Help businesses reach the right audience, build a stronger
              digital identity, and protect what they have built.
            </p>
          </div>

          <p className={styles.copy}>
            First Reach Digital brings together digital marketing, technology,
            reputation management, public relations, anti-piracy, and brand
            protection — under one ecosystem.
          </p>

          <div className={styles.socials}>
            <a href="#" aria-label="Instagram" className={styles.socialIcon}><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className={styles.socialIcon}><FaLinkedin /></a>
            <a href="#" aria-label="X (Twitter)" className={styles.socialIcon}><FaXTwitter /></a>
            <a href="#" aria-label="Telegram" className={styles.socialIcon}><FaTelegram /></a>
          </div>
        </div>
      </div>
    </section>
  );
}