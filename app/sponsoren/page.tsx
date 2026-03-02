import { getAllSponsors } from "@/lib/sanity/queries";
import type { SanitySponsor, SponsorEbene } from "@/lib/sanity/types";
import SponsorCard from "@/components/SponsorCard";
import styles from "./page.module.css";

export const revalidate = 300;

export const metadata = {
  title: "Sponsoren",
  description:
    "Unsere Sponsoren und Partner – Unternehmen und Förderer, die die St. Sebastianus Schützenbruderschaft Büderich unterstützen.",
};

const EBENE_LABELS: Record<SponsorEbene, string> = {
  hauptsponsor: "Hauptsponsoren",
  sponsor: "Sponsoren",
  partner: "Partner",
  foerderer: "Förderer",
};

const EBENE_ORDER: SponsorEbene[] = [
  "hauptsponsor",
  "sponsor",
  "partner",
  "foerderer",
];

export default async function SponsorenPage() {
  const sponsors = await getAllSponsors();

  const byEbene: Record<SponsorEbene, SanitySponsor[]> = {
    hauptsponsor: [],
    sponsor: [],
    partner: [],
    foerderer: [],
  };
  for (const s of sponsors) {
    byEbene[s.ebene].push(s);
  }

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Dank an unsere Unterstützer</div>
        <h1>Sponsoren</h1>
        <p>
          Unternehmen und Förderer, die unsere Bruderschaft und das
          Schützenwesen in Büderich unterstützen.
        </p>
      </div>

      <section className="section">
        <div className="container">
          {sponsors.length === 0 ? (
            <div className={styles.empty}>
              <strong>Noch keine Sponsoren eingetragen</strong>
              <p>
                Sponsoren können im{" "}
                <a href="/studio" className={styles.studioLink}>
                  Sanity Studio
                </a>{" "}
                unter dem Dokumenttyp &quot;Sponsor&quot; angelegt werden.
              </p>
            </div>
          ) : (
            EBENE_ORDER.map((ebene) => {
              const list = byEbene[ebene];
              if (!list?.length) return null;
              return (
                <div key={ebene} className={styles.ebene}>
                  <h2 className="section-title">
                    {EBENE_LABELS[ebene]}
                  </h2>
                  <div className={styles.grid}>
                    {list.map((sponsor) => (
                      <SponsorCard key={sponsor._id} sponsor={sponsor} />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
