import Link from "next/link";
import { getAllAppointments } from "@/lib/sanity/queries";
import VeranstaltungenCalendar from "@/components/VeranstaltungenCalendar";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "Veranstaltungen & Termine | St. Sebastianus Schützenbruderschaft Büderich",
  description:
    "Alle Veranstaltungen und Termine der St. Sebastianus Schützenbruderschaft Büderich von 1567 e.V.",
};

export default async function VeranstaltungenPage() {
  let appointments: Awaited<ReturnType<typeof getAllAppointments>> = [];
  try {
    appointments = await getAllAppointments();
  } catch (err) {
    console.error("Sanity getAllAppointments failed:", err);
  }

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <h1 className="section-title">Alle Veranstaltungen</h1>
        <p className="section-subtitle">
          Termine und Events der Bruderschaft im Überblick
        </p>

        {appointments.length > 0 ? (
          <VeranstaltungenCalendar appointments={appointments} />
        ) : (
          <div className={styles.empty}>
            <p>Derzeit sind keine Termine im Kalender eingetragen.</p>
            <p>
              Neue Termine können im{" "}
              <Link href="/studio" className={styles.studioLink}>
                CMS unter /studio
              </Link>{" "}
              angelegt werden.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
