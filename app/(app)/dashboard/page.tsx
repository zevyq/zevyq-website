"use client";

import TipEmptyStatus from "../tip-empty-status";

import { authStorage } from "../../auth-storage";

import { formatTipLabel, formatTipSelection } from "../tip-format";

import { useEffect, useState } from "react";
import { getCategoryBorderColor, getCategoryTextColor } from "../category-colors";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001";

type AuthUser = {
  user_id: string;
  email: string;
  display_name: string;
  plan: string;
  account_status: string;
};

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

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tips, setTips] = useState<Tip[]>([]);
  const [freeTip, setFreeTip] = useState<Tip | null>(null);
  const [apiPlan, setApiPlan] = useState<string | null>(null);
  const [loadingTips, setLoadingTips] = useState(true);
  const [tipsError, setTipsError] = useState("");
  const [savedBets, setSavedBets] = useState<Record<string, number>>({});
  const [activeBetTip, setActiveBetTip] = useState<Tip | null>(null);
  const [stakeInput, setStakeInput] = useState("");
  const [savingBet, setSavingBet] = useState(false);
  const [betError, setBetError] = useState("");
  const [betSuccess, setBetSuccess] = useState("");

  useEffect(() => {
    const storedUser = authStorage.getItem("zevyq_user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as AuthUser;
        setUser(parsedUser);
      } catch {
        authStorage.removeItem("zevyq_user");
      }
    }

    async function loadTips() {
      try {
        setLoadingTips(true);
        setTipsError("");

        const token = authStorage.getItem("zevyq_access_token");
        const response = await fetch(`${API_URL}/analysis/tips`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Die KI-Tipps konnten nicht geladen werden.");
        }

        const data = (await response.json()) as TipsResponse;

        if (!data.success) {
          throw new Error("Die ZEVYQ-Analyse war nicht erfolgreich.");
        }

        setTips(data.published_tips ?? data.tips ?? []);
        setFreeTip(data.free_tip ?? null);
        setApiPlan(data.user_plan ?? null);
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

    async function loadSavedBets() {
      const storedUser = authStorage.getItem("zevyq_user");
      const token = authStorage.getItem("zevyq_access_token");
      if (!storedUser || !token) return;

      try {
        const parsedUser = JSON.parse(storedUser) as AuthUser;
        if (!parsedUser.user_id) return;

        const response = await fetch(
          `${API_URL}/users/${encodeURIComponent(parsedUser.user_id)}/bets?limit=100`,
          {
            cache: "no-store",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!response.ok) return;

        const data = await response.json();
        if (!data.success || !Array.isArray(data.bets)) return;

        const stakes: Record<string, number> = {};
        for (const bet of data.bets) {
          stakes[String(bet.tip_id)] = Number(bet.stake);
        }
        setSavedBets(stakes);
      } catch {
        // Ein Ladefehler der Einsätze soll das Laden der Tipps nicht blockieren.
      }
    }

    loadTips();
    loadSavedBets();
  }, []);


  async function handleSaveDashboardBet() {
    setBetError("");
    setBetSuccess("");

    if (!user?.user_id) {
      setBetError("Bitte melde dich an, um deinen Einsatz zu speichern.");
      return;
    }

    if (!activeBetTip) {
      setBetError("Bitte wähle zuerst einen Tipp aus.");
      return;
    }

    const tipId = String(activeBetTip.tip_id ?? activeBetTip.id);
    if (Object.prototype.hasOwnProperty.call(savedBets, tipId)) {
      setBetError("Dieser Tipp wurde bereits als gespielt gespeichert.");
      return;
    }

    const numericStake = Number(stakeInput.replace(",", "."));
    if (!Number.isFinite(numericStake) || numericStake <= 0) {
      setBetError("Bitte gib einen gültigen Einsatz größer als 0 € ein.");
      return;
    }

    const token = authStorage.getItem("zevyq_access_token");
    if (!token) {
      setBetError("Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.");
      return;
    }

    setSavingBet(true);

    try {
      const response = await fetch(
        `${API_URL}/users/${encodeURIComponent(user.user_id)}/bets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tip_id: tipId, stake: numericStake }),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          response.status === 409
            ? "Dieser Tipp wurde bereits gespeichert."
            : data?.detail || "Der Tipp konnte nicht gespeichert werden.",
        );
      }

      setSavedBets((previous) => ({ ...previous, [tipId]: numericStake }));
      setBetSuccess("Tipp und Einsatz wurden gespeichert.");
      setStakeInput("");
      setActiveBetTip(null);
    } catch (error) {
      setBetError(
        error instanceof Error
          ? error.message
          : "Der Tipp konnte nicht gespeichert werden.",
      );
    } finally {
      setSavingBet(false);
    }
  }
  const displayName = user?.display_name || "ZEVYQ User";

  const isPremium = apiPlan === "PRO" || apiPlan === "PREMIUM";

  const dashboardTips = tips.length > 0 ? tips : freeTip ? [freeTip] : [];

  const bestTip = isPremium
    ? tips.find((tip) => tip.category.trim().toUpperCase() === "BEST TIP") ?? null
    : freeTip ?? tips[0] ?? null;

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
                  {(["active", "aktiv"].includes((user?.account_status || "").trim().toLowerCase()) ? "AKTIV" : ["inactive", "inaktiv", "disabled", "deleted"].includes((user?.account_status || "").trim().toLowerCase()) ? "INAKTIV" : "UNBEKANNT")}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                Plan:{" "}
                <span className="font-medium">
                  {apiPlan === null ? "WIRD GELADEN" : isPremium ? "PREMIUM" : "FREE"}
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
              {loadingTips ? "..." : tips.length}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Echte ZEVYQ-KI-Tipps
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              {isPremium ? "Best Tip" : "Free-Tipp"}
            </div>

            <div className="mt-4 text-3xl font-bold">
              {loadingTips
                ? "..."
                : isPremium && bestTip
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
                ? "..."
                : isPremium && tips.length > 0
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
                ? "..."
                : isPremium && tips.length > 0
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
        {(loadingTips || !!tipsError || !!bestTip || tips.length > 0) && (
        <div className={`mt-8 rounded-2xl border-2 ${isPremium ? "border-[#6652D9]" : "border-white/10"} bg-white/[0.02] p-7`}>
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                {isPremium ? "Aktueller Best Tip" : "Dein Free-Tipp"}
              </div>

              {loadingTips ? (
                <div className="mt-4 text-white/40">
                  ZEVYQ analysiert aktuelle Spiele...
                </div>
              ) : bestTip ? (
                <>
                  <h2 className="mt-3 text-2xl font-bold">
                    {bestTip.home} – {bestTip.away}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/40">
                    {bestTip.country && <span>{bestTip.country}</span>}
                    {bestTip.country && <span>{"\u2022"}</span>}
                    <span>{bestTip.league}</span>
                    <span>•</span>
                    <span>{formatKickoff(bestTip.event_date)} Uhr</span>
                  </div>
                </>
              ) : (
                <div className="mt-4 text-white/40">
                  {isPremium ? "Aktuell ist kein qualifizierter Best Tip verfügbar." : "Aktuell ist kein qualifizierter FREE-TIPP verfügbar."}
                </div>
              )}
            </div>

            {isPremium && bestTip && (
              <a
                href={`/tips/${bestTip.id}`}
                className="inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Details →
              </a>
            )}
          </div>

          {bestTip && (
            <div className={`mt-7 grid gap-4 ${isPremium ? "sm:grid-cols-4" : "sm:grid-cols-2"}`}>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs text-white/40">Tipp</div>
                <div className="mt-2 font-semibold">
                  {formatTipSelection(bestTip)}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs text-white/40">Quote</div>
                <div className="mt-2 text-2xl font-bold">
                  {bestTip.odds.toFixed(2)}
                </div>
              </div>

              {isPremium && (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
        )}

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

            {isPremium && <a
              href="/tips"
              className="text-sm font-medium text-white/50 transition hover:text-white"
            >
              Alle Tipps →
            </a>}
          </div>

          {loadingTips ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/40">
              Aktuelle ZEVYQ-Tipps werden geladen...
            </div>
          ) : tipsError ? null : dashboardTips.length === 0 ? (
            <TipEmptyStatus />
          ) : (
            <div className="grid gap-4">
              {dashboardTips.slice(0, 5).map((tip) => (
                <div
                  key={tip.id}
                  className={`rounded-2xl border-2 ${isPremium ? getCategoryBorderColor(tip.category) : "border-white/10"} bg-white/[0.02] p-6 transition hover:bg-white/[0.04]`}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/35">
                        {isPremium ? <span className={getCategoryTextColor(tip.category)}>{tip.category}</span> : <span className="font-semibold text-white/70">Free-Tipp</span>}
                        <span>•</span>
                        {tip.country && <span>{tip.country}</span>}
                    {tip.country && <span>{"\u2022"}</span>}
                    <span>{tip.league}</span>
                        <span>•</span>
                        <span>{formatKickoff(tip.event_date)} Uhr</span>
                      </div>
                      <div className="mt-3 text-lg font-semibold">{tip.home} – {tip.away}</div>
                      <div className="mt-2 text-sm text-white/40">
                        <span className="text-white/70">{formatTipLabel(tip)}</span>
                      </div>
                    </div>
                    <div className={`grid gap-3 ${isPremium ? "grid-cols-3 lg:min-w-[360px]" : "grid-cols-1 lg:min-w-[140px]"}`}>
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-xs text-white/35">Quote</div>
                        <div className="mt-1 font-bold">{tip.odds.toFixed(2)}</div>
                      </div>
                      {isPremium && (
                        <>
                          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="text-xs text-white/35">Modell</div>
                            <div className="mt-1 font-bold">{formatProbability(tip.model_probability)}</div>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="text-xs text-white/35">Value</div>
                            <div className="mt-1 font-bold">+{tip.value.toFixed(1)}%</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col items-stretch gap-3 border-t border-white/10 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    {!isPremium ? null : Object.prototype.hasOwnProperty.call(savedBets, String(tip.tip_id ?? tip.id)) ? (
                      <div className="justify-self-center rounded-xl border border-emerald-500/30 px-5 py-3 text-base text-emerald-300">
                        Gespielt · {savedBets[String(tip.tip_id ?? tip.id)].toFixed(2)} €
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveBetTip(tip);
                          setStakeInput("");
                          setBetError("");
                          setBetSuccess("");
                        }}
                        disabled={savingBet}
                        className="w-full rounded-xl border border-blue-400/25 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20 disabled:cursor-default disabled:opacity-70 sm:w-auto"
                      >
                        Tipp nachgespielt
                      </button>
                    )}
                    {isPremium && <a
                      href={`/tips/${tip.id}`}
                      className="justify-self-end text-sm font-semibold text-white/60 transition hover:text-white"
                    >
                      Analyse öffnen →
                    </a>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {activeBetTip && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !savingBet) {
                setActiveBetTip(null);
                setStakeInput("");
                setBetError("");
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="dashboard-bet-modal-title"
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 id="dashboard-bet-modal-title" className="text-lg font-semibold">
                    Tipp als gespielt speichern
                  </h3>
                  <p className="mt-2 text-sm text-white/60">
                    {activeBetTip.home} – {activeBetTip.away}
                  </p>
                  <p className="mt-1 text-sm text-white/40">
                    {formatTipLabel(activeBetTip)} · Quote {activeBetTip.odds.toFixed(2)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Fenster schließen"
                  onClick={() => {
                    setActiveBetTip(null);
                    setStakeInput("");
                    setBetError("");
                  }}
                  disabled={savingBet}
                  className="rounded-lg px-2 py-1 text-xl text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-50"
                >
                  ×
                </button>
              </div>

              <form
                className="mt-6 flex flex-col gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  void handleSaveDashboardBet();
                }}
              >
                <div>
                  <label htmlFor="dashboard-bet-stake" className="mb-2 block text-sm text-white/60">
                    Einsatz in Euro
                  </label>
                  <input
                    id="dashboard-bet-stake"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={stakeInput}
                    onChange={(event) => setStakeInput(event.target.value)}
                    placeholder="z. B. 10,00"
                    className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:border-white/40"
                    disabled={savingBet}
                    required
                    autoFocus
                  />
                </div>

                {betError && (
                  <p role="alert" className="text-sm text-red-300">{betError}</p>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveBetTip(null);
                      setStakeInput("");
                      setBetError("");
                    }}
                    disabled={savingBet}
                    className="flex-1 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 disabled:opacity-50"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    disabled={savingBet}
                    className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {savingBet ? "Speichert..." : "Einsatz speichern"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {betSuccess && (
          <div role="status" className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-emerald-300">
            {betSuccess}
          </div>
        )}
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

















