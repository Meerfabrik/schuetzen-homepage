import Link from "next/link";
import { getAlbumsByDecade } from "@/lib/directus/queries";
import styles from "../page.module.css";

export const metadata = {
  title: "Schützenkönig:innen Galerie",
  description:
    "Bilder der Schützenkönig:innen der St. Sebastianus Schützenbruderschaft Büderich.",
};

export const revalidate = 300;

export default async function SchuetzenkoenigeGaleriePage() {
  const decades = await getAlbumsByDecade("schuetzenkoenige");

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
              {decades.map(({ decade, albums }) => {
                const years = albums.map((a) => a.year!).sort();
                return (
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
                      {albums.length} {albums.length === 1 ? "Album" : "Alben"}
                    </span>
                  </Link>
                );
              })}
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
                Erstelle Alben mit der Kategorie <strong>schuetzenkoenige</strong> im Directus CMS.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
