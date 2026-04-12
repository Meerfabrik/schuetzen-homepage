import ContactForm from "./ContactForm";
import { SectionTitleFadeIn } from "@/components/SectionTitleFadeIn";
import { ConsentGate } from "@/components/ConsentGate";
import styles from "./page.module.css";

export const metadata = {
  title: "Kontakt",
  description: "Nehmt Kontakt mit der St. Sebastianus Schützenbruderschaft Büderich auf.",
};

export default function KontaktPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Wir freuen uns von euch zu hören</div>
        <h1>Kontakt</h1>
        <p>Habt ihr Fragen, Anregungen oder möchtet ihr Mitglied werden? Schreibt uns!</p>
      </div>

      <section className="section">
        <div className={`container ${styles.grid}`}>

          {/* Kontaktinfos */}
          <div>
            <SectionTitleFadeIn
              title="So erreicht ihr uns"
              subtitle="Ansprechpartner der Bruderschaft"
            />
            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Adresse</div>
                <div className={styles.infoContent}>
                  St. Sebastianus Schützenbruderschaft<br />
                  Büderich von 1567 e.V.<br />
                  c/o Patrick Wirtz<br />
                  Winnendonk 30<br />
                  40667 Meerbusch
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Social Media</div>
                <a
                  href="https://facebook.com/667738963347662"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.infoLink}
                >
                  Facebook – St. Sebastianus-Schützenbruderschaft Büderich e.V.
                </a>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Schützen-App</div>
                <div className={styles.infoContentMuted}>
                  Ladet unsere App im App Store (iOS) oder Google Play Store (Android) herunter – Suchbegriff: „Schützen Büderich"
                </div>
              </div>
            </div>
          </div>

          {/* Formular */}
          <div>
            <SectionTitleFadeIn
              title="Schreibt uns"
              subtitle="Wir melden uns so schnell wie möglich zurück"
            />
            <ContactForm />
          </div>

        </div>
      </section>

      <section className={`section ${styles.mapSection}`}>
        <div className="container">
          <div className={styles.mapWrap}>
            <ConsentGate
              category="maps"
              providerLabel="Google Maps"
              description="Um die Karte unseres Standorts (Winnendonk 30, 40667 Meerbusch) anzuzeigen, müssen Sie das Laden von Google Maps erlauben. Dabei werden Daten an Google in den USA übertragen."
            >
              <iframe
                title="Standort Winnendonk 30, 40667 Meerbusch"
                src="https://www.google.com/maps?q=Winnendonk+30,+40667+Meerbusch&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </ConsentGate>
          </div>
        </div>
      </section>
    </>
  );
}
