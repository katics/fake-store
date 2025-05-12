import Header from "./components/Header/Header";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import styles from "./page.module.css";

export default function Loading() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <LoadingSpinner />
      </main>
    </>
  );
}
