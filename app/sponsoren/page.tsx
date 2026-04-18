import { getAllSponsors } from "@/lib/directus/queries";
import SponsorCard from "@/components/SponsorCard";
import styles from "./page.module.css";

export const revalidate = 300;

export const metadata = {
  title: "Sponsoren",
  description:
    "Unsere Sponsoren und Partner – Unternehmen und Förderer, die die St. Sebastianus Schützenbruderschaft Büderich unterstützen.",
};

export default async function SponsorenPage() {
  const sponsors = await getAllSponsors();

  const sortedSponsors = [...sponsors].sort((a, b) => {
    const aPremium = a.level?.toLowerCase() === "premium" ? 0 : 1;
    const bPremium = b.level?.toLowerCase() === "premium" ? 0 : 1;
    if (aPremium !== bPremium) return aPremium - bPremium;
    return a.title.localeCompare(b.title);
  });

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
          {sortedSponsors.length === 0 ? (
            <div className={styles.empty}>
              <strong>Noch keine Sponsoren eingetragen</strong>
            </div>
          ) : (
            <div className={styles.grid}>
              {sortedSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
