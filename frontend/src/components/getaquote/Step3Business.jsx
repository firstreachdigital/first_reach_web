import React from "react";
import styles from "./GetAQuoteSteps.module.css";

const INDUSTRIES = [
  "Real Estate","Education","Healthcare","Travel & Tourism","Fashion",
  "Ecommerce","Restaurant","Construction","Corporate","Personal Brand","Other",
];

export default function Step3Business({ business, setBusiness, errors }) {
  const set = (key, val) => setBusiness((prev) => ({ ...prev, [key]: val }));

  return (
    <div>
      <div className={styles.stepHead}>
        <h2 className={styles.stepTitle}>Tell Us About Your Business</h2>
        <p className={styles.stepSubtitle}>Help us understand your brand so we can tailor the proposal.</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Business Name *</label>
        <input
          className={`${styles.fieldInput} ${errors.bizName ? styles.inputError : ""}`}
          placeholder="Enter your business name"
          value={business.name}
          onChange={(e) => set("name", e.target.value)}
        />
        {errors.bizName && <p className={styles.errorMsg}>{errors.bizName}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Website or Instagram <span className={styles.optional}>(optional)</span></label>
        <input
          className={styles.fieldInput}
          placeholder="https://yourwebsite.com  or  @instagramhandle"
          value={business.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Industry *</label>
        <select
          className={`${styles.fieldSelect} ${errors.industry ? styles.inputError : ""}`}
          value={business.industry}
          onChange={(e) => set("industry", e.target.value)}
        >
          <option value="">Select your industry</option>
          {INDUSTRIES.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
        {errors.industry && <p className={styles.errorMsg}>{errors.industry}</p>}
      </div>
    </div>
  );
}