import Image from "next/image";
import { getAllGalerien } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "Galerie",
  description: "Bildergalerie der St. Sebastianus Schützenbruderschaft Büderich.",
};

const KATEGORIE_LABELS: Record<string, string> = {
  koenige: "Schützenkönig:innen",
  historie: "Historien Galerie",
  ehrenkoenige: "Ehrenkönig:innen",
  jungkoenige: "Jungschützenkönig:innen",
  veranstaltungen: "Veranstaltungen",
};

export default async function GaleriePage() {
  const galerien = await getAllGalerien();

  // Nach Kategorie gruppieren
  const grouped = galerien.reduce<Record<string, typeof galerien>>((acc, g) => {
    if (!acc[g.kategorie]) acc[g.kategorie] = [];
    acc[g.kategorie].push(g);
    return acc;
  }, {});

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Erinnerungen & Momente</div>
        <h1>Galerie</h1>
        <p>Bilder aus unserer Bruderschaft – Schützenfeste, Ehrungen und besondere Momente.</p>
      </div>

      <section className="section">
        <div className="container">
          {Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([kat, items]) => (
              <div key={kat} id={kat} style={{ marginBottom: "3.5rem" }}>
                <h2 className="section-title">{KATEGORIE_LABELS[kat] ?? kat}</h2>
                {items.map((galerie) => (
                  <div key={galerie._id} style={{ marginTop: "1.5rem" }}>
                    {galerie.jahr && (
                      <h3 style={{ color: "var(--text-muted)", fontSize: "0.9rem",
                        fontFamily: "Source Sans 3, sans-serif", marginBottom: "0.75rem" }}>
                        {galerie.titel} · {galerie.jahr}
                      </h3>
                    )}
                    <div className={styles.grid}>
                      {galerie.bilder.map((bild, i) => (
                        <div key={i} className={styles.item}>
                          <Image
                            src={urlFor(bild).width(600).height(450).url()}
                            alt={bild.alt ?? galerie.titel}
                            fill style={{ objectFit: "cover" }}
                            sizes="(max-width: 768px) 50vw, 300px"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p style={{ color: "var(--text-muted)" }}>
              Noch keine Galerien vorhanden. Bilder können im{" "}
              <a href="/studio" style={{ color: "var(--green-light)", fontWeight: 600 }}>
                CMS unter /studio
              </a>{" "}
              hochgeladen werden.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
