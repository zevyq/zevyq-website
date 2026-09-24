const verdoppler = {
  status: "AKTIVE KOMBINATION",
  league: "Bundesliga",
  time: "18:30",
  match1: "Beispiel FC – Beispiel 04",
  market1: "Über 1,5 Tore",
  probability1: "82%",
  odds1: "1.32",
  match2: "Example United – Example City",
  market2: "Beide Teams treffen",
  probability2: "68%",
  odds2: "1.58",
  combinedOdds: "2.09",
};

export default function VerdopplerPage() {
  return (
    <section className="px-6 py-8 md:px-10 md:py-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm text-white/40">ZEVYQ Kategorie</p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Verdoppler
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Zwei ausgewählte Tipps werden zu einer Kombination verbunden.
            Ziel ist eine Gesamtquote von ungefähr 2.00.
          </p>
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-200/70">
          Demo-Daten – noch nicht mit der Live-KI verbunden
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium">
                VERDOPPLER
              </span>

              <span className="text-xs text-white/30">
                2-Tipp-Kombination
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              Zwei Tipps. Eine Kombination.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
              Die ZEVYQ-KI sucht zwei passende Einzel-Tipps und kombiniert
              deren Quoten. Dabei werden Wahrscheinlichkeit, Marktqualität
              und Quote gemeinsam betrachtet.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5 md:min-w-44">
            <div className="text-xs text-white/30">
              Zielquote
            </div>

            <div className="mt-2 text-3xl font-bold">
              ~2.00
            </div>

            <div className="mt-1 text-xs text-white/30">
              Demo-Zielbereich
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Verdoppler heute"
          value="1"
          description="Demo-Kombination"
        />

        <StatCard
          title="Tipp 1 Wahrscheinlichkeit"
          value={verdoppler.probability1}
          description="Modellberechnung"
        />

        <StatCard
          title="Tipp 2 Wahrscheinlichkeit"
          value={verdoppler.probability2}
          description="Modellberechnung"
        />

        <StatCard
          title="Gesamtquote"
          value={verdoppler.combinedOdds}
          description="Demo-Kombination"
        />
      </div>

      {/* Active combination */}
      <div className="mt-8">
        <div>
          <h2 className="text-xl font-bold">
            Aktueller Verdoppler
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Die aktuelle ZEVYQ-Kombination
          </p>
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          {/* Combination header */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium">
                {verdoppler.status}
              </span>

              <span className="text-xs text-white/30">
                {verdoppler.league}
              </span>

              <span className="text-xs text-white/30">
                {verdoppler.time} Uhr
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3">
              <div className="text-xs text-white/30">
                Gesamtquote
              </div>

              <div className="mt-1 text-2xl font-bold">
                {verdoppler.combinedOdds}
              </div>
            </div>
          </div>

          {/* Tip 1 */}
          <CombinationTip
            number="01"
            match={verdoppler.match1}
            market={verdoppler.market1}
            probability={verdoppler.probability1}
            odds={verdoppler.odds1}
          />

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />

            <span className="rounded-full border border-white/10 bg-black px-3 py-1 text-xs text-white/30">
              UND
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Tip 2 */}
          <CombinationTip
            number="02"
            match={verdoppler.match2}
            market={verdoppler.market2}
            probability={verdoppler.probability2}
            odds={verdoppler.odds2}
          />

          {/* Summary */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <SummaryCard
              label="Tipp 1"
              value={verdoppler.odds1}
              description="Einzelquote"
            />

            <SummaryCard
              label="Tipp 2"
              value={verdoppler.odds2}
              description="Einzelquote"
            />

            <SummaryCard
              label="Kombination"
              value={verdoppler.combinedOdds}
              description="Gesamtquote"
            />
          </div>

          <button className="mt-6 w-full rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-white/90">
            Verdoppler öffnen →
          </button>
        </div>
      </div>

      {/* System */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
          ZEVYQ Verdoppler-System
        </p>

        <h2 className="mt-3 text-xl font-bold">
          Wie entsteht der Verdoppler?
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <MethodCard
            number="01"
            title="Kandidaten finden"
            text="Die KI analysiert die verfügbaren Spiele und Märkte nach geeigneten Einzel-Tipps."
          />

          <MethodCard
            number="02"
            title="Kombination prüfen"
            text="Geeignete Tipps werden hinsichtlich Wahrscheinlichkeit, Quote und Kombinationseignung geprüft."
          />

          <MethodCard
            number="03"
            title="Verdoppler wählen"
            text="Aus den geprüften Kombinationen wird der passende Kandidat für den Zielbereich ausgewählt."
          />
        </div>
      </div>
    </section>
  );
}

function CombinationTip({
  number,
  match,
  market,
  probability,
  odds,
}: {
  number: string;
  match: string;
  market: string;
  probability: string;
  odds: string;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold">
            {number}
          </div>

          <div>
            <div className="text-xs text-white/30">
              Einzel-Tipp
            </div>

            <h3 className="mt-2 text-lg font-semibold">
              {match}
            </h3>

            <p className="mt-1 text-sm text-white/40">
              {market}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:w-[280px]">
          <Metric
            label="Modell"
            value={probability}
          />

          <Metric
            label="Quote"
            value={odds}
          />
        </div>
      </div>
    </div>
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
      <div className="text-sm text-white/40">
        {title}
      </div>

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

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-xs text-white/30">
        {label}
      </div>

      <div className="mt-2 text-xl font-bold">
        {value}
      </div>

      <div className="mt-1 text-xs text-white/30">
        {description}
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