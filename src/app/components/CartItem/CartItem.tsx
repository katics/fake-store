"use client";

import Image from "next/image";
import { useCart, CartItem as CartItemType } from "../../context/CartContext";
import styles from "./CartItem.module.css";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.title}
          width={80}
          height={80}
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>
      </div>
      <div className={styles.actions}>
        <div className={styles.quantity}>
          <button
            className={styles.quantityButton}
            onClick={() => updateQuantity(product.id, quantity - 1)}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => updateQuantity(product.id, quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          className={styles.removeButton}
          onClick={() => removeFromCart(product.id)}
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>
      <div className={styles.total}>
        <span className={styles.totalPrice}>${(product.price * quantity).toFixed(2)}</span>
        <span className={styles.unitPrice}>${product.price.toFixed(2)} each</span>
      </div>
    </div>
  );
}
