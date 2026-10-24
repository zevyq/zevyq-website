import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Impressum | ZEVYQ",
  description: "Anbieter- und Kontaktinformationen von ZEVYQ.",
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
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
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail:{" "}
          <a href="mailto:support@zevyq.de">support@zevyq.de</a>
        </p>
      </section>

      <section>
        <h2>Informationen zum Angebot</h2>
        <p>
          ZEVYQ ist eine digitale Plattform für KI-gestützte Sportanalysen,
          statistische Einschätzungen und Informationen zu Sportereignissen
          sowie ausgewählten Wettmärkten.
        </p>
        <p>
          ZEVYQ ist kein Wettanbieter. Über ZEVYQ werden keine Wetten
          angenommen oder vermittelt. ZEVYQ führt keine Wettkonten und
          verwaltet keine Wetteinsätze oder Gewinne.
        </p>
        <p>
          Die bereitgestellten Analysen und Tippbewertungen sind keine
          Garantie für einen bestimmten Spielausgang oder finanziellen Erfolg.
        </p>
      </section>
    </LegalPage>
  );
}