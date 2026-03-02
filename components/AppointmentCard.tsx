import Image from "next/image";
import type { Appointments } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/client";
import styles from "./AppointmentCard.module.css";

const CalendarIcon = () => (
  <svg
    className={styles.calendarIcon}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const PinIcon = () => (
  <svg
    className={styles.pinIcon}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg
    className={styles.clockIcon}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

interface AppointmentCardProps {
  appointment: Appointments;
  /** "list" = eine Zeile pro Termin (Bild links, Text rechts), "card" = Kachel wie bisher. */
  variant?: "card" | "list";
}

const dateOpts: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};
const timeOpts: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
};

function formatDate(startDate: string): string {
  return new Date(startDate).toLocaleDateString("de-DE", dateOpts);
}

function formatTimeRange(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate);
  const startTimeStr = start.toLocaleTimeString("de-DE", timeOpts);
  if (!endDate?.trim()) {
    return `${startTimeStr} Uhr`;
  }
  const end = new Date(endDate);
  const endTimeStr = end.toLocaleTimeString("de-DE", timeOpts);
  const sameDay = formatDate(startDate) === formatDate(endDate);
  if (sameDay) {
    return `${startTimeStr} – ${endTimeStr} Uhr`;
  }
  return `${startTimeStr} Uhr – ${end.toLocaleDateString("de-DE", dateOpts)}, ${endTimeStr} Uhr`;
}

export default function AppointmentCard({
  appointment,
  variant = "card",
}: AppointmentCardProps) {
  const imageUrl =
    appointment.image &&
    urlFor(appointment.image).width(800).height(450).url();
  const hasLink = appointment.link?.trim();

  const content = (
    <>
      {variant === "card" && <span className={styles.badge}>Termin</span>}
      <div className={styles.imgWrap}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={appointment.image?.alt ?? appointment.title}
            fill
            style={{ objectFit: "cover" }}
            sizes={variant === "list" ? "200px" : "(max-width: 768px) 100vw, 800px"}
          />
        ) : (
          <div className={styles.placeholder}>📅</div>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{appointment.title}</h3>
        <span className={styles.date}>
          <CalendarIcon />
          {formatDate(appointment.startDate)}
        </span>
        <span className={styles.time}>
          <ClockIcon />
          {formatTimeRange(appointment.startDate, appointment.endDate ?? null)}
        </span>
        {appointment.location && (
          <span className={styles.location}>
            <PinIcon />
            {appointment.location}
          </span>
        )}
        {appointment.description && (
          <p className={styles.excerpt}>
            {appointment.description.slice(0, 120)}
            {appointment.description.length > 120 ? "…" : ""}
          </p>
        )}
        {hasLink && variant !== "list" && (
          <span className={styles.readMore}>Mehr erfahren →</span>
        )}
      </div>
      {variant === "list" && hasLink && (
        <div className={styles.ctaWrap}>
          <a
            href={appointment.link!}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            Mehr erfahren →
          </a>
        </div>
      )}
    </>
  );

  const className = `${styles.card} ${variant === "list" ? styles.list : ""}`.trim();

  if (hasLink && variant !== "list") {
    return (
      <a
        href={appointment.link!}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
