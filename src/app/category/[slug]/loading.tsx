import Header from "@/app/components/Header/Header";
import styles from "./page.module.css";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";

export default function Loading() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Loading Category...</h1>
        </div>

        <LoadingSpinner />
      </main>
    </>
  );
}
