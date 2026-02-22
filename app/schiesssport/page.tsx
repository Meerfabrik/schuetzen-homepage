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
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 className="section-title">Unser Schießstand</h2>
          <p className="section-subtitle">Am Hülsenbuschweg, Meerbusch-Büderich</p>
          <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Unser Schießstand befindet sich am Hülsenbuschweg in Büderich. Hier treffen sich
            regelmäßig unsere Mitglieder zum sportlichen Schießen und üben für das Schützenfest.
            Der Stand ist modern ausgestattet und bietet Platz für Gruppen jeder Größe.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: "2rem" }}>
            Direkt hinter dem Schießstand beginnt unser Pfad der Jahresbäume – ein kleines
            „Schützenwäldchen" mit mittlerweile 59 gepflanzten Bäumen, die von Königspaaren
            und Kompanien gestiftet wurden.
          </p>

          <div style={{
            padding: "1.5rem",
            background: "var(--cream-dark)",
            borderRadius: "var(--radius)",
            borderLeft: "3px solid var(--gold)"
          }}>
            <h3 style={{ fontFamily: "Playfair Display, serif", color: "var(--green)", marginBottom: "0.5rem" }}>
              Interesse am Schießsport?
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Wir freuen uns über neue Mitglieder! Nehmt einfach Kontakt auf und wir erklären
              euch alles rund um den Einstieg.
            </p>
            <a href="/kontakt" className="btn btn-primary">Jetzt Kontakt aufnehmen</a>
          </div>
        </div>
      </section>
    </>
  );
}
