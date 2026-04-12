"use client";

import Link from "next/link";
import { useState } from "react";
import { useConsent } from "@/lib/consent";
import styles from "./CookieBanner.module.css";

export function CookieBanner() {
  const { bannerOpen, consent, acceptAll, rejectAll, saveCustom } = useConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [draftMaps, setDraftMaps] = useState(consent.maps);
  const [draftInsta, setDraftInsta] = useState(consent.instagram);

  if (!bannerOpen) return null;

  const openSettings = () => {
    setDraftMaps(consent.maps);
    setDraftInsta(consent.instagram);
    setShowSettings(true);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="consent-title">
      <div className={styles.box}>
        <h2 id="consent-title" className={styles.title}>
          Datenschutz-Einstellungen
        </h2>

        {!showSettings ? (
          <>
            <p className={styles.text}>
              Wir verwenden auf unserer Website nur technisch notwendige Cookies. Zusätzlich binden wir
              externe Inhalte ein (z.&nbsp;B. Google Maps und Instagram), die Daten an die jeweiligen
              Anbieter übertragen. Dafür benötigen wir Ihre Einwilligung. Sie können diese jederzeit
              widerrufen. Details finden Sie in unserer{" "}
              <Link href="/datenschutz" className={styles.link}>
                Datenschutzerklärung
              </Link>
              .
            </p>
            <div className={styles.buttonRow}>
              <button type="button" onClick={rejectAll} className={styles.btnSecondary}>
                Nur notwendige
              </button>
              <button type="button" onClick={openSettings} className={styles.btnSecondary}>
                Einstellungen
              </button>
              <button type="button" onClick={acceptAll} className={styles.btnPrimary}>
                Alle akzeptieren
              </button>
            </div>
          </>
        ) : (
          <>
            <p className={styles.text}>
              Wählen Sie aus, welche externen Inhalte geladen werden dürfen.
            </p>

            <ul className={styles.options}>
              <li className={styles.option}>
                <label className={styles.optionHeader}>
                  <input type="checkbox" checked disabled />
                  <span className={styles.optionTitle}>Notwendig</span>
                </label>
                <p className={styles.optionDesc}>
                  Diese Cookies sind für den Betrieb der Website erforderlich und können nicht
                  deaktiviert werden.
                </p>
              </li>

              <li className={styles.option}>
                <label className={styles.optionHeader}>
                  <input
                    type="checkbox"
                    checked={draftMaps}
                    onChange={(e) => setDraftMaps(e.target.checked)}
                  />
                  <span className={styles.optionTitle}>Google Maps</span>
                </label>
                <p className={styles.optionDesc}>
                  Lädt eine interaktive Karte von Google. Dabei werden Daten (u.&nbsp;a. IP-Adresse) an
                  Google in den USA übertragen.
                </p>
              </li>

              <li className={styles.option}>
                <label className={styles.optionHeader}>
                  <input
                    type="checkbox"
                    checked={draftInsta}
                    onChange={(e) => setDraftInsta(e.target.checked)}
                  />
                  <span className={styles.optionTitle}>Instagram</span>
                </label>
                <p className={styles.optionDesc}>
                  Lädt Bilder und Inhalte von Instagram (Meta). Dabei werden Daten an Meta Platforms
                  Inc. übertragen.
                </p>
              </li>
            </ul>

            <div className={styles.buttonRow}>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className={styles.btnSecondary}
              >
                Zurück
              </button>
              <button
                type="button"
                onClick={() => saveCustom({ maps: draftMaps, instagram: draftInsta })}
                className={styles.btnPrimary}
              >
                Auswahl speichern
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
