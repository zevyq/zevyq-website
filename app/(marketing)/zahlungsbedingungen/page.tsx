import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Abo- und Zahlungsbedingungen | ZEVYQ",
  description: "Abo- und Zahlungsbedingungen für ZEVYQ.",
  robots: { index: false, follow: false },
};

export default function ZahlungsbedingungenPage() {
  return (
    <LegalPage title="Abo- und Zahlungsbedingungen">
            

      <section><h2>1. Geltungsbereich</h2><p>Diese Bedingungen beschreiben ZEVYQ-Premium-Abonnements. Website-Zahlungen erfolgen über Stripe. Für App-Store-Käufe gelten die jeweiligen Zahlungs- und Verwaltungswege.</p></section>

      <section><h2>2. Website-Abonnements und Preise</h2><p>Premium kostet regulär 14,99 € pro Monat oder 119,99 € pro Jahr. Der verbindliche Gesamtpreis, der Abrechnungszeitraum und etwaige Rabatte werden vor der Bestellung im Checkout angezeigt.</p>
<p>Der Leistungsumfang ergibt sich aus der jeweiligen Angebotsdarstellung. Gesetzliche Rechte bleiben unberührt.</p></section>

      <section><h2>3. Bestellung und Zahlung</h2><p>Website-Abonnements werden über Stripe bestellt und bezahlt. Mit „Zahlungspflichtig abonnieren“ gibst du eine verbindliche Bestellung ab. Die Annahme erfolgt durch die Bestätigung des Abonnements oder die Freischaltung des Premium-Zugangs.</p>
<p>Premium wird nach erfolgreicher Zahlungsbestätigung dem ZEVYQ-Konto zugeordnet. Bei verzögerten Zahlungsmethoden kann die Freischaltung entsprechend später erfolgen. Die verfügbaren Zahlungsarten werden im Checkout angezeigt.</p></section>

      <section><h2>4. Abrechnung und Verlängerung</h2><p>Die Abrechnung erfolgt nach dem gewählten Monats- oder Jahreszeitraum. Ohne Kündigung wird das Abonnement nach den bei der Bestellung vereinbarten Bedingungen fortgeführt. Verlängerungsbedingungen werden vor der Bestellung angezeigt. Zwingende gesetzliche Vorgaben bleiben unberührt.</p></section>

      <section><h2>5. Kündigung von Website-Abonnements</h2><p>Im Profil kannst du dein Website-Abo über „Abo verwalten / kündigen“ verwalten. Ohne Anmeldung kannst du über <a href="/vertrag">Verträge hier kündigen</a> eine ordentliche oder außerordentliche Kündigung erklären.</p>
<p>Du erhältst eine Eingangsbestätigung; der maßgebliche Beendigungszeitpunkt wird gesondert bestätigt. Bei Kündigung zum Ende des bezahlten Zeitraums bleibt Premium bis dahin bestehen. Anschließend stehen die kostenlosen Funktionen zur Verfügung. Außerordentliche Kündigungsrechte bleiben unberührt.</p></section>

      <section><h2>6. Zahlungsprobleme</h2><p>Bei fehlender oder ausstehender Zahlungsbestätigung kann Premium bis zur Klärung eingeschränkt sein. Prüfe deine Zahlungsinformationen in der Aboverwaltung oder kontaktiere support@zevyq.de. Gesetzliche Rechte bleiben unberührt.</p></section>

      <section><h2>7. Rückerstattungen und Widerruf</h2><p>Rückerstattungen richten sich nach den gesetzlichen Vorgaben und dem jeweiligen Sachverhalt. Kündigung und Widerruf sind unterschiedliche Erklärungen.</p>
<p>Gesetzliche Widerrufs- und Verbraucherrechte bleiben unberührt. Informationen findest du in der <a href="/widerruf">Widerrufsbelehrung</a>. Über <a href="/vertrag?art=widerruf">Vertrag widerrufen</a> kannst du deine Erklärung online übermitteln.</p></section>

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