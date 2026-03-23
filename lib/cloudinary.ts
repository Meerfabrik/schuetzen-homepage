import { v2 as cloudinary } from "cloudinary";
import { unstable_cache } from "next/cache";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

/** Cache-Dauer in Sekunden (5 Minuten) */
const CACHE_TTL = 300;

if (cloudName) {
  cloudinary.config({
    cloud_name: cloudName,
    ...(apiKey && apiSecret && { api_key: apiKey, api_secret: apiSecret }),
  });
}

export type CloudinaryImage = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  /** Aus Cloudinary Context (z. B. context.custom.title oder context.custom.caption) */
  title?: string;
  /** Tags aus Cloudinary (z. B. für Sortierung nach Position: "Präsident", "1", …) */
  tags?: string[];
};

/**
 * Liefert die URL für ein Bild mit optionalen Transformationen.
 * Nutzt NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (kein API-Key nötig).
 */
export function getCloudinaryImageUrl(
  publicId: string,
  options?: { width?: number; height?: number; crop?: string }
): string {
  if (!cloudName) return "";
  const opts = options || {};
  const width = opts.width ?? 800;
  const height = opts.height;
  const crop = opts.crop ?? "fill";
  const cropParam = height != null ? `w_${width},h_${height},c_${crop}` : `w_${width},c_${crop}`;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${cropParam},q_auto,f_auto/${publicId}`;
}

function getTitleFromContext(r: Record<string, unknown>): string | undefined {
  const ctx = r.context as Record<string, Record<string, string>> | undefined;
  if (!ctx?.custom) return undefined;
  const custom = ctx.custom;
  const title = custom.title ?? custom.caption ?? custom.alt;
  return typeof title === "string" && title.trim() ? title.trim() : undefined;
}

function normalizeResources(
  raw: Array<Record<string, unknown>>
): CloudinaryImage[] {
  return raw
    .filter(
      (r) =>
        r.public_id &&
        r.secure_url &&
        r.format &&
        ["jpg", "jpeg", "png", "webp", "gif"].includes(
          String(r.format).toLowerCase()
        )
    )
    .map((r) => ({
      public_id: String(r.public_id),
      secure_url: String(r.secure_url),
      width: Number(r.width) || 0,
      height: Number(r.height) || 0,
      format: String(r.format),
      title: getTitleFromContext(r),
      tags: Array.isArray(r.tags) ? r.tags.map((t) => String(t)) : undefined,
    }));
}

function getResourceList(raw: Record<string, unknown>): Array<Record<string, unknown>> {
  if (Array.isArray(raw.resources)) return raw.resources;
  if (Array.isArray(raw.assets)) return raw.assets;
  return [];
}

// ── Interne (ungecachte) API-Aufrufe ──

async function _fetchGalleryImages(
  folder: string,
  maxResults: number
): Promise<CloudinaryImage[]> {
  if (!cloudName || !apiKey || !apiSecret) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Cloudinary] Fehlende Umgebungsvariablen: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY oder CLOUDINARY_API_SECRET."
      );
    }
    return [];
  }

  const opts = { max_results: maxResults, tags: true };

  try {
    // 1. Dynamic Asset Folders
    const api = cloudinary.api as unknown as { resources_by_asset_folder?: (folder: string, options: Record<string, unknown>) => Promise<Record<string, unknown>> };
    if (typeof api.resources_by_asset_folder === "function") {
      try {
        const result = await api.resources_by_asset_folder(folder, opts);
        const list = getResourceList(result);
        if (list.length > 0) {
          return normalizeResources(list).sort((a, b) => a.public_id.localeCompare(b.public_id));
        }
      } catch {
        // Fallback unten
      }
    }

    // 2. Fixed Folder Mode
    const prefix = folder.includes("/") ? folder : `${folder}/`;
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix,
      max_results: maxResults,
      tags: true,
    });

    const raw = result as Record<string, unknown>;
    const list = getResourceList(raw);
    const normalized = normalizeResources(list);
    if (process.env.NODE_ENV === "development" && normalized.length === 0 && list.length === 0) {
      console.warn("[Cloudinary] Keine Ressourcen für Ordner:", folder, "| Prefix:", prefix);
    }
    return normalized.sort((a, b) => a.public_id.localeCompare(b.public_id));
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Cloudinary] getGalleryImages Fehler:", err);
    }
    return [];
  }
}

async function _fetchSubfolders(folder: string): Promise<string[]> {
  if (!cloudName || !apiKey || !apiSecret) return [];
  try {
    const result = await cloudinary.api.sub_folders(folder);
    const folders = (result as { folders?: Array<{ path: string; name: string }> }).folders ?? [];
    return folders.map((f) => f.name).sort();
  } catch {
    return [];
  }
}

// ── Gecachte öffentliche API ──

/**
 * Listet Bilder aus einem Cloudinary-Ordner (gecacht für 5 Min).
 */
export const getGalleryImages = unstable_cache(
  _fetchGalleryImages,
  ["cloudinary-gallery"],
  { revalidate: CACHE_TTL }
);

/**
 * Listet Unterordner eines Cloudinary-Ordners auf (gecacht für 5 Min).
 */
export const getSubfolders = unstable_cache(
  _fetchSubfolders,
  ["cloudinary-subfolders"],
  { revalidate: CACHE_TTL }
);

/**
 * Holt Bilder aus einem Ordner und gruppiert sie nach Unterordnern (gecacht).
 */
export async function getGalleryImagesBySubfolder(
  folder: string,
  maxResults = 300
): Promise<{ folder: string; images: CloudinaryImage[] }[]> {
  if (!cloudName || !apiKey || !apiSecret) return [];

  try {
    const subfolders = await getSubfolders(folder);

    const foldersToFetch = [folder, ...subfolders.map((sf) => `${folder}/${sf}`)];
    const results = await Promise.all(
      foldersToFetch.map((f) => getGalleryImages(f, maxResults))
    );

    const groups: { folder: string; images: CloudinaryImage[] }[] = [];

    // Stammordner-Bilder (nur direkte, nicht aus Unterordnern)
    const rootImages = results[0].filter((img) => {
      const afterPrefix = img.public_id.slice(`${folder}/`.length);
      return !afterPrefix.includes("/");
    });
    if (rootImages.length > 0) {
      groups.push({ folder: "", images: rootImages });
    }

    // Unterordner-Bilder
    for (let i = 0; i < subfolders.length; i++) {
      const images = results[i + 1];
      if (images.length > 0) {
        groups.push({ folder: subfolders[i], images });
      }
    }

    return groups;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Cloudinary] getGalleryImagesBySubfolder Fehler:", err);
    }
    return [];
  }
}

/**
 * Sortiert Bilder anhand von Tags in eine feste Reihenfolge.
 */
export function sortImagesByTagOrder<T extends { tags?: string[] }>(
  images: T[],
  positionOrder: string[]
): T[] {
  const orderMap = new Map(positionOrder.map((tag, i) => [tag.toLowerCase(), i]));
  return [...images].sort((a, b) => {
    const posA = a.tags?.map((t) => orderMap.get(t.toLowerCase())).find((p) => p !== undefined) ?? positionOrder.length;
    const posB = b.tags?.map((t) => orderMap.get(t.toLowerCase())).find((p) => p !== undefined) ?? positionOrder.length;
    return posA - posB;
  });
}

export type TagGroupConfig = { tag: string; heading: string };

/**
 * Gruppiert Bilder nach dem ersten passenden Tag.
 */
export function groupImagesByTag<T extends { tags?: string[] }>(
  images: T[],
  config: TagGroupConfig[]
): { heading: string; images: T[] }[] {
  const tagToIndex = new Map(config.map((c, i) => [c.tag.toLowerCase(), i]));
  const groups: T[][] = config.map(() => []);
  const rest: T[] = [];

  for (const img of images) {
    const tagIndex = img.tags?.map((t) => tagToIndex.get(t.toLowerCase())).find((i) => i !== undefined);
    if (tagIndex !== undefined) {
      groups[tagIndex].push(img);
    } else {
      rest.push(img);
    }
  }

  const result = config.map((c, i) => ({ heading: c.heading, images: groups[i]! }));
  if (rest.length > 0) {
    result.push({ heading: "Weitere", images: rest });
  }
  return result;
}

/**
 * Gibt den Anzeige-Titel eines Bildes zurück: Cloudinary-Titel, oder erstes Tag als Fallback.
 */
export function getImageCaption(img: CloudinaryImage): string | undefined {
  if (img.title) return img.title;
  if (img.tags && img.tags.length > 0) return img.tags[0];
  return undefined;
}

export { cloudName };
