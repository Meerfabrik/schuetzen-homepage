export interface DirectusPost {
  id: number;
  title: string;
  summary: string;
  title_image: string; // UUID referencing directus_files
  text: string;        // HTML content
  date: string;        // ISO 8601 datetime
  published: boolean;
  url_slug: string | null;
}

export interface DirectusDate {
  id: number;
  title: string;
  start_date: string;    // ISO 8601 datetime
  end_date: string | null;
  location: string;
  text: string;          // HTML content
  image: string;         // UUID referencing directus_files
  link: string | null;
  published: boolean;
}

/** Einheitliches Termin-Format, das von den Komponenten konsumiert wird. */
export interface Appointment {
  id: number;
  title: string;
  startDate: string;
  endDate: string | null;
  location: string;
  description: string;   // HTML
  imageUrl: string | null;
  link: string | null;
}

export interface DirectusSponsor {
  id: number;
  title: string;
  logo: string;          // UUID referencing directus_files
  level: string;         // "haupt" | "premium"
  link: string | null;
}

/** Einheitliches Sponsor-Format, das von den Komponenten konsumiert wird. */
export type SponsorLevel = "haupt" | "premium";

export interface Sponsor {
  id: number;
  title: string;
  logoUrl: string | null;
  level: SponsorLevel;
  link: string | null;
}

export interface DirectusKing {
  id: number;
  title: string;
  category: string;      // "0"-"6" (dropdown value)
  image: string;         // UUID referencing directus_files
}

export type HofstaatKategorie =
  | "koenigspaar"
  | "ministerpaar"
  | "ehrendamen"
  | "jungkoenig"
  | "jungkoenig_minister"
  | "ehrenkoenig"
  | "gesamtbild";

export interface HofstaatEintrag {
  id: number;
  titel: string;
  kategorie: HofstaatKategorie;
  imageUrl: string;
}

export interface DirectusDownload {
  id: number;
  title: string;
  type: string;          // "programme" | "formulare" | "pläne"
  file: string;          // UUID referencing directus_files
}

export interface Download {
  id: number;
  name: string;
  kategorie: string;
  fileUrl: string;
}

export interface DirectusKompanie {
  id: number;
  name: string;
  hauptmann: string | null;
  website: string | null;
  adresse: string | null;
  hinweis: string | null;
}

export interface Kompanie {
  id: number;
  name: string;
  hauptmann: string | null;
  webseite: string | null;
  adresse: string | null;
  hinweis: string | null;
}

/** Einheitliches News-Format, das von den Komponenten konsumiert wird. */
export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  date: string;
  imageUrl: string | null;
  excerpt: string;
  content: string; // HTML
}
