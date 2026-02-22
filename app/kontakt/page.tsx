import ContactForm from "./ContactForm";

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
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

          {/* Kontaktinfos */}
          <div>
            <h2 className="section-title">So erreicht ihr uns</h2>
            <p className="section-subtitle">Ansprechpartner der Bruderschaft</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1rem" }}>
              <div style={{ padding: "1.25rem 1.5rem", background: "white", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", borderLeft: "3px solid var(--gold)" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.4rem" }}>Adresse</div>
                <div style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  St. Sebastianus Schützenbruderschaft<br />
                  Büderich von 1567 e.V.<br />
                  Meerbusch-Büderich
                </div>
              </div>

              <div style={{ padding: "1.25rem 1.5rem", background: "white", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", borderLeft: "3px solid var(--gold)" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.4rem" }}>Social Media</div>
                <a
                  href="https://facebook.com/667738963347662"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--green-light)", fontWeight: 600 }}
                >
                  Facebook – St. Sebastianus-Schützenbruderschaft Büderich e.V.
                </a>
              </div>

              <div style={{ padding: "1.25rem 1.5rem", background: "white", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", borderLeft: "3px solid var(--gold)" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.4rem" }}>Schützen-App</div>
                <div style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-muted)" }}>
                  Ladet unsere App im App Store (iOS) oder Google Play Store (Android) herunter – Suchbegriff: „Schützen Büderich"
                </div>
              </div>
            </div>
          </div>

          {/* Formular */}
          <div>
            <h2 className="section-title">Schreibt uns</h2>
            <p className="section-subtitle">Wir melden uns so schnell wie möglich zurück</p>
            <ContactForm />
          </div>

        </div>
      </section>
    </>
  );
}
