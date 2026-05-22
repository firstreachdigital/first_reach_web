import React, { useEffect, useRef, useState } from "react";
import styles from "./Testimonials.module.css";
import API from "../../api/axios";

// Fixed arc positions for avatars (up to 10)
const ARC_POSITIONS = [
  { x: -420, y: 80  }, { x: -320, y: -40  }, { x: -200, y: -140 },
  { x: -40,  y: -180 }, { x: 120,  y: -140 }, { x: 260,  y: -40  },
  { x: 360,  y: 80  }, { x: 300,  y: 240  }, { x: 180,  y: 360  },
  { x: 40,   y: 440 },
];

const AVATAR_SIZES = [70, 82, 72, 64, 60, 74, 80, 68, 62, 66];

// Fallback placeholder avatar
//const PLACEHOLDER = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80";

export default function Testimonial() {
  const sectionRef   = useRef(null);
  const avatarRefs   = useRef([]);
  const titleFillRef = useRef(null);

  const [testimonials, setTestimonials] = useState([]);
  const [active, setActive]             = useState(0);
  const [fading, setFading]             = useState(false);

  useEffect(() => {
    API.get("/testimonials")
      .then(({ data }) => setTestimonials(data))
      .catch(() => {});
  }, []);

  // Position avatars in arc
  useEffect(() => {
    avatarRefs.current.forEach((el, i) => {
      if (!el) return;
      const pos = ARC_POSITIONS[i] || { x: 0, y: 0 };
      el.style.transform = `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`;
    });
  }, [testimonials]);

  // Title fill on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!titleFillRef.current) return;
      const rect = titleFillRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = Math.min(Math.max((winH - rect.top) / (winH * 0.6), 0), 1);
      titleFillRef.current.style.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Fade-in observer
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-inview]") || [];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add(styles.inView); obs.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
        setFading(false);
      }, 350);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const current = testimonials[active];

  return (
    <section className={styles.section} id="testimonial" ref={sectionRef}>
      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.label} data-inview>
            <span className={styles.labelDot} />
            &#123;06&#125; Testimonial
          </span>
          <div className={styles.titleWrap}>
            <h2 className={styles.titleBase}>What Our Happy Clients Say…</h2>
            <h2 className={styles.titleFill} ref={titleFillRef}>What Our Happy Clients Say…</h2>
          </div>
        </div>

        <div className={styles.headerRight} data-inview>
          <p className={styles.headerDesc}>
            Listen to what matters; The satisfied tone of testimonies from our valued customers
          </p>
          <a href="#contact" className={styles.moreBtn}>
            <span className={styles.moreBtnArrow}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            More Review
          </a>
        </div>
      </div>

      {/* ── ARENA ── */}
      <div className={styles.arena}>
        {/* Avatars */}
        {testimonials.map((t, i) => (
          <div
            key={t._id}
            ref={(el) => (avatarRefs.current[i] = el)}
            className={styles.avatar}
            style={{ width: AVATAR_SIZES[i] || 64, height: AVATAR_SIZES[i] || 64 }}
          >
            <img src={t.avatar || PLACEHOLDER} alt={t.name} loading="lazy" />
          </div>
        ))}

        {/* Center quote card */}
        {current && (
          <div className={styles.quoteCard}>
            <div className={`${styles.quoteInner} ${fading ? styles.fadeOut : styles.fadeIn}`}>
              <span className={styles.quoteIcon}>"</span>
              <p className={styles.quoteText}>{current.quote}</p>
              <div className={styles.quoteDivider} />
              <div className={styles.stars}>
                {Array.from({ length: current.stars }).map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>
              <p className={styles.quoteName}>— {current.name}, {current.role}</p>
            </div>

            {/* Dots */}
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                  onClick={() => {
                    setFading(true);
                    setTimeout(() => { setActive(i); setFading(false); }, 350);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
