import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZEVYQ - KI-Sportwetten & Fu\u00dfballtipps | Kostenlos starten",
  description:
    "Entdecke KI-gest\u00fctzte Fu\u00dfballtipps, nachvollziehbare Analysen und qualit\u00e4tsgepr\u00fcfte Prognosen. Jetzt kostenlos bei ZEVYQ registrieren.",
  alternates: {
    canonical: "https://www.zevyq.de/",
  },
  openGraph: {
    title: "ZEVYQ - KI-Sportwetten & Fu\u00dfballtipps",
    description:
      "Datenbasierte Fu\u00dfballanalysen, gepr\u00fcfte KI-Tipps und transparente Ergebnisse.",
    url: "https://www.zevyq.de/",
    siteName: "ZEVYQ",
    locale: "de_DE",
    type: "website",
  },
};

const categories = [
  {
    name: "SAFE",
    subtitle: "Konservative Auswahl",
    description: "Qualifizierte Prognosen mit Fokus auf hohe Modellwahrscheinlichkeit.",
    accent: "text-[#159A62]",
    border: "border-[#159A62]/30",
    background: "bg-[#159A62]/10",
  },
  {
    name: "VALUE",
    subtitle: "Marktchancen erkennen",
    description: "Modellwahrscheinlichkeiten und angebotene Quoten systematisch vergleichen.",
    accent: "text-[#2774D8]",
    border: "border-[#2774D8]/30",
    background: "bg-[#2774D8]/10",
  },
  {
    name: "VERDOPPLER",
    subtitle: "Zwei Tipps kombiniert",
    description: "Zwei geprüfte Einzelprognosen in einer Kombiwette.",
    accent: "text-[#E27B19]",
    border: "border-[#E27B19]/30",
    background: "bg-[#E27B19]/10",
  },
  {
    name: "BEST TIP",
    subtitle: "Unsere Top-Auswahl",
    description: "Die stärkste qualifizierte Tagesauswahl nach definierten Regeln.",
    accent: "text-[#6652D9]",
    border: "border-[#6652D9]/30",
    background: "bg-[#6652D9]/10",
  },
];

