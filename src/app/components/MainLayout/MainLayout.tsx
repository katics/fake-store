import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function MainLayout({
  title,
  subtitle,
  children,
}: MainLayoutProps) {
  return (
    <main className={styles.main}>
      {(title || subtitle) && (
        <header className={styles.header}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
      )}
      {children}
    </main>
  );
}
