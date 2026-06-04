import React from "react";
import styles from "./GetAQuoteSteps.module.css";
import { SERVICES } from "./Step1Services";

const ALL_SVCS = Object.values(SERVICES).flat();

export default function Step5Review({ selected, requirements, business, contact }) {
  const selectedList = [...selected]
    .map((id) => ALL_SVCS.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div>
      <div className={styles.stepHead}>
        <h2 className={styles.stepTitle}>Review Your Monthly Plan</h2>
        <p className={styles.stepSubtitle}>Confirm everything looks right before we prepare your proposal.</p>
      </div>

      <p className={styles.reviewSectionTitle}>Selected Services</p>
      <div className={styles.tagWrap}>
        {selectedList.map((s) => (
          <span key={s.id} className={styles.serviceTag}>
            {s.icon} {s.name}
            {requirements[s.id] ? ` — ${requirements[s.id]}` : ""}
          </span>
        ))}
      </div>

      <p className={styles.reviewSectionTitle}>Business Info</p>
      <table className={styles.reviewTable}>
        <tbody>
          <tr><td>Business Name</td><td>{business.name}</td></tr>
          <tr><td>Website / Instagram</td><td>{business.website || "—"}</td></tr>
          <tr><td>Industry</td><td>{business.industry || "—"}</td></tr>
        </tbody>
      </table>

      <p className={styles.reviewSectionTitle}>Contact Details</p>
      <table className={styles.reviewTable}>
        <tbody>
          <tr><td>Full Name</td><td>{contact.name}</td></tr>
          <tr><td>Email</td><td>{contact.email}</td></tr>
          <tr><td>Phone</td><td>{contact.code} {contact.phone}</td></tr>
        </tbody>
      </table>
    </div>
  );
}