import React, { useEffect, useRef } from "react";
import styles from "./ConnectUs.module.css";

const socials = [
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.254 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Behance",
    href: "https://behance.net",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.803 5.731c.589 0 1.119.051 1.605.155.483.103.895.273 1.243.508.343.235.611.547.804.938.187.39.28.86.28 1.396 0 .6-.137 1.103-.404 1.507-.271.404-.669.737-1.195 1.001.72.209 1.257.569 1.615 1.093.356.522.535 1.155.535 1.897 0 .592-.116 1.103-.35 1.539-.237.435-.556.793-.965 1.076-.406.282-.876.488-1.405.617-.532.131-1.081.195-1.643.195H2V5.731h5.803zm-.351 4.972c.48 0 .878-.114 1.19-.342.312-.228.467-.604.467-1.119 0-.286-.051-.521-.155-.704-.104-.181-.243-.325-.421-.428-.174-.104-.378-.176-.604-.214-.229-.04-.468-.059-.716-.059H4.948v2.866h2.504zm.129 5.186c.267 0 .521-.025.762-.075.241-.052.455-.136.638-.254.186-.12.334-.283.446-.491.111-.208.168-.475.168-.802 0-.641-.179-1.1-.535-1.374-.358-.274-.831-.412-1.418-.412H4.948v3.408h2.633zm8.752-7.208h4.956v.976h-4.956v-.976zm2.562-3.419c.686 0 1.296.113 1.829.34.534.228.986.546 1.352.957.367.41.642.893.828 1.449.184.556.275 1.162.275 1.811v.642h-7.584c.025.751.248 1.343.668 1.773.418.43.99.646 1.716.646.537 0 .993-.135 1.369-.4.377-.268.625-.563.745-.888h2.847c-.453 1.398-1.099 2.406-1.935 3.021-.839.617-1.864.926-3.077.926-.835 0-1.591-.136-2.267-.407-.676-.271-1.252-.656-1.726-1.153-.476-.498-.844-1.091-1.106-1.779-.261-.689-.392-1.443-.392-2.261 0-.793.128-1.529.383-2.206.255-.677.617-1.265 1.082-1.762.467-.498 1.025-.885 1.679-1.162.652-.277 1.386-.416 2.203-.416-.023 0-.023 0 0 0z" />
      </svg>
    ),
  },
  {
    name: "Dribble",
    href: "https://dribbble.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Get In touch",
    href: "#contact",
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
    lines: ["1st Floor, Room No: 23, 372/A2, St. Joseph Road, near AISAT College, Kalamassery, Kochi, Kerala 683503"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.52-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "24/7 Support",
    lines: ["Call +91 99466 18444", "info@firstreachdigital.com"],
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
    lines: ["Mon - Sat 8 AM - 10 PM", "Sun 11 AM - 5 PM"],
  },
];

const stats = [
  { value: "70%",  label: "Returning Clients" },
  { value: "90%",  label: "Success Rate" },
  { value: "6+",   label: "Years of Experience" },
  { value: "390+", label: "Delivered Projects" },
  { value: "50+",  label: "Team Members" },
  { value: "120+", label: "Happy Clients" },
];

export default function ConnectUs() {
  const titleFillRef = useRef(null);
  const sectionRef = useRef(null);
  const tickerRef = useRef(null);

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
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80"
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
            &#123;11&#125; Contact Us
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
                <span className={styles.infoIcon}>{info.icon}</span>
                <h4 className={styles.infoLabel}>{info.label}</h4>
                {info.lines.map((line, j) => (
                  <p key={j} className={styles.infoLine}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
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