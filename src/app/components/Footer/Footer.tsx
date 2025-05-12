"use client";

import styles from "./Footer.module.css";

const Logo = () => (
  <span className={styles.logoIcon}>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#0070f3" />
      <path
        d="M7 17l5-5 5 5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
          <span className={styles.brandText}>Fake Store</span>
        </div>

        <p className={styles.text}>
          Fake Store is a demo e-commerce site showcasing a variety of products. Thank you for
          visiting our store!
        </p>

        <div className={styles.copyright}>
          © {new Date().getFullYear()} Fake Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
