import React from "react";
import styles from "./CtaBanner.module.css";
import { Link } from "react-router-dom";
import mascot from "../../assets/laptop.png";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function CtaBanner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <div className={styles.left}>
          <span className={styles.tagline}>Let's Grow Together</span>
          <h2>Ready to grow your brand digitally?</h2>
          <p className={styles.sub}>
            Let's discuss your goals and create something amazing together.
          </p>
        </div>

        <div className={styles.center}>
          <a href="tel:+919207332449" className={styles.callBtn}>
            <span className={styles.iconCircle}>
              <FaPhoneAlt size={14} />
            </span>
            <span className={styles.btnText}>
              <strong>Call Us</strong>
              <small>Talk to Our Expert</small>
            </span>
          </a>

          <a
            href="https://wa.me/919207332449"
            target="_blank"
            rel="noreferrer"
            className={styles.whatsappBtn}
          >
            <FaWhatsapp size={20} />
            <span className={styles.btnText}>
              <strong>WhatsApp Us</strong>
              <small>Get Quick Support</small>
            </span>
          </a>
        </div>

        <div className={styles.right}>
          <img src={mascot} alt="First Reach Digital Mascot" className={styles.mascot} />
        </div>
      </div>
    </div>
  );
}