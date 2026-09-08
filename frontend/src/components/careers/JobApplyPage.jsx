// src/components/careers/JobApplyPage.jsx
import React, { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import styles from "./JobApplyModal.module.css";
import {
  FaArrowRight,
  FaArrowLeft,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLink,
  FaFileAlt,
  FaLock,
  FaUsers,
  FaRocket,
  FaStar,
  FaHeart,
  FaQuoteLeft,
  FaBriefcase,
} from "react-icons/fa";
import API from "../../api/axios";
import { getCareersSeo } from "../../data/careersSeo";

const FEATURES = [
  {
    icon: <FaUsers />,
    title: "Collaborative Team",
    desc: "Work with creative minds",
  },
  {
    icon: <FaRocket />,
    title: "Growth Opportunities",
    desc: "Learn, build and advance",
  },
  {
    icon: <FaStar />,
    title: "Meaningful Work",
    desc: "Real impact for real brands",
  },
  {
    icon: <FaHeart />,
    title: "Flexible Culture",
    desc: "People-first environment",
  },
];

export default function JobApplyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const clInputRef = useRef(null);

  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    message: "",
    cv: null,
    coverLetter: null,
  });
  const [cvName, setCvName] = useState("");
  const [clName, setClName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [clDragActive, setClDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.get(`/careers/jobs/slug/${slug}`)
      .then((res) => setJob(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setJobLoading(false));
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, phone: digitsOnly });
      setErrors({ ...errors, phone: "" });
      return;
    }

    if (name === "message" && value.length > 500) return;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const applyFile = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, cv: "File must be under 5MB" });
      return;
    }
    setForm((f) => ({ ...f, cv: file }));
    setCvName(file.name);
    setErrors((er) => ({ ...er, cv: "" }));
  };

  const applyClFile = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, coverLetter: "File must be under 5MB" });
      return;
    }
    setForm((f) => ({ ...f, coverLetter: file }));
    setClName(file.name);
    setErrors((er) => ({ ...er, coverLetter: "" }));
  };

  const handleFile = (e) => applyFile(e.target.files[0]);
  const handleClFile = (e) => applyClFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    applyFile(e.dataTransfer.files[0]);
  };

  const handleClDrop = (e) => {
    e.preventDefault();
    setClDragActive(false);
    applyClFile(e.dataTransfer.files[0]);
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.cv) e.cv = "Required";
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
      const formData = new FormData();
      formData.append("job", job._id);
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("portfolio", form.portfolio);
      formData.append("coverNote", form.message);
      if (form.cv) formData.append("resume", form.cv);
      if (form.coverLetter) formData.append("coverLetter", form.coverLetter);

      await API.post("/careers/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitted(true);
    } catch {
      setErrors({
        ...errors,
        fullName: "Submission failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (jobLoading) {
    return <div className={styles.pageLoading}>Loading...</div>;
  }

  if (notFound || !job) {
    return (
      <div className={styles.pageNotFound}>
        <h2>Role not found</h2>
        <Link to="/careers">Back to Careers</Link>
      </div>
    );
  }

  const seo = getCareersSeo(job.title);

  return (
    <div className={styles.afdPage}>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
      </Helmet>

      <div className={styles.afdCard}>
        {/* ── LEFT PANEL ── */}
        <div className={styles.afdLeft}>
          <div className={styles.afdLeftGlow} />

          <span className={styles.afdBadge}>
            <FaBriefcase /> We're Hiring
          </span>

          <h2 className={styles.afdLeftTitle}>
            Join Our
            <br />
            <span className={styles.afdAccentText}>Team</span>
          </h2>

          <p className={styles.afdLeftTagline}>Build. Grow. Make an Impact.</p>
          <p className={styles.afdLeftDesc}>
            Be a part of a team that creates digital solutions, solves real
            problems, and helps brands grow.
          </p>

          <ul className={styles.afdFeatureList}>
            {FEATURES.map((f) => (
              <li key={f.title} className={styles.afdFeatureItem}>
                <span className={styles.afdFeatureIcon}>{f.icon}</span>
                <div>
                  <p className={styles.afdFeatureTitle}>{f.title}</p>
                  <p className={styles.afdFeatureDesc}>{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.afdQuote}>
            <FaQuoteLeft className={styles.afdQuoteIcon} />
            <p>Great people build great things together.</p>
          </div>

          <div className={styles.afdLeftFooter}>
            {/* <p className={styles.afdFooterBrand}>First Reach Digital</p> */}
            {/* <p className={styles.afdFooterTag}>
              Digital Solutions for a Better Tomorrow
            </p> */}
          </div>

          <div className={styles.afdLeftContact}>
            <a
              href="mailto:hr@firstreachdigital.com"
              className={styles.afdLeftContactItem}
            >
              <FaEnvelope className={styles.afdLeftContactIcon} />
              hr@firstreachdigital.com
            </a>
            <a href="tel:+919946618222" className={styles.afdLeftContactItem}>
              <FaPhone className={styles.afdLeftContactIcon} />
              +91 99466 18222
            </a>
          </div>

          <div className={styles.afdLeftFooter}>
            <p className={styles.afdFooterBrand}>First Reach Digital</p>
            {/* <p className={styles.afdFooterTag}>
              Digital Solutions for a Better Tomorrow
            </p> */}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className={styles.afdRight}>
          {submitted ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>
                <FaCheckCircle />
              </div>
              <h2 className={styles.successTitle}>Application Sent!</h2>
              <p className={styles.successSub}>
                We've received your application for <strong>{job.title}</strong>
                .<br />
                Our team will review it and get back to you within 3–5 business
                days.
              </p>
              <button
                className={styles.doneBtn}
                onClick={() => navigate("/careers")}
              >
                <span className={styles.doneBtnIcon}>
                  <FaArrowRight />
                </span>
                Back to Openings
              </button>
            </div>
          ) : (
            <>
              <div className={styles.afdTopRow}>
                <span className={styles.afdBreadcrumb}>
                  Careers at First Reach Digital
                </span>
                <button
                  className={styles.afdBackBtn}
                  onClick={() => navigate("/careers")}
                >
                  <FaArrowLeft /> Back to Careers
                </button>
              </div>

              <h1 className={styles.afdFormHeading}>
                Apply for {" "}
                <span className={styles.afdAccentText}>{job.title}</span>
              </h1>
              <p className={styles.afdFormSub}>
                Fill out the form below and we'll get back to you soon.
              </p>

              <form
                className={styles.afdForm}
                onSubmit={handleSubmit}
                noValidate
              >
                <div
                  className={`${styles.afdField} ${errors.fullName ? styles.hasError : ""}`}
                >
                  <label className={styles.afdLabel}>
                    Full Name <span className={styles.afdRequired}>*</span>
                  </label>
                  <div className={styles.afdInputWrap}>
                    <FaUser className={styles.afdInputIcon} />
                    <input
                      className={styles.afdInput}
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

                <div className={styles.afdRow}>
                  <div
                    className={`${styles.afdField} ${errors.email ? styles.hasError : ""}`}
                  >
                    <label className={styles.afdLabel}>
                      Email Address{" "}
                      <span className={styles.afdRequired}>*</span>
                    </label>
                    <div className={styles.afdInputWrap}>
                      <FaEnvelope className={styles.afdInputIcon} />
                      <input
                        className={styles.afdInput}
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

                  <div
                    className={`${styles.afdField} ${errors.phone ? styles.hasError : ""}`}
                  >
                    <label className={styles.afdLabel}>
                      Phone Number <span className={styles.afdRequired}>*</span>
                    </label>
                    <div className={styles.afdInputWrap}>
                      <FaPhone className={styles.afdInputIcon} />
                      <span className={styles.afdCountryCode}>IN +91</span>
                      <input
                        className={`${styles.afdInput} ${styles.afdPhoneInput}`}
                        type="tel"
                        inputMode="numeric"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                        maxLength={10}
                      />
                    </div>
                    {errors.phone && (
                      <span className={styles.errMsg}>{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className={styles.afdField}>
                  <label className={styles.afdLabel}>
                    Portfolio / LinkedIn{" "}
                    <span className={styles.afdOptional}>(optional)</span>
                  </label>
                  <div className={styles.afdInputWrap}>
                    <FaLink className={styles.afdInputIcon} />
                    <input
                      className={styles.afdInput}
                      type="url"
                      name="portfolio"
                      value={form.portfolio}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>

                <div className={styles.afdField}>
                  <label className={styles.afdLabel}>
                    message{" "}
                    <span className={styles.afdOptional}>(optional)</span>
                  </label>
                  <div className={styles.afdTextareaWrap}>
                    <FaFileAlt className={styles.afdTextareaIcon} />
                    <textarea
                      className={styles.afdTextarea}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write a short cover letter telling us why you'd be a great fit..."
                      rows={3}
                      maxLength={500}
                    />
                  </div>
                  <span className={styles.afdCharCount}>
                    {form.message.length}/500
                  </span>
                </div>

                <div className={styles.afdField}>
                  <label className={styles.afdLabel}>
                    Cover Letter{" "}
                    <span className={styles.afdOptional}>(optional)</span>
                  </label>
                  <div
                    className={`${styles.afdDropzone} ${clDragActive ? styles.afdDropzoneActive : ""}`}
                    onClick={() => clInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setClDragActive(true); }}
                    onDragLeave={() => setClDragActive(false)}
                    onDrop={handleClDrop}
                  >
                    <input
                      ref={clInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className={styles.fileInput}
                      onChange={handleClFile}
                    />
                    <span className={styles.afdDropzoneIcon}><FaCloudUploadAlt /></span>
                    <div className={styles.afdDropzoneText}>
                      <p>{clName || "Drag & drop your cover letter"}</p>
                      <span>{clName ? "Click to change" : "or click to browse"}</span>
                    </div>
                    <span className={styles.fileBrowse}>Browse</span>
                  </div>
                  <p className={styles.afdDropzoneHint}>PDF, DOC or DOCX (Max 5MB)</p>
                  {errors.coverLetter && (
                    <span className={styles.errMsg}>{errors.coverLetter}</span>
                  )}
                </div>

                <div
                  className={`${styles.afdField} ${errors.cv ? styles.hasError : ""}`}
                >
                  <label className={styles.afdLabel}>
                    Upload CV (Max 5MB, PDF/DOC/DOCX){" "}
                    <span className={styles.afdRequired}>*</span>
                  </label>
                  <div
                    className={`${styles.afdDropzone} ${dragActive ? styles.afdDropzoneActive : ""}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className={styles.fileInput}
                      onChange={handleFile}
                    />
                    <span className={styles.afdDropzoneIcon}>
                      <FaCloudUploadAlt />
                    </span>
                    <div className={styles.afdDropzoneText}>
                      <p>{cvName || "Drag & drop your file here"}</p>
                      <span>
                        {cvName ? "Click to change" : "or click to browse"}
                      </span>
                    </div>
                    <span className={styles.fileBrowse}>Browse</span>
                  </div>
                  <p className={styles.afdDropzoneHint}>
                    PDF, DOC or DOCX (Max 5MB)
                  </p>
                  {errors.cv && (
                    <span className={styles.errMsg}>{errors.cv}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.afdSubmitBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <span className={styles.loader} />
                  ) : (
                    <>
                      <span className={styles.submitIcon}>
                        <FaArrowRight />
                      </span>
                      Submit Application
                    </>
                  )}
                </button>

                <p className={styles.afdSafeNote}>
                  <FaLock /> Your information is safe with us and will only be
                  used for recruitment purposes.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
