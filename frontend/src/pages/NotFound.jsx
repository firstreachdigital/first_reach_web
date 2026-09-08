import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import { FaArrowRight, FaHome, FaBriefcase, FaEnvelope } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.glow} />

      <div className={styles.code}>404</div>

      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.sub}>
        Looks like this page doesn't exist or has been moved.
        <br />
        Let's get you back on track.
      </p>

      <div className={styles.actions}>
        <Link to="/" className={styles.btnPrimary}>
          <span className={styles.btnIcon}><FaHome /></span>
          Back to Home
        </Link>
        <Link to="/services" className={styles.btnGhost}>
          <span className={styles.btnIcon}><FaBriefcase /></span>
          Our Services
        </Link>
        <Link to="/Contact" className={styles.btnGhost}>
          <span className={styles.btnIcon}><FaEnvelope /></span>
          Contact Us
        </Link>
      </div>
    </div>
  );
}
