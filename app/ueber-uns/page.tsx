import styles from "./page.module.css";

export const metadata = {
  title: "Über uns",
  description: "Vorstand, Kompanien und Geschichte der St. Sebastianus Schützenbruderschaft Büderich.",
};

const VORSTAND = [
  { rolle: "Präsident", name: "N.N." },
  { rolle: "Vizepräsident", name: "N.N." },
  { rolle: "Schriftführer", name: "N.N." },
  { rolle: "Kassierer", name: "N.N." },
  { rolle: "Präses", name: "N.N." },
];

const KOMPANIEN = [
  "1. Kompanie",
  "2. Kompanie",
  "3. Kompanie",
  "4. Kompanie",
  "Jungschützen",
];

export default function UeberUnsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Wer wir sind</div>
        <h1>Über uns</h1>
        <p>Vorstand, Kompanien und die Geschichte unserer Bruderschaft seit 1567.</p>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Vorstand</h2>
          <p className="section-subtitle">Die gewählten Vertreter unserer Bruderschaft</p>

          <div className={styles.vorstandGrid}>
            {VORSTAND.map((v) => (
              <div key={v.rolle} className={styles.vorstandCard}>
                <div className={styles.avatar}>👤</div>
                <div className={styles.rolle}>{v.rolle}</div>
                <div className={styles.name}>{v.name}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "4rem" }}>
            <h2 className="section-title">Kompanien</h2>
            <p className="section-subtitle">Unsere aktiven Kompanien</p>
            <div className={styles.kompanienGrid}>
              {KOMPANIEN.map((k) => (
                <div key={k} className={styles.kompanie}>
                  🎯 {k}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
