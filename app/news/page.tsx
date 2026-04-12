import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { MotionFadeIn, StaggerGrid } from "@/components/AnimatedNewsSection";
import { getAllNews } from "@/lib/directus/queries";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Alle Beiträge | St. Sebastianus Schützenbruderschaft Büderich",
  description:
    "Alle Neuigkeiten und Beiträge der St. Sebastianus Schützenbruderschaft Büderich von 1567 e.V.",
};

const PAGE_SIZE = 10;

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(pages).filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    out.push(sorted[i]);
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) out.push("…");
  }
  return out;
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  let news: Awaited<ReturnType<typeof getAllNews>> = [];
  let fetchError: string | null = null;
  try {
    news = await getAllNews();
  } catch (err) {
    console.error("Directus getAllNews failed:", err);
    fetchError = err instanceof Error ? err.message : "Beiträge konnten nicht geladen werden.";
  }

  const totalPages = Math.max(1, Math.ceil(news.length / PAGE_SIZE));
  const requested = Number(searchParams?.page ?? "1");
  const currentPage = Number.isFinite(requested) ? Math.min(Math.max(1, Math.trunc(requested)), totalPages) : 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = news.slice(start, start + PAGE_SIZE);
  const pageList = buildPageList(currentPage, totalPages);

  const hrefForPage = (p: number) => (p === 1 ? "/news" : `/news?page=${p}`);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Neuigkeiten</div>
        <h1>Alle Beiträge</h1>
        <p>Neuigkeiten und Berichte aus unserer Bruderschaft.</p>
      </div>

      <section id="news" className={`section ${styles.newsSection}`}>
        <div className="container">
        {fetchError ? (
          <MotionFadeIn>
            <p style={{ color: "var(--red, #c00)" }}>
              {fetchError} Bitte prüfen Sie die Directus-Konfiguration (.env.local: DIRECTUS_TOKEN).
            </p>
          </MotionFadeIn>
        ) : pageItems.length > 0 ? (
          <>
            <StaggerGrid className={styles.newsGrid}>
              {pageItems.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </StaggerGrid>

            {totalPages > 1 && (
              <nav className={styles.pagination} aria-label="Seitennavigation">
                {currentPage > 1 ? (
                  <Link href={hrefForPage(currentPage - 1)} className={styles.pageLink} aria-label="Vorherige Seite">
                    ←
                  </Link>
                ) : (
                  <span className={styles.pageDisabled} aria-hidden="true">←</span>
                )}

                {pageList.map((p, idx) =>
                  p === "…" ? (
                    <span key={`e${idx}`} className={styles.pageEllipsis}>…</span>
                  ) : p === currentPage ? (
                    <span key={p} className={styles.pageCurrent} aria-current="page">{p}</span>
                  ) : (
                    <Link key={p} href={hrefForPage(p)} className={styles.pageLink}>{p}</Link>
                  )
                )}

                {currentPage < totalPages ? (
                  <Link href={hrefForPage(currentPage + 1)} className={styles.pageLink} aria-label="Nächste Seite">
                    →
                  </Link>
                ) : (
                  <span className={styles.pageDisabled} aria-hidden="true">→</span>
                )}
              </nav>
            )}
          </>
        ) : (
          <MotionFadeIn>
            <p style={{ color: "var(--text-muted)" }}>
              Noch keine Beiträge vorhanden.
            </p>
          </MotionFadeIn>
        )}
        </div>
      </section>
    </>
  );
}
