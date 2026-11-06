"use client";

import { authStorage } from "../../auth-storage";

import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001";

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
  published_tips?: Tip[];
  user_plan?: string;
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

export default function SafePage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPremium, setIsPremium] = useState<boolean | null>(null);

  useEffect(() => {
    async function loadTips() {
      try {
        setLoading(true);
        setError("");

        const token = authStorage.getItem("zevyq_access_token");
        const response = await fetch(`${API_URL}/analysis/tips`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Die ZEVYQ-Tipps konnten nicht geladen werden.");
        }

        const data = (await response.json()) as TipsResponse;

        if (!data.success) {
          throw new Error("Die ZEVYQ-Analyse war nicht erfolgreich.");
        }

        const plan = String(data.user_plan ?? "").toUpperCase();
        const premium = plan.includes("PREMIUM") || plan === "PRO";
        setIsPremium(premium);

        if (!premium) {
          setTips([]);
          return;
        }

        const safeTips = (data.published_tips ?? data.tips ?? []).filter(
          (tip) => tip.category.toUpperCase() === "SAFE",
        );

        setTips(safeTips);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Die Safe-Tipps konnten nicht geladen werden.",
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

  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            ZEVYQ Intelligence
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Safe Tipps
          </h1>

          <p className="mt-3 max-w-3xl text-white/45">
            Die aktuell von der ZEVYQ V5.6 Engine als Safe qualifizierten
            Märkte.
          </p>
        </div>

        {/* Status */}
        <div className="mb-8 flex flex-wrap gap-3">
          <div className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-sm text-green-300">
            {loading
              ? "KI-Analyse läuft…"
              : "Live mit ZEVYQ Backend verbunden"}
          </div>

          {!loading && !error && isPremium === true && (
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
              {tips.length} Safe-Tipp{tips.length === 1 ? "" : "s"}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">
            <div className="text-sm font-medium text-red-300">
              Safe-Tipps konnten nicht geladen werden
            </div>

            <p className="mt-2 text-sm leading-6 text-red-200/60">
              {error}
            </p>
          </div>
        )}

        {/* Premium Lock */}
        {!loading && !error && isPremium === false && (
          <div className="mb-8 rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.08] p-3 text-amber-300">
                <span aria-hidden="true">🔒</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Safe-Tipps sind Premium</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                  Mit ZEVYQ Premium erhältst du Zugriff auf die Safe-Tipps und die weiteren Tipp-Kategorien. Dein täglicher Free-Tipp bleibt weiterhin verfügbar.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        {isPremium === true && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-white/30">
              Safe Tipps
            </div>

            <div className="mt-3 text-3xl font-bold">
              {loading ? "…" : tips.length}
            </div>

            <p className="mt-2 text-sm text-white/35">
              Aktuell qualifizierte Safe-Tipps
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

        )}
        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
            <div className="text-lg font-semibold">
              ZEVYQ analysiert aktuelle Spiele…
            </div>

            <p className="mt-2 text-sm text-white/35">
              Die Safe-Märkte werden geladen.
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && isPremium === true && tips.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
              ZEVYQ QUALITY CHECK
            </div>
            <h2 className="mt-3 text-xl font-semibold">
              Aktuell kein qualifizierter Safe-Tipp
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/40">
              Die ZEVYQ-Engine hat im aktuellen Analysezeitraum keinen Safe-Tipp qualifiziert.
            </p>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-left">
              <div className="text-sm font-medium">Qualit&auml;t vor Quantit&auml;t</div>
              <p className="mt-2 text-sm leading-6 text-white/35">
                Wir zeigen nur Tipps an, welche die Qualit&auml;tskriterien der Engine erf&uuml;llen. Es werden keine Tipps k&uuml;nstlich erzeugt.
              </p>
            </div>
          </div>
        )}

        {/* Safe Tips */}
        {!loading && isPremium === true && tips.length > 0 && (
          <div className="space-y-4">
            {tips.map((tip) => (
              <a
                key={tip.id}
                href={`/tips/${tip.id}`}
                className="group block rounded-2xl border border-[#159A62]/80 bg-white/[0.02] p-6 transition hover:border-[#159A62] hover:bg-white/[0.04]"
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/35">
                      <span className="text-white/70">SAFE</span>
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
            Safe Kategorie
          </div>

          <h2 className="mt-3 text-xl font-semibold">
            Live aus der ZEVYQ V5.6 Engine
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-white/40">
            Diese Seite zeigt ausschließlich die Tipps, die vom aktuellen
            ZEVYQ-Backend der Kategorie SAFE zugeordnet wurden. Es werden
            keine separaten Demo-Daten verwendet.
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



