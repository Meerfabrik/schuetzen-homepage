import { notFound } from "next/navigation";
import Link from "next/link";
import { getAlbumsByDecade, getAlbumsWithImagesInDecade } from "@/lib/directus/queries";
import GalerieGrid from "@/components/GalerieGrid";
import styles from "../../page.module.css";

export const revalidate = 300;

type Props = {
  params: { jahrzehnt: string };
};

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
  const decades = await getAlbumsByDecade("schuetzenkoenige");
  return decades.map((d) => ({ jahrzehnt: d.decade }));
}

export default async function JahrzehntPage({ params }: Props) {
  const start = decadeStart(params.jahrzehnt);
  if (start === null) notFound();

  const albumsWithImages = await getAlbumsWithImagesInDecade("schuetzenkoenige", start);
  if (albumsWithImages.length === 0) notFound();

  const years = albumsWithImages.map((a) => a.album.year!).sort();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-badge">Fotos & Erinnerungen</span>
          <h1>Schützenkönig:innen {params.jahrzehnt}</h1>
          <p>
            {albumsWithImages.length} {albumsWithImages.length === 1 ? "Album" : "Alben"} von{" "}
            {years[0]} bis {years[years.length - 1]}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
        <div className="container">
          <Link href="/galerie/schuetzenkoenige" className={styles.backLink}>
            ← Alle Jahrzehnte
          </Link>

          {albumsWithImages.map(({ album, images }) =>
            images.length > 0 ? (
              <div key={album.id} style={{ marginBottom: "3.5rem" }}>
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
                  {album.title}
                </h2>
                <GalerieGrid
                  images={images.map((img) => ({
                    public_id: String(img.id),
                    thumbUrl: img.thumbUrl,
                    fullUrl: img.fullUrl,
                    title: img.title ?? undefined,
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
