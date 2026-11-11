import type { Metadata } from "next";
import { SeoBestTipHighlight, SeoLandingCta } from "../../components/SeoConversion";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.zevyq.de/fussballtipps" },
  title: "Fußballtipps – Datenbasierte Fußball-Prognosen | ZEVYQ",
  description:
    "Fußballtipps und datenbasierte Fußball-Prognosen mit ZEVYQ. Analysiere Spiele, Wahrscheinlichkeiten und Quoten mit klaren Qualitätsregeln.",
};

export default function FussballtippsPage() {
  return (
    <main className="min-h-screen bg-[#070711] text-white">
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#B9A9FF]">
            ZEVYQ · Fußballanalyse
          </p>

          <h1 className="max-w-4xl bg-gradient-to-r from-white via-white to-[#B9A9FF] bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl">
            Fußballtipps datenbasiert analysieren
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Gute Fußballtipps sollten nicht nur auf Bauchgefühl basieren.
            ZEVYQ analysiert Fußballspiele mit datenbasierten Modellen,
            Wahrscheinlichkeiten und Quoten, um relevante Informationen
            strukturiert zusammenzuführen.
          </p>
        </div>

        <SeoBestTipHighlight />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-[#121126] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-2xl font-bold tracking-tight">
              Fußballtipps auf Basis von Daten
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Statt einzelne Faktoren isoliert zu betrachten, verbindet
              ZEVYQ verschiedene Datenpunkte und bewertet Spiele anhand
              nachvollziehbarer Qualitätsregeln.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#121126] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-2xl font-bold tracking-tight">
              Wahrscheinlichkeiten und Quoten
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Für eine Fußballanalyse sind nicht nur mögliche Ergebnisse
              interessant. Entscheidend ist auch das Verhältnis zwischen
              berechneter Wahrscheinlichkeit und angebotener Quote.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#121126] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-2xl font-bold tracking-tight">
              Verschiedene Wettmärkte
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Fußballspiele können über unterschiedliche Märkte analysiert
              werden. Dazu gehören unter anderem 1X2, Over/Under und
              Beide Teams treffen.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#121126] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-2xl font-bold tracking-tight">
              Klare Qualitätsregeln
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              ZEVYQ setzt auf Qualität statt auf möglichst viele Tipps. Das System
              filtert Analysen anhand definierter Kriterien und konzentriert
              sich auf Situationen, die den festgelegten Qualitätsanforderungen
              entsprechen.
            </p>
          </section>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight">
            Was macht einen guten Fußballtipp aus?
          </h2>

          <p className="mt-5 leading-8 text-slate-300">
            Ein Fußballtipp ist immer mit Unsicherheit verbunden. Deshalb
            betrachtet ZEVYQ nicht nur eine mögliche Spielausgang-Prognose,
            sondern auch Daten, Wahrscheinlichkeiten und Quoten. Ziel ist eine
            transparente und strukturierte Fußballanalyse, die nachvollziehbar
            bleibt.
          </p>

          <p className="mt-5 leading-8 text-slate-300">
            ZEVYQ bietet dafür eine KI-gestützte Analyseplattform für
            Fußballtipps und Sportwetten. Die Ergebnisse werden transparent
            dokumentiert und langfristig anhand realer Ergebnisse überprüft
            werden.
          </p>
        </section>

        <section className="mt-16 rounded-3xl border border-[#6652D9]/25 bg-[#17132C] p-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Fußballtipps mit ZEVYQ
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Entdecke datenbasierte Fußballanalysen und erfahre mehr darüber,
            wie ZEVYQ Spiele, Wahrscheinlichkeiten und Quoten bewertet.
          </p>
        </section>
        <SeoLandingCta />
      </section>
    </main>
  );
}
