const tips = [
  {
    category: "BEST TIP",
    league: "Bundesliga",
    time: "18:30",
    match: "Beispiel FC – Beispiel 04",
    market: "Heimsieg",
    probability: "68%",
    odds: "1.72",
    value: "+17.0%",
    status: "Analyse abgeschlossen",
  },
  {
    category: "VALUE",
    league: "Premier League",
    time: "20:00",
    match: "Example United – Example City",
    market: "Beide Teams treffen",
    probability: "64%",
    odds: "1.85",
    value: "+18.4%",
    status: "Analyse abgeschlossen",
  },
  {
    category: "SAFE",
    league: "La Liga",
    time: "20:30",
    match: "Example Madrid – Example FC",
    market: "Über 1,5 Tore",
    probability: "81%",
    odds: "1.34",
    value: "+8.5%",
    status: "Analyse abgeschlossen",
  },
  {
    category: "VALUE",
    league: "Serie A",
    time: "21:00",
    match: "Example Milano – Example Roma",
    market: "Unter 3,5 Tore",
    probability: "72%",
    odds: "1.68",
    value: "+21.0%",
    status: "Analyse abgeschlossen",
  },
];

export default function TipsPage() {
  return (
    <section className="px-6 py-8 md:px-10 md:py-10">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm text-white/40">
            ZEVYQ Intelligence
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            KI-Tipps
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Die aktuell berechneten ZEVYQ-Empfehlungen auf Basis der
            analysierten Spieldaten.
          </p>
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-200/70">
          Demo-Daten – noch nicht mit der Live-KI verbunden
        </div>
      </div>

      {/* Filter */}
      <div className="mt-8 flex flex-wrap gap-3">
        {["Alle", "Safe", "Value", "Verdoppler", "Best Tip"].map(
          (filter, index) => (
            <button
              key={filter}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                index === 0
                  ? "border-white bg-white text-black"
                  : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ),
        )}
      </div>

      {/* Summary */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Tipps heute"
          value="4"
          description="Demo-Empfehlungen"
        />

        <SummaryCard
          title="Ø Modell-Wahrscheinlichkeit"
          value="71.3%"
          description="über alle Demo-Tipps"
        />

        <SummaryCard
          title="Ø Value"
          value="+16.2%"
          description="modellbasierte Berechnung"
        />
      </div>

      {/* Tips */}
      <div className="mt-8 space-y-4">
        {tips.map((tip) => (
          <div
            key={`${tip.match}-${tip.category}`}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.05]"
          >
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              {/* Match */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <CategoryBadge category={tip.category} />

                  <span className="text-xs text-white/30">
                    {tip.league}
                  </span>

                  <span className="text-xs text-white/30">
                    {tip.time} Uhr
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-semibold">
                  {tip.match}
                </h2>

                <div className="mt-2 text-sm text-white/40">
                  {tip.market}
                </div>

                <div className="mt-4 text-xs text-white/25">
                  {tip.status}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[500px]">
                <Metric
                  label="Modell"
                  value={tip.probability}
                />

                <Metric
                  label="Quote"
                  value={tip.odds}
                />

                <Metric
                  label="Value"
                  value={tip.value}
                />

                <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10">
                  <div className="text-xs text-white/30">
                    Details
                  </div>

                  <div className="mt-1 text-sm font-semibold">
                    Öffnen →
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
          ZEVYQ Analyse
        </p>

        <h2 className="mt-3 text-xl font-bold">
          Was bedeutet der angezeigte Value?
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/50">
          Der Value soll später den Unterschied zwischen der vom Modell
          berechneten Wahrscheinlichkeit und der impliziten
          Wahrscheinlichkeit der verfügbaren Quote darstellen. Die
          endgültige Berechnung wird direkt aus unseren echten
          ZEVYQ-Modellen und Live-Quoten gespeist.
        </p>
      </div>
    </section>
  );
}

function SummaryCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-sm text-white/40">{title}</div>

      <div className="mt-3 text-3xl font-bold">{value}</div>

      <div className="mt-2 text-xs text-white/30">
        {description}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="text-xs text-white/30">{label}</div>

      <div className="mt-1 text-lg font-semibold">
        {value}
      </div>
    </div>
  );
}

function CategoryBadge({
  category,
}: {
  category: string;
}) {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium">
      {category}
    </span>
  );
}