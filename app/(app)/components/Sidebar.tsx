"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "KI-Tipps", href: "/tips" },
  { name: "Safe", href: "/safe" },
  { name: "Value", href: "/value" },
  { name: "Verdoppler", href: "/verdoppler" },
  { name: "Best Tip", href: "/best-tip" },
];

const accountNavigation = [
  { name: "Tipp-Historie", href: "/history" },
  { name: "Statistik", href: "/statistics" },
  { name: "Bankroll", href: "/bankroll" },
  { name: "Abo & Einstellungen", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 px-5 py-8 md:block">
      <nav className="space-y-2">
        {navigation.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-12 border-t border-white/10 pt-6">
        <div className="px-4 text-xs uppercase tracking-[0.15em] text-white/30">
          Konto
        </div>

        <nav className="mt-3 space-y-2">
          {accountNavigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-4 py-3 text-sm transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}