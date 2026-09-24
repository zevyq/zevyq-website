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

type Tip = {
  id: number;
  event_id: number;
  category: string;
  league: string;
  home: string;
  away: string;
  event_date: string;
  market: string;
  selection: string;
  market_key: string;
  odds: number;
  model_probability: number;
  fair_odds: number;
  value: number;
  data_confidence: number;
};

type TipsResponse = {
  success: boolean;
  source: string;
  analysis_date_from: string;
  analysis_date_to: string;
  tip_count: number;
  tips: Tip[];
};

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tips, setTips] = useState<Tip[]>([]);
  const [loadingTips, setLoadingTips] = useState(true);
  const [tipsError, setTipsError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("zevyq_user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as AuthUser;
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("zevyq_user");
      }
    }

    async function loadTips() {
      try {
        setLoadingTips(true);
        setTipsError("");

        const response = await fetch(`${API_URL}/analysis/tips`);

        if (!response.ok) {
          throw new Error("Die KI-Tipps konnten nicht geladen werden.");
        }

        const data = (await response.json()) as TipsResponse;

        if (!data.success) {
          throw new Error("Die ZEVYQ-Analyse war nicht erfolgreich.");
        }

        setTips(data.tips || []);
      } catch (error) {
        setTipsError(
          error instanceof Error
            ? error.message
            : "Die KI-Tipps konnten nicht geladen werden.",
        );
      } finally {
        setLoadingTips(false);
      }
    }

    loadTips();
  }, []);

  const displayName = user?.display_name || "ZEVYQ User";

  const bestTip =
    tips.find((tip) => tip.category.toUpperCase() === "BEST TIP") || tips[0];

  const averageProbability =
    tips.length > 0
      ? tips.reduce((sum, tip) => sum + tip.model_probability, 0) / tips.length
      : 0;

  const averageValue =
    tips.length > 0
      ? tips.reduce((sum, tip) => sum + tip.value, 0) / tips.length
      : 0;

  function formatProbability(value: number) {
    return `${(value * 100).toFixed(1)}%`;
  }

  function formatKickoff(date: string) {
    return new Date(date).toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            ZEVYQ Dashboard
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Willkommen, {displayName}
          </h1>

          <p className="mt-3 text-white/45">
            Deine persönliche ZEVYQ Sports Intelligence Übersicht.
          </p>
        </div>

        {/* Account */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                Dein Account
              </div>

              <div className="mt-3 text-lg font-semibold">
                {user?.email || "Account wird geladen..."}
              </div>

              <div className="mt-2 text-sm text-white/40">
                Status:{" "}
                <span className="text-white/70">
                  {user?.account_status || "Aktiv"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                Plan:{" "}
                <span className="font-medium">
                  {user?.plan || "Free"}
                </span>
              </div>

              <div className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-sm text-green-300">
                Account aktiv
              </div>
            </div>
          </div>
        </div>

        {/* Live AI stats */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              Tipps heute
            </div>

            <div className="mt-4 text-3xl font-bold">
              {loadingTips ? "…" : tips.length}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Echte ZEVYQ-KI-Tipps
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              Best Tip
            </div>

            <div className="mt-4 text-3xl font-bold">
              {loadingTips
                ? "…"
                : bestTip
                  ? formatProbability(bestTip.model_probability)
                  : "–"}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Modellwahrscheinlichkeit
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              Ø Modell
            </div>

            <div className="mt-4 text-3xl font-bold">
              {loadingTips
                ? "…"
                : tips.length > 0
                  ? formatProbability(averageProbability)
                  : "–"}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Durchschnitt aller Tipps
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              Ø Value
            </div>

            <div className="mt-4 text-3xl font-bold">
              {loadingTips
                ? "…"
                : tips.length > 0
                  ? `+${averageValue.toFixed(1)}%`
                  : "–"}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Durchschnittlicher Value
            </p>
          </div>
        </div>

        {/* Error */}
        {tipsError && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">
            <div className="text-sm font-medium text-red-300">
              KI-Daten konnten nicht geladen werden
            </div>

            <p className="mt-2 text-sm text-red-200/60">
              {tipsError}
            </p>
          </div>
        )}

        {/* Best Tip */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-7">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                Aktueller Best Tip
              </div>

              {loadingTips ? (
                <div className="mt-4 text-white/40">
                  ZEVYQ analysiert aktuelle Spiele…
                </div>
              ) : bestTip ? (
                <>
                  <h2 className="mt-3 text-2xl font-bold">
                    {bestTip.home} – {bestTip.away}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/40">
                    <span>{bestTip.league}</span>
                    <span>•</span>
                    <span>{formatKickoff(bestTip.event_date)} Uhr</span>
                    <span>•</span>
                    <span>{bestTip.market}</span>
                  </div>
                </>
              ) : (
                <div className="mt-4 text-white/40">
                  Aktuell wurde kein Best Tip gefunden.
                </div>
              )}
            </div>

            {bestTip && (
              <a
                href={`/tips/${bestTip.id}`}
                className="inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Details →
              </a>
            )}
          </div>

          {bestTip && (
            <div className="mt-7 grid gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs text-white/40">Tipp</div>
                <div className="mt-2 font-semibold">
                  {bestTip.selection}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs text-white/40">Quote</div>
                <div className="mt-2 text-2xl font-bold">
                  {bestTip.odds.toFixed(2)}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs text-white/40">Modell</div>
                <div className="mt-2 text-2xl font-bold">
                  {formatProbability(bestTip.model_probability)}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs text-white/40">Value</div>
                <div className="mt-2 text-2xl font-bold">
                  +{bestTip.value.toFixed(1)}%
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Current tips */}
        <div className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                ZEVYQ Intelligence
              </div>

              <h2 className="mt-2 text-2xl font-bold">
                Aktuelle KI-Tipps
              </h2>
            </div>

            <a
              href="/tips"
              className="text-sm font-medium text-white/50 transition hover:text-white"
            >
              Alle Tipps →
            </a>
          </div>

          {loadingTips ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/40">
              Aktuelle ZEVYQ-Tipps werden geladen…
            </div>
          ) : tips.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/40">
              Aktuell wurden keine qualifizierten Tipps gefunden.
            </div>
          ) : (
            <div className="grid gap-4">
              {tips.slice(0, 5).map((tip) => (
                <a
                  key={tip.id}
                  href={`/tips/${tip.id}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/35">
                        <span>{tip.category}</span>
                        <span>•</span>
                        <span>{tip.league}</span>
                        <span>•</span>
                        <span>{formatKickoff(tip.event_date)} Uhr</span>
                      </div>

                      <div className="mt-3 text-lg font-semibold">
                        {tip.home} – {tip.away}
                      </div>

                      <div className="mt-2 text-sm text-white/40">
                        {tip.market}:{" "}
                        <span className="text-white/70">
                          {tip.selection}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 lg:min-w-[360px]">
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-xs text-white/35">
                          Quote
                        </div>
                        <div className="mt-1 font-bold">
                          {tip.odds.toFixed(2)}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-xs text-white/35">
                          Modell
                        </div>
                        <div className="mt-1 font-bold">
                          {formatProbability(tip.model_probability)}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-xs text-white/35">
                          Value
                        </div>
                        <div className="mt-1 font-bold">
                          +{tip.value.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* System status */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-white/30">
            ZEVYQ System
          </div>

          <h2 className="mt-3 text-xl font-semibold">
            Live-Verbindung zur ZEVYQ KI
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/40">
            Dieses Dashboard lädt die aktuellen qualifizierten Tipps direkt
            aus dem ZEVYQ Backend. Die Daten stammen aus der aktuellen
            ZEVYQ V5.6 Analyse.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            <div className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-green-300">
              Backend verbunden
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/40">
              API: {API_URL}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}