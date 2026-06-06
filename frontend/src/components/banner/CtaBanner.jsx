import React from "react";
import styles from "./CtaBanner.module.css";
import { Link } from "react-router-dom";
//import coffee from "../../assets/coffee.png";

export default function CtaBanner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <div className={styles.left}>
         <h2>Ready to grow your brand digitally?</h2>
        </div>
        <div className={styles.right}>
            
          <p className={styles.sub}>Reach out and our team will respond within 24 hours.</p>
          <div className={styles.inputRow}>
            <input type="email" placeholder="Enter your email" />
            <Link to="/get-a-quote">
              <button>Get a Quote</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}