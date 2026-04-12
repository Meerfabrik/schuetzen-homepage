import Link from "next/link";
import { getAllAppointments } from "@/lib/directus/queries";
import VeranstaltungenAgenda from "@/components/VeranstaltungenAgenda";
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
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Termine & Events</div>
        <h1>Veranstaltungen</h1>
        <p>Alle Termine und Events der Bruderschaft im Überblick.</p>
      </div>

      <section className={`section ${styles.section}`}>
        <div className="container">
          {appointments.length > 0 ? (
            <div className={styles.agendaWrap}>
              <VeranstaltungenAgenda appointments={appointments} />
            </div>
          ) : (
            <div className={styles.empty}>
              <p>Derzeit sind keine Termine eingetragen.</p>
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
    </>
  );
}
