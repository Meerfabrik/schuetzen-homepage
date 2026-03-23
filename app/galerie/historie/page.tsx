import { getGalleryImagesBySubfolder, getImageCaption } from "@/lib/supabase";
import GalerieWithNav from "@/components/GalerieNav";

export const metadata = {
  title: "Historien Galerie",
  description:
    "Historische Bilder und Fotos der St. Sebastianus Schützenbruderschaft Büderich.",
};

export const revalidate = 300;

export default async function HistorienGaleriePage() {
  const groups = await getGalleryImagesBySubfolder("historiengallery", 100);

  const sections = groups.map((group) => ({
    heading: group.folder || "Allgemein",
    images: group.images.map((img) => ({
      public_id: img.public_id,
      thumbUrl: img.url,
      fullUrl: img.url,
      title: getImageCaption(img),
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
                Lade Bilder in den Supabase-Ordner <strong>historien-gallery</strong> hoch.
                Du kannst Unterordner anlegen (z.B. &quot;1950er&quot;, &quot;1960er&quot;), um die Bilder
                nach Zeiträumen zu gruppieren.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
