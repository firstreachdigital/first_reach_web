import React, { useEffect, useRef } from "react";
import styles from "./WhyUs.module.css";
import { FaStar, FaBolt } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";

const bentoItems = [
  {
    type: "image",
    title: "Seamless Collaboration",
    desc: "Transparent communication and feedback loops at every stage of the project.",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
    size: "small",
  },
  {
    type: "image-overlay",
    title: "Seamless Collaboration",
    icon: <FaBolt />,
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    size: "medium",
  },
  {
    type: "image",
    title: "15+ Years Experiences",
    desc: "Over 15 years of experience delivering innovative digital solutions.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    size: "small",
  },
  {
    type: "stats",
    stars: 5,
    stat: "99+",
    statLabel: "Happy Clients",
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
    ],
    size: "wide",
  },
  {
    type: "turnaround",
    title: "7 day turnaround",
    size: "small",
  },
];

export default function WhyUs() {
  const titleFillRef = useRef(null);

  useEffect(() => {
    // inview
    const els = document.querySelectorAll("[data-wu-inview]");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.inView);
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    els.forEach((el) => obs.observe(el));

    // title fill
    const onScroll = () => {
      if (!titleFillRef.current) return;
      const rect = titleFillRef.current.getBoundingClientRect();
      const p = Math.min(
        Math.max(
          (window.innerHeight - rect.top) / (window.innerHeight * 0.5),
          0,
        ),
        1,
      );
      titleFillRef.current.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  //clock animation
  const hourRef = useRef(null);
  const minRef = useRef(null);
  const secRef = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const hourDeg = hours * 30 + minutes * 0.5;
      const minDeg = minutes * 6;
      const secDeg = seconds * 6;

      if (hourRef.current)
        hourRef.current.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
      if (minRef.current)
        minRef.current.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
      if (secRef.current)
        secRef.current.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.whyUs} id="why-us">
      <div className={styles.bgGlow} />

      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.label} data-wu-inview>
            <span className={styles.labelDot} /> &#123;03&#125; Why Choose Us?
          </span>
          <div className={styles.titleWrap}>
            <h2 className={styles.titleBase}>
              We are offering the best solutions
            </h2>
            <h2 className={styles.titleFill} ref={titleFillRef}>
              We are offering the best solutions
            </h2>
          </div>
        </div>
        <p className={styles.headerDesc} data-wu-inview>
          We offer a full range of digital services to help your brand stand
          out, connect, and grow.
        </p>
      </div>

      {/* BENTO GRID */}
      <div className={styles.grid}>
        {/* Card 1 — image + text bottom left */}
        <div className={`${styles.card} ${styles.cardSmall}`} data-wu-inview>
          <img src={bentoItems[0].img} alt="" className={styles.cardImg} />
          <div className={styles.cardImgOverlay} />
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{bentoItems[0].title}</h3>
            <p className={styles.cardDesc}>{bentoItems[0].desc}</p>
          </div>
        </div>

        {/* Card 2 — tall image with bottom overlay box */}
        <div className={`${styles.card} ${styles.cardTall}`} data-wu-inview>
          <img src={bentoItems[1].img} alt="" className={styles.cardImg} />
          <div className={styles.cardImgOverlay} />
          <div className={styles.overlayBox}>
            <span className={styles.overlayIcon}>
              <FaBolt />
            </span>
            <h3 className={styles.overlayTitle}>{bentoItems[1].title}</h3>
          </div>
        </div>

        {/* Card 3 — image + text */}
        <div className={`${styles.card} ${styles.cardSmall}`} data-wu-inview>
          <img src={bentoItems[2].img} alt="" className={styles.cardImg} />
          <div className={styles.cardImgOverlay} />
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{bentoItems[2].title}</h3>
            <p className={styles.cardDesc}>{bentoItems[2].desc}</p>
          </div>
        </div>

        {/* Card 4 — stats: stars + happy clients + avatars */}
        <div
          className={`${styles.card} ${styles.cardWide} ${styles.cardDark}`}
          data-wu-inview
        >
          <div className={styles.statsWrap}>
            <div className={styles.statsLeft}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={styles.star} />
                ))}
              </div>
              <div className={styles.statNum}>99+</div>
              <div className={styles.statLabel}>Happy Clients</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.avatarStack}>
              {bentoItems[3].avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className={styles.avatar}
                  style={{ zIndex: 4 - i }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card 5 — 7 day turnaround */}
        <div
          className={`${styles.card} ${styles.cardSmall} ${styles.cardDark}`}
          data-wu-inview
        >
          <div className={styles.turnaroundWrap}>
            <div className={styles.turnaroundTop}>
              <MdOutlineTimer className={styles.turnaroundIcon} />
              <h3 className={styles.turnaroundTitle}>7 day turnaround</h3>
            </div>
            <div className={styles.clockWrap}>
              <div className={styles.clock}>
                <div className={styles.clockFace}>
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={styles.tick}
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    >
                      <div
                        className={`${styles.tickMark} ${i % 3 === 0 ? styles.tickBig : ""}`}
                      />
                    </div>
                  ))}
                  {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
                    const angle = i * 30;
                    const rad = (angle - 90) * (Math.PI / 180);
                    const r = 36;
                    const x = 50 + r * Math.cos(rad);
                    const y = 50 + r * Math.sin(rad);
                    return (
                      <span
                        key={num}
                        className={styles.clockNum}
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        {num}
                      </span>
                    );
                  })}
                  <div className={styles.hourHand} ref={hourRef} />
                  <div className={styles.minHand} ref={minRef} />
                  <div className={styles.secHand} ref={secRef} />
                  <div className={styles.clockCenter} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
