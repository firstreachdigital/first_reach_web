// src/components/JobApplyModal.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./JobApply.module.css";
import { FaArrowRight, FaTimes, FaCloudUploadAlt, FaCheckCircle, FaStarOfLife } from "react-icons/fa";

export default function JobApplyModal({ job, onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    message: "",
    cv: null,
  });
  const [cvName, setCvName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const overlayRef = useRef(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, cv: "File must be under 5MB" });
      return;
    }
    setForm({ ...form, cv: file });
    setCvName(file.name);
    setErrors({ ...errors, cv: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("job",       job._id);
      formData.append("fullName",  form.fullName);
      formData.append("email",     form.email);
      formData.append("phone",     form.phone);
      formData.append("portfolio", form.portfolio);
      formData.append("coverNote", form.message);
      if (form.cv) formData.append("resume", form.cv);

      await fetch("http://localhost:5000/api/careers/apply", {
        method: "POST",
        body: formData,
      });
      setSubmitted(true);
    } catch {
      setErrors({ ...errors, fullName: "Submission failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={handleOverlayClick}>
      <div className={styles.modal}>

        {/* ── LEFT PANEL ── */}
        <div className={styles.leftPanel}>
          <div className={styles.spinText}>
            <svg viewBox="0 0 200 200" className={styles.spinSvg}>
              <defs>
                <path id="circle" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
              </defs>
              <text fontSize="13" fill="rgba(5,202,242,0.7)" letterSpacing="3.5" fontWeight="600" textAnchor="middle">
                <textPath href="#circle">APPLY NOW • FIRST REACH DIGITAL •</textPath>
              </text>
            </svg>
            <div className={styles.spinCenter}><FaStarOfLife /></div>
          </div>

          <div className={styles.joinText}>
            <span>J</span><span>o</span><span>i</span><span>n</span>
            <br />
            <span className={styles.accentLetter}>N</span>
            <span>o</span>
            <span>W</span>
          </div>

          <div className={styles.jobInfo}>
            <span className={styles.jobDeptBadge}>{job?.department}</span>
            <h3 className={styles.jobNameLeft}>{job?.title}</h3>
            <div className={styles.jobMetaLeft}>
              <span>{job?.type}</span>
              <span className={styles.dot}>·</span>
              <span>{job?.location}</span>
            </div>
          </div>

          <div className={styles.leftDecor}>
            <div className={styles.asteriskBig}>✦</div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className={styles.rightPanel}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>

          {submitted ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}><FaCheckCircle /></div>
              <h2 className={styles.successTitle}>Application Sent!</h2>
              <p className={styles.successSub}>
                We've received your application for <strong>{job?.title}</strong>.<br />
                Our team will review it and get back to you within 3–5 business days.
              </p>
              <button className={styles.doneBtn} onClick={onClose}>
                <span className={styles.doneBtnIcon}><FaArrowRight /></span>
                Back to Openings
              </button>
            </div>
          ) : (
            <>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Fill The Form</h2>
                <p className={styles.formSub}>Applying for <span className={styles.roleSpan}>{job?.title}</span></p>
              </div>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className={`${styles.fieldGroup} ${errors.fullName ? styles.hasError : ""}`}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                  {errors.fullName && <span className={styles.errMsg}>{errors.fullName}</span>}
                </div>

                {/* Email + Phone row */}
                <div className={styles.row}>
                  <div className={`${styles.fieldGroup} ${errors.email ? styles.hasError : ""}`}>
                    <label className={styles.label}>Email Address</label>
                    <input
                      className={styles.input}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      autoComplete="email"
                    />
                    {errors.email && <span className={styles.errMsg}>{errors.email}</span>}
                  </div>

                  <div className={`${styles.fieldGroup} ${errors.phone ? styles.hasError : ""}`}>
                    <label className={styles.label}>Phone Number</label>
                    <div className={styles.phoneWrap}>
                      <span className={styles.phonePrefix}>🇮🇳 +91</span>
                      <input
                        className={`${styles.input} ${styles.phoneInput}`}
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        autoComplete="tel"
                      />
                    </div>
                    {errors.phone && <span className={styles.errMsg}>{errors.phone}</span>}
                  </div>
                </div>

                {/* Portfolio */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Portfolio / LinkedIn <span className={styles.optional}>(optional)</span></label>
                  <input
                    className={styles.input}
                    type="url"
                    name="portfolio"
                    value={form.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                  />
                </div>

                {/* Message */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Why do you want to join? <span className={styles.optional}>(optional)</span></label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us a bit about yourself..."
                    rows={3}
                  />
                </div>

                {/* CV Upload */}
                <div className={`${styles.fieldGroup} ${errors.cv ? styles.hasError : ""}`}>
                  <label className={styles.label}>Upload CV <span className={styles.optional}>(Max 5MB, PDF/DOC/DOCX)</span></label>
                  <label className={styles.fileLabel}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className={styles.fileInput}
                      onChange={handleFile}
                    />
                    <span className={styles.fileIcon}><FaCloudUploadAlt /></span>
                    <span className={styles.fileName}>
                      {cvName || "Choose File"}
                    </span>
                    <span className={styles.fileBrowse}>Browse</span>
                  </label>
                  {errors.cv && <span className={styles.errMsg}>{errors.cv}</span>}
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <span className={styles.loader} />
                  ) : (
                    <>
                      <span className={styles.submitIcon}><FaArrowRight /></span>
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}