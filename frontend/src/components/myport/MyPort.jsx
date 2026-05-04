import React, { useEffect, useRef, useState } from "react";
import styles from "./MyPort.module.css";
import { image_1, image_2, image_3, image_4 } from "../../assets";

const projects = [
  {
    id: "01",
    title: "WEALTH-I",
    subtitle: "The largest tech show where we present our brand",
    tags: ["Web design", "Portfolio"],
    image: image_1,
    color: "#05caf2",
    size: "large", // takes full left column
  },
  {
    id: "02",
    title: "SHORTCODE",
    subtitle: "From idea to investment, fast.",
    tags: ["Web design", "Portfolio"],
    image: image_2,
    color: "#05caf2",
    size: "large", // takes full right column
  },
  {
    id: "03",
    title: "ALBINAALQAWI",
    subtitle: "Empowering Global Startup Growth",
    tags: ["Web design", "Portfolio"],
    image: image_3,
    color: "#05caf2",
    size: "large",
  },
  {
    id: "04",
    title: "SCENARIO",
    subtitle: "Brand Refresh & Strategy",
    tags: ["Web design", "Portfolio"],
    image: image_4,
    color: "#05caf2",
    size: "large",
  },
];

export default function MyPort() {
  const sectionRef = useRef(null);
  const titleFillRef = useRef(null);
  const [activeTag, setActiveTag] = useState("All");

  const allTags = ["All", "Web design", "Portfolio", "Branding"];

  useEffect(() => {
    // Fade-in observer
    const elements = sectionRef.current?.querySelectorAll("[data-inview]") || [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));

    // Title fill on scroll
    const handleScroll = () => {
      if (!titleFillRef.current) return;
      const rect = titleFillRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = Math.min(Math.max((winH - rect.top) / (winH * 0.55), 0), 1);
      titleFillRef.current.style.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section className={styles.section} id="myport" ref={sectionRef}>
      {/* bg accent */}
      <div className={styles.bgAccent} />

      {/* ── HEADER ── */}
      <div className={styles.header}>
        {/* left */}
        <div className={styles.headerLeft}>
          <span className={styles.label} data-inview>
            <span className={styles.labelDot} />
            &#123;02&#125; Our Services
          </span>

          <div className={styles.titleWrap}>
            <h2 className={styles.titleBase}>
              Not Just Promises; Proven Records 
            </h2>
            <h2 className={styles.titleFill} ref={titleFillRef}>
              Not Just Promises; Proven Records 
            </h2>
          </div>
        </div>

        {/* right */}
        <div className={styles.headerRight} data-inview>
          <p className={styles.headerDesc}>
           Let’s move aside what WE are saying & take a quick look at what we does
          </p>

          {/* filter tabs */}
          <div className={styles.filters}>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`${styles.filterBtn} ${activeTag === tag ? styles.filterActive : ""}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <div className={styles.grid}>
        {filtered.map((project, i) => (
          <div
            key={project.id}
            className={styles.card}
            style={{ "--card-color": project.color, animationDelay: `${i * 0.08}s` }}
            data-inview
          >
            {/* image */}
            <div className={styles.cardImg}>
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className={styles.cardOverlay} />
            </div>

            {/* tags row — top right */}
            <div className={styles.cardTags}>
              {project.tags.map((t) => (
                <span key={t} className={styles.cardTag}>{t}</span>
              ))}
            </div>

            {/* hover content */}
            <div className={styles.cardContent}>
              <span className={styles.cardNum}>{project.id}</span>
              <div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardSub}>{project.subtitle}</p>
              </div>
              <a href="#contact" className={styles.cardArrow} style={{ background: project.color }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            {/* bottom accent line */}
            <div className={styles.cardLine} style={{ background: project.color }} />
          </div>
        ))}
      </div>

      {/* ── VIEW ALL ── */}
      <div className={styles.viewAll} data-inview>
        <a href="#contact" className={styles.viewAllBtn}>
          View All Projects
          <span className={styles.viewAllArrow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}