"use client";

import { useQuery } from "@tanstack/react-query";
import { API } from "../services/api";

export function useCategories() {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(API.categoryList);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
  });
}
