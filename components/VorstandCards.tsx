"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { MotionFadeIn, StaggerGrid } from "@/components/AnimatedNewsSection";
import styles from "./VorstandCards.module.css";

export type VorstandImage = {
  public_id: string;
  thumbUrl: string;
  fullUrl: string;
  title?: string;
};

type Props = {
  heading: string;
  images: VorstandImage[];
  /** Grüner Akzentstrich vor der Überschrift (z. B. für "Vorstand") */
  showAccentLine?: boolean;
};

export default function VorstandCards({
  heading,
  images,
  showAccentLine = false,
}: Props) {
  if (images.length === 0) return null;

  return (
    <div className={styles.section}>
      <MotionFadeIn>
        <h3
          className={`${styles.heading} ${showAccentLine ? styles.headingAccent : ""}`}
        >
          {heading}
        </h3>
      </MotionFadeIn>
      <StaggerGrid className={styles.grid}>
        {images.map((img) => {
          const name = img.title ?? "Vorstandsmitglied";

          return (
            <motion.article
              key={img.public_id}
              className={styles.card}
              whileHover={{ y: -4, boxShadow: "0 12px 48px rgba(0,0,0,0.18)" }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={img.thumbUrl}
                  alt={name}
                  width={400}
                  height={400}
                  className={styles.image}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </div>
              <div className={styles.body}>
                <h4 className={styles.name}>{name}</h4>
              </div>
            </motion.article>
          );
        })}
      </StaggerGrid>
    </div>
  );
}
