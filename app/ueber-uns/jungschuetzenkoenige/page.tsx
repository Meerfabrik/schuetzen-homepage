export const metadata = {
  title: "Jungschützenkönig:innen der Bruderschaft",
  description:
    "Die Jungschützenkönig:innen der St. Sebastianus Schützenbruderschaft Büderich e.V. seit 1957.",
};

type King = { year: number; name: string };

type Group =
  | { type: "kings"; label: string; kings: King[]; defaultOpen?: boolean }
  | { type: "gap"; text: string };

const groups: Group[] = [
  {
    type: "kings",
    label: "1957 – 1969",
    kings: [
      { year: 1957, name: "Hans Jakobs" },
      { year: 1958, name: "Siegfried Winkler" },
      { year: 1959, name: "Erich Britschok" },
      { year: 1960, name: "Friedel Jost" },
      { year: 1961, name: "Helmut Rustemeier" },
      { year: 1962, name: "Alfred Wiß" },
      { year: 1963, name: "Heinz Königshoven" },
      { year: 1964, name: "Egon Pudwell" },
      { year: 1965, name: "Heinz Schneider" },
      { year: 1966, name: "Dieter Zolitz" },
      { year: 1967, name: "Heinrich Theißen" },
      { year: 1968, name: "Heinz Peltzer" },
      { year: 1969, name: "Jürgen Schmitz" },
    ],
  },
  {
    type: "kings",
    label: "1970 – 1989",
    kings: [
      { year: 1970, name: "Klaus Goebels" },
      { year: 1971, name: "Hans Pesch" },
      { year: 1972, name: "Friedrich Seehagen" },
      { year: 1973, name: "Gerd Klang" },
      { year: 1974, name: "Josef Dahl" },
      { year: 1975, name: "Thomas Dahl" },
      { year: 1976, name: "Klaus Przybyla" },
      { year: 1977, name: "Herbert Lonny" },
      { year: 1978, name: "Stefan Noack" },
      { year: 1979, name: "Norbert Hassels" },
      { year: 1980, name: "Aldo Schindler" },
      { year: 1981, name: "Werner Graewer" },
      { year: 1982, name: "Michael Neugen" },
      { year: 1983, name: "Britta Nehring" },
      { year: 1984, name: "Gerd Huberti" },
      { year: 1985, name: "Ralf Stoffers" },
      { year: 1986, name: "Rainer Höterkes" },
      { year: 1987, name: "Manuela Reinke" },
      { year: 1988, name: "Klaus Diek" },
      { year: 1989, name: "Helmut Wissen" },
    ],
  },
  {
    type: "kings",
    label: "1990 – 2009",
    kings: [
      { year: 1990, name: "Oliver Berressem" },
      { year: 1991, name: "Detlef Brors" },
      { year: 1992, name: "Nicol Sattelberger" },
      { year: 1993, name: "Dominik Stein" },
      { year: 1994, name: "Andreas Beier" },
      { year: 1995, name: "Dirk Bollmann" },
      { year: 1996, name: "Thomas Kepurra" },
      { year: 1997, name: "Tanja Rosenau" },
      { year: 1998, name: "Christoph Theisen" },
      { year: 1999, name: "Ismael Macia Vaz" },
      { year: 2000, name: "Andreij Eisenburger" },
      { year: 2001, name: "Sandra Dahl" },
      { year: 2002, name: "Thomas Wegener" },
      { year: 2003, name: "Niko Gross" },
      { year: 2004, name: "Michaela Radmacher" },
      { year: 2005, name: "Thomas Apel" },
      { year: 2006, name: "Maximilian Schäfer" },
      { year: 2007, name: "Martin Vennedey" },
      { year: 2008, name: "Matti Hollender" },
      { year: 2009, name: "Christoph Wellemsen" },
    ],
  },
  {
    type: "kings",
    label: "2010 – 2019",
    kings: [
      { year: 2010, name: "Christian Beck" },
      { year: 2011, name: "Steffen Rademacher" },
      { year: 2012, name: "Lisa Freitagsmüller" },
      { year: 2013, name: "Luisa Brors" },
      { year: 2014, name: "Sascha Wincek" },
      { year: 2015, name: "Martina Kräbber" },
      { year: 2016, name: "Marco Sala" },
      { year: 2017, name: "Martin Schwenzitzki" },
      { year: 2018, name: "Jonathan Gleumes" },
      { year: 2019, name: "Jens Rademacher" },
    ],
  },
  {
    type: "gap",
    text: "Von 2020 bis 2021 fand aufgrund der Corona-Pandemie kein Schützen- und Heimatfest statt.",
  },
  {
    type: "kings",
    label: "2022 – heute",
    defaultOpen: true,
    kings: [
      { year: 2022, name: "Alexandra Klimper" },
      { year: 2023, name: "Ruben Hartweg" },
      { year: 2024, name: "Jonas Meisenberg" },
    ],
  },
];

export default function JungschuetzenkoenigePage() {
  return (
    <>
      <style>{`
        .kings-columns { columns: 2; }
        @media (max-width: 540px) { .kings-columns { columns: 1; } }
      `}</style>

      <div className="page-hero">
        <div className="page-hero-badge">Geschichte</div>
        <h1>Jungschützenkönig:innen der Bruderschaft</h1>
        <p>Die Jungschützenkönig:innen der St. Sebastianus Schützenbruderschaft Büderich e.V. seit 1957.</p>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {groups.map((group, i) => {
              if (group.type === "gap") {
                return (
                  <div
                    key={i}
                    style={{
                      padding: "1rem 1.25rem",
                      background: "var(--cream-dark)",
                      borderLeft: "3px solid var(--gold)",
                      borderRadius: "0 var(--radius) var(--radius) 0",
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                      fontStyle: "italic",
                      lineHeight: 1.6,
                    }}
                  >
                    {group.text}
                  </div>
                );
              }

              return (
                <details key={group.label} open={group.defaultOpen ?? false} style={{ borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid color-mix(in srgb, var(--gold) 30%, transparent)" }}>
                  <summary style={{
                    padding: "0.9rem 1.25rem",
                    background: "var(--cream-dark)",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "var(--green)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    userSelect: "none",
                    listStyle: "none",
                  }}>
                    <span>{group.label}</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 400, color: "var(--text-muted)", textTransform: "none", letterSpacing: 0 }}>
                      {group.kings.length} König{group.kings.length !== 1 ? "e" : ""}
                    </span>
                  </summary>

                  <div className="kings-columns" style={{ padding: "0.5rem 0" }}>
                    {group.kings.map((king) => (
                      <div
                        key={king.year}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "4rem 1fr",
                          gap: "0.75rem",
                          padding: "0.45rem 1.25rem",
                          alignItems: "center",
                          breakInside: "avoid",
                        }}
                      >
                        <span style={{ fontWeight: 700, color: "var(--gold)", fontSize: "0.875rem", fontVariantNumeric: "tabular-nums" }}>
                          {king.year}
                        </span>
                        <span style={{ fontSize: "0.9rem" }}>{king.name}</span>
                      </div>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
