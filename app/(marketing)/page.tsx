export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-[#050505]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-bold tracking-[0.2em]">ZEVYQ</div>

          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#produkt" className="transition hover:text-white">
              Produkt
            </a>
            <a href="#vorteile" className="transition hover:text-white">
              Vorteile
            </a>
            <a href="#so-funktionierts" className="transition hover:text-white">
              So funktioniert&apos;s
            </a>
          </div>

          <button className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium transition hover:bg-white hover:text-black">
            Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.12),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 md:pb-32 md:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              ZEVYQ Intelligence
            </div>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Sportwetten.
              <br />
              <span className="text-white/50">Neu gedacht.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
              KI-gestützte Spielanalyse, strukturierte Tipp-Kategorien und
              transparente Statistiken – alles an einem Ort.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-white/85">
                ZEVYQ entdecken
              </button>

              <button className="rounded-full border border-white/20 px-8 py-4 font-semibold transition hover:bg-white/10">
                Mehr erfahren
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product */}
      <section id="produkt" className="border-t border-white/10 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              Das ZEVYQ System
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Analyse statt Bauchgefühl.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/55">
              ZEVYQ verbindet Daten, Modelle und strukturierte Analyse zu einem
              modernen System für Sportwetten.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Safe",
                text: "Konservativere Tipps für eine strukturierte Strategie.",
              },
              {
                title: "Value",
                text: "Fokus auf Quoten und modellbasierte Wahrscheinlichkeiten.",
              },
              {
                title: "Verdoppler",
                text: "Eine speziell entwickelte Kombination aus zwei Tipps.",
              },
              {
                title: "Best Tip",
                text: "Der Tipp, den das System für das jeweilige Angebot hervorhebt.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                <div className="mb-8 h-10 w-10 rounded-2xl border border-white/15 bg-white/5" />

                <h3 className="text-xl font-semibold">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-white/50">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="vorteile" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <div className="text-4xl font-bold">01</div>
              <h3 className="mt-6 text-xl font-semibold">
                Datenbasierte Analyse
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/50">
                Spiele werden anhand verschiedener Datenpunkte und
                mathematischer Modelle analysiert.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <div className="text-4xl font-bold">02</div>
              <h3 className="mt-6 text-xl font-semibold">
                Transparente Historie
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/50">
                Ergebnisse und Tipp-Historie sollen nachvollziehbar und
                transparent dargestellt werden.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <div className="text-4xl font-bold">03</div>
              <h3 className="mt-6 text-xl font-semibold">
                Alles in einer App
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/50">
                Tipps, Statistiken, persönliche Übersicht und später dein
                komplettes ZEVYQ-Konto an einem Ort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="so-funktionierts"
        className="border-t border-white/10 bg-[#080808]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              So funktioniert&apos;s
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Drei Schritte zu ZEVYQ
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Spiele analysieren", "ZEVYQ verarbeitet relevante Spieldaten."],
              ["02", "Modelle berechnen", "Wahrscheinlichkeiten und Werte werden ermittelt."],
              ["03", "Tipps darstellen", "Die Ergebnisse werden übersichtlich präsentiert."],
            ].map(([number, title, text]) => (
              <div key={number} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg font-bold">
                  {number}
                </div>

                <h3 className="mt-6 text-xl font-semibold">{title}</h3>

                <p className="mt-3 text-sm leading-6 text-white/50">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-16 text-center md:px-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              ZEVYQ
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold md:text-5xl">
              Die Zukunft unserer Sportwetten-Plattform beginnt hier.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-white/50">
              Wir bauen ZEVYQ Schritt für Schritt zu einer professionellen
              Plattform für datenbasierte Sportanalyse.
            </p>

            <button className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-white/85">
              Demnächst mehr erfahren
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <div className="font-semibold tracking-[0.2em] text-white">
            ZEVYQ
          </div>

          <div>© 2026 ZEVYQ. Alle Rechte vorbehalten.</div>
        </div>
      </footer>
    </main>
  );
}