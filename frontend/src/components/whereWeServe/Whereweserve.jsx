import React, { useEffect, memo, useRef } from "react";
import styles from "./WhereWeServe.module.css";// case sensitive issue fixed
import { INDIA_MAP, UK_MAP, UAE_MAP } from "../../data/Locationdots";

const locations = [
  {
    country: "India",
    city: "Kochi, Kerala",
    tag: "Home Base",
    map: INDIA_MAP,
    footer:
      "Where the team is headquartered — every project starts and is delivered from here.",
  },
  {
    country: "United Arab Emirates",
    city: "Dubai",
    tag: "Client Base",
    map: UAE_MAP,
    footer:
      "Ongoing work for restaurants, retail and advisory clients across the Emirates.",
  },
  {
    country: "United Kingdom",
    city: "London",
    tag: "Client Base",
    map: UK_MAP,
    footer:
      "Partnering with UK businesses on web platforms, remotely and in their timezone.",
  },
];

// Renders a static SVG dot silhouette. All dots are pre-bucketed into three
// glow tiers at build time (see data/Locationdots.js), so there is no
// per-dot distance math and no per-dot inline style at render time -- each
// tier is a single <g> with a shared fill/opacity, which is what keeps this
// cheap to paint while the page scrolls.
const DotMap = memo(function DotMap({ map, label }) {
  const { w, h, near, mid, far, capital } = map;
  const pad = 6;
  const viewW = w + pad * 2;
  const viewH = h + pad * 2;
  const cx = capital[0] + pad;
  const cy = capital[1] + pad;

  return (
    <svg
      className={styles.mapSvg}
      viewBox={`0 0 ${viewW} ${viewH}`}
      role="img"
      aria-label={`Stylized dot map of ${label}`}
    >
      <g className={styles.tierFar} style={{ fill: "var(--accent)",}}>
        {far.map(([x, y], i) => (
          <circle key={i} cx={x + pad} cy={y + pad} r={0.7} />
        ))}
      </g>
      <g className={styles.tierMid} style={{ fill: "var(--accent)",}}>
        {mid.map(([x, y], i) => (
          <circle key={i} cx={x + pad} cy={y + pad} r={0.85} />
        ))}
      </g>
      <g className={styles.tierNear} style={{ fill: "var(--accent)",}}>
        {near.map(([x, y], i) => (
          <circle key={i} cx={x + pad} cy={y + pad} r={1} />
        ))}
      </g>

      <circle className={styles.pinHalo} cx={cx} cy={cy} r={5.5} />
      <circle className={styles.pinRing} cx={cx} cy={cy} r={3} />
      <circle className={styles.pin} cx={cx} cy={cy} r={2.1} />
    </svg>
  );
});

export default function WhereWeServe() {
   const titleFillRef = useRef(null);
  // useEffect(() => {
  //   const els = document.querySelectorAll("[data-ws-inview]");
  //   const obs = new IntersectionObserver(
  //     (entries) =>
  //       entries.forEach((e) => {
  //         if (e.isIntersecting) {
  //           e.target.classList.add(styles.inView);
  //           obs.unobserve(e.target);
  //         }
  //       }),
  //     { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  //   );
  //   els.forEach((el) => obs.observe(el));

  //   return () => obs.disconnect();
  // }, []);
  
  useEffect(() => {
    const els = document.querySelectorAll("[data-ws-inview]");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.inView);
            // direct, guaranteed reveal for the title fill -- doesn't
            // depend on the .titleWrap.inView .titleFill selector at all
            if (e.target.dataset.ws === "title" && titleFillRef.current) {
              titleFillRef.current.style.clipPath = "inset(0 0% 0 0)";
            }
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);
 

  return (
    <section className={styles.whereWeServe} id="where-we-serve">
      <div className={styles.bgGlow} />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.label} data-ws-inview>
            <span className={styles.labelDot} /> &#123;11&#125; Where We Serve
          </span>
          <div className={styles.titleWrap} data-ws-inview data-ws="title">
            <h2 className={styles.titleBase}>
              Proven Strategy. Protected Growth. Preferred by Brands.
            </h2>
            <h2 className={styles.titleFill} ref={titleFillRef}>
              Proven Strategy. Protected Growth. Preferred by Brands.
            </h2>
          </div>
        </div>
        <p className={styles.headerDesc} data-ws-inview>
          Industry pioneers rely on First Reach Digital to navigate the modern
          digital landscape. By fusing creative marketing with rigorous
          security, we empower businesses across logistics, fashion,
          hospitality, education, and beyond to scale safely, smartly, and
          continuously.
        </p>
      </div>
      {/* LOCATION CARDS */}
      <div className={styles.grid}>
        {locations.map((loc) => (
          <div className={styles.card} data-ws-inview key={loc.country}>
            <div className={styles.cardTop}>
              <div className={styles.cardHeading}>
                <span className={styles.cardCountry}>{loc.country}</span>
                <span className={styles.cardCity}>{loc.city}</span>
              </div>
              <span className={styles.cardTag}>{loc.tag}</span>
            </div>

            <div className={styles.mapWrap}>
              <DotMap map={loc.map} label={loc.country} />
            </div>

            <p className={styles.cardFooter}>{loc.footer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}