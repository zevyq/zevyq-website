import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Abo- und Zahlungsbedingungen | ZEVYQ",
  description: "Entwurf der Abo- und Zahlungsbedingungen von ZEVYQ.",
  robots: { index: false, follow: false },
};

export default function ZahlungsbedingungenPage() {
  return (
    <LegalPage title="Abo- und Zahlungsbedingungen">
      <aside className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-5 text-amber-100">
        <h2 className="text-lg font-bold">Entwurf – noch nicht veröffentlichen</h2>
        <p>
          Vor der Veröffentlichung müssen insbesondere der tatsächliche
          Checkout-Ablauf, die automatische Verlängerung, die Kündigungsfunktion,
          die steuerliche Preisangabe und die Freischaltung nach erfolgreicher
          Zahlung mit der technischen Umsetzung abgeglichen werden.
        </p>
      </aside>

      <section>
        <h2>1. Geltungsbereich</h2>
        <p>
          Diese Bedingungen beschreiben die geplanten Abläufe für kostenpflichtige
          Premium-Abonnements von ZEVYQ. Website-Abonnements und Abonnements,
          die innerhalb einer mobilen App abgeschlossen werden, sind getrennt
          zu behandeln, da unterschiedliche Zahlungs- und Verwaltungswege
          verwendet werden können.
        </p>
      </section>

      <section>
        <h2>2. Geplante Website-Abonnements und Preise</h2>
        <p>Für das Website-Angebot sind derzeit folgende Preise vorgesehen:</p>
        <ul>
          <li>Premium monatlich: 14,99 € je Monat.</li>
          <li>Premium jährlich: 119,99 € je Jahr.</li>
        </ul>
        <p>
          Vor Abschluss werden der tatsächlich geltende Gesamtpreis,
          die steuerliche Behandlung, der Abrechnungszeitraum und die
          Bedingungen der Verlängerung auf der Bestellseite angezeigt.
          Die endgültige Preis- und Steuerdarstellung muss vor dem Start
          bestätigt werden.
        </p>
      </section>

      <section>
        <h2>3. Bestellung und Zahlung über die Website</h2>
        <p>
          Für Website-Abonnements ist eine Zahlungsabwicklung über Stripe
          vorgesehen. Maßgeblich sind die Angaben, die im tatsächlich
          verwendeten Checkout unmittelbar vor der Bestellung angezeigt
          werden.
        </p>
        <p>
          Die verfügbaren Zahlungsmethoden werden im Checkout angezeigt.
          Eine Bestellung darf erst verbindlich abgeschlossen werden, wenn
          die gesetzlich erforderlichen Informationen zum Vertrag und zur
          Zahlungspflicht dargestellt wurden.
        </p>
        <p>
          Der genaue Zeitpunkt des Vertragsschlusses, der Zahlungsbestätigung
          und der Freischaltung des Premium-Zugangs muss mit dem tatsächlichen
          Ablauf des Website-Checkouts übereinstimmen. Diese Abläufe sind vor
          der Veröffentlichung technisch zu prüfen.
        </p>
      </section>

      <section>
        <h2>4. Abrechnung und Verlängerung</h2>
        <p>
          Beim Monatsabo ist eine Abrechnung im monatlichen Rhythmus, beim
          Jahresabo eine Abrechnung im jährlichen Rhythmus vorgesehen.
          Ob und unter welchen Bedingungen sich das jeweilige Abonnement
          automatisch verlängert, muss vor der Bestellung klar und
          verständlich angegeben und technisch korrekt umgesetzt werden.
        </p>
        <p>
          Vor jeder Verlängerung gelten die für das jeweilige Abonnement
          wirksam vereinbarten Bedingungen sowie die einschlägigen
          gesetzlichen Vorschriften.
        </p>
      </section>

      <section>
        <h2>5. Kündigung von Website-Abonnements</h2>
        <p>
          Die konkrete Kündigungsmöglichkeit, der Kündigungszeitpunkt und
          das Ende des Zugangs müssen vor dem Start festgelegt und im
          Kundenbereich verständlich erläutert werden. Kündigungen dürfen
          nicht unnötig erschwert werden.
        </p>
        <p>
          Soweit gesetzlich erforderlich, wird eine leicht zugängliche
          Kündigungsfunktion einschließlich der vorgeschriebenen
          Bestätigungsstrecke bereitgestellt. Der tatsächliche Ablauf
          muss vor Aktivierung kostenpflichtiger Abonnements getestet
          werden.
        </p>
        <p>
          Zwingende gesetzliche Kündigungsrechte bleiben unberührt.
        </p>
      </section>

      <section>
        <h2>6. Zahlungsprobleme und Status des Premium-Zugangs</h2>
        <p>
          Zahlungsbestätigungen, fehlgeschlagene Zahlungen, Rückerstattungen
          und Änderungen des Abonnementstatus müssen entsprechend dem
          tatsächlich implementierten Zahlungs- und Abonnementprozess
          verarbeitet werden.
        </p>
        <p>
          Wann ein Premium-Zugang bei einer fehlgeschlagenen oder
          zurückerstatteten Zahlung eingeschränkt oder beendet wird, muss
          vor dem Start eindeutig festgelegt werden. Gesetzliche Rechte
          der Verbraucher bleiben unberührt.
        </p>
      </section>

      <section>
        <h2>7. Rückerstattungen und Widerruf</h2>
        <p>
          Ob eine Rückerstattung erfolgt, richtet sich nach den gesetzlichen
          Vorgaben und den Umständen des jeweiligen Falls. Gesetzliche
          Widerrufs- und sonstige Verbraucherrechte werden durch diese
          Zahlungsbedingungen nicht ausgeschlossen.
        </p>
        <p>
          Weitere Informationen werden in der
          <a href="/widerruf">Widerrufsbelehrung</a> bereitgestellt.
          Diese muss vor Beginn des Website-Verkaufs auf den tatsächlich
          verwendeten Bestellprozess abgestimmt werden.
        </p>
      </section>

      <section>
        <h2>8. Abonnements innerhalb der mobilen App</h2>
        <p>
          Abonnements, die innerhalb einer mobilen App über einen App Store
          abgeschlossen werden, sind von Website-Abonnements zu unterscheiden.
          Zahlung, Abrechnung, Wiederherstellung und Kündigung richten sich
          nach dem jeweiligen Kaufweg, den anwendbaren Store-Bedingungen
          und den gesetzlichen Vorschriften.
        </p>
        <p>
          Für die technische Verwaltung von In-App-Abonnements kann
          RevenueCat eingesetzt werden. Welche Stelle Zahlung und Abrechnung
          tatsächlich durchführt, ergibt sich aus dem beim Kauf verwendeten
          App Store.
        </p>
      </section>

      <section>
        <h2>9. Kontakt</h2>
        <p>
          Fragen zu Abonnements und Zahlungen können an den ZEVYQ-Support
          gerichtet werden:
        </p>
        <p>
          <a href="mailto:support@zevyq.de">support@zevyq.de</a>
        </p>
      </section>
    </LegalPage>
  );
}