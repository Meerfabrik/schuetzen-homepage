import Link from "next/link";
import { getAlbumsByDecade } from "@/lib/directus/queries";
import styles from "../page.module.css";

export const metadata = {
  title: "Jungkönig:innen Galerie",
  description:
    "Bilder der Jungkönig:innen der St. Sebastianus Schützenbruderschaft Büderich.",
};

export const revalidate = 300;

export default async function JungkoenigeGaleriePage() {
  const decades = await getAlbumsByDecade("jungkoenige");

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
              {decades.map(({ decade, albums }) => {
                const years = albums.map((a) => a.year!).sort();
                return (
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
                      {albums.length} {albums.length === 1 ? "Album" : "Alben"}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={styles.empty}>
              <strong>Noch keine Bilder in der Jungkönig:innen Galerie</strong>
              <p>
                Erstelle Alben mit der Kategorie <strong>jungkoenige</strong> im Directus CMS
                und lade dort Bilder hoch.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
