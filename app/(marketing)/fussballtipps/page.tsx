import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fußballtipps – Datenbasierte Fußball-Prognosen | ZEVYQ",
  description:
    "Fußballtipps und datenbasierte Fußball-Prognosen mit ZEVYQ. Analysiere Spiele, Wahrscheinlichkeiten und Quoten mit klaren Qualitätsregeln.",
};

export default function FussballtippsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            ZEVYQ · Fußballanalyse
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Fußballtipps datenbasiert analysieren
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Gute Fußballtipps sollten nicht nur auf Bauchgefühl basieren.
            ZEVYQ analysiert Fußballspiele mit datenbasierten Modellen,
            Wahrscheinlichkeiten und Quoten, um relevante Informationen
            strukturiert zusammenzuführen.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Fußballtipps auf Basis von Daten
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Statt einzelne Faktoren isoliert zu betrachten, verbindet
              ZEVYQ verschiedene Datenpunkte und bewertet Spiele anhand
              nachvollziehbarer Qualitätsregeln.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Wahrscheinlichkeiten und Quoten
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Für eine Fußballanalyse sind nicht nur mögliche Ergebnisse
              interessant. Entscheidend ist auch das Verhältnis zwischen
              berechneter Wahrscheinlichkeit und angebotener Quote.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Verschiedene Wettmärkte
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Fußballspiele können über unterschiedliche Märkte analysiert
              werden. Dazu gehören unter anderem 1X2, Over/Under und
              Beide Teams treffen.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-2xl font-semibold">
              Klare Qualitätsregeln
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              ZEVYQ soll nicht möglichst viele Tipps ausgeben. Das System
              filtert Analysen anhand definierter Kriterien und konzentriert
              sich auf Situationen, die den festgelegten Qualitätsanforderungen
              entsprechen.
            </p>
          </section>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-bold">
            Was macht einen guten Fußballtipp aus?
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Ein Fußballtipp ist immer mit Unsicherheit verbunden. Deshalb
            betrachtet ZEVYQ nicht nur eine mögliche Spielausgang-Prognose,
            sondern auch Daten, Wahrscheinlichkeiten und Quoten. Ziel ist eine
            transparente und strukturierte Fußballanalyse, die nachvollziehbar
            bleibt.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            ZEVYQ entwickelt dafür eine KI-gestützte Analyseplattform für
            Fußballtipps und Sportwetten. Die Ergebnisse sollen transparent
            dokumentiert und langfristig anhand realer Ergebnisse überprüft
            werden.
          </p>
        </section>

        <section className="mt-16 rounded-2xl bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold">
            Fußballtipps mit ZEVYQ
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Entdecke datenbasierte Fußballanalysen und erfahre mehr darüber,
            wie ZEVYQ Spiele, Wahrscheinlichkeiten und Quoten bewertet.
          </p>
        </section>
      </section>
    </main>
  );
}
