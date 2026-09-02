import React from "react";
import styles from "./CtaBanner.module.css";
import { Link } from "react-router-dom";
import mascot from "../../assets/laptop.png";

export default function CtaBanner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <div className={styles.left}>
          <h2>Ready to grow your brand digitally?</h2>
        </div>

        <div className={styles.right}>
          <img src={mascot} alt="First Reach Digital Mascot" className={styles.mascot} />
        </div>
      </div>
    </div>
  );
}