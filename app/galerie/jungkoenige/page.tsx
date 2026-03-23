import Link from "next/link";
import { getSubfolders } from "@/lib/supabase";
import styles from "../page.module.css";

export const metadata = {
  title: "Jungkönig:innen Galerie",
  description:
    "Bilder der Jungkönig:innen der St. Sebastianus Schützenbruderschaft Büderich.",
};

export const revalidate = 300;

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
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([decade, years]) => ({ decade, years }));
}

export default async function JungkoenigeGaleriePage() {
  const subfolders = await getSubfolders("jungschuetzen-gallery");
  const decades = groupByDecade(subfolders);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-badge">Fotos & Erinnerungen</span>
          <h1>Jungkönig:innen Galerie</h1>
          <p>Unsere Jungkönig:innen im Bild.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
        <div className="container">
          {decades.length > 0 ? (
            <div className={styles.decadeGrid}>
              {decades.map(({ decade, years }) => (
                <Link
                  key={decade}
                  href={`/galerie/jungkoenige/${decade}`}
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
            <div className={styles.empty}>
              <strong>Noch keine Bilder in der Jungkönig:innen Galerie</strong>
              <p>
                Lade Bilder in den Supabase-Ordner <strong>jungkonige-gallery</strong> hoch.
                Lege Unterordner nach Jahren an (z.B. &quot;2000&quot;, &quot;2001&quot;).
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
