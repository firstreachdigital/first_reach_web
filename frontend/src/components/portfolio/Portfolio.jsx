import React, { useEffect, useRef, useState } from "react";
import styles from "./Portfolio.module.css";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
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


function StatCard({ target, suffix, label }) {  // ← styles prop remove
  const { ref, display } = useCountUp(target)
  return (
    <div className={styles.card} ref={ref} data-inview>  {/* ← directly styles use */}
      <h3>{display}{suffix}</h3>
      <p>{label}</p>
    </div>
  )
}

export default function Portfolio() {
  const titleFillRef = useRef(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    API.get("/portfolio")
      .then(({ data }) => {setPortfolioItems(data); 
       setLoaded(true);
      })
      .catch(() => {setLoaded(true)});
  }, []);

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

      {/* ── LEFT — your exact existing content ── */}
      <div className={styles.content}>
        <span className={styles.sectionLabel} data-inview>
          <span className={styles.dot}></span> &#123;04&#125; FunFacts
        </span>

        <div className={styles.titleWrap}>
          <h2 className={styles.titleBase}>
            "TUNES-IN STRATEGY & SPOTLIGHT WITH A DYNAMIC ENERGY!"
          </h2>
          <h2 className={styles.titleFill} ref={titleFillRef}>
            "TUNES-IN STRATEGY & SPOTLIGHT WITH A DYNAMIC ENERGY!"
          </h2>
        </div>

        <p className={styles.subtitle} data-inview>
          We’re more than metrics & ad copies - We recharge with coffee, share a meme-holic
          bond and brainstorms ideas in the mean-time. 
        </p>

        <div className={styles.stats}>
         <StatCard target={95} suffix="%" label="Customer satisfaction" />
         <StatCard target={12} suffix="+"  label="Years of experience" />
         <StatCard target={22} suffix="+"  label="Projects completed" />
        </div>
      </div>

      
      {/* ── RIGHT — ScrollStack ── */}
<div className={styles.stackCol}>
  {!loaded ? (
    // Loading state — skeleton
    <div style={{ 
      height: "100%", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      color: "#444"
    }}>
      Loading...
    </div>
  ) : portfolioItems.length === 0 ? (
    <div style={{ 
      height: "100%", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      color: "#444",
      fontSize: "0.9rem"
    }}>
      No portfolio items yet
    </div>
  ) : (
    
    <ScrollStack
      key={portfolioItems.length}
      itemDistance={120}
      itemScale={0.04}
      itemStackDistance={25}
      stackPosition="15%"
      scaleEndPosition="8%"
      baseScale={0.88}
      rotationAmount={0}
      blurAmount={1}
      useWindowScroll={false}
    >
      {portfolioItems.map((item, i) => (
        <ScrollStackItem key={item._id || i}>
          <div
            className={styles.stackCard}
            style={{ "--card-accent": item.color || "#05caf2" }}
          >
            <div className={styles.stackImg}>
              <img src={item.image} alt={item.title} />
              <div className={styles.stackImgOverlay} />
            </div>
            <div className={styles.stackContent}>
              <div className={styles.stackCardTop}>
                <span className={styles.stackNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={styles.stackTag}
                  style={{ 
                    color: item.color || "#05caf2", 
                    borderColor: item.color || "#05caf2" 
                  }}
                >
                  {item.category}
                </span>
              </div>
              <div className={styles.stackBottom}>
                <h3 className={styles.stackTitle}>{item.title}</h3>
                <p className={styles.stackDesc}>{item.subtitle}</p>
              </div>
            </div>
            <div
              className={styles.stackBar}
              style={{ background: item.color || "#05caf2" }}
            />
          </div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  )}
</div>
    </section>
  );
}