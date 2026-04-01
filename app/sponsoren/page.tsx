import { getAllSponsors } from "@/lib/directus/queries";
import type { SponsorLevel } from "@/lib/directus/types";
import SponsorCard from "@/components/SponsorCard";
import styles from "./page.module.css";

export const revalidate = 300;

export const metadata = {
  title: "Sponsoren",
  description:
    "Unsere Sponsoren und Partner – Unternehmen und Förderer, die die St. Sebastianus Schützenbruderschaft Büderich unterstützen.",
};

const LEVEL_LABELS: Record<SponsorLevel, string> = {
  haupt: "Hauptsponsoren",
  premium: "Premium-Sponsoren",
};

const LEVEL_ORDER: SponsorLevel[] = ["haupt", "premium"];

export default async function SponsorenPage() {
  const sponsors = await getAllSponsors();

  const byLevel: Record<SponsorLevel, typeof sponsors> = {
    haupt: [],
    premium: [],
  };
  for (const s of sponsors) {
    byLevel[s.level]?.push(s);
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
            </div>
          ) : (
            LEVEL_ORDER.map((level) => {
              const list = byLevel[level];
              if (!list?.length) return null;
              return (
                <div key={level} className={styles.ebene}>
                  <h2 className="section-title">
                    {LEVEL_LABELS[level]}
                  </h2>
                  <div className={styles.grid}>
                    {list.map((sponsor) => (
                      <SponsorCard key={sponsor.id} sponsor={sponsor} />
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
