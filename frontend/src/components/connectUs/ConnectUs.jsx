import React, { useEffect, useRef, useState } from "react";
import styles from "./ConnectUs.module.css";
import officeReception from "../../assets/officeReception.png";
import { FaWhatsapp, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import API from "../../api/axios";

const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/9946618222",
    icon: <FaWhatsapp size={20} />,
  },
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/company/first-reach-digital-private-limited",
    icon: <FaLinkedinIn size={20} />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/FirstReachDigitalPrivateLimited/",
    icon: <FaFacebookF size={20} />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/firstreachdigital/",
    icon: <FaInstagram size={20} />,
  },
  {
    name: "Get In touch",
    href: "/contact",
    isContact: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 14 4 9 9 4" />
        <path d="M20 20v-7a4 4 0 00-4-4H4" />
      </svg>
    ),
  },
];

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Office Address",
    
    lines: [
      {
        text: "1st Floor, Room No: 23, 372/A2, St. Joseph Road, near AISAT College, Kalamassery, Kochi, Kerala 683503",
        href: "https://maps.app.goo.gl/T41hpYnuNg73CEBMA",
      },
    ],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.52-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "24/7 Support",
    
     lines: [
      { text: "Call +91 99466 18444", href: "tel:+919946618444" },
      { text: "info@firstreachdigital.com", href: "mailto:info@firstreachdigital.com" },
    ],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Business Hours",
    
     lines: [
      {
        text: "Mon - Sat 10AM - 6PM",
        href: "https://www.google.com/search?q=First+Reach+Digital+Kalamassery",
      },
     
    ],
  },
];


const stats = [
  { value: "70%",  label: "Returning Clients" },
  { value: "90%",  label: "Success Rate" },
  { value: "10+",   label: "Years of Experience" },
  { value: "390+", label: "Delivered Projects" },
  { value: "10+",  label: "Team Members" },
  { value: "120+", label: "Happy Clients" },
];

export default function ConnectUs() {
  const titleFillRef = useRef(null);
  const sectionRef = useRef(null);
  const tickerRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null); 

   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await API.post("/contacts", form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus("error");
    }
  };


  useEffect(() => {
    // Title fill
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

  return (
    <section className={styles.section} id="connect" ref={sectionRef}>

      {/* ── MAIN CONTENT ── */}
      <div className={styles.inner}>

        {/* LEFT — building image */}
        <div className={styles.imageCol}>
          <div className={styles.imgWrap}>
            <img
              src={officeReception}
              alt="Office building"
              className={styles.buildingImg}
            />
            <div className={styles.imgGradient} />
          </div>

          {/* Logo badge with arrow */}
          <div className={styles.logoBadge}>
            <div className={styles.arrowCurl}>
              <svg width="44" height="44" viewBox="0 0 60 50" fill="none">
                <path d="M10 10 Q30 5 45 35" stroke="#fff" strokeWidth="1.5"
                  fill="none" strokeDasharray="4 3" />
                <polyline points="38,38 45,35 42,28"
                  stroke="#fff" strokeWidth="1.5" fill="none"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.logoCircle}>
              <span>FR</span>
            </div>
          </div>
        </div>

        {/* RIGHT — connect info */}
        <div className={styles.rightCol}>
          {/* Label */}
          <span className={styles.label}>
            <span className={styles.labelDot} />
            &#123;10&#125; Contact Us
          </span>

          {/* Title */}
          <div className={styles.titleWrap}>
            <h2 className={styles.titleBase}>
              Curious To Team-Up Already? Let’s Go!
            </h2>
            <h2 className={styles.titleFill} ref={titleFillRef}>
              Curious To Team-Up Already? Let’s Go! 
            </h2>
          </div>

          {/* Social links grid */}
          <div className={styles.socialsGrid}>
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target={s.isContact ? "_self" : "_blank"}
                rel="noreferrer"
                className={`${styles.socialBtn} ${s.isContact ? styles.socialBtnContact : ""}`}
              >
                <span className={styles.socialName}>{s.name}</span>
                <span className={styles.socialIcon}>{s.icon}</span>
              </a>
            ))}
          </div>

          {/* Contact info row */}
          <div className={styles.infoRow}>
            {contactInfo.map((info, i) => (
              <div key={i} className={styles.infoItem}>
                <div className={styles.infoIconLabel}>
                <span className={styles.infoIcon}>{info.icon}</span>
                <h4 className={styles.infoLabel}>{info.label}</h4>
                </div>
                {info.lines.map((line, j) => (
                  <a key={j} href={line.href} className={styles.infoLine}>{line.text}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* contct form */}
      <div className={styles.formWrap}>
        <div className={styles.formLeft}>
          <span className={styles.label}>
            <span className={styles.labelDot} />
            Send A Message
          </span>
          <h3 className={styles.formTitle}>Got a project in mind?<br />Let's talk.</h3>
          <p className={styles.formSubtitle}>
            Fill in the form and our team will get back to you within 24 hours.
          </p>
          <p className={styles.formSubtitle}>
            <b>Contact : </b>
            <a href="tel:+919946618444">+91 99466 18444</a>
          </p>
          <p className={styles.formSubtitle}>
            <b>Email : </b>
            <a href="mailto:sales@firstreachdigital.com">sales@firstreachdigital.com</a>
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.inputWrap}>
              <label className={styles.inputLabel}>Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputWrap}>
              <label className={styles.inputLabel}>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.inputWrap}>
            <label className={styles.inputLabel}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrap}>
            <label className={styles.inputLabel}>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className={`${styles.input} ${styles.textarea}`}
              rows={5}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={status === "sending"}>
            {status === "sending" ? (
              <span className={styles.spinner} />
            ) : (
              <>
                <span>Send Message</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>

          {status === "success" && (
            <p className={styles.successMsg}> Message sent! We'll get back to you soon.</p>
          )}
          {status === "error" && (
            <p className={styles.errorMsg}> Something went wrong. Try again.</p>
          )}
        </form>
      </div>

      {/* ── STATS TICKER ── */}
      <div className={styles.ticker}>
        <div className={styles.tickerTrack} ref={tickerRef}>
          {/* Duplicate for seamless loop */}
          {[...stats, ...stats].map((stat, i) => (
            <div key={i} className={styles.tickerItem}>
              <span className={styles.tickerValue}>{stat.value}</span>
              <span className={styles.tickerLabel}>{stat.label}</span>
              <span className={styles.tickerDivider}>|</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}