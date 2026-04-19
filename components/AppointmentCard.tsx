import Image from "next/image";
import Link from "next/link";
import type { Appointment } from "@/lib/directus/types";
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
  appointment: Appointment;
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

export function formatDate(startDate: string): string {
  return new Date(startDate).toLocaleDateString("de-DE", dateOpts);
}

export function formatDateRange(startDate: string, endDate?: string | null): string {
  const startStr = formatDate(startDate);
  if (!endDate?.trim()) return startStr;
  const endStr = formatDate(endDate);
  if (startStr === endStr) return startStr;
  const start = new Date(startDate);
  const end = new Date(endDate);
  // Gleiches Jahr → Jahr nur am Ende anzeigen ("22. Mai – 26. Mai 2026")
  if (start.getFullYear() === end.getFullYear()) {
    const startShort = start.toLocaleDateString("de-DE", { day: "numeric", month: "long" });
    return `${startShort} – ${endStr}`;
  }
  return `${startStr} – ${endStr}`;
}

export function formatTimeRange(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate);
  const startTimeStr = start.toLocaleTimeString("de-DE", timeOpts);
  if (!endDate?.trim()) {
    return `${startTimeStr} Uhr`;
  }
  const end = new Date(endDate);
  const endTimeStr = end.toLocaleTimeString("de-DE", timeOpts);
  return `${startTimeStr} – ${endTimeStr} Uhr`;
}

/** Plaintext aus HTML extrahieren und Entities dekodieren für die Kurzvorschau. */
function stripHtml(html: string): string {
  const entities: Record<string, string> = {
    "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
    "&apos;": "'", "&nbsp;": " ", "&szlig;": "ß",
    "&auml;": "ä", "&ouml;": "ö", "&uuml;": "ü",
    "&Auml;": "Ä", "&Ouml;": "Ö", "&Uuml;": "Ü",
  };
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&\w+;/g, (entity) => entities[entity] ?? entity)
    .trim();
}

export default function AppointmentCard({
  appointment,
  variant = "card",
}: AppointmentCardProps) {
  const plainDescription = appointment.description ? stripHtml(appointment.description) : "";
  const end = appointment.endDate?.trim();
  const isMultiDay = end ? formatDate(appointment.startDate) !== formatDate(end) : false;
  const href = `/veranstaltungen/${appointment.slug}`;

  const content = (
    <>
      {variant === "card" && <span className={styles.badge}>Termin</span>}
      <div className={styles.imgWrap}>
        {appointment.imageUrl ? (
          <Image
            src={appointment.imageUrl}
            alt={appointment.title}
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
          {formatDateRange(appointment.startDate, appointment.endDate ?? null)}
        </span>
        {!isMultiDay && (
          <span className={styles.time}>
            <ClockIcon />
            {formatTimeRange(appointment.startDate, appointment.endDate ?? null)}
          </span>
        )}
        {appointment.location && (
          <span className={styles.location}>
            <PinIcon />
            {appointment.location}
          </span>
        )}
        {plainDescription && (
          <p className={styles.excerpt}>
            {plainDescription.slice(0, 120)}
            {plainDescription.length > 120 ? "…" : ""}
          </p>
        )}
        {variant !== "list" && (
          <span className={styles.readMore}>Mehr erfahren →</span>
        )}
      </div>
      {variant === "list" && (
        <div className={styles.ctaWrap}>
          <span className={styles.ctaBtn}>Mehr erfahren →</span>
        </div>
      )}
    </>
  );

  const className = `${styles.card} ${variant === "list" ? styles.list : ""}`.trim();

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
