const valueTips = [
  {
    league: "Premier League",
    time: "20:00",
    match: "Example United – Example City",
    market: "Beide Teams treffen",
    probability: "64%",
    odds: "1.85",
    value: "+18.4%",
  },
  {
    league: "Bundesliga",
    time: "18:30",
    match: "Beispiel FC – Beispiel 04",
    market: "Heimsieg",
    probability: "61%",
    odds: "1.82",
    value: "+11.0%",
  },
  {
    league: "La Liga",
    time: "20:30",
    match: "Example Madrid – Example FC",
    market: "Über 2,5 Tore",
    probability: "59%",
    odds: "1.95",
    value: "+15.1%",
  },
];

export default function ValuePage() {
  return (
    <section className="px-6 py-8 md:px-10 md:py-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm text-white/40">ZEVYQ Kategorie</p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Value
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Modellbasierte Empfehlungen mit einem positiven Verhältnis
            zwischen berechneter Wahrscheinlichkeit und verfügbarer Quote.
          </p>
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-200/70">
          Demo-Daten – noch nicht mit der Live-KI verbunden
        </div>
      </div>

      {/* Value explanation */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium">
                VALUE
              </span>

              <span className="text-xs text-white/30">
                Modellbasierte Auswahl
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              Wahrscheinlichkeit trifft Quote
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
              Ein Value-Tipp entsteht, wenn die vom ZEVYQ-Modell berechnete
              Wahrscheinlichkeit über der Wahrscheinlichkeit liegt, die
              durch die angebotene Quote impliziert wird.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5 md:min-w-44">
            <div className="text-xs text-white/30">
              Mindest-Value
            </div>

            <div className="mt-2 text-3xl font-bold">
              +5%
            </div>

            <div className="mt-1 text-xs text-white/30">
              Demo-Schwellenwert
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Value-Tipps heute"
          value="3"
          description="Demo-Empfehlungen"
        />

        <StatCard
          title="Ø Modell-Wahrscheinlichkeit"
          value="61.3%"
          description="über Demo-Tipps"
        />

        <StatCard
          title="Ø Value"
          value="+14.8%"
          description="modellbasierte Berechnung"
        />

        <StatCard
          title="Ø Quote"
          value="1.87"
          description="Demo-Werte"
        />
      </div>

      {/* Formula */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
          ZEVYQ Value-System
        </p>

        <h2 className="mt-3 text-xl font-bold">
          Was bedeutet Value?
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <MethodCard
            number="01"
            title="Modell"
            text="ZEVYQ berechnet eine eigene Wahrscheinlichkeit für den jeweiligen Markt."
          />

          <MethodCard
            number="02"
            title="Quote"
            text="Die verfügbare Quote wird in eine implizierte Wahrscheinlichkeit umgerechnet."
          />

          <MethodCard
            number="03"
            title="Value"
            text="Nur wenn die Modellbewertung einen ausreichend positiven Unterschied ergibt, entsteht ein Value-Kandidat."
          />
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-xs text-white/30">
            Vereinfachtes Beispiel
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-xl border border-white/10 px-4 py-3">
              Modell: <strong>64%</strong>
            </span>

            <span className="text-white/30">vs.</span>

            <span className="rounded-xl border border-white/10 px-4 py-3">
              Quote: <strong>1.85</strong>
            </span>

            <span className="text-white/30">→</span>

            <span className="rounded-xl border border-white/10 px-4 py-3">
              Value: <strong>+18.4%</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8">
        <div>
          <h2 className="text-xl font-bold">
            Aktuelle Value-Tipps
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Kandidaten mit positivem modellbasiertem Value
          </p>
        </div>

        <div className="mt-5 space-y-4">
          {valueTips.map((tip) => (
            <div
              key={tip.match}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.05]"
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium">
                      VALUE
                    </span>

                    <span className="text-xs text-white/30">
                      {tip.league}
                    </span>

                    <span className="text-xs text-white/30">
                      {tip.time} Uhr
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold">
                    {tip.match}
                  </h3>

                  <p className="mt-2 text-sm text-white/40">
                    {tip.market}
                  </p>
                </div>

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
      </div>
    </section>
  );
}

function StatCard({
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

      <div className="mt-3 text-3xl font-bold">
        {value}
      </div>

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
      <div className="text-xs text-white/30">
        {label}
      </div>

      <div className="mt-1 text-lg font-semibold">
        {value}
      </div>
    </div>
  );
}

function MethodCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="text-xs font-semibold tracking-[0.2em] text-white/30">
        {number}
      </div>

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-white/40">
        {text}
      </p>
    </div>
  );
}