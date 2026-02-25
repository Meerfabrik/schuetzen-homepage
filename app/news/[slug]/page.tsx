import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getAllNews, getNewsBySlug } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import styles from "./page.module.css";

export const revalidate = 60;

// Statische Pfade für alle News-Slugs vorgenerieren
export async function generateStaticParams() {
  const news = await getAllNews();
  return news.map((article) => ({ slug: article.slug.current }));
}

interface Props {
  params: { slug: string };
}

export default async function NewsDetailPage({ params }: Props) {
  const article = await getNewsBySlug(params.slug);
  if (!article) notFound();

  const imageUrl = article.image
    ? urlFor(article.image).width(1200).height(600).url()
    : null;

  const formattedDate = new Date(article.date).toLocaleDateString("de-DE", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      {imageUrl && (
        <div className={styles.heroImg}>
          <Image src={imageUrl} alt={article.image?.alt ?? article.title}
            fill style={{ objectFit: "cover" }} priority />
          <div className={styles.heroOverlay} />
        </div>
      )}

      <div className={`page-hero ${styles.heroCompact}`} style={{ paddingTop: imageUrl ? "1.5rem" : undefined }}>
        <h1>{article.title}</h1>
        <time className={styles.heroDate} dateTime={article.date}>{formattedDate}</time>
      </div>

      <article className="section">
        <div className={styles.content}>
          <PortableText value={article.content} />
        </div>
      </article>
    </>
  );
}
