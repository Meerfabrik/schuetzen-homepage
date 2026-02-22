import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <h3>St. Sebastianus Schützenbruderschaft Büderich von 1567 e.V.</h3>
          <p>
            Tradition, Gemeinschaft und Heimatliebe seit über 450 Jahren in
            Meerbusch-Büderich. Wir pflegen das Brauchtum und feiern gemeinsam
            das Schützenfest.
          </p>
          <div className={styles.social}>
            <a
              href="https://facebook.com/667738963347662"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h4>Navigation</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/aktueller-hofstaat">Aktueller Hofstaat</Link></li>
            <li><Link href="/ueber-uns">Über uns</Link></li>
            <li><Link href="/schiesssport">Schießsport</Link></li>
            <li><Link href="/galerie">Galerie</Link></li>
            <li><Link href="/download">Download</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Kontakt & Rechtliches</h4>
          <ul>
            <li><Link href="/kontakt">Kontaktformular</Link></li>
            <li><Link href="/download">Dokumente & Formulare</Link></li>
            <li><Link href="/impressum">Impressum</Link></li>
            <li><Link href="/datenschutz">Datenschutz</Link></li>
          </ul>
        </div>
      </div>

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
