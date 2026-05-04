import React, { useState, useRef, useEffect } from "react";
import styles from "./Contact.module.css";
import API from "../../api/axios";

const FAQ_TABS = ["General Ask", "Job Career", "Pricing & Plan"];

export default function Contact() {
  const [activeTab, setActiveTab] = useState("General Ask");
  const [openIndex, setOpenIndex] = useState(0);
  const [subscribe, setSubscribe] = useState(false);
  const [faqs, setFaqs]           = useState([]);
  const [form, setForm]           = useState({ fullName: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState("");

  const titleFillRef = useRef(null);
  const sectionRef   = useRef(null);

  // Scroll animation
  useEffect(() => {
    const handle = () => {
      if (!titleFillRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const tp = Math.min(Math.max((winH - rect.top) / (winH * 0.55), 0), 1);
      titleFillRef.current.style.clipPath = `inset(0 ${(1 - tp) * 100}% 0 0)`;
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Fetch FAQs
  useEffect(() => {
    API.get("/faqs").then((res) => setFaqs(res.data)).catch(() => {});
  }, []);

  const currentFaqs = faqs.filter((f) => f.category === activeTab);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.message) {
      setError("Please fill all fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await API.post("/enquiries", { ...form, subscribeNewsletter: subscribe });
      setSubmitted(true);
      setForm({ fullName: "", email: "", phone: "", message: "" });
      setSubscribe(false);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <div className={styles.inner}>

        {/* ══ LEFT — Contact Form ══ */}
        <div className={styles.formCol}>
          <div className={styles.formCard}>
            <div className={styles.responseBadge}>
              <span className={styles.responseDot} />
              Response time: 1 hour
            </div>

            <h2 className={styles.formTitle}>Tell details about your project</h2>

            {submitted ? (
              <div style={{ padding: "2rem 0", textAlign: "center" }}>
                <p style={{ color: "#05caf2", fontSize: "1.1rem", fontWeight: 600 }}>Message sent!</p>
                <p style={{ color: "#666", marginTop: "0.5rem", fontSize: "0.9rem" }}>We'll get back to you within 1 hour.</p>
                <button
                  style={{ marginTop: "1.5rem", background: "none", border: "1px solid #333", color: "#aaa", padding: "0.5rem 1.2rem", borderRadius: "2rem", cursor: "pointer" }}
                  onClick={() => setSubmitted(false)}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    className={styles.input}
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    className={styles.input}
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    className={styles.input}
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <textarea
                    name="message"
                    placeholder="Your message"
                    className={`${styles.input} ${styles.textarea}`}
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {error && <p style={{ color: "#ff4d4f", fontSize: "0.82rem", marginBottom: "0.5rem" }}>{error}</p>}

                <label className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={subscribe}
                    onChange={(e) => setSubscribe(e.target.checked)}
                    className={styles.checkInput}
                  />
                  <span className={`${styles.checkBox} ${subscribe ? styles.checkBoxActive : ""}`}>
                    {subscribe && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                        stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  Subscribe to Newsletter
                </label>

                <div className={styles.formFooter}>
                  <div className={styles.agentInfo}>
                    <div className={styles.agentAvatar}>
                      <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80" alt="Support" />
                    </div>
                    <div>
                      <p className={styles.agentName}>Liven Geo</p>
                      <p className={styles.agentRole}>Support Developer</p>
                    </div>
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={submitting}>
                    <span className={styles.submitArrow}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                    {submitting ? "Sending..." : "Submit now"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ══ RIGHT — FAQ ══ */}
        <div className={styles.faqCol}>
          <span className={styles.label}>
            <span className={styles.labelDot} />
            &#123;{faqs.length}&#125; FAQs
          </span>

          <div className={styles.titleWrap}>
            <h2 className={styles.titleBase}>Dive In More!</h2>
            <h2 className={styles.titleFill} ref={titleFillRef}>Dive In More!</h2>
          </div>

          <div className={styles.tabs}>
            {FAQ_TABS.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => { setActiveTab(tab); setOpenIndex(0); }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.accordion}>
            {currentFaqs.length === 0 && (
              <p style={{ color: "#444", fontSize: "0.85rem" }}>No FAQs in this category yet.</p>
            )}
            {currentFaqs.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item._id} className={`${styles.accItem} ${isOpen ? styles.accItemOpen : ""}`}>
                  <button className={styles.accHeader} onClick={() => setOpenIndex(isOpen ? -1 : i)}>
                    <span className={styles.accNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`${styles.accQ} ${isOpen ? styles.accQOpen : ""}`}>{item.question}</span>
                    <span className={`${styles.accIcon} ${isOpen ? styles.accIconOpen : ""}`}>
                      {isOpen ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      )}
                    </span>
                  </button>
                  <div className={`${styles.accBody} ${isOpen ? styles.accBodyOpen : ""}`}>
                    <p className={styles.accA}>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
