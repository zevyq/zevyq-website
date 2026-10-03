import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sportwetten – Datenbasierte Fußball-Analyse | ZEVYQ",
  description:
    "Sportwetten mit datenbasierten Fußballanalysen: ZEVYQ bewertet Spiele, Quoten und Wahrscheinlichkeiten mit klaren Qualitätsregeln.",
};

export default function SportwettenPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
          ZEVYQ Sports Intelligence
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
          Sportwetten datenbasiert analysieren
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          ZEVYQ analysiert Fußballspiele mit datenbasierten Modellen und
          definierten Qualitätsregeln. Ziel ist es, relevante Informationen
          strukturiert auszuwerten und daraus nachvollziehbare Analysen für
          Sportwetten abzuleiten.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-[#0c1328] p-7">
            <h2 className="text-2xl font-black">Daten statt Bauchgefühl</h2>
            <p className="mt-3 leading-7 text-slate-400">
              ZEVYQ berücksichtigt unter anderem Spiel-, Team-, Quoten- und
              historische Daten, um Fußballspiele systematisch zu bewerten.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-[#0c1328] p-7">
            <h2 className="text-2xl font-black">Quoten und Wahrscheinlichkeiten</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Modellwahrscheinlichkeiten werden mit Quoten und weiteren
              Faktoren verglichen, um interessante Markt-Situationen zu
              identifizieren.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-[#0c1328] p-7">
            <h2 className="text-2xl font-black">Klare Qualitätsregeln</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Nicht jedes analysierte Spiel wird automatisch zu einem
              qualifizierten Ergebnis. ZEVYQ verwendet definierte Filter,
              bevor eine Analyse berücksichtigt wird.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-[#0c1328] p-7">
            <h2 className="text-2xl font-black">Nachvollziehbare Analyse</h2>
            <p className="mt-3 leading-7 text-slate-400">
              ZEVYQ soll nicht einfach möglichst viele Tipps ausgeben, sondern
              die zugrunde liegenden Daten und Qualitätsregeln transparent
              darstellen.
            </p>
          </article>
        </div>

        <section className="mt-16 border-t border-white/10 pt-12">
          <h2 className="text-3xl font-black">
            Was macht eine Sportwetten-Analyse aus?
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-slate-400">
            Eine fundierte Fußballanalyse kann verschiedene Faktoren
            berücksichtigen: aktuelle Form, Teamdaten, historische Ergebnisse,
            Marktquoten und modellbasierte Wahrscheinlichkeiten. Entscheidend
            ist dabei die strukturierte Auswertung dieser Informationen.
          </p>

          <p className="mt-5 max-w-3xl leading-8 text-slate-400">
            ZEVYQ entwickelt dafür eine eigene Analyseplattform, die relevante
            Daten zusammenführt und Ergebnisse anhand definierter Regeln
            bewertet.
          </p>
        </section>

        <section className="mt-16 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-8">
          <h2 className="text-2xl font-black">
            Sportwetten mit ZEVYQ analysieren
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            ZEVYQ befindet sich aktiv in der Entwicklung. Die Plattform soll
            datenbasierte Fußballanalysen, verschiedene Tipp-Kategorien und
            persönliche Auswertungen in einer Anwendung verbinden.
          </p>
        </section>
      </section>
    </main>
  );
}
