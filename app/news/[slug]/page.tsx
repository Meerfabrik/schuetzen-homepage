import { notFound } from "next/navigation";
import Image from "next/image";
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

  const heroImageUrl = article.imageUrl
    ? article.imageUrl.replace("width=800", "width=1200").replace("height=450", "height=600")
    : null;

  const formattedDate = new Date(article.date).toLocaleDateString("de-DE", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      {heroImageUrl ? (
        <div className={styles.heroImg}>
          <Image src={heroImageUrl} alt={article.title}
            fill style={{ objectFit: "cover" }} priority />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1>{article.title}</h1>
            <time className={styles.heroDate} dateTime={article.date}>{formattedDate}</time>
          </div>
        </div>
      ) : (
        <div className={`page-hero ${styles.heroCompact}`}>
          <h1>{article.title}</h1>
          <time className={styles.heroDate} dateTime={article.date}>{formattedDate}</time>
        </div>
      )}

      <article className="section">
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </>
  );
}
