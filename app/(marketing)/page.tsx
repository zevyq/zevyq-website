import Image from "next/image";

const products = [
  {
    name: "SAFE",
    label: "Weniger Risiko",
    description:
      "Ausgewählte Tipps mit hoher Modellwahrscheinlichkeit und konservativer Quote.",
    color: "emerald",
  },
  {
    name: "VALUE",
    label: "Mehr Marktwert",
    description:
      "Die KI sucht nach Quoten, die über der berechneten fairen Bewertung liegen.",
    color: "blue",
  },
  {
    name: "VERDOPPLER",
    label: "2er-Kombination",
    description:
      "Zwei qualifizierte Einzel-Tipps werden zu einer geprüften Kombination verbunden.",
    color: "violet",
  },
  {
    name: "BEST TIP",
    label: "Top-Auswahl",
    description:
      "Der stärkste qualifizierte Tipp des Tages – ausgewählt aus der gesamten Analyse.",
    color: "orange",
  },
];

const features = [
  {
    number: "01",
    title: "Daten statt Bauchgefühl",
    text: "ZEVYQ verarbeitet Spiel-, Team-, Quoten- und historische Daten, um Märkte systematisch zu bewerten.",
  },
  {
    number: "02",
    title: "Value erkennen",
    text: "Modellwahrscheinlichkeit, faire Quote und aktuelle Marktquote werden miteinander verglichen.",
  },
  {
    number: "03",
    title: "Qualität vor Quantität",
    text: "Nur Tipps, die die definierten Qualitätsfilter bestehen, werden für die App berücksichtigt.",
  },
  {
    number: "04",
    title: "Alles nachvollziehbar",
    text: "Tipp, Quote, Modellwahrscheinlichkeit, faire Quote und Value bleiben transparent sichtbar.",
  },
];

const steps = [
  {
    number: "01",
    title: "Daten sammeln",
    text: "Spiele, Quoten und relevante historische Daten werden zusammengeführt.",
  },
  {
    number: "02",
    title: "Spiele analysieren",
    text: "Die ZEVYQ Engine berechnet Wahrscheinlichkeiten und bewertet verschiedene Märkte.",
  },
  {
    number: "03",
    title: "Value prüfen",
    text: "Qualitätsfilter prüfen Wahrscheinlichkeit, Quote, Value und weitere Kriterien.",
  },
  {
    number: "04",
    title: "Tipp auswählen",
    text: "Die qualifizierten Ergebnisse werden nach klaren Regeln für ZEVYQ aufbereitet.",
  },
];

