import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Portfolio.module.css";
import DepthCarousel from "./DepthCarousel";
import API from "../../api/axios";

function useCountUp(target, duration = 2000, suffix = '') {
  const ref = useRef(null)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.unobserve(el)

        const isDecimal = target.toString().includes('.')
        const numericTarget = parseFloat(target)
        const startTime = performance.now()

        const tick = (now) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = eased * numericTarget

          setDisplay(
            isDecimal
              ? current.toFixed(1)
              : Math.floor(current).toString()
          )

          if (progress < 1) requestAnimationFrame(tick)
          else setDisplay(target.toString())
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, display }
}


function StatCard({ target, suffix, label }) {
  const { ref, display } = useCountUp(target)
  return (
    <div className={styles.card} ref={ref} data-inview>
      <h3>{display}{suffix}</h3>
      <p>{label}</p>
    </div>
  )
}

export default function Portfolio() {
  const titleFillRef = useRef(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
   const [viewport, setViewport] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

    useEffect(() => {
    const onResize = () => setViewport(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const carouselSize = useMemo(() => {
    if (viewport <= 480) return { cardWidth: 260, cardHeight: 340, spread: 40, depth: 140 };
    if (viewport <= 768) return { cardWidth: 300, cardHeight: 390, spread: 55, depth: 170 };
    if (viewport <= 1024) return { cardWidth: 340, cardHeight: 430, spread: 70, depth: 190 };
    return { cardWidth: 380, cardHeight: 480, spread: 90, depth: 220 };
  }, [viewport]);

  useEffect(() => {
    API.get("/portfolio")
      .then(({ data }) => {
        setPortfolioItems(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  // Only posters — matches items tagged/categorized "Social Media Creatives"
  // in the dashboard. Checks both `category` (string) and `tags` (array)
  // so it works regardless of which field the admin form actually saved to.
  const posterItems = useMemo(
    () =>
      portfolioItems
        .filter((item) => {
          const inCategory = item.category === "Social Media Creatives";
          const inTags =
            Array.isArray(item.tags) &&
            item.tags.includes("Social Media Creatives");
          return inCategory || inTags;
        })
        .map((item) => ({
          image: item.image,
          alt: item.title || item.subtitle || "",
        })),
    [portfolioItems]
  );

  useEffect(() => {
    // Fade-in observer
    const elements = document.querySelectorAll("[data-inview]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));

    // Scroll text fill-up
    const handleScroll = () => {
      if (!titleFillRef.current) return;
      const rect = titleFillRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = Math.min(
        Math.max((winH - rect.top) / (winH * 0.5), 0),
        1
      );
      titleFillRef.current.style.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);


  return (
    <section className={styles.portfolioSection} id="portfolio">
      <div className={styles.bgGrid}></div>

      {/* ── LEFT — unchanged ── */}
      <div className={styles.content}>
        <span className={styles.sectionLabel} data-inview>
          {/* <span className={styles.dot}></span> &#123;04&#125; OUR PROCESS */}
        </span>

        <div className={styles.titleWrap}>
          <h2 className={styles.titleBase}>
            TUNES-IN STRATEGY & SPOTLIGHT WITH A DYNAMIC ENERGY!
          </h2>
          <h2 className={styles.titleFill} ref={titleFillRef}>
            TUNES-IN STRATEGY & SPOTLIGHT WITH A DYNAMIC ENERGY!
          </h2>
        </div>

        <p className={styles.subtitle} data-inview>
          We’re more than metrics & ad copies - We recharge with coffee, share a meme-holic
          bond and brainstorms ideas in the mean-time. 
        </p>

        <div className={styles.stats}>
         <StatCard target={95} suffix="%" label="Customer satisfaction" />
         <StatCard target={10} suffix="+"  label="Years of experience" />
         <StatCard target={390} suffix="+"  label="Projects completed" />
         <StatCard target={7} suffix="+"  label="Countries served" />
        </div>
      </div>

      {/* ── RIGHT — DepthCarousel, posters only ── */}
      <div className={styles.stackCol}>
        {!loaded ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#444",
            }}
          >
            Loading...
          </div>
        ) : posterItems.length === 0 ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#444",
              fontSize: "0.9rem",
            }}
          >
            No posters yet
          </div>
        ) : (
          <DepthCarousel
            items={posterItems}
            //depth={220}
            //spread={90}
            depth={carouselSize.depth}
            spread={carouselSize.spread}
            tilt={22}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.2}
            blur={6}
            autoplay={false}
            loop
            //cardWidth={380}
            //cardHeight={480}
            cardWidth={carouselSize.cardWidth}
            cardHeight={carouselSize.cardHeight}
            radius={18}
            tint="#05060a"
            duration={700}
            ease="power3.out"
            autoplayDelay={3200}
            showControls
            showIndicators
          />
        )}
      </div>
    </section>
  );
}