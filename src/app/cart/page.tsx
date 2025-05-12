"use client";

import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem/CartItem";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import styles from "./page.module.css";
import MainLayout from "../components/MainLayout/MainLayout";

export default function CartPage() {
  const { items, getFormattedTotalPrice, isInitialized } = useCart();
  const [isLoading, setIsLoading] = useState(!isInitialized);

  const formattedTotalPrice = useMemo(() => getFormattedTotalPrice(), [getFormattedTotalPrice]);

  const cartItemsList = useMemo(() => {
    return items.map((item) => <CartItem key={item.product.id} item={item} />);
  }, [items]);

  useEffect(() => {
    if (isInitialized) {
      setIsLoading(false);
    }
  }, [isInitialized]);

  if (isLoading) {
    return (
      <MainLayout title="Your Cart">
        <LoadingSpinner />
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Your Cart">
      {items.length > 0 ? (
        <>
          <div className={styles.cartItems}>{cartItemsList}</div>
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Total</span>
              <span className={styles.totalPrice}>{formattedTotalPrice}</span>
            </div>
            <button className={styles.checkoutButton}>Proceed to Checkout</button>
          </div>
        </>
      ) : (
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="64"
              height="64"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>It looks like you haven&apos;t added any products to your cart yet.</p>
          <Link href="/" className={styles.shopButton}>
            Start Shopping
          </Link>
        </div>
      )}
    </MainLayout>
  );
}
