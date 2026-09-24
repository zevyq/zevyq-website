"use client";

import { useEffect, useState } from "react";

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
  tip_count: number;
  tips: Tip[];
};

function formatProbability(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatKickoff(date: string) {
  return new Date(date).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ValuePage() {
  const [tips, setTips] = useState<Tip[]>([]);
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

        const valueTips = (data.tips || []).filter(
          (tip) => tip.category.toUpperCase() === "VALUE",
        );

        setTips(valueTips);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Die Value-Tipps konnten nicht geladen werden.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadTips();
  }, []);

  const averageProbability =
    tips.length > 0
      ? tips.reduce((sum, tip) => sum + tip.model_probability, 0) /
        tips.length
      : 0;

  const averageValue =
    tips.length > 0
      ? tips.reduce((sum, tip) => sum + tip.value, 0) / tips.length
      : 0;

  const highestValue =
    tips.length > 0
      ? Math.max(...tips.map((tip) => tip.value))
      : 0;

  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            ZEVYQ Intelligence
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Value Tipps
          </h1>

          <p className="mt-3 max-w-3xl text-white/45">
            Märkte mit einem vom ZEVYQ-Modell berechneten positiven Value
            gegenüber der verfügbaren Quote.
          </p>
        </div>

        {/* Status */}
        <div className="mb-8 flex flex-wrap gap-3">
          <div className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-sm text-green-300">
            {loading
              ? "KI-Analyse läuft…"
              : "Live mit ZEVYQ Backend verbunden"}
          </div>

          {!loading && !error && (
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
              {tips.length} Value-Tipp{tips.length === 1 ? "" : "s"}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">
            <div className="text-sm font-medium text-red-300">
              Value-Tipps konnten nicht geladen werden
            </div>

            <p className="mt-2 text-sm leading-6 text-red-200/60">
              {error}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              Value Tipps
            </div>

            <div className="mt-3 text-3xl font-bold">
              {loading ? "…" : tips.length}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Aktuell qualifizierte Value-Tipps
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
              Die Value-Märkte werden geladen.
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && tips.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
            <div className="text-lg font-semibold">
              Aktuell kein Value-Tipp
            </div>

            <p className="mt-2 text-sm leading-6 text-white/35">
              Für den aktuellen Analysezeitraum wurde kein Markt als Value
              qualifiziert.
            </p>
          </div>
        )}

        {/* Value Tips */}
        {!loading && tips.length > 0 && (
          <div className="space-y-4">
            {tips.map((tip) => (
              <a
                key={tip.id}
                href={`/tips/${tip.id}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/35">
                      <span className="text-white/70">VALUE</span>
                      <span>•</span>
                      <span>{tip.league}</span>
                      <span>•</span>
                      <span>{formatKickoff(tip.event_date)} Uhr</span>
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
                        +{tip.value.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <div className="flex flex-wrap gap-4 text-xs text-white/30">
                    <span>
                      Fair Odds: {tip.fair_odds.toFixed(2)}
                    </span>

                    <span>
                      Datenqualität:{" "}
                      {Math.round(tip.data_confidence * 100)}%
                    </span>

                    {tip.value === highestValue && (
                      <span className="text-white/55">
                        Höchster Value
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

        {/* Info */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-white/30">
            Value Kategorie
          </div>

          <h2 className="mt-3 text-xl font-semibold">
            Live aus der ZEVYQ V5.6 Engine
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-white/40">
            Diese Seite zeigt ausschließlich die Tipps, die vom aktuellen
            ZEVYQ-Backend der Kategorie VALUE zugeordnet wurden. Alle Werte
            stammen direkt aus der aktuellen Analyse.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            <div className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-green-300">
              Backend verbunden
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/40">
              ZEVYQ V5.6
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}