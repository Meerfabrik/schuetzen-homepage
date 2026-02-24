import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

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

/**
 * Listet Bilder aus einem Cloudinary-Ordner (z. B. "galerie", "vorstandsbilder").
 * Erfordert CLOUDINARY_API_KEY und CLOUDINARY_API_SECRET.
 * Unterstützt Dynamic Asset Folders (by_asset_folder) und Fixed Folder Mode (prefix).
 */
export async function getGalleryImages(
  folder = "galerie",
  maxResults = 100
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
    // 1. Dynamic Asset Folders: API by_asset_folder (Ordner wie in der Media Library, z. B. "galerie")
    const api = cloudinary.api as unknown as { resources_by_asset_folder?: (folder: string, options: Record<string, unknown>) => Promise<Record<string, unknown>> };
    if (typeof api.resources_by_asset_folder === "function") {
      try {
        const result = await api.resources_by_asset_folder(folder, opts);
        const list = getResourceList(result);
        if (list.length > 0) {
          return normalizeResources(list);
        }
      } catch {
        // Fixed Folder Mode – by_asset_folder nicht unterstützt, Fallback unten
      }
    }

    // 2. Fixed Folder Mode: prefix im public_id (z. B. "galerie/" oder "galerie/vorstandsbilder/")
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
    return normalized;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Cloudinary] getGalleryImages Fehler:", err);
    }
    return [];
  }
}

/**
 * Sortiert Bilder anhand von Tags in eine feste Reihenfolge.
 * positionOrder = z. B. ["Präsident", "Vizepräsident", "Schriftführer", …].
 * Ein Bild mit Tag "Präsident" kommt vor einem mit "Vizepräsident".
 * Bilder ohne passenden Tag landen am Ende.
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
 * config = z. B. [{ tag: "gf", heading: "Geschäftsführender Vorstand" }, …].
 * Liefert Abschnitte in dieser Reihenfolge; Bilder ohne passenden Tag in letztem Abschnitt "Weitere".
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

export { cloudName };
