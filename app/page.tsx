import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import FacebookFeed from "@/components/FacebookFeed";
import { getLatestNews } from "@/lib/sanity/queries";
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
        <div className={styles.heroBadge}>Seit 1567 · Meerbusch-Büderich</div>
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
      </section>

      {/* ── WELCOME BAND ── */}
      <section className={styles.welcomeBand}>
        <div className="container">
          <div className={styles.welcomeGrid}>
            {[
              { icon: "🏹", title: "Tradition seit 1567", text: "Eine der ältesten Schützenbruderschaften der Region, mit über 450 Jahren Geschichte." },
              { icon: "🤝", title: "Starke Gemeinschaft", text: "Wir pflegen Freundschaft, Brauchtum und Zusammenhalt in unserer Heimat Meerbusch." },
              { icon: "🎯", title: "Schießsport", text: "Sportliches Schießen auf höchstem Niveau – offen für Einsteiger und Fortgeschrittene." },
            ].map((item) => (
              <div key={item.title} className={styles.welcomeItem}>
                <div className={styles.welcomeIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS + FACEBOOK ── */}
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

            {/* Facebook Feed */}
            <div>
              <h2 className="section-title">Wir auf Facebook</h2>
              <p className="section-subtitle">Aktuelle Posts & Fotos</p>
              <FacebookFeed height={600} />
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

      <iframe
  src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F667738963347662&tabs=timeline&width=500&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
  width="500"
  height="600"
  style={{ border: "none", overflow: "hidden" }}
  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
/>
    </>
  );
}
