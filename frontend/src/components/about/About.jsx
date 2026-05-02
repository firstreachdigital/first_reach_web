import React, { useEffect, useRef } from 'react'
import styles from './About.module.css'
import { FaEye, FaHandshake, FaArrowRight } from "react-icons/fa"
import { TbTargetArrow } from "react-icons/tb"

const cards = [
  {
    icon: <TbTargetArrow />,
    title: 'Our Mission',
    desc: 'To raise brands up & into names with recognized values, dignity & identity. To open the doors of brand upgrade through strategies & creativity.',
  },
  {
    icon: <FaEye />,
    title: 'Our Vision',
    desc: 'To create an environment for every brand, where they can express their identity & continue their true legacy, by visualizing and showing it to the world. ',
  },
  {
    icon: <FaHandshake />,
    title: 'Collaborate with Us',
    desc: "Let’s team-up & take your brand to new heights.Our expert team will guide you through everything until you’re sure about what you really need for your brand. ",
  },
]

export default function About() {
  const titleFillRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    // Label + copy fade in
    const elements = document.querySelectorAll('[data-inview]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    elements.forEach((el) => observer.observe(el))

    // Title fill on scroll
    const handleScroll = () => {
      if (!titleFillRef.current) return
      const rect = titleFillRef.current.getBoundingClientRect()
      const winH = window.innerHeight
      const progress = Math.min(Math.max((winH - rect.top) / (winH * 0.5), 0), 1)
      titleFillRef.current.style.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <section className={styles.aboutSection} id="about" ref={sectionRef}>
      <div className={styles.bgGradient} />

      {/* LEFT — sticky */}
      <div className={styles.leftCol}>
        <span className={styles.sectionLabel} data-inview>
          <span className={styles.labelDot} /> &#123;01&#125; About Us
        </span>

        {/* Title with fill */}
        <div className={styles.titleWrap}>
          <h2 className={styles.titleBase}>
            UPLIFTING BRANDS THROUGH DIGITAL DESIGN 
          </h2>
          <h2 className={styles.titleFill} ref={titleFillRef}>
            UPLIFTING BRANDS THROUGH DIGITAL DESIGN 
          </h2>
        </div>

        <p className={styles.copy} data-inview>
          At <strong>First Reach Digital</strong>, we grow your brand while keeping it secure & scalable. 
          With us you can uplift your brand from visibility to conversion.
        </p>
        <p className={styles.copy} data-inview>
          We stop threats before they scale. Because, once you sign-up with First Reach Digital,
          your vision is our mission & there’s no more doubting in the dark.
        </p>

        <a href="#contact" className={styles.ctaBtn} data-inview>
          <span className={styles.ctaArrow}><FaArrowRight /></span>
          Get in touch
        </a>
      </div>

      {/* RIGHT — stacking cards */}
      <div className={styles.rightCol}>
        {cards.map((card, i) => (
          <div
            key={i}
            className={styles.card}
            style={{ '--i': i }}
          >
            <div className={styles.cardIcon}>{card.icon}</div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}