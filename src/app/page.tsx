"use client";

import { useCategories } from "./hooks/useCategories";

import CategoryCard from "./components/CategoryCard/CategoryCard";
import { ErrorDisplay } from "./components/ErrorDisplay/ErrorDisplay";
import styles from "./page.module.css";
import MainLayout from "./components/MainLayout/MainLayout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

export default function Home() {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <MainLayout title="Fake Store" subtitle="Loading categories...">
        <LoadingSpinner />
      </MainLayout>
    );
  }

  if (isError || !categories) {
    return (
      <MainLayout title="Fake Store" subtitle="Browse our categories below">
        <ErrorDisplay
          title="Failed to load categories"
          message="We couldn't load the product categories at this time. Please try again later."
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Fake Store" subtitle="Browse our categories below">
      <div className={styles.grid}>
        {categories.map((category: string) => (
          <div key={category} className={styles.cardWrapper}>
            <CategoryCard name={category} />
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
