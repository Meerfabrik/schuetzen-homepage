import { client } from "./client";
import type {
  SanityNews,
  SanityHofstaat,
  SanityGalerie,
  SanityDownload,
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

export async function getAktuellerHofstaat(): Promise<SanityHofstaat | null> {
  return client.fetch(
    `*[_type == "hofstaat"] | order(_createdAt desc) [0] {
      _id,
      regentschaftsjahr,
      koenigName,
      koeniginName,
      koenigBild { ..., asset-> },
      hofstaatMitglieder[] {
        rolle,
        name,
        bild { ..., asset-> }
      }
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
