import React, { useEffect, useRef, useState } from "react";
import styles from "./Testimonials.module.css";

// ── Testimonials data ──
const testimonials = [
  {
    id: 0,
    quote:
      '"From start to finish, the communication was seamless and the design blew us away. They really know how to bring a brand to life!"',
    name: "James R.",
    role: "Startup Founder",
    stars: 5,
  },
  {
    id: 1,
    quote:
      '"Absolutely incredible work. Our website traffic doubled in two months and the visual identity is exactly what we dreamed of."',
    name: "Sarah K.",
    role: "Marketing Director",
    stars: 5,
  },
  {
    id: 2,
    quote:
      '"Professional, creative, and fast. First Reach Digital exceeded every expectation we had for our rebrand."',
    name: "David M.",
    role: "CEO, TechFlow",
    stars: 5,
  },
];

// ── Avatar positions: left arc & right arc ──
// Each avatar: { side: 'left'|'right', top, size, speed }
// speed: how much they shift horizontally per scroll unit
// left side avatars move RIGHT (positive x), right side move LEFT (negative x)
const avatars = [
  // LEFT ARC — move right on scroll
  {
    id: 0,
    side: "left",
    top: "18%",
    left: "30%",
    size: 70,
    speed: 0.06,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
  },
  {
    id: 1,
    side: "left",
    top: "30%",
    left: "22%",
    size: 82,
    speed: 0.09,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
  },
  {
    id: 2,
    side: "left",
    top: "46%",
    left: "14%",
    size: 72,
    speed: 0.12,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
  },
  {
    id: 3,
    side: "left",
    top: "62%",
    left: "18%",
    size: 64,
    speed: 0.1,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
  },
  {
    id: 4,
    side: "left",
    top: "76%",
    left: "26%",
    size: 60,
    speed: 0.07,
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
  },
  // RIGHT ARC — move left on scroll
  {
    id: 5,
    side: "right",
    top: "16%",
    right: "28%",
    size: 74,
    speed: 0.06,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80",
  },
  {
    id: 6,
    side: "right",
    top: "30%",
    right: "20%",
    size: 80,
    speed: 0.09,
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80",
  },
//   {
//     id: 7,
//     side: "right",
//     top: "46%",
//     right: "12%",
//     size: 76,
//     speed: 0.12,
//     img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80",
//   },
//   {
//     id: 8,
//     side: "right",
//     top: "61%",
//     right: "16%",
//     size: 68,
//     speed: 0.1,
//     img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80",
//   },
//   {
//     id: 9,
//     side: "right",
//     top: "76%",
//     right: "26%",
//     size: 90,
//     speed: 0.07,
//     img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&q=80",
//     glowing: true,
//   },
];

export default function Testimonial() {
  const sectionRef = useRef(null);
  const avatarRefs = useRef([]);
  const titleFillRef = useRef(null);
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

   
 useEffect(() => {
  avatarRefs.current.forEach((el, i) => {
    if (!el) return;

   const positions = [
  { x: -420, y: 80 },
  { x: -320, y: -40 },
  { x: -200, y: -140 },
  { x: -40, y: -180 },

  { x: 120, y: -140 },
  { x: 260, y: -40 },

  { x: 360, y: 80 },
  { x: 300, y: 240 },
  { x: 180, y: 360 },
  { x: 40, y: 440 },
];

    const pos = positions[i];

    el.style.transform = `
      translate(-50%, -50%)
      translate(${pos.x}px, ${pos.y}px)
    `;
  });
}, []); 

useEffect(() => {
  const handleScroll = () => {
    if (!titleFillRef.current) return;

    const rect = titleFillRef.current.getBoundingClientRect();
    const winH = window.innerHeight;

    const progress = Math.min(
      Math.max((winH - rect.top) / (winH * 0.6), 0),
      1
    );

    titleFillRef.current.style.clipPath = `
      inset(0 ${(1 - progress) * 100}% 0 0)
    `;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-inview]") || [];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.inView);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
        setFading(false);
      }, 350);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
            <h2 className={styles.titleBase}>
              What Our Happy Clients Say…
            </h2>
            <h2 className={styles.titleFill} ref={titleFillRef}>
              What Our Happy Clients Say…
            </h2>
          </div>
        </div>

        <div className={styles.headerRight} data-inview>
          <p className={styles.headerDesc}>
            Listen to what matters; The satisfied tone of testimonies from our valued customers
          </p>
          <a href="#contact" className={styles.moreBtn}>
            <span className={styles.moreBtnArrow}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
        {avatars.map((av, i) => (
          <div
            key={av.id}
            ref={(el) => (avatarRefs.current[i] = el)}
            className={`${styles.avatar} ${av.glowing ? styles.avatarGlow : ""}`}
            style={{
              width: av.size,
              height: av.size,
            }}
          >
            <img src={av.img} alt="client" loading="lazy" />
          </div>
        ))}

        {/* Center quote card */}
        <div className={styles.quoteCard}>
          <div
            className={`${styles.quoteInner} ${fading ? styles.fadeOut : styles.fadeIn}`}
          >
            <span className={styles.quoteIcon}>"</span>
            <p className={styles.quoteText}>{current.quote}</p>
            <div className={styles.quoteDivider} />
            <div className={styles.stars}>
              {Array.from({ length: current.stars }).map((_, i) => (
                <span key={i} className={styles.star}>
                  ★
                </span>
              ))}
            </div>
            <p className={styles.quoteName}>
              — {current.name}, {current.role}
            </p>
          </div>

          {/* Dots */}
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                onClick={() => {
                  setFading(true);
                  setTimeout(() => {
                    setActive(i);
                    setFading(false);
                  }, 350);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
