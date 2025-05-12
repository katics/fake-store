"use client";

import { useQuery } from "@tanstack/react-query";
import { API, Product } from "../services/api";

export function useProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      const response = await fetch(API.productsByCategory(category));
      if (!response.ok) {
        throw new Error(`Failed to fetch products for category: ${category}`);
      }
      return response.json();
    },
    enabled: !!category,
  });
}
