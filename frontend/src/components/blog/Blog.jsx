import React, { useState } from "react";
import styles from "./Blog.module.css";

const posts = [
  {
    id: 0,
    tag: "Clock Fly Strategy",
    date: "January 10, 2024",
    title: 'First Reach Wins "Top Creative Agency" Award',
    img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
  },
  {
    id: 1,
    tag: "Email Marketing",
    date: "January 10, 2024",
    title: "First Reach Launches 10+ Digital Solutions On the Market",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    featured: true, // center — large by default
  },
  {
    id: 2,
    tag: "Clock Fly Strategy",
    date: "January 10, 2024",
    title: "First Reach at the Digital Future Summit 2025",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
];

export default function Blog() {
  const [hovered, setHovered] = useState(null);
  const titleRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const handle = () => {
      if (!titleRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const tp = Math.min(Math.max((winH - rect.top) / (winH * 0.55), 0), 1);
      titleRef.current.style.clipPath = `inset(0 ${(1 - tp) * 100}% 0 0)`;
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Determine each card's size state
  // If something is hovered → hovered card is "big", others are "small"
  // If nothing hovered → center is "featured" (big), sides are normal
  const getState = (post) => {
    if (hovered === null) {
      return post.featured ? "featured" : "normal";
    }
    return hovered === post.id ? "big" : "small";
  };

  return (
    <section className={styles.section} id="blog" ref={sectionRef}>
      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.label}>
            <span className={styles.labelDot} />
            &#123;10&#125; Latest Insights
          </span>
          <div className={styles.titleWrap}>
            <h2 className={styles.titleBase}>
              Here's what we've been<br />up to
            </h2>
            <h2 className={styles.titleFill} ref={titleRef}>
              Here's what we've been<br />up to
            </h2>
          </div>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.desc}>
            Explore industry insights, expert tips, and creative inspiration
            from the First Reach team. Our blog is where we share knowledge,
            ideas, and what's next in digital.
          </p>
        </div>
      </div>

      {/* ── CARDS GRID ── */}
      <div className={styles.grid}>
        {posts.map((post) => {
          const state = getState(post);
          return (
            <div
              key={post.id}
              className={`${styles.card} ${styles[`card_${state}`]}`}
              onMouseEnter={() => setHovered(post.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className={styles.imgWrap}>
                <img src={post.img} alt={post.title} loading="lazy" />
                <div className={styles.imgOverlay} />

                {/* Tag badge */}
                <span className={styles.tag}>{post.tag}</span>

                {/* Eye icon — only on featured/big */}
                {(state === "featured" || state === "big") && (
                  <div className={styles.eyeBtn}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className={styles.cardBody}>
                <p className={styles.date}>{post.date}</p>
                <h3 className={styles.title}>{post.title}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MORE BLOG BTN ── */}
      <div className={styles.moreBtnWrap}>
        <a href="#" className={styles.moreBtn}>
          <span className={styles.moreBtnArrow}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
          More blog
        </a>
      </div>
    </section>
  );
}