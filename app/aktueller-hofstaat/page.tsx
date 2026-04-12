import Image from "next/image";
import { getHofstaatEintraege } from "@/lib/directus/queries";
import type { HofstaatEintrag, HofstaatKategorie } from "@/lib/directus/types";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "Aktueller Hofstaat",
  description:
    "Das amtierende Königspaar und der Hofstaat der Schützenbruderschaft Büderich.",
};

const KATEGORIE_LABELS: Record<HofstaatKategorie, string> = {
  koenigspaar: "Amtierendes Königspaar",
  ministerpaar: "Minister",
  ehrendamen: "Ehrendamen",
  gesamtbild: "Gesamtbild",
  jungkoenig: "JungkönigIn",
  ehrenkoenig: "EhrenkönigIn",
  jungkoenig_minister: "Minister Jungkönigin",
};

function byKategorie(kategorie: HofstaatKategorie) {
  return (e: HofstaatEintrag) => e.kategorie === kategorie;
}

function CrownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20h20M4 17l2-12 4.5 5L12 3l1.5 7L18 5l2 12H4z" />
    </svg>
  );
}

function HofstaatCard({
  eintrag,
  variant = "default",
}: {
  eintrag: HofstaatEintrag;
  variant?: "koenig" | "default";
}) {
  const isKoenig = variant === "koenig";
  const imgUrl = isKoenig
    ? eintrag.imageUrl.replace("width=800", "width=1200").replace("height=600", "height=900")
    : eintrag.imageUrl.replace("width=800", "width=500").replace("height=600", "height=375");

  return (
    <div
      className={
        isKoenig ? styles.koenigCard : styles.hofstaatCard
      }
    >
      <div
        className={
          isKoenig ? styles.koenigBildWrap : styles.mitgliedBild
        }
      >
        <Image
          src={imgUrl}
          alt={eintrag.titel}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes={isKoenig ? "(max-width: 700px) 100vw, 700px" : "(max-width: 480px) 100vw, 50vw"}
        />
      </div>
      <div className={isKoenig ? styles.koenigInfo : styles.hofstaatInfo}>
        {isKoenig && (
          <div className={styles.titel}>
            {KATEGORIE_LABELS[eintrag.kategorie]}
          </div>
        )}
        {!isKoenig && (
          <div className={styles.hofstaatRolle}>
            {KATEGORIE_LABELS[eintrag.kategorie]}
          </div>
        )}
        <h2 className={isKoenig ? undefined : styles.hofstaatName}>
          {eintrag.titel}
        </h2>
        {isKoenig && <CrownIcon className={styles.crownIcon} />}
      </div>
    </div>
  );
}

function Trenner() {
  return (
    <div className={styles.trenner} role="presentation">
      <span className={styles.trennerLine} />
      <CrownIcon className={styles.trennerIcon} />
      <span className={styles.trennerLine} />
    </div>
  );
}

export default async function HofstaatPage() {
  const eintraege = await getHofstaatEintraege();

  const koenigspaare = eintraege.filter(byKategorie("koenigspaar"));
  const minister = eintraege.filter(byKategorie("ministerpaar"));
  const ehrendamen = eintraege.filter(byKategorie("ehrendamen"));
  const jungkoenig = eintraege.filter(byKategorie("jungkoenig"));
  const ministerJungKoenig = eintraege.filter(byKategorie("jungkoenig_minister"));
  const ehrenkoenig = eintraege.filter(byKategorie("ehrenkoenig"));
  const gesamtbild = eintraege.filter(byKategorie("gesamtbild"));

  const hasJungBlock = jungkoenig.length > 0 || ministerJungKoenig.length > 0;
  const hasEhrenBlock = ehrenkoenig.length > 0;

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Königshaus & Hofstaat</div>
        <h1>Aktueller Hofstaat</h1>
        <p>
          Das amtierende Königspaar und der Hofstaat unserer Bruderschaft.
        </p>
      </div>

      <section className="section">
        <div className="container">
          {eintraege.length > 0 ? (
            <>
              {/* 1. Königspaar */}
              {koenigspaare.length > 0 && (
                <div className={styles.koenigSection}>
                  {koenigspaare.map((e) => (
                    <HofstaatCard key={e.id} eintrag={e} variant="koenig" />
                  ))}
                </div>
              )}

              {/* 2. Minister */}
              {minister.length > 0 && (
                <div className={styles.block}>
                  <div className={styles.sectionHeading}>
                    <CrownIcon className={styles.sectionCrown} />
                    <h2 className="section-title">Minister</h2>
                  </div>
                  <div className={styles.ministerGrid}>
                    {minister.map((e) => (
                      <HofstaatCard key={e.id} eintrag={e} />
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Gesamtbild – nach den Ministern */}
              {gesamtbild.length > 0 && (
                <div className={styles.gesamtbildWrap}>
                  {gesamtbild.map((e) => (
                    <div key={e.id} className={styles.gesamtbildItem}>
                      <Image
                        src={e.imageUrl.replace("width=800", "width=1200").replace("height=600", "height=600")}
                        alt={e.titel}
                        width={1200}
                        height={600}
                        className={styles.gesamtbildImg}
                      />
                      {e.titel && (
                        <p className={styles.gesamtbildTitel}>{e.titel}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 3. Ehrendamen */}
              {ehrendamen.length > 0 && (
                <div className={styles.block}>
                  <div className={styles.sectionHeading}>
                    <CrownIcon className={styles.sectionCrown} />
                    <h2 className="section-title">Ehrendamen</h2>
                  </div>
                  <div className={styles.ehrendamenGrid}>
                    {ehrendamen.map((e) => (
                      <HofstaatCard key={e.id} eintrag={e} />
                    ))}
                  </div>
                </div>
              )}

              {/* Trenner -> JungkönigIn */}
              {hasJungBlock && <Trenner />}
              {hasJungBlock && (
                <div className={styles.block}>
                  <div className={styles.sectionHeading}>
                    <h2 className="section-title">JungkönigIn</h2>
                  </div>
                  <div className={styles.singleCardGridWrap}>
                    <div className={styles.ministerGrid}>
                      {jungkoenig.map((e) => (
                        <HofstaatCard key={e.id} eintrag={e} />
                      ))}
                      {ministerJungKoenig.map((e) => (
                        <HofstaatCard key={e.id} eintrag={e} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Trenner -> EhrenkönigIn */}
              {hasEhrenBlock && <Trenner />}
              {hasEhrenBlock && (
                <div className={styles.block}>
                  <div className={styles.sectionHeading}>
                    <h2 className="section-title">EhrenkönigIn</h2>
                  </div>
                  <div className={styles.singleCardGridWrap}>
                    <div className={styles.ministerGrid}>
                      {ehrenkoenig.map((e) => (
                        <HofstaatCard key={e.id} eintrag={e} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: "var(--text-muted)" }}>
              Noch kein Hofstaat eingetragen.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
