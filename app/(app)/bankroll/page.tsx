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

export default function BankrollPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [bankroll, setBankroll] = useState<BankrollSummary | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadBankroll() {
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
            "Die Bankroll-Daten konnten nicht geladen werden.",
        );
      }

      setBankroll(data?.bankroll || null);
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          "Das ZEVYQ-Backend ist aktuell nicht erreichbar.",
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Die Bankroll konnte nicht geladen werden.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBankroll();
  }, []);

  const profit = bankroll?.profit_loss ?? 0;

  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            ZEVYQ Intelligence
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Bankroll
          </h1>

          <p className="mt-3 text-white/45">
            Deine persönliche Einsatz- und Ergebnisübersicht.
          </p>
        </div>

        {/* Connection */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-sm text-green-300">
            {loading
              ? "Bankroll wird geladen..."
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
              Bankroll konnte nicht geladen werden
            </div>

            <p className="mt-2 text-sm leading-6 text-white/40">
              {error}
            </p>

            <button
              type="button"
              onClick={loadBankroll}
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
              Deine persönlichen Bankroll-Daten werden geladen...
            </div>
          </div>
        )}

        {/* Bankroll */}
        {!loading && !error && bankroll && (
          <>
            {/* Main bankroll cards */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Gewinn / Verlust
                </div>

                <div
                  className={`mt-4 text-3xl font-bold ${
                    profit > 0
                      ? "text-green-300"
                      : profit < 0
                        ? "text-red-300"
                        : ""
                  }`}
                >
                  {formatEuro(profit)}
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Aktuelles Ergebnis
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Gesamteinsätze
                </div>

                <div className="mt-4 text-3xl font-bold">
                  {bankroll.total_stake.toFixed(2)} €
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Bisher erfasst
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  ROI
                </div>

                <div className="mt-4 text-3xl font-bold">
                  {formatPercent(bankroll.roi)}
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Rendite auf deine Einsätze
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Trefferquote
                </div>

                <div className="mt-4 text-3xl font-bold">
                  {formatPercent(bankroll.hit_rate)}
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Abgeschlossene Tipps
                </p>
              </div>
            </div>

            {/* Result breakdown */}
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Tipp-Ergebnisse
                </div>

                <h2 className="mt-3 text-xl font-semibold">
                  Deine Performance
                </h2>

                <div className="mt-7 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-green-500/10 bg-green-500/[0.03] p-5">
                    <div className="text-sm text-white/40">
                      Gewonnen
                    </div>

                    <div className="mt-2 text-2xl font-bold text-green-300">
                      {bankroll.won}
                    </div>
                  </div>

                  <div className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-5">
                    <div className="text-sm text-white/40">
                      Verloren
                    </div>

                    <div className="mt-2 text-2xl font-bold text-red-300">
                      {bankroll.lost}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-sm text-white/40">
                      Offen
                    </div>

                    <div className="mt-2 text-2xl font-bold">
                      {bankroll.open}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-sm text-white/40">
                      Void
                    </div>

                    <div className="mt-2 text-2xl font-bold">
                      {bankroll.void}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Bankroll-System
                </div>

                <h2 className="mt-3 text-xl font-semibold">
                  Persönliche Bankroll
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/40">
                  Sobald du bei einem ZEVYQ-Tipp auf „Tipp nachgespielt“
                  klickst und deinen Einsatz erfasst, wird dieser Tipp
                  deinem persönlichen Konto zugeordnet.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Tipps gespielt
                    </span>

                    <span className="font-medium">
                      {bankroll.bets}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Gesamteinsatz
                    </span>

                    <span className="font-medium">
                      {bankroll.total_stake.toFixed(2)} €
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Aktueller ROI
                    </span>

                    <span className="font-medium">
                      {formatPercent(bankroll.roi)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                ZEVYQ Konto
              </div>

              <h2 className="mt-3 text-xl font-semibold">
                Deine persönlichen Daten
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/40">
                Bankroll, Statistik und Tipp-Historie greifen auf dieselben
                persönlichen Daten deines ZEVYQ-Kontos zu.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/statistics"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  Statistik öffnen →
                </a>

                <a
                  href="/history"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  Tipp-Historie öffnen →
                </a>
              </div>
            </div>
          </>
        )}

        {/* No data */}
        {!loading && !error && !bankroll && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <h2 className="text-xl font-semibold">
              Noch keine Bankroll-Daten vorhanden
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/40">
              Sobald persönliche Tipps erfasst wurden, erscheinen hier deine
              Bankroll-Daten.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}