"use client";

import { useQuery } from "@tanstack/react-query";
import { API, Product } from "../services/api";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(API.allProducts);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });
}
