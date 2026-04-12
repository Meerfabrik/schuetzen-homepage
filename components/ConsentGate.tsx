"use client";

import type { ReactNode } from "react";
import { useConsent, type ConsentCategory } from "@/lib/consent";
import styles from "./ConsentGate.module.css";

interface ConsentGateProps {
  category: ConsentCategory;
  children: ReactNode;
  /** Bezeichnung des Anbieters für die Anzeige im Platzhalter */
  providerLabel: string;
  /** Optionaler Hinweis-Text */
  description?: string;
}

const PROVIDER_DEFAULT: Record<ConsentCategory, string> = {
  maps: "Google Maps",
  instagram: "Instagram",
};

export function ConsentGate({ category, children, providerLabel, description }: ConsentGateProps) {
  const { consent, setCategory } = useConsent();

  if (consent[category]) return <>{children}</>;

  const label = providerLabel || PROVIDER_DEFAULT[category];

  return (
    <div className={styles.placeholder} role="region" aria-label={`${label} – Einwilligung erforderlich`}>
      <div className={styles.inner}>
        <div className={styles.title}>Externer Inhalt: {label}</div>
        <p className={styles.text}>
          {description ??
            `Um diesen Inhalt anzuzeigen, müssen Sie das Laden von ${label} erlauben. Dabei werden Daten an den Anbieter übertragen.`}
        </p>
        <button
          type="button"
          className={styles.btn}
          onClick={() => setCategory(category, true)}
        >
          {label} laden
        </button>
      </div>
    </div>
  );
}
