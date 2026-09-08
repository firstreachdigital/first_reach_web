import React, { useState } from "react";
import styles from "./GetAQuote.module.css";
import API from "../api/axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCommentAlt,
  FaBriefcase,
  FaCheckCircle,
  FaArrowRight,
  FaCheck,
  FaClipboardList,
  FaInfoCircle,
} from "react-icons/fa";

const SERVICES = [
  "Social Media Marketing",
  "SEO & Content",
  "Website Design & Development",
  "Branding & Identity",
  "Paid Ads (Google / Meta)",
  "Reputation Management",
  "Video Production",
  "Other",
];

export default function GetAQuotePage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setForm((f) => ({ ...f, phone: digits }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await API.post("/quote/submit", form);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successWrap}>
          <div className={styles.successIcon}>
            <FaCheckCircle />
          </div>
          <h2 className={styles.successTitle}>We'll be in touch!</h2>
          <p className={styles.successSub}>
            Thanks <strong>{form.fullName}</strong>! Our team will review your
            enquiry and get back to you within 24 hours.
          </p>
          <a
            href="/"
            className={styles.btnNext}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              maxWidth: 220,
              justifyContent: "center",
            }}
          >
            Back to Home <FaArrowRight />
          </a>
        </div>
      </div>
    );
  }

  const hasAnyDetail =
    form.fullName || form.email || form.phone || form.service || form.message;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Get a Free Quote</h1>
        <p className={styles.subtitle}>
          Select the services you need and fill in your details — we'll follow
          up with a tailored proposal.
        </p>
        <div className={styles.highlights}>
          {[
            "Free Consultation",
            "Fast Response",
            "No Commitment",
            "UAE & India Support",
          ].map((h) => (
            <span key={h} className={styles.highlight}>
              {h}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.quoteLayout}>
        {/* ── LEFT: FORM ── */}
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldRow}>
              <div
                className={`${styles.field} ${errors.fullName ? styles.hasError : ""}`}
              >
                <label className={styles.label}>
                  Full Name <span className={styles.req}>*</span>
                </label>
                <div className={styles.inputWrap}>
                  <FaUser className={styles.inputIcon} />
                  <input
                    className={styles.input}
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </div>
                {errors.fullName && (
                  <span className={styles.errMsg}>{errors.fullName}</span>
                )}
              </div>

              <div
                className={`${styles.field} ${errors.email ? styles.hasError : ""}`}
              >
                <label className={styles.label}>
                  Email Address <span className={styles.req}>*</span>
                </label>
                <div className={styles.inputWrap}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <span className={styles.errMsg}>{errors.email}</span>
                )}
              </div>
            </div>

            <div
              className={`${styles.field} ${errors.phone ? styles.hasError : ""}`}
            >
              <label className={styles.label}>
                Phone Number <span className={styles.req}>*</span>
              </label>
              <div className={styles.inputWrap}>
                <FaPhone className={styles.inputIcon} />
                <span className={styles.countryCode}>IN +91</span>
                <input
                  className={`${styles.input} ${styles.phoneInput}`}
                  type="tel"
                  inputMode="numeric"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  maxLength={10}
                />
              </div>
              {errors.phone && (
                <span className={styles.errMsg}>{errors.phone}</span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Service Interested In{" "}
                <span className={styles.opt}>(optional)</span>
              </label>
              <div className={styles.inputWrap}>
                <FaBriefcase className={styles.inputIcon} />
                <select
                  className={styles.input}
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Message <span className={styles.opt}>(optional)</span>
              </label>
              <div className={styles.textareaWrap}>
                <FaCommentAlt className={styles.textareaIcon} />
                <textarea
                  className={styles.textarea}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or goals..."
                  rows={3}
                  maxLength={600}
                />
              </div>
              <span className={styles.charCount}>
                {form.message.length}/600
              </span>
            </div>

            {errors.submit && (
              <p className={styles.errorMsg}>{errors.submit}</p>
            )}

            <div className={styles.quoteSubmitWrap}>
              <button
                type="submit"
                className={styles.quoteSubmitBtn}
                disabled={loading}
              >
                {loading ? "Sending..." : "Get My Free Quote"}
              </button>
            </div>
            <p className={styles.trustText}>
              No commitment • Free consultation • We respond within 24 hours
            </p>
          </form>
        </div>

        {/* ── RIGHT: DETAILS CARD ── */}
        <aside className={styles.estimationCard}>
          <div className={styles.estHeader}>
            <FaClipboardList className={styles.estHeaderIcon} />
            <span>Your Enquiry Summary</span>
          </div>

          {!hasAnyDetail ? (
            <div className={styles.estEmpty}>
              <p>
                Your enquiry details will appear here as you fill in the form.
              </p>
            </div>
          ) : (
            <>
              {/* Contact details */}
              {(form.fullName || form.email || form.phone) && (
                <div className={styles.estSection}>
                  <p className={styles.estSectionLabel}>Contact Details</p>
                  {form.fullName && (
                    <div className={styles.estDetailRow}>
                      <FaUser className={styles.estDetailIcon} />
                      <span>{form.fullName}</span>
                    </div>
                  )}
                  {form.email && (
                    <div className={styles.estDetailRow}>
                      <FaEnvelope className={styles.estDetailIcon} />
                      <span>{form.email}</span>
                    </div>
                  )}
                  {form.phone && (
                    <div className={styles.estDetailRow}>
                      <FaPhone className={styles.estDetailIcon} />
                      <span>+91 {form.phone}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Selected service */}
              {form.service && (
                <>
                  {(form.fullName || form.email || form.phone) && (
                    <div className={styles.estDivider} />
                  )}
                  <div className={styles.estSection}>
                    <p className={styles.estSectionLabel}>Service</p>
                    <div className={styles.estDetailRow}>
                      <FaBriefcase className={styles.estDetailIcon} />
                      <span>{form.service}</span>
                    </div>
                  </div>
                </>
              )}

              {/* Message */}
              {form.message && (
                <>
                  <div className={styles.estDivider} />
                  <div className={styles.estSection}>
                    <p className={styles.estSectionLabel}>Message</p>
                    <p className={styles.estMessage}>{form.message}</p>
                  </div>
                </>
              )}
            </>
          )}

          <div className={styles.estNote}>
            <FaInfoCircle className={styles.estNoteIcon} />
            <p>
              We'll review your enquiry and get back to you within 24 hours with
              a tailored proposal.
            </p>
          </div>

          <div className={styles.estTrustList}>
            {[
              "Dedicated account manager",
              "Monthly performance reports",
              "Cancel anytime",
            ].map((t) => (
              <div key={t} className={styles.estTrustItem}>
                <FaCheck className={styles.estTrustIcon} /> {t}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
