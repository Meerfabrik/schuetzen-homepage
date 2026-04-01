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

export default async function DownloadPage() {
  const downloads = await getAllDownloads();

  // Nach Kategorie gruppieren
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
                  {dateien.map((datei) => (
                    <a key={datei.id} href={datei.fileUrl}
                      className={styles.dateiCard} target="_blank" rel="noopener noreferrer" download>
                      <div className={styles.dateiIcon}>📄</div>
                      <div className={styles.dateiInfo}>
                        <div className={styles.dateiName}>{datei.name}</div>
                      </div>
                      <div className={styles.dateiTyp}>PDF ↓</div>
                    </a>
                  ))}
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
