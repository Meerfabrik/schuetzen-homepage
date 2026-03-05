import { SectionTitleFadeIn } from "@/components/SectionTitleFadeIn";
import styles from "./page.module.css";

export const metadata = {
  title: "Schießsport",
  description: "Schießsport bei der Schützenbruderschaft Büderich – offen für Einsteiger und Fortgeschrittene.",
};

export default function SchiesssportPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Sport & Brauchtum</div>
        <h1>Schießsport in Büderich</h1>
        <p>Sportliches Schießen auf unserem Schießstand am Hülsenbuschweg – für Einsteiger und Fortgeschrittene.</p>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.content}>
            <SectionTitleFadeIn
              title="Unser Schießstand"
              subtitle="Am Hülsenbuschweg, Meerbusch-Büderich"
            />
            <p className={styles.text}>
              Unser Schießstand befindet sich am Hülsenbuschweg in Büderich. Hier treffen sich
              regelmäßig unsere Mitglieder zum sportlichen Schießen und üben für das Schützenfest.
              Der Stand ist modern ausgestattet und bietet Platz für Gruppen jeder Größe.
            </p>
            <p className={styles.text}>
              Direkt hinter dem Schießstand beginnt unser Pfad der Jahresbäume – ein kleines
              „Schützenwäldchen" mit mittlerweile 59 gepflanzten Bäumen, die von Königspaaren
              und Kompanien gestiftet wurden.
            </p>

            <div className={styles.callout}>
              <h3 className={styles.calloutTitle}>Interesse am Schießsport?</h3>
              <p className={styles.calloutText}>
                Wir freuen uns über neue Mitglieder! Nehmt einfach Kontakt auf und wir erklären
                euch alles rund um den Einstieg.
              </p>
              <a href="/kontakt" className="btn btn-primary">Jetzt Kontakt aufnehmen</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
