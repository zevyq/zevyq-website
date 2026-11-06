import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | ZEVYQ",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei ZEVYQ.",
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Verarbeitung personenbezogener Daten im
          Zusammenhang mit ZEVYQ ist:
        </p>
        <p>
          Malte Emser
          <br />
          ZEVYQ
          <br />
          Panoramastraße 5
          <br />
          91555 Feuchtwangen
          <br />
          Deutschland
        </p>
        <p>
          E-Mail: <a href="mailto:support@zevyq.de">support@zevyq.de</a>
        </p>
      </section>

      <section>
        <h2>2. Website-Aufruf und technische Daten</h2>
        <p>
          Beim Aufruf der Website werden technisch erforderliche Verbindungs-
          und Zugriffsdaten verarbeitet. Hierzu können die angeforderte
          Adresse, Zeitpunkt des Zugriffs, Referrer, Browser- und
          Betriebssysteminformationen, IP-Adresse sowie technische
          Statusinformationen gehören. Diese Verarbeitung dient der
          Auslieferung, Stabilität und Sicherheit der Website.
        </p>
        <p>
          Rechtsgrundlage ist, soweit die Verarbeitung zur Bereitstellung
          der angeforderten Website erforderlich ist, Art. 6 Abs. 1 lit. b
          DSGVO; für Sicherheits- und Betriebsmaßnahmen kommt Art. 6 Abs. 1
          lit. f DSGVO in Betracht, soweit die gesetzlichen Voraussetzungen
          erfüllt sind.
        </p>
      </section>

      <section>
        <h2>3. Registrierung und Benutzerkonto</h2>
        <p>
          Bei der Registrierung verarbeitet ZEVYQ die E-Mail-Adresse,
          das Passwort sowie den gegebenenfalls eingegebenen Anzeigenamen.
          Passwörter werden im Backend als Passwort-Hash verarbeitet und
          nicht als Klartext-Passwort in der Benutzerkontentabelle
          gespeichert. Bei der Anmeldung werden E-Mail-Adresse und Passwort
          zur Authentifizierung an das ZEVYQ-Backend übermittelt.
        </p>
        <p>
          Zum Benutzerkonto können außerdem eine Benutzer-ID, Kontostatus,
          Tarif- und Abonnementstatus, Erstellungszeitpunkt, letzter
          Anmeldezeitpunkt, Einstellungen und der Status der
          E-Mail-Verifizierung gehören. Für Verifizierungs- und
          Passwort-zurücksetzen-Funktionen werden zeitlich begrenzte
          technische Kennungen verarbeitet.
        </p>
        <p>
          Diese Daten dienen der Registrierung, Anmeldung, Kontoverwaltung,
          Kontosicherheit und Bereitstellung der angeforderten Funktionen.
          Rechtsgrundlage ist grundsätzlich Art. 6 Abs. 1 lit. b DSGVO.
          Soweit Daten zur Abwehr von Missbrauch und zur Sicherung des
          Dienstes erforderlich sind, kann Art. 6 Abs. 1 lit. f DSGVO
          die Rechtsgrundlage sein.
        </p>
      </section>

      <section>
        <h2>4. Lokaler Browserspeicher</h2>
        <p>
          Die Website verwendet den lokalen Browserspeicher (localStorage),
          um Kontoinformationen für angemeldete Funktionen verfügbar zu
          halten. Dazu kann insbesondere der vom Backend zurückgegebene
          Benutzerstatus gehören. Diese Speicherung erfolgt im Browser
          des verwendeten Geräts und ist technisch von Cookies zu
          unterscheiden.
        </p>
        <p>
          Du kannst lokale Website-Daten über die Einstellungen deines
          Browsers löschen. Dadurch kann es erforderlich werden, dich erneut
          anzumelden. Die konkrete Verarbeitung durch Browser, Hosting und
          weitere eingebundene Dienste richtet sich nach deren Funktion
          und den jeweiligen Einstellungen.
        </p>
      </section>

      <section>
        <h2>5. Persönliche Tipps, Verlauf und Bankroll</h2>
        <p>
          Wenn du persönliche Funktionen nutzt, können die Benutzer-ID,
          Tippzuordnungen, Einsätze, Status, Spielergebnisse, Gewinn- oder
          Verlustwerte sowie zugehörige Zeitpunkte verarbeitet werden.
          Diese Angaben dienen dazu, persönliche Tippverläufe,
          Statistiken und Bankroll-Funktionen bereitzustellen.
        </p>
        <p>
          Im Backend können außerdem Abonnementstatus, Laufzeit,
          Verlängerungsinformationen, eingelöste Aktionscodes und
          gewährte Premium-Zeiträume gespeichert werden, soweit diese
          Funktionen für dein Konto verwendet werden.
        </p>
        <p>
          Rechtsgrundlage für die Bereitstellung der von dir genutzten
          Funktionen ist grundsätzlich Art. 6 Abs. 1 lit. b DSGVO.
        </p>
      </section>

      <section>
        <h2>6. Backend und Hosting</h2>
        <p>
          Die Website wird über Vercel bereitgestellt. Für Kontofunktionen,
          Synchronisierung und persönliche Daten verwendet ZEVYQ ein
          Backend, das über Fly.io betrieben wird. Die aktuell konfigurierte
          Backend-Region ist Frankfurt am Main. Das Backend speichert
          Kontodaten und nutzerbezogene Aufzeichnungen in einer Datenbank
          auf persistentem Serverspeicher.
        </p>
        <p>
          Hosting- und Backend-Anbieter können im Rahmen ihrer Dienste
          technische Betriebsdaten verarbeiten. Informationen zu deren
          Datenschutzpraktiken findest du in den jeweiligen
          Anbieterinformationen:
        </p>
        <ul>
          <li>
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
              Datenschutzhinweise von Vercel
            </a>
          </li>
          <li>
            <a href="https://fly.io/legal/privacy-policy/" target="_blank" rel="noreferrer">
              Datenschutzhinweise von Fly.io
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2>7. E-Mail-Versand</h2>
        <p>
          Für bestimmte Kontofunktionen, insbesondere E-Mail-Verifizierung
          und das Zurücksetzen eines Passworts, kann ZEVYQ E-Mails über
          Brevo versenden. Hierfür werden die erforderliche E-Mail-Adresse
          und die zur Zustellung notwendigen Nachrichteninhalte verarbeitet.
        </p>
        <p>
          Weitere Informationen zum Anbieter und dessen
          Datenschutzpraktiken findest du hier:
          {" "}
          <a href="https://www.brevo.com/de/legal/privacypolicy/" target="_blank" rel="noreferrer">
            Datenschutzhinweise von Brevo
          </a>.
        </p>
      </section>

      <section>
        <h2>8. Webanalyse</h2>
        <p>
          Im Website-Code ist Vercel Web Analytics eingebunden. Nach
          Angaben des Anbieters verwendet dieser Analysedienst keine
          Cookies und stellt anonymisierte Auswertungen unter anderem zu
          Seitenaufrufen, Referrern sowie Browser-, Betriebssystem- und
          Standortkategorien bereit.
        </p>
        <p>
          Weitere Informationen findest du in der
          {" "}
          <a href="https://vercel.com/docs/analytics" target="_blank" rel="noreferrer">
            Dokumentation zu Vercel Web Analytics
          </a>.
        </p>
      </section>

      <section><h2>9. Zahlungen und Vertragserklärungen</h2><p>Website-Zahlungen werden durch Stripe abgewickelt. Hierbei verarbeitet Stripe erforderliche Kontakt-, Vertrags-, Rechnungs- und Zahlungsdaten. ZEVYQ speichert zur Zuordnung Kunden- und Abonnementkennungen, Status, Laufzeit und Verlängerungsinformationen. Vollständige Karteninformationen werden nicht in der ZEVYQ-Kontodatenbank gespeichert.</p>
