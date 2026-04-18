import { getAllSponsors } from "@/lib/directus/queries";
import type { Sponsor } from "@/lib/directus/types";
import SponsorCard from "@/components/SponsorCard";
import styles from "./page.module.css";

export const revalidate = 300;

export const metadata = {
  title: "Sponsoren",
  description:
    "Unsere Sponsoren und Partner – Unternehmen und Förderer, die die St. Sebastianus Schützenbruderschaft Büderich unterstützen.",
};

const LEVEL_LABELS: Record<string, string> = {
  premium: "Premium-Partner",
  haupt: "Hauptsponsoren",
  gold: "Gold-Sponsoren",
  silber: "Silber-Sponsoren",
  bronze: "Bronze-Sponsoren",
  foerderer: "Förderer",
  partner: "Partner",
};

const LEVEL_PRIORITY: Record<string, number> = {
  premium: 0,
  haupt: 1,
  gold: 2,
  silber: 3,
  bronze: 4,
  foerderer: 5,
  partner: 6,
};

function labelForLevel(level: string): string {
  const key = level.toLowerCase();
  if (LEVEL_LABELS[key]) return LEVEL_LABELS[key];
  const clean = level.replace(/[-_]+/g, " ").trim();
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function comparePriority(a: string, b: string): number {
  const keyA = a.toLowerCase();
  const keyB = b.toLowerCase();
  const priA = LEVEL_PRIORITY[keyA] ?? Number.MAX_SAFE_INTEGER;
  const priB = LEVEL_PRIORITY[keyB] ?? Number.MAX_SAFE_INTEGER;
  if (priA !== priB) return priA - priB;
  return keyA.localeCompare(keyB);
}

export default async function SponsorenPage() {
  const sponsors = await getAllSponsors();

  const byLevel = new Map<string, Sponsor[]>();
  for (const s of sponsors) {
    const level = s.level || "sonstige";
    const list = byLevel.get(level) ?? [];
    list.push(s);
    byLevel.set(level, list);
  }

  const sortedLevels = Array.from(byLevel.keys()).sort(comparePriority);

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
            sortedLevels.map((level) => {
              const list = byLevel.get(level);
              if (!list?.length) return null;
              return (
                <div key={level} className={styles.ebene}>
                  <h2 className="section-title">{labelForLevel(level)}</h2>
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
