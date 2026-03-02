import Image from "next/image";
import { getHofstaatEintraege } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import type { HofstaatEintrag, HofstaatKategorie } from "@/lib/sanity/types";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "Aktueller Hofstaat",
  description:
    "Das amtierende Königspaar und der Hofstaat der Schützenbruderschaft Büderich.",
};

const KATEGORIE_LABELS: Record<HofstaatKategorie, string> = {
  koenigspaare: "Amtierendes Königspaar",
  minister: "Minister",
  ehrendamen: "Ehrendamen",
  gesamtbild: "Gesamtbild",
  jungkoenigin: "JungkönigIn",
  ehrenkoenigin: "EhrenkönigIn",
  ministerJungKoenigin: "Minister Jungkönigin",
};

function byKategorie(kategorie: HofstaatKategorie) {
  return (e: HofstaatEintrag) => e.kategorie === kategorie;
}

function HofstaatCard({
  eintrag,
  variant = "default",
}: {
  eintrag: HofstaatEintrag;
  variant?: "koenig" | "default";
}) {
  const isKoenig = variant === "koenig";
  return (
    <div
      className={
        isKoenig ? styles.koenigCard : styles.hofstaatCard
      }
    >
      {eintrag.bild && (
        <div
          className={
            isKoenig ? styles.koenigBildWrap : styles.mitgliedBild
          }
        >
          <Image
            src={urlFor(eintrag.bild)
              .width(isKoenig ? 1200 : 500)
              .height(isKoenig ? 900 : 375)
              .url()}
            alt={eintrag.titel}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes={isKoenig ? "(max-width: 700px) 100vw, 700px" : "(max-width: 480px) 100vw, 50vw"}
          />
        </div>
      )}
      <div className={isKoenig ? styles.koenigInfo : styles.hofstaatInfo}>
        {isKoenig && <div className={styles.kroene}>👑</div>}
        {!isKoenig && (
          <div className={styles.hofstaatRolle}>
            {KATEGORIE_LABELS[eintrag.kategorie]}
          </div>
        )}
        <h2 className={isKoenig ? undefined : styles.hofstaatName}>
          {eintrag.titel}
        </h2>
        {isKoenig && (
          <div className={styles.titel}>
            {KATEGORIE_LABELS[eintrag.kategorie]}
          </div>
        )}
      </div>
    </div>
  );
}

function Trenner() {
  return (
    <div className={styles.trenner} role="presentation">
      <span className={styles.trennerLine} />
      <span className={styles.trennerIcon}>👑</span>
      <span className={styles.trennerLine} />
    </div>
  );
}

export default async function HofstaatPage() {
  const eintraege = await getHofstaatEintraege();

  const koenigspaare = eintraege.filter(byKategorie("koenigspaare"));
  const minister = eintraege.filter(byKategorie("minister"));
  const ehrendamen = eintraege.filter(byKategorie("ehrendamen"));
  const jungkoenigin = eintraege.filter(byKategorie("jungkoenigin"));
  const ministerJungKoenigin = eintraege.filter(
    byKategorie("ministerJungKoenigin")
  );
  const ehrenkoenigin = eintraege.filter(byKategorie("ehrenkoenigin"));
  const gesamtbild = eintraege.filter(byKategorie("gesamtbild"));

  const hasJungBlock =
    jungkoenigin.length > 0 || ministerJungKoenigin.length > 0;
  const hasEhrenBlock = ehrenkoenigin.length > 0;

  return (
    <>
      <div className="page-hero">
        <h1>Aktueller Hofstaat</h1>
        <p>
          Das amtierende Königspaar und der Hofstaat unserer Bruderschaft.
        </p>
      </div>

      <section className="section">
        <div className="container">
          {eintraege.length > 0 ? (
            <>
              {/* Gesamtbild optional oben */}
              {gesamtbild.length > 0 && (
                <div className={styles.gesamtbildWrap}>
                  {gesamtbild.map((e) => (
                    <div key={e._id} className={styles.gesamtbildItem}>
                      <Image
                        src={urlFor(e.bild).width(1200).url()}
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

              {/* 1. Königspaar */}
              {koenigspaare.length > 0 && (
                <div className={styles.koenigSection}>
                  {koenigspaare.map((e) => (
                    <HofstaatCard
                      key={e._id}
                      eintrag={e}
                      variant="koenig"
                    />
                  ))}
                </div>
              )}

              {/* 2. Minister */}
              {minister.length > 0 && (
                <div className={styles.block}>
                  <h2 className="section-title">Minister</h2>
                  <div className={styles.ministerGrid}>
                    {minister.map((e) => (
                      <HofstaatCard key={e._id} eintrag={e} />
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Ehrendamen (max. 2 Bilder, größer) */}
              {ehrendamen.length > 0 && (
                <div className={styles.block}>
                  <h2 className="section-title">Ehrendamen</h2>
                  <div className={styles.ehrendamenGrid}>
                    {ehrendamen.map((e) => (
                      <HofstaatCard key={e._id} eintrag={e} />
                    ))}
                  </div>
                </div>
              )}

              {/* Trenner → JungkönigIn (eine Karte, zentriert) */}
              {hasJungBlock && <Trenner />}
              {hasJungBlock && (
                <div className={styles.block}>
                  <h2 className="section-title">JungkönigIn</h2>
                  <div className={styles.singleCardGridWrap}>
                    <div className={styles.ministerGrid}>
                      {jungkoenigin.map((e) => (
                        <HofstaatCard key={e._id} eintrag={e} />
                      ))}
                      {ministerJungKoenigin.map((e) => (
                        <HofstaatCard key={e._id} eintrag={e} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Trenner → EhrenkönigIn (eine Karte, zentriert) */}
              {hasEhrenBlock && <Trenner />}
              {hasEhrenBlock && (
                <div className={styles.block}>
                  <h2 className="section-title">EhrenkönigIn</h2>
                  <div className={styles.singleCardGridWrap}>
                    <div className={styles.ministerGrid}>
                      {ehrenkoenigin.map((e) => (
                        <HofstaatCard key={e._id} eintrag={e} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: "var(--text-muted)" }}>
              Noch kein Hofstaat eingetragen. Bitte im{" "}
              <a
                href="/studio"
                style={{ color: "var(--green-light)", fontWeight: 600 }}
              >
                CMS unter /studio
              </a>{" "}
              anlegen.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
