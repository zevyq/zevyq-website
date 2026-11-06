"use client";

import { useEffect, useState } from "react";

export default function TipEmptyStatus() {
  const [isEvening, setIsEvening] = useState(false);

  useEffect(() => {
    const update = () => {
      const hour = Number(new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        hourCycle: "h23",
      }).format(new Date()));
      setIsEvening(hour >= 21);
    };

    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      aria-label="Status der aktuellen KI-Tipps"
      className="rounded-2xl border border-[#6652D9]/30 bg-gradient-to-br from-[#211a37]/70 via-[#151321] to-[#101018] p-6 sm:p-8"
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#B8A8FF]">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#8D7BF0]" />
        ZEVYQ Intelligence
      </div>

      <h2 className="mt-5 text-xl font-bold text-white sm:text-2xl">
        {isEvening
          ? "Heute Abend sind aktuell keine spielbaren KI-Tipps verfügbar"
          : "Aktuell keine qualifizierten KI-Tipps verfügbar"}
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
        {isEvening
          ? "Momentan liegen keine spielbaren KI-Tipps vor. Neue Empfehlungen erscheinen nach einer weiteren Auswertung, sofern sie unsere Qualitätsanforderungen erfüllen."
          : "ZEVYQ veröffentlicht nur Tipps, die unsere Qualitätsanforderungen erfüllen. Neue Empfehlungen erscheinen nach einer erfolgreichen Auswertung."}
      </p>

      <div className="mt-6 rounded-xl border border-[#6652D9]/20 bg-[#6652D9]/[0.10] px-4 py-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#B8A8FF]">
          Nächste Tipp-Veröffentlichung
        </div>
        <p className="mt-2 text-sm font-medium text-white">
          {Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", hour: "2-digit", hourCycle: "h23" }).format(new Date())) < 9 ? "Heute um 09:00 Uhr" : "Morgen um 09:00 Uhr"}
        </p>
        <p className="mt-1 text-xs leading-5 text-white/45">
          Veröffentlicht werden ausschließlich Tipps, die unsere Qualitätsanforderungen erfüllen.
        </p>
      </div>
    </section>
  );
}
