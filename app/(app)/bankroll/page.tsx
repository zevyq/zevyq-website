const bankroll = {
  start: "1.000 €",
  current: "1.131 €",
  profit: "+131 €",
  roi: "+13,1 %",
};

const recentBets = [
  {
    date: "24.09.2026",
    game: "Beispiel FC – Beispiel 04",
    category: "Best Tip",
    odds: "1.72",
    stake: "25 €",
    result: "Offen",
  },
  {
    date: "23.09.2026",
    game: "Example United – Example City",
    category: "Value",
    odds: "1.85",
    stake: "25 €",
    result: "Gewonnen",
  },
  {
    date: "22.09.2026",
    game: "Example Madrid – Example FC",
    category: "Safe",
    odds: "1.32",
    stake: "30 €",
    result: "Gewonnen",
  },
  {
    date: "21.09.2026",
    game: "Example Team – Example Club",
    category: "Verdoppler",
    odds: "2.09",
    stake: "20 €",
    result: "Verloren",
  },
];

export default function BankrollPage() {
  return (
    <div className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 text-sm text-white/40">
              ZEVYQ Bankroll
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Bankroll
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
              Deine persönliche Wettbankroll, Einsätze und Entwicklung auf
              einen Blick.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-400">
            Demo-Daten – persönliche Bankroll folgt
          </div>
        </div>

        {/* Bankroll overview */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-sm text-white/40">Start-Bankroll</div>
            <div className="mt-3 text-2xl font-bold">{bankroll.start}</div>
            <div className="mt-1 text-xs text-white/30">
              Ausgangswert
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-sm text-white/40">Aktuelle Bankroll</div>
            <div className="mt-3 text-2xl font-bold">
              {bankroll.current}
            </div>
            <div className="mt-1 text-xs text-white/30">
              aktueller Stand
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-sm text-white/40">Gewinn / Verlust</div>
            <div className="mt-3 text-2xl font-bold text-white">
              {bankroll.profit}
            </div>
            <div className="mt-1 text-xs text-white/30">
              seit Beginn
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-sm text-white/40">ROI</div>
            <div className="mt-3 text-2xl font-bold">
              {bankroll.roi}
            </div>
            <div className="mt-1 text-xs text-white/30">
              aktuelle Entwicklung
            </div>
          </div>
        </div>

        {/* Bankroll chart placeholder */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-lg font-semibold">
              Bankroll-Entwicklung
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Entwicklung deiner Bankroll über den ausgewählten Zeitraum.
            </p>
          </div>

          <div className="flex h-64 items-center justify-center px-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xl">
                €
              </div>

              <div className="font-medium">
                Noch keine persönlichen Live-Daten
              </div>

              <div className="mt-2 text-sm text-white/40">
                Sobald deine gespielten Tipps erfasst werden, erscheint
                hier automatisch deine Bankroll-Entwicklung.
              </div>
            </div>
          </div>
        </div>

        {/* Recent bets */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-lg font-semibold">
              Letzte gespielte Tipps
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Übersicht deiner zuletzt erfassten Einsätze.
            </p>
          </div>

          <div>
            {recentBets.map((bet, index) => (
              <div
                key={index}
                className="grid gap-4 border-b border-white/10 px-6 py-5 last:border-b-0 lg:grid-cols-[1.5fr_1.2fr_0.6fr_0.7fr_0.8fr]"
              >
                <div>
                  <div className="text-xs text-white/35">
                    {bet.date}
                  </div>
                  <div className="mt-1 font-semibold">
                    {bet.game}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/35">
                    Kategorie
                  </div>
                  <div className="mt-1 text-sm">
                    {bet.category}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/35">
                    Quote
                  </div>
                  <div className="mt-1 text-sm font-medium">
                    {bet.odds}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/35">
                    Einsatz
                  </div>
                  <div className="mt-1 text-sm font-medium">
                    {bet.stake}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/35">
                    Ergebnis
                  </div>

                  <div className="mt-1">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs">
                      {bet.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important note */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="font-semibold">
            Tipp nachgespielt?
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            Später kannst du direkt bei jedem ZEVYQ-Tipp auf
            „Tipp nachgespielt“ klicken, deinen Einsatz eintragen und
            anschließend das Ergebnis erfassen. ZEVYQ aktualisiert
            daraus automatisch deine persönliche Bankroll, Statistik
            und ROI.
          </p>
        </div>
      </div>
    </div>
  );
}