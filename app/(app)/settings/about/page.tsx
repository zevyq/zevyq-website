"use client";

import { useState } from "react";

const documents = [
  {
    section: "Über ZEVYQ",
    items: [
      {
        title: "ZEVYQ",
        subtitle: "KI-gestützte Sportanalyse und Wettinformationen",
        icon: "ℹ️",
        content: `ZEVYQ ist eine KI-gestützte Plattform für Sportanalyse und Wettinformationen.

Die ZEVYQ Engine analysiert aktuelle Sport- und Marktdaten und bewertet daraus ausgewählte Tipps.

ZEVYQ stellt Analyseinformationen bereit, ist jedoch kein Wettanbieter, nimmt keine Wetten an und verwaltet keine Wettgelder.

Die App bietet außerdem Tipp-Historie, Statistiken und persönliche Bankroll-Funktionen.`,
      },
      {
        title: "Version",
        subtitle: "ZEVYQ 1.0.0",
        icon: "📱",
        content: "ZEVYQ 1.0.0",
        static: true,
      },
    ],
  },
  {
    section: "Rechtliches",
    items: [
      {
        title: "Impressum",
        subtitle: "Anbieterinformationen",
        icon: "📄",
        content: `ZEVYQ

Anbieter und verantwortliche Stelle:
Malte Emser
ZEVYQ
Panoramastraße 5
91555 Feuchtwangen
Deutschland

Tätigkeit:
ZEVYQ ist eine Plattform für KI-gestützte Sportanalyse und stellt Informationen und Analysen zu Sportereignissen sowie ausgewählten Wettmärkten bereit. ZEVYQ ist kein Wettanbieter und nimmt keine Wetten an.

Kontakt:
E-Mail: support@zevyq.de`,
      },
      {
        title: "Datenschutz",
        subtitle: "Informationen zur Verarbeitung personenbezogener Daten",
        icon: "🔒",
        content: `Datenschutzhinweise

1. Verantwortlicher
Malte Emser
ZEVYQ
Panoramastraße 5
91555 Feuchtwangen
Deutschland
E-Mail: support@zevyq.de

2. Welche Daten können verarbeitet werden?
Bei der Nutzung von ZEVYQ können insbesondere E-Mail-Adresse, Benutzer-ID, Anzeigename soweit hinterlegt, Kontostatus und Einstellungen, gespeicherte persönliche Tipps, persönliche Tipp-Ergebnisse und Bankroll-Daten, Premium- und Abonnementstatus sowie technische Daten verarbeitet werden, die für die Bereitstellung und Synchronisierung der Dienste erforderlich sind.

Wenn Push-Benachrichtigungen aktiviert werden, wird außerdem ein technischer Push-Token verarbeitet, damit Benachrichtigungen an dein Gerät zugestellt werden können.

3. Zwecke der Verarbeitung
Die Daten werden insbesondere zur Bereitstellung und Verwaltung des Benutzerkontos, für Login- und Kontofunktionen, zur Synchronisierung persönlicher Daten, für Tipp-, Statistik- und Bankroll-Funktionen, zur technischen Verwaltung von Premium-Mitgliedschaften, zur Zustellung aktivierter Push-Benachrichtigungen sowie zur Sicherheit und Funktionsfähigkeit der ZEVYQ-Dienste verarbeitet.

4. Rechtsgrundlagen
Die Verarbeitung erfolgt je nach Zweck insbesondere auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, soweit sie für die Durchführung des Nutzungsverhältnisses erforderlich ist, Art. 6 Abs. 1 lit. c DSGVO, soweit eine gesetzliche Verpflichtung besteht, sowie Art. 6 Abs. 1 lit. f DSGVO, soweit sie zur Wahrung berechtigter Interessen erforderlich ist. Soweit eine Verarbeitung auf einer Einwilligung beruht, erfolgt sie auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.

5. ZEVYQ-Backend
Für Benutzerkonto, Synchronisierung und persönliche Funktionen werden die hierfür erforderlichen Daten über das ZEVYQ-Backend verarbeitet. Der Umfang der Speicherung richtet sich nach der jeweils genutzten Funktion.

6. Premium-Mitgliedschaften
Für die technische Verwaltung von Premium-Mitgliedschaften verwendet ZEVYQ RevenueCat. RevenueCat verarbeitet von ZEVYQ übermittelte Endnutzerdaten als Auftragsverarbeiter. Dabei können insbesondere eine technische Benutzerzuordnung und Informationen zum Abonnement verarbeitet werden. Für bestimmte Datenverarbeitungen setzt RevenueCat technische Dienstleister und Unterauftragsverarbeiter ein.

RevenueCat gibt an, Kundendaten über Amazon Web Services in den USA zu speichern. Für entsprechende Übermittlungen aus dem Europäischen Wirtschaftsraum stellt RevenueCat nach seinem aktuellen Data Processing Addendum unter anderem EU-Standardvertragsklauseln als Übermittlungsmechanismus bereit.

Die Zahlung und Abrechnung einer über einen App Store abgeschlossenen In-App-Mitgliedschaft erfolgt über den jeweiligen App-Store-Anbieter.

7. Push-Benachrichtigungen
Wenn Push-Benachrichtigungen aktiviert werden, verarbeitet ZEVYQ den hierfür erforderlichen technischen Push-Token. Bei Verwendung des Expo Push Service wird dieser Token zur Zustellung an den Push-Dienst übermittelt. Expo leitet Push-Nachrichten anschließend an die jeweiligen Push-Dienste von Apple oder Google weiter. Expo gibt an, dass die Inhalte von Push-Nachrichten nicht dauerhaft in Datenbanken gespeichert werden.

8. Speicherdauer
Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Konkrete Speicher- und Löschfristen richten sich nach der jeweiligen Datenkategorie und Funktion und werden vor dem öffentlichen Start anhand der tatsächlich implementierten Löschprozesse final dokumentiert.

9. Empfänger und Dienstleister
Je nach genutzter Funktion können personenbezogene Daten durch technische Dienstleister verarbeitet werden, soweit dies für die Bereitstellung der ZEVYQ-Dienste erforderlich ist. Dazu gehören insbesondere das ZEVYQ-Backend, RevenueCat für die technische Verwaltung von Premium-Mitgliedschaften sowie – bei aktivierten Push-Benachrichtigungen – der eingesetzte Push-Dienst.

10. Deine Rechte
Du hast nach Maßgabe der gesetzlichen Voraussetzungen insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit. Eine erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden. Außerdem besteht das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren.

11. Automatisierte Verarbeitung
ZEVYQ verwendet KI- und modellbasierte Verfahren zur Analyse von Sport- und Wettmarktdaten. Die daraus erzeugten Sportanalysen und Tippbewertungen stellen keine automatisierte Entscheidung über die rechtliche oder ähnlich erhebliche persönliche Situation eines Nutzers dar.

12. Datensicherheit
ZEVYQ setzt angemessene technische und organisatorische Maßnahmen ein, um personenbezogene Daten vor unbefugtem Zugriff, Verlust, Veränderung oder sonstiger unzulässiger Verarbeitung zu schützen.

13. Kontakt und Aktualisierung
Fragen zum Datenschutz kannst du an support@zevyq.de richten. Diese Datenschutzhinweise werden aktualisiert, wenn sich die Datenverarbeitung, eingesetzte Dienstleister oder rechtliche Anforderungen ändern.`,
      },
      {
        title: "AGB",
        subtitle: "Allgemeine Geschäftsbedingungen",
        icon: "📋",
        content: `Allgemeine Geschäftsbedingungen

1. Geltungsbereich

Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der von ZEVYQ bereitgestellten App und digitalen Dienste.

ZEVYQ stellt KI-gestützte Sportanalysen, Informationen zu Sportereignissen sowie ausgewählte Wettmarkt- und Tippinformationen bereit.

2. Leistungsangebot

ZEVYQ stellt je nach gewähltem Nutzungsumfang kostenlose und kostenpflichtige Funktionen zur Verfügung.

Zum Leistungsumfang können insbesondere Sportanalysen, ausgewählte Tipps, Tipp-Historien, Statistiken, persönliche Bankroll-Funktionen sowie weitere Funktionen der ZEVYQ App gehören.

Der konkrete Leistungsumfang eines kostenpflichtigen Premium-Angebots wird vor Abschluss des jeweiligen Abonnements angezeigt.

3. Kein Wettanbieter

ZEVYQ ist kein Wettanbieter.

Über ZEVYQ werden keine Wetten angenommen oder vermittelt. ZEVYQ führt keine Wettkonten und verwaltet keine Wetteinsätze oder Gewinne.

Die von ZEVYQ bereitgestellten Analysen und Tipps stellen keine Garantie für einen bestimmten Spielausgang oder einen finanziellen Erfolg dar.

4. Nutzung der Analysen

Die bereitgestellten Informationen dienen ausschließlich der Information und sportbezogenen Analyse.

Sportereignisse können anders verlaufen als von einem Modell oder einer Analyse erwartet. Auch eine hohe modellbasierte Wahrscheinlichkeit stellt keine Gewissheit dar.

Die Entscheidung über eine Teilnahme an Sportwetten und über die Höhe eines Einsatzes trifft der Nutzer eigenverantwortlich.

5. Benutzerkonto

Für bestimmte Funktionen kann ein Benutzerkonto erforderlich sein.

Der Nutzer ist verpflichtet, bei der Registrierung zutreffende Angaben zu machen und seine Zugangsdaten vor dem Zugriff Dritter zu schützen.

Der Nutzer darf sein Benutzerkonto nicht unbefugt an andere Personen überlassen oder die Zugangsdaten Dritten zur Verfügung stellen.

6. Premium-Mitgliedschaft

Für bestimmte Funktionen kann ZEVYQ eine kostenpflichtige Premium-Mitgliedschaft anbieten.

Preis, Laufzeit, Abrechnungszeitraum und weitere Bedingungen werden vor Abschluss des jeweiligen Abonnements angezeigt.

Die technische Verwaltung von Premium-Mitgliedschaften erfolgt unter anderem über die dafür eingesetzten App-Store- und Abonnementdienste.

Weitere Einzelheiten zu Preisen, Laufzeiten, Verlängerung und Kündigung werden in den Abo- und Zahlungsbedingungen erläutert.

7. Verfügbarkeit

ZEVYQ bemüht sich um eine zuverlässige und möglichst kontinuierliche Bereitstellung der Dienste.

Aufgrund von Wartungsarbeiten, technischen Störungen, Netzwerkproblemen, Ausfällen von Drittanbietern oder anderen Umständen außerhalb des Einflussbereichs von ZEVYQ kann die Verfügbarkeit vorübergehend eingeschränkt sein.

Gesetzliche Ansprüche des Nutzers bleiben hiervon unberührt.

8. Aktualisierungen und Änderungen

ZEVYQ kann die App und ihre Funktionen weiterentwickeln, verbessern und aktualisieren.

Soweit Änderungen kostenpflichtige digitale Leistungen betreffen und gesetzliche Informations- oder Beendigungsrechte des Nutzers bestehen, werden diese beachtet.

9. Inhalte und Rechte

Die von ZEVYQ bereitgestellten Texte, Analysen, Darstellungen, Softwarebestandteile und sonstigen Inhalte sind, soweit sie rechtlich geschützt sind, urheberrechtlich oder anderweitig geschützt.

Eine über die bestimmungsgemäße Nutzung der App hinausgehende Vervielfältigung, Verbreitung oder öffentliche Bereitstellung ist ohne entsprechende Zustimmung nicht gestattet.

10. Unzulässige Nutzung

Die Nutzung von ZEVYQ zu rechtswidrigen Zwecken ist nicht gestattet.

Insbesondere dürfen technische Schutzmaßnahmen nicht umgangen, die Dienste nicht missbräuchlich automatisiert abgefragt und keine Zugangsdaten anderer Nutzer verwendet werden.

11. Minderjährige

Die Nutzung von Sportwetten ist ausschließlich Volljährigen gestattet.

ZEVYQ richtet seine Dienste nicht an Minderjährige als Zielgruppe für Sportwetten.

12. Haftung

ZEVYQ haftet nach den gesetzlichen Vorschriften.

Eine weitergehende Haftungsbeschränkung erfolgt nicht, soweit dies gesetzlich unzulässig wäre.

Insbesondere bleiben Ansprüche wegen Vorsatz, grober Fahrlässigkeit, Verletzung von Leben, Körper oder Gesundheit sowie zwingende gesetzliche Ansprüche unberührt.

13. Verbraucherrechte

Gesetzliche Verbraucherrechte bleiben unberührt.

Insbesondere gelten die gesetzlichen Vorschriften über digitale Produkte, Mängelrechte, Widerruf und Kündigung, soweit sie auf das jeweilige Vertragsverhältnis anwendbar sind.

14. Kontakt

Für Fragen zur Nutzung von ZEVYQ steht der Support unter

support@zevyq.de

zur Verfügung.

15. Anbieterangaben

Verantwortliche Stelle:
Malte Emser
ZEVYQ
Panoramastraße 5
91555 Feuchtwangen
Deutschland
E-Mail: support@zevyq.de

16. Schlussbestimmungen

Es gelten die gesetzlichen Bestimmungen.

Sollten einzelne Bestimmungen dieser Bedingungen unwirksam sein oder werden, bleiben die übrigen Bestimmungen im Rahmen der gesetzlichen Vorschriften unberührt.`,
      },
      {
        title: "Abo & Zahlungsbedingungen",
        subtitle: "Informationen zu Premium-Mitgliedschaften",
        icon: "💳",
        content: `Premium-Mitgliedschaft

ZEVYQ kann kostenpflichtige Premium-Mitgliedschaften anbieten. Die jeweils verfügbaren Preise, Laufzeiten und Abrechnungszeiträume werden vor dem Abschluss des Abonnements in der App angezeigt.

1. Premium-Angebot

Je nach aktuellem Angebot können unterschiedliche Premium-Abonnements verfügbar sein, insbesondere monatliche oder jährliche Laufzeiten.

Der konkrete Preis und der jeweils angebotene Abrechnungszeitraum werden vor dem Kauf angezeigt.

2. Abschluss

Ein Premium-Abonnement wird über den jeweiligen App Store abgeschlossen.

Die Zahlung wird über den für den jeweiligen App Store verwendeten Zahlungsdienst abgewickelt. ZEVYQ erhält keine direkten Zahlungsdaten wie Kreditkarten- oder Kontodaten des Nutzers.

Für die technische Verwaltung und Synchronisierung der Premium-Mitgliedschaft verwendet ZEVYQ RevenueCat.

3. Automatische Verlängerung

Ein Premium-Abonnement verlängert sich grundsätzlich automatisch, sofern die automatische Verlängerung nicht rechtzeitig über den jeweiligen App Store deaktiviert wird.

Bei einem monatlichen Abonnement erfolgt die Verlängerung entsprechend monatlich.

Bei einem jährlichen Abonnement erfolgt die Verlängerung entsprechend jährlich.

Der jeweils geltende Verlängerungspreis wird im Rahmen des Abonnementabschlusses beziehungsweise der jeweiligen Store-Anzeige ausgewiesen.

4. Kündigung

Die Kündigung beziehungsweise Deaktivierung der automatischen Verlängerung erfolgt über die Einstellungen des jeweiligen App Stores.

Durch die Deaktivierung der automatischen Verlängerung wird verhindert, dass das Abonnement nach Ablauf des bereits bezahlten Zeitraums erneut verlängert wird.

Bereits bezahlte Zeiträume bleiben grundsätzlich bis zum jeweiligen Ablaufdatum nutzbar, soweit die Bedingungen des jeweiligen App Stores nichts anderes vorsehen.

5. Wiederherstellung

Bereits erworbene Premium-Mitgliedschaften können über die in der App vorgesehene Funktion zur Wiederherstellung von Käufen wiederhergestellt werden.

Die Freischaltung richtet sich nach dem vom jeweiligen App Store bestätigten Kaufstatus.

6. Premium-Status

Der Premium-Status wird technisch über die Abonnementinformationen des jeweiligen Store- und Abonnementdienstes ermittelt und mit dem ZEVYQ-Benutzerkonto synchronisiert.

Bei Änderungen des Abonnementstatus kann sich die Anzeige beziehungsweise Verfügbarkeit der Premium-Funktionen entsprechend ändern.

7. Abonnementende

Endet ein Premium-Abonnement oder läuft es aus, können die ausschließlich Premium-Mitgliedern vorbehaltenen Funktionen nicht mehr verfügbar sein.

Kostenlose Funktionen bleiben, soweit angeboten, unabhängig davon bestehen.

8. Preise und Änderungen

Die jeweils geltenden Preise werden vor dem Abschluss des jeweiligen Abonnements angezeigt.

ZEVYQ kann Premium-Angebote, Preise und verfügbare Laufzeiten künftig ändern. Bereits abgeschlossene Abonnements werden dabei nach Maßgabe der jeweils geltenden gesetzlichen Vorschriften und der Bedingungen des jeweiligen App Stores behandelt.

9. Widerrufsrecht

Verbrauchern kann bei einem online abgeschlossenen Abonnement grundsätzlich ein gesetzliches Widerrufsrecht zustehen.

Die Einzelheiten, Voraussetzungen und mögliche Besonderheiten beim Beginn einer digitalen Leistung werden in den Widerrufsinformationen von ZEVYQ erläutert.

10. Kontakt

Fragen zu Premium-Mitgliedschaften können an den ZEVYQ Support gerichtet werden:

support@zevyq.de

Die technischen Bedingungen des jeweiligen App Stores, insbesondere zu Zahlung, Abrechnung, Kündigung und Rückerstattung, bleiben zusätzlich maßgeblich.`,
      },
      {
        title: "Widerruf",
        subtitle: "Informationen zum Widerrufsrecht",
        icon: "↩️",
        content: `Widerrufsbelehrung

1. Widerrufsrecht

Verbraucher haben bei einem online abgeschlossenen kostenpflichtigen Vertrag grundsätzlich ein gesetzliches Widerrufsrecht.

Die Widerrufsfrist beträgt grundsätzlich 14 Tage und beginnt, soweit gesetzlich nichts anderes bestimmt ist, mit dem Vertragsschluss.

Für die Ausübung des Widerrufs ist eine eindeutige Erklärung gegenüber ZEVYQ erforderlich. Eine Begründung ist nicht erforderlich.

2. Ausübung des Widerrufs

Der Widerruf kann beispielsweise per E-Mail an folgende Adresse erklärt werden:

support@zevyq.de

Aus der Erklärung muss eindeutig hervorgehen, dass der betreffende Vertrag widerrufen werden soll.

3. Folgen des Widerrufs

Wird ein Vertrag wirksam widerrufen, sind die empfangenen Leistungen grundsätzlich nach den gesetzlichen Vorschriften zurückzugewähren.

Für bereits erbrachte Dienstleistungen können gesetzliche Besonderheiten gelten, insbesondere wenn der Verbraucher ausdrücklich verlangt hat, dass die Leistung bereits während der Widerrufsfrist beginnt.

4. Digitale Inhalte und digitale Leistungen

Bei digitalen Inhalten oder digitalen Leistungen können besondere gesetzliche Regelungen gelten.

Insbesondere kann das Widerrufsrecht bei digitalen Inhalten unter bestimmten gesetzlichen Voraussetzungen vorzeitig erlöschen, wenn der Verbraucher ausdrücklich zugestimmt hat, dass vor Ablauf der Widerrufsfrist mit der Ausführung begonnen wird, und seine Kenntnis vom Erlöschen des Widerrufsrechts bestätigt hat.

5. App Store

Bei einem über einen App Store abgeschlossenen Abonnement können zusätzlich die Bedingungen des jeweiligen App Stores für Zahlung, Kündigung, Rückerstattung und Abwicklung maßgeblich sein.

6. Kontakt

Fragen zum Widerrufsrecht können an den ZEVYQ Support gerichtet werden:

support@zevyq.de

Diese Informationen ersetzen keine individuelle Rechtsberatung. Vor dem öffentlichen Start werden die Widerrufsinformationen rechtlich geprüft und bei Bedarf an das konkrete ZEVYQ-Angebot sowie die verwendeten App Stores angepasst.`,
      },
    ],
  },
  {
    section: "Weitere Hinweise",
    items: [
      {
        title: "Verantwortungsbewusstes Wetten",
        subtitle: "Hinweise zum verantwortungsvollen Umgang mit Sportwetten",
        icon: "⚠️",
        content: `Sportwetten sind Glücksspiel und können mit finanziellen und persönlichen Risiken verbunden sein. Auch bei sorgfältiger Analyse gibt es keine Garantie für einen Gewinn.

ZEVYQ stellt Sport- und Wettanalysen zur Verfügung. ZEVYQ ist kein Wettanbieter, nimmt keine Wetten an, führt keine Wettkonten und verwaltet keine Einsätze oder Gewinne.

Wenn du Sportwetten nutzt:

• Setze dir ein persönliches Budget und halte dich daran.
• Verwende nur Geld, dessen Verlust du dir leisten kannst.
• Leihe dir kein Geld für Sportwetten und versuche nicht, Verluste durch höhere Einsätze zurückzugewinnen.
• Setze dir Zeit- und Einsatzlimits und mache regelmäßig Pausen.
• Wette nicht unter dem Einfluss von Alkohol oder anderen Substanzen.
• Beende das Wetten, wenn du merkst, dass es dir schwerfällt, deine Einsätze oder dein Spielverhalten zu kontrollieren.
• Sportwetten sind ausschließlich für Volljährige bestimmt.

ZEVYQ-Tipps sind keine Gewinnzusage und keine Garantie für den Ausgang eines Sportereignisses. Entscheidungen über Einsätze und die Teilnahme an Sportwetten triffst du selbst.

Wenn Glücksspiel für dich oder eine dir nahestehende Person zum Problem wird, hol dir Unterstützung. Kostenlose und anonyme Hilfe bietet unter anderem Check dein Spiel. Weitere Informationen und Hilfsangebote findest du bei gesund.bund.de.`,
      },
      {
        title: "Rechtliche Hinweise",
        subtitle: "Wichtige Hinweise zur Nutzung von ZEVYQ",
        icon: "📜",
        content: `ZEVYQ ist eine Plattform für KI-gestützte Sportanalyse und stellt Informationen und Analysen zu Sportereignissen sowie ausgewählten Wettmärkten bereit.

ZEVYQ ist kein Wettanbieter. Über ZEVYQ werden keine Wetten angenommen oder vermittelt. ZEVYQ führt keine Wettkonten und verwaltet keine Wetteinsätze oder Gewinne.

Die von ZEVYQ bereitgestellten Tipps, Wahrscheinlichkeiten, Quotenanalysen und sonstigen Informationen dienen ausschließlich der Information und Analyse. Sie stellen keine Garantie für einen bestimmten Spielausgang oder einen finanziellen Erfolg dar.

Sportereignisse können anders verlaufen als von einem Modell oder einer Analyse erwartet. Auch eine hohe modellbasierte Wahrscheinlichkeit bedeutet keine Gewissheit.

Die Nutzung von ZEVYQ und insbesondere die Entscheidung, ob und mit welchem Einsatz eine Sportwette bei einem Drittanbieter abgeschlossen wird, erfolgt eigenverantwortlich. ZEVYQ übernimmt keine Verantwortung für Gewinne oder Verluste, die durch Entscheidungen entstehen, die auf Grundlage der bereitgestellten Informationen getroffen werden.

Hinweis zu Drittanbietern:
Wenn Nutzer außerhalb von ZEVYQ Sportwetten abschließen, geschieht dies bei dem jeweiligen Anbieter. Für dessen Angebot, Zulassung, Wettbedingungen, Quoten, Spielerschutzmaßnahmen, Zahlungsabwicklung und sonstige Vertragsbedingungen ist der jeweilige Anbieter verantwortlich. Nutzer sollten vor einer Wettteilnahme selbst prüfen, ob der jeweilige Anbieter in Deutschland zugelassen ist und welche Bedingungen für das jeweilige Angebot gelten.

Keine Rechts- oder Finanzberatung:
Die Informationen von ZEVYQ stellen keine Rechts-, Finanz-, Anlage- oder Steuerberatung dar.

Jugend- und Spielerschutz:
Sportwetten sind ausschließlich für Volljährige bestimmt. Glücksspiel kann zu finanziellen und persönlichen Problemen führen. Bei problematischem Glücksspielverhalten sollte professionelle Beratung oder Unterstützung in Anspruch genommen werden.

Rechtliche Rahmenbedingungen können sich ändern. Maßgeblich sind die jeweils geltenden gesetzlichen Vorschriften sowie die Bedingungen des jeweiligen Anbieters.`,
      },
      {
        title: "Kontakt & Support",
        subtitle: "Hilfe und Kontaktmöglichkeiten",
        icon: "📧",
        content: `Bei Fragen zur ZEVYQ App, zu deinem Benutzerkonto oder zur Nutzung der ZEVYQ Funktionen kannst du unser Support-Team per E-Mail erreichen.

Support: support@zevyq.de

Wir bemühen uns, Anfragen so schnell wie möglich zu bearbeiten.`,
      },
    ],
  },
] as const;

