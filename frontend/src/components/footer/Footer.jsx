import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/FRST REACH LOGO ELEPHANT.png"; 
import { FaLinkedin, FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.logoWrap}>
            <img src={logo} alt="First Reach Digital" />
            <h3>First Reach Digital</h3>
          </div>

          <p className={styles.desc}>
            Creative minds building impactful digital experience.
          </p>

          <p className={styles.email}>
            ✉ info@firstreachdigital.com
          </p>

          <div className={styles.available}>
            <span className={styles.dot}></span>
            Available for hire!
          </div>
        </div>

        {/* LINKS */}
        <div className={styles.links}>

          <div>
            <h4>Quick Navigation</h4>
            <ul>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/">Features</Link></li>
              <li><Link to="/">Pricing</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/faq">FAQ's</Link></li>
            </ul>
          </div>

          <div>
            <h4>All Pages</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/team">Team</Link></li>
              <li>Privacy Policy</li>
              <li>404</li>
            </ul>
          </div>

          <div>
            <h4>Social Media</h4>
            <div className={styles.socials}>
              <span><FaLinkedin /></span>
              <span><FaInstagramSquare /></span>
              <span><FaFacebookSquare /></span>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <p>© All rights reserved 2026</p>

        <div className={styles.credit}>
          Made with 💙 by First Reach Digital
        </div>

        <p>Sitemap</p>
      </div>
    </footer>
  );
}