#!/usr/bin/env node

/**
 * Migration: Supabase → Directus
 *
 * Liest alle Bilder aus Supabase Storage, erstellt Alben in Directus
 * und lädt die Bilder über die Directus API hoch.
 *
 * Features:
 *   - Überspringt bereits existierende Alben (anhand Slug)
 *   - Überspringt bereits migrierte Bilder (anhand Dateiname im Album)
 *   - Retry mit Exponential Backoff bei Netzwerkfehlern
 *
 * Verwendung:
 *   node scripts/migrate-supabase-to-directus.mjs
 *
 * Benötigte Umgebungsvariablen:
 *   NEXT_PUBLIC_SUPABASE_URL   - Supabase Projekt-URL
 *   SUPABASE_SERVICE_ROLE_KEY  - Supabase Service-Key
 *   DIRECTUS_URL               - z.B. https://cms.meerfabrik.de
 *   DIRECTUS_TOKEN             - Directus Static Token
 */

import { createClient } from "@supabase/supabase-js";

// ── Konfiguration ──

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DIRECTUS_URL = process.env.DIRECTUS_URL || "https://cms.meerfabrik.de";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
const BUCKET = "schuetzenfest-media";
const MAX_RETRIES = 4;

if (!SUPABASE_URL || !SUPABASE_KEY || !DIRECTUS_TOKEN) {
  console.error("Fehlende Umgebungsvariablen. Benötigt:");
  console.error("  NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, DIRECTUS_TOKEN");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Mapping: Supabase-Ordner → Directus-Kategorie
const FOLDER_TO_CATEGORY = {
  "ehrenkoenige-gallery": "ehrenkoenige",
  "koenige-gallery": "schuetzenkoenige",
  "jungkonige-gallery": "jungkoenige",
  "historien-gallery": "historie",
  "vorstandbilder": "vorstand",
};

// Unterordner-Titel für Vorstand
const VORSTAND_TITLES = {
  gf: "Geschäftsführender Vorstand",
  vs: "Vorstand",
  ehren: "Ehrenrat",
};

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"];

function isImage(name) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTENSIONS.includes(ext);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function titleFromFilename(name) {
  return name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Retry-Wrapper ──

async function withRetry(fn, label) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isRetryable = /bad gateway|502|503|504|timeout|econnreset|fetch failed/i.test(err.message);
      if (!isRetryable || attempt === MAX_RETRIES) throw err;
      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s, 16s
      console.log(`    ⏳ ${label}: Retry ${attempt}/${MAX_RETRIES} in ${delay / 1000}s (${err.message})`);
      await sleep(delay);
    }
  }
}

// ── Directus API Helfer ──

