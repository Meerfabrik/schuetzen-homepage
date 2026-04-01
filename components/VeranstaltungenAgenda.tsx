import type { Appointment } from "@/lib/directus/types";
import AppointmentCard from "@/components/AppointmentCard";
import styles from "./VeranstaltungenAgenda.module.css";

function getMonthKey(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthHeading(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });
}

interface VeranstaltungenAgendaProps {
  appointments: Appointment[];
}

export default function VeranstaltungenAgenda({
  appointments,
}: VeranstaltungenAgendaProps) {
  if (appointments.length === 0) {
    return null;
  }

  const byMonth = new Map<string, Appointment[]>();
  for (const a of appointments) {
    const key = getMonthKey(a.startDate);
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(a);
  }

  const sortedMonths = Array.from(byMonth.entries()).sort(
    (a, b) => a[0].localeCompare(b[0])
  );

  return (
    <div className={styles.wrapper}>
      {sortedMonths.map(([monthKey, list]) => (
        <section key={monthKey} className={styles.monthSection}>
          <h2 className={styles.monthHeading}>
            <span className={styles.monthHeadingText}>
              {formatMonthHeading(list[0].startDate)}
            </span>
          </h2>
          <ul className={styles.list} aria-label={`Termine ${formatMonthHeading(list[0].startDate)}`}>
            {list.map((appointment) => (
              <li key={appointment.id}>
                <AppointmentCard appointment={appointment} variant="list" />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
