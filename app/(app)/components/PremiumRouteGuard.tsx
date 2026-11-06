"use client";

import { usePathname } from "next/navigation";
import PremiumGate from "./PremiumGate";
import type { ReactNode } from "react";

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

  const requiresPremium = premiumRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!requiresPremium) {
    return <>{children}</>;
  }

  return <PremiumGate>{children}</PremiumGate>;
}
