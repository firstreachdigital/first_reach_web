import React, { useEffect } from "react";
import styles from "./LegalPage.module.css";

export default function TermsAndConditions() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.label}><span className={styles.dot} />Legal</span>
        <h1>Terms & Conditions</h1>
        <p>Last updated: June 2026</p>
      </div>

      <div className={styles.content}>

        <section className={styles.section}>
          <p className={styles.lead}>
            By accessing our website, engaging our services, subscribing to a plan, or making a payment, you acknowledge and agree to be bound by these Terms & Conditions, Privacy Policy, and Cancellation & Refund Policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>01</span> Scope of Services</h2>
          <p>Our services may include, but are not limited to:</p>
          <div className={styles.grid}>
            {[
              "Digital Marketing","Social Media Management","Search Engine Optimization (SEO)",
              "Website Development","Mobile Application Development","Brand Development & Management",
              "Online Reputation Management","Digital Security Monitoring","Fake Account Detection & Reporting",
              "Content Takedown Assistance","Trademark & Copyright Protection Support","Media Production",
              "Graphic Design","Content Marketing","Consulting Services","Subscription-Based Monitoring Services"
            ].map(item => (
              <div className={styles.serviceTag} key={item}>{item}</div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>02</span> Client Responsibilities</h2>
          <div className={styles.list}>
            {[
              "Provide accurate information necessary for service delivery.",
              "Grant timely access to digital assets, websites, accounts, and platforms where required.",
              "Respond to requests for approvals, revisions, and information within reasonable timeframes.",
              "Maintain lawful ownership or authorization over content, trademarks, and digital assets provided."
            ].map(item => (
              <div className={styles.listItem} key={item}>
                <span className={styles.check}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p style={{marginTop: "1rem", color: "#777", fontSize: "0.9rem"}}>The Company shall not be liable for delays resulting from incomplete information, delayed approvals, or restricted access provided by the client.</p>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>03</span> Service Timelines</h2>
          <p>Project timelines and implementation schedules are estimates and may vary depending on client approvals, third-party platform requirements, technical complexities, regulatory or legal constraints, and force majeure events. Timelines shall not be considered guaranteed delivery commitments unless expressly agreed in writing.</p>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>04</span> Intellectual Property</h2>
          <div className={styles.ipGrid}>
            <div className={styles.ipCard}>
              <h4>Client-Owned Assets</h4>
              <p>The client retains ownership of existing trademarks, logos, content supplied by the client, and proprietary business information.</p>
            </div>
            <div className={styles.ipCard}>
              <h4>Agency-Created Assets</h4>
              <p>Ownership transfer of deliverables may occur only after full payment has been received. The Company retains ownership of proprietary methodologies, internal tools, templates, frameworks, and software components not specifically developed for the client.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>05</span> Platform & Third-Party Services</h2>
          <p>Certain services rely on third-party platforms including Google, Meta, LinkedIn, YouTube, hosting providers, domain registrars, and cloud service providers. The Company cannot guarantee search engine rankings, social media reach, platform approval decisions, account reinstatements, content removal outcomes, or third-party platform actions.</p>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>06</span> Limitation of Liability</h2>
          <div className={styles.highlight}>
            <span className={styles.highlightDot} />
            The Company's liability shall be limited to the amount paid by the client for the specific service giving rise to the claim.
          </div>
          <p style={{marginTop: "1rem"}}>The Company shall not be liable for indirect losses, loss of revenue, loss of profits, loss of reputation, business interruption, third-party platform decisions, or cyber incidents outside the Company's direct control.</p>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>07</span> Subscription Services</h2>
          <p>Certain services may be offered on monthly, quarterly, semi-annual, or annual subscription plans. By subscribing, the client authorizes recurring payments through the selected payment method until cancelled in accordance with the Cancellation Policy.</p>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>08</span> Cancellation Policy</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div>
                <h4>Subscription Cancellation</h4>
                <p>Clients may cancel recurring subscriptions with 30 days written notice via email. Cancellation requests must be submitted at least 10 calendar days prior to the next billing date.</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div>
                <h4>Auto-Payment Cancellation</h4>
                <p>For credit cards, debit cards, UPI AutoPay, and standing instructions, cancellation requests must be submitted at least 10 calendar days before the next scheduled billing date.</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div>
                <h4>Project-Based Services</h4>
                <p>May be cancelled before work commences. Once project execution has started, refunds may not be available except as specifically provided in the Refund Policy.</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div>
                <h4>Company-Initiated Cancellation</h4>
                <p>The Company reserves the right to suspend or terminate services for fraudulent activity, non-payment, violation of laws, abusive conduct, or misuse of services.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>09</span> Refund Policy</h2>
          <p style={{marginBottom: "1.5rem"}}>Due to the nature of professional digital services, refunds are generally limited. Refunds may be considered in the following circumstances:</p>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h4>Valid Subscription Cancellation</h4>
              <p>If a cancellation request was submitted at least 10 days before the next billing cycle and payment is still processed, a refund may be issued after verification.</p>
            </div>
            <div className={styles.card}>
              <h4>Payment After Cancellation</h4>
              <p>Where payment is deducted after a valid cancellation notice within the required window, the amount may be refunded after investigation.</p>
            </div>
            <div className={styles.card}>
              <h4>Duplicate Payments</h4>
              <p>Refunds may be issued for duplicate transactions, accidental multiple charges, or payment gateway processing errors, subject to verification.</p>
            </div>
          </div>
          <div className={styles.highlight} style={{marginTop: "1.5rem"}}>
            <span className={styles.highlightDot} />
            Approved refunds are processed within 7–21 business days depending on payment gateway and banking timelines.
          </div>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>10</span> Complaint Redressal</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div><h4>Initial Acknowledgement</h4><p>Within 2 business days.</p></div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div><h4>Investigation</h4><p>Within 7 business days.</p></div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div><h4>Resolution or Status Update</h4><p>Within 14 business days where reasonably possible. Complex matters may require additional time.</p></div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2><span className={styles.num}>11</span> Modifications</h2>
          <p>The Company reserves the right to modify these Terms & Conditions at any time. Updated versions shall be published on the website and become effective immediately upon publication.</p>
        </section>

      </div>
    </div>
  );
}