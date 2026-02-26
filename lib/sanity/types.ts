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
export interface HofstaatMitglied {
  rolle: string;
  name: string;
  bild?: SanityImage;
}

export interface SanityHofstaat {
  _id: string;
  regentschaftsjahr: string;
  koenigName: string;
  koeniginName?: string;
  koenigBild?: SanityImage;
  hofstaatMitglieder: HofstaatMitglied[];
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
