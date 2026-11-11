"use client";

import { usePathname } from "next/navigation";
import PremiumGate from "./PremiumGate";
import { useEffect, type ReactNode } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://zevyq-backend.fly.dev";
const premiumRoutes = [
  "/tips",
  "/safe",
  "/value",
  "/verdoppler",
  "/best-tip",
  "/history",
  "/statistics",
  "/bankroll",
];

export default function PremiumRouteGuard({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  useEffect(() => {
    let lastAttemptAt = 0;
    let lastSuccessAt = 0;
    let lastToken = "";
    let stopped = false;

    function renewRememberedSession() {
      if (stopped || document.visibilityState !== "visible") return;

      try {
        const token = window.localStorage.getItem("zevyq_access_token");
        if (!token) return;

        const now = Date.now();

        if (token !== lastToken) {
          lastToken = token;
          lastAttemptAt = 0;
          lastSuccessAt = 0;
        }

        if (now - lastAttemptAt < 5 * 60 * 1000) return;
        if (now - lastSuccessAt < 12 * 60 * 60 * 1000) return;

        lastAttemptAt = now;

        void fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
          if (!stopped && response.ok) lastSuccessAt = Date.now();
        }).catch(() => {
          // Verbindungsfehler beenden keine Anmeldung.
        });
      } catch {
        // Speicherfehler blockieren die App nicht.
      }
    }

    renewRememberedSession();

    document.addEventListener("visibilitychange", renewRememberedSession);
    const interval = window.setInterval(renewRememberedSession, 60 * 60 * 1000);

    return () => {
      stopped = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", renewRememberedSession);
    };
  }, []);

  const requiresPremium = premiumRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!requiresPremium) {
    return <>{children}</>;
  }

  return <PremiumGate>{children}</PremiumGate>;
}
