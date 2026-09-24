"use client";

import { useEffect, useMemo, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type TrackRecordTip = {
  id: number;
  tip_id: string;
  event_id: string | null;
  published_at: string;
  event_date: string | null;
  country: string | null;
  league: string | null;
  category: string | null;
  home: string;
  away: string;
  market: string;
  selection: string;
  odds: number;
  model_probability: number;
  fair_odds: number | null;
  value: number | null;
  status: string;
  result_home: number | null;
  result_away: number | null;
  settled_at: string | null;
  profit_loss: number | null;
};

type TrackRecordResponse = {
  success: boolean;
  count: number;
  tips: TrackRecordTip[];
};

type Filter = "ALLE" | "OFFEN" | "GEWONNEN" | "VERLOREN" | "VOID";

function formatDate(date: string | null) {
  if (!date) return "–";

  return new Date(date).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatKickoff(date: string | null) {
  if (!date) return "–";

  return new Date(date).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatProbability(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatValue(value: number | null) {
  if (value === null || value === undefined) {
    return "–";
  }

  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function statusLabel(status: string) {
  switch (status.toUpperCase()) {
    case "GEWONNEN":
      return "GEWONNEN";
    case "VERLOREN":
      return "VERLOREN";
    case "VOID":
      return "VOID";
    case "OFFEN":
      return "OFFEN";
    default:
      return status;
  }
}

function statusClasses(status: string) {
  switch (status.toUpperCase()) {
    case "GEWONNEN":
      return "border-green-500/20 bg-green-500/[0.06] text-green-300";

    case "VERLOREN":
      return "border-red-500/20 bg-red-500/[0.06] text-red-300";

    case "VOID":
      return "border-yellow-500/20 bg-yellow-500/[0.06] text-yellow-300";

    default:
      return "border-white/10 bg-white/5 text-white/50";
  }
}

export default function HistoryPage() {
  const [tips, setTips] = useState<TrackRecordTip[]>([]);
  const [filter, setFilter] = useState<Filter>("ALLE");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTrackRecord() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/track-record?limit=100`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          "Die Tipp-Historie konnte nicht geladen werden.",
        );
      }

      const data = (await response.json()) as TrackRecordResponse;

      if (!data.success) {
        throw new Error(
          "Das ZEVYQ Backend konnte den Track Record nicht laden.",
        );
      }

      setTips(data.tips || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Die Tipp-Historie konnte nicht geladen werden.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTrackRecord();
  }, []);

  const filteredTips = useMemo(() => {
    if (filter === "ALLE") {
      return tips;
    }

    return tips.filter(
      (tip) => tip.status.toUpperCase() === filter,
    );
  }, [tips, filter]);

  const statistics = useMemo(() => {
    const won = tips.filter(
      (tip) => tip.status.toUpperCase() === "GEWONNEN",
    ).length;

    const lost = tips.filter(
      (tip) => tip.status.toUpperCase() === "VERLOREN",
    ).length;

    const open = tips.filter(
      (tip) => tip.status.toUpperCase() === "OFFEN",
    ).length;

    const voidCount = tips.filter(
      (tip) => tip.status.toUpperCase() === "VOID",
    ).length;

    const settled = won + lost;

    const hitRate =
      settled > 0
        ? (won / settled) * 100
        : null;

    const profitLoss = tips.reduce(
      (sum, tip) => sum + (tip.profit_loss ?? 0),
      0,
    );

    return {
      total: tips.length,
      won,
      lost,
      open,
      voidCount,
      settled,
      hitRate,
      profitLoss,
    };
  }, [tips]);

  const filterCounts = useMemo(() => {
    return {
      ALLE: tips.length,
      OFFEN: tips.filter(
        (tip) => tip.status.toUpperCase() === "OFFEN",
      ).length,
      GEWONNEN: tips.filter(
        (tip) => tip.status.toUpperCase() === "GEWONNEN",
      ).length,
      VERLOREN: tips.filter(
        (tip) => tip.status.toUpperCase() === "VERLOREN",
      ).length,
      VOID: tips.filter(
        (tip) => tip.status.toUpperCase() === "VOID",
      ).length,
    };
  }, [tips]);

  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            ZEVYQ Intelligence
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Tipp-Historie
          </h1>

          <p className="mt-3 max-w-3xl text-white/45">
            Der zentrale ZEVYQ Track Record mit allen veröffentlichten
            KI-Tipps und deren aktuellem Status.
          </p>
        </div>

        {/* Status */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div
            className={`rounded-full border px-4 py-2 text-sm ${
              loading
                ? "border-yellow-500/20 bg-yellow-500/[0.05] text-yellow-300"
                : error
                  ? "border-red-500/20 bg-red-500/[0.05] text-red-300"
                  : "border-green-500/20 bg-green-500/[0.06] text-green-300"
            }`}
          >
            {loading
              ? "Track Record wird geladen…"
              : error
                ? "Backend-Verbindung fehlgeschlagen"
                : "Live mit ZEVYQ Backend verbunden"}
          </div>

          {!loading && !error && (
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
              {tips.length} gespeicherte Tipps
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">
            <div className="text-sm font-medium text-red-300">
              Tipp-Historie konnte nicht geladen werden
            </div>

            <p className="mt-2 text-sm leading-6 text-red-200/60">
              {error}
            </p>

            <button
              type="button"
              onClick={loadTrackRecord}
              className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Erneut versuchen
            </button>
          </div>
        )}

        {/* Statistics */}
        {!loading && !error && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Tipps gesamt
                </div>

                <div className="mt-4 text-3xl font-bold">
                  {statistics.total}
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Im ZEVYQ Track Record
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Gewonnen
                </div>

                <div className="mt-4 text-3xl font-bold text-green-300">
                  {statistics.won}
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Aktuell als gewonnen erfasst
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Trefferquote
                </div>

                <div className="mt-4 text-3xl font-bold">
                  {statistics.hitRate !== null
                    ? `${statistics.hitRate.toFixed(1)}%`
                    : "–"}
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Nur abgeschlossene Tipps
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Status
                </div>

                <div className="mt-4 text-3xl font-bold">
                  {statistics.open}
                </div>

                <p className="mt-2 text-sm text-white/35">
                  Noch offene Tipps
                </p>
              </div>
            </div>

            {/* Filter */}
            <div className="mt-8 flex flex-wrap gap-3">
              {(
                [
                  ["ALLE", "Alle"],
                  ["OFFEN", "Offen"],
                  ["GEWONNEN", "Gewonnen"],
                  ["VERLOREN", "Verloren"],
                  ["VOID", "Void"],
                ] as [Filter, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                    filter === value
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/[0.02] text-white/45 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {label}{" "}
                  <span className="ml-1 opacity-60">
                    {filterCounts[value]}
                  </span>
                </button>
              ))}
            </div>

            {/* Track Record */}
            <div className="mt-8">
              {filteredTips.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
                  <div className="text-lg font-semibold">
                    Keine Tipps vorhanden
                  </div>

                  <p className="mt-2 text-sm text-white/35">
                    Für diesen Filter gibt es aktuell keine Einträge.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTips.map((tip) => (
                    <div
                      key={tip.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                    >
                      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

                        {/* Match */}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3 text-xs text-white/35">
                            <span className="font-medium text-white/65">
                              {tip.category || "ZEVYQ TIP"}
                            </span>

                            <span>•</span>

                            <span>
                              {tip.league || "Unbekannter Wettbewerb"}
                            </span>

                            <span>•</span>

                            <span>
                              {formatDate(tip.event_date)}
                            </span>

                            <span>•</span>

                            <span>
                              {formatKickoff(tip.event_date)} Uhr
                            </span>
                          </div>

                          <h2 className="mt-3 text-xl font-semibold">
                            {tip.home} – {tip.away}
                          </h2>

                          <p className="mt-2 text-sm text-white/40">
                            {tip.market}:{" "}
                            <span className="text-white/70">
                              {tip.selection}
                            </span>
                          </p>
                        </div>

                        {/* Status */}
                        <div
                          className={`w-fit shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide ${statusClasses(
                            tip.status,
                          )}`}
                        >
                          {statusLabel(tip.status)}
                        </div>
                      </div>

                      {/* Data */}
                      <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-5">

                        <div>
                          <div className="text-xs text-white/30">
                            Quote
                          </div>

                          <div className="mt-1 font-semibold">
                            {tip.odds.toFixed(2)}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-white/30">
                            Modell
                          </div>

                          <div className="mt-1 font-semibold">
                            {formatProbability(
                              tip.model_probability,
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-white/30">
                            Fair Odds
                          </div>

                          <div className="mt-1 font-semibold">
                            {tip.fair_odds !== null
                              ? tip.fair_odds.toFixed(2)
                              : "–"}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-white/30">
                            Value
                          </div>

                          <div className="mt-1 font-semibold">
                            {formatValue(tip.value)}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-white/30">
                            Ergebnis
                          </div>

                          <div className="mt-1 font-semibold">
                            {tip.result_home !== null &&
                            tip.result_away !== null
                              ? `${tip.result_home}:${tip.result_away}`
                              : "–"}
                          </div>
                        </div>
                      </div>

                      {/* Profit / Loss */}
                      {tip.profit_loss !== null && (
                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                          <span className="text-sm text-white/35">
                            Ergebnis
                          </span>

                          <span
                            className={`text-sm font-semibold ${
                              tip.profit_loss > 0
                                ? "text-green-300"
                                : tip.profit_loss < 0
                                  ? "text-red-300"
                                  : "text-white/50"
                            }`}
                          >
                            {tip.profit_loss > 0 ? "+" : ""}
                            {tip.profit_loss.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Information */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                ZEVYQ Track Record
              </div>

              <h2 className="mt-3 text-xl font-semibold">
                Transparente Tipp-Historie
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-white/40">
                Die Einträge dieser Seite stammen direkt aus der
                ZEVYQ-Track-Record-Datenbank. Neue qualifizierte Tipps
                werden dort automatisch gespeichert. Der Status eines
                offenen Tipps kann später durch die Backend-Abrechnung
                automatisch aktualisiert werden.
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-xs">
                <div className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-green-300">
                  Backend verbunden
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/40">
                  {statistics.total} Einträge
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/40">
                  V5.6 Track Record
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}