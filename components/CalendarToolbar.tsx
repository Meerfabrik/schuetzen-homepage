"use client";

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

type CalendarToolbarProps = {
  label: string;
  view: string;
  views: string[];
  onNavigate: (action: string) => void;
  onView: (view: string) => void;
  localizer: { messages: Record<string, string> };
};

export default function CalendarToolbar({
  label,
  view,
  views,
  onNavigate,
  onView,
  localizer,
}: CalendarToolbarProps) {
  const messages = localizer.messages ?? {};
  const viewLabels: Record<string, string> = {
    month: "Monat",
    agenda: "Agenda",
  };

  return (
    <div className="rbc-toolbar rbc-toolbar-custom">
      <span className="rbc-btn-group rbc-btn-group-nav">
        <button
          type="button"
          onClick={() => onNavigate("PREV")}
          title={messages.previous ?? "Zurück"}
          aria-label={messages.previous ?? "Zurück"}
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => onNavigate("NEXT")}
          title={messages.next ?? "Weiter"}
          aria-label={messages.next ?? "Weiter"}
        >
          <ChevronRight />
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        {views.map((name) => (
          <button
            type="button"
            key={name}
            className={view === name ? "rbc-active" : ""}
            onClick={() => onView(name)}
          >
            {viewLabels[name] ?? messages[name] ?? name}
          </button>
        ))}
      </span>
    </div>
  );
}
