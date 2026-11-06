import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung | ZEVYQ",
  description: "Widerrufsinformationen für ZEVYQ.",
  robots: { index: false, follow: false },
};

export default function WiderrufPage() {
  return (
    <LegalPage title="Widerrufsbelehrung">
            

      <section>
        <h2>1. Widerrufsrecht</h2>
        <p>
          Wenn du als Verbraucher einen kostenpflichtigen Vertrag über die
          Website abschließt, steht dir grundsätzlich ein gesetzliches
          Widerrufsrecht zu, soweit keine gesetzliche Ausnahme greift.
        </p>
        <p>
          Die Widerrufsfrist beträgt grundsätzlich 14 Tage. Bei einem
          Dienstleistungsvertrag beginnt sie grundsätzlich mit dem
          Vertragsschluss; die gesetzlichen Voraussetzungen für den Beginn
          der Frist und die ordnungsgemäße Belehrung bleiben maßgeblich.
        </p>
        <p>
          Um dein Widerrufsrecht auszuüben, musst du uns durch eine
          eindeutige Erklärung über deinen Entschluss informieren. Du musst
          dafür keinen Grund angeben. Zur Wahrung der Frist reicht es aus,
          dass du deine Erklärung rechtzeitig absendest.
        </p>
      </section>

      <section>
        <h2>2. So erklärst du den Widerruf</h2>
        <p>
          Du kannst deinen Widerruf derzeit per E-Mail an
          {" "}
          <a href="mailto:support@zevyq.de">support@zevyq.de</a>
          {" "}richten. Bitte gib an, dass du den Vertrag widerrufen möchtest,
          und füge Angaben hinzu, mit denen wir deinen Vertrag zuordnen können.
        </p>
        <p>
          Anbieter und Kontaktanschrift:
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
          <br />
          E-Mail:{" "}
          <a href="mailto:support@zevyq.de">support@zevyq.de</a>
        </p>
        <p>Du kannst deine Erklärung online über <a href="/vertrag?art=widerruf">Vertrag widerrufen</a> abgeben. Prüfe deine Angaben und sende sie mit „Widerruf bestätigen“ ab. Danach kannst du einen Eingangsbeleg herunterladen. Eine Eingangsbestätigung mit Erklärungsinhalt, Datum und Uhrzeit wird an die angegebene E-Mail-Adresse versandt.</p>
      </section>

      <section>
        <h2>3. Folgen des Widerrufs</h2>
        <p>
          Wenn du einen Vertrag wirksam widerrufst, sind empfangene
          Leistungen und Zahlungen nach den gesetzlichen Vorschriften
          zurückzugewähren. Für Rückzahlungen gelten die gesetzlichen
          Fristen und Bedingungen.
        </p>
        <p>
          Hast du ausdrücklich verlangt, dass eine entgeltliche Dienstleistung
          bereits während der Widerrufsfrist beginnt, kann unter den
          gesetzlichen Voraussetzungen ein angemessener Betrag für den bis
          zum Widerruf erbrachten Teil der Leistung geschuldet sein.
        </p>
      </section>

      <section>
        <h2>4. Digitale Leistungen und vorzeitiges Erlöschen</h2>
        <p>
          Für digitale Inhalte und digitale Dienstleistungen gelten
          besondere gesetzliche Regelungen. Ob und wann ein Widerrufsrecht
          vorzeitig erlischt, hängt von der konkreten Vertragsart und
          den jeweils erforderlichen Voraussetzungen ab.
        </p>
        <p>
          Ein Widerrufsrecht erlischt nicht allein deshalb, weil ein Nutzer
          unmittelbar Zugriff auf Premium-Funktionen erhält. Die
          erforderlichen Zustimmungen, Bestätigungen und Abläufe müssen
          für das tatsächliche ZEVYQ-Angebot rechtlich und technisch
          zutreffend gestaltet sein.
        </p>
      </section>

      <section>
        <h2>5. Website-Abonnement und App-Store-Käufe</h2>
        <p>
          Für ein über die Website abgeschlossenes Abonnement gelten die
          gesetzlichen Vorschriften und die Bedingungen des konkret
          abgeschlossenen Vertrags. Bei einem Kauf innerhalb einer mobilen
          App können zusätzlich die Abläufe des jeweiligen App Stores
          für Zahlung und Rückerstattung relevant sein.
        </p>
        <p>
          Die gesetzlichen Verbraucherrechte werden durch diese Hinweise
          nicht ausgeschlossen.
        </p>
      </section>

      <section>
        <h2>6. Muster für eine Widerrufserklärung</h2>
        <p>
          Wenn du deinen Vertrag widerrufen möchtest, kannst du beispielsweise
          folgende Erklärung verwenden. Die Verwendung dieses Wortlauts
          ist nicht vorgeschrieben.
        </p>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p>
            An: Malte Emser, ZEVYQ, Panoramastraße 5, 91555 Feuchtwangen,
            Deutschland
            <br />
            E-Mail: support@zevyq.de
          </p>
          <p>
            Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über
            das folgende Abonnement:
          </p>
          <p>
            Name:
            <br />
            E-Mail-Adresse des Kunden:
            <br />
            Vertrags- oder Bestellreferenz:
            <br />
            Datum des Vertragsschlusses:
            <br />
            Datum der Widerrufserklärung:
          </p>
        </div>
      </section>

      <section>
        <h2>7. Kontakt</h2>
        <p>
          Bei Fragen zum Widerruf erreichst du uns unter
          {" "}
          <a href="mailto:support@zevyq.de">support@zevyq.de</a>.
        </p>
      </section>
    </LegalPage>
  );
}