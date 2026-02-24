import { getGalleryImages, getCloudinaryImageUrl, groupImagesByTag } from "@/lib/cloudinary";
import GalerieGrid from "@/components/GalerieGrid";
import styles from "./page.module.css";

export const metadata = {
  title: "Über uns",
  description: "Vorstand, Kompanien und Geschichte der St. Sebastianus Schützenbruderschaft Büderich.",
};

export const revalidate = 300; // 5 Minuten

/** Tags in Cloudinary → Zwischenüberschrift (Reihenfolge = Anzeige-Reihenfolge) */
const VORSTAND_BILDER_GRUPPEN = [
  { tag: "gf", heading: "Geschäftsführender Vorstand" },
  
  { tag: "vs", heading: "Vorstand" },
  { tag: "ehren", heading: "Ehrenrat" },
];

const KOMPANIEN = [
  "1. Kompanie",
  "2. Kompanie",
  "3. Kompanie",
  "4. Kompanie",
  "Jungschützen",
];

function mapToGalerieImages(images: Awaited<ReturnType<typeof getGalleryImages>>) {
  return images.map((img) => ({
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
}

export default async function UeberUnsPage() {
  const rawImages = await getGalleryImages("vorstandbilder", 50);
  const gruppen = groupImagesByTag(rawImages, VORSTAND_BILDER_GRUPPEN);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Wer wir sind</div>
        <h1>Über uns</h1>
        <p>Vorstand, Kompanien und die Geschichte unserer Bruderschaft seit 1567.</p>
      </div>

      <section className="section">
        <div className="container">
          {rawImages.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <h2 className="section-title">Der Vorstand der Bruderschaft</h2>
              <p className="section-subtitle"> </p>
              {gruppen.map(({ heading, images }) => (
                <div key={heading} className={styles.bilderGruppe}>
                  <h3 className={styles.gruppenTitel}>{heading}</h3>
                  <GalerieGrid images={mapToGalerieImages(images)} />
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: "4rem" }}>
            <h2 className="section-title">Kompanien</h2>
            <p className="section-subtitle">Unsere aktiven Kompanien</p>
            <div className={styles.kompanienGrid}>
              {KOMPANIEN.map((k) => (
                <div key={k} className={styles.kompanie}>
                  🎯 {k}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
