import Link from "next/link";
import Image from "next/image";
import NewsCard from "@/components/NewsCard";
import InstagramFeed from "@/components/InstagramFeed";
import SchuetzenfestCountdown from "@/components/SchuetzenfestCountdown";
import { getLatestNews } from "@/lib/sanity/queries";
import { NEXT_SCHUETZENFEST_DATE } from "@/lib/site";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "St. Sebastianus Schützenbruderschaft Büderich von 1567 e.V.",
  description: "Herzlich willkommen bei der St. Sebastianus Schützenbruderschaft Meerbusch-Büderich 1567 e.V.",
};

export default async function HomePage() {
  const news = await getLatestNews(3);

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden>
          <Image
            src="/images/hero_image_opt.jpg"
            alt=""
            fill
            className={styles.heroBgImage}
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroContent}>
        {/* <div className={styles.heroBadge}>Seit 1567 · Meerbusch-Büderich</div> */}
        <h1 className={styles.heroTitle}>
          Herzlich Willkommen
          <em className={styles.heroSub}>bei den Büdericher Schützen</em>
        </h1>
        <p className={styles.heroText}>
          Auf den Seiten der St. Sebastianus-Schützenbruderschaft
          Meerbusch-Büderich 1567 e.V. – Tradition, Gemeinschaft und Heimatliebe
          seit über 450 Jahren.
        </p>
        <div className={styles.heroDivider} />
        <div className={styles.heroCtas}>
          <Link href="/ueber-uns" className="btn btn-outline"
            style={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}>
            Über uns
          </Link>
          <Link href="/kontakt" className="btn"
            style={{ background: "var(--gold)", color: "var(--green)" }}>
            Kontakt aufnehmen
          </Link>
        </div>
        </div>
      </section>

  

      {/* ── NEWS + INSTAGRAM ── */}
      <section className={`section ${styles.newsSection}`}>
        <div className="container">
          <div className={styles.newsFacebookGrid}>

            {/* News */}
            <div>
              <h2 className="section-title">Aktuelles</h2>
              <p className="section-subtitle">Neuigkeiten aus unserer Bruderschaft</p>
              {news.length > 0 ? (
                <div className={styles.newsGrid}>
                  {news.map((article) => (
                    <NewsCard key={article._id} article={article} />
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--text-muted)" }}>
                  Noch keine Beiträge vorhanden. Inhalte können im{" "}
                  <Link href="/studio" style={{ color: "var(--green-light)", fontWeight: 600 }}>
                    CMS unter /studio
                  </Link>{" "}
                  angelegt werden.
                </p>
              )}
            </div>

            {/* Rechts: Countdown + Instagram */}
            <div className={styles.rightColumn}>
              <SchuetzenfestCountdown
                targetDate={NEXT_SCHUETZENFEST_DATE}
                title="Nächstes Schützenfest"
              />
              <div>
                <h2 className="section-title">Wir auf Instagram</h2>
                <p className="section-subtitle">Aktuelle Fotos aus der Bruderschaft</p>
                <InstagramFeed limit={12} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaBand}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Werde Teil unserer Bruderschaft</h2>
          <p>Du möchtest mitmachen? Wir freuen uns über jeden, der unsere Gemeinschaft bereichern möchte.</p>
          <Link href="/kontakt" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
            Jetzt Kontakt aufnehmen
          </Link>
        </div>
      </section>

    </>
  );
}
