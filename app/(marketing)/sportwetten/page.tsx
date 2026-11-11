import type { Metadata } from "next";
import { SeoBestTipHighlight, SeoLandingCta } from "../../components/SeoConversion";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.zevyq.de/sportwetten" },
  title: "Sportwetten – Datenbasierte Fußball-Analyse | ZEVYQ",
  description:
    "Sportwetten mit datenbasierten Fußballanalysen: ZEVYQ bewertet Spiele, Quoten und Wahrscheinlichkeiten mit klaren Qualitätsregeln.",
};

export default function SportwettenPage() {
  return (
    <main className="min-h-screen bg-[#070711] text-white">
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#B9A9FF]">
          ZEVYQ Sports Intelligence
        </p>

        <h1 className="mt-4 max-w-4xl bg-gradient-to-r from-white via-white to-[#B9A9FF] bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl">
          Sportwetten datenbasiert analysieren
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          ZEVYQ analysiert Fußballspiele mit datenbasierten Modellen und
          definierten Qualitätsregeln. Ziel ist es, relevante Informationen
          strukturiert auszuwerten und daraus nachvollziehbare Analysen für
          Sportwetten abzuleiten.
        </p>

        <SeoBestTipHighlight />


        <section className="mt-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B9A9FF]">
              Grundlagen verstehen
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Was bedeutet eine Sportwetten-Quote?
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              Eine Wettquote beschreibt, wie viel bei einem erfolgreichen
              Tipp einschließlich des Einsatzes ausgezahlt wird.
              Bei Dezimalquoten wird der Einsatz mit der Quote
              multipliziert. Sie ist zugleich ein Anhaltspunkt dafür,
              wie der Wettanbieter die Wahrscheinlichkeit eines
              Ereignisses bewertet.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              Eine Quote ist allerdings keine Gewinngarantie.
              Sie kann sich vor dem Anpfiff verändern und
              enthält normalerweise eine Buchmachermarge.
              Deshalb sollte sie nicht mit einer unabhängig
              ermittelten Gewinnwahrscheinlichkeit verwechselt werden.
            </p>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-[#121126] p-7">
              <h3 className="text-xl font-bold">Dezimalquote</h3>
              <p className="mt-3 leading-7 text-slate-300">
                Eine Quote von 2,00 bedeutet bei erfolgreicher
                Wette eine Gesamtauszahlung in Höhe des
                doppelten Einsatzes. Der ursprüngliche
                Einsatz ist darin bereits enthalten.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-[#121126] p-7">
              <h3 className="text-xl font-bold">
                Implizite Wahrscheinlichkeit
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Mit 1 geteilt durch die Dezimalquote lässt
                sich eine implizite Wahrscheinlichkeit berechnen.
                Bei Quote 2,00 sind es 50 %. Das ist noch keine
                um die Buchmachermarge bereinigte Prognose.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-20 overflow-hidden rounded-3xl border border-[#6652D9]/40 bg-gradient-to-br from-[#201536] via-[#151126] to-[#0e0d1b] p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B9A9FF]">
            Einfaches Rechenbeispiel
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Wie viel zahlt eine Quote von 1,80 aus?
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            Angenommen, jemand setzt 10 Euro auf ein
            beliebiges Fußballereignis zur Dezimalquote 1,80.
            So unterscheiden sich Auszahlung, Nettogewinn
            und möglicher Verlust.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-3xl font-black">10,00 €</p>
              <p className="mt-2 text-sm text-slate-300">
                Beispielhafter Einsatz
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-3xl font-black text-[#B9A9FF]">18,00 €</p>
              <p className="mt-2 text-sm text-slate-300">
                Gesamtauszahlung bei Gewinn
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-3xl font-black text-emerald-300">+8,00 €</p>
              <p className="mt-2 text-sm text-slate-300">
                Nettogewinn bei erfolgreicher Wette
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-400/[0.07] p-5 sm:p-6">
            <h3 className="text-lg font-bold">
              Was passiert bei einem verlorenen Tipp?
            </h3>
            <p className="mt-3 leading-8 text-slate-200">
              Tritt das gewettete Ereignis nicht ein,
              geht in diesem Beispiel der gesamte
              Einsatz von 10 Euro verloren.
              Die implizite Wahrscheinlichkeit der Quote
              1,80 beträgt etwa 55,56 %.
              Das bedeutet nicht, dass die Wette
              tatsächlich mit dieser Häufigkeit gewinnt.
            </p>
          </div>

          <p className="mt-5 text-xs leading-6 text-slate-400">
            Vereinfachtes, frei erfundenes Rechenbeispiel ohne
            individuelle Abgaben oder Sonderregeln.
            Keine echte Spielprognose und keine Empfehlung
            zum Abschluss einer Wette.
          </p>
        </section>

        <section className="mt-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Warum Buchmacherquoten nicht automatisch fair sind
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              Wettanbieter kalkulieren ihre Quoten unter anderem so,
              dass eine Marge enthalten ist. Addiert man die
              impliziten Wahrscheinlichkeiten sämtlicher
              sich gegenseitig ausschließender Ergebnisse
              eines vollständigen Marktes, liegt die
              Summe deshalb häufig über 100 %.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              Ein niedriger Quotenwert bedeutet daher nicht automatisch,
              dass eine Wette besonders sinnvoll ist.
              Erst ein Vergleich mit einer möglichst
              realistischen eigenen Wahrscheinlichkeitsschätzung
              erlaubt eine Aussage über den theoretischen
              Erwartungswert.
            </p>
            <a href="/sportwetten-analyse"
              className="mt-6 inline-flex text-sm font-bold text-[#B9A9FF] hover:text-white">
              Quotenbewertung und Value genauer verstehen &rarr;
            </a>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Welche Wettmärkte gibt es im Fußball?
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            Der Wettmarkt legt fest, welches Ereignis eintreten
            muss. Unterschiedliche Märkte können
            für dasselbe Spiel sehr unterschiedliche
            Wahrscheinlichkeiten und Quoten besitzen.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-[#121126] p-7">
              <h3 className="text-xl font-bold">1X2</h3>
              <p className="mt-3 leading-7 text-slate-300">
                Wette auf Heimsieg, Unentschieden oder
                Auswärtssieg innerhalb der regulären
                Spielzeit einschließlich Nachspielzeit.
              </p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-[#121126] p-7">
              <h3 className="text-xl font-bold">Torwetten</h3>
              <p className="mt-3 leading-7 text-slate-300">
                Bei Über oder Unter einer bestimmten
                Torgrenze kommt es auf die Anzahl der
                erzielten Tore an, nicht auf den Sieger.
              </p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-[#121126] p-7">
              <h3 className="text-xl font-bold">
                Beide Teams treffen
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Hier ist entscheidend, ob beide
                Mannschaften mindestens ein Tor erzielen.
                Der genaue Spielausgang ist zweitrangig.
              </p>
            </article>
          </div>

          <a href="/fussballtipps"
            className="mt-6 inline-flex text-sm font-bold text-[#B9A9FF] hover:text-white">
            Wettmärkte mit Ergebnisbeispielen ansehen &rarr;
          </a>
        </section>

        <section className="mt-20 rounded-3xl border border-white/10 bg-[#121126] p-7 sm:p-10">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Sportwetten: Risiken realistisch einschätzen
          </h2>
          <p className="mt-5 leading-8 text-slate-300">
            Sportwetten sind kein verlässlicher Weg,
            Einkommen aufzubauen. Auch eine langfristig
            gut ausgewertete Prognose kann kurzfristig
            mehrere Verluste hintereinander erzielen.
            Historische Trefferquoten sind kein
            Versprechen für kommende Spiele.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-lg font-bold">
                Verlustgrenze festlegen
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Es sollte ausschließlich Geld eingesetzt werden,
                dessen Verlust finanziell verkraftbar ist.
                Geld für laufende Verpflichtungen
                gehört nicht in Sportwetten.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-lg font-bold">
                Verlusten nicht hinterherjagen
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Einsätze nach einem Verlust zu erhöhen,
                um ihn sofort auszugleichen, kann
                das finanzielle Risiko deutlich steigern.
                Pausen und feste Grenzen sind wichtig.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#121126] p-8">
            <h2 className="text-2xl font-black tracking-tight">
              Datenbasierte Sportwetten mit ZEVYQ
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              ZEVYQ analysiert Fußballspiele anhand
              von Modellwahrscheinlichkeiten,
              Quoten und definierten Qualitätsregeln.
              Nicht jede Analyse wird automatisch
              zu einer veröffentlichten Empfehlung.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              Im kostenlosen Zugang kann ein
              qualifizierter Tages-Tipp verfügbar sein.
              PREMIUM bietet Zugang zu weiteren
              Kategorien und Auswertungsmöglichkeiten.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#121126] p-8">
            <h2 className="text-2xl font-black tracking-tight">
              Warum Transparenz wichtiger als Versprechen ist
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              Einzelne gewonnene Wetten sagen wenig
              über die langfristige Qualität aus.
              Wichtig sind die Anzahl aller abgerechneten
              Tipps, Gewinne und Verluste, die jeweiligen
              Quoten und die daraus berechnete Rendite.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              ZEVYQ dokumentiert veröffentlichte
              Empfehlungen, damit sich die Ergebnisse
              im Zeitverlauf nachvollziehen lassen.
            </p>
          </div>
        </section>

        <section className="mt-20 max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Häufige Fragen zu Sportwetten
          </h2>

          <div className="mt-8 space-y-7">
            <div>
              <h3 className="text-lg font-bold">
                Sind Sportwetten mit niedrigen Quoten sicher?
              </h3>
              <p className="mt-2 leading-8 text-slate-300">
                Nein. Niedrige Quoten spiegeln in der Regel
                eine höhere Einschätzung der
                Eintrittswahrscheinlichkeit wider.
                Auch solche Wetten können verlieren.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">
                Was unterscheidet Auszahlung und Gewinn?
              </h3>
              <p className="mt-2 leading-8 text-slate-300">
                Die Auszahlung enthält normalerweise den
                ursprünglichen Einsatz. Der Nettogewinn
                ist die Auszahlung abzüglich des Einsatzes
                und gegebenenfalls anfallender Abgaben.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">
                Kann eine KI Sportwetten garantieren?
              </h3>
              <p className="mt-2 leading-8 text-slate-300">
                Nein. KI kann Daten analysieren und
                Wahrscheinlichkeiten schätzen.
                Sie kann die Unsicherheit von
                Sportereignissen nicht beseitigen.
              </p>
            </div>
          </div>

          <p className="mt-9 text-sm leading-7 text-slate-400">
            Sportwetten sind nur für Volljährige
            bestimmt und können zum vollständigen
            Verlust des Einsatzes führen.
          </p>
        </section>

        <SeoLandingCta />
      </section>
    </main>
  );
}
