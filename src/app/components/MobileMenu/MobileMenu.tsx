"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={styles.cartSvg}
    aria-hidden="true"
  >
    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
  </svg>
);

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { getItemCount } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = getItemCount();

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div
        id="mobile-menu"
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}
        role="menu"
        aria-hidden={!isOpen}
      >
        <button className={styles.closeButton} aria-label="Close menu" onClick={onClose}>
          &times;
        </button>
        <Link
          href="/"
          className={styles.menuLink}
          role="menuitem"
          tabIndex={isOpen ? 0 : -1}
          onClick={onClose}
        >
          Home
        </Link>
        <div className={styles.menuDivider} />
        <Link
          href="/cart"
          className={styles.cartLink}
          aria-label="View cart"
          role="menuitem"
          tabIndex={isOpen ? 0 : -1}
          onClick={onClose}
        >
          <CartIcon />
          {isMounted && (
            <span className={styles.cartCount} aria-live="polite">
              {itemCount}
            </span>
          )}
          <span className={styles.cartText}>Cart</span>
        </Link>
      </div>
    </>
  );
}
