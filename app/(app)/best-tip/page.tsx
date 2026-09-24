export default function BestTipPage() {
  return (
    <div className="px-8 py-10">
      {/* Seitenkopf */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <div className="mb-2 text-sm text-white/40">
            ZEVYQ Kategorie
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Best Tip
          </h1>

          <p className="mt-3 max-w-2xl text-white/50">
            Die stärkste Einzel-Empfehlung der aktuellen ZEVYQ-Analyse.
          </p>
        </div>

        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-5 py-3 text-sm text-yellow-400">
          Demo-Daten – noch nicht mit der Live-KI verbunden
        </div>
      </div>

      {/* Erklärung */}
      <section className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-7">
        <div className="flex items-start justify-between gap-8">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-semibold">
              BEST TIP
            </div>

            <h2 className="text-2xl font-bold">
              Die stärkste ZEVYQ-Empfehlung
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-white/50">
              Der Best Tip wird später automatisch aus allen verfügbaren
              Spielen und Märkten ausgewählt. Dabei berücksichtigt ZEVYQ
              unter anderem Modellwahrscheinlichkeit, Quote, Value und
              Datenqualität.
            </p>
          </div>

          <div className="min-w-44 rounded-2xl border border-white/10 p-5">
            <div className="text-sm text-white/40">
              Ziel
            </div>

            <div className="mt-2 text-2xl font-bold">
              Top Pick
            </div>

            <div className="mt-1 text-xs text-white/30">
              stärkste Empfehlung
            </div>
          </div>
        </div>
      </section>

      {/* Kennzahlen */}
      <div className="mb-10 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="text-sm text-white/40">
            Best Tip heute
          </div>

          <div className="mt-3 text-3xl font-bold">
            1
          </div>

          <div className="mt-2 text-xs text-white/30">
            Demo-Empfehlung
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="text-sm text-white/40">
            Modell
          </div>

          <div className="mt-3 text-3xl font-bold">
            68%
          </div>

          <div className="mt-2 text-xs text-white/30">
            Modellwahrscheinlichkeit
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="text-sm text-white/40">
            Quote
          </div>

          <div className="mt-3 text-3xl font-bold">
            1.72
          </div>

          <div className="mt-2 text-xs text-white/30">
            Demo-Wert
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="text-sm text-white/40">
            Value
          </div>

          <div className="mt-3 text-3xl font-bold">
            +17.0%
          </div>

          <div className="mt-2 text-xs text-white/30">
            modellbasierte Berechnung
          </div>
        </div>
      </div>

      {/* Aktueller Best Tip */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold">
            Aktueller Best Tip
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Die stärkste Einzel-Empfehlung der heutigen Analyse
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-white/40">
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white">
                  BEST TIP
                </span>

                <span>Bundesliga</span>
                <span>18:30 Uhr</span>
              </div>

              <h3 className="text-2xl font-bold">
                Beispiel FC – Beispiel 04
              </h3>

              <p className="mt-2 text-white/50">
                Heimsieg
              </p>

              <p className="mt-3 text-sm text-white/30">
                Analyse abgeschlossen
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl border border-white/10 px-5 py-4">
                <div className="text-xs text-white/40">
                  Modell
                </div>

                <div className="mt-2 text-xl font-bold">
                  68%
                </div>
              </div>

              <div className="rounded-xl border border-white/10 px-5 py-4">
                <div className="text-xs text-white/40">
                  Quote
                </div>

                <div className="mt-2 text-xl font-bold">
                  1.72
                </div>
              </div>

              <div className="rounded-xl border border-white/10 px-5 py-4">
                <div className="text-xs text-white/40">
                  Value
                </div>

                <div className="mt-2 text-xl font-bold">
                  +17.0%
                </div>
              </div>

              <button className="rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-white/90">
                Details →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}