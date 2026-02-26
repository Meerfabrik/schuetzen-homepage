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

interface AppointmentCardProps {
  appointment: Appointments;
  /** "list" = eine Zeile pro Termin (Bild links, Text rechts), "card" = Kachel wie bisher. */
  variant?: "card" | "list";
}

function formatDateRange(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate);
  const dateOpts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const timeOpts: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const startDateStr = start.toLocaleDateString("de-DE", dateOpts);
  const startTimeStr = start.toLocaleTimeString("de-DE", timeOpts);
  if (!endDate?.trim()) {
    return `${startDateStr}, ${startTimeStr} Uhr`;
  }
  const end = new Date(endDate);
  const endDateStr = end.toLocaleDateString("de-DE", dateOpts);
  const endTimeStr = end.toLocaleTimeString("de-DE", timeOpts);
  const sameDay = startDateStr === endDateStr;
  if (sameDay) {
    return `${startDateStr}, ${startTimeStr} – ${endTimeStr} Uhr`;
  }
  return `${startDateStr}, ${startTimeStr} Uhr – ${endDateStr}, ${endTimeStr} Uhr`;
}

export default function AppointmentCard({
  appointment,
  variant = "card",
}: AppointmentCardProps) {
  const imageUrl =
    appointment.image &&
    urlFor(appointment.image).width(800).height(450).url();
  const dateRange = formatDateRange(
    appointment.startDate,
    appointment.endDate ?? null
  );
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
        <span className={styles.date}>
          <CalendarIcon />
          {dateRange}
        </span>
        <h3 className={styles.title}>{appointment.title}</h3>
        {appointment.description && (
          <p className={styles.excerpt}>
            {appointment.description.slice(0, 120)}
            {appointment.description.length > 120 ? "…" : ""}
          </p>
        )}
        {appointment.location && (
          <span className={styles.location}>
            <PinIcon />
            {appointment.location}
          </span>
        )}
        {hasLink && variant !== "list" && (
          <span className={styles.readMore}>Mehr erfahren →</span>
        )}
      </div>
      {variant === "list" && hasLink && (
        <div className={styles.ctaWrap}>
          <span className={styles.ctaBtn}>Mehr erfahren →</span>
        </div>
      )}
    </>
  );

  const className = `${styles.card} ${variant === "list" ? styles.list : ""}`.trim();

  if (hasLink) {
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
