import React, { useEffect, useRef, useState } from "react";
import styles from "./Portfolio.module.css";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { image_1, image_2, image_3, image_4 } from "../../assets";

// ── Replace these image URLs with your actual project images ──
// You can use images from your /assets folder like:
// import img1 from "../../assets/project1.jpg"
// or use any online placeholder until you have real images
const portfolioItems = [
  {
    number: "01",
    title: "WEALTH-I",
    category: "Branding & Strategy",
    desc: "Full visual overhaul for a fintech startup — logo, color system, typography, and motion guidelines.",
    color: "#05caf2",
    image: image_1,
  },
  {
    number: "02",
    title: "SHORTCODE",
    category: "Web Development",
    desc: "Custom storefront with 3D product viewer, animated cart, and 40% conversion uplift.",
    color: "#05caf2",
    image: image_2,
  },
  {
    number: "03",
    title: "ALBINAALQAWI",
    category: "UI / UX Design",
    desc: "End-to-end design of a data analytics platform — dark mode, complex data viz, and responsive layout.",
    color: "#05caf2",
    image: image_3,
  },
  {
    number: "04",
    title: "SCENARIO",
    category: "Product Design",
    desc: "Zero-to-one design and dev for a wellness app. Shipped to 10k+ users in first month.",
    color: "#05caf2",
    image: image_4,
  },
];


export default function Portfolio() {
  const titleFillRef = useRef(null);

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

function StatCard({ target, suffix, label, styles }) {
  const { ref, display } = useCountUp(target)
  return (
    <div className={styles.card} ref={ref} data-inview>
      <h3>{display}{suffix}</h3>
      <p>{label}</p>
    </div>
  )
}

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

        {/* <div className={styles.stats}>
          <div className={styles.card} data-inview>
            <h3>95%</h3>
            <p>Customer satisfaction</p>
          </div>
          <div className={styles.card} data-inview>
            <h3>12+</h3>
            <p>Years of experience</p>
          </div>
          <div className={styles.card} data-inview>
            <h3>22+</h3>
            <p>Projects completed</p>
          </div>
        </div> */}
        <div className={styles.stats}>
         <StatCard target={95} suffix="%" label="Customer satisfaction" styles={styles} />
         <StatCard target={12} suffix="+"  label="Years of experience"  styles={styles} />
         <StatCard target={22} suffix="+"  label="Projects completed"   styles={styles} />
        </div>
      </div>

      {/* ── RIGHT — ScrollStack with image cards ── */}
      <div className={styles.stackCol}>
        <ScrollStack
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
            <ScrollStackItem key={i}>
              <div
                className={styles.stackCard}
                style={{ "--card-accent": item.color }}
              >
                {/* Image */}
                <div className={styles.stackImg}>
                  <img src={item.image} alt={item.title} />
                  {/* Overlay */}
                  <div className={styles.stackImgOverlay} />
                </div>

                {/* Content over image */}
                <div className={styles.stackContent}>
                  <div className={styles.stackCardTop}>
                    <span className={styles.stackNum}>{item.number}</span>
                    <span
                      className={styles.stackTag}
                      style={{ color: item.color, borderColor: item.color }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className={styles.stackBottom}>
                    <h3 className={styles.stackTitle}>{item.title}</h3>
                    <p className={styles.stackDesc}>{item.desc}</p>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div
                  className={styles.stackBar}
                  style={{ background: item.color }}
                />
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}