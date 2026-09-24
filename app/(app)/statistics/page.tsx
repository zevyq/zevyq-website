const categoryStats = [
  {
    name: "Safe",
    tips: 12,
    wins: 10,
    rate: "83.3%",
    roi: "+8.4%",
  },
  {
    name: "Value",
    tips: 10,
    wins: 7,
    rate: "70.0%",
    roi: "+12.6%",
  },
  {
    name: "Verdoppler",
    tips: 6,
    wins: 4,
    rate: "66.7%",
    roi: "+14.2%",
  },
  {
    name: "Best Tip",
    tips: 8,
    wins: 6,
    rate: "75.0%",
    roi: "+16.8%",
  },
];

const monthlyStats = [
  { month: "Juni", tips: 42, wins: 30, roi: "+11.2%" },
  { month: "Juli", tips: 51, wins: 37, roi: "+13.8%" },
  { month: "August", tips: 48, wins: 35, roi: "+12.4%" },
  { month: "September", tips: 36, wins: 27, roi: "+15.1%" },
];

export default function StatisticsPage() {
  return (
    <section className="px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="text-sm text-white/40">
              ZEVYQ Statistik
            </div>

            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              Statistik
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
              Transparente Auswertung der bisherigen ZEVYQ-Tipps,
              Trefferquoten und Rendite.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-400">
            Demo-Daten – Live-Statistiken folgen
          </div>
        </div>

        {/* Main stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/40">
              Tipps gesamt
            </div>
            <div className="mt-2 text-3xl font-bold">
              166
            </div>
            <div className="mt-1 text-xs text-white/30">
              ausgewertete Empfehlungen
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/40">
              Trefferquote
            </div>
            <div className="mt-2 text-3xl font-bold">
              72.3%
            </div>
            <div className="mt-1 text-xs text-white/30">
              über alle Kategorien
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/40">
              ROI
            </div>
            <div className="mt-2 text-3xl font-bold">
              +13.1%
            </div>
            <div className="mt-1 text-xs text-white/30">
              bei gleicher Grundeinheit
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/40">
              Beste Kategorie
            </div>
            <div className="mt-2 text-3xl font-bold">
              Best Tip
            </div>
            <div className="mt-1 text-xs text-white/30">
              Demo-Auswertung
            </div>
          </div>
        </div>

        {/* Category statistics */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-lg font-semibold">
              Statistik nach Kategorie
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Vergleich der vier ZEVYQ-Tippkategorien.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {categoryStats.map((category) => (
              <div
                key={category.name}
                className="grid gap-5 px-6 py-5 md:grid-cols-[1.5fr_repeat(4,1fr)] md:items-center"
              >
                <div>
                  <div className="font-semibold">
                    {category.name}
                  </div>

                  <div className="mt-1 text-xs text-white/40">
                    {category.tips} Tipps ausgewertet
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/40">
                    Treffer
                  </div>

                  <div className="mt-1 font-semibold">
                    {category.wins}/{category.tips}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/40">
                    Trefferquote
                  </div>

                  <div className="mt-1 font-semibold">
                    {category.rate}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/40">
                    ROI
                  </div>

                  <div className="mt-1 font-semibold">
                    {category.roi}
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{
                      width: category.rate,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly statistics */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-lg font-semibold">
              Monatsübersicht
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Entwicklung der ZEVYQ-Performance über die
              vergangenen Monate.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {monthlyStats.map((month) => (
              <div
                key={month.month}
                className="grid gap-4 px-6 py-5 sm:grid-cols-4 sm:items-center"
              >
                <div className="font-semibold">
                  {month.month}
                </div>

                <div>
                  <div className="text-xs text-white/40">
                    Tipps
                  </div>
                  <div className="mt-1 font-semibold">
                    {month.tips}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/40">
                    Treffer
                  </div>
                  <div className="mt-1 font-semibold">
                    {month.wins}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/40">
                    ROI
                  </div>
                  <div className="mt-1 font-semibold">
                    {month.roi}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
            ZEVYQ Transparenz
          </div>

          <h2 className="mt-3 text-xl font-semibold">
            Jede Empfehlung soll nachvollziehbar bleiben.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/50">
            Sobald die Live-KI verbunden ist, werden Tipp,
            Quote, Modellwahrscheinlichkeit, Ergebnis und
            Performance automatisch gespeichert. Dadurch entsteht
            ein nachvollziehbarer Track Record anstelle von
            nachträglich ausgewählten Ergebnissen.
          </p>
        </div>
      </div>
    </section>
  );
}