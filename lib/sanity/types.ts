import type { PortableTextBlock } from "@portabletext/types";

// Sanity Basis-Bild-Typ
export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
  alt?: string;
  caption?: string;
}

// News
export interface SanityNews {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  image?: SanityImage;
  excerpt: string;
  content: PortableTextBlock[];
}

export interface Appointments {
  _id: string;
  title: string;
  startDate: string; // ISO datetime
  endDate?: string;  // optional, ISO datetime
  location: string;
  description: string;
  image: SanityImage;
  link: string;
  isActive: boolean;
  isPublished: boolean;
  isDeleted: boolean;
}

// Hofstaat
export type HofstaatKategorie =
  | "koenigspaare"
  | "minister"
  | "ehrendamen"
  | "gesamtbild"
  | "jungkoenigin"
  | "ehrenkoenigin"
  | "ministerJungKoenigin";

export interface HofstaatEintrag {
  _id: string;
  bild: SanityImage;
  titel: string;
  kategorie: HofstaatKategorie;
}

// Galerie
export interface SanityGalerie {
  _id: string;
  titel: string;
  kategorie: "koenige" | "historie" | "ehrenkoenige" | "jungkoenige" | "veranstaltungen";
  jahr?: number;
  bilder: SanityImage[];
}

// Download
export interface SanityDownload {
  _id: string;
  name: string;
  beschreibung?: string;
  kategorie: "mitgliedschaft" | "satzung" | "veranstaltungen" | "sonstiges";
  datei: { asset: { url: string } };
  reihenfolge?: number;
}

// Sponsor
export type SponsorEbene = "hauptsponsor" | "sponsor" | "partner" | "foerderer";

export interface SanitySponsor {
  _id: string;
  title: string;
  logo: SanityImage;
  link?: string;
  ebene: SponsorEbene;
  reihenfolge?: number;
}
