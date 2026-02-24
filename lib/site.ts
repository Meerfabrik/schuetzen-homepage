/**
 * Zentrale Definition von Site-Assets (Logo, etc.)
 *
 * Logo-Datei ablegen unter:
 *   public/logo.png  (oder .svg / .webp)
 * Dann hier den Pfad anpassen (ohne "public", mit führendem /).
 */
export const SITE_LOGO = {
  src: "/images/logo.png",
  alt: "St. Sebastianus Schützenbruderschaft Büderich",
  /** Breite/Höhe für die Anzeige im Header (px) */
  width: 65,
  height: 65,
  /** Kompakte Größe beim gescrollten Header */
  widthScrolled: 42,
  heightScrolled: 42,
} as const;

/**
 * Nächstes Schützenfest – für Countdown auf der Startseite.
 * Einfach das Datum hier anpassen (ISO-Format: YYYY-MM-DD).
 */
export const NEXT_SCHUETZENFEST_DATE = "2026-05-23";
