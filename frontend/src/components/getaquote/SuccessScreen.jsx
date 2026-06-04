import React from "react";
import { Link } from "react-router-dom";
import styles from "./GetAQuoteSteps.module.css";

export default function SuccessScreen({ contact }) {
  const waLink = `https://wa.me/919633891704?text=Hi%2C%20I%20just%20submitted%20a%20quote%20request.%20My%20name%20is%20${encodeURIComponent(contact.name)}.`;

  return (
    <div className={styles.successWrap}>
      <div className={styles.successIcon}>🎉</div>
      <h2 className={styles.successTitle}>Your Request Has Been Submitted!</h2>
      <p className={styles.successMsg}>
        Our team is reviewing your requirements and will contact you shortly with a
        customized strategy & proposal.
      </p>
      <div className={styles.successBtns}>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className={styles.btnWa}
        >
          💬 Chat on WhatsApp
        </a>
        <Link to="/contact" className={styles.btnOutline}>
          📞 Book a Consultation
        </Link>
        <Link to="/" className={styles.btnOutline}>
          ← Back to Home
        </Link>
      </div>
      <div className={styles.trustBox}>
        <p>✔ Customized Strategy &nbsp;·&nbsp; ✔ Dedicated Team &nbsp;·&nbsp; ✔ Fast Response &nbsp;·&nbsp; ✔ UAE & India Support</p>
      </div>
    </div>
  );
}