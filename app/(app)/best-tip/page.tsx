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
  source?: string;
  analysis_date_from?: string;
  analysis_date_to?: string;
  tip_count?: number;
  tips?: Tip[];
};

const categories = [
  "ALLE",
  "SAFE",
  "VALUE",
  "VERDOPPLER",
  "BEST TIP",
];

function normalizeCategory(category: string) {
  return category.trim().toUpperCase();
}

function formatCategory(category: string) {
  const normalized = normalizeCategory(category);

  if (normalized === "BEST TIP") return "BEST TIP";
  if (normalized === "SAFE") return "SAFE";
  if (normalized === "VALUE") return "VALUE";
  if (normalized === "VERDOPPLER") return "VERDOPPLER";

  return normalized;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "–";
  }

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatTime(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "–";
  }

  return (
    new Intl.DateTimeFormat("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Berlin",
    }).format(date) + " Uhr"
  );
}

function formatProbability(probability: number) {
  return `${(probability * 100).toFixed(1)}%`;
}

function formatValue(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export default function TipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALLE");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTips() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/analysis/tips`, {
        method: "GET",
        cache: "no-store",
      });

      const data: TipsResponse = await response.json().catch(() => ({
        success: false,
      }));

      if (!response.ok || !data.success) {
        throw new Error(
          "Die aktuellen ZEVYQ-Tipps konnten nicht geladen werden.",
        );
      }

      setTips(data.tips ?? []);
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          "Das ZEVYQ-Backend ist aktuell nicht erreichbar. Bitte stelle sicher, dass der Backend-Server läuft.",
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Die Tipps konnten nicht geladen werden.",
        );
      }

      setTips([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTips();
  }, []);

  const filteredTips = useMemo(() => {
    if (selectedCategory === "ALLE") {
      return tips;
    }

    return tips.filter(
      (tip) =>
        normalizeCategory(tip.category) ===
        normalizeCategory(selectedCategory),
    );
  }, [tips, selectedCategory]);

  const averageProbability = useMemo(() => {
    if (filteredTips.length === 0) {
      return 0;
    }

    const total = filteredTips.reduce(
      (sum, tip) => sum + tip.model_probability,
      0,
    );

    return (total / filteredTips.length) * 100;
  }, [filteredTips]);

  const averageValue = useMemo(() => {
    if (filteredTips.length === 0) {
      return 0;
    }

    const total = filteredTips.reduce(
      (sum, tip) => sum + tip.value,
      0,
    );

    return total / filteredTips.length;
  }, [filteredTips]);

  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            ZEVYQ Intelligence
          </div>

          <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                KI-Tipps
              </h1>

              <p className="mt-3 max-w-3xl text-white/45">
                Alle aktuell von der ZEVYQ V5.6 Engine qualifizierten
                Wettmärkte und Empfehlungen.
              </p>
            </div>

            <button
              type="button"
              onClick={loadTips}
              disabled={loading}
              className="w-fit rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Aktualisiere..." : "Tipps aktualisieren"}
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div
            className={`rounded-full border px-4 py-2 text-sm ${
              error
                ? "border-red-500/20 bg-red-500/[0.05] text-red-300"
                : "border-green-500/20 bg-green-500/[0.05] text-green-300"
            }`}
          >
            {error
              ? "Backend-Verbindung prüfen"
              : "Live mit ZEVYQ Backend verbunden"}
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/45">
            {tips.length} gespeicherte Tipps
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">
            <div className="text-sm font-medium text-red-300">
              Fehler beim Laden
            </div>

            <p className="mt-2 text-sm leading-6 text-white/40">
              {error}
            </p>

            <button
              type="button"
              onClick={loadTips}
              className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium transition hover:bg-white/[0.08]"
            >
              Erneut versuchen
            </button>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-white/[0.02] text-white/45 hover:border-white/20 hover:text-white"
                }`}
              >
                {category === "ALLE"
                  ? `Alle ${tips.length}`
                  : category}
              </button>
            );
          })}
        </div>

        {/* Summary */}
        {!loading && filteredTips.length > 0 && (
          <div className="mb-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                Tipps
              </div>

              <div className="mt-4 text-3xl font-bold">
                {filteredTips.length}
              </div>

              <p className="mt-2 text-sm text-white/35">
                Aktuell qualifizierte Tipps
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                Ø Modell
              </div>

              <div className="mt-4 text-3xl font-bold">
                {averageProbability.toFixed(1)}%
              </div>

              <p className="mt-2 text-sm text-white/35">
                Durchschnittliche Modellwahrscheinlichkeit
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                Ø Value
              </div>

              <div className="mt-4 text-3xl font-bold">
                {averageValue >= 0 ? "+" : ""}
                {averageValue.toFixed(1)}%
              </div>

              <p className="mt-2 text-sm text-white/35">
                Durchschnittlicher berechneter Value
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="text-sm text-white/40">
              ZEVYQ V5.6 analysiert die aktuellen Märkte...
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredTips.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="text-xs uppercase tracking-[0.2em] text-white/30">
              Keine Tipps
            </div>

            <h2 className="mt-3 text-xl font-semibold">
              Keine Tipps in dieser Kategorie
            </h2>

            <p className="mt-2 text-sm text-white/35">
              Für den aktuellen Analysezeitraum wurde kein qualifizierter
              Tipp in dieser Kategorie gefunden.
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
                            ? "font-semibold text-white/70"
                            : ""
                        }
                      >
                        {formatCategory(tip.category)}
                      </span>

                      <span>•</span>

                      <span>{tip.league}</span>

                      <span>•</span>

                      <span>{formatDate(tip.event_date)}</span>

                      <span>•</span>

                      <span>{formatTime(tip.event_date)}</span>
                    </div>

                    <h2 className="mt-3 text-xl font-semibold tracking-tight">
                      {tip.home} – {tip.away}
                    </h2>

                    <p className="mt-2 text-sm text-white/40">
                      {tip.market}:{" "}
                      <span className="text-white/70">
                        {tip.selection}
                      </span>
                    </p>
                  </div>

                  {/* Stats */}
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
                        {formatValue(tip.value)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="flex flex-wrap gap-4 text-xs text-white/30">
                    <span>
                      Fair Odds:{" "}
                      <span className="text-white/55">
                        {tip.fair_odds.toFixed(2)}
                      </span>
                    </span>

                    <span>
                      Datenqualität:{" "}
                      <span className="text-white/55">
                        {Math.round(tip.data_confidence * 100)}%
                      </span>
                    </span>

                    {tip.value >= 20 && (
                      <span className="text-white/60">
                        Höherer Value
                      </span>
                    )}
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
        {!loading && tips.length > 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-white/30">
              ZEVYQ Analyse
            </div>

            <h2 className="mt-3 text-xl font-semibold">
              Live-Daten aus der ZEVYQ V5.6 Engine
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-white/40">
              Die dargestellten Tipps werden direkt aus dem ZEVYQ Backend
              geladen. Die Detailseite eines Tipps enthält die zugehörigen
              Marktdaten, Modellwahrscheinlichkeit, Fair Odds und den
              berechneten Value.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="rounded-full border border-green-500/20 bg-green-500/[0.05] px-4 py-2 text-xs text-green-300">
                Backend verbunden
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/45">
                ZEVYQ V5.6
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/45">
                Live-Tipps
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}