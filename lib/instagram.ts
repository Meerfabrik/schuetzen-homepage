/**
 * Instagram Graph API – Medien (Bilder/Reels) eines Instagram-Business/Creator-Kontos abrufen.
 * Voraussetzung: Instagram-Konto als Business/Creator, mit Facebook-Seite verknüpft,
 * Meta App mit Instagram Graph API, Long-Lived Access Token.
 *
 * Env: INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID (IG User ID, nicht Benutzername)
 */

export interface InstagramMedia {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

interface GraphApiMediaResponse {
  data: Array<{
    id: string;
    media_type: string;
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
    caption?: string;
    timestamp: string;
    like_count?: number;
    comments_count?: number;
  }>;
  paging?: { cursors: { after: string }; next?: string };
}

const FIELDS = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp,like_count,comments_count";
const LIMIT = 12;

export async function getInstagramMedia(limit = LIMIT): Promise<InstagramMedia[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return [];
  }

  const url = new URL(`https://graph.instagram.com/${userId}/media`);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", token);

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } }); // 1h cache

  if (!res.ok) {
    console.warn("[Instagram] API error:", res.status, await res.text());
    return [];
  }

  const json = (await res.json()) as GraphApiMediaResponse;
  const raw = json.data ?? [];

  return raw
    .filter((m) => m.media_type === "IMAGE" || m.media_type === "CAROUSEL_ALBUM" || (m.media_type === "VIDEO" && m.thumbnail_url))
    .slice(0, limit)
    .map((m) => ({
      id: m.id,
      media_type: m.media_type as InstagramMedia["media_type"],
      media_url: m.media_url,
      thumbnail_url: m.thumbnail_url,
      permalink: m.permalink,
      caption: m.caption,
      timestamp: m.timestamp,
      like_count: typeof m.like_count === "number" ? m.like_count : undefined,
      comments_count: typeof m.comments_count === "number" ? m.comments_count : undefined,
    }));
}
