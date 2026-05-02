// src/components/team/Team.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./Team.module.css";
import { useNavigate } from "react-router-dom";
import { TEAM_MEMBERS } from "../../data/teamData";

const members = TEAM_MEMBERS; // swap with API later

export default function Team() {
  const [active, setActive]   = useState(1);
  const [animDir, setAnimDir] = useState(null);
  const titleFillRef          = useRef(null);
  const sectionRef            = useRef(null);
  const navigate              = useNavigate();

  // title fill on scroll
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

  const total = members.length;
  const getIndex = (offset) => (active + offset + total) % total;

  const go = (dir) => {
    setAnimDir(dir);
    setTimeout(() => {
      setActive((prev) =>
        dir === "right" ? (prev + 1) % total : (prev - 1 + total) % total
      );
      setAnimDir(null);
    }, 320);
  };

  const slots = [
    { offset: -2, pos: "farLeft"  },
    { offset: -1, pos: "left"     },
    { offset:  0, pos: "center"   },
    { offset:  1, pos: "right"    },
    { offset:  2, pos: "farRight" },
  ];

  return (
    <section className={styles.section} id="team" ref={sectionRef}>
      {/* Stars bg */}
      <div className={styles.starsBg} aria-hidden="true">
        {Array.from({ length: 35 }, (_, i) => (
          <span
            key={i}
            className={styles.star}
            style={{
              left: `${(i * 41.3 + 5) % 100}%`,
              top:  `${(i * 57.7 + 9) % 100}%`,
              width:  `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              animationDelay: `${(i * 0.19) % 4}s`,
            }}
          />
        ))}
      </div>

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.label}>
            <span className={styles.labelDot} />
            &#123;08&#125; Team members
          </span>
          <div className={styles.titleWrap}>
            <h2 className={styles.titleBase}>
              The Minds Behind Every Proud Project
            </h2>
            <h2 className={styles.titleFill} ref={titleFillRef}>
              The Minds Behind Every Proud Project
            </h2>
          </div>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.desc}>
            At First Reach Digital, we believe that true strength comes from unity in thoughts towards a 
            powerful mission. And we are committed to that beautiful idea!
          </p>
        </div>
      </div>

      {/* ── CAROUSEL ── */}
      <div className={styles.carouselWrap}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => go("left")}
          aria-label="Previous"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={`${styles.stage} ${animDir ? styles[`anim_${animDir}`] : ""}`}>
          {slots.map(({ offset, pos }) => {
            const idx    = getIndex(offset);
            const member = members[idx];
            const isCenter = pos === "center";
            const isHidden = pos === "farLeft" || pos === "farRight";

            return (
              <div
                key={`${pos}-${idx}`}
                className={`${styles.card} ${styles[pos]}`}
                onClick={() => !isCenter && go(offset > 0 ? "right" : "left")}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className={styles.cardImg}
                  loading="lazy"
                />

                {/* Plus button — navigates to member detail page */}
                {!isCenter && !isHidden && (
                  <button
                    className={styles.plusBtn}
                    aria-label={`View ${member.name}`}
                    onClick={(e) => {
                      e.stopPropagation(); // don't trigger carousel shift
                      navigate(`/team/${member.slug}`);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                )}

                {/* Center card also gets a "View Profile" button */}
                {isCenter && (
                  <button
                    className={styles.centerViewBtn}
                    aria-label={`View ${member.name} profile`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/team/${member.slug}`);
                    }}
                  >
                    View Profile
                  </button>
                )}

                <div className={styles.nameOverlay}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => go("right")}
          aria-label="Next"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ── FOOTER LINK ── */}
      <div className={styles.footerLink}>
        <a href="/team">
          More of our <strong>Team members</strong>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </section>
  );
}