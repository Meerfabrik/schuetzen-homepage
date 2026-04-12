"use client";

import { useEffect, useState } from "react";
import styles from "./SchuetzenfestCountdown.module.css";

interface SchuetzenfestCountdownProps {
  /** Zieldatum im ISO-Format (YYYY-MM-DD), 00:00:00 Lokalzeit */
  targetDate: string;
  /** Optional: Titel über dem Countdown */
  title?: string;
  /** "glass" = transparenter Hintergrund für Einsatz in Hero/Glas-Box */
  variant?: "default" | "glass";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, isPast: false };
}

function formatNum(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function SchuetzenfestCountdown({
  targetDate,
  title = "Nächstes Schützenfest",
  variant = "default",
}: SchuetzenfestCountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const parsedTarget = targetDate.includes("T") ? targetDate : `${targetDate}T00:00:00`;

  useEffect(() => {
    if (!mounted) return;
    const target = new Date(parsedTarget);
    setTimeLeft(getTimeLeft(target));
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [parsedTarget, mounted]);

  const formattedDate = mounted
    ? new Date(parsedTarget).toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "–";

  return (
    <div className={`${styles.wrapper} ${variant === "glass" ? styles.wrapperGlass : ""}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{formattedDate}</p>
      {!mounted ? (
        <div className={styles.grid}>
          <div className={styles.block}>
            <span className={styles.value}>–</span>
            <span className={styles.label}>Tage</span>
          </div>
          <div className={styles.block}>
            <span className={styles.value}>–</span>
            <span className={styles.label}>Stunden</span>
          </div>
          <div className={styles.block}>
            <span className={styles.value}>–</span>
            <span className={styles.label}>Minuten</span>
          </div>
          <div className={styles.block}>
            <span className={styles.value}>–</span>
            <span className={styles.label}>Sekunden</span>
          </div>
        </div>
      ) : timeLeft.isPast ? (
        <div className={styles.past}>
          <span className={styles.pastText}>Das Schützenfest ist da!</span>
        </div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.block}>
            <span className={styles.value}>{timeLeft.days}</span>
            <span className={styles.label}>Tage</span>
          </div>
          <div className={styles.block}>
            <span className={styles.value}>{formatNum(timeLeft.hours)}</span>
            <span className={styles.label}>Stunden</span>
          </div>
          <div className={styles.block}>
            <span className={styles.value}>{formatNum(timeLeft.minutes)}</span>
            <span className={styles.label}>Minuten</span>
          </div>
          <div className={styles.block}>
            <span className={styles.value}>{formatNum(timeLeft.seconds)}</span>
            <span className={styles.label}>Sekunden</span>
          </div>
        </div>
      )}
    </div>
  );
}
