// Hero.jsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import elephantImg from "../../assets/First reach digital website homepage copy.jpg.jpeg";
import logo from "../../assets/FRST REACH LOGO ELEPHANT.png";


import {
  FaWhatsapp,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaArrowRight,
  FaPlay,
  FaStarOfLife,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import DecryptedText from "./DecryptedText";
import { Link } from "react-router-dom";

const marqueeItems = [
  "Brand Identity",
  "Web Development",
  "UI/UX Design",
  "Digital Strategy",
  "E-Commerce",
  "Motion Design",
  "Brand Identity",
  "Web Development",
  "UI/UX Design",
  "Digital Strategy",
  "E-Commerce",
  "Motion Design",
];

export default function Hero() {
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const gradientBlobRef = useRef(null);
  const [cursorHover, setCursorHover] = useState(false);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    const els = document.querySelectorAll("[data-animate]");
    els.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.15}s`;
      el.classList.add(styles.animated);
    });
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    const img = imageRef.current;
    const blob = gradientBlobRef.current;

    let mouseX = 0,
      mouseY = 0;
    let curX = 0,
      curY = 0;
    let blobX = 0,
      blobY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dot) {
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
      }

      if (img) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = ((mouseX - centerX) / centerX) * -18;
        const moveY = ((mouseY - centerY) / centerY) * -12;
        img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      }
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      if (cursor) {
        cursor.style.left = curX + "px";
        cursor.style.top = curY + "px";
      }

      blobX += (mouseX - blobX) * 0.06;
      blobY += (mouseY - blobY) * 0.06;
      if (blob) {
        blob.style.left = blobX + "px";
        blob.style.top = blobY + "px";
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    const hoverEls = document.querySelectorAll(
      "a, button, [data-cursor-hover]",
    );
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => setCursorHover(true));
      el.addEventListener("mouseleave", () => setCursorHover(false));
    });

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  //vanila theme 
// useEffect(() => {
//   const loadScript = (src) =>
//     new Promise((resolve, reject) => {
//       if (document.querySelector(`script[src="${src}"]`)) {
//         resolve();
//         return;
//       }
//       const s = document.createElement("script");
//       s.src = src;
//       s.onload = resolve;
//       s.onerror = reject;
//       document.head.appendChild(s);
//     });

//   const initVanta = async () => {
//     await loadScript(
//       "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
//     );
//     await loadScript(
//       "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js"
//     );

//     if (window.VANTA && vantaRef.current && !vantaEffect.current) {
//       vantaEffect.current = window.VANTA.BIRDS({
//         el: vantaRef.current,
//         mouseControls: true,
//         touchControls: true,
//         gyroControls: false,
//         backgroundColor: 0xffffff,
//         color1: 0x05caf2,
//         color2: 0x0a6ef5,
//         colorMode: "lerp",
//         quantity: 3,
//         birdSize: 1.2,
//         wingSpan: 25,
//         speedLimit: 4,
//         separation: 60,
//         alignment: 40,
//         cohesion: 35,
//       });
//       window.vantaEffect = vantaEffect.current;
//     }
//   };

//   initVanta();

//   return () => {
//     if (vantaEffect.current) {
//       vantaEffect.current.destroy();
//       vantaEffect.current = null;
//       window.vantaEffect = null;
//     }
//   };
// }, []);

// Replace the vanta useEffect with this:
useEffect(() => {
  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });

  // Poll until window.THREE is truly available (fixes the race condition)
  const waitForTHREE = () =>
    new Promise((resolve) => {
      const check = () => (window.THREE ? resolve() : setTimeout(check, 50));
      check();
    });

  // Read current theme from <html data-theme="...">
  const getVantaBg = () => {
    const theme = document.documentElement.getAttribute("data-theme");
    return theme === "light" ? 0xfafafa : 0x080808;
  };

  const destroyVanta = () => {
    if (vantaEffect.current) {
      vantaEffect.current.destroy();
      vantaEffect.current = null;
      window.vantaEffect = null;
    }
  };

  const createVanta = () => {
    if (!window.VANTA || !vantaRef.current) return;
    destroyVanta();
    vantaEffect.current = window.VANTA.BIRDS({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      backgroundColor: getVantaBg(), // ← theme-aware
      color1: 0x05caf2,
      color2: 0x0a6ef5,
      colorMode: "lerp",
      quantity: 3,
      birdSize: 1.2,
      wingSpan: 25,
      speedLimit: 4,
      separation: 60,
      alignment: 40,
      cohesion: 35,
    });
    window.vantaEffect = vantaEffect.current;
  };

  const initVanta = async () => {
    await loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
    );
    await waitForTHREE(); // ← wait until THREE is truly on window
    await loadScript(
      "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js"
    );
    createVanta();
  };

  initVanta();

  // Re-init Vanta whenever data-theme changes on <html>
  const observer = new MutationObserver(() => {
    if (window.VANTA) createVanta();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => {
    observer.disconnect();
    destroyVanta();
  };
}, []);


  return (
    <>
      {/* ── GRADIENT BLOB FOLLOWS MOUSE ── */}
      <div ref={gradientBlobRef} className={styles.gradientBlob} />

      {/* ── CUSTOM CURSOR ── */}
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${cursorHover ? styles.cursorHover : ""}`}
      />
      <div ref={cursorDotRef} className={styles.cursorDot} />

      <section className={styles.hero} id="home">
        {/* <div className={styles.gridBg} /> */}
        {/* <div className={styles.glowLeft} /> */}
        {/* <div className={styles.glowRight} /> */}
         <div ref={vantaRef} className={styles.vantaBg} />

        <div className={styles.imageWrap}>
          <div className={styles.imageGlow} />
          <img
            ref={imageRef}
            src={elephantImg}
            alt="Creative mascot"
            className={styles.heroImage}
          />
        </div>

        {/* Social Sidebar */}
        <div className={styles.socialBar}>
          {/* <span className={styles.asterisk}><FaStarOfLife /></span> */}
          <div className={styles.socialRingWrap}>
            <div className={styles.socialOuterRing} />
            <div className={styles.socialDotOrbit}>
              <div className={styles.socialDot} />
            </div>
            <div className={styles.socialInnerCircle}>
              <a href="https://wa.me/9946618222"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}>
                <FaWhatsapp />
              </a>
              <a href="#" className={styles.socialLink}>
                <FaXTwitter />
              </a>
              <a href="https://in.linkedin.com/company/first-reach-digital-private-limited"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}>
                <FaLinkedinIn />
              </a>
              <a href="https://www.instagram.com/firstreachdigital/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}>
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/FirstReachDigitalPrivateLimited/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}>
                <FaFacebookF />
              </a>
            </div>
            <div className={styles.donutLogo}>
              <img src={logo} alt="First Reach Digital" />
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <h1 className={styles.heading} ref={headingRef}>
            {/* ── "First Reach" — decrypts sequentially from start on view ── */}
            <span className={styles.headLine1} data-animate>
              <DecryptedText
                text="First Reach"
                animateOn="view"
                sequential
                revealDirection="start"
                speed={60}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&"
                className={styles.decryptedRevealed}
                encryptedClassName={styles.decryptedEncrypted}
                parentClassName={styles.decryptedParent}
              />
            </span>

            {/* ── badge stays as-is ── */}
            <span className={styles.badge} data-animate>
              &#123; Best Digital Agency 2026 &#125;
            </span>

            {/* ── "Digital" — decrypts from end, slight delay feel ── */}
            <span className={styles.headLine2} data-animate>
              <DecryptedText
                text="Digital"
                animateOn="view"
                sequential
                revealDirection="end"
                speed={80}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$"
                className={styles.decryptedRevealed}
                encryptedClassName={styles.decryptedEncrypted}
                parentClassName={styles.decryptedParent}
              />
            </span>
          </h1>

          <div className={styles.bottomRow} data-animate>
            <button className={styles.playBtn}>
              <span className={styles.playIcon}>
                <FaPlay />
              </span>
            </button>
            <p className={styles.desc}>
              Your ONE STOP BRAND PROTECTION & PROMOTION SOLUTION. We take in
              your vision & render it back, full of life.
            </p>
            <Link to="/about" className={styles.ctaBtn} data-cursor-hover>
              <span className={styles.ctaArrow}>
                <FaArrowRight />
              </span>
              About Our Agency
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDot}>✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Logo Marquee Strip */}
      <div className={styles.logosWrap}>
        <div className={styles.logosLeft}>
          <p className={styles.logosLabel}>Trusted by the biggest</p>
          <p className={styles.logosLabel}>brand worldwide</p>
        </div>
        <div className={styles.logosMarqueeWrap}>
          <div className={styles.logosTrack}>
            {[
              "Shortcode",
              "VMR Kuthira",
              "Penn Pattu",
              "Albina AlQawi",
              "Party Blooms",
              "Wealth-i",
              "Eagle Express Freight",
              "Editoreal",
              "First Edition",
              "Tech-X Media",
              "Happy Productions",
              "Wealth-i Productions",
              "Good Earth",
              "Acquire Ren A Car",
              "Sip & Bite",
              "Panorama Studios",
              "Scenario Digital",
            ].map((name, i) => (
              <span key={i} className={styles.logoItem}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
