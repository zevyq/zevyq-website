"use client";

import LogoutButton from "./LogoutButton";

import { authStorage } from "../../auth-storage";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "KI-Tipps", href: "/tips", premium: true },
  { name: "Safe", href: "/safe", premium: true },
  { name: "Value", href: "/value", premium: true },
  { name: "Verdoppler", href: "/verdoppler", premium: true },
  { name: "Best Tip", href: "/best-tip", premium: true },
];

const accountNavigation = [
  { name: "Tipp-Historie", href: "/history", premium: true },
  { name: "Statistik", href: "/statistics", premium: true },
  { name: "Bankroll · Demnächst", href: "/bankroll", premium: true },
];

const settingsNavigation = [
  { name: "Profil", href: "/settings/profile" },
  { name: "Abo & Mitgliedschaft", href: "/settings" },
  { name: "Einstellungen", href: "/settings/app" },
  { name: "Über ZEVYQ", href: "/settings/about" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    let active = true;
    setIsPremium(false);

    async function loadMembership() {
      try {
        const storedUser = authStorage.getItem("zevyq_user");
        const token = authStorage.getItem("zevyq_access_token");
        if (!storedUser || !token) return;

        const user = JSON.parse(storedUser) as { user_id?: string };
        if (!user.user_id) return;

        const response = await fetch(
          `${API_URL}/users/${encodeURIComponent(user.user_id)}`,
          {
            cache: "no-store",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) return;

        const data = await response.json();
        const plan = String(data?.user?.plan || "FREE").toUpperCase();

        if (active) {
          setIsPremium(plan === "PRO" || plan.includes("PREMIUM"));
        }
      } catch {
        if (active) setIsPremium(false);
      }
    }

    void loadMembership();

    return () => {
      active = false;
    };
  }, [pathname]);

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 px-5 py-8 md:sticky md:top-0 md:flex md:h-[calc(100dvh-89px)] md:flex-col md:self-start">
      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <nav className="space-y-2">
        {navigation.filter((item) => !item.premium || isPremium).map((item) => {
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

      {isPremium && (
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
      )}

      <div className="mt-8 border-t border-white/10 pt-6">
        <div className="px-4 text-xs uppercase tracking-[0.15em] text-white/30">
          Einstellungen
        </div>

        <nav className="mt-3 space-y-2">
          {settingsNavigation.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/settings" && pathname.startsWith(item.href + "/"));

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
      </div>
      <div className="shrink-0 border-t border-white/10 pt-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
