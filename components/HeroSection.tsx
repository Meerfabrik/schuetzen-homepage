"use client";

import Image from "next/image";
import Link from "next/link";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Users, ChevronDown } from "lucide-react";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  imageSrc: string;
  imageSrcs?: string[];
  title: string;
  subtitle: string;
  /** Optionaler Text in der Glas-Box (aktuell nicht angezeigt) */
  infoText?: string;
  countdownSlot?: React.ReactNode;
}

export function HeroSection({
  imageSrc,
  imageSrcs,
  title,
  subtitle,
  countdownSlot,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  const allImages = imageSrcs && imageSrcs.length > 0 ? imageSrcs : [imageSrc];
  const hasMultipleImages = allImages.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, allImages.length]);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <motion.div className={styles.heroBg} style={{ y: bgY }} aria-hidden>
        {allImages.map((src, index) => (
          <Image
            key={`${src}-${index}`}
            src={src}
            alt=""
            fill
            className={`${styles.heroBgImage} ${
              index === currentIndex ? styles.heroBgImageActive : ""
            }`}
            priority={index === 0}
            sizes="100vw"
          />
        ))}
      </motion.div>
      <div className={styles.heroOverlay} aria-hidden />
      <motion.div
        className={styles.heroContent}
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <h1 className={styles.heroTitle}>
          {title}
          <em className={styles.heroSub}>{subtitle}</em>
        </h1>
        <div className={styles.heroInfoBox}>
          {countdownSlot && <div className={styles.heroCountdownWrap}>{countdownSlot}</div>}
          <div className={styles.heroInfoActions}>
            <Link href="/kontakt" className={styles.heroCtaPrimary}>
              Kontakt aufnehmen
              <ArrowRight size={18} />
            </Link>
            <Link href="/ueber-uns" className={styles.heroCtaSecondary}>
              <Users size={18} />
              Über uns
            </Link>
          </div>
        </div>
      </motion.div>
      <a
        href="#news"
        className={styles.scrollHint}
        aria-label="Nach unten scrollen"
      >
        <ChevronDown size={28} strokeWidth={2.5} />
      </a>
    </section>
  );
}
