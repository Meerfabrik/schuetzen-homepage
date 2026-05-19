"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useConsent } from "@/lib/consent";
import { initPostHog, optInPostHog, optOutPostHog, track } from "@/lib/analytics";

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const query = searchParams?.toString();
    const url = pathname + (query ? `?${query}` : "");
    track("$pageview", {
      $current_url: window.location.origin + url,
      path: pathname,
    });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider() {
  const { consent } = useConsent();

  useEffect(() => {
    if (consent.analytics) {
      initPostHog();
      optInPostHog();
    } else {
      optOutPostHog();
    }
  }, [consent.analytics]);

  if (!consent.analytics) return null;
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
}
