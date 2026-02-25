import Link from "next/link";
import Image from "next/image";
import type { SanityNews } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/client";
import styles from "./NewsCard.module.css";

const CalendarIcon = () => (
  <svg
    className={styles.calendarIcon}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

interface NewsCardProps {
  article: SanityNews;
  /** Kategorie-Badge (z. B. "Aktuelles", "Digital", "Termine"). Standard: "Aktuelles". */
  category?: string;
}

export default function NewsCard({ article, category = "Aktuelles" }: NewsCardProps) {
  const imageUrl = article.image
    ? urlFor(article.image).width(800).height(450).url()
    : null;

  const formattedDate = new Date(article.date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/news/${article.slug.current}`} className={styles.card}>
      <span className={styles.badge}>{category}</span>
      <div className={styles.imgWrap}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.image?.alt ?? article.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 800px"
          />
        ) : (
          <div className={styles.placeholder}>🎯</div>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.date}>
          <CalendarIcon />
          {formattedDate}
        </span>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <span className={styles.readMore}>Weiterlesen →</span>
      </div>
    </Link>
  );
}
