import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottom}>
        <span>
          © {new Date().getFullYear()} St. Sebastianus Schützenbruderschaft Büderich von 1567 e.V.
        </span>
        <span>
          <Link href="/impressum">Impressum</Link>
          {" · "}
          <Link href="/datenschutz">Datenschutz</Link>
        </span>
      </div>
    </footer>
  );
}
