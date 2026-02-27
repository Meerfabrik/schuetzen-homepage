"use client";

import { useMemo, useState, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { View } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import de from "date-fns/locale/de";
import type { Appointments } from "@/lib/sanity/types";
import CustomAgendaList from "@/components/CalendarAgendaList";
import CalendarToolbar from "@/components/CalendarToolbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./VeranstaltungenCalendar.module.css";

const locales = { de };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource?: Appointments;
};

function appointmentToEvent(a: Appointments): CalendarEvent {
  const start = new Date(a.startDate);
  const end = a.endDate ? new Date(a.endDate) : new Date(start.getTime() + 60 * 60 * 1000);
  return {
    id: a._id,
    title: a.title,
    start,
    end,
    resource: a,
  };
}

interface VeranstaltungenCalendarProps {
  appointments: Appointments[];
}

export default function VeranstaltungenCalendar({
  appointments,
}: VeranstaltungenCalendarProps) {
  const [date, setDate] = useState(() => new Date());
  // Standard-Ansicht: Agenda, nicht Monat
  const [view, setView] = useState<View>("agenda");

  const onNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const onView = useCallback((newView: View) => {
    setView(newView);
  }, []);

  const events = useMemo(
    () => appointments.map(appointmentToEvent),
    [appointments]
  );

  return (
    <div className={styles.wrapper}>
      <Calendar
        localizer={localizer}
        culture="de"
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        date={date}
        onNavigate={onNavigate}
        view={view}
        onView={onView}
        views={{ month: true, agenda: CustomAgendaList } as any}
        components={{ toolbar: CalendarToolbar as any }}
        className={styles.calendar}
        messages={{
          today: "Heute",
          previous: "Zurück",
          next: "Weiter",
          month: "Monat",
          agenda: "Agenda",
          date: "Datum",
          time: "Uhrzeit",
          event: "Termin",
          noEventsInRange: "In diesem Zeitraum sind keine Termine.",
        }}
      />
    </div>
  );
}
