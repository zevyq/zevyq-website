const plans = [
  {
    name: "ZEVYQ Basic",
    price: "14,99 €",
    description: "Zugang zu den wichtigsten ZEVYQ-Analysen.",
    features: [
      "KI-Tipps",
      "Safe & Value",
      "Tipp-Historie",
    ],
    current: false,
  },
  {
    name: "ZEVYQ Premium",
    price: "19,99 €",
    description: "Der vollständige ZEVYQ-Zugang.",
    features: [
      "Alle KI-Tipps",
      "Safe, Value & Verdoppler",
      "Best Tip",
      "Persönliche Statistik",
      "Bankroll-Tracking",
      "Tipp nachgespielt",
    ],
    current: true,
  },
];

export default function SettingsPage() {
  return (
    <div className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 text-sm text-white/40">
              ZEVYQ Konto
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Abo & Einstellungen
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
              Verwalte dein ZEVYQ-Abonnement, deine Kontodaten und deine
              persönlichen Einstellungen.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-400">
            Demo-Daten – Abrechnung folgt
          </div>
        </div>

        {/* Current subscription */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-6 py-5">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              Aktuelles Abo
            </div>

            <h2 className="mt-2 text-xl font-semibold">
              ZEVYQ Premium
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Dein vollständiger Zugang zur ZEVYQ-Plattform.
            </p>
          </div>

          <div className="grid gap-6 px-6 py-6 md:grid-cols-3">
            <div>
              <div className="text-xs text-white/35">
                Status
              </div>

              <div className="mt-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium">
                  Aktiv
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs text-white/35">
                Monatlicher Preis
              </div>

              <div className="mt-2 text-lg font-semibold">
                19,99 €
              </div>
            </div>

            <div>
              <div className="text-xs text-white/35">
                Nächste Abrechnung
              </div>

              <div className="mt-2 text-lg font-semibold">
                24.10.2026
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Abonnement
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Wähle später den passenden Zugang für deinen ZEVYQ-Account.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 ${
                  plan.current
                    ? "border-white/20 bg-white/[0.04]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {plan.name}
                    </h3>

                    <p className="mt-2 text-sm text-white/40">
                      {plan.description}
                    </p>
                  </div>

                  {plan.current && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                      Aktuell
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <span className="text-3xl font-bold">
                    {plan.price}
                  </span>

                  <span className="ml-2 text-sm text-white/35">
                    / Monat
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-white/60"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/10 text-xs">
                        ✓
                      </span>

                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={plan.current}
                  className={`mt-7 w-full rounded-xl px-4 py-3 text-sm font-medium transition ${
                    plan.current
                      ? "cursor-default border border-white/10 bg-white/5 text-white/40"
                      : "border border-white/15 bg-white text-black hover:bg-white/90"
                  }`}
                >
                  {plan.current
                    ? "Aktuelles Abo"
                    : "Plan auswählen"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Account */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-xl font-semibold">
              Kontodaten
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Deine persönlichen Zugangsdaten.
            </p>
          </div>

          <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
            <div>
              <label className="text-xs text-white/35">
                Name
              </label>

              <input
                type="text"
                defaultValue="Malte"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/25"
              />
            </div>

            <div>
              <label className="text-xs text-white/35">
                E-Mail
              </label>

              <input
                type="email"
                defaultValue="malte@zevyq.de"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/25"
              />
            </div>
          </div>

          <div className="border-t border-white/10 px-6 py-5">
            <button
              type="button"
              className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90"
            >
              Änderungen speichern
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-xl font-semibold">
              Benachrichtigungen
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Lege später fest, welche ZEVYQ-Informationen du erhalten
              möchtest.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            <div className="flex items-center justify-between gap-5 px-6 py-5">
              <div>
                <div className="font-medium">
                  Neue KI-Tipps
                </div>

                <div className="mt-1 text-sm text-white/40">
                  Benachrichtigung bei neuen ZEVYQ-Tipps.
                </div>
              </div>

              <div className="h-6 w-11 rounded-full bg-white/20 p-1">
                <div className="h-4 w-4 rounded-full bg-white" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-5 px-6 py-5">
              <div>
                <div className="font-medium">
                  Ergebnis-Updates
                </div>

                <div className="mt-1 text-sm text-white/40">
                  Ergebnisse deiner gespeicherten Tipps.
                </div>
              </div>

              <div className="h-6 w-11 rounded-full bg-white/10 p-1">
                <div className="h-4 w-4 rounded-full bg-white/60" />
              </div>
            </div>
          </div>
        </section>

        {/* Danger zone */}
        <section className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/[0.02] p-6">
          <h2 className="font-semibold text-red-300">
            Konto
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/40">
            Die Funktionen zum Abmelden, Kündigen und Löschen des
            Accounts werden mit dem echten Benutzer- und
            Abrechnungssystem verbunden.
          </p>

          <button
            type="button"
            className="mt-5 rounded-xl border border-red-500/20 px-4 py-3 text-sm text-red-300"
          >
            Abmelden
          </button>
        </section>
      </div>
    </div>
  );
}