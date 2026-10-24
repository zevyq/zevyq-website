import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen | ZEVYQ",
  description: "Entwurf der Allgemeinen Geschäftsbedingungen von ZEVYQ.",
  robots: { index: false, follow: false },
};

export default function AGBPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <aside className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-5 text-amber-100">
        <h2 className="text-lg font-bold">Entwurf – noch nicht veröffentlichen</h2>
        <p>
          Diese Bedingungen sind noch nicht zur Verwendung freigegeben.
          Vertragsabschluss, Preis- und Steuerdarstellung, Verlängerung,
          Kündigungsablauf und Checkout müssen vor dem Start mit der
          tatsächlichen technischen Umsetzung und den gesetzlichen
          Verbraucheranforderungen abgeglichen werden.
        </p>
      </aside>

      <section>
        <h2>1. Anbieter und Geltungsbereich</h2>
        <p>
          Anbieter ist Malte Emser, handelnd unter der Bezeichnung ZEVYQ,
          Panoramastraße 5, 91555 Feuchtwangen, Deutschland.
        </p>
        <p>
          Diese Allgemeinen Geschäftsbedingungen sollen die Nutzung der
          ZEVYQ-Website und der darüber angebotenen digitalen Dienste regeln.
          Abweichende oder ergänzende Bedingungen gelten nur, soweit sie
          wirksam vereinbart wurden.
        </p>
        <p>
          Kontakt: <a href="mailto:support@zevyq.de">support@zevyq.de</a>
        </p>
      </section>

      <section>
        <h2>2. Leistungsangebot</h2>
        <p>
          ZEVYQ stellt datenbasierte, KI-gestützte Sportanalysen,
          Informationen zu Sportereignissen sowie Bewertungen ausgewählter
          Wettmärkte bereit. Je nach Angebot können kostenlose und
          kostenpflichtige Funktionen verfügbar sein.
        </p>
        <p>
          Zum Leistungsumfang können insbesondere ausgewählte Tipps,
          Analysen, Tipp-Historien, Statistiken und persönliche Funktionen
          gehören. Welche Funktionen im jeweiligen Tarif enthalten sind,
          muss vor Abschluss des Vertrags klar dargestellt werden.
        </p>
      </section>

      <section>
        <h2>3. Keine Wettvermittlung und keine Erfolgsgarantie</h2>
        <p>
          ZEVYQ ist kein Wettanbieter. Über ZEVYQ werden keine Wetten
          angenommen oder vermittelt. ZEVYQ führt keine Wettkonten und
          verwaltet keine Wetteinsätze oder Gewinne.
        </p>
        <p>
          Analysen, Modellwahrscheinlichkeiten, Quotenbewertungen und Tipps
          sind Einschätzungen auf Grundlage der verfügbaren Daten. Sie
          garantieren weder einen bestimmten Spielausgang noch einen
          finanziellen Erfolg. Sportereignisse können anders verlaufen als
          prognostiziert.
        </p>
        <p>
          Entscheidungen über die Teilnahme an Sportwetten und über
          Einsätze trifft der Nutzer eigenverantwortlich. Zwingende
          gesetzliche Ansprüche bleiben unberührt.
        </p>
      </section>

      <section>
        <h2>4. Benutzerkonto</h2>
        <p>
          Für bestimmte Funktionen kann ein Benutzerkonto erforderlich sein.
          Bei der Registrierung sind zutreffende Angaben zu machen. Die
          Zugangsdaten sind vor dem Zugriff Dritter zu schützen.
        </p>
        <p>
          Nutzer dürfen technische Schutzmaßnahmen nicht umgehen, keine
          Zugangsdaten anderer Personen verwenden und die Dienste nicht
          missbräuchlich automatisiert abfragen.
        </p>
      </section>

      <section>
        <h2>5. Premium-Angebote und geplante Preise</h2>
        <p>
          Für kostenpflichtige Premium-Funktionen sind derzeit folgende
          Abonnementpreise vorgesehen:
        </p>
        <ul>
          <li>Premium monatlich: 14,99 € je Monat.</li>
          <li>Premium jährlich: 119,99 € je Jahr.</li>
        </ul>
        <p>
          Vor einer Bestellung müssen der tatsächlich geltende Endpreis,
          etwaige Steuern, der Abrechnungszeitraum, die Laufzeit sowie die
          Bedingungen einer Verlängerung und Kündigung eindeutig und
          verständlich angezeigt werden. Die steuerliche Preisgestaltung
          und die endgültige Checkout-Anzeige sind vor dem Start noch zu
          bestätigen.
        </p>
        <p>
          Welche Funktionen im Premium-Angebot enthalten sind, wird in
          der jeweiligen Angebotsdarstellung beschrieben. Änderungen
          abgeschlossener Verträge richten sich nach den gesetzlichen
          Vorschriften und den wirksam vereinbarten Vertragsbedingungen.
        </p>
      </section>

      <section>
        <h2>6. Vertragsschluss und Zahlung über die Website</h2>
        <p>
          Website-Abonnements sollen über einen Online-Checkout angeboten
          werden. Die verbindliche Bestellstrecke muss vor Abschluss alle
          gesetzlich erforderlichen Informationen klar und verständlich
          darstellen und eine eindeutige Bestätigung der Zahlungspflicht
          verlangen.
        </p>
        <p>
          Die Website-Zahlungen sind für eine spätere Abwicklung über Stripe
          vorgesehen. Die tatsächliche Einbindung, der Zeitpunkt des
          Vertragsschlusses, die Zahlungsbestätigung und die Freischaltung
          der Premium-Funktionen müssen vor dem Start technisch und
          rechtlich abschließend festgelegt werden.
        </p>
        <p>
          Die auf der endgültigen Bestellseite angebotenen Zahlungsarten
          werden dort angezeigt. Die Einzelheiten der Verarbeitung
          personenbezogener Zahlungs- und Vertragsdaten sind in den
          <a href="/datenschutz">Datenschutzhinweisen</a> zu erläutern.
        </p>
      </section>

      <section>
        <h2>7. Laufzeit, Verlängerung und Kündigung</h2>
        <p>
          Die für das jeweilige Abonnement geltende Laufzeit, Abrechnung,
          automatische Verlängerung und Kündigungsfrist müssen vor der
          Bestellung eindeutig dargestellt werden. Die Vertragsbedingungen
          müssen mit der tatsächlich eingerichteten Abonnementverwaltung
          übereinstimmen.
        </p>
        <p>
          Für online abschließbare entgeltliche Dauerschuldverhältnisse
          sind die gesetzlichen Vorgaben zur Kündigung im elektronischen
          Geschäftsverkehr zu beachten. Die erforderliche Kündigungsfunktion
          und ihre Bestätigungsstrecke sind vor Aktivierung des
          Website-Abonnements einzurichten und zu testen.
        </p>
        <p>
          Zwingende gesetzliche Kündigungsrechte, insbesondere das Recht
          zur Kündigung aus wichtigem Grund, bleiben unberührt.
        </p>
      </section>

      <section>
        <h2>8. App-Abonnements</h2>
        <p>
          Abonnements, die über einen App Store abgeschlossen werden,
          sind von einem Website-Abonnement zu unterscheiden. Für solche
          Käufe gelten die Bedingungen des jeweiligen App-Store-Anbieters
          zusätzlich im jeweils anwendbaren Umfang. Verwaltung, Zahlung,
          Kündigung und Wiederherstellung solcher Käufe richten sich nach
          dem jeweiligen Kaufweg und den gesetzlichen Vorschriften.
        </p>
      </section>

      <section>
        <h2>9. Verfügbarkeit und Änderungen</h2>
        <p>
          ZEVYQ bemüht sich um eine zuverlässige Bereitstellung der Dienste.
          Wartungsarbeiten, technische Störungen, Netzwerkprobleme oder
          Ausfälle von Dienstleistern können die Verfügbarkeit vorübergehend
          einschränken.
        </p>
        <p>
          Die Website und ihre Funktionen können weiterentwickelt und
          aktualisiert werden. Soweit Änderungen kostenpflichtige digitale
          Leistungen betreffen, werden gesetzliche Informations-, Änderungs-
          und Beendigungsrechte beachtet.
        </p>
      </section>

      <section>
        <h2>10. Inhalte und unzulässige Nutzung</h2>
        <p>
          Texte, Analysen, Darstellungen und Softwarebestandteile von ZEVYQ
          sind, soweit gesetzlich geschützt, urheberrechtlich oder anderweitig
          geschützt. Eine über die bestimmungsgemäße Nutzung hinausgehende
          Verwertung ist ohne entsprechende Berechtigung nicht gestattet.
        </p>
        <p>
          Die Dienste dürfen nicht zu rechtswidrigen Zwecken genutzt werden.
          Die gesetzlichen Vorgaben zum Jugend- und Verbraucherschutz sind
          zu beachten.
        </p>
      </section>

      <section>
        <h2>11. Widerruf und Verbraucherrechte</h2>
        <p>
          Verbraucherrechte bleiben unberührt. Ob und unter welchen
          Voraussetzungen ein Widerrufsrecht besteht, richtet sich nach
          den gesetzlichen Vorschriften und dem jeweiligen Vertrag.
        </p>
        <p>
          Weitere Informationen werden in der
          <a href="/widerruf">Widerrufsbelehrung</a> bereitgestellt.
          Diese muss vor dem Start an das tatsächliche Website-Angebot
          und den konkreten Bestellablauf angepasst werden.
        </p>
      </section>

      <section>
        <h2>12. Haftung</h2>
        <p>
          ZEVYQ haftet nach den gesetzlichen Vorschriften. Zwingende
          gesetzliche Haftung, insbesondere für Vorsatz, grobe Fahrlässigkeit,
          Verletzung von Leben, Körper oder Gesundheit sowie zwingende
          Verbraucherrechte, wird durch diese Bedingungen nicht beschränkt.
        </p>
      </section>

      <section>
        <h2>13. Schlussbestimmungen</h2>
        <p>
          Es gelten die gesetzlichen Bestimmungen. Unwirksame Bestimmungen
          berühren die Wirksamkeit der übrigen Bedingungen nicht, soweit
          die gesetzlichen Vorschriften dies zulassen.
        </p>
        <p>
          Für Fragen zu ZEVYQ ist der Support unter
          {" "}
          <a href="mailto:support@zevyq.de">support@zevyq.de</a>
          {" "}erreichbar.
        </p>
      </section>
    </LegalPage>
  );
}