const progressItems = [
  { label: "KI-Analyse Engine", done: true },
  { label: "Value-Analyse", done: true },
  { label: "Safe / Value / Verdoppler / Best Tip", done: true },
  { label: "Benutzerkonten", done: true },
  { label: "Persönliche Statistiken", done: true },
  { label: "Tipp-Historie", done: true },
  { label: "Track Record", done: false },
  { label: "Premium-System", done: false },
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-black tracking-tight text-[#050816]">
              Z
            </div>
            <div>
              <div className="text-xl font-black tracking-tight">ZEVYQ</div>
              <div className="text-[9px] font-semibold tracking-[0.28em] text-slate-500">
                SPORTS INTELLIGENCE
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#produkt">
              Produkt
            </a>
            <a className="transition hover:text-white" href="#vorteile">
              Vorteile
            </a>
            <a className="transition hover:text-white" href="#entwicklung">
              Entwicklung
            </a>
          </nav>

          <div className="hidden w-24 md:block" />
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-400">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              KI-gestützte Sportanalysen
            </div>

            <h1 className="max-w-2xl text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              Sportwetten.
              <br />
              <span className="text-blue-500">Neu gedacht.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              ZEVYQ verbindet moderne KI-Analyse mit Sport- und Quotendaten,
              um aus tausenden Datenpunkten nachvollziehbare Sportanalysen zu
              entwickeln.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#produkt"
                className="rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                ZEVYQ entdecken
              </a>
              <a
                href="#entwicklung"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-slate-200 transition hover:border-white/25 hover:bg-white/10"
              >
                Entwicklungsstand ansehen
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-slate-500">
              <span>✓ Datenbasiert</span>
              <span>✓ Transparent</span>
              <span>✓ Qualitätsgeprüft</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-blue-600/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1124] shadow-2xl shadow-blue-950/40">
              <Image
                src="/images/zevyq-hero.png"
                alt="ZEVYQ Sports Intelligence"
                width={1200}
                height={900}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product */}
      <section id="produkt" className="border-y border-white/10 bg-[#080d1d]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
              Das ZEVYQ System
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Vier Wege. Eine Analyse-Engine.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              ZEVYQ ordnet qualifizierte Analysen in klar verständliche
              Kategorien ein. Keine künstlich gefüllten Listen – nur Ergebnisse,
              die die jeweiligen Qualitätsregeln erfüllen.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.name}
                className="rounded-3xl border border-white/10 bg-[#0c1328] p-7 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-white/20 hover:bg-[#101a34]"
              >
                <div
                  className={`inline-flex rounded-2xl px-3 py-2 text-xs font-black tracking-[0.15em] ${
                    product.color === "emerald"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : product.color === "blue"
                        ? "bg-blue-500/10 text-blue-400"
                        : product.color === "violet"
                          ? "bg-violet-500/10 text-violet-400"
                          : "bg-orange-500/10 text-orange-400"
                  }`}
                >
                  {product.name}
                </div>
                <p className="mt-6 text-sm font-bold text-slate-300">
                  {product.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {product.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="vorteile" className="bg-[#050816]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
                Warum ZEVYQ?
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Mehr als nur ein Tipp.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Hinter jedem qualifizierten Ergebnis stehen Daten, Berechnung
                und definierte Qualitätsregeln. Genau diese Transparenz soll
                ZEVYQ von Anfang an auszeichnen.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="rounded-3xl border border-white/10 bg-[#0c1328] p-7 shadow-xl shadow-black/10"
                >
                  <div className="text-sm font-black text-blue-400">
                    {feature.number}
                  </div>
                  <h3 className="mt-5 text-xl font-black text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#02040b] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
              Der Prozess
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Von Daten zu ZEVYQ.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Die Idee ist einfach: möglichst viele relevante Informationen
              zusammenführen und daraus mit klaren Regeln verwertbare
              Analysen ableiten.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-white/10 bg-[#0b1020] p-7 shadow-xl shadow-black/20"
              >
                <div className="text-sm font-black text-blue-400">
                  {step.number}
                </div>
                <h3 className="mt-6 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Development */}
      <section id="entwicklung" className="border-y border-white/10 bg-[#080d1d]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
                Entwicklung
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Die ZEVYQ App kommt.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
                ZEVYQ befindet sich aktiv in der Entwicklung. Die technische
                Basis, echte KI-Tipps, Benutzerkonten und persönliche
                Auswertungen sind bereits aufgebaut. Jetzt folgen die nächsten
                Produktstufen.
              </p>

              <div className="mt-8 flex items-end justify-between">
                <div>
                  <div className="text-5xl font-black tracking-tight text-white">
                    75%
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-500">
                    aktueller Entwicklungsstand
                  </div>
                </div>
                <div className="text-sm font-bold text-blue-400">
                  Wir bauen weiter.
                </div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[75%] rounded-full bg-blue-600 shadow-lg shadow-blue-600/30" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0c1328] p-7 shadow-2xl shadow-black/20 sm:p-9">
              <div className="space-y-4">
                {progressItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#111a32] px-5 py-4"
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                        item.done
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-white/5 text-slate-600"
                      }`}
                    >
                      {item.done ? "✓" : "•"}
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        item.done ? "text-slate-200" : "text-slate-500"
                      }`}
                    >
                      {item.label}
                    </span>
                    {!item.done && (
                      <span className="ml-auto rounded-full bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                        In Arbeit
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#050816]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
          <div className="mx-auto inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-400">
            ZEVYQ wird aufgebaut
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
            Daten statt Bauchgefühl.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Die öffentliche Beta folgt. Bis dahin kannst du den aktuellen
            Entwicklungsstand von ZEVYQ verfolgen.
          </p>

          <div className="mt-9">
            <a
              href="#entwicklung"
              className="inline-flex rounded-2xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Entwicklungsstand ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#02040b]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="font-black tracking-tight text-white">ZEVYQ</div>
          <div>Sports Intelligence</div>
          <div>© {new Date().getFullYear()} ZEVYQ</div>
        </div>
      </footer>
    </main>
  );
}
