"use client";

import { FormEvent, useState } from "react";

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint =
        mode === "login"
          ? `${API_URL}/auth/login`
          : `${API_URL}/auth/register`;

      const body =
        mode === "login"
          ? {
              email,
              password,
            }
          : {
              email,
              password,
              display_name: displayName,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            "Die Anfrage konnte nicht verarbeitet werden.",
        );
      }

      const user: AuthUser | undefined = data?.user;

      if (user) {
        localStorage.setItem("zevyq_user", JSON.stringify(user));
      }

      if (mode === "login") {
        setSuccess("Login erfolgreich. Du wirst zum Dashboard weitergeleitet.");

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 700);
      } else {
        setSuccess(
          "Konto erfolgreich erstellt. Du kannst dich jetzt einloggen.",
        );

        setMode("login");
        setPassword("");
      }
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          "Das ZEVYQ-Backend ist aktuell nicht erreichbar. Bitte stelle sicher, dass der Backend-Server läuft.",
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Es ist ein unbekannter Fehler aufgetreten.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function switchMode(nextMode: "login" | "register") {
    setMode(nextMode);
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
                {mode === "login" ? "Willkommen zurück" : "Konto erstellen"}
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/45">
                {mode === "login"
                  ? "Melde dich an, um auf deine persönlichen ZEVYQ-Tipps und Statistiken zuzugreifen."
                  : "Erstelle dein persönliches ZEVYQ-Konto und verwalte deine Tipps, Statistik und Bankroll."}
              </p>
            </div>

            {/* Mode switch */}
            <div className="mt-8 grid grid-cols-2 rounded-xl border border-white/10 bg-black/30 p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  mode === "login"
                    ? "bg-white text-black"
                    : "text-white/45 hover:text-white"
                }`}
              >
                Anmelden
              </button>

              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  mode === "register"
                    ? "bg-white text-black"
                    : "text-white/45 hover:text-white"
                }`}
              >
                Registrieren
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-white/30 focus:bg-white/[0.06]"
                />

                {mode === "register" && (
                  <p className="mt-2 text-xs text-white/30">
                    Das Passwort muss mindestens 8 Zeichen enthalten.
                  </p>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3.5">
                  <p className="text-sm leading-6 text-red-300">
                    {error}
                  </p>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="rounded-xl border border-green-500/20 bg-green-500/[0.06] px-4 py-3.5">
                  <p className="text-sm leading-6 text-green-300">
                    {success}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Bitte warten..."
                  : mode === "login"
                    ? "Anmelden"
                    : "Konto erstellen"}
              </button>
            </form>

            {/* Footer information */}
            <div className="mt-7 border-t border-white/10 pt-6 text-center">
              {mode === "login" ? (
                <p className="text-sm text-white/35">
                  Noch kein ZEVYQ-Konto?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("register")}
                    className="font-medium text-white/70 transition hover:text-white"
                  >
                    Jetzt registrieren
                  </button>
                </p>
              ) : (
                <p className="text-sm text-white/35">
                  Bereits registriert?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="font-medium text-white/70 transition hover:text-white"
                  >
                    Zum Login
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-white/25 transition hover:text-white/50"
            >
              ← Zurück zu ZEVYQ
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}