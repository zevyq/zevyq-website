"use client";

import { authStorage } from "../../auth-storage";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type AccessState = "loading" | "premium" | "free" | "error";

type UserResponse = {
  success?: boolean;
  user?: {
    plan?: string;
  };
  detail?: string;
};

export default function PremiumGate({
  children,
  title = "ZEVYQ Premium erforderlich",
  description = "Dieser Bereich ist exklusiv für ZEVYQ Premium verfügbar.",
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) {
  const pathname = usePathname();
  const [access, setAccess] = useState<AccessState>("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setAccess("loading");
    setError("");

    async function verifyAccess() {
      try {
        const storedUser = authStorage.getItem("zevyq_user");
        const token = authStorage.getItem("zevyq_access_token");

        if (!storedUser || !token) {
          if (active) {
            setAccess("free");
          }
          return;
        }

        const parsedUser = JSON.parse(storedUser) as {
          user_id?: string;
        };

        if (!parsedUser.user_id) {
          if (active) {
            setAccess("free");
          }
          return;
        }

        const response = await fetch(
          `${API_URL}/users/${encodeURIComponent(parsedUser.user_id)}`,
          {
            cache: "no-store",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = (await response.json().catch(() => null)) as
          | UserResponse
          | null;

        if (response.status === 401) {
          throw new Error("Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.");
        }

        if (!response.ok || !data?.success || !data.user) {
          throw new Error(
            data?.detail || "Dein Mitgliedsstatus konnte nicht geprüft werden.",
          );
        }

        const plan = String(data.user.plan || "FREE").toUpperCase();

        if (active) {
          setAccess(
            plan === "PRO" || plan.includes("PREMIUM")
              ? "premium"
              : "free",
          );
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Dein Mitgliedsstatus konnte nicht geprüft werden.",
          );
          setAccess("error");
        }
      }
    }

    void verifyAccess();

    return () => {
      active = false;
    };
  }, [pathname]);

  if (access === "loading") {
    return (
      <div className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-sm text-white/50">
            Mitgliedsstatus wird geprüft...
          </div>
        </div>
      </div>
    );
  }

  if (access === "error") {
    return (
      <div className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-8">
            <h1 className="text-xl font-semibold">
              Zugriff konnte nicht geprüft werden
            </h1>
            <p className="mt-3 text-sm text-white/50">{error}</p>
            <Link
              href="/login"
              className="mt-6 inline-flex rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium transition hover:bg-white/10"
            >
              Zur Anmeldung
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (access === "free") {
    return (
      <div className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/70">
              Premium
            </div>
            <h1 className="mt-3 text-2xl font-semibold">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
              {description}
            </p>
            <Link
              href="/settings"
              className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Premium ansehen
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
