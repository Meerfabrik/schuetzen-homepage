import Image from "next/image";

export const metadata = {
  title: "Schießsport",
  description: "Schießsport bei der Schützenbruderschaft Büderich – Training, Vereinsanlage und Wettbewerbe.",
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  borderRadius: "var(--radius)",
  marginBottom: "1.5rem",
};

export default function SchiesssportPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Sport & Brauchtum</div>
        <h1>Schießsport in Büderich</h1>
        <p>Der Schießsport wird bei den Büdericher Schützen großgeschrieben.</p>
      </div>

      {/* --- Training & Geselligkeit --- */}
      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 className="section-title">Training & Geselligkeit</h2>

          <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Unter der Woche treffen sich einzelne Kompanien und Gesellschaften, um miteinander zu
            trainieren und das gesellige Miteinander zu fördern. Neben den üblichen, kleinen
            Wettkämpfen im Training innerhalb des Vereins, wird gefachsimpelt und über aktuelle
            Themen in Büderich und der Welt gesprochen.
          </p>

          <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>
            An jedem zweiten Mittwoch im Monat gibt es die Möglichkeit, ein Leistungsabzeichen
            oder eine der begehrten Jahresleistungsnadeln zu erringen.
          </p>

          <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Nähere Auskunft hierzu erteilt Peter Ritter von der Jägerkompanie Eintracht jeden
            Mittwoch auf unserem Schießstand am Hülsenbuschweg&nbsp;8a.
          </p>

          <div style={{
            padding: "1.5rem",
            background: "var(--cream-dark)",
            borderRadius: "var(--radius)",
            borderLeft: "3px solid var(--gold)",
          }}>
            <h3 style={{ fontFamily: "'Encode Sans Condensed', sans-serif", color: "var(--green)", marginBottom: "0.5rem" }}>
              Leihwaffen für Schützenbrüder & Schützenschwestern
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Für Schützenbrüder und Schützenschwestern die gerne auch am Schießtraining teilnehmen
              wollen, in deren Verein jedoch kein Luftgewehr vorhanden ist, haben die Möglichkeit
              mit einer Leihwaffe zu schießen. Hierfür meldet Ihr Euch bitte bei Michael Bödefeld.
            </p>
          </div>
        </div>
      </section>

      {/* --- Vereinsanlage --- */}
      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 className="section-title">Vereinsanlage am Hülsenbuschweg</h2>

          <Image
            src="/images/schiesssport/aussenanlage.jpg"
            alt="Außenanlage der Vereinsanlage am Hülsenbuschweg"
            width={800}
            height={530}
            style={imgStyle}
          />

          <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Unsere vereinseigene Sportanlage befindet sich am Hülsenbuschweg, im Sport- und
            Freizeitpark „Am Eisenbrand". Sie liegt mitten in der freien Natur, von der
            Außenterrasse haben Sie den freien und unverbauten Blick in die wunderbare
            niederrheinische Landschaft. In unmittelbarer Nähe befindet sich der von der
            Bruderschaft initiierte und jährlich aktualisierte „Pfad der Jahresbäume", an dem Sie
            alle vom Kuratorium „Baum des Jahres" ausgezeichneten Bäume in ihrer
            Unterschiedlichkeit und Vielfalt bewundern können.
          </p>

          <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Vor etwa 20 Jahren wurde die Anlage überwiegend in Eigenleistung durch unsere
            Mitglieder errichtet. Nicht zuletzt aus diesem Grund legen wir großen Wert auf ein
            gepflegtes Aussehen und einen schonenden Umgang mit unserer Anlage und den darin
            befindlichen Einrichtungen.
          </p>

          <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Für den sportlichen Wettbewerb stehen elf Bahnen für Druckluftwaffen und weitere sechs
            Bahnen für Faustfeuerwaffen zur Verfügung.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <Image
              src="/images/schiesssport/stand-druckluft.jpg"
              alt="Elf Bahnen für Druckluftwaffen"
              width={400}
              height={300}
              style={{ ...imgStyle, marginBottom: 0 }}
            />
            <Image
              src="/images/schiesssport/stand-faustfeuer.jpg"
              alt="Schießstand für Faustfeuerwaffen"
              width={400}
              height={300}
              style={{ ...imgStyle, marginBottom: 0 }}
            />
          </div>

          <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Im gärtnerisch schön gestalteten Außenbereich ist ein Hochstand für den traditionellen
            Vogelschuss mit dem KK-Gewehr eingegliedert. Die angrenzende überdachte Terrasse mit
            Außentheke und Sitzgelegenheiten bietet die Möglichkeit das Vogelschießen live zu
            verfolgen und dies bei jeder Witterung – vor Regen sind Sie geschützt.
          </p>

          <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Neben dieser Außenanlage steht für die Geselligkeit ein Vereinsraum für ca. 70 Personen
            zur Verfügung. Auch dieser Raum ist mit einer Thekenanlage und einer voll ausgestatteten
            Küche versehen.
          </p>

          <Image
            src="/images/schiesssport/vereinsraum.jpg"
            alt="Vereinsraum mit Thekenanlage"
            width={800}
            height={600}
            style={imgStyle}
          />

          <p style={{ lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Hinter und neben der Anlage lädt eine große Rasenfläche auch die Kleinsten mit viel
            Platz zum Herumtoben und Spielen ein. Aus unserem Kühlhaus beziehen Sie die gekühlten
            Getränke, die in Selbstbewirtung zum Ausschank kommen. Die Abrechnung erfolgt, wie auch
            bei der Munition, nach dem tatsächlichen Verbrauch.
          </p>

          <div style={{
            padding: "1.5rem",
            background: "white",
            borderRadius: "var(--radius)",
            borderLeft: "3px solid var(--gold)",
          }}>
            <h3 style={{ fontFamily: "'Encode Sans Condensed', sans-serif", color: "var(--green)", marginBottom: "0.5rem" }}>
              Anlage mieten
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Die Anlage steht auch für Nichtmitglieder, benachbarte Bruderschaften oder deren
              Kompanien und Gesellschaften zur Verfügung. Zwecks Terminabsprache oder der
              Mietbedingungen schreiben Sie uns bitte eine E-Mail an{" "}
              <a href="mailto:bruderschaft@schuetzen-buederich.de" style={{ color: "var(--green)", fontWeight: 600 }}>
                bruderschaft@schuetzen-buederich.de
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* --- Schießwettbewerbe --- */}
      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 className="section-title">Schießwettbewerbe</h2>
          <p style={{ lineHeight: 1.8, marginBottom: "2rem" }}>
            In jedem Jahr werden unterschiedliche Wettkämpfe innerhalb der Bruderschaft und darüber
            hinaus ausgetragen.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{
              padding: "1.5rem",
              background: "var(--cream-dark)",
              borderRadius: "var(--radius)",
              borderLeft: "3px solid var(--gold)",
            }}>
              <h3 style={{ fontFamily: "'Encode Sans Condensed', sans-serif", color: "var(--green)", marginBottom: "0.5rem" }}>
                Pokalschießen der Bruderschaft
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Am Jahresanfang werden die geschossenen Ergebnisse der einzelnen Schützen in einer
                Einzelrangliste und gleichzeitig in einer kompanieeigenen Mannschaft gewertet. Bei
                den Mannschaften kämpft jeder gegen jeden.
              </p>
            </div>

            <div style={{
              padding: "1.5rem",
              background: "var(--cream-dark)",
              borderRadius: "var(--radius)",
              borderLeft: "3px solid var(--gold)",
            }}>
              <h3 style={{ fontFamily: "'Encode Sans Condensed', sans-serif", color: "var(--green)", marginBottom: "0.5rem" }}>
                Mannschaftswinterrunde der Bruderschaft
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Am Jahresende werden die geschossenen Ergebnisse nur als Mannschaftsergebnis
                gewertet. Die Mannschaften schießen in verschiedenen Gruppen. Jede Mannschaft
                schießt einmal gegen jeden anderen Gruppenteilnehmer.
              </p>
            </div>

            <div style={{
              padding: "1.5rem",
              background: "var(--cream-dark)",
              borderRadius: "var(--radius)",
              borderLeft: "3px solid var(--gold)",
            }}>
              <h3 style={{ fontFamily: "'Encode Sans Condensed', sans-serif", color: "var(--green)", marginBottom: "0.5rem" }}>
                Bezirksmeisterschaft des Bezirksverband Neuss
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Für diesen Wettkampf kann sich jeder Schütze anmelden, der daran interessiert ist,
                sich auch an weitergehenden Wettkämpfen, auch gegen andere Schützenbruderschaften,
                zu beteiligen. Je nach Leistung kann man es bis zur Bundesmeisterschaft des Bundes
                der Historischen deutschen Schützenbruderschaften bringen.
              </p>
            </div>

            <div style={{
              padding: "1.5rem",
              background: "var(--cream-dark)",
              borderRadius: "var(--radius)",
              borderLeft: "3px solid var(--gold)",
            }}>
              <h3 style={{ fontFamily: "'Encode Sans Condensed', sans-serif", color: "var(--green)", marginBottom: "0.5rem" }}>
                Stadtmeisterschaft der Stadt Meerbusch
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                An diesem Wettkampf darf jeder Bürger der Stadt Meerbusch teilnehmen. Die Anmeldung
                erfolgt an dem Tag des Wettkampfes. Termine werden hier auf der Seite
                bekanntgegeben.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
