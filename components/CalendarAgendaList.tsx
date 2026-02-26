"use client";

import AppointmentCard from "@/components/AppointmentCard";
import type { CalendarEvent } from "./VeranstaltungenCalendar";
import styles from "./CalendarAgendaList.module.css";

const DEFAULT_LENGTH = 30;

type AgendaViewProps = {
  date: Date;
  events: CalendarEvent[];
  length?: number;
  localizer: {
    add: (date: Date, amount: number, unit: string) => Date;
    startOf: (date: Date, unit: string) => Date;
    endOf: (date: Date, unit: string) => Date;
    messages?: { noEventsInRange?: string };
  };
  accessors: {
    start: (event: CalendarEvent) => Date;
    end: (event: CalendarEvent) => Date;
  };
};

function AgendaView({
  date,
  events,
  length = DEFAULT_LENGTH,
  localizer,
  accessors,
}: AgendaViewProps) {
  const end = localizer.add(date, length, "day");
  const rangeStart = localizer.startOf(date, "day");
  const rangeEnd = localizer.endOf(end, "day");
  const rangeStartMs = rangeStart.getTime();
  const rangeEndMs = rangeEnd.getTime();

  const inRange = events.filter((event) => {
    const start = accessors.start(event).getTime();
    const eventEnd = accessors.end(event).getTime();
    return start < rangeEndMs && eventEnd > rangeStartMs;
  });

  inRange.sort((a, b) => accessors.start(a).getTime() - accessors.start(b).getTime());

  if (inRange.length === 0) {
    const msg = localizer.messages?.noEventsInRange ?? "In diesem Zeitraum sind keine Termine.";
    return (
      <div className={styles.wrapper}>
        <div className={styles.empty}>{msg}</div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
      {inRange.map((event) => {
        const appointment = event.resource;
        if (appointment) {
          return (
            <AppointmentCard
              key={event.id}
              appointment={appointment}
              variant="list"
            />
          );
        }
        return (
          <div key={event.id} className={styles.fallback}>
            <strong>{event.title}</strong>
            <span>
              {accessors.start(event).toLocaleString("de-DE")}
              {event.end && ` – ${accessors.end(event).toLocaleString("de-DE")}`}
            </span>
          </div>
        );
      })}
      </div>
    </div>
  );
}

type ViewOptions = { length?: number; localizer?: AgendaViewProps["localizer"] };

AgendaView.range = function (start: Date, opts?: ViewOptions) {
  const length = opts?.length ?? DEFAULT_LENGTH;
  const localizer = opts?.localizer;
  if (!localizer) return { start, end: start };
  const end = localizer.add(start, length, "day");
  return { start, end };
};

AgendaView.navigate = function (date: Date, action: string, opts?: ViewOptions) {
  const length = opts?.length ?? DEFAULT_LENGTH;
  const localizer = opts?.localizer;
  if (!localizer) return date;
  switch (action) {
    case "PREV":
      return localizer.add(date, -length, "day");
    case "NEXT":
      return localizer.add(date, length, "day");
    default:
      return date;
  }
};

AgendaView.title = function (start: Date, opts?: ViewOptions) {
  const length = opts?.length ?? DEFAULT_LENGTH;
  const localizer = opts?.localizer;
  if (!localizer) return start.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
  const end = localizer.add(start, length, "day");
  return `${start.toLocaleDateString("de-DE", { month: "long", year: "numeric" })} – ${end.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}`;
};

export default AgendaView;
