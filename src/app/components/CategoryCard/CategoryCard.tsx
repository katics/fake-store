import Link from "next/link";
import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  name: string;
}

export default function CategoryCard({ name }: CategoryCardProps) {
  const displayName = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Link href={`/category/${name}`} className={styles.card}>
      <h2>{displayName}</h2>
    </Link>
  );
}
