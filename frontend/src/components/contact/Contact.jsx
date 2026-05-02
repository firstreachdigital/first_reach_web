import React, { useState, useRef, useEffect } from "react";
import styles from "./Contact.module.css";

const faqTabs = ["General Ask", "Job Career", "Pricing & Plan"];

const faqs = {
  "General Ask": [
    {
      q: "What services do you offer?",
      a: "Simply contact us or send us a message. We'll schedule a quick call to learn more about your goals and get started with a tailored plan.",
    },
    {
      q: "How long does a website project take?",
      a: "Most projects take between 2–6 weeks depending on complexity. We'll give you a clear timeline after our discovery call.",
    },
    {
      q: "Do you work with international clients?",
      a: "Absolutely. We work with clients across the globe and have experience navigating different time zones and communication styles.",
    },
    {
      q: "Can you redesign my existing website?",
      a: "Yes — redesigns are one of our specialties. We analyze what's working, what isn't, and build something better.",
    },
    {
      q: "How do I get started?",
      a: "Fill out the contact form on this page or reach out via email. We typically respond within 1 hour during business hours.",
    },
  ],
  "Job Career": [
    {
      q: "Are you currently hiring?",
      a: "We're always on the lookout for talented creatives, developers, and strategists. Send your portfolio to careers@firstreachdigital.com.",
    },
    {
      q: "Do you offer remote positions?",
      a: "Yes, all of our roles are fully remote. We believe great talent exists everywhere.",
    },
    {
      q: "What does the interview process look like?",
      a: "A short intro call, a portfolio or skills review, and a final conversation with the team. Simple and respectful of your time.",
    },
  ],
  "Pricing & Plan": [
    {
      q: "How much does a website cost?",
      a: "Pricing depends on scope. A landing page starts around $1,500 and full custom platforms vary. We provide detailed quotes after discovery.",
    },
    {
      q: "Do you offer monthly retainers?",
      a: "Yes — we offer ongoing support and growth retainers for clients who want a long-term digital partner.",
    },
    {
      q: "Is there a payment plan available?",
      a: "We typically work with a 50% deposit upfront and the remainder on delivery. Flexible plans are available for larger projects.",
    },
  ],
};

export default function Contact() {
  const [activeTab, setActiveTab] = useState("General Ask");
  const [openIndex, setOpenIndex] = useState(0);
  const [subscribe, setSubscribe] = useState(false);
  const titleFillRef = useRef(null);
  const sectionRef = useRef(null);

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

  const currentFaqs = faqs[activeTab];

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <div className={styles.inner}>

        {/* ══ LEFT — Contact Form ══ */}
        <div className={styles.formCol}>
          <div className={styles.formCard}>
            {/* Response badge */}
            <div className={styles.responseBadge}>
              <span className={styles.responseDot} />
              Response time: 1 hour
            </div>

            <h2 className={styles.formTitle}>
              Tell details about your project
            </h2>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.field}>
                <input type="text" placeholder="Full name" className={styles.input} />
              </div>
              <div className={styles.field}>
                <input type="email" placeholder="Your email" className={styles.input} />
              </div>
              <div className={styles.field}>
                <textarea
                  placeholder="Your message"
                  className={`${styles.input} ${styles.textarea}`}
                  rows={5}
                />
              </div>

              {/* Checkbox */}
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

              {/* Form footer */}
              <div className={styles.formFooter}>
                <div className={styles.agentInfo}>
                  <div className={styles.agentAvatar}>
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80"
                      alt="Support"
                    />
                  </div>
                  <div>
                    <p className={styles.agentName}>Liven Geo</p>
                    <p className={styles.agentRole}>Support Developer</p>
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <span className={styles.submitArrow}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                  Submit now
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ══ RIGHT — FAQ ══ */}
        <div className={styles.faqCol}>
          {/* Label */}
          <span className={styles.label}>
            <span className={styles.labelDot} />
            &#123;09&#125; FAQs
          </span>

          {/* Title fill */}
          <div className={styles.titleWrap}>
            <h2 className={styles.titleBase}>Dive In More!</h2>
            <h2 className={styles.titleFill} ref={titleFillRef}>
              Dive In More!
            </h2>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {faqTabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => { setActiveTab(tab); setOpenIndex(0); }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className={styles.accordion}>
            {currentFaqs.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`${styles.accItem} ${isOpen ? styles.accItemOpen : ""}`}
                >
                  <button
                    className={styles.accHeader}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <span className={styles.accNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`${styles.accQ} ${isOpen ? styles.accQOpen : ""}`}>
                      {item.q}
                    </span>
                    <span className={`${styles.accIcon} ${isOpen ? styles.accIconOpen : ""}`}>
                      {isOpen ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5"
                          strokeLinecap="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5"
                          strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      )}
                    </span>
                  </button>

                  <div className={`${styles.accBody} ${isOpen ? styles.accBodyOpen : ""}`}>
                    <p className={styles.accA}>{item.a}</p>
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