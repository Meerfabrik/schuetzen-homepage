import { notFound } from "next/navigation";
import { getAllNews, getNewsBySlug } from "@/lib/directus/queries";
import styles from "./page.module.css";

export const revalidate = 60;

// Statische Pfade für alle News-Slugs vorgenerieren
export async function generateStaticParams() {
  const news = await getAllNews();
  return news.map((article) => ({ slug: article.slug }));
}

interface Props {
  params: { slug: string };
}

export default async function NewsDetailPage({ params }: Props) {
  const article = await getNewsBySlug(params.slug);
  if (!article) notFound();

  const formattedDate = new Date(article.date).toLocaleDateString("de-DE", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.badge}>Aktuelles</span>
          <span className={styles.metaDivider} aria-hidden>·</span>
          <time className={styles.date} dateTime={article.date}>{formattedDate}</time>
        </div>
        <h1 className={styles.title}>{article.title}</h1>
      </header>

      <div className={styles.body}>
        {article.imageUrl && (
          <figure className={styles.floatImage}>
            {/* Plain <img> bewusst gewählt: das Bild bestimmt sein eigenes Seitenverhältnis,
                die Figure schrumpft exakt auf seine gerenderte Größe — kein Padding/Rand möglich. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl}
              alt={article.title}
              className={styles.heroImg}
              loading="eager"
            />
          </figure>
        )}
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
  );
}
