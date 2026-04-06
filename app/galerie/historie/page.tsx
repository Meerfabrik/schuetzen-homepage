import { getAllAlbumsWithImages } from "@/lib/directus/queries";
import GalerieWithNav from "@/components/GalerieNav";

export const metadata = {
  title: "Historien Galerie",
  description:
    "Historische Bilder und Fotos der St. Sebastianus Schützenbruderschaft Büderich.",
};

export const revalidate = 300;

export default async function HistorienGaleriePage() {
  const albumsWithImages = await getAllAlbumsWithImages("historie");

  const sections = albumsWithImages.map(({ album, images }) => ({
    heading: album.title,
    images: images.map((img) => ({
      public_id: String(img.id),
      thumbUrl: img.thumbUrl,
      fullUrl: img.fullUrl,
      title: img.title ?? undefined,
    })),
  }));

  const hasImages = sections.some((s) => s.images.length > 0);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-badge">Fotos & Erinnerungen</span>
          <h1>Historien Galerie</h1>
          <p>Historische Eindrücke aus dem Leben unserer Bruderschaft.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
        <div className="container">
          {hasImages ? (
            <GalerieWithNav sections={sections} />
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
                Noch keine Bilder in der Historien Galerie
              </strong>
              <p style={{ fontSize: "0.95rem", maxWidth: "480px", margin: "0 auto" }}>
                Erstelle Alben mit der Kategorie <strong>historie</strong> im Directus CMS
                und lade dort Bilder hoch.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
