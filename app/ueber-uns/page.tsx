import { getGalleryImages, getCloudinaryImageUrl, groupImagesByTag } from "@/lib/cloudinary";
import VorstandCards from "@/components/VorstandCards";
import { SectionTitleFadeIn } from "@/components/SectionTitleFadeIn";
import styles from "./page.module.css";

export const metadata = {
  title: "Über uns",
  description: "Vorstand, Kompanien und Geschichte der St. Sebastianus Schützenbruderschaft Büderich.",
};

export const revalidate = 300; // 5 Minuten

/** Tags in Cloudinary → Zwischenüberschrift (Reihenfolge = Anzeige-Reihenfolge) */
const VORSTAND_BILDER_GRUPPEN = [
  { tag: "gf", heading: "Geschäftsführender Vorstand", showAccentLine: true },
  { tag: "vs", heading: "Vorstand", showAccentLine: true },
  { tag: "ehren", heading: "Ehrenrat", showAccentLine: true },
];

const KOMPANIEN = [
  "1. Kompanie",
  "2. Kompanie",
  "3. Kompanie",
  "4. Kompanie",
  "Jungschützen",
];

function mapToVorstandImages(images: Awaited<ReturnType<typeof getGalleryImages>>) {
  return images.map((img) => ({
    public_id: img.public_id,
    thumbUrl: getCloudinaryImageUrl(img.public_id, {
      width: 560,
      height: 560,
      crop: "fill",
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
              <SectionTitleFadeIn
                title="Der Vorstand der Bruderschaft"
                subtitle="Vorstand und Ehrenrat unserer Bruderschaft"
              />
              {gruppen
                .filter((g) => g.images.length > 0 && g.heading !== "Weitere")
                .map(({ heading, images }) => {
                  const config = VORSTAND_BILDER_GRUPPEN.find((c) => c.heading === heading);
                  return (
                    <VorstandCards
                      key={heading}
                      heading={heading}
                      images={mapToVorstandImages(images)}
                      showAccentLine={config?.showAccentLine ?? true}
                    />
                  );
                })}
            </div>
          )}

          <div style={{ marginTop: "4rem" }}>
            <SectionTitleFadeIn
              title="Kompanien"
              subtitle="Unsere aktiven Kompanien"
            />
            <div className={styles.kompanienGrid}>
              {KOMPANIEN.map((k) => (
                <div key={k} className={styles.kompanie}>
                  {k}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
