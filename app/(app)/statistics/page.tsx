"use client";

import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type AuthUser = {
  user_id: string;
  email: string;
  display_name: string;
  plan: string;
  account_status: string;
};

type BankrollSummary = {
  user_id: string;
  bets: number;
  total_stake: number;
  profit_loss: number;
  hit_rate: number | null;
  roi: number | null;
  won: number;
  lost: number;
  void: number;
  open: number;
};

function formatEuro(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)} €`;
}

function formatPercent(value: number | null) {
  if (value === null) {
    return "–";
  }

  return `${value.toFixed(1)}%`;
}

export default function StatisticsPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [stats, setStats] = useState<BankrollSummary | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStatistics() {
    setLoading(true);
    setError("");

    try {
      const storedUser = localStorage.getItem("zevyq_user");

      if (!storedUser) {
        throw new Error(
          "Kein ZEVYQ-Account gefunden. Bitte zuerst anmelden.",
        );
      }

      const parsedUser = JSON.parse(storedUser) as AuthUser;

      setUser(parsedUser);

      const response = await fetch(
        `${API_URL}/users/${parsedUser.user_id}/bankroll`,
        {
          cache: "no-store",
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            "Die persönlichen Statistikdaten konnten nicht geladen werden.",
        );
      }

      setStats(data?.bankroll || null);
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          "Das ZEVYQ-Backend ist aktuell nicht erreichbar.",
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Die Statistik konnte nicht geladen werden.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStatistics();
  }, []);

  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            ZEVYQ Intelligence
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Statistik
          </h1>

          <p className="mt-3 text-white/45">
            Deine persönliche Performance auf Basis deiner erfassten Tipps.
          </p>
        </div>

        {/* Connection */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-sm text-green-300">
            {loading
              ? "Statistik wird geladen..."
              : "Live mit ZEVYQ Backend verbunden"}
          </div>

          {user && (
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/50">
              {user.email}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">
            <div className="text-sm font-medium text-red-300">
              Statistik konnte nicht geladen werden
            </div>

            <p className="mt-2 text-sm leading-6 text-white/40">
              {error}
            </p>

            <button
              type="button"
              onClick={loadStatistics}
              className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Erneut versuchen
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && !error && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="text-sm text-white/40">
              Deine persönlichen Statistikdaten werden geladen...
            </div>
          </div>
        )}

        {/* Statistics */}
        {!loading && !error && stats && (
          <>
            {/* Main stats */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Tipps gespielt
                </div>

                <div className="mt-4 text-3xl font-bold">
                  {stats.bets}
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Insgesamt erfasste Tipps
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Trefferquote
                </div>

                <div className="mt-4 text-3xl font-bold">
                  {formatPercent(stats.hit_rate)}
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Nur abgeschlossene Tipps
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  ROI
                </div>

                <div className="mt-4 text-3xl font-bold">
                  {formatPercent(stats.roi)}
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Rendite auf deine Einsätze
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Gewinn / Verlust
                </div>

                <div
                  className={`mt-4 text-3xl font-bold ${
                    stats.profit_loss > 0
                      ? "text-green-300"
                      : stats.profit_loss < 0
                        ? "text-red-300"
                        : ""
                  }`}
                >
                  {formatEuro(stats.profit_loss)}
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Realisiertes Ergebnis
                </p>
              </div>
            </div>

            {/* Result breakdown */}
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Ergebnisse
                </div>

                <h2 className="mt-3 text-xl font-semibold">
                  Tipp-Performance
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Gewonnen
                    </span>

                    <span className="font-semibold text-green-300">
                      {stats.won}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Verloren
                    </span>

                    <span className="font-semibold text-red-300">
                      {stats.lost}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Offen
                    </span>

                    <span className="font-semibold">
                      {stats.open}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Void
                    </span>

                    <span className="font-semibold">
                      {stats.void}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Einsätze
                </div>

                <h2 className="mt-3 text-xl font-semibold">
                  Einsatzvolumen
                </h2>

                <div className="mt-6">
                  <div className="text-sm text-white/40">
                    Gesamte Einsätze
                  </div>

                  <div className="mt-2 text-3xl font-bold">
                    {stats.total_stake.toFixed(2)} €
                  </div>

                  <p className="mt-3 text-sm leading-6 text-white/35">
                    Summe aller bisher im ZEVYQ-Konto erfassten Einsätze.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Account
                </div>

                <h2 className="mt-3 text-xl font-semibold">
                  Persönliche Statistik
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Account
                    </span>

                    <span className="text-sm font-medium">
                      {user?.display_name || "ZEVYQ User"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Plan
                    </span>

                    <span className="text-sm font-medium">
                      {user?.plan || "FREE"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Status
                    </span>

                    <span className="text-sm font-medium text-green-300">
                      {user?.account_status || "ACTIVE"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                ZEVYQ Statistik
              </div>

              <h2 className="mt-3 text-xl font-semibold">
                Deine Daten werden automatisch aktualisiert
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-white/40">
                Die Statistik basiert auf den Tipps, die deinem persönlichen
                ZEVYQ-Konto zugeordnet wurden. Sobald ein Tipp abgeschlossen
                und das Ergebnis im Backend erfasst wurde, werden Trefferquote,
                ROI und Gewinn beziehungsweise Verlust automatisch neu
                berechnet.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/history"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  Tipp-Historie öffnen →
                </a>

                <a
                  href="/bankroll"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  Bankroll öffnen →
                </a>
              </div>
            </div>
          </>
        )}

        {/* No data */}
        {!loading && !error && !stats && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <h2 className="text-xl font-semibold">
              Noch keine Statistik vorhanden
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/40">
              Sobald persönliche Tipps erfasst wurden, erscheinen hier deine
              Statistikdaten.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}