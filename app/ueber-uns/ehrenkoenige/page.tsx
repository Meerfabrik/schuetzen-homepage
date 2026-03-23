export const metadata = {
  title: "Ehrenkönig:innen der Bruderschaft",
  description:
    "Die Ehrenkönig:innen der St. Sebastianus Schützenbruderschaft Büderich e.V. seit 1970.",
};

type King = { year: number; name: string; title: string };

type Group =
  | { type: "kings"; label: string; kings: King[]; defaultOpen?: boolean }
  | { type: "gap"; text: string }
  | { type: "note"; text: string };

const groups: Group[] = [
  {
    type: "note",
    text: "Die Ehrenkönigskette wurde von Theodor Schotten, Mitglied des Ehrenrates, gestiftet.",
  },
  {
    type: "kings",
    label: "1970 – 1989",
    kings: [
      { year: 1970, name: "Heinrich Konrady", title: "Goldjubilar" },
      { year: 1971, name: "Theodor Schotten", title: "Mitglied des Ehrenrates" },
      { year: 1972, name: "Hans Jung", title: "Ex-Minister" },
      { year: 1973, name: "Heinrich Konrady", title: "Goldjubilar" },
      { year: 1974, name: "Alois Lukei", title: "Mitglied des Kreistages" },
      { year: 1975, name: "Dr. Harald Lohse", title: "Regimentsarzt" },
      { year: 1976, name: "Michael Brock", title: "Ex-Minister" },
      { year: 1977, name: "Dieter Jüngerkes", title: "Ratsherr" },
      { year: 1978, name: "Heinrich Konrady", title: "Goldjubilar" },
      { year: 1979, name: "Herbert Bahners", title: "Ex-Minister" },
      { year: 1980, name: "Dieter Jüngerkes", title: "Ratsherr" },
      { year: 1981, name: "Heinz Müller", title: "Ex-Minister" },
      { year: 1982, name: "Hans-Hubert Hamacher", title: "Ex-Minister" },
      { year: 1983, name: "Hans Weiß", title: "Ex-Minister" },
      { year: 1984, name: "Burkhard Hunsche", title: "1. Beigeordneter der Stadt Meerbusch" },
      { year: 1985, name: "Gisela Osterwind", title: "Ratsfrau" },
      { year: 1986, name: "Helmut Poell", title: "Ex-Minister" },
      { year: 1987, name: "Johann Reiners", title: "Ex-Minister" },
      { year: 1988, name: "Josef Engels", title: "Protektor der Artillerie" },
      { year: 1989, name: "Dr. Harald Lohse", title: "Regimentsarzt" },
    ],
  },
  {
    type: "kings",
    label: "1990 – 2009",
    kings: [
      { year: 1990, name: "Heinz Vieten", title: "Ex-Minister" },
      { year: 1991, name: "Hans Rustemeier", title: "Ex-Minister" },
      { year: 1992, name: "Gertrud Krüger", title: "Bürgermeisterin der Stadt Meerbusch" },
      { year: 1993, name: "Heinz Schäfer", title: "Ex-Minister" },
      { year: 1994, name: "Georg Hellpap", title: "Förderer der Bruderschaft" },
      { year: 1995, name: "Thomas Uhling", title: "Stadtdirektor von Meerbusch" },
      { year: 1996, name: "Hermann Müsch", title: "Ratsherr" },
      { year: 1997, name: "Georg Schoppe", title: "König 1996" },
      { year: 1998, name: "Werner Andreer", title: "Ex-Minister" },
      { year: 1999, name: "Georg Hellpap", title: "Förderer der Bruderschaft" },
      { year: 2000, name: "Dirk Gollits", title: "Förderer der Bruderschaft" },
      { year: 2001, name: "Petra Schoppe", title: "Ratsfrau" },
      { year: 2002, name: "Willi Zanders", title: "Goldjubilar" },
      { year: 2003, name: "Peter Funken", title: "Ex-Minister" },
      { year: 2004, name: "Oswald Hepner", title: "Ratsherr" },
      { year: 2005, name: "Michael Bödefeld", title: "Ex-Minister" },
      { year: 2006, name: "Marlies Homuth-Kenklies", title: "Ratsfrau" },
      { year: 2007, name: "Georg Hellpapp", title: "Förderer der Bruderschaft" },
      { year: 2008, name: "Oliver Kunze", title: "Ex-Minister" },
      { year: 2009, name: "Wolfgang Witsch", title: "Ex-Minister" },
    ],
  },
  {
    type: "kings",
    label: "2010 – 2013",
    kings: [
      { year: 2010, name: "Birte Wienands", title: "Mitglied des Kreistages" },
      { year: 2011, name: "Peter Bremes", title: "Ex-Minister" },
      { year: 2012, name: "Peter Ritter", title: "Ex-Minister" },
      { year: 2013, name: "Birgit Müller", title: "KG Blau-Weiss" },
    ],
  },
  {
    type: "note",
    text: "Im Jahr 2013 wurde von Klaus und Liesel Czerwinski eine neue Ehrenkönigskette gestiftet.",
  },
  {
    type: "kings",
    label: "2014 – 2019",
    kings: [
      { year: 2014, name: "Robert v. Vreden", title: "Ex-Minister" },
      { year: 2015, name: "Peter Smyrek", title: "Ex-Minister" },
      { year: 2016, name: "Thomas Kepurra", title: "Ex-Minister" },
      { year: 2017, name: "Nina Bödefeld", title: "KG Büdericher Heinzelmännchen" },
      { year: 2018, name: "Sascha Schäfer", title: "Ex-Minister" },
      { year: 2019, name: "Dr. Bernd Schumacher-Adams", title: "Regimentsarzt der Bruderschaft" },
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
      { year: 2022, name: "Jennifer Hermes", title: "K.G. Blau Weiss Büderich 1958" },
      { year: 2023, name: "Jessica Rehfeld", title: "K.G. Blau Weiss Büderich 1958" },
      { year: 2024, name: "Daniel Thywissen", title: "Politiker" },
    ],
  },
];

export default function EhrenkoenigePage() {
  return (
    <>
      <style>{`
        .kings-columns { columns: 2; }
        @media (max-width: 700px) { .kings-columns { columns: 1; } }
      `}</style>

      <div className="page-hero">
        <div className="page-hero-badge">Geschichte</div>
        <h1>Ehrenkönig:innen der Bruderschaft</h1>
        <p>Die Ehrenkönig:innen der St. Sebastianus Schützenbruderschaft Büderich e.V. seit 1970.</p>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: "900px" }}>

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

              if (group.type === "note") {
                return (
                  <div
                    key={i}
                    style={{
                      padding: "1rem 1.25rem",
                      background: "var(--cream-dark)",
                      borderLeft: "3px solid var(--green)",
                      borderRadius: "0 var(--radius) var(--radius) 0",
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
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

                  <div style={{ padding: "0.5rem 0" }}>
                    {group.kings.map((king) => (
                      <div
                        key={king.year}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "4rem 1fr 1fr",
                          gap: "0.75rem",
                          padding: "0.45rem 1.25rem",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontWeight: 700, color: "var(--gold)", fontSize: "0.875rem", fontVariantNumeric: "tabular-nums" }}>
                          {king.year}
                        </span>
                        <span style={{ fontSize: "0.9rem" }}>{king.name}</span>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{king.title}</span>
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
