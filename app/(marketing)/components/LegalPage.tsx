import type { ReactNode } from "react";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/zahlungsbedingungen", label: "Abo & Zahlungsbedingungen" },
  { href: "/widerruf", label: "Widerruf" },
  { href: "/vertrag", label: "Verträge hier kündigen" },
  { href: "/vertrag?art=widerruf", label: "Vertrag widerrufen" },
];

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <header className="border-b border-white/10 bg-[#050816]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="ZEVYQ Startseite">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-black text-[#050816]">
              Z
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight">ZEVYQ</span>
              <span className="block text-[9px] font-semibold tracking-[0.28em] text-slate-500">
                SPORTS INTELLIGENCE
              </span>
            </span>
          </a>
          <a
            href="/"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Zur Startseite
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 py-14 sm:py-20">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
          ZEVYQ · Rechtliche Informationen
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-xs text-slate-500">
          Stand: 4. November 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-slate-300 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-white [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-blue-300">
          {children}
        </div>
      </main>

      <footer className="border-t border-white/10 bg-[#02040b]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 lg:px-8">
          <div className="font-black tracking-tight text-white">ZEVYQ</div>
          <nav
            aria-label="Rechtliche Informationen"
            className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400"
          >
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} ZEVYQ · Sports Intelligence
          </p>
        </div>
      </footer>
    </div>
  );
}