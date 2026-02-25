import Image from "next/image";
import { getInstagramMedia } from "@/lib/instagram";
import styles from "./InstagramFeed.module.css";

const INSTAGRAM_PROFILE_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE_URL || "https://www.instagram.com/";

interface InstagramFeedProps {
  /** Maximale Anzahl Bilder (Standard: 12) */
  limit?: number;
  /** Anzahl Bilder pro Zeile: 1, 2, 3 oder 4 (Standard: 3) */
  columnsPerRow?: 1 | 2 | 3 | 4;
  /** Instagram-Beschreibungstexte (Captions) unter den Bildern anzeigen */
  showCaptions?: boolean;
}

export default async function InstagramFeed({
  limit = 12,
  columnsPerRow = 3,
  showCaptions = false,
}: InstagramFeedProps) {
  const media = await getInstagramMedia(limit);

  if (media.length === 0) {
    return (
      <div className={styles.fallback}>
        <div className={styles.igLogo} aria-hidden>
          📷
        </div>
        <h3 className={styles.fallbackTitle}>Ein Blick in unsere SocialMedia Welt</h3>
        <p className={styles.fallbackText}>
          Folgt uns für aktuelle Fotos und Einblicke direkt aus der Bruderschaft.
        </p>
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.fallbackBtn}
        >
          Zu Instagram →
        </a>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.grid}
        data-columns={columnsPerRow}
        data-captions={showCaptions ? "true" : undefined}
      >
        {media.map((item) => (
          <div key={item.id} className={styles.tile}>
            <a
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.caption ? item.caption.slice(0, 80) : "Instagram-Beitrag öffnen"}
              className={styles.tileLink}
            >
              <Image
                src={item.media_type === "VIDEO" && item.thumbnail_url ? item.thumbnail_url : item.media_url}
                alt={item.caption?.slice(0, 100) ?? "Instagram-Beitrag"}
                fill
                sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 280px"
                unoptimized
              />
            </a>
            {showCaptions && item.caption && (
              <p className={styles.caption} title={item.caption}>
                {item.caption.length > 80 ? `${item.caption.slice(0, 80).trim()}…` : item.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
