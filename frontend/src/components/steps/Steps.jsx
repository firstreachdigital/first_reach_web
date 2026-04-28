import React, { useEffect, useRef } from "react";
import styles from "./Steps.module.css";

const steps = [
  {
    number: "1",
    label: "01.",
    title: "Discovery & Strategy",
    duration: "3-5 days",
    desc: "We start by understanding your goals, audience, and challenges. Together, we define the vision and roadmap.",
    side: "right",
  },
  {
    number: "2",
    label: "02.",
    title: "Design & Prototype",
    duration: "1 week",
    desc: "Our team crafts modern, user-friendly designs that reflect your brand and engage your users.",
    side: "left",
  },
  {
    number: "3",
    label: "03.",
    title: "Launch & Support",
    duration: "4-7 days",
    desc: "After launch, we stay by your side with updates, optimizations, and long-term support.",
    side: "right",
  },
];

// Generate stars once (stable positions)
const STARS = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${(i * 37.3 + 11) % 100}%`,
  top: `${(i * 53.7 + 7) % 100}%`,
  size: (i % 3) + 1,
  delay: `${(i * 0.17) % 4}s`,
}));

export default function Steps() {
  const sectionRef = useRef(null);
  const lineTrackRef = useRef(null);
  const lineFillRef = useRef(null);
  const titleFillRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const winH = window.innerHeight;

      // ── Line fill: top-to-bottom as viewport scrolls down the line ──
      if (lineFillRef.current && lineTrackRef.current) {
        const trackRect = lineTrackRef.current.getBoundingClientRect();
        // Distance the TOP of the line track is above the bottom of viewport
        // When top of line enters from bottom: progress starts
        // When bottom of line leaves at top: progress = 1
        const lineTop = trackRect.top;
        const lineHeight = trackRect.height;

        // Start filling when top of line is 80% down viewport
        // Finish filling when bottom of line hits 60% of viewport
        const startFill = winH * 0.75;   // line top at 75vh from top
        const endFill = winH * 0.2;      // line bottom at 20vh from top

        // scrolled = how far the line top has travelled past startFill
        const scrolledPx = startFill - lineTop;
        // total travel = from startFill to (lineHeight below startFill + 0)
        const totalPx = lineHeight + (startFill - endFill);
        const progress = Math.min(Math.max(scrolledPx / totalPx, 0), 1);

        lineFillRef.current.style.setProperty("--line-progress", progress);
      }

      // ── Dots: activate as line reaches them ──
      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        const rect = dot.getBoundingClientRect();
        if (rect.top < winH * 0.72) {
          dot.classList.add(styles.dotActive);
        } else {
          dot.classList.remove(styles.dotActive);
        }
      });

      // ── Cards: slide in ──
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        if (rect.top < winH * 0.85) {
          card.classList.add(styles.cardVisible);
        }
      });

      // ── Title fill ──
      if (titleFillRef.current && sectionRef.current) {
        const secRect = sectionRef.current.getBoundingClientRect();
        const tp = Math.min(Math.max((winH - secRect.top) / (winH * 0.55), 0), 1);
        titleFillRef.current.style.clipPath = `inset(0 ${(1 - tp) * 100}% 0 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.section} id="steps" ref={sectionRef}>

      {/* Starfield */}
      <div className={styles.stars} aria-hidden="true">
        {STARS.map((s) => (
          <span
            key={s.id}
            className={styles.star}
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <span className={styles.label}>
          <span className={styles.labelDot} />
          &#123;07&#125; Steps
        </span>

        <div className={styles.titleWrap}>
          <h2 className={styles.titleBase}>
            3 easy steps to get<br />started
          </h2>
          <h2 className={styles.titleFill} ref={titleFillRef}>
            3 easy steps to get<br />started
          </h2>
        </div>

        <p className={styles.subtitle}>
          Our three-step method blends strategy and creativity while
          keeping you in the loop
        </p>
      </div>

      {/* ── TIMELINE ── */}
      <div className={styles.timeline}>

        {/* Track + fill */}
        <div className={styles.lineTrack} ref={lineTrackRef}>
          <div className={styles.lineFill} ref={lineFillRef} />
        </div>

        {/* Steps */}
        {steps.map((step, i) => (
          <div key={i} className={styles.stepRow}>

            {/* Dot on line */}
            <div
              className={styles.stepDot}
              ref={(el) => (dotRefs.current[i] = el)}
            >
              <span>{step.number}</span>
            </div>

            {/* Card */}
            <div
              className={`${styles.card} ${
                step.side === "left" ? styles.cardLeft : styles.cardRight
              }`}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <span className={styles.cardDuration}>{step.duration}</span>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardNum}>{step.label}</span>
                {step.title}
              </h3>
              <p className={styles.cardDesc}>{step.desc}</p>
            </div>

          </div>
        ))}

        {/* End dot */}
        <div className={styles.lineEndDot} />
      </div>
    </section>
  );
}