import { notFound } from "next/navigation";
import Link from "next/link";
import { getSubfolders, getGalleryImages, getImageCaption } from "@/lib/supabase";
import GalerieGrid from "@/components/GalerieGrid";
import styles from "../../page.module.css";

export const revalidate = 300;

type Props = {
  params: { jahrzehnt: string };
};

/** "2000er" → 2000 */
function decadeStart(slug: string): number | null {
  const match = slug.match(/^(\d{4})er$/);
  return match ? parseInt(match[1], 10) : null;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `Schützenkönig:innen ${params.jahrzehnt}`,
    description: `Bilder der Schützenkönig:innen aus den ${params.jahrzehnt} Jahren.`,
  };
}

export async function generateStaticParams() {
  const subfolders = await getSubfolders("schuetzenkoenige-gallery");
  const decades = new Set<string>();
  for (const y of subfolders) {
    const num = parseInt(y, 10);
    if (!isNaN(num)) decades.add(`${Math.floor(num / 10) * 10}er`);
  }
  return Array.from(decades).map((d) => ({ jahrzehnt: d }));
}

export default async function JahrzehntPage({ params }: Props) {
  const start = decadeStart(params.jahrzehnt);
  if (start === null) notFound();

  const allSubfolders = await getSubfolders("schuetzenkoenige-gallery");
  const yearsInDecade = allSubfolders
    .filter((y) => {
      const num = parseInt(y, 10);
      return !isNaN(num) && num >= start && num < start + 10;
    })
    .sort();

  if (yearsInDecade.length === 0) notFound();

  const resolved = "koenige-gallery";
  const yearImages = await Promise.all(
    yearsInDecade.map(async (year) => {
      const images = await getGalleryImages(`${resolved}/${year}`);
      return { year, images };
    })
  );

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-badge">Fotos & Erinnerungen</span>
          <h1>Schützenkönig:innen {params.jahrzehnt}</h1>
          <p>
            {yearsInDecade.length} {yearsInDecade.length === 1 ? "Jahrgang" : "Jahrgänge"} von{" "}
            {yearsInDecade[0]} bis {yearsInDecade[yearsInDecade.length - 1]}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
        <div className="container">
          <Link href="/galerie/schuetzenkoenige" className={styles.backLink}>
            ← Alle Jahrzehnte
          </Link>

          {yearImages.map(({ year, images }) =>
            images.length > 0 ? (
              <div key={year} style={{ marginBottom: "3.5rem" }}>
                <h2
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--green)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "1.5rem",
                  }}
                >
                  {year}
                </h2>
                <GalerieGrid
                  images={images.map((img) => ({
                    public_id: img.public_id,
                    thumbUrl: img.url,
                    fullUrl: img.url,
                    title: getImageCaption(img),
                  }))}
                />
              </div>
            ) : null
          )}
        </div>
      </section>
    </>
  );
}
