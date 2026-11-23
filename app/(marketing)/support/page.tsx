import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hilfe & Support | ZEVYQ",
  description:
    "Offizieller ZEVYQ-Support für Benutzerkonten, KI-Analysen und PREMIUM-Abonnements.",
};

const questions = [
  {
    question: "Wie registriere ich mich?",
    answer:
      "Erstelle ein kostenloses Benutzerkonto in der ZEVYQ-App und bestätige deine E-Mail-Adresse. Anschließend kannst du dich anmelden.",
  },
  {
    question: "Warum sehe ich heute keine KI-Tipps?",
    answer:
      "ZEVYQ veröffentlicht ausschließlich qualifizierte Empfehlungen. Wenn die Qualitätsanforderungen nicht erfüllt werden, können an einzelnen Tagen weniger oder keine Tipps verfügbar sein.",
  },
  {
    question: "Was beinhaltet PREMIUM?",
    answer:
      "PREMIUM bietet zusätzliche Tipp-Kategorien, detaillierte Analysen, die Tipp-Historie und persönliche Performance-Auswertungen. Die aktuellen Abonnements und Preise findest du in der App.",
  },
  {
    question: "Wie verwalte oder kündige ich mein Apple-Abonnement?",
    answer:
      "Öffne die iPhone-Einstellungen, tippe auf deinen Namen und dann auf Abonnements. Wähle dein ZEVYQ-Abonnement aus, um es zu verwalten oder zu kündigen.",
  },
  {
    question: "Bleibt PREMIUM nach der Kündigung aktiv?",
    answer:
      "Bei einer regulären Kündigung bleibt der bereits bezahlte Zugang grundsätzlich bis zum Ende des laufenden Abrechnungszeitraums bestehen.",
  },
  {
    question: "Mein PREMIUM-Zugang funktioniert nicht. Was kann ich tun?",
    answer:
      "Prüfe, ob du mit dem ursprünglichen ZEVYQ-Konto angemeldet bist. Falls der Zugang weiterhin fehlt, kontaktiere unseren Support.",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <header className="border-b border-white/10 bg-[#050816]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="/" className="text-xl font-black tracking-tight">
            ZEVYQ
            <span className="block text-[9px] tracking-[0.28em] text-slate-500">
              SPORTS INTELLIGENCE
            </span>
          </a>
          <a href="/" className="text-sm text-slate-300 hover:text-white">
            Zur Startseite
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
            ZEVYQ SUPPORT
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Hilfe &amp; Support
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
            Fragen zu deinem Konto, den KI-Analysen oder deinem
            PREMIUM-Abonnement? Hier findest du Unterstützung.
          </p>
        </div>

        <section className="rounded-3xl border border-violet-500/30 bg-[#13172b] p-7 sm:p-9">
          <h2 className="text-2xl font-bold">
            Kontaktiere unseren Support
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Bei technischen Problemen oder Fragen zu ZEVYQ erreichst
            du uns direkt per E-Mail.
          </p>
          <a
            href="mailto:support@zevyq.de"
            className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
          >
            support@zevyq.de
          </a>
          <p className="mt-4 text-xs text-slate-400">
            Bitte sende uns keine Passwörter oder Zahlungsdaten.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-black">Häufige Fragen</h2>
          <div className="mt-7 space-y-4">
            {questions.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-white/10 bg-[#101421] p-6"
              >
                <h3 className="text-base font-bold">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-[#101421] p-6">
          <h2 className="text-xl font-bold">Weitere Informationen</h2>
          <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-violet-300">
            <a href="/datenschutz" className="hover:text-white">
              Datenschutz
            </a>
            <a href="/impressum" className="hover:text-white">
              Impressum
            </a>
            <a href="/zahlungsbedingungen" className="hover:text-white">
              Abo- und Zahlungsbedingungen
            </a>
          </nav>
        </section>

        <p className="mt-10 text-sm leading-7 text-slate-500">
          ZEVYQ stellt datenbasierte Sportwettenanalysen bereit.
          Modellwahrscheinlichkeiten sind Schätzungen und keine
          Gewinnversprechen. Sportwetten bergen finanzielle Risiken.
          Nur für Volljährige.
        </p>
      </main>

      <footer className="border-t border-white/10 bg-[#02040b]">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-400 lg:px-8">
          <div className="mb-4 font-black text-white">ZEVYQ</div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            <a href="/" className="hover:text-white">Startseite</a>
            <a href="/impressum" className="hover:text-white">Impressum</a>
            <a href="/datenschutz" className="hover:text-white">Datenschutz</a>
            <a href="/agb" className="hover:text-white">AGB</a>
          </nav>
          <p className="mt-6 text-xs text-slate-600">
            © {new Date().getFullYear()} ZEVYQ
          </p>
        </div>
      </footer>
    </div>
  );
}