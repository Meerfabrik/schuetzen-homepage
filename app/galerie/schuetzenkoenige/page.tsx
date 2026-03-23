import Link from "next/link";
import { getSubfolders } from "@/lib/supabase";
import styles from "../page.module.css";

export const metadata = {
  title: "Schützenkönig:innen Galerie",
  description:
    "Bilder der Schützenkönig:innen der St. Sebastianus Schützenbruderschaft Büderich.",
};

export const revalidate = 300;

/** Gruppiert Jahresordner nach Jahrzehnt: "1990" → "1990er" */
function groupByDecade(years: string[]): { decade: string; years: string[] }[] {
  const map = new Map<string, string[]>();
  for (const y of years) {
    const num = parseInt(y, 10);
    if (isNaN(num)) continue;
    const decade = `${Math.floor(num / 10) * 10}er`;
    const list = map.get(decade) ?? [];
    list.push(y);
    map.set(decade, list);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0])) // neueste zuerst
    .map(([decade, years]) => ({ decade, years }));
}

export default async function SchuetzenkoenigeGaleriePage() {
  const subfolders = await getSubfolders("schuetzenkoenige-gallery");
  const decades = groupByDecade(subfolders);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-badge">Fotos & Erinnerungen</span>
          <h1>Schützenkönig:innen Galerie</h1>
          <p>Unsere Schützenkönig:innen im Bild.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
        <div className="container">
          {decades.length > 0 ? (
            <div className={styles.decadeGrid}>
              {decades.map(({ decade, years }) => (
                <Link
                  key={decade}
                  href={`/galerie/schuetzenkoenige/${decade}`}
                  className={styles.decadeCard}
                >
                  <span className={styles.decadeTitle}>{decade}</span>
                  <span className={styles.decadeYears}>
                    {years[0]} – {years[years.length - 1]}
                  </span>
                  <span className={styles.decadeCount}>
                    {years.length} {years.length === 1 ? "Jahr" : "Jahre"}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 1.5rem",
                background: "var(--cream-dark)",
                borderRadius: "var(--radius)",
                border: "2px dashed var(--green-mid)",
                color: "var(--text-muted)",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "var(--green)",
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                }}
              >
                Noch keine Bilder in der Schützenkönig:innen Galerie
              </strong>
              <p style={{ fontSize: "0.95rem", maxWidth: "480px", margin: "0 auto" }}>
                Lade Bilder in den Supabase-Ordner <strong>koenige-gallery</strong> hoch.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
