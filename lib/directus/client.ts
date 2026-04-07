import { createDirectus, rest, staticToken } from "@directus/sdk";

const directus = createDirectus("https://cms.meerfabrik.de")
  .with(staticToken(process.env.DIRECTUS_TOKEN!))
  .with(rest());

export default directus;

/** Bild-URL aus einer Directus-File-UUID generieren. */
export function assetUrl(fileId: string, width?: number, height?: number, fit: string = "cover"): string {
  const params = new URLSearchParams();
  if (width) params.set("width", String(width));
  if (height) params.set("height", String(height));
  params.set("fit", fit);
  const qs = params.toString();
  return `https://cms.meerfabrik.de/assets/${fileId}${qs ? `?${qs}` : ""}`;
}
