"use client";

import { useQuery } from "@tanstack/react-query";
import { API, Product } from "../services/api";

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(API.product(id));
      if (!response.ok) {
        throw new Error(`Failed to fetch product with id: ${id}`);
      }
      return response.json();
    },
    enabled: !!id,
  });
}
