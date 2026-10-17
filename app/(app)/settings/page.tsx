"use client";

import { useState } from "react";

const plans = [
  {
    name: "FREE",
    price: "0 €",
    period: "dauerhaft",
    description: "Der kostenlose Einstieg in ZEVYQ.",
    features: ["ZEVYQ kennenlernen", "Kostenloser Zugang"],
    accent: false,
  },
  {
    name: "PREMIUM",
    price: "14,99 €",
    period: "/ Monat",
    description: "Der vollständige ZEVYQ-Zugang.",
    features: [
      "Alle KI-Tipps",
      "Safe, Value und Verdoppler",
      "Best Tip",
      "Statistik und Bankroll-Tracking",
      "Tipp-Historie",
    ],
    accent: true,
  },
  {
    name: "PREMIUM JAHR",
    price: "119,99 €",
    period: "/ Jahr",
    description: "Premium-Zugang zum Jahrespreis.",
    features: [
      "Alle Premium-Funktionen",
      "Zugang für ein Jahr",
    ],
    accent: false,
  },
];

export default function SettingsPage() {
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);

  async function redeemPromoCode() {
    const code = promoCode.trim().toUpperCase();
    if (!code || promoLoading) return;

    const token = localStorage.getItem("zevyq_access_token");
    const storedUser = localStorage.getItem("zevyq_user");

    if (!token || !storedUser) {
      setPromoError(true);
      setPromoMessage("Bitte melde dich erneut an.");
      return;
    }

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch {
      setPromoError(true);
      setPromoMessage("Deine Sitzung ist ungültig. Bitte melde dich erneut an.");
      return;
    }

    if (!user?.user_id) {
      setPromoError(true);
      setPromoMessage("Dein Benutzerkonto konnte nicht erkannt werden.");
      return;
    }

    setPromoLoading(true);
    setPromoMessage("");
    setPromoError(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001";
      const response = await fetch(
        `${apiUrl}/users/${encodeURIComponent(user.user_id)}/promo/redeem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ code }),
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.detail || "Der Promo-Code konnte nicht eingelöst werden.");
      }

      setPromoCode("");
      setPromoMessage(
        `Code erfolgreich eingelöst! Premium für ${result.premium_days} Tage aktiviert.`,
      );
    } catch (error) {
      setPromoError(true);
      setPromoMessage(
        error instanceof Error
          ? error.message
          : "Der Promo-Code konnte nicht eingelöst werden.",
      );
    } finally {
      setPromoLoading(false);
    }
  }
  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <p className="mb-2 text-sm text-blue-400">ZEVYQ Konto</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Abo & Mitgliedschaft
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Entdecke die verfügbaren Mitgliedschaften und ihre Leistungen.
          </p>
        </header>

        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Unsere Tarife</h2>
            <p className="mt-1 text-sm text-white/40">
              Wähle den Zugang, der zu dir passt.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`flex flex-col rounded-3xl border p-6 sm:p-7 ${
                  plan.accent
                    ? "border-blue-500/40 bg-blue-500/[0.06]"
                    : "border-white/[0.09] bg-white/[0.02]"
                }`}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-2 min-h-10 text-sm leading-5 text-white/45">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-3xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-white/40">
                      {plan.period}
                    </span>
                  </div>

                  <div className="my-6 h-px bg-white/10" />

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-white/65"
                      >
                        <span className="mt-0.5 text-blue-400" aria-hidden="true">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`mt-7 rounded-xl px-4 py-3 text-center text-sm font-medium ${
                    plan.accent
                      ? "border border-blue-500/30 bg-blue-500/10 text-blue-300"
                      : "border border-white/10 bg-white/[0.03] text-white/50"
                  }`}
                >
                  {plan.name === "FREE" ? "Kostenlos" : "Tarifübersicht"}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/[0.09] bg-white/[0.02] p-6 sm:p-7">
          <h2 className="text-xl font-semibold">Promo-Code einlösen</h2>
          <p className="mt-2 text-sm text-white/50">
            Du hast einen Promo-Code? Gib ihn hier ein, um deinen Premium-Zugang zu aktivieren.
          </p>
          <form
            className="mt-5 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              void redeemPromoCode();
            }}
          >
            <input
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value.toUpperCase())}
              placeholder="PROMO-CODE"
              aria-label="Promo-Code"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-blue-500/60"
              maxLength={80}
            />
            <button
              type="submit"
              disabled={promoLoading || !promoCode.trim()}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {promoLoading ? "Wird eingelöst …" : "Code einlösen"}
            </button>
          </form>
          {promoMessage && (
            <p
              role="status"
              className={`mt-4 text-sm ${promoError ? "text-red-300" : "text-emerald-300"}`}
            >
              {promoMessage}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
