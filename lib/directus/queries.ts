import directus, { assetUrl } from "./client";
import { readItems } from "@directus/sdk";
import type {
  DirectusPost, DirectusDate, DirectusSponsor, DirectusKing, DirectusDownload, DirectusKompanie,
  NewsArticle, Appointment, Sponsor, HofstaatEintrag, HofstaatKategorie, Download, Kompanie,
} from "./types";

/** Slug aus dem Titel generieren (z. B. "Unsere App ist online" -> "unsere-app-ist-online"). */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Directus-Post in einheitliches NewsArticle-Format umwandeln. */
function toNewsArticle(post: DirectusPost): NewsArticle {
  return {
    id: post.id,
    title: post.title,
    slug: post.url_slug || slugify(post.title),
    date: post.date,
    imageUrl: post.title_image ? assetUrl(post.title_image, 800, 450) : null,
    excerpt: post.summary,
    content: post.text,
  };
}

export async function getAllNews(): Promise<NewsArticle[]> {
  const posts = await directus.request<DirectusPost[]>(
    readItems("schuetzen_posts", {
      filter: { published: { _eq: true } },
      sort: ["-date"],
      fields: ["id", "title", "summary", "title_image", "text", "date", "published", "url_slug"],
    })
  );
  return posts.map(toNewsArticle);
}

export async function getLatestNews(count = 3): Promise<NewsArticle[]> {
  const posts = await directus.request<DirectusPost[]>(
    readItems("schuetzen_posts", {
      filter: { published: { _eq: true } },
      sort: ["-date"],
      limit: count,
      fields: ["id", "title", "summary", "title_image", "date", "published", "url_slug"],
    })
  );
  return posts.map(toNewsArticle);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  // Da Directus kein Slug-Feld hat, laden wir alle veröffentlichten Posts
  // und suchen per generiertem Slug.
  const posts = await directus.request<DirectusPost[]>(
    readItems("schuetzen_posts", {
      filter: { published: { _eq: true } },
      fields: ["id", "title", "summary", "title_image", "text", "date", "published", "url_slug"],
    })
  );
  const article = posts.find((p) => (p.url_slug || slugify(p.title)) === slug);
  return article ? toNewsArticle(article) : null;
}

// ── TERMINE ───────────────────────────────────────────────────────────────────

const dateFields = ["id", "title", "start_date", "end_date", "location", "text", "image", "link", "published"] as const;

function toAppointment(d: DirectusDate): Appointment {
  return {
    id: d.id,
    title: d.title,
    startDate: d.start_date,
    endDate: d.end_date,
    location: d.location,
    description: d.text,
    imageUrl: d.image ? assetUrl(d.image, 800, 450) : null,
    link: d.link,
  };
}

export async function getAllAppointments(): Promise<Appointment[]> {
  const dates = await directus.request<DirectusDate[]>(
    readItems("schuetzen_dates", {
      filter: { published: { _eq: true } },
      sort: ["start_date"],
      fields: [...dateFields],
    })
  );
  return dates.map(toAppointment);
}

export async function getUpcomingAppointments(limit = 6): Promise<Appointment[]> {
  const today = new Date().toISOString().slice(0, 19);
  const dates = await directus.request<DirectusDate[]>(
    readItems("schuetzen_dates", {
      filter: {
        published: { _eq: true },
        _or: [
          { end_date: { _gte: today } },
          { end_date: { _null: true }, start_date: { _gte: today } },
        ],
      },
      sort: ["start_date"],
      limit,
      fields: [...dateFields],
    })
  );
  return dates.map(toAppointment);
}

// ── SPONSOREN ─────────────────────────────────────────────────────────────────

function toSponsor(s: DirectusSponsor): Sponsor {
  return {
    id: s.id,
    title: s.title,
    logoUrl: s.logo ? assetUrl(s.logo, 600, 320) : null,
    level: s.level as Sponsor["level"],
    link: s.link,
  };
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  const sponsors = await directus.request<DirectusSponsor[]>(
    readItems("schuetzen_sponsors", {
      sort: ["level", "title"],
      fields: ["id", "title", "logo", "level", "link"],
    })
  );
  return sponsors.map(toSponsor);
}

// ── HOFSTAAT ──────────────────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, HofstaatKategorie> = {
  "0": "koenigspaar",
  "1": "ministerpaar",
  "2": "jungkoenig",
  "3": "ehrenkoenig",
  "4": "ehrendamen",
  "5": "gesamtbild",
  "6": "jungkoenig_minister",
};

function toHofstaatEintrag(k: DirectusKing): HofstaatEintrag {
  return {
    id: k.id,
    titel: k.title,
    kategorie: CATEGORY_MAP[k.category] ?? "gesamtbild",
    imageUrl: assetUrl(k.image, 800, 600),
  };
}

export async function getHofstaatEintraege(): Promise<HofstaatEintrag[]> {
  const kings = await directus.request<DirectusKing[]>(
    readItems("schuetzen_current_kings", {
      fields: ["id", "title", "category", "image"],
    })
  );
  return kings.map(toHofstaatEintrag);
}

// ── DOWNLOADS ─────────────────────────────────────────────────────────────────

function toDownload(d: DirectusDownload): Download {
  return {
    id: d.id,
    name: d.title,
    kategorie: d.type,
    fileUrl: `https://cms.meerfabrik.de/assets/${d.file}`,
  };
}

export async function getAllDownloads(): Promise<Download[]> {
  const downloads = await directus.request<DirectusDownload[]>(
    readItems("schuetzen_downloads", {
      sort: ["type", "title"],
      fields: ["id", "title", "type", "file"],
    })
  );
  return downloads.map(toDownload);
}

// ── KOMPANIEN ─────────────────────────────────────────────────────────────────

function toKompanie(k: DirectusKompanie): Kompanie {
  return {
    id: k.id,
    name: k.name,
    hauptmann: k.hauptmann,
    webseite: k.website,
    adresse: k.adresse,
    hinweis: k.hinweis,
  };
}

export async function getAllKompanien(): Promise<Kompanie[]> {
  const kompanien = await directus.request<DirectusKompanie[]>(
    readItems("schuetzen_kompanien", {
      sort: ["name"],
      fields: ["id", "name", "hauptmann", "website", "adresse", "hinweis"],
    })
  );
  return kompanien.map(toKompanie);
}
