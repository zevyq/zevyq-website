"use client";

import { authStorage } from "../../../auth-storage";

import { getTipExplanation } from "../../tip-explanation";

import { formatTipMarket, formatTipSelection } from "../../tip-format";

import { getCategoryTextColor } from "../../category-colors";
import { FormEvent, useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type AuthUser = {
  user_id: string;
  email: string;
  display_name: string;
  plan: string;
  account_status: string;
};

type ApiTip = {
  id: string | number;
  tip_id?: string | number;
  event_id: string | number;
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
  v74_eligible?: boolean | null;
};

type TipsResponse = {
  success: boolean;
  tips: ApiTip[];
  published_tips?: ApiTip[];
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));
}

function formatTime(dateString: string) {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatValue(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export default function TipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [tipId, setTipId] = useState("");

  const [tip, setTip] = useState<ApiTip | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showBetModal, setShowBetModal] = useState(false);
  const [stake, setStake] = useState("");
  const [savingBet, setSavingBet] = useState(false);
  const [betError, setBetError] = useState("");
  const [betSuccess, setBetSuccess] = useState(false);
  const [existingStake, setExistingStake] = useState<number | null>(null);

  useEffect(() => {
    async function loadPage() {
      try {
        const resolvedParams = await params;
        setTipId(resolvedParams.id);

        const storedUser = authStorage.getItem("zevyq_user");

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser) as AuthUser;
            setUser(parsedUser);
          } catch {
            authStorage.removeItem("zevyq_user");
          }
        }

        const token = authStorage.getItem("zevyq_access_token");
        const response = await fetch(`${API_URL}/analysis/tips`, {
          cache: "no-store",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data: TipsResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Die ZEVYQ-Tipps konnten nicht geladen werden.");
        }

        const availableTips = data.published_tips ?? data.tips ?? [];
        const foundTip = availableTips.find(
          (item) =>
            String(item.tip_id ?? item.id) === String(resolvedParams.id),
        );

        if (!foundTip) {
          throw new Error(
            "Dieser Tipp ist aktuell nicht in den veröffentlichten ZEVYQ-Tipps vorhanden.",
          );
        }

        setTip(foundTip);

        if (storedUser && token) {
          try {
            const betsResponse = await fetch(
              `${API_URL}/users/${encodeURIComponent(JSON.parse(storedUser).user_id)}/bets?limit=100`,
              {
                cache: "no-store",
                headers: { Authorization: `Bearer ${token}` },
              },
            );
            const betsData = await betsResponse.json();

            if (betsResponse.ok && betsData.success) {
              const existingBet = (betsData.bets ?? []).find(
                (bet: { tip_id: string | number; stake: number }) =>
                  String(bet.tip_id) === String(foundTip.tip_id ?? foundTip.id),
              );
              setExistingStake(existingBet ? Number(existingBet.stake) : null);
            }
          } catch {
            setExistingStake(null);
          }
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Die Tippdaten konnten nicht geladen werden.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [params]);

  async function handleSaveBet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setBetError("");
    setBetSuccess(false);

    if (!user) {
      setBetError(
        "Du musst eingeloggt sein, um einen Tipp zu speichern.",
      );
      return;
    }

    if (!tip) {
      setBetError("Der Tipp konnte nicht geladen werden.");
      return;
    }

    const numericStake = Number(stake.replace(",", "."));

    if (!Number.isFinite(numericStake) || numericStake <= 0) {
      setBetError("Bitte gib einen gültigen Einsatz größer als 0 € ein.");
      return;
    }

    setSavingBet(true);

    try {
      const response = await fetch(
        `${API_URL}/users/${user.user_id}/bets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(authStorage.getItem("zevyq_access_token") ? { Authorization: `Bearer ${authStorage.getItem("zevyq_access_token")}` } : {}),
          },
          body: JSON.stringify({
            tip_id: String(tip.tip_id ?? tip.id),
            stake: numericStake,
          }),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            "Der Tipp konnte nicht gespeichert werden.",
        );
      }

      setBetSuccess(true);
      setStake("");

      setTimeout(() => {
        setShowBetModal(false);
        setBetSuccess(false);
      }, 1200);
    } catch (err) {
      setBetError(
        err instanceof Error
          ? err.message
          : "Der Tipp konnte nicht gespeichert werden.",
      );
    } finally {
      setSavingBet(false);
    }
  }

  if (loading) {
    return (
      <section className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="text-sm text-white/40">
              ZEVYQ-Analyse wird geladen...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !tip) {
    return (
      <section className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <a
            href="/tips"
            className="text-sm text-white/40 transition hover:text-white"
          >
            ← Zurück zu allen Tipps
          </a>

          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-7">
            <div className="text-sm font-medium text-red-300">
              Tipp nicht verfügbar
            </div>

            <p className="mt-2 text-sm leading-6 text-white/40">
              {error || "Dieser Tipp konnte nicht gefunden werden."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <a
              href="/tips"
              className="text-sm text-white/40 transition hover:text-white"
            >
              ← Zurück zu allen Tipps
            </a>

            <div className="mt-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/40">
                  {tip.country && <span>{tip.country}</span>}
                    {tip.country && <span>{"\u2022"}</span>}
                    <span>{tip.league}</span>
                  <span>•</span>
                  <span>{formatDate(tip.event_date)}</span>
                  <span>•</span>
                  <span>{formatTime(tip.event_date)} Uhr</span>
                </div>

                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {tip.home} – {tip.away}
                </h1>

                <p className="mt-3 text-white/50">
                  Live-ZEVYQ-Analyse
                </p>
              </div>

              <div className="inline-flex w-fit rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium">
                <span className={getCategoryTextColor(tip.category)}>{tip.category}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            {/* Main */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                ZEVYQ Empfehlung
              </div>

              <div className="mt-4">
                <div className="text-sm text-white/40">
                  {formatTipMarket(tip)}
                </div>

                <div className="mt-2 text-3xl font-bold">
                  {formatTipSelection(tip)}
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs text-white/40">
                    Quote
                  </div>

                  <div className="mt-2 text-2xl font-bold">
                    {tip.odds.toFixed(2)}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs text-white/40">
                    Modell
                  </div>

                  <div className="mt-2 text-2xl font-bold">
                    {formatPercent(tip.model_probability)}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs text-white/40">
                    Value
                  </div>

                  <div className="mt-2 text-2xl font-bold">
                    {formatValue(tip.value)}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-7">
                <h2 className="text-xl font-semibold">Warum dieser Tipp?</h2>
                <p className="mt-3 text-sm leading-7 text-white/50">
                  {"Die folgenden Angaben erkl\u00e4ren die gespeicherte Bewertung dieses Tipps. Sie beziehen sich auf die Quote und Modellwerte der Ver\u00f6ffentlichung; aktuelle Buchmacherquoten k\u00f6nnen abweichen."}
                </p>
                <div className="mt-5 space-y-4">
                  {getTipExplanation(tip).map(item => (
                    <div key={item.title} className="rounded-xl bg-white/[0.03] p-4 sm:p-5">
                      <h3 className="text-sm font-semibold text-white/90">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/60">{item.text}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-white/50">
                  {"Die Datenqualit\u00e4t beschreibt die vom System bewertete Datengrundlage, nicht die Gewinnsicherheit. Auch ein hoher Modellwert und positiver Value schliessen einen Verlust nicht aus."}
                </p>
              </div>

              <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="font-medium">
                      Datenqualität
                    </div>

                    <div className="mt-1 text-sm text-white/40">
                      Qualität der Datengrundlage dieser Analyse
                    </div>
                  </div>

                  <div className="rounded-full border border-green-500/20 bg-green-500/[0.05] px-4 py-2 text-sm text-green-300">
                    {(tip.data_confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full border border-green-500/20 bg-green-500/[0.05] px-4 py-2 text-xs text-green-300">
                  Live Backend
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/50">
                  ZEVYQ V5.6
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/50">
                  Event #{tip.event_id}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Tipp
                </div>

                <h2 className="mt-3 text-xl font-semibold">
                  {formatTipSelection(tip)}
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Markt
                    </span>

                    <span className="text-sm font-medium">
                      {formatTipMarket(tip)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Quote
                    </span>

                    <span className="text-sm font-medium">
                      {tip.odds.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Fair Odds
                    </span>

                    <span className="text-sm font-medium">
                      {tip.fair_odds.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Value
                    </span>

                    <span className="text-sm font-medium">
                      {formatValue(tip.value)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Match
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Wettbewerb
                    </span>

                    <span className="text-sm font-medium">
                      {tip.league}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Datum
                    </span>

                    <span className="text-sm font-medium">
                      {formatDate(tip.event_date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      Anstoß
                    </span>

                    <span className="text-sm font-medium">
                      {formatTime(tip.event_date)} Uhr
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="text-sm text-white/40">
                      Begegnung
                    </div>

                    <div className="mt-2 font-semibold">
                      {tip.home}
                    </div>

                    <div className="my-1 text-xs text-white/30">
                      gegen
                    </div>

                    <div className="font-semibold">
                      {tip.away}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.03] p-6">
                <div className="text-sm font-medium text-green-300">
                  Live-Daten
                </div>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Diese Detailseite verwendet die aktuellen Daten der
                  ZEVYQ-V5.6-Analyse und keine Demo-Werte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}








