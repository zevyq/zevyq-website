const history = [
  {
    date: "24.09.2026",
    league: "Bundesliga",
    match: "Beispiel FC – Beispiel 04",
    category: "Best Tip",
    tip: "Heimsieg",
    odds: "1.72",
    model: "68%",
    result: "Offen",
  },
  {
    date: "23.09.2026",
    league: "Premier League",
    match: "Example United – Example City",
    category: "Value",
    tip: "Beide Teams treffen",
    odds: "1.85",
    model: "64%",
    result: "Gewonnen",
  },
  {
    date: "22.09.2026",
    league: "La Liga",
    match: "Example Madrid – Example FC",
    category: "Safe",
    tip: "Über 1,5 Tore",
    odds: "1.32",
    model: "82%",
    result: "Gewonnen",
  },
  {
    date: "21.09.2026",
    league: "Serie A",
    match: "Example Milano – Example Roma",
    category: "Verdoppler",
    tip: "Kombination",
    odds: "2.04",
    model: "71%",
    result: "Verloren",
  },
];

function resultClass(result: string) {
  if (result === "Gewonnen") {
    return "border-white/15 bg-white/10 text-white";
  }

  if (result === "Verloren") {
    return "border-white/10 bg-white/5 text-white/50";
  }

  return "border-white/10 bg-white/5 text-white/60";
}

export default function HistoryPage() {
  const wins = history.filter((item) => item.result === "Gewonnen").length;
  const losses = history.filter((item) => item.result === "Verloren").length;
  const open = history.filter((item) => item.result === "Offen").length;

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
              Tipp-Historie
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
              Alle veröffentlichten ZEVYQ-Tipps und deren Ergebnisse auf
              einen Blick.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-400">
            Demo-Daten – Ergebnisse später automatisch aus der KI
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/40">Tipps gesamt</div>
            <div className="mt-2 text-3xl font-bold">{history.length}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/40">Gewonnen</div>
            <div className="mt-2 text-3xl font-bold">{wins}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/40">Verloren</div>
            <div className="mt-2 text-3xl font-bold">{losses}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/40">Offen</div>
            <div className="mt-2 text-3xl font-bold">{open}</div>
          </div>
        </div>

        {/* History */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-lg font-semibold">
              Alle Tipps
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Transparenter Überblick über vergangene Empfehlungen.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {history.map((item, index) => (
              <div
                key={index}
                className="px-6 py-5 transition hover:bg-white/[0.03]"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                      <span>{item.date}</span>
                      <span>{item.league}</span>

                      <span className="rounded-full border border-white/10 px-2 py-1 text-white/70">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold">
                      {item.match}
                    </h3>

                    <div className="mt-1 text-sm text-white/50">
                      {item.tip}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="min-w-24 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <div className="text-xs text-white/40">Quote</div>
                      <div className="mt-1 font-semibold">
                        {item.odds}
                      </div>
                    </div>

                    <div className="min-w-24 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <div className="text-xs text-white/40">Modell</div>
                      <div className="mt-1 font-semibold">
                        {item.model}
                      </div>
                    </div>

                    <div className="min-w-24 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <div className="text-xs text-white/40">
                        Ergebnis
                      </div>

                      <div
                        className={`mt-1 inline-flex rounded-full border px-2 py-1 text-xs ${resultClass(
                          item.result
                        )}`}
                      >
                        {item.result}
                      </div>
                    </div>

                    <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
                      Details →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}