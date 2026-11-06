"use client";

import LogoutButton from "./LogoutButton";

import { authStorage } from "../../auth-storage";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type NavigationItem = {
  name: string;
  href: string;
};

const mainNavigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard" },
];

const premiumNavigation: NavigationItem[] = [
  { name: "KI-Tipps", href: "/tips" },
  { name: "Safe", href: "/safe" },
  { name: "Value", href: "/value" },
  { name: "Verdoppler", href: "/verdoppler" },
  { name: "Best Tip", href: "/best-tip" },
];

const accountNavigation: NavigationItem[] = [
  { name: "Tipp-Historie", href: "/history" },
  { name: "Statistik", href: "/statistics" },
  { name: "Bankroll · Demnächst", href: "/bankroll" },
];

const settingsNavigation: NavigationItem[] = [
  { name: "Profil", href: "/settings/profile" },
  { name: "Abo & Mitgliedschaft", href: "/settings" },
  { name: "Einstellungen", href: "/settings/app" },
  { name: "Über ZEVYQ", href: "/settings/about" },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let active = true;
    setIsPremium(false);

    async function loadMembership() {
      try {
        const token = authStorage.getItem("zevyq_access_token");
        const storedUser = authStorage.getItem("zevyq_user");

        if (!token || !storedUser) return;

        const user = JSON.parse(storedUser) as {
          user_id?: string;
        };

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

    if (open) void loadMembership();

    return () => {
      active = false;
    };
  }, [pathname, open]);

  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  const groups: {
    title: string | null;
    items: NavigationItem[];
  }[] = [
    {
      title: null,
      items: isPremium
        ? [...mainNavigation, ...premiumNavigation]
        : mainNavigation,
    },
    ...(isPremium
      ? [{ title: "Konto", items: accountNavigation }]
      : []),
    {
      title: "Einstellungen",
      items: settingsNavigation,
    },
  ];

  return (
    <>
      <button
        type="button"
        aria-label="Menü öffnen"
        aria-expanded={open}
        aria-controls="zevyq-mobile-navigation"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 md:hidden"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/75 md:hidden"
          />

          <aside
            id="zevyq-mobile-navigation"
            aria-label="Mobile Navigation"
            className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col border-r border-white/10 bg-[#080808] text-white shadow-2xl md:hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <div className="text-lg font-bold tracking-[0.2em]">
                  ZEVYQ
                </div>
                <div className="mt-1 text-[10px] tracking-wide text-white/40">
                  AI SPORTS INTELLIGENCE
                </div>
              </div>

              <button
                type="button"
                aria-label="Menü schließen"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-2xl text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav
              aria-label="ZEVYQ-Navigation"
              className="flex-1 space-y-7 overflow-y-auto px-4 py-6"
            >
              {groups.map((group, index) => (
                <div
                  key={group.title || "main"}
                  className={
                    index > 0
                      ? "border-t border-white/10 pt-6"
                      : ""
                  }
                >
                  {group.title && (
                    <div className="mb-3 px-4 text-xs uppercase tracking-[0.15em] text-white/30">
                      {group.title}
                    </div>
                  )}

                  <div className="space-y-2">
                    {group.items.map((item) => {
                      const active =
                        pathname === item.href ||
                        (item.href !== "/settings" &&
                          pathname.startsWith(item.href + "/"));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
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
                  </div>
                </div>
              ))}
            </nav>
            <div className="shrink-0 border-t border-white/10 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <LogoutButton />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
