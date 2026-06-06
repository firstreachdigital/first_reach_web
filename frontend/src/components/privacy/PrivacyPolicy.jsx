import React, { useEffect } from "react";
import styles from "./LegalPage.module.css";

export default function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.label}><span className={styles.dot} />Legal</span>
        <h1>Privacy Policy</h1>
        <p>Last updated: June 2026</p>
      </div>

      <div className={styles.content}>

        <section className={styles.section}>
          <p className={styles.lead}>
            We are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your data.
          </p>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>01</span> Information We Collect</h2>
          <p>We may collect the following categories of information:</p>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h4>Personal Information</h4>
              <ul>
                <li>Name & email address</li>
                <li>Phone number</li>
                <li>Business information</li>
                <li>Billing information</li>
              </ul>
            </div>
            <div className={styles.card}>
              <h4>Account Information</h4>
              <ul>
                <li>Usernames</li>
                <li>Platform access permissions</li>
                <li>Service preferences</li>
              </ul>
            </div>
            <div className={styles.card}>
              <h4>Technical Information</h4>
              <ul>
                <li>IP address & device info</li>
                <li>Browser type</li>
                <li>Usage analytics</li>
              </ul>
            </div>
            <div className={styles.card}>
              <h4>Payment Information</h4>
              <ul>
                <li>Processed via secure third-party gateways</li>
                <li>We do not store card details or CVV</li>
                <li>No sensitive banking credentials stored</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>02</span> How We Use Information</h2>
          <div className={styles.list}>
            {["Deliver services and process transactions","Manage subscriptions","Improve customer experience","Provide support and monitor security","Send service notifications","Comply with legal obligations"].map(item => (
              <div className={styles.listItem} key={item}>
                <span className={styles.check}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>03</span> Marketing Communications</h2>
          <p>With your consent, we may send service updates, industry insights, promotional offers, and product announcements. You may opt out of marketing communications at any time.</p>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>04</span> Information Sharing</h2>
          <p>We may share information with payment processors, technology providers, hosting providers, legal advisors, and government authorities when legally required.</p>
          <div className={styles.highlight}>
            <span className={styles.highlightDot} />
            We do not sell personal information to third parties.
          </div>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>05</span> Data Security</h2>
          <p>We implement commercially reasonable security measures including access controls, encryption practices, secure hosting environments, monitoring systems, and internal security procedures. However, no internet-based system can guarantee absolute security.</p>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>06</span> Cookies & Tracking Technologies</h2>
          <p>Our website may use cookies, analytics tools, performance tracking technologies, and advertising measurement tools. Users may control cookie preferences through browser settings.</p>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>07</span> Data Retention</h2>
          <p>Information is retained only for as long as necessary to deliver services, fulfill contractual obligations, maintain business records, and comply with legal requirements.</p>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>08</span> Your Rights</h2>
          <div className={styles.grid}>
            {["Access to personal information","Correction of inaccurate data","Deletion of eligible information","Withdrawal of consent","Restriction of processing where applicable"].map(item => (
              <div className={styles.rightCard} key={item}>
                <span className={styles.rightDot} />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>09</span> Policy Updates</h2>
          <p>We may update this Privacy Policy periodically. Continued use of our services after updates constitutes acceptance of the revised policy.</p>
        </section>

      </div>
    </div>
  );
}