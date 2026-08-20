import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ServiceDetailPage.module.css";
import { reputationDetails } from "../data/reputationDetails";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ReputationDetailPage() {
  const { slug } = useParams();
  const data = reputationDetails[slug];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!data) {
    return (
      <main className={styles.notFound}>
        <h2>Not found</h2>
        <Link to="/">Back Home</Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <Link to="/" className={styles.backLink}><FaArrowLeft /> Back</Link>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.intro}>{data.intro}</p>
        {data.sub && <p className={styles.sub}>{data.sub}</p>}
      </div>

      <div className={styles.sections}>
        {data.sections?.map((sec) => (
          <div key={sec.heading} className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>{sec.heading}</h3>
            <ul className={styles.sectionList}>
              {sec.items.map((item) => (
                <li key={item}><span className={styles.bullet} />{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {data.process && (
        <div className={styles.processBox}>
          <span className={styles.processLabel}>Note</span>
          <p className={styles.processText}>{data.process}</p>
        </div>
      )}

      {data.benefits && (
        <div className={styles.benefitsBlock}>
          <h3 className={styles.sectionHeading}>Who Can Benefit / Benefits</h3>
          <div className={styles.benefitsGrid}>
            {data.benefits.map((b) => <div key={b} className={styles.benefitCard}>{b}</div>)}
          </div>
        </div>
      )}

      <div className={styles.ctaBlock}>
        <h3>Ready to Build Your Digital Reputation?</h3>
        <Link to="/contact" className={styles.ctaBtn}>Talk to Our Team <FaArrowRight /></Link>
      </div>
    </main>
  );
}