import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sportwetten Analyse – Quoten & Wahrscheinlichkeiten | ZEVYQ",
  description:
    "Sportwetten Analyse mit ZEVYQ: Quoten, Wahrscheinlichkeiten, Wettmärkte und datenbasierte Fußballanalysen strukturiert bewerten.",
};

export default function SportwettenAnalysePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            ZEVYQ · Sportwetten Analyse
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Sportwetten Analyse datenbasiert durchführen
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Eine strukturierte Sportwetten Analyse betrachtet nicht nur ein
            mögliches Ergebnis. ZEVYQ verbindet Fußballdaten,
            Wahrscheinlichkeiten und Quoten, um Wettmärkte nachvollziehbar
            zu analysieren.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Was ist eine Sportwetten Analyse?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Bei einer Sportwetten Analyse werden verschiedene Informationen
              zu einem Spiel zusammengeführt. Dazu können Form, Ergebnisse,
              Wahrscheinlichkeiten, Quoten und unterschiedliche Wettmärkte
              gehören.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Quoten und Wahrscheinlichkeiten
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Eine Quote beschreibt die Auszahlung eines Wettmarktes. ZEVYQ
              betrachtet zusätzlich modellbasierte Wahrscheinlichkeiten, um
              das Verhältnis zwischen Wahrscheinlichkeit und angebotener
              Quote strukturiert zu untersuchen.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Verschiedene Wettmärkte analysieren
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Eine Fußballanalyse kann verschiedene Märkte berücksichtigen.
              Dazu gehören unter anderem 1X2, Over/Under und Beide Teams
              treffen. Dadurch lässt sich ein Spiel aus unterschiedlichen
              Perspektiven betrachten.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Was bedeutet Value?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Beim Value-Ansatz wird die modellbasierte Wahrscheinlichkeit
              einer möglichen Wettoption mit der angebotenen Quote verglichen.
              ZEVYQ nutzt solche Vergleiche als einen Bestandteil seiner
              Qualitätsbewertung.
            </p>
          </section>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-bold">
            Warum nicht jedes Spiel einen Tipp bekommt
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Eine datenbasierte Analyse muss nicht zwangsläufig zu einem Tipp
            führen. Wenn die festgelegten Qualitätskriterien nicht erfüllt
            werden, kann eine Analyse auch ohne qualifizierten Tipp bleiben.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Dadurch soll vermieden werden, möglichst viele Tipps zu erzeugen,
            nur um täglich Ergebnisse auszugeben. Im Mittelpunkt steht eine
            nachvollziehbare Bewertung anhand definierter Kriterien.
          </p>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-bold">
            Sportwetten Analyse mit ZEVYQ
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            ZEVYQ entwickelt eine KI-gestützte Plattform für datenbasierte
            Fußballanalysen. Das System soll Spiele, Wahrscheinlichkeiten,
            Quoten und Wettmärkte strukturiert auswerten und die daraus
            entstehenden Analysen transparent dokumentieren.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Fußballspiele bleiben trotz statistischer Modelle
            unvorhersehbar. Wahrscheinlichkeiten und Analysen stellen daher
            keine Garantie für ein bestimmtes Ergebnis dar.
          </p>
        </section>

        <section className="mt-16 rounded-2xl bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold">
            Datenbasierte Wettanalyse mit ZEVYQ
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            ZEVYQ verbindet KI-gestützte Analyse mit klaren Qualitätsregeln,
            Wahrscheinlichkeiten und Quoten, um Fußballspiele strukturiert zu
            bewerten.
          </p>
        </section>
      </section>
    </main>
  );
}
