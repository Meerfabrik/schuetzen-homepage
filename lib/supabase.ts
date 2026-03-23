import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET = "schuetzenfest-media";

/** Cache-Dauer in Sekunden (5 Minuten) */
const CACHE_TTL = 300;

/** Mapping: Code-interner Ordnername → Supabase-Ordnername */
const FOLDER_MAP: Record<string, string> = {
  "ehrenkoenig-gallery": "ehrenkoenige-gallery",
  "jungschuetzen-gallery": "jungkonige-gallery",
  historiengallery: "historien-gallery",
  _kein_jahr: "_kein_jahr",
  galerie: "galerie",
  hero: "hero",
  Koenigsgallerie: "koenige-gallery",
  vorstandbilder: "vorstandbilder",
  samples: "samples",
  "schuetzenkoenige-gallery": "koenige-gallery",
};

function resolveFolder(folder: string): string {
  return FOLDER_MAP[folder] ?? folder;
}

export type GalleryImage = {
  public_id: string;
  url: string;
  title?: string;
  /** Aus Ordnernamen abgeleitet (z. B. "gf", "vs", "ehren") */
  tags?: string[];
};

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"];

function isImageFile(name: string): boolean {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTENSIONS.includes(ext);
}

/** Leitet einen lesbaren Titel aus dem Dateinamen ab */
export function titleFromFilename(name: string): string {
  const withoutExt = name.replace(/\.[^.]+$/, "");
  return withoutExt
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Erzeugt die öffentliche URL für eine Datei im Bucket */
function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// ── Interne (ungecachte) API-Aufrufe ──

async function _fetchGalleryImages(folder: string): Promise<GalleryImage[]> {
  const resolved = resolveFolder(folder);

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(resolved, { limit: 1000, sortBy: { column: "name", order: "asc" } });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Supabase] Fehler beim Laden der Bilder:", error.message);
    }
    return [];
  }

  return (data ?? [])
    .filter((f) => f.name && isImageFile(f.name) && !f.name.startsWith("."))
    .map((f) => {
      const path = `${resolved}/${f.name}`;
      return {
        public_id: path,
        url: getPublicUrl(path),
        title: titleFromFilename(f.name),
      };
    });
}

async function _fetchSubfolders(folder: string): Promise<string[]> {
  const resolved = resolveFolder(folder);

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(resolved, { limit: 200 });

  if (error) return [];

  return (data ?? [])
    .filter((f) => f.id === null) // Ordner haben keine id
    .map((f) => f.name)
    .sort();
}

// ── Gecachte öffentliche API ──

export const getGalleryImages = unstable_cache(
  _fetchGalleryImages,
  ["supabase-gallery"],
  { revalidate: CACHE_TTL }
);

export const getSubfolders = unstable_cache(
  _fetchSubfolders,
  ["supabase-subfolders"],
  { revalidate: CACHE_TTL }
);

/**
 * Holt Bilder aus einem Ordner und gruppiert sie nach Unterordnern.
 */
export async function getGalleryImagesBySubfolder(
  folder: string,
  maxResults = 300
): Promise<{ folder: string; images: GalleryImage[] }[]> {
  const subfolders = await getSubfolders(folder);
  const resolved = resolveFolder(folder);

  const foldersToFetch = [
    folder,
    ...subfolders.map((sf) => `${resolved}/${sf}`),
  ];

  const results = await Promise.all(
    foldersToFetch.map((f) => getGalleryImages(f))
  );

  const groups: { folder: string; images: GalleryImage[] }[] = [];

  // Stammordner-Bilder
  if (results[0].length > 0) {
    groups.push({ folder: "", images: results[0].slice(0, maxResults) });
  }

  // Unterordner-Bilder
  for (let i = 0; i < subfolders.length; i++) {
    const images = results[i + 1];
    if (images.length > 0) {
      groups.push({ folder: subfolders[i], images: images.slice(0, maxResults) });
    }
  }

  return groups;
}

// ── Hilfsfunktionen für Gruppierung (Vorstand etc.) ──

export type TagGroupConfig = { tag: string; heading: string };

/**
 * Gruppiert Bilder nach Unterordner-Präfix im public_id.
 * Für Vorstandbilder z. B.: vorstandbilder/gf/Name.jpg → tag "gf"
 */
export function groupImagesBySubfolderTag(
  images: GalleryImage[],
  baseFolder: string,
  config: TagGroupConfig[]
): { heading: string; images: GalleryImage[] }[] {
  const resolved = resolveFolder(baseFolder);
  const tagSet = new Map(config.map((c, i) => [c.tag.toLowerCase(), i]));
  const groups: GalleryImage[][] = config.map(() => []);
  const rest: GalleryImage[] = [];

  for (const img of images) {
    // Extrahiere den Unterordner aus dem Pfad: vorstandbilder/gf/Name.jpg → "gf"
    const afterBase = img.public_id.slice(`${resolved}/`.length);
    const slashIdx = afterBase.indexOf("/");
    const subfolder = slashIdx > 0 ? afterBase.slice(0, slashIdx).toLowerCase() : null;

    const idx = subfolder !== null ? tagSet.get(subfolder) : undefined;
    if (idx !== undefined) {
      groups[idx].push(img);
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
 * Holt alle Bilder inkl. Unterordner flach als eine Liste.
 */
export async function getAllImagesFlat(folder: string): Promise<GalleryImage[]> {
  const subfolders = await getSubfolders(folder);
  const resolved = resolveFolder(folder);

  const foldersToFetch = [
    folder,
    ...subfolders.map((sf) => `${resolved}/${sf}`),
  ];

  const results = await Promise.all(
    foldersToFetch.map((f) => getGalleryImages(f))
  );

  return results.flat();
}

export function getImageCaption(img: GalleryImage): string | undefined {
  return img.title;
}
