import { Metadata } from "next";
import { API } from "../../services/api";
import { formatCategoryName } from "../../utils/formatting";

interface CategoryLayoutProps {
  params: Promise<{
    slug: string;
  }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: CategoryLayoutProps): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryName = formatCategoryName(resolvedParams.slug);

  return {
    title: `${categoryName} | Fake Store`,
    description: `Browse our selection of ${categoryName} products.`,
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetch(API.categoryList);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories = await response.json();

    return categories.map((category: string) => ({
      slug: category,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function CategoryLayout({ children }: CategoryLayoutProps) {
  return children;
}
