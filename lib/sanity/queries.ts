import { client } from "./client";
import type {
  SanityNews,
  SanityGalerie,
  SanityDownload,
  Appointments,
  SanitySponsor,
  HofstaatEintrag,
} from "./types";

// ── NEWS ─────────────────────────────────────────────────────────────────────

export async function getAllNews(): Promise<SanityNews[]> {
  return client.fetch(
    `*[_type == "news" && defined(slug.current)] | order(date desc) {
      _id,
      title,
      slug,
      date,
      image { ..., asset-> },
      excerpt
    }`
  );
}

export async function getNewsBySlug(slug: string): Promise<SanityNews | null> {
  return client.fetch(
    `*[_type == "news" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      date,
      image { ..., asset-> },
      excerpt,
      content
    }`,
    { slug }
  );
}

export async function getLatestNews(count = 3): Promise<SanityNews[]> {
  return client.fetch(
    `*[_type == "news"] | order(date desc) [0...$count] {
      _id,
      title,
      slug,
      date,
      image { ..., asset-> },
      excerpt
    }`,
    { count }
  );
}

// ── HOFSTAAT ─────────────────────────────────────────────────────────────────

export async function getHofstaatEintraege(): Promise<HofstaatEintrag[]> {
  return client.fetch(
    `*[_type == "hofstaatEintrag"] | order(_createdAt asc) {
      _id,
      bild { ..., asset-> },
      titel,
      kategorie
    }`
  );
}

// ── GALERIE ──────────────────────────────────────────────────────────────────

export async function getAllGalerien(): Promise<SanityGalerie[]> {
  return client.fetch(
    `*[_type == "galerie"] | order(jahr desc) {
      _id,
      titel,
      kategorie,
      jahr,
      bilder[] { ..., asset-> }
    }`
  );
}

export async function getGalerieByKategorie(
  kategorie: string
): Promise<SanityGalerie[]> {
  return client.fetch(
    `*[_type == "galerie" && kategorie == $kategorie] | order(jahr desc) {
      _id,
      titel,
      kategorie,
      jahr,
      bilder[] { ..., asset-> }
    }`,
    { kategorie }
  );
}

// ── TERMINE (APPOINTMENTS) ───────────────────────────────────────────────────

const appointmentsProjection = `{
      _id,
      title,
      startDate,
      endDate,
      location,
      description,
      image { ..., asset-> },
      link,
      isActive,
      isPublished,
      isDeleted
    }`;

export async function getAllAppointments(): Promise<Appointments[]> {
  return client.fetch(
    `*[_type == "appointments" && isActive == true && isPublished == true && isDeleted != true] | order(startDate asc) ${appointmentsProjection}`
  );
}

/** Nächste Termine für Startseite: kein Enddatum oder Enddatum >= heute. */
export async function getUpcomingAppointments(
  limit = 6
): Promise<Appointments[]> {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return client.fetch(
    `*[_type == "appointments" && isActive == true && isPublished == true && isDeleted != true && (!defined(endDate) || endDate >= $today)] | order(startDate asc) [0...$limit] ${appointmentsProjection}`,
    { limit, today }
  );
}

// ── DOWNLOADS ────────────────────────────────────────────────────────────────

export async function getAllDownloads(): Promise<SanityDownload[]> {
  return client.fetch(
    `*[_type == "download"] | order(reihenfolge asc) {
      _id,
      name,
      beschreibung,
      kategorie,
      reihenfolge,
      "datei": { "asset": { "url": datei.asset->url } }
    }`
  );
}

// ── SPONSOREN ────────────────────────────────────────────────────────────────

export async function getAllSponsors(): Promise<SanitySponsor[]> {
  return client.fetch(
    `*[_type == "sponsor"] | order(ebene asc, reihenfolge asc, title asc) {
      _id,
      title,
      logo { ..., asset-> },
      link,
      ebene,
      reihenfolge
    }`
  );
}
