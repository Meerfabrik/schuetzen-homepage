"use client";

import posthog from "posthog-js";

const EVENT_PREFIX = "homepage_";
const SOURCE = "homepage";

let initialized = false;

function withPrefix(event: string): string {
  // PostHog-eigene Events ($pageview, $pageleave, $autocapture, …) NICHT umbenennen,
  // sonst funktionieren die Standard-Insights nicht mehr.
  if (event.startsWith("$")) return event;
  if (event.startsWith(EVENT_PREFIX)) return event;
  return EVENT_PREFIX + event;
}

export function initPostHog(): void {
  if (initialized || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
    person_profiles: "always",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    mask_all_text: false,
    mask_personal_data_properties: true,
    loaded: (ph) => {
      // An jedes Event anhängen, damit ihr im selben Projekt nach `source = "homepage"`
      // filtern könnt und die Flutter-App (posthog-flutter) getrennt sichtbar bleibt.
      ph.register({ source: SOURCE });
    },
  });
  initialized = true;
}

export function optInPostHog(): void {
  if (!initialized) initPostHog();
  if (!initialized) return;
  posthog.opt_in_capturing();
}

export function optOutPostHog(): void {
  if (typeof window === "undefined") return;
  if (!initialized) return;
  posthog.opt_out_capturing();
  posthog.reset();
}

export function track(event: string, props?: Record<string, unknown>): void {
  if (!initialized || typeof window === "undefined") return;
  if (posthog.has_opted_out_capturing()) return;
  posthog.capture(withPrefix(event), props);
}
