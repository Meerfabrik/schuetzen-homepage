export const metadata = {
  title: "Schützenkönig:innen der Bruderschaft",
  description:
    "Die Schützenkönig:innen der St. Sebastianus Schützenbruderschaft Büderich e.V. seit 1856.",
};

type King = { year: number; name: string };

type Group =
  | { type: "kings"; label: string; kings: King[]; defaultOpen?: boolean }
  | { type: "gap"; text: string };

const groups: Group[] = [
  {
    type: "kings",
    label: "1856 – 1899",
    kings: [
      { year: 1856, name: "Albert Hermanns I" },
      { year: 1858, name: "Peter Offermann I" },
      { year: 1860, name: "Hubert Hermes I" },
      { year: 1861, name: "Jakob Pullen I" },
      { year: 1862, name: "Heinrich Buschhüter I" },
      { year: 1863, name: "Heinrich Hermann II" },
      { year: 1864, name: "Heinrich Vossen III" },
      { year: 1865, name: "Heinrich Vossen IV" },
      { year: 1866, name: "Kasper Spicker I" },
      { year: 1867, name: "Michael Bahners I" },
      { year: 1868, name: "Heinrich Gather V" },
      { year: 1869, name: "Paul Bender I" },
      { year: 1870, name: "Franz Kreuels I" },
      { year: 1871, name: "Josef Bahners I" },
      { year: 1872, name: "Jakob Delmes II" },
      { year: 1874, name: "Hubert Klapdor II" },
      { year: 1875, name: "Bernhard Knopp I" },
      { year: 1876, name: "Paul Bender II" },
      { year: 1877, name: "Heinrich Vogel VI" },
      { year: 1878, name: "Hubert Bender III" },
      { year: 1879, name: "Hubert Delmes IV" },
      { year: 1880, name: "Konrad Knopp I" },
      { year: 1881, name: "August Glasen I" },
      { year: 1882, name: "Peter Vossen II" },
      { year: 1883, name: "August v.d. Velden II" },
      { year: 1884, name: "Heinrich Körschgen VII" },
      { year: 1885, name: "Peter Wienen III" },
      { year: 1886, name: "Jakob Pullen III" },
      { year: 1887, name: "Wilhelm Schmitz I" },
      { year: 1889, name: "Balthasar Halmes I" },
      { year: 1890, name: "Franz Ippers II" },
      { year: 1891, name: "Paul Niess III" },
      { year: 1892, name: "Peter Hagen IV" },
      { year: 1893, name: "Johann Pescher I" },
      { year: 1894, name: "Johann Gather II" },
      { year: 1895, name: "Peter Bierewitz V" },
      { year: 1896, name: "Stephan Vossen I" },
      { year: 1897, name: "Peter Wellmanns VI" },
      { year: 1898, name: "Adolf Kreuels I" },
      { year: 1899, name: "Konrad Buschhüter II" },
    ],
  },
  {
    type: "kings",
    label: "1900 – 1914",
    kings: [
      { year: 1900, name: "Josef Bender II" },
      { year: 1901, name: "Stephan Bender II" },
      { year: 1902, name: "Peter Frienen VII" },
      { year: 1903, name: "Franz Schreiner III" },
      { year: 1904, name: "Franz Ippers IV" },
      { year: 1905, name: "Michael Mosterts II" },
      { year: 1906, name: "Johann Schneider III" },
      { year: 1907, name: "Anton Rustemeier I" },
      { year: 1908, name: "Wilhelm Driessen II" },
      { year: 1909, name: "Johann Büschkes IV" },
      { year: 1910, name: "Willy Klein III" },
      { year: 1911, name: "Wilhelm Wankum IV" },
      { year: 1912, name: "Josef Kox III" },
      { year: 1913, name: "Kornelius Gather I" },
      { year: 1914, name: "Anton Rustemeier II" },
    ],
  },
  {
    type: "gap",
    text: "Von 1915 bis 1918 fand wegen des 1. Weltkrieges kein Schützenfest statt. Von 1919 bis 1921 und von 1923 bis 1924 gab die belgische Besatzung keine Erlaubnis.",
  },
  {
    type: "kings",
    label: "1922 – 1939 · Zwischenkriegszeit",
    kings: [
      { year: 1922, name: "Bernhard Rennertz II" },
      { year: 1925, name: "Wilhelm Jungbluth V" },
      { year: 1926, name: "Josef Delmes IV" },
      { year: 1927, name: "Hermann Toups I" },
      { year: 1928, name: "Heinrich Stamm VIII" },
      { year: 1929, name: "Michael Nüssgen III" },
      { year: 1930, name: "Jakob Bender IV" },
      { year: 1931, name: "Wilhelm Bademann VI" },
      { year: 1932, name: "Josef Schumacher V" },
      { year: 1933, name: "Heinrich Schöneberg IX" },
      { year: 1934, name: "Christian Niesen I" },
      { year: 1935, name: "Gustav Jonas I" },
      { year: 1936, name: "Anton Rustemeier III" },
      { year: 1937, name: "Ludwig Viehmann I" },
      { year: 1938, name: "Adam Stein I" },
      { year: 1939, name: "Wilhelm Zilling VII" },
    ],
  },
  {
    type: "gap",
    text: "Von 1940 bis 1948 fand wegen des 2. Weltkrieges und der anschließenden Besatzung kein Schützenfest statt.",
  },
  {
    type: "kings",
    label: "1949 – 1969 · Neubeginn nach dem Krieg",
    kings: [
      { year: 1949, name: "Heinrich Hagemus X" },
      { year: 1950, name: "Peter Buschhüter VIII" },
      { year: 1951, name: "Hermann Poell II" },
      { year: 1952, name: "Michael Esser IV" },
      { year: 1953, name: "Hugo Schmitges I" },
      { year: 1954, name: "Kurt Schmücker I" },
      { year: 1955, name: "Willi Kippels VIII" },
      { year: 1956, name: "Toni Plenkers IV" },
      { year: 1957, name: "Eberhard Barthels I" },
      { year: 1958, name: "Hans Bender V" },
      { year: 1959, name: "Josef Gorgs VI" },
      { year: 1960, name: "Alois Lukei I" },
      { year: 1961, name: "Fritz Bahners I" },
      { year: 1962, name: "Erwin Schmitz I" },
      { year: 1963, name: "Josef Klein VII" },
      { year: 1964, name: "Josef Schnauber VIII" },
      { year: 1965, name: "Alfons Wirtz I" },
      { year: 1966, name: "Hans van Vreden VI" },
      { year: 1967, name: "Josef Breuer IX" },
      { year: 1968, name: "Franz Lorenzen V" },
      { year: 1969, name: "Hans Jung VII" },
    ],
  },
  {
    type: "kings",
    label: "1970 – 1989",
    kings: [
      { year: 1970, name: "Hans Rustemeier VIII" },
      { year: 1971, name: "Konny Kamp I" },
      { year: 1972, name: "Günter Körschgen I" },
      { year: 1973, name: "Josef Gröters X" },
      { year: 1974, name: "Karl Theis I" },
      { year: 1975, name: "Peter Theunissen IX" },
      { year: 1976, name: "Peter Weber X" },
      { year: 1977, name: "Heinz Seipelt I" },
      { year: 1978, name: "Franz Gerritzen VI" },
      { year: 1979, name: "Hans Weiß IX" },
      { year: 1980, name: "Hans Carlsen X" },
      { year: 1981, name: "Willi Thissen IX" },
      { year: 1982, name: "Edmund Motes I" },
      { year: 1983, name: "Hans-Hubert Hamacher I" },
      { year: 1984, name: "Hubert Jung V" },
      { year: 1985, name: "Andreas Laveaux I" },
      { year: 1986, name: "Horst Diel I" },
      { year: 1987, name: "Gerd Kessel I" },
      { year: 1988, name: "Hans-Georg Bodewig I" },
      { year: 1989, name: "Martin Bödefeld I" },
    ],
  },
  {
    type: "kings",
    label: "1990 – 2009",
    kings: [
      { year: 1990, name: "Wolfgang Panzer I" },
      { year: 1991, name: "Karl-Heinz Vogler I" },
      { year: 1992, name: "Gerd van Vreden II" },
      { year: 1993, name: "Michael Hermes V" },
      { year: 1994, name: "Reinhard Hermanns I" },
      { year: 1995, name: "Peter Tilgner XI" },
      { year: 1996, name: "Georg Schoppe I" },
      { year: 1997, name: "Josef Dahl XI" },
      { year: 1998, name: "Jürgen Wirtz I" },
      { year: 1999, name: "Hans-Michael Laumen I" },
      { year: 2000, name: "Heiner Pelzer I" },
      { year: 2001, name: "Edgar Malter I" },
      { year: 2002, name: "Ewald Blombach I" },
      { year: 2003, name: "Karl-Heinz Butz II" },
      { year: 2004, name: "Werner Andreer I" },
      { year: 2005, name: "Ingo Beier I" },
      { year: 2006, name: "Carlo Schäfer I" },
      { year: 2007, name: "Thomas Kunze I" },
      { year: 2008, name: "Peter Gröters XII" },
      { year: 2009, name: "Michael Kunze VI" },
    ],
  },
  {
    type: "kings",
    label: "2010 – 2019",
    kings: [
      { year: 2010, name: "Willi Vieten X" },
      { year: 2011, name: "Manfred Strutz I" },
      { year: 2012, name: "Thomas Bergmann II" },
      { year: 2013, name: "Christian Bodewig II" },
      { year: 2014, name: "Michael Bödefeld VII" },
      { year: 2015, name: "Ralph Brors I" },
      { year: 2016, name: "Niko Neuville I" },
      { year: 2017, name: "Robert v. Vreden I" },
      { year: 2018, name: "Thomas Kepurra III" },
      { year: 2019, name: "Rainer Höterkes I" },
    ],
  },
  {
    type: "gap",
    text: "Von 2020 bis 2021 fand auf Grund der Corona-Pandemie kein Schützenfest statt.",
  },
  {
    type: "kings",
    label: "2022 – heute",
    defaultOpen: true,
    kings: [
      { year: 2022, name: "Ferdinand van Meegen I" },
      { year: 2023, name: "Monique Schuchardt I" },
      { year: 2024, name: "Ralf Höterkes II" },
    ],
  },
];

export default function SchuetzenkoenigePage() {
  return (
    <>
      <style>{`
        .kings-columns { columns: 2; }
        @media (max-width: 540px) { .kings-columns { columns: 1; } }
      `}</style>

      <div className="page-hero">
        <div className="page-hero-badge">Geschichte</div>
        <h1>Schützenkönig:innen der Bruderschaft</h1>
        <p>Die Schützenkönig:innen der St. Sebastianus Schützenbruderschaft Büderich e.V. seit 1856.</p>
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
