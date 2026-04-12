"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ConsentCategory = "maps" | "instagram";

export interface ConsentState {
  maps: boolean;
  instagram: boolean;
}

const DEFAULT_STATE: ConsentState = { maps: false, instagram: false };
const STORAGE_KEY = "sbb_consent_v1";

interface ConsentContextValue {
  consent: ConsentState;
  decided: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  setCategory: (category: ConsentCategory, value: boolean) => void;
  saveCustom: (state: ConsentState) => void;
  reopen: () => void;
  bannerOpen: boolean;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStored(): { state: ConsentState; decided: boolean } {
  if (typeof window === "undefined") return { state: DEFAULT_STATE, decided: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { state: DEFAULT_STATE, decided: false };
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      state: {
        maps: Boolean(parsed.maps),
        instagram: Boolean(parsed.instagram),
      },
      decided: true,
    };
  } catch {
    return { state: DEFAULT_STATE, decided: false };
  }
}

function persist(state: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_STATE);
  const [decided, setDecided] = useState(true); // start true to avoid SSR flash; corrected on mount
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const { state, decided: d } = readStored();
    setConsent(state);
    setDecided(d);
    setBannerOpen(!d);
  }, []);

  const acceptAll = useCallback(() => {
    const next: ConsentState = { maps: true, instagram: true };
    setConsent(next);
    setDecided(true);
    setBannerOpen(false);
    persist(next);
  }, []);

  const rejectAll = useCallback(() => {
    const next: ConsentState = { maps: false, instagram: false };
    setConsent(next);
    setDecided(true);
    setBannerOpen(false);
    persist(next);
  }, []);

  const setCategory = useCallback((category: ConsentCategory, value: boolean) => {
    setConsent((prev) => {
      const next = { ...prev, [category]: value };
      persist(next);
      return next;
    });
    setDecided(true);
  }, []);

  const saveCustom = useCallback((state: ConsentState) => {
    setConsent(state);
    setDecided(true);
    setBannerOpen(false);
    persist(state);
  }, []);

  const reopen = useCallback(() => {
    setBannerOpen(true);
  }, []);

  const value = useMemo(
    () => ({ consent, decided, acceptAll, rejectAll, setCategory, saveCustom, reopen, bannerOpen }),
    [consent, decided, acceptAll, rejectAll, setCategory, saveCustom, reopen, bannerOpen]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
