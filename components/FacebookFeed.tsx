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

const APP_ID = "1190569869816278";

export default function FacebookFeed({
  pageUrl = "https://www.facebook.com/667738963347662",
  height = 600,
}: FacebookFeedProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const errorTimeout = setTimeout(() => setStatus("error"), 10000);

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
      }, 500);
    }

    if (window.FB) {
      parseFeed();
      return () => clearTimeout(errorTimeout);
    }

    window.fbAsyncInit = parseFeed;

    if (!document.getElementById("facebook-sdk")) {
      const script = document.createElement("script");
      script.id = "facebook-sdk";
      script.src = `https://connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v18.0&appId=${APP_ID}`;
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
  }, []);

  if (status === "error") {
    return (
      <div className={styles.fallback}>
        <div className={styles.fbLogo}>f</div>
        <h3 className={styles.fallbackTitle}>Wir sind auf Facebook</h3>
        <p className={styles.fallbackText}>
          Folgt uns für aktuelle Neuigkeiten, Fotos und Ankündigungen direkt aus der Bruderschaft.
        </p>
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.fallbackBtn}
        >
          Zur Facebook-Seite →
        </a>
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
