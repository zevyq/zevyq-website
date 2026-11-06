"use client";

import { authStorage } from "../../auth-storage";

import { formatTipLabel } from "../tip-format";

import { useEffect, useMemo, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001";

type Tip = {
  id: number;
  tip_id?: string | number;
  event_id: number;
  category: string;
  league: string;
  country?: string | null;
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
  analysis_date_from?: string;
  analysis_date_to?: string;
  date_from?: string;
  date_to?: string;
  tip_count: number;
  tips: Tip[];
  published_tips?: Tip[];
  free_tip?: Tip | null;
  user_plan?: string;
  premium_categories?: Record<string, Tip[]>;
};

const filters = ["Alle", "Safe", "Value", "Verdoppler", "Best Tip"];

function formatProbability(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatKickoff(date: string) {
  return new Date(date).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normalizeCategory(category: string) {
  return category.toUpperCase().trim();
}

export default function TipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [freeTip, setFreeTip] = useState<Tip | null>(null);
  const [userPlan, setUserPlan] = useState('FREE');
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<{ user_id: string } | null>(null);
  const [savedStakes, setSavedStakes] = useState<Record<string, number>>({});
  const [activeBetTip, setActiveBetTip] = useState<Tip | null>(null);
  const [stakeInput, setStakeInput] = useState("");
  const [savingBet, setSavingBet] = useState(false);
  const [betError, setBetError] = useState("");
  const [betSuccess, setBetSuccess] = useState("");

  useEffect(() => {
    const storedUser = authStorage.getItem("zevyq_user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserPlan(String(parsedUser.plan ?? "FREE").toUpperCase());
      } catch {
        setUserPlan("FREE");
      }
    } else {
      setUserPlan("FREE");
    }

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.user_id) {
          setCurrentUser({ user_id: String(parsedUser.user_id) });
        }
      } catch {
        setCurrentUser(null);
      }
    }

    async function loadSavedBets() {
      try {
        if (!storedUser) return;
        const parsedUser = JSON.parse(storedUser);
        if (!parsedUser.user_id) return;
        const token = authStorage.getItem("zevyq_access_token");
        if (!token) return;
        const response = await fetch(`${API_URL}/users/${encodeURIComponent(parsedUser.user_id)}/bets?limit=100`, {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok || !data.success) return;
        const stakes: Record<string, number> = {};
        for (const bet of data.bets ?? []) {
          stakes[String(bet.tip_id)] = Number(bet.stake);
        }
        setSavedStakes(stakes);
      } catch {
        // Tippseite bleibt nutzbar, wenn die Wett-Historie nicht lädt.
      }
    }

    async function loadTips() {
      try {
        setLoading(true);
        setError("");

        const token = authStorage.getItem("zevyq_access_token");

        const response = await fetch(`${API_URL}/analysis/tips`, {
          cache: "no-store",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          throw new Error("Die ZEVYQ-Tipps konnten nicht geladen werden.");
        }

        const data = (await response.json()) as TipsResponse;

        if (!data.success) {
          throw new Error("Die ZEVYQ-Analyse war nicht erfolgreich.");
        }

        setTips(data.published_tips ?? data.tips ?? []);
        setUserPlan(String(data.user_plan ?? 'FREE').toUpperCase());
        setFreeTip(data.free_tip ?? null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Die ZEVYQ-Tipps konnten nicht geladen werden.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadTips();
    loadSavedBets();
  }, []);

  async function handleSaveCardBet(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBetError("");
    setBetSuccess("");

    if (!currentUser) {
      setBetError("Bitte melde dich an, um deinen Einsatz zu speichern.");
      return;
    }
    if (!activeBetTip) {
      setBetError("Der Tipp konnte nicht geladen werden.");
      return;
    }

    const numericStake = Number(stakeInput.replace(",", "."));
    if (!Number.isFinite(numericStake) || numericStake <= 0) {
      setBetError("Bitte gib einen gültigen Einsatz größer als 0 € ein.");
      return;
    }

    const token = authStorage.getItem("zevyq_access_token");
    if (!token) {
      setBetError("Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.");
      return;
    }

    setSavingBet(true);
    try {
      const tipKey = String(activeBetTip.tip_id ?? activeBetTip.id);
      const response = await fetch(
        `${API_URL}/users/${encodeURIComponent(currentUser.user_id)}/bets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tip_id: tipKey, stake: numericStake }),
        },
      );
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.detail || "Der Tipp konnte nicht gespeichert werden.");
      }

      setSavedStakes((previous) => ({ ...previous, [tipKey]: numericStake }));
      setBetSuccess("Tipp gespeichert und mit deinem Konto synchronisiert.");
      setStakeInput("");
      setTimeout(() => {
        setActiveBetTip(null);
        setBetSuccess("");
      }, 1200);
    } catch (err) {
      setBetError(err instanceof Error ? err.message : "Der Tipp konnte nicht gespeichert werden.");
    } finally {
      setSavingBet(false);
    }
  }
  const publishedTips = useMemo(() => {
    if (userPlan.includes("PRO") || userPlan.includes("PREMIUM")) {
      const categoryOrder = ["SAFE", "VALUE", "VERDOPPLER", "BEST TIP"];
      const ranked = (items: Tip[]) =>
        [...items].sort(
          (a, b) =>
            (b.value - a.value) ||
            (b.model_probability - a.model_probability),
        );

      return categoryOrder.flatMap((category) =>
        ranked(
          tips.filter(
            (tip) => normalizeCategory(tip.category) === category,
          ),
        ).slice(0, 2),
      );
    }

    return freeTip ? [freeTip] : [];
  }, [tips, userPlan, freeTip]);

  const filteredTips = useMemo(() => {
    if (activeFilter === "Alle" || activeFilter === "Free-Tipp" || (!userPlan.includes("PRO") && !userPlan.includes("PREMIUM"))) {
      return publishedTips;
    }

    return publishedTips.filter(
      (tip) => normalizeCategory(tip.category) === activeFilter.toUpperCase(),
    );
  }, [publishedTips, activeFilter, userPlan]);
  const averageProbability =
    publishedTips.length > 0
      ? publishedTips.reduce((sum, tip) => sum + tip.model_probability, 0) / publishedTips.length
      : 0;

  const averageValue =
    publishedTips.length > 0
      ? publishedTips.reduce((sum, tip) => sum + tip.value, 0) / publishedTips.length
      : 0;

  const categoryCount = (category: string) =>
    publishedTips.filter(
      (tip) => normalizeCategory(tip.category) === category.toUpperCase(),
    ).length;

  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            ZEVYQ Intelligence
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Aktuelle KI-Tipps
          </h1>

          <p className="mt-3 max-w-3xl text-white/45">
            Aktuelle qualifizierte ZEVYQ-Tipps direkt aus der V5.6 Analyse.
          </p>
        </div>

        {/* Live status */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-sm text-green-300">
            {loading ? "KI-Analyse l\u00e4uft..." : "Live mit ZEVYQ Backend verbunden"}
          </div>

          {!loading && !error && (
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
              {publishedTips.length} qualifizierte Tipps
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">
            <div className="text-sm font-medium text-red-300">
              Tipps konnten nicht geladen werden
            </div>

            <p className="mt-2 text-sm leading-6 text-red-200/60">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Erneut laden
            </button>
          </div>
        )}

        {/* Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex min-w-max gap-2">
            {(userPlan.includes("PRO") || userPlan.includes("PREMIUM") ? filters : ["Free-Tipp"]).map((filter) => {
              const count =
                filter === "Alle"
                  ? publishedTips.length
                  : categoryCount(filter);

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/[0.02] text-white/45 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {filter}

                  {!loading && (
                    <span
                      className={`ml-2 ${
                        activeFilter === filter
                          ? "text-black/50"
                          : "text-white/25"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              Tipps
            </div>

            <div className="mt-3 text-3xl font-bold">
              {loading ? "..." : tips.length}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Qualifizierte KI-Tipps
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              {"\u00d8 MODELL"}
            </div>

            <div className="mt-3 text-3xl font-bold">
              {loading
                ? "..."
                : publishedTips.length > 0
                  ? formatProbability(averageProbability)
                  : "–"}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Durchschnittliche Modellwahrscheinlichkeit
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              {"\u00d8 VALUE"}
            </div>

            <div className="mt-3 text-3xl font-bold">
              {loading
                ? "..."
                : publishedTips.length > 0
                  ? `+${averageValue.toFixed(1)}%`
                  : "–"}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Durchschnittlicher berechneter Value
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
            <div className="text-lg font-semibold">
              ZEVYQ analysiert aktuelle Spiele...
            </div>

            <p className="mt-2 text-sm text-white/35">
              Die aktuellen Märkte werden vom Backend ausgewertet.
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredTips.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
            <div className="text-lg font-semibold">
              Keine Tipps in dieser Kategorie
            </div>

            <p className="mt-2 text-sm text-white/35">
              Für den aktuellen Analysezeitraum wurde kein qualifizierter Tipp
              in dieser Kategorie gefunden.
            </p>
          </div>
        )}

        {/* Tips */}
        {!loading && filteredTips.length > 0 && (
          <div className="space-y-4">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                className={`group block rounded-2xl border p-6 transition hover:bg-white/[0.04] ${
                  normalizeCategory(tip.category) === "SAFE"
                    ? "border-[#159A62]/80 hover:border-[#159A62]"
                    : normalizeCategory(tip.category) === "VALUE"
                      ? "border-[#2774D8]/80 hover:border-[#2774D8]"
                      : normalizeCategory(tip.category) === "VERDOPPLER"
                        ? "border-[#E27B19]/80 hover:border-[#E27B19]"
                        : normalizeCategory(tip.category) === "BEST TIP"
                          ? "border-[#6652D9]/80 hover:border-[#6652D9]"
                          : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                  {/* Match */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/35">
                      <span
                        className={
                          normalizeCategory(tip.category) === "SAFE"
                            ? "text-[#159A62]"
                            : normalizeCategory(tip.category) === "VALUE"
                              ? "text-[#2774D8]"
                              : normalizeCategory(tip.category) === "VERDOPPLER"
                                ? "text-[#E27B19]"
                                : normalizeCategory(tip.category) === "BEST TIP"
                                  ? "text-[#6652D9]"
                                  : ""
                        }
                      >
                        {tip.category}
                      </span>

                      <span>•</span>

                      {tip.country && <span>{tip.country}</span>}
                    {tip.country && <span>{"\u2022"}</span>}
                    <span>{tip.league}</span>

                      <span>•</span>

                      <span>
                        {formatKickoff(tip.event_date)} Uhr
                      </span>
                    </div>

                    <h2 className="mt-3 text-xl font-semibold">
                      {tip.home} – {tip.away}
                    </h2>

                    <div className="mt-2 text-sm text-white/40">
                      <span className="text-white/75">
                        {formatTipLabel(tip)}
                      </span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 xl:w-[390px]">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs text-white/35">
                        Quote
                      </div>

                      <div className="mt-2 text-xl font-bold">
                        {tip.odds.toFixed(2)}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs text-white/35">
                        Modell
                      </div>

                      <div className="mt-2 text-xl font-bold">
                        {formatProbability(tip.model_probability)}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs text-white/35">
                        Value
                      </div>

                      <div className="mt-2 text-xl font-bold">
                        {tip.value >= 0 ? "+" : ""}
                        {tip.value.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <div className="flex flex-wrap gap-4 text-xs text-white/30">
                    <span>Fair Odds: {tip.fair_odds.toFixed(2)}</span>
                    <span>Datenqualität: {Math.round(tip.data_confidence * 100)}%</span>
                  </div>
                  <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                    {savedStakes[String(tip.tip_id ?? tip.id)] !== undefined && (
                      <span className="rounded-lg border border-green-500/20 bg-green-500/[0.08] px-3 py-2 text-xs text-green-300">
                        Nachgespielt · Einsatz: {savedStakes[String(tip.tip_id ?? tip.id)].toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
                      </span>
                    )}
                    <button
                      disabled={savedStakes[String(tip.tip_id ?? tip.id)] !== undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setActiveBetTip(tip);
                        setStakeInput("");
                        setBetError("");
                        setBetSuccess("");
                      }}
                      className="w-full rounded-xl border border-blue-400/25 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20 disabled:cursor-default disabled:opacity-70 sm:w-auto"
                    >
                      {savedStakes[String(tip.tip_id ?? tip.id)] !== undefined ? "Einsatz gespeichert" : "Tipp nachgespielt"}
                    </button>
                    <a href={`/tips/${tip.tip_id ?? tip.id}`} className="text-sm font-medium text-white/45 transition hover:text-white">
                      Analyse öffnen →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Information */}
        {!loading && !error && publishedTips.length > 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-white/30">
              ZEVYQ Analyse
            </div>

            <h2 className="mt-3 text-xl font-semibold">
              Live-Daten aus der ZEVYQ V5.6 Engine
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-white/40">
              Die hier angezeigten Tipps werden direkt aus dem ZEVYQ Backend
              geladen. Angezeigt werden nur Märkte, die die aktuelle
              Qualifizierungslogik der Analyse erfüllen.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-xs">
              <div className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-green-300">
                Backend verbunden
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/40">
                ZEVYQ V5.6
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/40">
                {publishedTips.length} aktuelle Tipps
              </div>
            </div>
          </div>
        )}
      {activeBetTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" onClick={() => !savingBet && setActiveBetTip(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="card-bet-title" className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111318] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <h2 id="card-bet-title" className="text-xl font-semibold">Tipp nachgespielt</h2>
            <p className="mt-2 text-sm text-white/50">
              {activeBetTip.home} – {activeBetTip.away}
            </p>
            <p className="mt-1 text-sm text-white/50">
              {formatTipLabel(activeBetTip)} · Quote {activeBetTip.odds.toFixed(2)}
            </p>

            <form onSubmit={handleSaveCardBet} className="mt-6 space-y-4">
              <label htmlFor="card-bet-stake" className="block text-sm text-white/70">Dein Einsatz in Euro</label>
              <input
                id="card-bet-stake"
                type="text"
                inputMode="decimal"
                autoFocus
                value={stakeInput}
                onChange={(event) => setStakeInput(event.target.value)}
                placeholder="z. B. 10,00"
                className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-blue-400"
              />

              {betError && <p role="alert" className="text-sm text-red-300">{betError}</p>}
              {betSuccess && <p role="status" className="text-sm text-green-300">{betSuccess}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  disabled={savingBet}
                  onClick={() => setActiveBetTip(null)}
                  className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 disabled:opacity-50"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={savingBet}
                  className="flex-1 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {savingBet ? "Speichert …" : "Einsatz speichern"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}