<p>Die Verarbeitung dient der Vertragsdurchführung nach Art. 6 Abs. 1 lit. b DSGVO und gesetzlichen Pflichten nach Art. 6 Abs. 1 lit. c DSGVO. Angaben zu Stripe und internationalen Datenübermittlungen findest du in <a href="https://stripe.com/de/privacy" target="_blank" rel="noreferrer">Stripes Datenschutzhinweisen</a>.</p>
<p>Bei Kündigung oder Widerruf speichern wir Name, E-Mail-Adresse, Vertragsangaben, Erklärung, gegebenenfalls Grund und Wunschtermin sowie Eingangszeitpunkt und Bearbeitungs- und Versandstatus. Dies dient der Bearbeitung, Bestätigung und dem Nachweis. Bestätigungen werden über Brevo versandt. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b und c DSGVO sowie erforderlichenfalls berechtigte Nachweisinteressen nach Art. 6 Abs. 1 lit. f DSGVO. Die Speicherung richtet sich nach der erforderlichen Bearbeitungsdauer und gesetzlichen Aufbewahrungs- und Nachweisfristen.</p>
<p>Bei App-Store-Käufen erfolgt die Zahlung über den jeweiligen Store; ein Abonnementdienst kann zur technischen Zuordnung eingesetzt werden.</p></section>

      <section>
        <h2>10. Speicherdauer und Löschung</h2>
        <p>
          Personenbezogene Daten werden nur so lange gespeichert, wie sie
          für die genannten Zwecke erforderlich sind oder gesetzliche
          Aufbewahrungspflichten bestehen. Kontodaten werden grundsätzlich
          für die Dauer des Benutzerkontos gespeichert.
        </p>
        <p>
          Wenn ein Benutzerkonto gelöscht wird, werden im Backend auch
          die zu diesem Konto gehörenden persönlichen Wettaufzeichnungen,
          Einlösungen von Aktionscodes und Anmeldesitzungen gelöscht.
          Gesetzliche Aufbewahrungspflichten sowie Daten, die aus
          Sicherheits- oder Nachweisgründen rechtmäßig weiter benötigt
          werden, können eine abweichende Speicherung erfordern.
        </p>
        <p>
          Technische Server- und Sicherheitsprotokolle werden nach den
          jeweiligen betrieblichen Erfordernissen und Einstellungen der
          eingesetzten Anbieter aufbewahrt. Die Fristen können je nach
          Datenart und gesetzlicher Verpflichtung unterschiedlich sein.
        </p>
      </section>

      <section>
        <h2>11. Empfänger und Datenübermittlungen</h2>
        <p>
          Je nach genutzter Funktion können Vercel für Website-Bereitstellung
          und Webanalyse, Fly.io für das Backend, Stripe für Website-Zahlungen sowie Brevo für den Versand
          von Kontonachrichten Daten im Rahmen ihrer jeweiligen Dienste
          verarbeiten.
        </p>
        <p>
          Die Verarbeitung durch Anbieter kann abhängig von deren
          Infrastruktur und den jeweils geltenden Verträgen auch außerhalb
          des Europäischen Wirtschaftsraums stattfinden. Maßgebliche
          Übermittlungsmechanismen und Vertragsbedingungen richten sich
          nach der tatsächlich verwendeten Anbietervereinbarung und müssen
          diesen entsprechen.
        </p>
      </section>

      <section>
        <h2>12. Deine Rechte</h2>
        <p>
          Nach Maßgabe der gesetzlichen Voraussetzungen hast du das Recht
          auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung und Datenübertragbarkeit. Soweit eine Verarbeitung
          auf berechtigten Interessen beruht, kannst du aus Gründen, die
          sich aus deiner besonderen Situation ergeben, Widerspruch
          einlegen. Eine auf Einwilligung beruhende Verarbeitung kannst
          du mit Wirkung für die Zukunft widerrufen.
        </p>
        <p>
          Außerdem kannst du dich bei einer zuständigen
          Datenschutzaufsichtsbehörde beschweren. Für private
          Verantwortliche in Bayern ist insbesondere das
          {" "}
          <a href="https://www.lda.bayern.de/" target="_blank" rel="noreferrer">
            Bayerische Landesamt für Datenschutzaufsicht
          </a>
          {" "}eine Anlaufstelle. Die Zuständigkeit richtet sich nach den
          Umständen des Einzelfalls.
        </p>
      </section>

      <section>
        <h2>13. Kontakt und Aktualisierung</h2>
        <p>
          Bei Fragen zum Datenschutz oder zur Ausübung deiner Rechte
          kannst du dich an{" "}
          <a href="mailto:support@zevyq.de">support@zevyq.de</a> wenden.
        </p>
        <p>
          Diese Hinweise werden aktualisiert, wenn sich die tatsächlich
          eingesetzten Dienste, Verarbeitungszwecke oder rechtlichen
          Anforderungen ändern.
        </p>
      </section>
    </LegalPage>
  );
}