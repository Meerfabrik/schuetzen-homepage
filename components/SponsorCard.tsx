import Image from "next/image";
import type { Sponsor } from "@/lib/directus/types";
import styles from "./SponsorCard.module.css";

interface SponsorCardProps {
  sponsor: Sponsor;
}

export default function SponsorCard({ sponsor }: SponsorCardProps) {
  const hasLink = sponsor.link?.trim();
  const ariaLabel = hasLink
    ? `${sponsor.title} – Website besuchen`
    : sponsor.title;

  const content = (
    <>
      <div className={styles.logoWrap}>
        {sponsor.logoUrl ? (
          <Image
            src={sponsor.logoUrl}
            alt={sponsor.title}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 320px"
          />
        ) : (
          <div className={styles.placeholder}>{sponsor.title.charAt(0)}</div>
        )}
      </div>
      <div className={styles.footer}>
        <h3 className={styles.title}>{sponsor.title}</h3>
        {hasLink && (
          <span className={styles.linkHint}>Website besuchen →</span>
        )}
      </div>
    </>
  );

  const className = `${styles.card} ${hasLink ? styles.clickable : ""}`.trim();

  if (hasLink) {
    return (
      <a
        href={sponsor.link!}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={className} aria-label={ariaLabel}>
      {content}
    </div>
  );
}
