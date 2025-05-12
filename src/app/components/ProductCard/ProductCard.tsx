"use client";

import Image from "next/image";
import { useState, useCallback, useMemo } from "react";
import { Product } from "../../services/api";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatting";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const formattedPrice = useMemo(() => formatPrice(product.price), [product.price]);
  const addToCartLabel = useMemo(() => `Add ${product.title} to cart`, [product.title]);

  const handleAddToCart = useCallback(async () => {
    if (isAdding) return;

    setIsAdding(true);
    addToCart(product);

    setTimeout(() => {
      setIsAdding(false);
    }, 200);
  }, [addToCart, product, isAdding]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setIsImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsImageLoading(false);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.title}
            className={`${styles.image} ${isImageLoading ? styles.loading : ""}`}
            width={200}
            height={200}
            priority
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className={styles.imageError}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.errorIcon}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <span>Image not available</span>
          </div>
        )}
        {isImageLoading && !imageError && (
          <div className={styles.imageLoading}>
            <div className={styles.loadingSpinner} />
          </div>
        )}
      </div>
      <div className={styles.divider} />

      <div className={styles.content}>
        <h3 className={styles.title} title={product.title}>
          {product.title}
        </h3>
        <p className={styles.price}>{formattedPrice}</p>

        <button
          onClick={handleAddToCart}
          className={`${styles.addButton} ${isAdding ? styles.adding : ""}`}
          disabled={isAdding}
          aria-label={addToCartLabel}
        >
          {isAdding ? (
            <span className={styles.loadingButton}>
              <span className={styles.loadingDot}></span>
              <span className={styles.loadingDot}></span>
              <span className={styles.loadingDot}></span>
            </span>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}
