import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/FRST REACH LOGO ELEPHANT.png";
import { FaLinkedin, FaInstagramSquare, FaFacebookSquare, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* COL 1 — Brand */}
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <img src={logo} alt="First Reach Digital" />
            <h3>First Reach Digital</h3>
          </div>
          <p className={styles.desc}>
            Creative minds building impactful digital experience.
          </p>
          <div className={styles.socials}>
            <a href="https://in.linkedin.com/company/first-reach-digital-private-limited" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://www.instagram.com/firstreachdigital/" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a>
            <a href="https://www.facebook.com/FirstReachDigitalPrivateLimited/" target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>
          </div>
        </div>

        {/* COL 2 — Quick Navigation */}
        <div className={styles.col}>
          <h4>Quick Navigation</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/faq">FAQ's</Link></li>
          </ul>
        </div>

        {/* COL 3 — All Pages */}
        <div className={styles.col}>
          <h4>All Pages</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/blog">Blogs</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/testimonial">Testimonials</Link></li>
          </ul>
        </div>

        {/* COL 4 — Contact Us */}
        <div className={styles.col}>
          <h4>Contact Us</h4>
          <a href="tel:+919946618222" className={styles.contactItem}>
            <div className={styles.contactIcon}><FaPhoneAlt /></div>
            <span>+91 99466 18222</span>
          </a>
          <a href="mailto:info@firstreachdigital.com" className={styles.contactItem}>
            <div className={styles.contactIcon}><FaEnvelope /></div>
            <span>info@firstreachdigital.com</span>
          </a>
          <a href="mailto:sales@firstreachdigital.com" className={styles.contactItem}>
            <div className={styles.contactIcon}><FaEnvelope /></div>
            <span>sales@firstreachdigital.com</span>
          </a>
        </div>

      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
  <p>© All rights reserved 2026</p>
  <div className={styles.credit}>Made with 💙 by First Reach Digital</div>
  <div className={styles.bottomLinks}>
    <Link to="/privacy">Privacy Policy</Link>
    <Link to="/terms">Terms & Conditions</Link>
    <Link to="https://maps.app.goo.gl/nFQtAdzpHjvS428PA" target="_blank" rel="noopener noreferrer">Sitemap</Link>
  </div>
</div>
    </footer>
  );
}