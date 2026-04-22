import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getAllAppointments,
  getAppointmentBySlug,
} from "@/lib/directus/queries";
import {
  formatDate,
  formatDateRange,
  formatTimeRange,
} from "@/components/AppointmentCard";
import styles from "./page.module.css";

export const revalidate = 60;

export async function generateStaticParams() {
  const appointments = await getAllAppointments();
  return appointments.map((a) => ({ slug: a.slug }));
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const appointment = await getAppointmentBySlug(params.slug);
  if (!appointment) return { title: "Termin nicht gefunden" };
  return {
    title: `${appointment.title} | St. Sebastianus Schützenbruderschaft Büderich`,
  };
}

export default async function TerminDetailPage({ params }: Props) {
  const appointment = await getAppointmentBySlug(params.slug);
  if (!appointment) notFound();

  const heroImageUrl = appointment.imageUrl;

  const end = appointment.endDate?.trim();
  const isMultiDay = end
    ? formatDate(appointment.startDate) !== formatDate(end)
    : false;

  const dateText = formatDateRange(appointment.startDate, appointment.endDate);
  const timeText = isMultiDay
    ? null
    : formatTimeRange(appointment.startDate, appointment.endDate);

  return (
    <>
      {heroImageUrl ? (
        <div className={styles.heroImg}>
          <Image
            src={heroImageUrl}
            alt={appointment.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <span className={styles.badge}>Termin</span>
            <h1>{appointment.title}</h1>
            <div className={styles.heroMeta}>
              <span>{dateText}</span>
              {timeText && <span>{timeText} Uhr</span>}
              {appointment.location && <span>{appointment.location}</span>}
            </div>
          </div>
        </div>
      ) : (
        <div className={`page-hero ${styles.heroCompact}`}>
          <span className={styles.badgeCompact}>Termin</span>
          <h1>{appointment.title}</h1>
          <div className={styles.heroMetaCompact}>
            <span>{dateText}</span>
            {timeText && <span>{timeText} Uhr</span>}
            {appointment.location && <span>{appointment.location}</span>}
          </div>
        </div>
      )}

      <article className="section">
        {appointment.description?.trim() && (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: appointment.description }}
          />
        )}

        {appointment.link && (
          <div className={styles.ctaWrap}>
            <a
              href={appointment.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              Zur externen Seite →
            </a>
          </div>
        )}

        <div className={styles.backWrap}>
          <Link href="/veranstaltungen" className={styles.backLink}>
            ← Zurück zu allen Terminen
          </Link>
        </div>
      </article>
    </>
  );
}
