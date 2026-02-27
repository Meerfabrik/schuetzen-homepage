import { getGalleryImages, getCloudinaryImageUrl } from "@/lib/cloudinary";
import GalerieGrid from "@/components/GalerieGrid";
import styles from "./page.module.css";

export const metadata = {
  title: "Galerie",
  description:
    "Bilder und Fotos der St. Sebastianus Schützenbruderschaft Büderich – Schützenfeste, Historien und Bruderschaftsleben.",
};

export const revalidate = 300; // 5 Minuten

export default async function GaleriePage() {
  const rawImages = await getGalleryImages("galerie", 100);

  const images = rawImages.map((img) => ({
    public_id: img.public_id,
    thumbUrl: getCloudinaryImageUrl(img.public_id, {
      width: 560,
      height: 420,
      crop: "limit",
    }),
    fullUrl: getCloudinaryImageUrl(img.public_id, {
      width: 1600,
      crop: "limit",
    }),
    title: img.title,
  }));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-badge">Fotos & Erinnerungen</span>
          <h1>Galerie</h1>
          <p>
            Eindrücke von Schützenfesten, König:innen und dem Leben unserer
            Bruderschaft.
          </p>
        </div>
      </section>

      <section className={`section ${styles.section}`}>
        <div className="container">
          
          {images.length > 0 ? (
            <GalerieGrid images={images} />
          ) : (
            <div className={styles.empty}>
              <strong>Noch keine Bilder in der Galerie</strong>
              <p>
                Richte in Cloudinary einen Ordner <strong>galerie</strong> ein
                und lade dort Bilder hoch. Trage in der .env.local die Werte{" "}
                <code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code>,{" "}
                <code>CLOUDINARY_API_KEY</code> und{" "}
                <code>CLOUDINARY_API_SECRET</code> ein (Cloudinary Dashboard →
                Einstellungen → API-Keys).
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
