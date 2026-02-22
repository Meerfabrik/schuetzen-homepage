"use client";

import { useEffect, useState } from "react";
import styles from "./FacebookFeed.module.css";

declare global {
  interface Window {
    FB?: { XFBML: { parse: (el?: Element) => void } };
    fbAsyncInit?: () => void;
  }
}

interface FacebookFeedProps {
  pageUrl?: string;
  height?: number;
}

export default function FacebookFeed({
  pageUrl = "https://www.facebook.com/667738963347662",
  height = 500,
}: FacebookFeedProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  useEffect(() => {
    // Auf localhost direkt Fallback zeigen
    if (isLocalhost) {
      setStatus("error");
      return;
    }

    const errorTimeout = setTimeout(() => setStatus("error"), 8000);

    function parseFeed() {
      const el = document.getElementById("fb-feed-container");
      if (!window.FB || !el) return;
      setTimeout(() => {
        try {
          window.FB!.XFBML.parse(el);
          setStatus("ready");
          clearTimeout(errorTimeout);
        } catch {
          setStatus("error");
          clearTimeout(errorTimeout);
        }
      }, 300);
    }

    if (window.FB) {
      parseFeed();
      return () => clearTimeout(errorTimeout);
    }

    window.fbAsyncInit = parseFeed;

    if (!document.getElementById("facebook-sdk")) {
      const script = document.createElement("script");
      script.id = "facebook-sdk";
      script.src = "https://connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v18.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.onerror = () => {
        setStatus("error");
        clearTimeout(errorTimeout);
      };
      document.body.appendChild(script);
    }

    return () => clearTimeout(errorTimeout);
  }, [isLocalhost]);

  // Fallback – wird auf localhost immer gezeigt, live nur bei Fehler
  if (status === "error") {
    return (
      <div className={styles.fallback}>
        <div className={styles.fbLogo}>f</div>
        <h3 className={styles.fallbackTitle}>Wir sind auf Facebook</h3>
        <p className={styles.fallbackText}>
          Folgt uns auf Facebook für aktuelle Neuigkeiten, Fotos vom
          Schützenfest und Ankündigungen direkt aus der Bruderschaft.
        </p>
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.fallbackBtn}
        >
          Zur Facebook-Seite →
        </a>
        {isLocalhost && (
          <p className={styles.devNote}>
            💡 Der Live-Feed wird nach dem Deployment auf schuetzen-buederich.de sichtbar sein.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={styles.wrapper} id="fb-feed-container">
      <div id="fb-root" />
      {status === "loading" && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span>Facebook wird geladen…</span>
        </div>
      )}
      <div
        className="fb-page"
        data-href={pageUrl}
        data-tabs="timeline"
        data-width="500"
        data-height={String(height)}
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="false"
      />
    </div>
  );
}
