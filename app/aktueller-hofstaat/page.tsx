import Image from "next/image";
import { getAktuellerHofstaat } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata = {
  title: "Aktueller Hofstaat",
  description: "Das amtierende Königspaar und der Hofstaat der Schützenbruderschaft Büderich.",
};

export default async function HofstaatPage() {
  const hofstaat = await getAktuellerHofstaat();

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">
          {hofstaat ? `Regentschaft ${hofstaat.regentschaftsjahr}` : "Aktuell"}
        </div>
        <h1>Aktueller Hofstaat</h1>
        <p>Das amtierende Königspaar und der Hofstaat unserer Bruderschaft.</p>
      </div>

      <section className="section">
        <div className="container">
          {hofstaat ? (
            <>
              <div className={styles.koenigCard}>
                {hofstaat.koenigBild && (
                  <div className={styles.koenigBildWrap}>
                    <Image
                      src={urlFor(hofstaat.koenigBild).width(400).height(400).url()}
                      alt={`${hofstaat.koenigName} & ${hofstaat.koeniginName}`}
                      fill style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className={styles.koenigInfo}>
                  <div className={styles.kroene}>👑</div>
                  <h2>{hofstaat.koenigName}{hofstaat.koeniginName ? ` & ${hofstaat.koeniginName}` : ""}</h2>
                  <div className={styles.titel}>Amtierendes Königspaar · {hofstaat.regentschaftsjahr}</div>
                </div>
              </div>

              {hofstaat.hofstaatMitglieder?.length > 0 && (
                <div style={{ marginTop: "3rem" }}>
                  <h2 className="section-title">Der Hofstaat</h2>
                  <div className={styles.hofstaatGrid} style={{ marginTop: "1.5rem" }}>
                    {hofstaat.hofstaatMitglieder.map((mitglied, i) => (
                      <div key={i} className={styles.hofstaatCard}>
                        {mitglied.bild ? (
                          <div className={styles.mitgliedBild}>
                            <Image
                              src={urlFor(mitglied.bild).width(120).height(120).url()}
                              alt={mitglied.name}
                              fill style={{ objectFit: "cover" }}
                            />
                          </div>
                        ) : (
                          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>👤</div>
                        )}
                        <div className={styles.hofstaatRolle}>{mitglied.rolle}</div>
                        <div className={styles.hofstaatName}>{mitglied.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: "var(--text-muted)" }}>
              Noch kein Hofstaat eingetragen. Bitte im{" "}
              <a href="/studio" style={{ color: "var(--green-light)", fontWeight: 600 }}>
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
