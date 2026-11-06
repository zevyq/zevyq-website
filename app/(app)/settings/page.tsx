"use client";

import { authStorage } from "../../auth-storage";

import Link from "next/link";
import { useEffect, useState } from "react";

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

type MembershipSnapshot = {
  plan: string;
  subscription_provider?: string | null;
  subscription_period?: string | null;
  subscription_status?: string | null;
};

export default function SettingsPage() {
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [membership, setMembership] = useState<MembershipSnapshot | null>(null);
  const [membershipReady, setMembershipReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadMembership() {
      try {
        const token = authStorage.getItem("zevyq_access_token");
        const stored = authStorage.getItem("zevyq_user");
        if (!token || !stored) return;

        const user = JSON.parse(stored) as { user_id?: string };
        if (!user.user_id) return;

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "https://zevyq-backend.fly.dev";

        const response = await fetch(
          `${apiUrl}/users/${encodeURIComponent(user.user_id)}`,
          {
            cache: "no-store",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) throw new Error("Mitgliedschaft nicht abrufbar");

        const result = await response.json();
        if (!result?.user?.plan) throw new Error("Ungueltiger Mitgliedschaftsstatus");

        if (active) setMembership(result.user as MembershipSnapshot);
      } catch {
        if (active) setMembership(null);
      } finally {
        if (active) setMembershipReady(true);
      }
    }

    void loadMembership();
    return () => {
      active = false;
    };
  }, []);

  const currentMembership = String(membership?.plan || "").toUpperCase();
  const isPremiumMember =
    currentMembership === "PRO" || currentMembership.includes("PREMIUM");

  const subscriptionPeriod = String(
    membership?.subscription_period || ""
  ).toUpperCase();

  const currentPlanName = isPremiumMember
    ? subscriptionPeriod.startsWith("MONTH")
      ? "PREMIUM"
      : subscriptionPeriod.startsWith("YEAR") ||
          subscriptionPeriod.startsWith("ANNUAL")
        ? "PREMIUM JAHR"
        : null
    : membershipReady && membership
      ? "FREE"
      : null;

  async function startStripeCheckout(period: "monthly" | "yearly") {
    if (!membershipReady || !membership || isPremiumMember) {
      setPromoError(true);
      setPromoMessage(
        isPremiumMember
          ? "Du bist bereits PREMIUM. Verwalte dein Abonnement im Profil."
          : "Dein Mitgliedschaftsstatus konnte nicht geladen werden. Bitte lade die Seite neu.",
      );
      return;
    }

    const token = authStorage.getItem("zevyq_access_token");

    if (!token) {
      setPromoError(true);
      setPromoMessage("Bitte melde dich an, bevor du Premium kaufst.");
      return;
    }

    setPromoLoading(true);
    setPromoMessage("");
    setPromoError(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://zevyq-backend.fly.dev";
      const response = await fetch(`${apiUrl}/stripe/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ period }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.checkout_url) {
        throw new Error(
          result?.detail || "Der Bezahlvorgang konnte nicht gestartet werden.",
        );
      }

      window.location.assign(result.checkout_url);
    } catch (error) {
      setPromoError(true);
      setPromoMessage(
        error instanceof Error
          ? error.message
          : "Der Bezahlvorgang konnte nicht gestartet werden.",
      );
    } finally {
      setPromoLoading(false);
    }
  }
  async function redeemPromoCode() {
    const code = promoCode.trim().toUpperCase();
    if (!code || promoLoading) return;

    const token = authStorage.getItem("zevyq_access_token");
    const storedUser = authStorage.getItem("zevyq_user");

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

          {isPremiumMember && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-500/25 bg-blue-500/[0.06] px-5 py-4">
              <span className="text-sm text-white/80">
                Dein PREMIUM-Zugang ist bereits aktiv.
              </span>
              <Link
                href="/settings/profile"
                className="rounded-xl border border-blue-400/30 px-4 py-2 text-sm font-semibold text-blue-200 hover:bg-blue-500/10"
              >
                Abo verwalten
              </Link>
            </div>
          )}

          {membershipReady && !membership && (
            <p role="status" className="mb-5 text-sm text-amber-200">
              Mitgliedschaft konnte nicht geladen werden. Bitte melde dich erneut an oder lade die Seite neu.
            </p>
          )}

          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => {
              const isCurrentPlan = currentPlanName === plan.name;
              const isFeatured = isPremiumMember ? isCurrentPlan : plan.accent;

              return (
              <article
                key={plan.name}
                className="flex flex-col rounded-3xl border border-white/[0.09] bg-white/[0.02] p-6 sm:p-7"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {isCurrentPlan && (
                    <span className="mt-2 inline-block rounded-lg bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-200">
                      Dein aktueller Tarif
                    </span>
                  )}
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

                {plan.name === "FREE" ? (
                  <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm font-medium text-white/50">
                    Kostenlos
                  </div>
                ) : isPremiumMember ? (
                  <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm font-medium text-white/65">
                    {isCurrentPlan ? "Aktueller Tarif" : "Bereits PREMIUM"}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      void startStripeCheckout(
                        plan.name === "PREMIUM" ? "monthly" : "yearly",
                      )
                    }
                    disabled={promoLoading || !membershipReady || !membership}
                    className={`mt-7 w-full rounded-xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      isFeatured
                        ? "bg-blue-600 text-white hover:bg-blue-500"
                        : "border border-white/15 bg-white/[0.05] text-white hover:bg-white/10"
                    }`}
                  >
                    {promoLoading
                      ? "Bitte warten ..."
                      : plan.name === "PREMIUM"
                        ? "Monatlich abonnieren"
                        : "Jahresabo abschließen"}
                  </button>
                )}
              </article>
              );
            })}
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
