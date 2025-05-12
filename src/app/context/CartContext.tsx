"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { Product } from "../services/api";
import { formatPrice } from "../utils/formatting";

const MAX_CART_ITEMS = parseInt(process.env.NEXT_PUBLIC_MAX_CART_ITEMS || "100", 10);
const MAX_ITEM_QUANTITY = parseInt(process.env.NEXT_PUBLIC_MAX_ITEM_QUANTITY || "10", 10);
const CART_STORAGE_KEY = "fake-store-cart";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalPrice: () => number;
  getFormattedTotalPrice: () => string;
  getItemCount: () => number;
  isInitialized: boolean;
  error: string | null;
  clearError: () => void;
}

// Validation function
const validateCartItem = (item: CartItem): boolean => {
  if (!item.product?.id || typeof item.product.price !== "number") {
    return false;
  }

  if (typeof item.quantity !== "number" || item.quantity <= 0) {
    return false;
  }

  return item.quantity <= MAX_ITEM_QUANTITY;
};

// Local storage helpers
const getStoredCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCart) return [];

    const parsedCart = JSON.parse(storedCart);

    // Filter out invalid items instead of throwing
    const validCart = Array.isArray(parsedCart) ? parsedCart.filter(validateCartItem) : [];

    // If we had to filter items, save the cleaned version
    if (validCart.length !== parsedCart.length) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(validCart));
    }

    return validCart;
  } catch (error) {
    console.error("Failed to parse cart from localStorage:", error);
    return [];
  }
};

const storeCart = (cart: CartItem[]): boolean => {
  if (typeof window === "undefined") return true;

  try {
    // Validate and clean the cart before storing
    const validCart = Array.isArray(cart) ? cart.filter(validateCartItem) : [];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(validCart));
    return true;
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
    return false;
  }
};

// Default context value
const defaultContextValue: CartContextType = {
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  getTotalPrice: () => 0,
  getFormattedTotalPrice: () => "$0.00",
  getItemCount: () => 0,
  isInitialized: false,
  error: null,
  clearError: () => {},
};

// Create context
const CartContext = createContext<CartContextType>(defaultContextValue);

// Provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = getStoredCart();
        setItems(savedCart);
        setError(null);
      } catch (err) {
        console.error("Error loading cart:", err);
        setError("Failed to load cart");
      } finally {
        setIsInitialized(true);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const success = storeCart(items);
    if (!success) {
      setError("Failed to save cart");
    } else {
      setError(null);
    }
  }, [items, isInitialized]);

  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  const clearError = useCallback(() => setError(null), []);

  const getTotalPrice = useCallback(() => totalPrice, [totalPrice]);

  const getFormattedTotalPrice = useCallback(() => formatPrice(totalPrice), [totalPrice]);

  const getItemCount = useCallback(() => itemCount, [itemCount]);

  const addToCart = useCallback((product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;

        if (newQuantity > MAX_ITEM_QUANTITY) {
          setError(`Maximum quantity per item is ${MAX_ITEM_QUANTITY}`);
          return prevItems;
        }

        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }

      if (prevItems.length >= MAX_CART_ITEMS) {
        setError(`Your cart cannot contain more than ${MAX_CART_ITEMS} different items`);
        return prevItems;
      }

      return [...prevItems, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.product.id !== productId);
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      const safeQuantity = Math.min(quantity, MAX_ITEM_QUANTITY);

      if (safeQuantity < quantity) {
        setError(`Maximum quantity per item is ${MAX_ITEM_QUANTITY}`);
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: safeQuantity } : item
        )
      );
    },
    [removeFromCart]
  );

  const contextValue = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalPrice,
      getFormattedTotalPrice,
      getItemCount,
      isInitialized,
      error,
      clearError,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalPrice,
      getFormattedTotalPrice,
      getItemCount,
      isInitialized,
      error,
      clearError,
    ]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
