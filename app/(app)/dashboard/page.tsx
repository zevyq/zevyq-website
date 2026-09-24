export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xl font-bold tracking-[0.2em]">ZEVYQ</div>
            <div className="mt-1 text-xs text-white/40">AI SPORTS INTELLIGENCE</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-medium">Willkommen</div>
              <div className="text-xs text-white/40">Dein Dashboard</div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold">
              M
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 px-5 py-8 md:block">
          <nav className="space-y-2">
            <div className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium">
              Dashboard
            </div>

            {[
              "KI-Tipps",
              "Safe",
              "Value",
              "Verdoppler",
              "Best Tip",
              "Tipp-Historie",
              "Statistik",
              "Bankroll",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl px-4 py-3 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
              >
                {item}
              </div>
            ))}
          </nav>

          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="px-4 text-xs uppercase tracking-[0.15em] text-white/30">
              Konto
            </div>

            <div className="mt-3 rounded-xl px-4 py-3 text-sm text-white/50">
              Abo & Einstellungen
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1 px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm text-white/40">Mittwoch, 24. September 2026</p>

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

          {/* Overview Cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Heutige Tipps", "12", "Analysierte Empfehlungen"],
              ["Trefferquote", "—", "Noch keine Daten"],
              ["ROI", "—", "Noch keine Daten"],
              ["Spiele analysiert", "—", "Noch keine Daten"],
            ].map(([title, value, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="text-sm text-white/40">{title}</div>

                <div className="mt-3 text-3xl font-bold">{value}</div>

                <div className="mt-2 text-xs text-white/30">
                  {description}
                </div>
              </div>
            ))}
          </div>

          {/* Featured Tip */}
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

          {/* Tip Categories */}
          <div className="mt-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold">Tipp-Kategorien</h2>
                <p className="mt-1 text-sm text-white/40">
                  Deine vier ZEVYQ-Kategorien
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Safe",
                  description: "Konservativere Auswahl",
                },
                {
                  name: "Value",
                  description: "Modellbasierter Value",
                },
                {
                  name: "Verdoppler",
                  description: "Zwei Tipps als Kombination",
                },
                {
                  name: "Best Tip",
                  description: "Hervorgehobene Empfehlung",
                },
              ].map((category) => (
                <div
                  key={category.name}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:bg-white/[0.06]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-bold">
                    Z
                  </div>

                  <h3 className="mt-5 font-semibold">{category.name}</h3>

                  <p className="mt-2 text-sm text-white/40">
                    {category.description}
                  </p>

                  <div className="mt-6 text-xs text-white/30">
                    Noch keine Daten
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent History */}
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">Letzte Tipps</h2>
                <p className="mt-1 text-xs text-white/30">
                  Deine persönliche Tipp-Historie
                </p>
              </div>

              <button className="text-xs text-white/50 transition hover:text-white">
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
      </div>
    </main>
  );
}