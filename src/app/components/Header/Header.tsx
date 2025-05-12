"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";

const Logo = () => (
  <span className={styles.logoIcon} aria-hidden="true">
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

export default function Header() {
  const { getItemCount } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = getItemCount();
  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.left}>
          <Link href="/" className={styles.brand} aria-label="Go to homepage" onClick={closeMenu}>
            <Logo />
            <span className={styles.brandText}>
              Fake <span className={styles.brandAccent}>Store</span>
            </span>
          </Link>
          {/* Desktop links */}
          <div className={styles.linksDesktop}>
            <Link href="/" className={styles.menuLink} aria-label="Home">
              Home
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          {/* Desktop cart icon */}
          <div className={styles.linksDesktop}>
            <Link href="/cart" className={styles.cartIcon} aria-label="View cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.cartSvg}
                aria-hidden="true"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
              {isMounted && (
                <span className={styles.cartCount} aria-live="polite">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
          {/* Hamburger for mobile */}
          <button
            className={styles.hamburger}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
            type="button"
          >
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
      </nav>
    </header>
  );
}