async function directusFetch(path, options = {}) {
  const url = `${DIRECTUS_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Directus ${options.method || "GET"} ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

/** Prüft ob ein Album mit diesem Slug bereits existiert. Gibt das Album zurück oder null. */
async function findAlbumBySlug(slug) {
  const result = await directusFetch(
    `/items/schuetzen_gallery_albums?filter[slug][_eq]=${encodeURIComponent(slug)}&fields=id,title,slug&limit=1`
  );
  return result.data.length > 0 ? result.data[0] : null;
}

/** Holt die Dateinamen aller Bilder in einem Album (um Duplikate zu erkennen). */
async function getExistingImageFilenames(albumId) {
  const result = await directusFetch(
    `/items/schuetzen_gallery_images?filter[album][_eq]=${albumId}&fields=id,image&limit=-1`
  );
  const filenames = new Set();
  for (const item of result.data) {
    // Lade den Dateinamen der verknüpften Datei
    try {
      const fileResult = await directusFetch(`/files/${item.image}?fields=filename_download`);
      if (fileResult.data?.filename_download) {
        filenames.add(fileResult.data.filename_download);
      }
    } catch {
      // Datei nicht gefunden, ignorieren
    }
  }
  return filenames;
}

async function getOrCreateAlbum(title, slug, category, year = null, sort = 0) {
  const existing = await findAlbumBySlug(slug);
  if (existing) {
    console.log(`  ⏭ Album existiert bereits: "${existing.title}" (ID: ${existing.id})`);
    return existing;
  }

  const body = { title, slug, category, year, sort, status: "published" };
  const result = await directusFetch("/items/schuetzen_gallery_albums", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log(`  ✓ Album erstellt: "${title}" (ID: ${result.data.id})`);
  return result.data;
}

async function uploadFileToDirectus(fileBuffer, filename, mimeType) {
  const formData = new FormData();
  const blob = new Blob([fileBuffer], { type: mimeType });
  formData.append("file", blob, filename);

  const res = await fetch(`${DIRECTUS_URL}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload fehlgeschlagen für ${filename}: ${res.status} ${text}`);
  }
  const result = await res.json();
  return result.data;
}

async function createGalleryImage(albumId, fileId, title, sort) {
  const body = {
    album: albumId,
    image: fileId,
    title: title || null,
    sort,
  };
  await directusFetch("/items/schuetzen_gallery_images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ── Supabase Helfer (mit Retry) ──

async function listFolder(folder) {
  return withRetry(async () => {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(folder, { limit: 1000, sortBy: { column: "name", order: "asc" } });
    if (error) throw new Error(`Supabase list ${folder}: ${error.message}`);
    return data ?? [];
  }, `list ${folder}`);
}

async function listSubfolders(folder) {
  const items = await listFolder(folder);
  return items.filter((f) => f.id === null).map((f) => f.name).sort();
}

async function listImages(folder) {
  const items = await listFolder(folder);
  return items.filter((f) => f.name && isImage(f.name) && !f.name.startsWith("."));
}

async function downloadFile(path) {
  return withRetry(async () => {
    const { data, error } = await supabase.storage.from(BUCKET).download(path);
    if (error) throw new Error(`Download ${path}: ${error.message}`);
    return data;
  }, `download ${path}`);
}

function getMimeType(filename) {
  const ext = filename.split(".").pop()?.toLowerCase();
  const map = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };
  return map[ext] || "application/octet-stream";
}

// ── Migration ──

async function migrateFolder(supabaseFolder, category) {
  console.log(`\n📁 Migriere ${supabaseFolder} → Kategorie: ${category}`);

  const subfolders = await listSubfolders(supabaseFolder);
  const rootImages = await listImages(supabaseFolder);

  // Fall 1: Vorstandbilder (gf, vs, ehren Unterordner)
  if (category === "vorstand") {
    let albumSort = 0;
    for (const sf of subfolders) {
      const title = VORSTAND_TITLES[sf] || sf;
      const slug = slugify(`vorstand-${sf}`);
      const album = await getOrCreateAlbum(title, slug, category, null, albumSort++);
      const images = await listImages(`${supabaseFolder}/${sf}`);
      await migrateImages(images, `${supabaseFolder}/${sf}`, album.id);
    }
    if (rootImages.length > 0) {
      const album = await getOrCreateAlbum("Vorstand Allgemein", "vorstand-allgemein", category, null, albumSort);
      await migrateImages(rootImages, supabaseFolder, album.id);
    }
    return;
  }

  // Fall 2: Jahres-Unterordner (ehrenkoenige, schuetzenkoenige, jungkoenige)
  if (subfolders.length > 0 && subfolders.some((sf) => /^\d{4}$/.test(sf))) {
    for (const sf of subfolders) {
      const year = parseInt(sf, 10);
      if (isNaN(year)) continue;
      const title = `${year}`;
      const slug = slugify(`${category}-${year}`);
      const album = await getOrCreateAlbum(title, slug, category, year);
      const images = await listImages(`${supabaseFolder}/${sf}`);
      await migrateImages(images, `${supabaseFolder}/${sf}`, album.id);
    }
    if (rootImages.length > 0) {
      const album = await getOrCreateAlbum("Allgemein", slugify(`${category}-allgemein`), category);
      await migrateImages(rootImages, supabaseFolder, album.id);
    }
    return;
  }

  // Fall 3: Unterordner ohne Jahreszahlen (z.B. Historie)
  if (subfolders.length > 0) {
    let albumSort = 0;
    for (const sf of subfolders) {
      const title = titleFromFilename(sf);
      const slug = slugify(`${category}-${sf}`);
      const album = await getOrCreateAlbum(title, slug, category, null, albumSort++);
      const images = await listImages(`${supabaseFolder}/${sf}`);
      await migrateImages(images, `${supabaseFolder}/${sf}`, album.id);
    }
    if (rootImages.length > 0) {
      const album = await getOrCreateAlbum("Allgemein", slugify(`${category}-allgemein`), category, null, albumSort);
      await migrateImages(rootImages, supabaseFolder, album.id);
    }
    return;
  }

  // Fall 4: Nur Bilder, keine Unterordner
  if (rootImages.length > 0) {
    const title = supabaseFolder.replace(/-/g, " ");
    const slug = slugify(category);
    const album = await getOrCreateAlbum(title, slug, category);
    await migrateImages(rootImages, supabaseFolder, album.id);
  }
}

async function migrateImages(imageFiles, folder, albumId) {
  // Lade bestehende Dateinamen um Duplikate zu erkennen
  const existingFilenames = await getExistingImageFilenames(albumId);
  let sort = existingFilenames.size; // Sortierung nach existierenden fortsetzen
  let skipped = 0;

  for (const file of imageFiles) {
    if (existingFilenames.has(file.name)) {
      skipped++;
      continue;
    }

    const path = `${folder}/${file.name}`;
    const title = titleFromFilename(file.name);
    try {
      process.stdout.write(`    ↑ ${file.name} ...`);

      const blob = await downloadFile(path);
      const buffer = await blob.arrayBuffer();

      const directusFile = await withRetry(
        () => uploadFileToDirectus(buffer, file.name, getMimeType(file.name)),
        `upload ${file.name}`
      );

      await withRetry(
        () => createGalleryImage(albumId, directusFile.id, title, sort++),
        `link ${file.name}`
      );

      console.log(` ✓`);
    } catch (err) {
      console.log(` ✗ ${err.message}`);
    }
  }

  if (skipped > 0) {
    console.log(`    ⏭ ${skipped} Bilder übersprungen (bereits migriert)`);
  }
}

// ── Hauptprogramm ──

async function main() {
  console.log("🚀 Supabase → Directus Migration (mit Skip + Retry)");
  console.log(`   Supabase: ${SUPABASE_URL} / Bucket: ${BUCKET}`);
  console.log(`   Directus: ${DIRECTUS_URL}`);
  console.log(`   Retries: ${MAX_RETRIES}x mit Exponential Backoff`);
  console.log("");

  for (const [supabaseFolder, category] of Object.entries(FOLDER_TO_CATEGORY)) {
    try {
      await migrateFolder(supabaseFolder, category);
    } catch (err) {
      console.error(`\n❌ Fehler bei ${supabaseFolder}: ${err.message}`);
    }
  }

  console.log("\n✅ Migration abgeschlossen!");
}

main().catch((err) => {
  console.error("Fataler Fehler:", err);
  process.exit(1);
});
