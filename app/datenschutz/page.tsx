import styles from "./page.module.css";

export const metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der St. Sebastianus-Schützenbruderschaft Büderich von 1567 e.V.",
};

export default function DatenschutzPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-badge">Rechtliches</div>
        <h1>Datenschutzerklärung</h1>
        <p>Informationen zum Umgang mit Ihren personenbezogenen Daten.</p>
      </div>

      <section className="section">
        <div className={styles.content}>
          <p className={styles.intro}>
            Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der
            Verarbeitung von personenbezogenen Daten (nachfolgend kurz &bdquo;Daten&ldquo;)
            innerhalb unseres Onlineangebotes und der mit ihm verbundenen Webseiten, Funktionen
            und Inhalte sowie externen Onlinepräsenzen, wie z.B. unser Social Media Profile auf.
            (nachfolgend gemeinsam bezeichnet als &bdquo;Onlineangebot&ldquo;). Im Hinblick auf
            die verwendeten Begrifflichkeiten, wie z.B. &bdquo;Verarbeitung&ldquo; oder
            &bdquo;Verantwortlicher&ldquo; verweisen wir auf die Definitionen im Art. 4 der
            Datenschutzgrundverordnung (DSGVO).
          </p>

          <div className={styles.abschnitt}>
            <h2>Verantwortlicher</h2>
            <address className={styles.address}>
              St. Sebastianus-Schützenbruderschaft Büderich von 1567 e.V.<br />
              Der Vorstand<br />
              Geschäftsstelle Alter Kirchweg 8<br />
              40667 Meerbusch
            </address>
          </div>

          <div className={styles.abschnitt}>
            <h2>Arten der verarbeiteten Daten</h2>
            <ul>
              <li>Bestandsdaten (z.B., Namen, Adressen).</li>
              <li>Kontaktdaten (z.B., E-Mail, Telefonnummern).</li>
              <li>Inhaltsdaten (z.B., Texteingaben, Fotografien, Videos).</li>
              <li>Nutzungsdaten (z.B., besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten).</li>
              <li>Meta-/Kommunikationsdaten (z.B., Geräte-Informationen, IP-Adressen).</li>
            </ul>
          </div>

          <div className={styles.abschnitt}>
            <h2>Kategorien betroffener Personen</h2>
            <p>
              Besucher und Nutzer des Onlineangebotes (Nachfolgend bezeichnen wir die betroffenen
              Personen zusammenfassend auch als &bdquo;Nutzer&ldquo;).
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Zweck der Verarbeitung</h2>
            <ul>
              <li>Zurverfügungstellung des Onlineangebotes, seiner Funktionen und Inhalte.</li>
              <li>Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern.</li>
              <li>Sicherheitsmaßnahmen.</li>
              <li>Reichweitenmessung/Marketing</li>
            </ul>
          </div>

          <div className={styles.abschnitt}>
            <h2>Verwendete Begrifflichkeiten</h2>
            <p>
              &bdquo;Personenbezogene Daten&ldquo; sind alle Informationen, die sich auf eine
              identifizierte oder identifizierbare natürliche Person (im Folgenden
              &bdquo;betroffene Person&ldquo;) beziehen; als identifizierbar wird eine natürliche
              Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer
              Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer
              Online-Kennung (z.B. Cookie) oder zu einem oder mehreren besonderen Merkmalen
              identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen,
              psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen
              Person sind.
            </p>
            <p>
              &bdquo;Verarbeitung&ldquo; ist jeder mit oder ohne Hilfe automatisierter Verfahren
              ausgeführten Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit
              personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch jeden Umgang
              mit Daten.
            </p>
            <p>
              Als &bdquo;Verantwortlicher&ldquo; wird die natürliche oder juristische Person,
              Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über
              die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet,
              bezeichnet.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Maßgebliche Rechtsgrundlagen</h2>
            <p>
              Nach Maßgabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen unserer
              Datenverarbeitungen mit. Sofern die Rechtsgrundlage in der Datenschutzerklärung nicht
              genannt wird, gilt Folgendes: Die Rechtsgrundlage für die Einholung von
              Einwilligungen ist Art. 6 Abs. 1 lit. a und Art. 7 DSGVO, die Rechtsgrundlage für
              die Verarbeitung zur Erfüllung unserer Leistungen und Durchführung vertraglicher
              Maßnahmen sowie Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO, die
              Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer rechtlichen
              Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO, und die Rechtsgrundlage für die
              Verarbeitung zur Wahrung unserer berechtigten Interessen ist Art. 6 Abs. 1 lit. f
              DSGVO. Für den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer
              anderen natürlichen Person eine Verarbeitung personenbezogener Daten erforderlich
              machen, dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Zusammenarbeit mit Auftragsverarbeitern und Dritten</h2>
            <p>
              Sofern wir im Rahmen unserer Verarbeitung Daten gegenüber anderen Personen und
              Unternehmen (Auftragsverarbeitern oder Dritten) offenbaren, sie an diese übermitteln
              oder ihnen sonst Zugriff auf die Daten gewähren, erfolgt dies nur auf Grundlage einer
              gesetzlichen Erlaubnis (z.B. wenn eine Übermittlung der Daten an Dritte, wie an
              Zahlungsdienstleister, gem. Art. 6 Abs. 1 lit. b DSGVO zur Vertragserfüllung
              erforderlich ist), Sie eingewilligt haben, eine rechtliche Verpflichtung dies vorsieht
              oder auf Grundlage unserer berechtigten Interessen (z.B. beim Einsatz von
              Beauftragten, Webhostern, etc.).
            </p>
            <p>
              Sofern wir Dritte mit der Verarbeitung von Daten auf Grundlage eines sog.
              &bdquo;Auftragsverarbeitungsvertrages&ldquo; beauftragen, geschieht dies auf Grundlage
              des Art. 28 DSGVO.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Übermittlungen in Drittländer</h2>
            <p>
              Sofern wir Daten in einem Drittland (d.h. außerhalb der Europäischen Union (EU) oder
              des Europäischen Wirtschaftsraums (EWR)) verarbeiten oder dies im Rahmen der
              Inanspruchnahme von Diensten Dritter oder Offenlegung, bzw. Übermittlung von Daten an
              Dritte geschieht, erfolgt dies nur, wenn es zur Erfüllung unserer (vor)vertraglichen
              Pflichten, auf Grundlage Ihrer Einwilligung, aufgrund einer rechtlichen Verpflichtung
              oder auf Grundlage unserer berechtigten Interessen geschieht. Vorbehaltlich
              gesetzlicher oder vertraglicher Erlaubnisse, verarbeiten oder lassen wir die Daten in
              einem Drittland nur beim Vorliegen der besonderen Voraussetzungen der Art. 44 ff.
              DSGVO verarbeiten. D.h. die Verarbeitung erfolgt z.B. auf Grundlage besonderer
              Garantien, wie der offiziell anerkannten Feststellung eines der EU entsprechenden
              Datenschutzniveaus (z.B. für die USA durch das &bdquo;Privacy Shield&ldquo;) oder
              Beachtung offiziell anerkannter spezieller vertraglicher Verpflichtungen (so genannte
              &bdquo;Standardvertragsklauseln&ldquo;).
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Rechte der betroffenen Personen</h2>
            <p>
              Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten
              verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen
              und Kopie der Daten entsprechend Art. 15 DSGVO.
            </p>
            <p>
              Sie haben entsprechend. Art. 16 DSGVO das Recht, die Vervollständigung der Sie
              betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu
              verlangen.
            </p>
            <p>
              Sie haben nach Maßgabe des Art. 17 DSGVO das Recht zu verlangen, dass betreffende
              Daten unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe des Art. 18 DSGVO
              eine Einschränkung der Verarbeitung der Daten zu verlangen.
            </p>
            <p>
              Sie haben das Recht zu verlangen, dass die Sie betreffenden Daten, die Sie uns
              bereitgestellt haben nach Maßgabe des Art. 20 DSGVO zu erhalten und deren Übermittlung
              an andere Verantwortliche zu fordern.
            </p>
            <p>
              Sie haben ferner gem. Art. 77 DSGVO das Recht, eine Beschwerde bei der zuständigen
              Aufsichtsbehörde einzureichen.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Widerrufsrecht</h2>
            <p>
              Sie haben das Recht, erteilte Einwilligungen gem. Art. 7 Abs. 3 DSGVO mit Wirkung für
              die Zukunft zu widerrufen.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Widerspruchsrecht</h2>
            <p>
              Sie können der künftigen Verarbeitung der Sie betreffenden Daten nach Maßgabe des
              Art. 21 DSGVO jederzeit widersprechen. Der Widerspruch kann insbesondere gegen die
              Verarbeitung für Zwecke der Direktwerbung erfolgen.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Cookies und Widerspruchsrecht bei Direktwerbung</h2>
            <p>
              Als &bdquo;Cookies&ldquo; werden kleine Dateien bezeichnet, die auf Rechnern der
              Nutzer gespeichert werden. Innerhalb der Cookies können unterschiedliche Angaben
              gespeichert werden. Ein Cookie dient primär dazu, die Angaben zu einem Nutzer (bzw.
              dem Gerät auf dem das Cookie gespeichert ist) während oder auch nach seinem Besuch
              innerhalb eines Onlineangebotes zu speichern. Als temporäre Cookies, bzw.
              &bdquo;Session-Cookies&ldquo; oder &bdquo;transiente Cookies&ldquo;, werden Cookies
              bezeichnet, die gelöscht werden, nachdem ein Nutzer ein Onlineangebot verlässt und
              seinen Browser schließt. In einem solchen Cookie kann z.B. der Inhalt eines Warenkorbs
              in einem Onlineshop oder ein Login-Status gespeichert werden. Als
              &bdquo;permanent&ldquo; oder &bdquo;persistent&ldquo; werden Cookies bezeichnet, die
              auch nach dem Schließen des Browsers gespeichert bleiben. So kann z.B. der
              Login-Status gespeichert werden, wenn die Nutzer diese nach mehreren Tagen aufsuchen.
              Ebenso können in einem solchen Cookie die Interessen der Nutzer gespeichert werden,
              die für Reichweitenmessung oder Marketingzwecke verwendet werden. Als
              &bdquo;Third-Party-Cookie&ldquo; werden Cookies bezeichnet, die von anderen Anbietern
              als dem Verantwortlichen, der das Onlineangebot betreibt, angeboten werden
              (andernfalls, wenn es nur dessen Cookies sind spricht man von &bdquo;First-Party
              Cookies&ldquo;).
            </p>
            <p>
              Wir können temporäre und permanente Cookies einsetzen und klären hierüber im Rahmen
              unserer Datenschutzerklärung auf.
            </p>
            <p>
              Falls die Nutzer nicht möchten, dass Cookies auf ihrem Rechner gespeichert werden,
              werden sie gebeten die entsprechende Option in den Systemeinstellungen ihres Browsers
              zu deaktivieren. Gespeicherte Cookies können in den Systemeinstellungen des Browsers
              gelöscht werden. Der Ausschluss von Cookies kann zu Funktionseinschränkungen dieses
              Onlineangebotes führen.
            </p>
            <p>
              Ein genereller Widerspruch gegen den Einsatz der zu Zwecken des Onlinemarketing
              eingesetzten Cookies kann bei einer Vielzahl der Dienste, vor allem im Fall des
              Trackings, über die US-amerikanische
              Seite <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">http://www.aboutads.info/choices/</a> oder
              die EU-Seite <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.com/</a> erklärt
              werden. Des Weiteren kann die Speicherung von Cookies mittels deren Abschaltung in den
              Einstellungen des Browsers erreicht werden. Bitte beachten Sie, dass dann
              gegebenenfalls nicht alle Funktionen dieses Onlineangebotes genutzt werden können.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Löschung von Daten</h2>
            <p>
              Die von uns verarbeiteten Daten werden nach Maßgabe der Art. 17 und 18 DSGVO gelöscht
              oder in ihrer Verarbeitung eingeschränkt. Sofern nicht im Rahmen dieser
              Datenschutzerklärung ausdrücklich angegeben, werden die bei uns gespeicherten Daten
              gelöscht, sobald sie für ihre Zweckbestimmung nicht mehr erforderlich sind und der
              Löschung keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Sofern die Daten
              nicht gelöscht werden, weil sie für andere und gesetzlich zulässige Zwecke erforderlich
              sind, wird deren Verarbeitung eingeschränkt. D.h. die Daten werden gesperrt und nicht
              für andere Zwecke verarbeitet. Das gilt z.B. für Daten, die aus handels- oder
              steuerrechtlichen Gründen aufbewahrt werden müssen.
            </p>
            <p>
              Nach gesetzlichen Vorgaben in Deutschland erfolgt die Aufbewahrung insbesondere für 6
              Jahre gemäß § 257 Abs. 1 HGB (Handelsbücher, Inventare, Eröffnungsbilanzen,
              Jahresabschlüsse, Handelsbriefe, Buchungsbelege, etc.) sowie für 10 Jahre gemäß § 147
              Abs. 1 AO (Bücher, Aufzeichnungen, Lageberichte, Buchungsbelege, Handels- und
              Geschäftsbriefe, Für Besteuerung relevante Unterlagen, etc.).
            </p>
            <p>
              Nach gesetzlichen Vorgaben in Österreich erfolgt die Aufbewahrung insbesondere für 7 J
              gemäß § 132 Abs. 1 BAO (Buchhaltungsunterlagen, Belege/Rechnungen, Konten, Belege,
              Geschäftspapiere, Aufstellung der Einnahmen und Ausgaben, etc.), für 22 Jahre im
              Zusammenhang mit Grundstücken und für 10 Jahre bei Unterlagen im Zusammenhang mit
              elektronisch erbrachten Leistungen, Telekommunikations-, Rundfunk- und
              Fernsehleistungen, die an Nichtunternehmer in EU-Mitgliedstaaten erbracht werden und
              für die der Mini-One-Stop-Shop (MOSS) in Anspruch genommen wird.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Hosting</h2>
            <p>
              Die von uns in Anspruch genommenen Hosting-Leistungen dienen der Zurverfügungstellung
              der folgenden Leistungen: Infrastruktur- und Plattformdienstleistungen,
              Rechenkapazität, Speicherplatz und Datenbankdienste, Sicherheitsleistungen sowie
              technische Wartungsleistungen, die wir zum Zwecke des Betriebs dieses Onlineangebotes
              einsetzen.
            </p>
            <p>
              Hierbei verarbeiten wir, bzw. unser Hostinganbieter Bestandsdaten, Kontaktdaten,
              Inhaltsdaten, Vertragsdaten, Nutzungsdaten, Meta- und Kommunikationsdaten von Kunden,
              Interessenten und Besuchern dieses Onlineangebotes auf Grundlage unserer berechtigten
              Interessen an einer effizienten und sicheren Zurverfügungstellung dieses
              Onlineangebotes gem. Art. 6 Abs. 1 lit. f DSGVO i.V.m. Art. 28 DSGVO (Abschluss
              Auftragsverarbeitungsvertrag).
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Erhebung von Zugriffsdaten und Logfiles</h2>
            <p>
              Wir, bzw. unser Hostinganbieter, erhebt auf Grundlage unserer berechtigten Interessen
              im Sinne des Art. 6 Abs. 1 lit. f. DSGVO Daten über jeden Zugriff auf den Server, auf
              dem sich dieser Dienst befindet (sogenannte Serverlogfiles). Zu den Zugriffsdaten
              gehören Name der abgerufenen Webseite, Datei, Datum und Uhrzeit des Abrufs,
              übertragene Datenmenge, Meldung über erfolgreichen Abruf, Browsertyp nebst Version,
              das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite), IP-Adresse
              und der anfragende Provider.
            </p>
            <p>
              Logfile-Informationen werden aus Sicherheitsgründen (z.B. zur Aufklärung von
              Missbrauchs- oder Betrugshandlungen) für die Dauer von maximal 7 Tagen gespeichert und
              danach gelöscht. Daten, deren weitere Aufbewahrung zu Beweiszwecken erforderlich ist,
              sind bis zur endgültigen Klärung des jeweiligen Vorfalls von der Löschung ausgenommen.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Kontaktaufnahme</h2>
            <p>
              Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular, E-Mail, Telefon oder via
              sozialer Medien) werden die Angaben des Nutzers zur Bearbeitung der Kontaktanfrage und
              deren Abwicklung gem. Art. 6 Abs. 1 lit. b) DSGVO verarbeitet. Die Angaben der Nutzer
              können in einem Customer-Relationship-Management System (&bdquo;CRM System&ldquo;)
              oder vergleichbarer Anfragenorganisation gespeichert werden.
            </p>
            <p>
              Wir löschen die Anfragen, sofern diese nicht mehr erforderlich sind. Wir überprüfen
              die Erforderlichkeit alle zwei Jahre; Ferner gelten die gesetzlichen
              Archivierungspflichten.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Jetpack (WordPress Stats)</h2>
            <p>
              Wir nutzen auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der
              Analyse, Optimierung und wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des
              Art. 6 Abs. 1 lit. f. DSGVO) das Plugin Jetpack (hier die Unterfunktion
              &bdquo;Wordpress Stats&ldquo;), welches ein Tool zur statistischen Auswertung der
              Besucherzugriffe einbindet und von Automattic Inc., 60 29th Street #343, San
              Francisco, CA 94110, USA. Jetpack verwendet sog. &bdquo;Cookies&ldquo;, Textdateien,
              die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der
              Website durch Sie ermöglichen.
            </p>
            <p>
              Automattic ist unter dem Privacy-Shield-Abkommen zertifiziert und bietet hierdurch
              eine Garantie, das europäische Datenschutzrecht
              einzuhalten (<a href="https://www.privacyshield.gov/participant?id=a2zt0000000CbqcAAC&status=Active" target="_blank" rel="noopener noreferrer">https://www.privacyshield.gov/participant?id=a2zt0000000CbqcAAC&amp;status=Active</a>).
            </p>
            <p>
              Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieses
              Onlineangebotes werden auf einem Server in den USA gespeichert. Dabei können aus den
              verarbeiteten Daten Nutzungsprofile der Nutzer erstellt werden, wobei diese nur zu
              Analyse- und nicht zu Werbezwecken eingesetzt werden. Weitere Informationen erhalten
              Sie in den Datenschutzerklärungen von
              Automattic: <a href="https://automattic.com/privacy/" target="_blank" rel="noopener noreferrer">https://automattic.com/privacy/</a> und
              Hinweisen zu
              Jetpack-Cookies: <a href="https://jetpack.com/support/cookies/" target="_blank" rel="noopener noreferrer">https://jetpack.com/support/cookies/</a>.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Google Analytics</h2>
            <p>
              Wir setzen auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der
              Analyse, Optimierung und wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des
              Art. 6 Abs. 1 lit. f. DSGVO) Google Analytics, einen Webanalysedienst der Google LLC
              (&bdquo;Google&ldquo;) ein. Google verwendet Cookies. Die durch das Cookie erzeugten
              Informationen über Benutzung des Onlineangebotes durch die Nutzer werden in der Regel
              an einen Server von Google in den USA übertragen und dort gespeichert.
            </p>
            <p>
              Google ist unter dem Privacy-Shield-Abkommen zertifiziert und bietet hierdurch eine
              Garantie, das europäische Datenschutzrecht
              einzuhalten (<a href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active" target="_blank" rel="noopener noreferrer">https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active</a>).
            </p>
            <p>
              Google wird diese Informationen in unserem Auftrag benutzen, um die Nutzung unseres
              Onlineangebotes durch die Nutzer auszuwerten, um Reports über die Aktivitäten
              innerhalb dieses Onlineangebotes zusammenzustellen und um weitere, mit der Nutzung
              dieses Onlineangebotes und der Internetnutzung verbundene Dienstleistungen, uns
              gegenüber zu erbringen. Dabei können aus den verarbeiteten Daten pseudonyme
              Nutzungsprofile der Nutzer erstellt werden.
            </p>
            <p>
              Wir setzen Google Analytics nur mit aktivierter IP-Anonymisierung ein. Das bedeutet,
              die IP-Adresse der Nutzer wird von Google innerhalb von Mitgliedstaaten der
              Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen
              Wirtschaftsraum gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen
              Server von Google in den USA übertragen und dort gekürzt.
            </p>
            <p>
              Die von dem Browser des Nutzers übermittelte IP-Adresse wird nicht mit anderen Daten
              von Google zusammengeführt. Die Nutzer können die Speicherung der Cookies durch eine
              entsprechende Einstellung ihrer Browser-Software verhindern; die Nutzer können darüber
              hinaus die Erfassung der durch das Cookie erzeugten und auf ihre Nutzung des
              Onlineangebotes bezogenen Daten an Google sowie die Verarbeitung dieser Daten durch
              Google verhindern, indem sie das unter folgendem Link verfügbare Browser-Plugin
              herunterladen und
              installieren: <a href="http://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer">http://tools.google.com/dlpage/gaoptout?hl=de</a>.
            </p>
            <p>
              Weitere Informationen zur Datennutzung durch Google, Einstellungs- und
              Widerspruchsmöglichkeiten erfahren Sie auf den Webseiten von
              Google: <a href="https://www.google.com/intl/de/policies/privacy/partners" target="_blank" rel="noopener noreferrer">https://www.google.com/intl/de/policies/privacy/partners</a> (&bdquo;Datennutzung
              durch Google bei Ihrer Nutzung von Websites oder Apps unserer
              Partner&ldquo;), <a href="http://www.google.com/policies/technologies/ads" target="_blank" rel="noopener noreferrer">http://www.google.com/policies/technologies/ads</a> (&bdquo;Datennutzung
              zu
              Werbezwecken&ldquo;), <a href="http://www.google.de/settings/ads" target="_blank" rel="noopener noreferrer">http://www.google.de/settings/ads</a> (&bdquo;Informationen
              verwalten, die Google verwendet, um Ihnen Werbung einzublenden&ldquo;).
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Onlinepräsenzen in sozialen Medien</h2>
            <p>
              Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und Plattformen, um mit
              den dort aktiven Kunden, Interessenten und Nutzern kommunizieren und sie dort über
              unsere Leistungen informieren zu können. Beim Aufruf der jeweiligen Netzwerke und
              Plattformen gelten die Geschäftsbedingungen und die Datenverarbeitungsrichtlinien deren
              jeweiligen Betreiber.
            </p>
            <p>
              Soweit nicht anders im Rahmen unserer Datenschutzerklärung angegeben, verarbeiten wir
              die Daten der Nutzer sofern diese mit uns innerhalb der sozialen Netzwerke und
              Plattformen kommunizieren, z.B. Beiträge auf unseren Onlinepräsenzen verfassen oder
              uns Nachrichten zusenden.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Einbindung von Diensten und Inhalten Dritter</h2>
            <p>
              Wir setzen innerhalb unseres Onlineangebotes auf Grundlage unserer berechtigten
              Interessen (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb
              unseres Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Inhalts- oder
              Serviceangebote von Drittanbietern ein, um deren Inhalte und Services, wie z.B. Videos
              oder Schriftarten einzubinden (nachfolgend einheitlich bezeichnet als
              &bdquo;Inhalte&ldquo;).
            </p>
            <p>
              Dies setzt immer voraus, dass die Drittanbieter dieser Inhalte, die IP-Adresse der
              Nutzer wahrnehmen, da sie ohne die IP-Adresse die Inhalte nicht an deren Browser senden
              könnten. Die IP-Adresse ist damit für die Darstellung dieser Inhalte erforderlich. Wir
              bemühen uns nur solche Inhalte zu verwenden, deren jeweilige Anbieter die IP-Adresse
              lediglich zur Auslieferung der Inhalte verwenden. Drittanbieter können ferner so
              genannte Pixel-Tags (unsichtbare Grafiken, auch als &bdquo;Web Beacons&ldquo;
              bezeichnet) für statistische oder Marketingzwecke verwenden. Durch die
              &bdquo;Pixel-Tags&ldquo; können Informationen, wie der Besucherverkehr auf den Seiten
              dieser Website ausgewertet werden. Die pseudonymen Informationen können ferner in
              Cookies auf dem Gerät der Nutzer gespeichert werden und unter anderem technische
              Informationen zum Browser und Betriebssystem, verweisende Webseiten, Besuchszeit sowie
              weitere Angaben zur Nutzung unseres Onlineangebotes enthalten, als auch mit solchen
              Informationen aus anderen Quellen verbunden werden.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Google Fonts</h2>
            <p>
              Wir binden die Schriftarten (&bdquo;Google Fonts&ldquo;) des Anbieters Google LLC,
              1600 Amphitheatre Parkway, Mountain View, CA 94043, USA,
              ein. Datenschutzerklärung: <a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer">https://www.google.com/policies/privacy/</a>,
              Opt-Out: <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer">https://adssettings.google.com/authenticated</a>.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Google ReCaptcha</h2>
            <p>
              Wir binden die Funktion zur Erkennung von Bots, z.B. bei Eingaben in
              Onlineformularen (&bdquo;ReCaptcha&ldquo;) des Anbieters Google LLC, 1600
              Amphitheatre Parkway, Mountain View, CA 94043, USA,
              ein. Datenschutzerklärung: <a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer">https://www.google.com/policies/privacy/</a>,
              Opt-Out: <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer">https://adssettings.google.com/authenticated</a>.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Verwendung von Facebook Social Plugins</h2>
            <p>
              Wir nutzen auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der
              Analyse, Optimierung und wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des
              Art. 6 Abs. 1 lit. f. DSGVO) Social Plugins (&bdquo;Plugins&ldquo;) des sozialen
              Netzwerkes facebook.com, welches von der Facebook Ireland Ltd., 4 Grand Canal Square,
              Grand Canal Harbour, Dublin 2, Irland betrieben wird (&bdquo;Facebook&ldquo;). Die
              Plugins können Interaktionselemente oder Inhalte (z.B. Videos, Grafiken oder
              Textbeiträge) darstellen und sind an einem der Facebook Logos erkennbar (weißes
              &bdquo;f&ldquo; auf blauer Kachel, den Begriffen &bdquo;Like&ldquo;, &bdquo;Gefällt
              mir&ldquo; oder einem &bdquo;Daumen hoch&ldquo;-Zeichen) oder sind mit dem Zusatz
              &bdquo;Facebook Social Plugin&ldquo; gekennzeichnet. Die Liste und das Aussehen der
              Facebook Social Plugins kann hier eingesehen
              werden: <a href="https://developers.facebook.com/docs/plugins/" target="_blank" rel="noopener noreferrer">https://developers.facebook.com/docs/plugins/</a>.
            </p>
            <p>
              Facebook ist unter dem Privacy-Shield-Abkommen zertifiziert und bietet hierdurch eine
              Garantie, das europäische Datenschutzrecht
              einzuhalten (<a href="https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active" target="_blank" rel="noopener noreferrer">https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&amp;status=Active</a>).
            </p>
            <p>
              Wenn ein Nutzer eine Funktion dieses Onlineangebotes aufruft, die ein solches Plugin
              enthält, baut sein Gerät eine direkte Verbindung mit den Servern von Facebook auf. Der
              Inhalt des Plugins wird von Facebook direkt an das Gerät des Nutzers übermittelt und
              von diesem in das Onlineangebot eingebunden. Dabei können aus den verarbeiteten Daten
              Nutzungsprofile der Nutzer erstellt werden. Wir haben daher keinen Einfluss auf den
              Umfang der Daten, die Facebook mit Hilfe dieses Plugins erhebt und informiert die
              Nutzer daher entsprechend unserem Kenntnisstand.
            </p>
            <p>
              Durch die Einbindung der Plugins erhält Facebook die Information, dass ein Nutzer die
              entsprechende Seite des Onlineangebotes aufgerufen hat. Ist der Nutzer bei Facebook
              eingeloggt, kann Facebook den Besuch seinem Facebook-Konto zuordnen. Wenn Nutzer mit
              den Plugins interagieren, zum Beispiel den Like Button betätigen oder einen Kommentar
              abgeben, wird die entsprechende Information von Ihrem Gerät direkt an Facebook
              übermittelt und dort gespeichert. Falls ein Nutzer kein Mitglied von Facebook ist,
              besteht trotzdem die Möglichkeit, dass Facebook seine IP-Adresse in Erfahrung bringt
              und speichert. Laut Facebook wird in Deutschland nur eine anonymisierte IP-Adresse
              gespeichert.
            </p>
            <p>
              Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der Daten
              durch Facebook sowie die diesbezüglichen Rechte und Einstellungsmöglichkeiten zum
              Schutz der Privatsphäre der Nutzer, können diese den Datenschutzhinweisen von Facebook
              entnehmen: <a href="https://www.facebook.com/about/privacy/" target="_blank" rel="noopener noreferrer">https://www.facebook.com/about/privacy/</a>.
            </p>
            <p>
              Wenn ein Nutzer Facebookmitglied ist und nicht möchte, dass Facebook über dieses
              Onlineangebot Daten über ihn sammelt und mit seinen bei Facebook gespeicherten
              Mitgliedsdaten verknüpft, muss er sich vor der Nutzung unseres Onlineangebotes bei
              Facebook ausloggen und seine Cookies löschen. Weitere Einstellungen und Widersprüche
              zur Nutzung von Daten für Werbezwecke, sind innerhalb der Facebook-Profileinstellungen
              möglich: <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer">https://www.facebook.com/settings?tab=ads</a> oder
              über die US-amerikanische
              Seite <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">http://www.aboutads.info/choices/</a> oder
              die EU-Seite <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.com/</a>. Die
              Einstellungen erfolgen plattformunabhängig, d.h. sie werden für alle Geräte, wie
              Desktopcomputer oder mobile Geräte übernommen.
            </p>
          </div>

          <div className={styles.abschnitt}>
            <h2>Einbindung von Google Maps</h2>
            <p>
              Wir binden auf unserer Kontaktseite Kartenmaterial des Dienstes &bdquo;Google Maps&ldquo;
              des Anbieters Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, ein,
              um unseren Standort anschaulich darzustellen und die Anreise zu erleichtern. Die
              Verarbeitung erfolgt auf Grundlage unserer berechtigten Interessen (Art. 6 Abs. 1 lit. f.
              DSGVO) an einer ansprechenden Darstellung unseres Onlineangebotes und einer leichten
              Auffindbarkeit der von uns angegebenen Orte.
            </p>
            <p>
              Beim Aufruf der Kontaktseite werden über das eingebettete Karten-Iframe Daten direkt an
              Server von Google übertragen, u.a. die IP-Adresse des Nutzers, Datum und Uhrzeit der
              Anfrage, die zuvor besuchte Seite (Referrer), Browser- und Betriebssysteminformationen
              sowie ggf. Standortdaten, sofern der Nutzer entsprechende Funktionen freigegeben hat.
              Die Datenverarbeitung kann auch in den USA stattfinden. Hierbei können Daten in
              Drittländer (insbesondere die USA) übermittelt werden; Google ist nach dem
              EU-US Data Privacy Framework zertifiziert.
            </p>
            <p>
              Weitere Informationen zur Datenverarbeitung durch Google sowie zu Einstellungs- und
              Widerspruchsmöglichkeiten finden Sie in den Datenschutzhinweisen von
              Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a> sowie
              in den Einstellungen für die
              Werbedarstellung: <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer">https://adssettings.google.com/authenticated</a>.
            </p>
          </div>

          <div className={styles.footer}>
            Erstellt mit Datenschutz-Generator.de von RA Dr. Thomas Schwenke
          </div>
        </div>
      </section>
    </>
  );
}
