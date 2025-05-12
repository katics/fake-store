"use client";

import { useParams } from "next/navigation";
import { useProductsByCategory } from "../../hooks/useProductsByCategory";
import { formatCategoryName } from "../../utils/formatting";
import { Product } from "../../services/api";

import styles from "./page.module.css";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import { ErrorDisplay } from "@/app/components/ErrorDisplay/ErrorDisplay";
import MainLayout from "@/app/components/MainLayout/MainLayout";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const decodedSlug = decodeURIComponent(slug);
  const categoryName = formatCategoryName(slug);

  const { data: products, isLoading, isError } = useProductsByCategory(decodedSlug);

  if (isLoading) {
    return (
      <MainLayout title={categoryName} subtitle="Loading products...">
        <LoadingSpinner />
      </MainLayout>
    );
  }

  if (isError || !products) {
    return (
      <MainLayout title={categoryName}>
        <ErrorDisplay
          title="Failed to load products"
          message={`We couldn't load the products for ${categoryName} at this time. Please try again later.`}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout title={categoryName} subtitle={`${products.length} Products`}>
      {products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((product: Product) => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <ErrorDisplay
          title="No products found"
          message={`We couldn't find any products in the ${categoryName} category.`}
        />
      )}
    </MainLayout>
  );
}
