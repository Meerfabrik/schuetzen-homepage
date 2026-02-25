"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Instagram, Facebook, Heart, MessageCircle, ExternalLink } from "lucide-react";
import type { InstagramMedia } from "@/lib/instagram";
import styles from "./InstagramSection.module.css";

const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "@buedericher_schuetzen";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE_URL ?? "https://www.instagram.com/buedericher_schuetzen/";
const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL ?? "https://www.facebook.com/667738963347662";

/** Platzhalter für Likes/Kommentare (Instagram Graph API liefert diese oft nicht). */
function placeholderStats(index: number) {
  const pairs = [
    [86, 12],
    [102, 8],
    [94, 15],
    [78, 6],
    [125, 20],
    [98, 11],
  ];
  return pairs[index % pairs.length];
}

interface InstagramSectionProps {
  posts: InstagramMedia[];
}

export function InstagramSection({ posts }: InstagramSectionProps) {
  if (posts.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.fallback}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Instagram className={styles.fallbackIcon} size={28} />
            </div>
            <h2 className={styles.fallbackTitle}>Ein Blick in unsere Social-Media-Welt</h2>
            <p className={styles.fallbackText}>
              Aktuelle Fotos und Videos aus der Bruderschaft – Folgen Sie uns für mehr Einblicke.
            </p>
            <div className={styles.fallbackBtnRow}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fallbackBtn}
              >
                <Instagram size={20} />
                Folge uns auf Instagram
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fallbackBtn}
              >
                <Facebook size={20} />
                Folge uns auf Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const displayPosts = posts.slice(0, 6);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          
          <h2 className="section-title">Ein Blick in unsere Social-Media-Welt</h2>
          <p className="section-subtitle">
            Aktuelle Fotos aus der Bruderschaft – Folgen Sie uns für mehr Einblicke
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className={styles.grid}>
          {displayPosts.map((post, index) => {
            const [likes, comments] = placeholderStats(index);
            const imageUrl =
              post.media_type === "VIDEO" && post.thumbnail_url
                ? post.thumbnail_url
                : post.media_url;
            const captionShort = post.caption
              ? post.caption.slice(0, 80).trim() + (post.caption.length > 80 ? "…" : "")
              : "Beitrag ansehen";

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.03, zIndex: 10 }}
                className={styles.tile}
              >
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={captionShort}
                  className={styles.tileLink}
                >
                  <Image
                    src={imageUrl}
                    alt={captionShort}
                    fill
                    className={styles.tileImg}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized
                  />

                  {/* Overlay */}
                  <div className={styles.overlay}>
                    <div className={styles.stats}>
                      <span className={styles.stat}>
                        <Heart className={styles.statIcon} size={24} fill="white" />
                        {likes}
                      </span>
                      <span className={styles.stat}>
                        <MessageCircle className={styles.statIcon} size={24} fill="white" />
                        {comments}
                      </span>
                    </div>
                    <p className={styles.captionText}>{captionShort}</p>
                    <span className={styles.viewBtn}>
                      Ansehen
                      <ExternalLink size={16} />
                    </span>
                  </div>

                  <div className={styles.igCorner} aria-hidden>
                    <Instagram className={styles.igCornerIcon} size={16} />
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={styles.ctaWrap}
        >
          <div className={styles.ctaBtnRow}>
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              <Instagram size={20} />
              Folge uns auf Instagram
            </Link>
            <Link
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              <Facebook size={20} />
              Folge uns auf Facebook
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
