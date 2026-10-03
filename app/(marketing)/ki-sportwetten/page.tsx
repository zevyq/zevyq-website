import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI Sportwetten – Datenbasierte Wettanalyse | ZEVYQ",
  description:
    "KI Sportwetten mit ZEVYQ: datenbasierte Fußballanalyse, Wahrscheinlichkeiten, Quoten und Qualitätsregeln für strukturierte Wettanalysen.",
};

export default function KiSportwettenPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            ZEVYQ · KI & Sportwetten
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            KI Sportwetten datenbasiert analysieren
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Künstliche Intelligenz kann große Mengen an Sportdaten strukturiert
            auswerten. ZEVYQ entwickelt eine KI-gestützte Plattform, die
            Fußballspiele, Wahrscheinlichkeiten und Quoten nach klaren Regeln
            analysiert.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Was bedeutet KI bei Sportwetten?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              KI kann dabei helfen, große Mengen an Informationen zu
              verarbeiten und Muster in historischen und aktuellen Daten zu
              erkennen. Eine solche Analyse ersetzt jedoch keine Gewissheit:
              Sportereignisse bleiben mit Unsicherheit verbunden.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Wahrscheinlichkeiten statt Bauchgefühl
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              ZEVYQ betrachtet berechnete Wahrscheinlichkeiten und setzt sie
              in Beziehung zu verfügbaren Quoten. Dadurch lässt sich eine
              mögliche Bewertung eines Wettmarktes strukturiert untersuchen.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Mehr als nur 1X2
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Eine moderne Fußballanalyse kann unterschiedliche Wettmärkte
              berücksichtigen. Dazu gehören beispielsweise 1X2,
              Over/Under und Beide Teams treffen.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Qualitätsfilter für KI-Analysen
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              ZEVYQ soll nicht einfach möglichst viele Ergebnisse ausgeben.
              Analysen werden anhand definierter Kriterien bewertet und
              gefiltert, bevor daraus ein möglicher Tipp entsteht.
            </p>
          </section>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-bold">
            Wie funktioniert eine KI-Wettanalyse?
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Der grundlegende Ansatz besteht darin, relevante Spieldaten zu
            sammeln, daraus Wahrscheinlichkeiten abzuleiten und diese mit
            den verfügbaren Quoten zu vergleichen. Je nach Analyse können
            unterschiedliche Modelle und Datenquellen berücksichtigt werden.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Wichtig ist dabei eine transparente Auswertung. Eine KI kann keine
            sicheren Gewinnergebnisse garantieren. Deshalb sollen Ergebnisse
            bei ZEVYQ nachvollziehbar dokumentiert und langfristig anhand
            realer Resultate überprüft werden.
          </p>
        </section>

        <section className="mt-16 rounded-2xl bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold">
            KI für Sportwetten mit ZEVYQ
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            ZEVYQ verbindet Fußballanalyse, Wahrscheinlichkeiten,
            Quotenbewertung und definierte Qualitätsregeln in einer
            KI-gestützten Plattform.
          </p>
        </section>
      </section>
    </main>
  );
}
