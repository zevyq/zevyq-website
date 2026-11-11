import type { Metadata } from "next";
import { SeoBestTipHighlight, SeoLandingCta } from "../../components/SeoConversion";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.zevyq.de/fussball-analyse" },
  title: "Fußball Analyse – Datenbasierte Spielanalyse | ZEVYQ",
  description:
    "Fußball Analyse mit ZEVYQ: Spiele, Wahrscheinlichkeiten, Quoten und Wettmärkte datenbasiert und strukturiert analysieren.",
};

export default function FussballAnalysePage() {
  return (
    <main className="min-h-screen bg-[#070711] text-white">
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#B9A9FF]">
            ZEVYQ · Fußball Analyse
          </p>

          <h1 className="max-w-4xl bg-gradient-to-r from-white via-white to-[#B9A9FF] bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl">
            Fußball Analyse datenbasiert durchführen
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Eine strukturierte Fußball Analyse betrachtet verschiedene
            Faktoren eines Spiels. ZEVYQ verbindet Daten, Wahrscheinlichkeiten
            und Quoten, um Fußballspiele nachvollziehbar und systematisch zu
            analysieren.
          </p>
        </div>

        <SeoBestTipHighlight />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-[#121126] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-2xl font-bold tracking-tight">
              Was gehört zu einer Fußball Analyse?
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Eine Fußball Analyse kann unterschiedliche Daten und
              Informationen berücksichtigen. Dazu gehören beispielsweise
              vergangene Ergebnisse, Wahrscheinlichkeiten, Quoten und
              verschiedene Wettmärkte.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#121126] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-2xl font-bold tracking-tight">
              Wahrscheinlichkeiten für Fußballspiele
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Wahrscheinlichkeiten können dabei helfen, mögliche
              Spielausgänge mathematisch einzuordnen. ZEVYQ nutzt
              modellbasierte Wahrscheinlichkeiten als Bestandteil seiner
              datenbasierten Fußballanalyse.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#121126] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-2xl font-bold tracking-tight">
              Fußballspiele und Wettmärkte
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Ein Spiel kann auf verschiedenen Märkten betrachtet werden.
              Dazu gehören beispielsweise 1X2, Over/Under und Beide Teams
              treffen. Dadurch können unterschiedliche Aspekte eines Spiels
              analysiert werden.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#121126] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-2xl font-bold tracking-tight">
              Daten statt reines Bauchgefühl
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Datenbasierte Modelle können Informationen strukturiert
              zusammenführen. Sie ersetzen jedoch keine Gewissheit über den
              Ausgang eines Fußballspiels.
            </p>
          </section>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight">
            Wie funktioniert eine datenbasierte Fußball Analyse?
          </h2>

          <p className="mt-5 leading-8 text-slate-300">
            ZEVYQ bietet eine KI-gestützte Plattform, die verschiedene
            Datenpunkte zusammenführt und daraus strukturierte Analysen
            erstellt. Dabei können Wahrscheinlichkeiten mit verfügbaren
            Quoten verglichen und unterschiedliche Wettmärkte untersucht
            werden.
          </p>

          <p className="mt-5 leading-8 text-slate-300">
            Nicht jede Analyse führt automatisch zu einem qualifizierten Tipp.
            ZEVYQ filtert Analysen anhand definierter Qualitätskriterien,
            bevor ein möglicher Tipp ausgegeben wird.
          </p>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight">
            Fußball Analyse mit ZEVYQ
          </h2>

          <p className="mt-5 leading-8 text-slate-300">
            Ziel von ZEVYQ ist eine transparente und nachvollziehbare
            Fußballanalyse. Die Plattform zeigt, wie Daten,
            Wahrscheinlichkeiten und Quoten zu einer strukturierten Bewertung
            eines Fußballspiels zusammengeführt werden.
          </p>

          <p className="mt-5 leading-8 text-slate-300">
            Fußball bleibt trotz statistischer Modelle unvorhersehbar.
            Analysen und Wahrscheinlichkeiten sind deshalb keine Garantie für
            ein bestimmtes Ergebnis.
          </p>
        </section>

        <section className="mt-16 rounded-3xl border border-[#6652D9]/25 bg-[#17132C] p-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Datenbasierte Fußball Analyse mit ZEVYQ
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            ZEVYQ bietet eine Plattform für KI-gestützte Fußballanalyse,
            die Spiele, Wahrscheinlichkeiten, Quoten und Wettmärkte
            strukturiert auswertet.
          </p>
        </section>
        <SeoLandingCta />
      </section>
    </main>
  );
}
