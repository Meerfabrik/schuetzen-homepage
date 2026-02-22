import Link from "next/link";
import Image from "next/image";
import type { SanityNews } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/client";
import styles from "./NewsCard.module.css";

interface NewsCardProps {
  article: SanityNews;
}

export default function NewsCard({ article }: NewsCardProps) {
  const imageUrl = article.image
    ? urlFor(article.image).width(600).height(400).url()
    : null;

  const formattedDate = new Date(article.date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/news/${article.slug.current}`} className={styles.card}>
      <div className={styles.imgWrap}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.image?.alt ?? article.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 380px"
          />
        ) : (
          <div className={styles.placeholder}>🎯</div>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.date}>{formattedDate}</span>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <span className={styles.readMore}>Weiterlesen →</span>
      </div>
    </Link>
  );
}
