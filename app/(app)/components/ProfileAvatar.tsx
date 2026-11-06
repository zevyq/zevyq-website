"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { authStorage } from "../../auth-storage";

export function getProfileInitials(name: unknown): string {
  if (typeof name !== "string") return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  const first = Array.from(parts[0])[0] || "";
  const last = parts.length > 1
    ? Array.from(parts[parts.length - 1])[0] || ""
    : "";
  return Array.from((first + last).toLocaleUpperCase("de-DE")).slice(0, 2).join("");
}

export default function ProfileAvatar() {
  const pathname = usePathname();
  const [initials, setInitials] = useState("");

  useEffect(() => {
    function refresh() {
      try {
        const raw = authStorage.getItem("zevyq_user");
        const user = raw ? JSON.parse(raw) : null;
        setInitials(getProfileInitials(user?.display_name));
      } catch {
        setInitials("");
      }
    }
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [pathname]);

  return (
    <Link href="/settings/profile" aria-label={"Mein Profil \u00f6ffnen"} title="Mein Profil"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40">
      {initials || (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 21v-2a7 7 0 0 1 14 0v2" strokeLinecap="round" />
        </svg>
      )}
    </Link>
  );
}
