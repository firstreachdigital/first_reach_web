import React from "react";
import styles from "./GetAQuoteSteps.module.css";

const COUNTRY_CODES = [
  { code: "+91",  flag: "🇮🇳", label: "+91 India" },
  { code: "+971", flag: "🇦🇪", label: "+971 UAE" },
  { code: "+1",   flag: "🇺🇸", label: "+1 USA" },
  { code: "+44",  flag: "🇬🇧", label: "+44 UK" },
  { code: "+61",  flag: "🇦🇺", label: "+61 Australia" },
  { code: "+65",  flag: "🇸🇬", label: "+65 Singapore" },
  { code: "+60",  flag: "🇲🇾", label: "+60 Malaysia" },
  { code: "+974", flag: "🇶🇦", label: "+974 Qatar" },
  { code: "+966", flag: "🇸🇦", label: "+966 Saudi Arabia" },
  { code: "+968", flag: "🇴🇲", label: "+968 Oman" },
];

export default function Step4Contact({ contact, setContact, errors }) {
  const set = (key, val) => setContact((prev) => ({ ...prev, [key]: val }));

  return (
    <div>
      <div className={styles.stepHead}>
        <h2 className={styles.stepTitle}>Let's Connect</h2>
        <p className={styles.stepSubtitle}>We'll reach out with your customized strategy & proposal.</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Full Name *</label>
        <input
          className={`${styles.fieldInput} ${errors.cName ? styles.inputError : ""}`}
          placeholder="Enter your full name"
          value={contact.name}
          onChange={(e) => set("name", e.target.value)}
        />
        {errors.cName && <p className={styles.errorMsg}>{errors.cName}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Email Address *</label>
        <input
          className={`${styles.fieldInput} ${errors.cEmail ? styles.inputError : ""}`}
          type="email"
          placeholder="Enter your email address"
          value={contact.email}
          onChange={(e) => set("email", e.target.value)}
        />
        {errors.cEmail && <p className={styles.errorMsg}>{errors.cEmail}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Phone Number *</label>
        <div className={styles.phoneRow}>
          <select
            className={styles.phoneCode}
            value={contact.code}
            onChange={(e) => set("code", e.target.value)}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.label}
              </option>
            ))}
          </select>
          <input
            className={`${styles.fieldInput} ${errors.cPhone ? styles.inputError : ""}`}
            placeholder="Phone number"
            value={contact.phone}
            onChange={(e) => set("phone", e.target.value)}
            style={{ flex: 1 }}
          />
        </div>
        {errors.cPhone && <p className={styles.errorMsg}>{errors.cPhone}</p>}
      </div>
    </div>
  );
}