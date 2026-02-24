"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import styles from "./GalerieGrid.module.css";

export type GalerieImage = {
  public_id: string;
  thumbUrl: string;
  fullUrl: string;
  /** Optionaler Titel aus Cloudinary-Metadaten (wird unter dem Bild angezeigt) */
  title?: string;
};

type Props = {
  images: GalerieImage[];
};

export default function GalerieGrid({ images }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setLightboxIndex(index), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i !== null ? Math.max(0, i - 1) : null));
      if (e.key === "ArrowRight")
        setLightboxIndex((i) =>
          i !== null ? Math.min(images.length - 1, i + 1) : null
        );
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, images.length, close]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  if (images.length === 0) return null;

  const current = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <>
      <ul className={styles.grid}>
        {images.map((img, index) => (
          <li key={img.public_id} className={styles.item}>
            <div className={styles.thumbWrap}>
              <button
                type="button"
                onClick={() => open(index)}
                className={styles.thumbButton}
                title="Bild vergrößern"
              >
                <Image
                  src={img.thumbUrl}
                  alt={img.title ?? ""}
                  width={560}
                  height={420}
                  className={styles.image}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 280px"
                />
              </button>
            </div>
            {img.title ? (
              <p className={styles.caption}>{img.title}</p>
            ) : null}
          </li>
        ))}
      </ul>

      {current && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Bild vergrößert"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <button
            type="button"
            onClick={close}
            className={styles.closeBtn}
            aria-label="Lightbox schließen"
          >
            ×
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={current.fullUrl}
              alt={current.title ?? ""}
              className={styles.lightboxImage}
              draggable={false}
            />
            {current.title ? (
              <p className={styles.lightboxCaption}>{current.title}</p>
            ) : null}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((i) =>
                      i !== null ? Math.max(0, i - 1) : null
                    )
                  }
                  className={`${styles.navBtn} ${styles.navPrev}`}
                  aria-label="Vorheriges Bild"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((i) =>
                      i !== null ? Math.min(images.length - 1, i + 1) : null
                    )
                  }
                  className={`${styles.navBtn} ${styles.navNext}`}
                  aria-label="Nächstes Bild"
                >
                  ›
                </button>
                <span className={styles.counter}>
                  {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {images.length}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
