import { getAllDownloads } from "@/lib/sanity/queries";
import type { SanityDownload } from "@/lib/sanity/types";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "Download",
  description: "Dokumente und Formulare der Schützenbruderschaft Büderich.",
};

const KATEGORIE_LABELS: Record<string, string> = {
  mitgliedschaft: "Mitgliedschaft",
  satzung: "Satzung & Ordnungen",
  veranstaltungen: "Veranstaltungen",
  sonstiges: "Sonstiges",
};

export default async function DownloadPage() {
  const downloads = await getAllDownloads();

  // Nach Kategorie gruppieren
  const grouped = downloads.reduce<Record<string, SanityDownload[]>>((acc, d) => {
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
        <div className="container" style={{ maxWidth: "800px" }}>
          {Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([kat, dateien]) => (
              <div key={kat} className={styles.kategorie}>
                <h2 className="section-title">{KATEGORIE_LABELS[kat] ?? kat}</h2>
                <div className={styles.dateienListe}>
                  {dateien.map((datei) => (
                    <a key={datei._id} href={datei.datei.asset.url}
                      className={styles.dateiCard} target="_blank" rel="noopener noreferrer" download>
                      <div className={styles.dateiIcon}>📄</div>
                      <div className={styles.dateiInfo}>
                        <div className={styles.dateiName}>{datei.name}</div>
                        {datei.beschreibung && (
                          <div className={styles.dateiBeschreibung}>{datei.beschreibung}</div>
                        )}
                      </div>
                      <div className={styles.dateiTyp}>PDF ↓</div>
                    </a>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "var(--text-muted)" }}>
              Noch keine Dokumente vorhanden. Dateien können im{" "}
              <a href="/studio" style={{ color: "var(--green-light)", fontWeight: 600 }}>
                CMS unter /studio
              </a>{" "}
              hochgeladen werden.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
