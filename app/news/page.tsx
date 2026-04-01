import NewsCard from "@/components/NewsCard";
import { MotionFadeIn, StaggerGrid } from "@/components/AnimatedNewsSection";
import { getAllNews } from "@/lib/directus/queries";
import styles from "./page.module.css";

// Immer frisch vom CMS laden, kein statischer Cache
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Alle Beiträge | St. Sebastianus Schützenbruderschaft Büderich",
  description:
    "Alle Neuigkeiten und Beiträge der St. Sebastianus Schützenbruderschaft Büderich von 1567 e.V.",
};

export default async function NewsPage() {
  let news: Awaited<ReturnType<typeof getAllNews>> = [];
  let fetchError: string | null = null;
  try {
    news = await getAllNews();
  } catch (err) {
    console.error("Directus getAllNews failed:", err);
    fetchError = err instanceof Error ? err.message : "Beiträge konnten nicht geladen werden.";
  }

  return (
    <section id="news" className={`section ${styles.newsSection}`}>
      <div className="container">
        <MotionFadeIn>
          <h1 className="section-title">Alle Beiträge</h1>
          <p className="section-subtitle">
            Neuigkeiten und Berichte aus unserer Bruderschaft
          </p>
        </MotionFadeIn>

        {fetchError ? (
          <MotionFadeIn>
            <p style={{ color: "var(--red, #c00)" }}>
              {fetchError} Bitte prüfen Sie die Directus-Konfiguration (.env.local: DIRECTUS_TOKEN).
            </p>
          </MotionFadeIn>
        ) : news.length > 0 ? (
          <StaggerGrid className={styles.newsGrid}>
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </StaggerGrid>
        ) : (
          <MotionFadeIn>
            <p style={{ color: "var(--text-muted)" }}>
              Noch keine Beiträge vorhanden.
            </p>
          </MotionFadeIn>
        )}
      </div>
    </section>
  );
}
