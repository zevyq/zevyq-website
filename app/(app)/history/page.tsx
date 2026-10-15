"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type AuthUser = {
  user_id: string;
};

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

type PersonalBet = {
  id: number;
  user_id: string;
  tip_id: string;
  stake: number;
  status: string;
  result_home: number | null;
  result_away: number | null;
  profit_loss: number | null;
  created_at: string;
  event_date: string | null;
  settled_at: string | null;
  home: string;
  away: string;
  league: string | null;
  category: string | null;
  market: string;
  selection: string;
  odds: number;
  model_probability: number;
  value: number | null;
};

type TrackRecordResponse = {
  success: boolean;
  count: number;
  tips: TrackRecordTip[];
};

type PersonalBetsResponse = {
  success: boolean;
  count: number;
  bets: PersonalBet[];
};

type HistoryTip = {
  id: number;
  tip_id: string;
  event_date: string | null;
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
  profit_loss: number | null;
  stake: number | null;
};

type Filter = "ALLE" | "OFFEN" | "GEWONNEN" | "VERLOREN" | "VOID";

function formatDate(date: string | null) {
  if (!date) return "–";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "–";
  return parsed.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatKickoff(date: string | null) {
  if (!date) return "–";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "–";
  return parsed.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatProbability(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatValue(value: number | null) {
  if (value === null || value === undefined) return "–";
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
  const [tips, setTips] = useState<HistoryTip[]>([]);
  const [filter, setFilter] = useState<Filter>("ALLE");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [personalMode, setPersonalMode] = useState(false);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let storedUser: AuthUser | null = null;
      let token: string | null = null;

      try {
        const rawUser = localStorage.getItem("zevyq_user");
        if (rawUser) {
          const parsed = JSON.parse(rawUser) as Partial<AuthUser>;
          if (typeof parsed.user_id === "string" && parsed.user_id.trim()) {
            storedUser = { user_id: parsed.user_id };
          }
        }
        token = localStorage.getItem("zevyq_access_token");
      } catch {
        throw new Error("Deine Anmeldedaten konnten nicht gelesen werden. Bitte melde dich erneut an.");
      }

      if (storedUser && token) {
        setPersonalMode(true);
        const response = await fetch(
          `${API_URL}/users/${encodeURIComponent(storedUser.user_id)}/bets?limit=100`,
          {
            cache: "no-store",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Deine Anmeldung ist abgelaufen oder nicht gültig. Bitte melde dich erneut an.");
          }
          throw new Error(`Deine persönlichen Einsätze konnten nicht geladen werden (HTTP ${response.status}).`);
        }

        const data = (await response.json()) as PersonalBetsResponse;
        if (!data.success || !Array.isArray(data.bets)) {
          throw new Error("Das Backend hat keine gültige persönliche Tipp-Historie zurückgegeben.");
        }

        setTips(
          data.bets.map((bet) => ({
            id: bet.id,
            tip_id: bet.tip_id,
            event_date: bet.event_date ?? bet.created_at,
            league: bet.league,
            category: bet.category,
            home: bet.home,
            away: bet.away,
            market: bet.market,
            selection: bet.selection,
            odds: Number(bet.odds) || 0,
            model_probability: Number(bet.model_probability) || 0,
            fair_odds:
              Number(bet.model_probability) > 0
                ? 1 / Number(bet.model_probability)
                : null,
            value: bet.value,
            status: bet.status,
            result_home: bet.result_home,
            result_away: bet.result_away,
            profit_loss: bet.profit_loss,
            stake: bet.stake,
          })),
        );
        return;
      }

      setPersonalMode(false);
      const response = await fetch(`${API_URL}/track-record?limit=100`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Der öffentliche Track Record konnte nicht geladen werden.");
      }

      const data = (await response.json()) as TrackRecordResponse;
      if (!data.success || !Array.isArray(data.tips)) {
        throw new Error("Das ZEVYQ Backend hat keinen gültigen Track Record zurückgegeben.");
      }

      setTips(
        data.tips.map((tip) => ({
          id: tip.id,
          tip_id: tip.tip_id,
          event_date: tip.event_date,
          league: tip.league,
          category: tip.category,
          home: tip.home,
          away: tip.away,
          market: tip.market,
          selection: tip.selection,
          odds: tip.odds,
          model_probability: tip.model_probability,
          fair_odds: tip.fair_odds,
          value: tip.value,
          status: tip.status,
          result_home: tip.result_home,
          result_away: tip.result_away,
          profit_loss: tip.profit_loss,
          stake: null,
        })),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Die Tipp-Historie konnte nicht geladen werden.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  const filteredTips = useMemo(() => {
    if (filter === "ALLE") return tips;
    return tips.filter((tip) => tip.status.toUpperCase() === filter);
  }, [tips, filter]);

  const statistics = useMemo(() => {
    const won = tips.filter((tip) => tip.status.toUpperCase() === "GEWONNEN").length;
    const lost = tips.filter((tip) => tip.status.toUpperCase() === "VERLOREN").length;
    const open = tips.filter((tip) => tip.status.toUpperCase() === "OFFEN").length;
    const voidCount = tips.filter((tip) => tip.status.toUpperCase() === "VOID").length;
    const settled = won + lost;
    const hitRate = settled > 0 ? (won / settled) * 100 : null;
    const profitLoss = tips.reduce((sum, tip) => sum + (tip.profit_loss ?? 0), 0);

    return { total: tips.length, won, lost, open, voidCount, settled, hitRate, profitLoss };
  }, [tips]);

  const filterCounts = useMemo(
    () => ({
      ALLE: tips.length,
      OFFEN: tips.filter((tip) => tip.status.toUpperCase() === "OFFEN").length,
      GEWONNEN: tips.filter((tip) => tip.status.toUpperCase() === "GEWONNEN").length,
      VERLOREN: tips.filter((tip) => tip.status.toUpperCase() === "VERLOREN").length,
      VOID: tips.filter((tip) => tip.status.toUpperCase() === "VOID").length,
    }),
    [tips],
  );

  return (
    <section className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            ZEVYQ Intelligence
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Tipp-Historie
          </h1>
          <p className="mt-3 max-w-3xl text-white/45">
            {personalMode
              ? "Deine persönlich gespeicherten Einsätze mit aktuellem Status."
              : "Der öffentliche ZEVYQ Track Record mit veröffentlichten KI-Tipps und deren Status."}
          </p>
        </div>

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
              ? "Tipp-Historie wird geladen…"
              : error
                ? "Historie konnte nicht geladen werden"
                : personalMode
                  ? "Persönliches Konto verbunden"
                  : "Öffentlicher Track Record"}
          </div>
          {!loading && !error && (
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
              {tips.length} {personalMode ? "persönliche Einsätze" : "veröffentlichte Tipps"}
            </div>
          )}
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">
            <div className="text-sm font-medium text-red-300">
              Tipp-Historie konnte nicht geladen werden
            </div>
            <p className="mt-2 text-sm leading-6 text-red-200/60">{error}</p>
            <button
              type="button"
              onClick={() => void loadHistory()}
              className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Erneut versuchen
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">Einträge gesamt</div>
                <div className="mt-4 text-3xl font-bold">{statistics.total}</div>
                <p className="mt-2 text-sm text-white/35">
                  {personalMode ? "In deinem Konto gespeichert" : "Im öffentlichen Track Record"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">Gewonnen</div>
                <div className="mt-4 text-3xl font-bold text-green-300">{statistics.won}</div>
                <p className="mt-2 text-sm text-white/35">Aktuell als gewonnen erfasst</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">Trefferquote</div>
                <div className="mt-4 text-3xl font-bold">
                  {statistics.hitRate !== null ? `${statistics.hitRate.toFixed(1)}%` : "–"}
                </div>
                <p className="mt-2 text-sm text-white/35">Nur abgeschlossene Tipps</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-white/30">
                  {personalMode ? "Gewinn / Verlust" : "Offene Tipps"}
                </div>
                <div className={`mt-4 text-3xl font-bold ${personalMode && statistics.profitLoss > 0 ? "text-green-300" : personalMode && statistics.profitLoss < 0 ? "text-red-300" : ""}`}>
                  {personalMode
                    ? `${statistics.profitLoss > 0 ? "+" : ""}${statistics.profitLoss.toFixed(2)} €`
                    : statistics.open}
                </div>
                <p className="mt-2 text-sm text-white/35">
                  {personalMode ? "Summe der erfassten Einsatzergebnisse" : "Noch offene Tipps"}
                </p>
              </div>
            </div>

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
                  {label} <span className="ml-1 opacity-60">{filterCounts[value]}</span>
                </button>
              ))}
            </div>

            <div className="mt-8">
              {filteredTips.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
                  <div className="text-lg font-semibold">Keine Einträge vorhanden</div>
                  <p className="mt-2 text-sm text-white/35">
                    Für diesen Filter gibt es aktuell keine Einträge.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTips.map((tip) => (
                    <div
                      key={`${tip.id}-${tip.tip_id}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                    >
                      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3 text-xs text-white/35">
                            <span className="font-medium text-white/65">{tip.category || "ZEVYQ TIP"}</span>
                            <span>•</span>
                            <span>{tip.league || "Unbekannter Wettbewerb"}</span>
                            <span>•</span>
                            <span>{formatDate(tip.event_date)}</span>
                            {personalMode && tip.stake !== null && (
                              <>
                                <span>•</span>
                                <span>Einsatz: {tip.stake.toFixed(2)} €</span>
                              </>
                            )}
                          </div>
                          <h2 className="mt-3 text-xl font-semibold">
                            {tip.home} – {tip.away}
                          </h2>
                          <p className="mt-2 text-sm text-white/40">
                            {tip.market}: <span className="text-white/70">{tip.selection}</span>
                          </p>
                        </div>
                        <div className={`w-fit shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide ${statusClasses(tip.status)}`}>
                          {statusLabel(tip.status)}
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-5">
                        <div>
                          <div className="text-xs text-white/30">Quote</div>
                          <div className="mt-1 font-semibold">{tip.odds.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/30">Modell</div>
                          <div className="mt-1 font-semibold">{formatProbability(tip.model_probability)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/30">Fair Odds</div>
                          <div className="mt-1 font-semibold">{tip.fair_odds !== null ? tip.fair_odds.toFixed(2) : "–"}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/30">Value</div>
                          <div className="mt-1 font-semibold">{formatValue(tip.value)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/30">Ergebnis</div>
                          <div className="mt-1 font-semibold">
                            {tip.result_home !== null && tip.result_away !== null
                              ? `${tip.result_home}:${tip.result_away}`
                              : "–"}
                          </div>
                        </div>
                      </div>

                      {tip.profit_loss !== null && (
                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                          <span className="text-sm text-white/35">
                            {personalMode ? "Dein Gewinn / Verlust" : "Ergebnis"}
                          </span>
                          <span className={`text-sm font-semibold ${tip.profit_loss > 0 ? "text-green-300" : tip.profit_loss < 0 ? "text-red-300" : "text-white/50"}`}>
                            {tip.profit_loss > 0 ? "+" : ""}{tip.profit_loss.toFixed(2)} €
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                {personalMode ? "Persönliche Tipp-Historie" : "ZEVYQ Track Record"}
              </div>
              <h2 className="mt-3 text-xl font-semibold">
                {personalMode ? "Deine gespeicherten Einsätze" : "Transparente Tipp-Historie"}
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-white/40">
                {personalMode
                  ? "Diese Einträge stammen aus deinem persönlichen ZEVYQ-Konto. Es werden nur Einsätze angezeigt, die im Backend gespeichert und einem veröffentlichten Tipp zugeordnet sind. Ältere, ausschließlich lokal gespeicherte Einträge können hier fehlen."
                  : "Diese Einträge stammen direkt aus der ZEVYQ-Track-Record-Datenbank. Neue qualifizierte Tipps werden dort automatisch gespeichert. Der Status offener Tipps kann durch die Backend-Abrechnung aktualisiert werden."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs">
                <div className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-green-300">
                  Backend verbunden
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/40">
                  {statistics.total} Einträge
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/40">
                  {personalMode ? "Persönliche Einsätze" : "V5.6 Track Record"}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
