import React, { useState } from "react";
import styles from "./GetAQuote.module.css";
import Step1Services from "../components/getaquote/Step1Services";
import Step2Requirements from "../components/getaquote/Step2Requirements";
import Step3Business from "../components/getaquote/Step3Business";
import Step4Contact from "../components/getaquote/Step4Contact";
import Step5Review from "../components/getaquote/Step5Review";
import SuccessScreen from "../components/getaquote/SuccessScreen";
import SummarySidebar from "../components/getaquote/SummarySidebar";
import API from "../api/axios";
import { FaCheck } from "react-icons/fa";

const STEP_LABELS = ["Services", "Requirements", "Business", "Contact", "Review"];

export default function GetAQuotePage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [selected, setSelected] = useState(new Set());
  const [requirements, setRequirements] = useState({});
  const [business, setBusiness] = useState({ name: "", website: "", industry: "" });
  const [contact, setContact] = useState({ name: "", email: "", phone: "", code: "+91" });

  const pct = ((step - 1) / (STEP_LABELS.length - 1)) * 100;

  const toggleService = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setErrors({});
  };

  const updateRequirement = (id, val) => {
    setRequirements((prev) => ({ ...prev, [id]: val }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (selected.size === 0) {
        setErrors({ services: "Please select at least one service." });
        return false;
      }
    }
    if (step === 3) {
      if (!business.name.trim()) {
        setErrors({ bizName: "Business name is required." });
        return false;
      }
      if (!business.industry) {
        setErrors({ industry: "Please select your industry." });
        return false;
      }
    }
    if (step === 4) {
      if (!contact.name.trim()) {
        setErrors({ cName: "Full name is required." });
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
        setErrors({ cEmail: "Valid email address required." });
        return false;
      }
      if (!contact.phone.trim()) {
        setErrors({ cPhone: "Phone number is required." });
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        selectedServices: [...selected],
        requirements,
        businessName: business.name,
        websiteOrInstagram: business.website,
        industry: business.industry,
        fullName: contact.name,
        email: contact.email,
        phone: contact.phone,
        countryCode: contact.code,
      };
      const res = await API.post("/quote/submit", payload);
      if (res.data.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return <SuccessScreen contact={contact} />;

  const sharedProps = { selected, requirements, business, contact, errors };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Build Your Own Marketing Team</h1>
        <p className={styles.subtitle}>
          Choose the exact marketing services your business needs every month and get a
          customized strategy & proposal tailored for your goals.
        </p>
        <div className={styles.highlights}>
          {["Customized Monthly Plan", "Dedicated Marketing Team", "Fast Response", "UAE & India Support"].map((h) => (
            <span key={h} className={styles.highlight}><FaCheck /> {h}</span>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className={styles.progressWrap}>
        <div className={styles.stepLabels}>
          {STEP_LABELS.map((l, i) => (
            <span key={l} className={`${styles.stepLbl} ${step === i + 1 ? styles.stepLblActive : ""}`}>
              <span className={styles.stepNum}>{i + 1}</span> {l}
            </span>
          ))}
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.formArea}>
          {step === 1 && (
            <Step1Services selected={selected} toggleService={toggleService} errors={errors} />
          )}
          {step === 2 && (
            <Step2Requirements selected={selected} requirements={requirements} updateRequirement={updateRequirement} />
          )}
          {step === 3 && (
            <Step3Business business={business} setBusiness={setBusiness} errors={errors} />
          )}
          {step === 4 && (
            <Step4Contact contact={contact} setContact={setContact} errors={errors} />
          )}
          {step === 5 && (
            <Step5Review {...sharedProps} />
          )}

          {errors.submit && <p className={styles.errorMsg}>{errors.submit}</p>}

          {/* Nav buttons */}
          <div className={styles.navRow}>
            {step > 1 && (
              <button className={styles.btnBack} onClick={handleBack}>Back</button>
            )}
            {step < 5 ? (
              <button className={styles.btnNext} onClick={handleNext}>
                {step === 4 ? "Review My Plan" : "Continue"}
              </button>
            ) : (
              <button className={styles.btnNext} onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Get My Custom Proposal"}
              </button>
            )}
          </div>

          {step === 5 && (
            <p className={styles.trustText}>No commitment • Free consultation • Professional strategy included</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <SummarySidebar selected={selected} requirements={requirements} />
        </aside>
      </div>
    </div>
  );
}