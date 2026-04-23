import React, { useEffect } from 'react'
import styles from './About.module.css'
import { FaEye, FaHandshake } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";

export default function About() {
  useEffect(() => {
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
      { threshold: 0.2 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutIntro}>
        <span className={styles.sectionLabel} data-inview>
          About Us
        </span>
        <h2 className={styles.aboutTitle} data-inview>
          Elevating brands through digital design.
        </h2>
        <p className={styles.aboutCopy} data-inview>
          First Reach crafts premium digital experiences that help brands stand out,
          engage audiences, and convert with confidence.
        </p>
        <p className={styles.aboutCopy} data-inview>
          From strategy and brand storytelling to motion-led web design, every
          project is built to feel modern, memorable, and deeply purposeful.
        </p>
      </div>

      <div className={styles.aboutCards}>
        <article className={styles.aboutCard} data-inview>
          <div className={styles.cardIcon}><TbTargetArrow /></div>
          <h3>Our Mission</h3>
          <p>
            To help brands stand out online, tell their story, and drive measurable
            success through smart digital creativity.
          </p>
        </article>

        <article className={styles.aboutCard} data-inview>
          <div className={styles.cardIcon}><FaEye /></div>
          <h3>Our Vision</h3>
          <p>
            To inspire innovation through design, technology, and storytelling —
            making every digital interaction feel meaningful.
          </p>
        </article>

        <article className={styles.aboutCard} data-inview>
          <div className={styles.cardIcon}><FaHandshake /></div>
          <h3>Collaborate with Us</h3>
          <p>
            Let’s build something extraordinary together: bold visuals, intuitive
            UX, and growth-focused digital experiences.
          </p>
        </article>
      </div>
    </section>
  )
}
