export const metadata = {
  title: "Präsidenten der Bruderschaft",
  description:
    "Vorsitzende und Präsidenten der St. Sebastianus Schützenbruderschaft Büderich e.V. – von den Anfängen bis heute.",
};

const praeWarPresident = [
  "Conrad Gutzen",
  "Franz Gutzen",
  "Heinrich Pöll",
  "Johann Jülich",
];

const postWarPresidents = [
  {
    years: "1949",
    name: "Johann Jülich",
    details: [],
  },
  {
    years: "1949 – 1958",
    name: "Jakob Wienen",
    details: [],
  },
  {
    years: "1958 – 1972",
    name: "Karl Kothes",
    details: [],
  },
  {
    years: "1972 – 1976",
    name: "Michael Esser",
    details: ["1952 Regimentskönig mit seiner Frau Wilhelmine"],
  },
  {
    years: "1976 – 1999",
    name: "Josef Gröters",
    details: [
      "Ab 1949 Mitglied der Jägerkompanie Eintracht 1906",
      "1966 in den Hauptvorstand gewählt",
      "1973 Regimentskönig mit seiner Frau Helmi",
      "bis 1975 Archivar",
      "von 1976 – 1999 1. Vorsitzender unserer Bruderschaft",
    ],
  },
  {
    years: "1999 – 2013",
    name: "Hans-Georg Bodewig",
    details: [
      "Ab 1975 Mitglied der Gesellschaft Jägerlust 1900",
      "1988 Regimentskönig mit seiner Frau Anne",
      "1991 in den Hauptvorstand gewählt",
      "bis 1998 Archivar",
      "von 1999 – 2013 1. Vorsitzender unserer Bruderschaft",
    ],
  },
  {
    years: "2013 – 2024",
    name: "Peter Gröters",
    details: [
      "Seit 1975 Mitglied der Jägerkompanie Eintracht 1906",
      "in den Hauptvorstand gewählt",
      "bis 2013 Archivar",
    ],
  },
  {
    years: "seit 2024",
    name: "Christian Bodewig",
    details: [
      "2013 Schützenkönig",
    ],
  },
];

export default function PraesidentenPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Geschichte</div>
        <h1>Präsidenten der Bruderschaft</h1>
        <p>Vorsitzende und Präsidenten der St. Sebastianus Schützenbruderschaft Büderich e.V.</p>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>

          {/* Vor dem 2. Weltkrieg */}
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
            Vorsitzende vor dem 2. Weltkrieg
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Soweit bekannt, leider ohne Zeitangaben.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0" }}>
            {praeWarPresident.map((name) => (
              <li
                key={name}
                style={{
                  padding: "0.65rem 1rem",
                  borderLeft: "3px solid var(--gold)",
                  marginBottom: "0.5rem",
                  background: "var(--cream-dark)",
                  borderRadius: "0 var(--radius) var(--radius) 0",
                  fontWeight: 600,
                }}
              >
                {name}
              </li>
            ))}
          </ul>

          {/* Historischer Text zum Neubeginn */}


          {/* Nach dem 2. Weltkrieg */}
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.5rem" }}>
            Vorsitzende nach dem 2. Weltkrieg
          </h2>

          <div style={{
            padding: "1.5rem",
            background: "var(--cream-dark)",
            borderRadius: "var(--radius)",
            borderLeft: "3px solid var(--gold)",
            marginBottom: "2.5rem",
          }}>
            <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
              Anfang des Jahres 1949 wurde <strong>Johann Jülich</strong>, auf Bitte von überlebenden
              Schützenbrüdern, gebeten den alten St. Sebastianus Schützenverein wieder aufleben zu lassen.
              Johann Jülich lud die alten Kompanien zu einer ersten Versammlung in die Gaststätte Spicker ein.
              Hier wurde der alte Vorstand gebeten, die Leitung des Vereins vorläufig zu übernehmen.
            </p>
            <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
              Am <strong>25. Januar 1949</strong> wurde, beim 1. Titularfest nach dem Krieg,
              Johann Jülich als Vorsitzender gewählt.
            </p>
            <p style={{ lineHeight: 1.8, margin: 0 }}>
              Bei der Jahreshauptversammlung am <strong>Palmsonntag 1949</strong> wurde dann
              Jakob Wienen zum neuen 1. Vorsitzenden gewählt.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            {postWarPresidents.map(({ years, name, details }) => (
              <div
                key={name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "10rem 1fr",
                  gap: "1rem",
                  padding: "1.25rem 1.5rem",
                  background: "var(--cream-dark)",
                  borderRadius: "var(--radius)",
                  borderLeft: "3px solid var(--gold)",
                  alignItems: "start",
                }}
              >
                <span style={{ fontWeight: 700, color: "var(--text-muted)", fontSize: "0.9rem", paddingTop: "0.1rem" }}>
                  {years}
                </span>
                <div>
                  <span style={{ fontWeight: 700, fontSize: "1rem" }}>{name}</span>
                  {details.length > 0 && (
                    <ul style={{ margin: "0.4rem 0 0 0", paddingLeft: "1.2rem", listStyle: "disc" }}>
                      {details.map((line: string) => (
                        <li key={line} style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
