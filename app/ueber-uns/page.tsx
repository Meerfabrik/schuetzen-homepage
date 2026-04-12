import { getAllAlbumsWithImages, getAllKompanien } from "@/lib/directus/queries";
import VorstandCards from "@/components/VorstandCards";
import { SectionTitleFadeIn } from "@/components/SectionTitleFadeIn";
import styles from "./page.module.css";

export const metadata = {
  title: "Über uns",
  description: "Vorstand, Kompanien und Geschichte der St. Sebastianus Schützenbruderschaft Büderich.",
};

export const revalidate = 300; // 5 Minuten

export default async function UeberUnsPage() {
  const [albumsWithImages, kompanien] = await Promise.all([
    getAllAlbumsWithImages("vorstand"),
    getAllKompanien(),
  ]);

  const hasVorstand = albumsWithImages.some((a) => a.images.length > 0);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Wer wir sind</div>
        <h1>Über uns</h1>
        <p>Vorstand, Kompanien und die Geschichte unserer Bruderschaft seit 1567.</p>
      </div>

      <section className="section">
        <div className="container">
          {hasVorstand && (
            <div style={{ marginTop: "2rem" }}>
              <SectionTitleFadeIn
                title="Der Vorstand der Bruderschaft"
                subtitle="Vorstand und Ehrenrat unserer Bruderschaft"
              />
              {albumsWithImages
                .filter(({ images }) => images.length > 0)
                .map(({ album, images }) => (
                  <VorstandCards
                    key={album.id}
                    heading={album.title}
                    images={images.map((img) => ({
                      public_id: String(img.id),
                      thumbUrl: img.thumbUrl,
                      fullUrl: img.fullUrl,
                      title: img.title ?? undefined,
                    }))}
                    showAccentLine
                  />
                ))}
            </div>
          )}

          {kompanien.length > 0 && (
            <div style={{ marginTop: "4rem" }}>
              <SectionTitleFadeIn
                title="Unsere Kompanien"
                subtitle="von 1900 bis 2021 – Tradition und Jugendlichkeit – Schützenwesen verbindet!"
              />
              <div className={styles.kompanienGrid}>
                {kompanien.map((k) => (
                  <div key={k.name} className={`${styles.kompanie}${k.hinweis ? ` ${styles.kompaniePaused}` : ""}`}>
                    {k.webseite ? (
                      <a href={k.webseite} target="_blank" rel="noopener noreferrer" className={styles.kompanieLink}>
                        <span className={styles.kompanieIcon}>⚔</span>
                        {k.name}
                        <span className={styles.kompanieLinkIcon}>↗</span>
                      </a>
                    ) : (
                      <span>
                        <span className={styles.kompanieIcon}>⚔</span>
                        {k.name}
                      </span>
                    )}
                    {k.hinweis && <span className={styles.kompanieNote}>{k.hinweis}</span>}
                    {k.hauptmann && <span className={styles.kompanieMeta}>👤 {k.hauptmann}</span>}
                    {k.adresse && <span className={styles.kompanieMeta}>📍 {k.adresse}</span>}
                    {k.webseite && (
                      <a href={k.webseite} target="_blank" rel="noopener noreferrer" className={styles.kompanieUrl}>
                        🔗 {k.webseite.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.kompanienInfo}>
                <p className={styles.kompanienInfoLead}>
                  In den vorstehenden Kompanien und Gesellschaften sind rund 650 Schützen organisiert. Hinzu kommen noch
                  Einzelmitglieder der Bruderschaft, die keiner Kompanie oder Gesellschaft angehören.
                </p>
                <p>
                  Kompanien mit einem Link öffnen ihre eigene Webseite in einem neuen Fenster. Bei Interesse an einer
                  Mitgliedschaft wenden Sie sich gerne an die Kontaktadresse im Impressum oder direkt an die auf den
                  jeweiligen Webseiten angegebenen Kontaktadressen.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
