"use client";

import { useState } from "react";
import { authStorage, clearAuthSession } from "../../auth-storage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://zevyq-backend.fly.dev";

export default function LogoutButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    if (busy) return;
    setBusy(true);
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    try {
      const token = authStorage.getItem("zevyq_access_token");
      if (token) {
        const response = await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok && response.status !== 401) {
          throw new Error("Logout fehlgeschlagen");
        }
      }
      clearAuthSession();
      window.location.replace("/login");
    } catch {
      setError("Abmelden konnte nicht abgeschlossen werden. Bitte erneut versuchen.");
      setBusy(false);
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <div>
      <button type="button" onClick={() => void handleLogout()} disabled={busy}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-white/65 transition hover:bg-white/5 hover:text-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.7" className="h-5 w-5 shrink-0">
          <path d="M9 5H5v14h4M13 8l4 4-4 4M9 12h11"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {busy ? "Abmelden ..." : "Abmelden"}
      </button>
      {error && <p role="alert" className="mt-2 px-4 text-xs leading-5 text-red-300">{error}</p>}
    </div>
  );
}
