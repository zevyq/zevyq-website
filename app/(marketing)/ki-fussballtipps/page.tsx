import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI Fußballtipps – Datenbasierte Fußballanalyse | ZEVYQ",
  description:
    "KI Fußballtipps mit ZEVYQ: datenbasierte Analyse von Fußballspielen, Wahrscheinlichkeiten, Quoten und verschiedenen Wettmärkten.",
};

export default function KiFussballtippsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            ZEVYQ · KI & Fußball
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            KI Fußballtipps datenbasiert analysieren
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Künstliche Intelligenz kann große Mengen an Fußballdaten
            strukturiert auswerten. ZEVYQ entwickelt eine KI-gestützte
            Plattform, die Fußballspiele, Wahrscheinlichkeiten und Quoten
            nach klaren Qualitätsregeln analysiert.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Wie funktionieren KI Fußballtipps?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Eine KI-gestützte Fußballanalyse kann verschiedene Datenpunkte
              zusammenführen und daraus Wahrscheinlichkeiten für mögliche
              Spielausgänge und Wettmärkte ableiten.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Wahrscheinlichkeiten statt Bauchgefühl
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              ZEVYQ betrachtet berechnete Wahrscheinlichkeiten und setzt sie
              in Beziehung zu verfügbaren Quoten. Dadurch können mögliche
              Unterschiede zwischen Modellbewertung und Marktquote
              strukturiert untersucht werden.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Unterschiedliche Fußballmärkte
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Fußballspiele können auf unterschiedlichen Märkten analysiert
              werden. Dazu gehören beispielsweise 1X2, Over/Under und Beide
              Teams treffen.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Qualitätsfilter für Fußballtipps
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              ZEVYQ soll nicht möglichst viele Fußballtipps erzeugen.
              Analysen werden anhand definierter Kriterien geprüft und
              gefiltert, bevor daraus ein möglicher Tipp entsteht.
            </p>
          </section>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-bold">
            KI kann Fußball analysieren, aber keine Ergebnisse garantieren
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Fußball bleibt trotz datenbasierter Modelle unvorhersehbar.
            Wahrscheinlichkeiten sind keine Garantien für ein bestimmtes
            Spielergebnis. Deshalb steht bei ZEVYQ eine strukturierte und
            nachvollziehbare Analyse im Mittelpunkt.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Ziel ist es, verschiedene Datenquellen, Wahrscheinlichkeiten und
            Quoten zusammenzuführen und die daraus entstehenden Analysen
            transparent zu dokumentieren.
          </p>
        </section>

        <section className="mt-16 rounded-2xl bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold">
            KI Fußballtipps mit ZEVYQ
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            ZEVYQ entwickelt eine datenbasierte Plattform für Fußballanalyse
            und KI-gestützte Wettanalysen. Die Plattform soll Analysen
            nachvollziehbar darstellen und langfristig anhand realer
            Ergebnisse überprüfbar machen.
          </p>
        </section>
      </section>
    </main>
  );
}
