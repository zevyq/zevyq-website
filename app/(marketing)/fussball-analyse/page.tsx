import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fußball Analyse – Datenbasierte Spielanalyse | ZEVYQ",
  description:
    "Fußball Analyse mit ZEVYQ: Spiele, Wahrscheinlichkeiten, Quoten und Wettmärkte datenbasiert und strukturiert analysieren.",
};

export default function FussballAnalysePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            ZEVYQ · Fußball Analyse
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Fußball Analyse datenbasiert durchführen
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Eine strukturierte Fußball Analyse betrachtet verschiedene
            Faktoren eines Spiels. ZEVYQ verbindet Daten, Wahrscheinlichkeiten
            und Quoten, um Fußballspiele nachvollziehbar und systematisch zu
            analysieren.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Was gehört zu einer Fußball Analyse?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Eine Fußball Analyse kann unterschiedliche Daten und
              Informationen berücksichtigen. Dazu gehören beispielsweise
              vergangene Ergebnisse, Wahrscheinlichkeiten, Quoten und
              verschiedene Wettmärkte.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Wahrscheinlichkeiten für Fußballspiele
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Wahrscheinlichkeiten können dabei helfen, mögliche
              Spielausgänge mathematisch einzuordnen. ZEVYQ nutzt
              modellbasierte Wahrscheinlichkeiten als Bestandteil seiner
              datenbasierten Fußballanalyse.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Fußballspiele und Wettmärkte
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Ein Spiel kann auf verschiedenen Märkten betrachtet werden.
              Dazu gehören beispielsweise 1X2, Over/Under und Beide Teams
              treffen. Dadurch können unterschiedliche Aspekte eines Spiels
              analysiert werden.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Daten statt reines Bauchgefühl
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Datenbasierte Modelle können Informationen strukturiert
              zusammenführen. Sie ersetzen jedoch keine Gewissheit über den
              Ausgang eines Fußballspiels.
            </p>
          </section>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-bold">
            Wie funktioniert eine datenbasierte Fußball Analyse?
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            ZEVYQ entwickelt eine KI-gestützte Plattform, die verschiedene
            Datenpunkte zusammenführt und daraus strukturierte Analysen
            erstellt. Dabei können Wahrscheinlichkeiten mit verfügbaren
            Quoten verglichen und unterschiedliche Wettmärkte untersucht
            werden.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Nicht jede Analyse führt automatisch zu einem qualifizierten Tipp.
            ZEVYQ soll Analysen anhand definierter Qualitätskriterien filtern,
            bevor ein möglicher Tipp ausgegeben wird.
          </p>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-bold">
            Fußball Analyse mit ZEVYQ
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Ziel von ZEVYQ ist eine transparente und nachvollziehbare
            Fußballanalyse. Die Plattform soll zeigen, wie Daten,
            Wahrscheinlichkeiten und Quoten zu einer strukturierten Bewertung
            eines Fußballspiels zusammengeführt werden.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Fußball bleibt trotz statistischer Modelle unvorhersehbar.
            Analysen und Wahrscheinlichkeiten sind deshalb keine Garantie für
            ein bestimmtes Ergebnis.
          </p>
        </section>

        <section className="mt-16 rounded-2xl bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold">
            Datenbasierte Fußball Analyse mit ZEVYQ
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            ZEVYQ entwickelt eine Plattform für KI-gestützte Fußballanalyse,
            die Spiele, Wahrscheinlichkeiten, Quoten und Wettmärkte
            strukturiert auswerten soll.
          </p>
        </section>
      </section>
    </main>
  );
}
