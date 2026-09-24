const tip = {
  league: "Bundesliga",
  date: "24.09.2026",
  kickoff: "18:30 Uhr",
  home: "Beispiel FC",
  away: "Beispiel 04",
  category: "Best Tip",
  selection: "Heimsieg",
  odds: "1.72",
  probability: "68%",
  value: "+17.0%",
};

export default function TipDetailPage() {
  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/best-tip"
            className="text-sm text-white/40 transition hover:text-white"
          >
            ← Zurück zu Best Tip
          </a>

          <div className="mt-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/40">
                <span>{tip.league}</span>
                <span>•</span>
                <span>{tip.date}</span>
                <span>•</span>
                <span>{tip.kickoff}</span>
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {tip.home} – {tip.away}
              </h1>

              <p className="mt-3 text-white/50">
                Detaillierte ZEVYQ-Analyse
              </p>
            </div>

            <div className="inline-flex w-fit rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium">
              {tip.category}
            </div>
          </div>
        </div>

        {/* Main tip */}
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
            <div className="text-xs uppercase tracking-[0.2em] text-white/30">
              ZEVYQ Empfehlung
            </div>

            <div className="mt-4">
              <div className="text-sm text-white/40">
                Tipp
              </div>

              <div className="mt-2 text-3xl font-bold">
                {tip.selection}
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs text-white/40">
                  Quote
                </div>

                <div className="mt-2 text-2xl font-bold">
                  {tip.odds}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs text-white/40">
                  Modell
                </div>

                <div className="mt-2 text-2xl font-bold">
                  {tip.probability}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs text-white/40">
                  Value
                </div>

                <div className="mt-2 text-2xl font-bold">
                  {tip.value}
                </div>
              </div>
            </div>

            {/* Analysis */}
            <div className="mt-8 border-t border-white/10 pt-7">
              <h2 className="text-xl font-semibold">
                ZEVYQ Analyse
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/50">
                ZEVYQ analysiert für diesen Tipp unter anderem die
                historische Performance der Teams, aktuelle Form,
                Heim- und Auswärtsstärke, Torverteilung sowie weitere
                verfügbare Daten.
              </p>

              <p className="mt-4 text-sm leading-7 text-white/50">
                Die finale Empfehlung entsteht aus der Kombination
                dieser Faktoren mit der vom Modell berechneten
                Wahrscheinlichkeit und der aktuell verfügbaren Quote.
              </p>
            </div>

            {/* Data quality */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="font-medium">
                    Datenqualität
                  </div>

                  <div className="mt-1 text-sm text-white/40">
                    Grundlage der aktuellen Analyse
                  </div>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                  Hoch
                </div>
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                Tipp spielen
              </div>

              <h2 className="mt-3 text-xl font-semibold">
                Tipp nachgespielt?
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/40">
                Später kannst du hier deinen Einsatz erfassen.
                Dadurch wird der Tipp automatisch deiner persönlichen
                Bankroll und Statistik zugeordnet.
              </p>

              <button
                type="button"
                className="mt-5 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Tipp nachgespielt
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                Match
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/40">
                    Wettbewerb
                  </span>

                  <span className="text-sm font-medium">
                    {tip.league}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/40">
                    Anstoß
                  </span>

                  <span className="text-sm font-medium">
                    {tip.kickoff}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/40">
                    Kategorie
                  </span>

                  <span className="text-sm font-medium">
                    {tip.category}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="text-sm text-white/40">
                    Begegnung
                  </div>

                  <div className="mt-2 font-semibold">
                    {tip.home}
                  </div>

                  <div className="my-1 text-xs text-white/30">
                    gegen
                  </div>

                  <div className="font-semibold">
                    {tip.away}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.03] p-6">
              <div className="text-sm font-medium text-yellow-400">
                Demo-Daten
              </div>

              <p className="mt-2 text-sm leading-6 text-white/40">
                Diese Werte dienen aktuell nur zur Darstellung.
                Später werden sie automatisch aus der echten
                ZEVYQ-KI und den aktuellen Marktdaten geladen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}