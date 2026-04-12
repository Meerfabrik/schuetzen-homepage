"use client";

import { useConsent } from "@/lib/consent";

export function CookieSettingsLink({ className }: { className?: string }) {
  const { reopen } = useConsent();
  return (
    <button type="button" onClick={reopen} className={className} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "inherit", font: "inherit" }}>
      Cookie-Einstellungen
    </button>
  );
}
