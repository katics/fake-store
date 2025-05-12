export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const formatCategoryName = (slug: string): string => {
  return decodeURIComponent(slug)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
