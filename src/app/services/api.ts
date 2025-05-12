export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";

// Simple API functions that return the URLs for React Query to use
export const API = {
  categoryList: `${BASE_URL}/products/categories`,

  productsByCategory: (category: string) =>
    `${BASE_URL}/products/category/${encodeURIComponent(category)}`,

  product: (id: number) => `${BASE_URL}/products/${id}`,

  allProducts: `${BASE_URL}/products`,
};
