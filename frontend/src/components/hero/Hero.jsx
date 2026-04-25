// Hero.jsx
import React, { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'
import elephantImg from '../../assets/First reach digital website homepage copy.jpg.jpeg'
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaFacebookF, FaArrowRight, FaPlay } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const marqueeItems = [
  'Brand Identity', 'Web Development', 'UI/UX Design',
  'Digital Strategy', 'E-Commerce', 'Motion Design',
  'Brand Identity', 'Web Development', 'UI/UX Design',
  'Digital Strategy', 'E-Commerce', 'Motion Design',
]

export default function Hero() {
  const headingRef = useRef(null)
  const imageRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const gradientBlobRef = useRef(null)   // ← NEW
  const [cursorHover, setCursorHover] = useState(false)

  useEffect(() => {
    const els = document.querySelectorAll('[data-animate]')
    els.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.15}s`
      el.classList.add(styles.animated)
    })
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    const img = imageRef.current
    const blob = gradientBlobRef.current  // ← NEW

    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0
    let blobX = 0, blobY = 0            // ← NEW

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (dot) {
        dot.style.left = mouseX + 'px'
        dot.style.top = mouseY + 'px'
      }

      if (img) {
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        const moveX = (mouseX - centerX) / centerX * -18
        const moveY = (mouseY - centerY) / centerY * -12
        img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`
      }
    }

    const animate = () => {
      // Cursor smooth follow
      curX += (mouseX - curX) * 0.12
      curY += (mouseY - curY) * 0.12
      if (cursor) {
        cursor.style.left = curX + 'px'
        cursor.style.top = curY + 'px'
      }

      // Gradient blob — slower follow (laggy = dreamy feel)
      blobX += (mouseX - blobX) * 0.06
      blobY += (mouseY - blobY) * 0.06
      if (blob) {
        blob.style.left = blobX + 'px'
        blob.style.top = blobY + 'px'
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()

    const hoverEls = document.querySelectorAll('a, button, [data-cursor-hover]')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => setCursorHover(true))
      el.addEventListener('mouseleave', () => setCursorHover(false))
    })

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      {/* ── GRADIENT BLOB FOLLOWS MOUSE ── */}
      <div ref={gradientBlobRef} className={styles.gradientBlob} />

      {/* ── CUSTOM CURSOR ── */}
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${cursorHover ? styles.cursorHover : ''}`}
      />
      <div ref={cursorDotRef} className={styles.cursorDot} />

      <section className={styles.hero} id="home">
        <div className={styles.gridBg} />
        <div className={styles.glowLeft} />
        <div className={styles.glowRight} />

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
  <span className={styles.asterisk}>✳</span>
  <div className={styles.socialRingWrap}>
    {/* Outer thin circle */}
    <div className={styles.socialOuterRing} />
    {/* Rotating dot */}
    <div className={styles.socialDotOrbit}>
      <div className={styles.socialDot} />
    </div>
    {/* Inner filled circle with icons */}
    <div className={styles.socialInnerCircle}>
  <a href="#" className={styles.socialLink}><FaWhatsapp /></a>
  <a href="#" className={styles.socialLink}><FaXTwitter /></a>
  <a href="#" className={styles.socialLink}><FaLinkedinIn /></a>
  <a href="#" className={styles.socialLink}><FaInstagram /></a>
  <a href="#" className={styles.socialLink}><FaFacebookF /></a>
</div>
  </div>
</div>

        <div className={styles.content}>
          <h1 className={styles.heading} ref={headingRef}>
            <span className={styles.headLine1} data-animate>First Reach</span>
            <span className={styles.badge} data-animate>
              &#123; Best Digital Agency 2026 &#125;
            </span>
            <span className={styles.headLine2} data-animate>Digital</span>
          </h1>

          <div className={styles.bottomRow} data-animate>
            <button className={styles.playBtn}>
              <span className={styles.playIcon}><FaPlay /></span>
            </button>
            <p className={styles.desc}>
              We design digital solutions that elevate your brand
              and boost conversions. Don't settle for a site. Build
              a powerful platform.
            </p>
            <a href="#about" className={styles.ctaBtn} data-cursor-hover>
              <span className={styles.ctaArrow}><FaArrowRight /></span>
              About Our Agency
            </a>
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
      {['Chargemap', 'ramify', 'greenly', 'GROWL', 'Teampact', 'argemap', 'Chargemap', 'ramify', 'greenly', 'GROWL', 'Teampact', 'argemap'].map((name, i) => (
        <span key={i} className={styles.logoItem}>{name}</span>
      ))}
    </div>
  </div>
</div>
    </>
  )
}