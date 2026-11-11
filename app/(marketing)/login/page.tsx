"use client";

import { authStorage, saveAuthSession } from "../../auth-storage";

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

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const registrationEnabled = true;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("verification") === "1") {
      setVerificationPending(true);
    }
    if (registrationEnabled && params.get("mode") === "register") {
      setMode("register");
    }
  }, [registrationEnabled]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("verification") === "1" || params.get("mode") === "register") {
      return;
    }

    let cancelled = false;

    async function restoreSavedSession() {
      try {
        const storedUser = authStorage.getItem("zevyq_user");
        const token = authStorage.getItem("zevyq_access_token");
        if (!storedUser || !token) return;

        const parsedUser = JSON.parse(storedUser) as Partial<AuthUser>;
        if (typeof parsedUser.user_id !== "string" || !parsedUser.user_id) return;

        const response = await fetch(
          `${API_URL}/users/${encodeURIComponent(parsedUser.user_id)}`,
          {
            cache: "no-store",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!response.ok) return;

        const data = (await response.json()) as {
          success?: boolean;
          user?: { user_id?: string };
        };

        if (
          !cancelled &&
          data.success === true &&
          data.user?.user_id === parsedUser.user_id
        ) {
          window.location.replace("/dashboard");
        }
      } catch {
        // Bei Verbindungsfehlern gespeicherte Anmeldedaten nicht löschen.
      }
    }

    void restoreSavedSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [promoCode, setPromoCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendAvailableAt, setResendAvailableAt] = useState(0);
  const [resendSeconds, setResendSeconds] = useState(0);
  const busy = loading || resetLoading || resendLoading;

  useEffect(() => {
    const tick = () => setResendSeconds(Math.max(0, Math.ceil((resendAvailableAt - Date.now()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [resendAvailableAt]);

  function responseMessage(data: unknown, fallback: string): string {
    if (!data || typeof data !== "object") return fallback;
    const value = data as Record<string, unknown>;
    if (typeof value.detail === "string") return value.detail;
    if (value.detail && typeof value.detail === "object" && "message" in value.detail) {
      const message = (value.detail as Record<string, unknown>).message;
      if (typeof message === "string") return message;
    }
    return typeof value.message === "string" ? value.message : fallback;
  }

  async function postAuth(path: string, body: Record<string, string>) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 30000);
    try {
      return await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch {
      throw new Error(path === "/auth/register"
        ? "Die Serverantwort konnte nicht empfangen werden. Dein Konto könnte bereits angelegt sein. Bitte prüfe dein E-Mail-Postfach oder fordere eine Bestätigungsmail an."
        : path === "/auth/resend-verification"
          ? "Die Versandbestätigung konnte nicht empfangen werden. Bitte prüfe zuerst deinen Posteingang und den Spamordner, bevor du es erneut versuchst."
          : "Die Verbindung konnte nicht abgeschlossen werden. Bitte versuche die Anmeldung erneut.");
    } finally {
      window.clearTimeout(timer);
    }
  }

  function applyCooldown(value: unknown) {
    const seconds = Number(value);
    const wait = Number.isFinite(seconds) && seconds > 0 ? Math.min(seconds, 3600) : 60;
    setResendSeconds(Math.ceil(wait));
    setResendAvailableAt(Date.now() + wait * 1000);
  }

  async function handleResendVerification() {
    if (busy || resendSeconds > 0) return;
    const address = (verificationPending ? verificationEmail : email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }
    setError("");
    setSuccess("");
    setResendLoading(true);
    try {
      const response = await postAuth("/auth/resend-verification", { email: address });
      const data = await response.json().catch(() => null);
      if (response.status === 429) applyCooldown(response.headers.get("Retry-After"));
      if (!response.ok) throw new Error(responseMessage(data, "Die Bestätigungsmail konnte gerade nicht angefordert werden. Bitte versuche es später erneut."));
      if (!data || data.success !== true) throw new Error("Die Serverantwort war unvollständig. Bitte prüfe dein Postfach, bevor du es erneut versuchst.");
      setVerificationEmail(address);
      setVerificationPending(true);
      setSuccess(responseMessage(data, "Falls ein unbestätigtes Konto existiert, wurde eine Bestätigungsmail angefordert. Prüfe auch den Spamordner."));
      applyCooldown(data.retry_after);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Der erneute Versand ist fehlgeschlagen.");
    } finally {
      setResendLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const submittedMode = mode;
    const address = email.trim().toLowerCase();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const cleanName = displayName.trim();
      if (submittedMode === "register" && (!cleanName || cleanName.length > 80)) {
        setError("Bitte gib einen Namen mit maximal 80 Zeichen ein.");
        return;
      }
      const body: Record<string, string> = { email: address, password };
      if (submittedMode === "register") {
        body.display_name = cleanName;
        body.promo_code = promoCode.trim().toUpperCase();
      }
      const response = await postAuth(`/auth/${submittedMode}`, body);
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const message = responseMessage(data, "Die Anfrage konnte nicht verarbeitet werden. Bitte versuche es erneut.");
        if ((submittedMode === "login" && response.status === 403 && /bestätig|verifi/i.test(message)) ||
            (submittedMode === "register" && response.status === 409)) {
          setVerificationEmail(address);
          setVerificationPending(true);
          setPassword("");
          setError(submittedMode === "register"
            ? "Für diese Adresse wurde bereits eine Registrierung begonnen. Bestätige deine E-Mail-Adresse oder melde dich mit deinem bestehenden Konto an."
            : message);
          return;
        }
        if (submittedMode === "register" && response.status < 500) {
          setError(message);
          return;
        }
        throw new Error(message);
      }
      if (!data || data.success !== true) throw new Error("Die Serverantwort war unvollständig. Bitte versuche es erneut.");
      if (submittedMode === "register") {
        setVerificationEmail(address);
        setVerificationPending(true);
        setPassword("");
        setSuccess(responseMessage(data, "Bitte bestätige zuerst deine E-Mail-Adresse. Prüfe deinen Posteingang und Spamordner."));
        if (data.retry_after) applyCooldown(data.retry_after);
        return;
      }
      if (typeof data.access_token !== "string" || !data.access_token || !data.user) {
        throw new Error("Die Anmeldung konnte nicht abgeschlossen werden. Bitte melde dich erneut an.");
      }
      const user: AuthUser = data.user;
      try {
        saveAuthSession(user, data.access_token, rememberMe);
      } catch {
        throw new Error("Die Anmeldung konnte im Browser nicht gespeichert werden. Bitte prüfe deine Browser-Einstellungen.");
      }
      setSuccess("Login erfolgreich. Du wirst zum Dashboard weitergeleitet.");
      window.location.assign("/dashboard");
    } catch (err) {
      if (submittedMode === "register") {
        setVerificationEmail(address);
        setVerificationPending(true);
      }
      setError(err instanceof Error ? err.message : "Die Anfrage ist fehlgeschlagen. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Bitte gib zuerst deine E-Mail-Adresse ein.");
      return;
    }

    if (busy) return;
    setResetLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.detail || "Die Anfrage konnte nicht verarbeitet werden.");
      }

      setSuccess(data?.message || "Falls ein Konto zu dieser E-Mail-Adresse existiert, erhältst du eine E-Mail zum Zurücksetzen des Passworts.");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Das Backend ist aktuell nicht erreichbar. Bitte versuche es später erneut."
          : err instanceof Error
            ? err.message
            : "Die Anfrage ist fehlgeschlagen. Bitte versuche es später erneut.",
      );
    } finally {
      setResetLoading(false);
    }
  }
  function switchMode(nextMode: "login" | "register") {
    if (busy) return;
    setMode(nextMode);
    setVerificationPending(false);
    setPassword("");
    setError("");
    setSuccess("");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-10 text-center">
            <a
              href="/"
              className="inline-block text-2xl font-bold tracking-[0.25em] transition hover:opacity-80"
            >
              ZEVYQ
            </a>

            <p className="mt-2 text-xs tracking-[0.2em] text-white/35">
              AI SPORTS INTELLIGENCE
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-2xl sm:p-9">
            {/* Header */}
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                ZEVYQ Account
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight">
                {verificationPending ? "E-Mail bestätigen" : mode === "login" ? "Willkommen zurück" : "Konto erstellen"}
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/45">
                {verificationPending
                  ? "Dein Konto wird erst nach der Bestätigung deiner E-Mail-Adresse freigeschaltet."
                  : mode === "login"
                  ? "Melde dich an, um auf deine persönlichen ZEVYQ-Tipps und Statistiken zuzugreifen."
                  : "Erstelle dein kostenloses ZEVYQ-Konto. Mit Premium erhältst du zusätzlich alle Tipps, Statistiken und deine persönliche Einsatzübersicht."}
              </p>
            </div>

            {/* Registrierung vorübergehend geschlossen */}
            {!registrationEnabled && (
            <div className="mt-8 rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-center text-sm text-blue-200">
              Die Registrierung ist noch nicht freigeschaltet.
            </div>
            )}

            {verificationPending && (
              <section className="mt-8 space-y-5" aria-label="E-Mail-Bestätigung">
                <p className="text-sm leading-6 text-white/70">
                  Öffne den Bestätigungslink in deinem Postfach. Prüfe auch den Spamordner.
                  Ein Promo-Test startet erst nach der Bestätigung.
                </p>
                <div>
                  <label htmlFor="verificationEmail" className="mb-2 block text-sm font-medium text-white/70">E-Mail-Adresse</label>
                  <input id="verificationEmail" type="email" autoComplete="email" value={verificationEmail}
                    disabled={busy} onChange={(event) => { setVerificationEmail(event.target.value); setError(""); setSuccess(""); }}
                    className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-sm outline-none focus:border-white/40" />
                </div>
                {error && <p role="alert" className="text-sm leading-6 text-red-300">{error}</p>}
                {success && <p role="status" className="text-sm leading-6 text-green-300">{success}</p>}
                <button type="button" onClick={handleResendVerification} disabled={busy || resendSeconds > 0}
                  className="w-full rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50">
                  {resendLoading ? "Wird angefordert..." : resendSeconds > 0 ? `Erneut senden in ${resendSeconds} s` : "Bestätigungsmail erneut senden"}
                </button>
                <button type="button" disabled={busy} onClick={() => { setEmail(verificationEmail); switchMode("login"); }}
                  className="w-full text-sm font-semibold text-blue-300 disabled:opacity-50">E-Mail bestätigt? Zur Anmeldung</button>
                {registrationEnabled && <button type="button" disabled={busy}
                  onClick={() => { setEmail(verificationEmail); switchMode("register"); }}
                  className="w-full text-sm text-white/60 disabled:opacity-50">Adresse vertippt? Mit richtiger Adresse registrieren</button>}
                <p className="text-xs leading-5 text-white/40">Das Anfordern einer Mail ändert keine bestehende E-Mail-Adresse und kein Passwort.</p>
              </section>
            )}
            {/* Form */}
            {!verificationPending && <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {mode === "register" && (
                <div>
                  <label
                    htmlFor="displayName"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Name
                  </label>

                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(event) =>
                      setDisplayName(event.target.value)
                    }
                    placeholder="Dein Name"
                    required
                    maxLength={80}
                    autoComplete="name"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-white/30 focus:bg-white/[0.06]"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  E-Mail-Adresse
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-white/30 focus:bg-white/[0.06]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Passwort
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Passwort eingeben"
                    required
                    minLength={8}
                    autoComplete={
                      mode === "login" ? "current-password" : "new-password"
                    }
                    className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-3.5 pl-4 pr-14 text-sm outline-none transition placeholder:text-white/35 focus:border-white/40 focus:bg-white/[0.06]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                    title={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-white transition hover:bg-white/10 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400"
                  >
                    {showPassword ? (
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M3 3l18 18" />
                        <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.5 9.5 7a11.5 11.5 0 01-3.1 4.2" />
                        <path d="M6.2 6.2A12.2 12.2 0 002.5 12c1 2.5 4.5 7 9.5 7a10.7 10.7 0 004.2-.8" />
                      </svg>
                    ) : (
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {mode === "login" && (
                  <div className="mt-3 text-right">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={busy}
                      className="text-sm font-semibold text-blue-300 transition hover:text-white disabled:opacity-50"
                    >
                      {resetLoading ? "Anfrage wird gesendet..." : "Passwort vergessen?"}
                    </button>
                  </div>
                )}
                {mode === "register" && (
                  <p className="mt-2 text-xs text-white/30">
                    Das Passwort muss mindestens 8 Zeichen enthalten.
                  </p>
                )}
              </div>

              {mode === "register" && (
                <div>
                  <label htmlFor="promoCode" className="mb-2 block text-sm font-medium text-white/70">
                    Promo-Code (optional)
                  </label>
                  <input
                    id="promoCode"
                    type="text"
                    value={promoCode}
                    onChange={(event) => setPromoCode(event.target.value.toUpperCase())}
                    placeholder="Promo-Code eingeben"
                    autoCapitalize="characters"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-white/30 focus:bg-white/[0.06]"
                  />
                </div>
              )}
              {mode === "login" && (
                <div>
                  <label htmlFor="remember-me" className="flex cursor-pointer items-center gap-3 text-sm text-white/80">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={event => setRememberMe(event.target.checked)}
                      disabled={busy}
                      className="h-4 w-4 shrink-0 accent-[#6652D9]"
                    />
                    <span>Angemeldet bleiben</span>
                  </label>
                  <p className="mt-2 text-xs leading-5 text-white/40">
                    Nur auf deinem eigenen Gerät aktivieren. Die serverseitige Sitzungsdauer gilt weiterhin.
                  </p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3.5">
                  <p role="alert" className="text-sm leading-6 text-red-300">
                    {error}
                  </p>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="rounded-xl border border-green-500/20 bg-green-500/[0.06] px-4 py-3.5">
                  <p role="status" className="text-sm leading-6 text-green-300">
                    {success}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Bitte warten..."
                  : mode === "login"
                    ? "Anmelden"
                    : "Konto erstellen"}
              </button>
              <button type="button" onClick={() => { setVerificationEmail(email.trim()); setVerificationPending(true); setError(""); setSuccess(""); }}
                disabled={busy} className="w-full text-sm font-semibold text-blue-300 disabled:opacity-50">Bestätigungsmail fehlt? Erneut anfordern</button>
            </form>}

            {/* Footer information */}
            {!verificationPending && <div className="mt-7 border-t border-white/10 pt-6 text-center">
              <p className="text-sm text-white/45">
                {registrationEnabled ? (mode === "login" ? "Noch kein Konto?" : "Bereits ein Konto?") : "Die Registrierung ist noch nicht freigeschaltet."}
              </p>
              {registrationEnabled && (
                <button type="button" onClick={() => switchMode(mode === "login" ? "register" : "login")} className="mt-3 text-sm font-semibold text-blue-300 transition hover:text-blue-200">
                  {mode === "login" ? "Konto erstellen" : "Zurück zur Anmeldung"}
                </button>
              )}
            </div>}
          </div>

          {/* Bottom */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-white/25 transition hover:text-white/50"
            >
              Zurück zu ZEVYQ
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
