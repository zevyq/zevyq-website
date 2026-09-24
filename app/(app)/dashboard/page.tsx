export default function DashboardPage() {
  return (
    <section className="px-6 py-8 md:px-10 md:py-10">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm text-white/40">
            Mittwoch, 24. September 2026
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Dein Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Alle wichtigen ZEVYQ-Analysen, Tipps und Statistiken auf einen
            Blick.
          </p>
        </div>

        <button className="w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85">
          Heutige Tipps
        </button>
      </div>

      {/* Overview */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Heutige Tipps"
          value="12"
          description="Analysierte Empfehlungen"
        />

        <DashboardCard
          title="Trefferquote"
          value="—"
          description="Noch keine Daten"
        />

        <DashboardCard
          title="ROI"
          value="—"
          description="Noch keine Daten"
        />

        <DashboardCard
          title="Spiele analysiert"
          value="—"
          description="Noch keine Daten"
        />
      </div>

      {/* Best Tip */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium">
                BEST TIP
              </span>

              <span className="text-xs text-white/30">
                Beispiel / Platzhalter
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Noch keine Live-Daten verbunden
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
              Sobald die ZEVYQ-KI mit diesem Dashboard verbunden ist,
              erscheinen hier automatisch die aktuell berechneten Tipps.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 md:min-w-40">
            <div className="text-xs text-white/30">Quote</div>
            <div className="mt-2 text-3xl font-bold">—</div>
          </div>
        </div>
      </div>

      {/* Tipp Kategorien */}
      <div className="mt-8">
        <div>
          <h2 className="text-xl font-bold">Tipp-Kategorien</h2>

          <p className="mt-1 text-sm text-white/40">
            Deine vier ZEVYQ-Kategorien
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Safe", "Konservativere Auswahl"],
            ["Value", "Modellbasierter Value"],
            ["Verdoppler", "Zwei Tipps als Kombination"],
            ["Best Tip", "Hervorgehobene Empfehlung"],
          ].map(([name, description]) => (
            <div
              key={name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:bg-white/[0.06]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-bold">
                Z
              </div>

              <h3 className="mt-5 font-semibold">{name}</h3>

              <p className="mt-2 text-sm text-white/40">
                {description}
              </p>

              <div className="mt-6 text-xs text-white/30">
                Noch keine Daten
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold">Letzte Tipps</h2>

            <p className="mt-1 text-xs text-white/30">
              Deine persönliche Tipp-Historie
            </p>
          </div>

          <button className="rounded-xl border border-white/10 px-4 py-2 text-xs text-white/60 transition hover:bg-white/5 hover:text-white">
            Alle anzeigen →
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
          <div className="text-sm text-white/40">
            Noch keine Tipps vorhanden
          </div>

          <div className="mt-2 text-xs text-white/25">
            Deine Historie wird hier automatisch aufgebaut.
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardCard({
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

      <div className="mt-2 text-xs text-white/30">{description}</div>
    </div>
  );
}