const benefits = [
  {
    number: "01",
    title: "Daten statt Bauchgefühl",
    description: "Spiel-, Team-, Quoten- und historische Daten bilden die Grundlage unserer Analysen.",
  },
  {
    number: "02",
    title: "Qualität vor Quantität",
    description: "Nicht jedes Spiel braucht einen Tipp. Unsere Filter können Kandidaten bewusst ausschließen.",
  },
  {
    number: "03",
    title: "Nachvollziehbare Auswahl",
    description: "Modellwahrscheinlichkeiten, Quoten und weitere Bewertungsgrößen werden transparent dargestellt.",
  },
  {
    number: "04",
    title: "Deine Performance im Blick",
    description: "Gespeicherte Einsätze, persönliche Statistiken und Tipp-Historie an einem Ort.",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function PrimaryLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/login?mode=register"
      className={`inline-flex min-h-13 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 px-7 py-3.5 text-center text-sm font-bold text-white shadow-[0_12px_48px_rgba(124,58,237,0.3)] transition duration-200 hover:-translate-y-0.5 hover:from-violet-500 hover:to-purple-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 ${className}`}
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

export default function LandingPreviewV2Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07070e] text-white antialiased">
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:radial-gradient(#ffffff_0.7px,transparent_0.7px)] [background-size:24px_24px]" />

      <header className="relative z-30 border-b border-white/[0.07] bg-[#090911]/90 backdrop-blur-2xl">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="ZEVYQ Startseite">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-500/15 text-xl font-black text-violet-200">
              Z
            </span>
            <span className="flex flex-col">
              <span className="text-xl font-black tracking-[0.17em]">ZEVYQ</span>
              <span className="text-[9px] font-semibold tracking-[0.22em] text-violet-300/70">
                AI SPORTS INTELLIGENCE
              </span>
            </span>
          </a>

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 text-sm text-white/60 lg:flex">
            <a className="transition hover:text-white" href="#produkt">Produkt</a>
            <a className="transition hover:text-white" href="#performance">Ergebnisse</a>
            <a className="transition hover:text-white" href="#vorteile">Vorteile</a>
            <a className="transition hover:text-white" href="#mitgliedschaft">Mitgliedschaft</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-xl px-3 py-3 text-xs font-semibold text-white/70 transition hover:text-white sm:text-sm"
            >
              Anmelden
            </Link>
            <Link
              href="/login?mode=register"
              className="rounded-xl border border-violet-400/40 bg-violet-500/15 px-3 py-3 text-center text-xs font-bold text-violet-100 transition hover:bg-violet-500/25 sm:px-5 sm:text-sm"
            >
              Kostenlos starten
            </Link>
          </div>
        </div>
      </header>

      <section id="top" className="relative isolate">
        <div className="pointer-events-none absolute -top-44 right-[-20%] size-[650px] rounded-full bg-violet-700/25 blur-[150px]" />
        <div className="pointer-events-none absolute left-[-20%] top-44 size-[550px] rounded-full bg-indigo-600/15 blur-[150px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 pt-20 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:pb-32 lg:pt-28">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/[0.08] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-200">
              <span className="size-2 rounded-full bg-violet-400 shadow-[0_0_12px_#a78bfa]" />
              KI-gestützte Fußballanalysen
            </div>

            <h1 className="max-w-2xl text-[clamp(3.1rem,6vw,5.8rem)] font-black leading-[1.02] tracking-[-0.075em]">
              Jeder Tipp
              <br />
              beginnt mit
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-300 bg-clip-text text-transparent">
                einer Analyse.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
              Weniger raten. Mehr verstehen. ZEVYQ analysiert Fußballspiele,
              vergleicht Quoten und veröffentlicht nur Tipps, die definierte
              Qualitätsprüfungen bestehen.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <PrimaryLink className="w-full sm:w-auto">
                Jetzt kostenlos starten
              </PrimaryLink>
              <a
                href="#produkt"
                className="inline-flex min-h-13 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/80 transition hover:border-violet-300/40 hover:bg-white/[0.08] sm:w-auto"
              >
                ZEVYQ entdecken
              </a>
            </div>

            <div className="mt-5 text-sm text-white/45">
              Kostenlos registrieren. Keine Zahlungsdaten erforderlich.
            </div>

            <div className="mt-11 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-7 text-xs font-medium text-white/55">
              <span className="flex items-center gap-2"><CheckIcon /> Datenbasiert</span>
              <span className="flex items-center gap-2"><CheckIcon /> Qualitätsgeprüft</span>
              <span className="flex items-center gap-2"><CheckIcon /> Transparent</span>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-violet-600/20 blur-[70px]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-violet-300/20 bg-[#12101c] p-2 shadow-[0_32px_100px_rgba(0,0,0,0.65)] sm:p-3">
              <div className="flex items-center justify-between px-4 pb-3 pt-2">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/10" />
                  <span className="size-2.5 rounded-full bg-violet-400/50" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                  ZEVYQ Platform
                </span>
              </div>
              <Image
                src="/images/zevyq-ki-tipps-echt.webp"
                alt="Echte ZEVYQ-Web-App mit KI-Tipps und Quoten"
                width={1200}
                height={900}
                priority
                className="h-auto w-full rounded-[1.3rem]"
              />
            </div>
            <div className="relative mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-[#171224] px-4 py-2 text-xs font-semibold text-violet-200 shadow-xl">
              <span className="size-2 rounded-full bg-violet-400" />
              Deine Analyseplattform für Fußballtipps
            </div>
          </div>
        </div>
      </section>

      <section id="performance" className="relative border-y border-white/[0.07] bg-[#0c0b15]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
              Echte Ergebnisse. Keine Gewinnversprechen.
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Ergebnisse, die für sich sprechen.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60">
              So haben unsere veröffentlichten BEST TIPs im Oktober 2026
              abgeschnitten. Alle Zahlen stammen aus dem produktiven
              ZEVYQ-Track-Record.
            </p>
            <p className="mt-5 text-sm leading-7 text-white/40">
              Ausschließlich Kategorie BEST TIP, 01.–31.10.2026.
              Andere Tipp-Kategorien sind nicht berücksichtigt.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-violet-400/25 bg-gradient-to-br from-[#241638] via-[#181325] to-[#100e19] p-7 shadow-[0_24px_80px_rgba(109,40,217,0.14)] sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-bold tracking-wide text-white">
                BEST TIP · Oktober 2026
              </span>
              <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-200">
                13 veröffentlichte Tipps
              </span>
            </div>

            <div className="mt-9">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200/70">
                Trefferquote
              </p>
              <div className="mt-2 bg-gradient-to-r from-white via-violet-100 to-violet-300 bg-clip-text text-[clamp(3.7rem,8vw,6rem)] font-black leading-none tracking-[-0.08em] text-transparent">
                92,31 %
              </div>
            </div>

            <div className="mt-8 flex h-2.5 overflow-hidden rounded-full bg-white/10" aria-label="12 gewonnene und 1 verlorener Tipp">
              <div className="h-full bg-emerald-400" style={{ width: "92.3077%" }} />
              <div className="h-full flex-1 bg-rose-400" />
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <p className="text-xs text-white/50">Gewonnen</p>
                <p className="mt-2 text-2xl font-black text-emerald-300">12 / 13</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <p className="text-xs text-white/50">Verloren</p>
                <p className="mt-2 text-2xl font-black text-white">1</p>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:col-span-1">
                <p className="text-xs text-white/50">ROI · Flat Stake</p>
                <p className="mt-2 text-2xl font-black text-emerald-300">+44,46 %</p>
              </div>
            </div>

            <p className="mt-7 text-xs leading-6 text-white/40">
              ROI auf Basis eines gleich hohen Einsatzes je Tipp.
              Die geringe Stichprobe erlaubt keine Aussage über zukünftige
              Trefferquoten oder Gewinne. Sportwetten können zum vollständigen
              Verlust des Einsatzes führen.
            </p>
          </div>
        </div>
      </section>

      <section id="produkt" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
            Das ZEVYQ System
          </p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
            Vier Kategorien.
            <br />
            <span className="text-white/45">Ein Qualitätsanspruch.</span>
          </h2>
          <p className="mt-6 text-base leading-8 text-white/55">
            Unsere KI ordnet qualifizierte Prognosen in vier verständliche
            Kategorien ein. Es werden keine Tipps erzeugt, nur um
            freie Plätze zu füllen.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.name}
              className={`group rounded-[1.75rem] border ${category.border} bg-[#11101b] p-7 transition duration-300 hover:-translate-y-1 hover:bg-[#191529]`}
            >
              <div className={`inline-flex rounded-xl px-3 py-2 text-[11px] font-black tracking-[0.16em] ${category.accent} ${category.background}`}>
                {category.name}
              </div>
              <h3 className="mt-8 text-xl font-bold">{category.subtitle}</h3>
              <p className="mt-3 text-sm leading-7 text-white/50">
                {category.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-violet-400/15 bg-violet-500/[0.06] px-6 py-5">
          <p className="text-sm text-violet-100">
            Ein kostenloser Tages-Tipp. Mehr Möglichkeiten mit PREMIUM.
          </p>
          <Link href="/login?mode=register" className="inline-flex items-center gap-2 text-sm font-bold text-violet-200 hover:text-white">
            Kostenlos entdecken <ArrowIcon />
          </Link>
        </div>
      </section>

      <section id="vorteile" className="border-y border-white/[0.07] bg-[#0c0b14]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                Warum ZEVYQ?
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                Nicht jedes Spiel braucht einen Tipp.
              </h2>
              <p className="mt-6 text-base leading-8 text-white/55">
                Der entscheidende Unterschied liegt nicht darin,
                möglichst viele Prognosen zu veröffentlichen,
                sondern die Auswahl systematisch zu prüfen.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <article
                  key={benefit.number}
                  className="rounded-[1.6rem] border border-white/[0.08] bg-white/[0.025] p-7"
                >
                  <span className="text-xs font-bold tracking-widest text-violet-300">
                    {benefit.number}
                  </span>
                  <h3 className="mt-6 text-lg font-bold">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/50">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
        <div className="relative">
          <div className="pointer-events-none absolute -inset-5 rounded-[3rem] bg-purple-700/15 blur-[55px]" />
          <div className="relative rounded-[2rem] border border-violet-300/15 bg-[#12101c] p-3 shadow-2xl">
            <Image
              src="/images/zevyq-tipp-historie-echt.webp"
              alt="Echte ZEVYQ-Tipp-Historie mit Ergebnissen"
              width={1200}
              height={900}
              className="h-auto w-full rounded-[1.4rem]"
            />
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
            Einblick in ZEVYQ
          </p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
            Mehr als eine bloße Wettempfehlung.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/55">
            ZEVYQ verbindet KI-Auswahl, Quotenbewertung, Modellwahrscheinlichkeiten
            und persönliche Auswertungen zu einer übersichtlichen Plattform.
          </p>
          <div className="mt-8 space-y-4 text-sm text-white/70">
            <p className="flex items-start gap-3"><span className="text-violet-300"><CheckIcon /></span> Qualifizierte Tipps mit nachvollziehbaren Daten</p>
            <p className="flex items-start gap-3"><span className="text-violet-300"><CheckIcon /></span> Persönliche Einsätze und Statistiken</p>
            <p className="flex items-start gap-3"><span className="text-violet-300"><CheckIcon /></span> Vier unterschiedliche Tipp-Kategorien</p>
          </div>
        </div>
      </section>

      <section id="mitgliedschaft" className="border-y border-white/[0.07] bg-[#0b0a13]">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
              Deine Mitgliedschaft
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Kostenlos starten.
              <br />
              Mehr entdecken.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/55">
              Entscheide selbst, wie intensiv du ZEVYQ nutzen möchtest.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-[2rem] border border-white/10 bg-[#12111b] p-8 sm:p-10">
              <span className="text-sm font-bold uppercase tracking-widest text-white/55">FREE</span>
              <div className="mt-6 text-5xl font-black">0 €</div>
              <p className="mt-3 text-sm text-white/50">Dauerhaft kostenlos</p>
              <div className="my-8 h-px bg-white/10" />
              <div className="flex-1 space-y-5 text-sm text-white/75">
                <p className="flex gap-3"><CheckIcon /> Ein qualifizierter Tages-Tipp, wenn verfügbar</p>
                <p className="flex gap-3"><CheckIcon /> Persönlicher ZEVYQ-Zugang</p>
                <p className="flex gap-3"><CheckIcon /> Kostenloser Einstieg ohne Zahlungsdaten</p>
              </div>
              <Link
                href="/login?mode=register"
                className="mt-10 inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-bold transition hover:bg-white/10"
              >
                Kostenlos registrieren
              </Link>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-[2rem] border border-violet-400/40 bg-gradient-to-b from-[#241639] to-[#14101f] p-8 shadow-[0_20px_80px_rgba(109,40,217,0.16)] sm:p-10">
              <div className="absolute right-0 top-0 rounded-bl-2xl bg-violet-500 px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                VOLLER ZUGANG
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-violet-200">PREMIUM</span>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-black">14,99 €</span>
                <span className="text-sm text-white/50">/ Monat</span>
              </div>
              <p className="mt-3 text-sm text-white/50">Monatliches Abonnement</p>
              <div className="my-8 h-px bg-violet-300/20" />
              <div className="flex-1 space-y-5 text-sm text-white/85">
                <p className="flex gap-3"><span className="text-violet-300"><CheckIcon /></span> Zugang zu allen vier Tipp-Kategorien</p>
                <p className="flex gap-3"><span className="text-violet-300"><CheckIcon /></span> Erweiterte Tipp- und Quotendaten</p>
                <p className="flex gap-3"><span className="text-violet-300"><CheckIcon /></span> Tipp-Historie und Statistiken</p>
                <p className="flex gap-3"><span className="text-violet-300"><CheckIcon /></span> Persönliche Wettverwaltung</p>
              </div>
              <PrimaryLink className="mt-10 w-full">
                Premium entdecken
              </PrimaryLink>
              <p className="mt-4 text-center text-xs leading-5 text-white/45">
                Registrierung kostenlos. Ein kostenpflichtiges Abo wird
                erst durch eine gesonderte Buchung abgeschlossen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate px-5 py-24 text-center sm:px-8 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[130px]" />
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
            Bereit für deinen nächsten Schritt?
          </p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.055em] sm:text-6xl">
            Entdecke, was hinter einem guten Tipp steckt.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/60">
            Erstelle dein kostenloses Konto und lerne ZEVYQ kennen.
            Ohne Zahlungsdaten und ohne Gewinnversprechen.
          </p>
          <div className="mt-9">
            <PrimaryLink>Jetzt kostenlos registrieren</PrimaryLink>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.08] bg-[#06060b]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="text-lg font-black tracking-[0.18em]">ZEVYQ</div>
              <p className="mt-1 text-xs text-white/35">AI SPORTS INTELLIGENCE</p>
            </div>
            <p className="max-w-md text-xs leading-6 text-white/40">
              Sportwetten sind mit finanziellen Risiken verbunden und können
              zum Verlust des Einsatzes führen. Nur für Volljährige.
            </p>
          </div>
          <nav aria-label="Fußballwissen und KI-Analysen" className="mt-9 border-t border-white/10 pt-7">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">Fußballwissen &amp; KI-Analysen</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">Erfahre mehr über Daten, Quoten und die Analyse von Fußballspielen.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/sportwetten" className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.08]">
                <span className="block text-sm font-bold text-white/80 transition-colors group-hover:text-violet-200">Sportwetten</span>
                <span className="mt-1.5 block text-xs leading-5 text-white/45">Grundlagen, Quoten und Qualitätsregeln</span>
              </Link>
              <Link href="/fussballtipps" className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.08]">
                <span className="block text-sm font-bold text-white/80 transition-colors group-hover:text-violet-200">Fußballtipps</span>
                <span className="mt-1.5 block text-xs leading-5 text-white/45">Datenbasierte Prognosen verstehen</span>
              </Link>
              <Link href="/ki-sportwetten" className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.08]">
                <span className="block text-sm font-bold text-white/80 transition-colors group-hover:text-violet-200">KI Sportwetten</span>
                <span className="mt-1.5 block text-xs leading-5 text-white/45">KI, Wahrscheinlichkeiten und Wettmärkte</span>
              </Link>
              <Link href="/ki-fussballtipps" className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.08]">
                <span className="block text-sm font-bold text-white/80 transition-colors group-hover:text-violet-200">KI Fußballtipps</span>
                <span className="mt-1.5 block text-xs leading-5 text-white/45">Daten statt Bauchgefühl</span>
              </Link>
              <Link href="/sportwetten-analyse" className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.08]">
                <span className="block text-sm font-bold text-white/80 transition-colors group-hover:text-violet-200">Sportwetten Analyse</span>
                <span className="mt-1.5 block text-xs leading-5 text-white/45">Quoten und Value einordnen</span>
              </Link>
              <Link href="/fussball-analyse" className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.08]">
                <span className="block text-sm font-bold text-white/80 transition-colors group-hover:text-violet-200">Fußball Analyse</span>
                <span className="mt-1.5 block text-xs leading-5 text-white/45">Spieldaten fundiert analysieren</span>
              </Link>
            </div>
          </nav>
          <nav
            aria-label="Rechtliche Informationen"
            className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-7 text-xs text-white/50"
          >
            <Link href="/impressum" className="hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
            <Link href="/agb" className="hover:text-white">AGB</Link>
            <Link href="/zahlungsbedingungen" className="hover:text-white">Abo &amp; Zahlungsbedingungen</Link>
            <Link href="/widerruf" className="hover:text-white">Widerruf</Link>
            <Link href="/vertrag" className="hover:text-white">Verträge hier kündigen</Link>
            <Link href="/vertrag?art=widerruf" className="hover:text-white">Vertrag widerrufen</Link>
          </nav>
          <p className="mt-7 text-xs text-white/25">
            © {new Date().getFullYear()} ZEVYQ. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </main>
  );
}