export default function AboutZevyqPage() {
  const [activeDocument, setActiveDocument] = useState<{
    title: string;
    content: string;
  } | null>(null);

  return (
    <main className="min-h-full px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-white/40">Einstellungen</div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Über ZEVYQ<span className="text-blue-400">.</span></h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
            Informationen, Rechtliches und Support
          </p>
        </div>

        {documents.map((group) => (
          <section key={group.section} className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">{group.section}</h2>
            <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.02]">
              {group.items.map((item, index) => (
                <div key={item.title}>
                  {index > 0 && <div className="border-t border-white/10" />}
                  {('static' in item && item.static) ? (
                    <div className="flex items-center gap-4 px-5 py-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="mt-1 text-sm text-white/50">{item.subtitle}</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDocument({
                          title: item.title,
                          content: item.content,
                        })
                      }
                      className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/40"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-xl">
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="mt-1 text-sm leading-5 text-white/50">{item.subtitle}</p>
                      </div>
                      <span aria-hidden="true" className="text-xl text-white/40">›</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {activeDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveDocument(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-document-title"
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
              <h2 id="about-document-title" className="text-lg font-semibold">
                {activeDocument.title}
              </h2>
              <button
                type="button"
                onClick={() => setActiveDocument(null)}
                aria-label="Dialog schließen"
                className="rounded-lg px-3 py-2 text-white/60 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-white/75">
                {activeDocument.content}
              </p>
            </div>
            <div className="border-t border-white/10 px-6 py-4 text-right">
              <button
                type="button"
                onClick={() => setActiveDocument(null)}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/[0.06]"
              >
                Schließen
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

