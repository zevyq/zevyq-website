"use client";

import { useEffect, useMemo, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

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
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTips() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/analysis/tips`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Die ZEVYQ-Tipps konnten nicht geladen werden.");
        }

        const data = (await response.json()) as TipsResponse;

        if (!data.success) {
          throw new Error("Die ZEVYQ-Analyse war nicht erfolgreich.");
        }

        setTips(data.tips || []);
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
  }, []);

  const filteredTips = useMemo(() => {
    if (activeFilter === "Alle") {
      return tips;
    }

    return tips.filter(
      (tip) => normalizeCategory(tip.category) === activeFilter.toUpperCase(),
    );
  }, [tips, activeFilter]);

  const averageProbability =
    tips.length > 0
      ? tips.reduce((sum, tip) => sum + tip.model_probability, 0) / tips.length
      : 0;

  const averageValue =
    tips.length > 0
      ? tips.reduce((sum, tip) => sum + tip.value, 0) / tips.length
      : 0;

  const categoryCount = (category: string) =>
    tips.filter(
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
            {loading ? "KI-Analyse läuft…" : "Live mit ZEVYQ Backend verbunden"}
          </div>

          {!loading && !error && (
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
              {tips.length} qualifizierte Tipps
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
            {filters.map((filter) => {
              const count =
                filter === "Alle"
                  ? tips.length
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
              {loading ? "…" : tips.length}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Qualifizierte KI-Tipps
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              Ø Modell
            </div>

            <div className="mt-3 text-3xl font-bold">
              {loading
                ? "…"
                : tips.length > 0
                  ? formatProbability(averageProbability)
                  : "–"}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Durchschnittliche Modellwahrscheinlichkeit
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              Ø Value
            </div>

            <div className="mt-3 text-3xl font-bold">
              {loading
                ? "…"
                : tips.length > 0
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
              ZEVYQ analysiert aktuelle Spiele…
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
              <a
                key={tip.id}
                href={`/tips/${tip.id}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                  {/* Match */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/35">
                      <span
                        className={
                          normalizeCategory(tip.category) === "BEST TIP"
                            ? "text-white/70"
                            : ""
                        }
                      >
                        {tip.category}
                      </span>

                      <span>•</span>

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
                      {tip.market}:{" "}
                      <span className="text-white/75">
                        {tip.selection}
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
                    <span>
                      Fair Odds: {tip.fair_odds.toFixed(2)}
                    </span>

                    <span>
                      Datenqualität:{" "}
                      {Math.round(tip.data_confidence * 100)}%
                    </span>
                  </div>

                  <div className="text-sm font-medium text-white/45 transition group-hover:text-white">
                    Analyse öffnen →
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Information */}
        {!loading && !error && tips.length > 0 && (
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
                {tips.length} aktuelle Tipps
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}