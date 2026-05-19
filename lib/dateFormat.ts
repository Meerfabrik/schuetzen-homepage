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
