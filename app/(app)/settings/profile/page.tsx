"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthUser = {
  user_id: string;
  email: string;
  display_name: string;
  plan: string;
  account_status: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [deletePhrase, setDeletePhrase] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const storedUser = localStorage.getItem("zevyq_user");
    if (!storedUser) return;

    try {
      setUser(JSON.parse(storedUser) as AuthUser);
    } catch {
      localStorage.removeItem("zevyq_user");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("zevyq_user");
    localStorage.removeItem("zevyq_access_token");
    sessionStorage.removeItem("zevyq_user");
    router.replace("/login");
  }

  async function handleDeleteAccount() {
    if (!user?.user_id || deletePhrase !== "LÖSCHEN" || deleting) return;

    const token = localStorage.getItem("zevyq_access_token");
    if (!token) {
      setDeleteError("Deine Sitzung ist nicht gültig. Bitte melde dich erneut an.");
      return;
    }

    setDeleting(true);
    setDeleteError("");

    try {
      const response = await fetch(
        `${API_URL}/users/${encodeURIComponent(user.user_id)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success !== true) {
        setDeleteError(
          typeof result?.detail === "string"
            ? result.detail
            : "Das Konto konnte nicht gelöscht werden. Bitte versuche es erneut.",
        );
        return;
      }

      localStorage.removeItem("zevyq_user");
      localStorage.removeItem("zevyq_access_token");
      sessionStorage.removeItem("zevyq_user");
      router.replace("/login");
    } catch {
      setDeleteError("Der Server ist nicht erreichbar. Deine Sitzung bleibt bestehen.");
    } finally {
      setDeleting(false);
    }
  }

  const name = user?.display_name || "Nutzer";
  const email = user?.email || "Nicht verfügbar";
  const plan = user?.plan || "Unbekannt";
  const status = user?.account_status || "Unbekannt";
  const isPro = plan.toLowerCase().includes("pro");
  const initial = name.trim().charAt(0).toUpperCase() || "Z";

  return (
    <main className="min-h-full px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-white/40">
            <span>Einstellungen</span>
            <span className="text-white/20">/</span>
            <span className="text-blue-300/80">Mein Profil</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dein Profil<span className="text-blue-400">.</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
            Dein persönlicher Bereich bei ZEVYQ. Verwalte dein Konto und deine Mitgliedschaft.
          </p>
        </header>

        <section className="relative mb-6 overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-[#102440] via-[#0D1726] to-[#09090b] p-6 shadow-[0_0_45px_rgba(59,130,246,0.08)] sm:p-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 left-1/3 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-300/30 bg-gradient-to-br from-blue-500/30 to-blue-500/10 text-2xl font-bold text-white shadow-[0_0_28px_rgba(59,130,246,0.15)] sm:h-20 sm:w-20 sm:text-3xl">
                {initial}
              </div>
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                    ZEVYQ ACCOUNT
                  </span>
                  {isPro && (
                    <span className="rounded-full border border-blue-300/30 bg-blue-400/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-blue-200">
                      PREMIUM MEMBER
                    </span>
                  )}
                </div>
                <h2 className="truncate text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {name}
                </h2>
                <p className="mt-1 break-all text-sm text-white/50">{email}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-white/10 bg-black/20 px-3.5 py-2 sm:self-center">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.65)]" />
              <span className="text-xs font-medium text-white/70">{status}</span>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-3xl border border-white/[0.09] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-300" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c.5-4 3-6 7-6s6.5 2 7 6" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-white">Persönliche Daten</h2>
                <p className="mt-0.5 text-xs text-white/40">Deine Kontoinformationen</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-white/40">Name</p>
                <p className="mt-2 break-words text-sm font-medium text-white">{user?.display_name || "Nicht verfügbar"}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-white/40">E-Mail-Adresse</p>
                <p className="mt-2 break-all text-sm font-medium text-white">{email}</p>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-[#102440] via-[#0D1726] to-[#090F1A] p-6 sm:p-7">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl" />

            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-400/10">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-200" stroke="currentColor" strokeWidth="1.7">
                    <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-white">Mitgliedschaft</h2>
                  <p className="mt-0.5 text-xs text-white/45">Dein aktueller Tarif</p>
                </div>
              </div>
              {isPro && (
                <span className="rounded-lg border border-blue-300/30 bg-blue-400/10 px-2.5 py-1 text-xs font-bold tracking-widest text-blue-200">
                  PRO
                </span>
              )}
            </div>

            <div className="relative mt-7 rounded-2xl border border-blue-300/15 bg-black/20 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-200/60">DEIN TARIF</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white">{plan}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Status: <span className="font-medium text-white/85">{status}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/settings")}
              className="relative mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-300/25 bg-blue-400/10 px-4 py-3 text-sm font-semibold text-blue-100 transition hover:border-blue-300/45 hover:bg-blue-400/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              Abo & Mitgliedschaft öffnen
              <span aria-hidden="true">→</span>
            </button>
          </section>
        </div>

        <section className="mt-6 rounded-3xl border border-white/[0.09] bg-white/[0.02] p-6 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white/65" stroke="currentColor" strokeWidth="1.7">
                  <rect x="4" y="7" width="16" height="13" rx="2" />
                  <path d="M8 7V5a4 4 0 0 1 8 0v2M12 12v3" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-white">Sitzung & Sicherheit</h2>
                <p className="mt-1 max-w-lg text-sm leading-6 text-white/45">
                  Beende deine Sitzung auf diesem Gerät, wenn du ZEVYQ nicht weiter nutzen möchtest.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            >
              Abmelden
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-red-400/15 bg-gradient-to-r from-red-500/[0.045] to-transparent p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/15 bg-red-500/[0.06]">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-red-300/80" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-red-200">Konto löschen</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Dein Konto und die zugehörigen gespeicherten Kontodaten werden dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.
              </p>
              <p className="mt-2 text-sm leading-6 text-amber-200/80">
                Wichtig: Ein über Apple oder Google abgeschlossenes Abonnement wird dadurch nicht automatisch gekündigt. Kündige es gegebenenfalls separat im jeweiligen Store.
              </p>

              {!deleteConfirmOpen ? (
                <button
                  type="button"
                  onClick={() => {
                    setDeleteError("");
                    setDeletePhrase("");
                    setDeleteConfirmOpen(true);
                  }}
                  className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-200 transition hover:bg-red-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                >
                  Konto löschen …
                </button>
              ) : (
                <div className="mt-5 space-y-3">
                  <label htmlFor="delete-account-confirm" className="block text-sm text-white/80">
                    Gib zur Bestätigung <strong>LÖSCHEN</strong> ein.
                  </label>
                  <input
                    id="delete-account-confirm"
                    type="text"
                    value={deletePhrase}
                    onChange={(event) => setDeletePhrase(event.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                    className="w-full max-w-sm rounded-xl border border-red-400/25 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/60"
                    placeholder="LÖSCHEN"
                  />

                  {deleteError && (
                    <p role="alert" className="text-sm text-red-300">
                      {deleteError}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      disabled={deleting || deletePhrase !== "LÖSCHEN"}
                      className="rounded-xl border border-red-400/30 bg-red-500/15 px-4 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-500/25 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {deleting ? "Konto wird gelöscht …" : "Endgültig löschen"}
                    </button>
                    <button
                      type="button"
                      disabled={deleting}
                      onClick={() => {
                        setDeleteConfirmOpen(false);
                        setDeletePhrase("");
                        setDeleteError("");
                      }}
                      className="rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/75 transition hover:bg-white/[0.06] disabled:opacity-40"
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <footer className="pb-4 pt-8 text-center text-xs tracking-wide text-white/25">
          ZEVYQ · DEIN SPORTANALYSE-KONTO
        </footer>
      </div>
    </main>
  );
}
