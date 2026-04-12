import { FileText, Download as DownloadIcon } from "lucide-react";
import { getAllDownloads } from "@/lib/directus/queries";
import type { Download } from "@/lib/directus/types";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "Download",
  description: "Dokumente und Formulare der Schützenbruderschaft Büderich.",
};

const KATEGORIE_LABELS: Record<string, string> = {
  programme: "Programme",
  formulare: "Formulare",
  "pläne": "Pläne",
};

function formatFileSize(bytes: number | null): string | null {
  if (bytes == null || !Number.isFinite(bytes) || bytes <= 0) return null;
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1).replace(".", ",")} MB`;
  const kb = bytes / 1024;
  return `${Math.round(kb)} KB`;
}

function fileTypeLabel(mime: string | null, url: string): string {
  if (mime) {
    if (mime.includes("pdf")) return "PDF";
    if (mime.includes("word")) return "DOCX";
    if (mime.includes("excel") || mime.includes("spreadsheet")) return "XLSX";
    if (mime.includes("image/")) return mime.split("/")[1].toUpperCase();
  }
  const ext = url.split(".").pop();
  return ext && ext.length <= 5 ? ext.toUpperCase() : "DATEI";
}

export default async function DownloadPage() {
  const downloads = await getAllDownloads();

  const grouped = downloads.reduce<Record<string, Download[]>>((acc, d) => {
    if (!acc[d.kategorie]) acc[d.kategorie] = [];
    acc[d.kategorie].push(d);
    return acc;
  }, {});

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Formulare & Dokumente</div>
        <h1>Download</h1>
        <p>Alle wichtigen Dokumente und Formulare zum Herunterladen.</p>
      </div>

      <section className="section">
        <div className={`container ${styles.contentNarrow}`}>
          {Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([kat, dateien]) => (
              <div key={kat} className={styles.kategorie}>
                <h2 className="section-title section-title-left">{KATEGORIE_LABELS[kat] ?? kat}</h2>
                <div className={styles.dateienListe}>
                  {dateien.map((datei) => {
                    const size = formatFileSize(datei.fileSize);
                    const typeLabel = fileTypeLabel(datei.fileType, datei.fileUrl);
                    return (
                      <a key={datei.id} href={datei.fileUrl}
                        className={styles.dateiCard} target="_blank" rel="noopener noreferrer" download>
                        <div className={styles.dateiIcon}>
                          <FileText size={22} strokeWidth={1.75} />
                        </div>
                        <div className={styles.dateiInfo}>
                          <div className={styles.dateiName}>{datei.name}</div>
                          <div className={styles.dateiMeta}>
                            {typeLabel}
                            {size ? ` · ${size}` : ""}
                          </div>
                        </div>
                        <div className={styles.dateiAction}>
                          <DownloadIcon size={18} strokeWidth={2} />
                          <span>Herunterladen</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "var(--text-muted)" }}>
              Noch keine Dokumente vorhanden.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
