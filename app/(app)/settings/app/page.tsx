"use client";

const settings = [
  {
    icon: "🌐",
    title: "Sprache",
    value: "Deutsch",
    description: "Die Spracheinstellung aus der mobilen App.",
  },
  {
    icon: "🎨",
    title: "Darstellung",
    value: "Standard",
    description: "Die Darstellungseinstellung aus der mobilen App.",
  },
  {
    icon: "📱",
    title: "Version",
    value: "ZEVYQ 1.0.0",
    description: "Version der mobilen ZEVYQ-App.",
  },
];

export default function SettingsPage() {
  return (
    <main className="min-h-full px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-white/40">Einstellungen</div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Einstellungen<span className="text-blue-400">.</span></h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
            Sprache, Darstellung und weitere Einstellungen
          </p>
        </div>

        <section className="divide-y divide-white/[0.08] rounded-3xl border border-white/[0.09] bg-white/[0.02] px-6">
          {settings.map((setting) => (
            <div
              key={setting.title}
              className="flex items-center gap-4 py-6"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/15 bg-blue-400/[0.08] text-2xl"
                aria-hidden="true"
              >
                {setting.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold">{setting.title}</h2>
                <p className="mt-1 text-sm text-white/50">{setting.value}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
