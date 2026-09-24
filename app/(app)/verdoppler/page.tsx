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
  tips?: Tip[];
};

function normalizeCategory(category: string) {
  return category.trim().toUpperCase();
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

export default function VerdopplerPage() {
  const [tips, setTips] = useState<Tip[]>([]);
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
            : "Die Daten konnten nicht geladen werden.",
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

  const verdopplerTips = useMemo(() => {
    return tips.filter(
      (tip) => normalizeCategory(tip.category) === "VERDOPPLER",
    );
  }, [tips]);

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
                Verdoppler
              </h1>

              <p className="mt-3 max-w-3xl text-white/45">
                Die von der ZEVYQ V5.6 Engine qualifizierte
                Zwei-Tipp-Kombination für die Verdoppler-Strategie.
              </p>
            </div>

            <button
              type="button"
              onClick={loadTips}
              disabled={loading}
              className="w-fit rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Aktualisiere..." : "Daten aktualisieren"}
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
            {verdopplerTips.length} Verdoppler
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

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="text-sm text-white/40">
              ZEVYQ V5.6 prüft aktuell die Verdoppler-Kombination...
            </div>
          </div>
        )}

        {/* No Verdoppler */}
        {!loading && !error && verdopplerTips.length === 0 && (
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.03] p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400/70">
              Aktuell kein Verdoppler
            </div>

            <h2 className="mt-3 text-2xl font-semibold">
              Keine qualifizierte Verdoppler-Kombination vorhanden
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/40">
              Die aktuelle ZEVYQ V5.6 Analyse hat für den aktuellen
              Analysezeitraum keinen Markt als Verdoppler qualifiziert.
              Deshalb wird bewusst keine künstliche Kombination aus
              einzelnen Tipps erstellt.
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div className="text-sm font-medium">
                ZEVYQ Qualitätsprinzip
              </div>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Ein Verdoppler wird erst angezeigt, wenn die Backend-Engine
                die dafür erforderlichen Märkte tatsächlich als
                Verdoppler qualifiziert.
              </p>
            </div>
          </div>
        )}

        {/* Verdoppler */}
        {!loading && !error && verdopplerTips.length > 0 && (
          <div className="space-y-6">
            {verdopplerTips.map((tip, index) => (
              <a
                key={tip.id}
                href={`/tips/${tip.id}`}
                className="group block rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                {/* Combination Header */}
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                      Verdoppler #{index + 1}
                    </div>

                    <h2 className="mt-3 text-2xl font-bold tracking-tight">
                      {tip.home} – {tip.away}
                    </h2>

                    <p className="mt-2 text-sm text-white/40">
                      {tip.market}:{" "}
                      <span className="text-white/70">
                        {tip.selection}
                      </span>
                    </p>
                  </div>

                  <div className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium">
                    VERDOPPLER
                  </div>
                </div>

                {/* Main Data */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs uppercase tracking-[0.15em] text-white/30">
                      Quote
                    </div>

                    <div className="mt-3 text-2xl font-bold">
                      {tip.odds.toFixed(2)}
                    </div>

                    <p className="mt-2 text-xs text-white/30">
                      Aktuell verfügbare Quote
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs uppercase tracking-[0.15em] text-white/30">
                      Modell
                    </div>

                    <div className="mt-3 text-2xl font-bold">
                      {formatProbability(tip.model_probability)}
                    </div>

                    <p className="mt-2 text-xs text-white/30">
                      Modellwahrscheinlichkeit
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs uppercase tracking-[0.15em] text-white/30">
                      Fair Odds
                    </div>

                    <div className="mt-3 text-2xl font-bold">
                      {tip.fair_odds.toFixed(2)}
                    </div>

                    <p className="mt-2 text-xs text-white/30">
                      Modellbasierte Fair Odds
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs uppercase tracking-[0.15em] text-white/30">
                      Value
                    </div>

                    <div className="mt-3 text-2xl font-bold">
                      {formatValue(tip.value)}
                    </div>

                    <p className="mt-2 text-xs text-white/30">
                      Berechneter Value
                    </p>
                  </div>
                </div>

                {/* Match Information */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="flex flex-wrap gap-4 text-xs text-white/35">
                    <span>{tip.league}</span>

                    <span>•</span>

                    <span>{formatDate(tip.event_date)}</span>

                    <span>•</span>

                    <span>{formatTime(tip.event_date)}</span>

                    <span>•</span>

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
        {!loading && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-white/30">
              ZEVYQ Verdoppler
            </div>

            <h2 className="mt-3 text-xl font-semibold">
              Nur echte Engine-Ergebnisse
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-white/40">
              Die Verdoppler-Seite verwendet ausschließlich Daten, die vom
              ZEVYQ Backend als Verdoppler qualifiziert wurden. Es werden
              keine Kombinationen allein aufgrund einer Frontend-Regel
              erzeugt.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="rounded-full border border-green-500/20 bg-green-500/[0.05] px-4 py-2 text-xs text-green-300">
                Backend verbunden
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/45">
                ZEVYQ V5.6
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/45">
                Qualitätsprüfung aktiv
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}