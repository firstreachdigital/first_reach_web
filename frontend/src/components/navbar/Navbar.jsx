// src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logoElephant from "../../assets/FRST REACH LOGO ELEPHANT.png";
import { FaArrowRight } from "react-icons/fa";


const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a href="#home" className={styles.logo}>
          <img
            src={logoElephant}
            alt="First Reach Digital"
            className={styles.logoImg}
          />
          <div className={styles.logoTextWrap}>
            <span className={styles.logoTop}>First Reach</span>
            <span className={styles.logoBottom}>Digital</span>
          </div>
        </a>

        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className={styles.cta}>
          <span className={styles.ctaArrow}><FaArrowRight /></span>
          Get in Touch
        </a>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.open1 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open2 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open3 : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className={styles.mobileCta}>
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}
