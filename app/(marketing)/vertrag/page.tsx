"use client";

import { useEffect, useState, type FormEvent } from "react";
import LegalPage from "../components/LegalPage";

type Fields = {
  customer_name: string;
  customer_email: string;
  contract_reference: string;
  termination_type: string;
  requested_end: string;
  reason: string;
};

type Receipt = Fields & {
  request_id: string;
  received_at: string;
  declaration_type: string;
  statement: string;
  notice: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://zevyq-backend.fly.dev";
const inputClass = "mt-2 block w-full rounded-xl border border-white/20 bg-slate-950 p-3 text-white";
const buttonClass = "rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50";

export default function ContractPage() {
  const [kind, setKind] = useState<"cancellation" | "withdrawal">("cancellation");
  const [fields, setFields] = useState<Fields>({
    customer_name: "", customer_email: "", contract_reference: "",
    termination_type: "ordinary", requested_end: "earliest", reason: "",
  });
  const [review, setReview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [key, setKey] = useState("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  function update(field: keyof Fields, value: string) {
    setFields(previous => ({ ...previous, [field]: value }));
    setKey("");
    setError("");
  }

  function preview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setReview(true);
  }

  async function submit() {
    if (busy || receipt) return;
    setBusy(true);
    setError("");
    try {
      const submissionKey = key || crypto.randomUUID();
      setKey(submissionKey);
      const response = await fetch(`${API_URL}/contracts/declarations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields, submission_key: submissionKey, declaration_type: kind,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.receipt) {
        throw new Error(typeof data.detail === "string" ? data.detail : "Die Erklärung konnte nicht übermittelt werden.");
      }
      setReceipt(data.receipt);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Übermittlung fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  }

  function receiptText(value: Receipt) {
    return [
      "ZEVYQ – Eingangsbestätigung",
      `Referenz: ${value.request_id}`,
      `Eingegangen (UTC): ${value.received_at}`,
      `Name: ${value.customer_name}`,
      `E-Mail: ${value.customer_email}`,
      `Vertrag: ${value.contract_reference}`,
      value.statement,
      ...(value.declaration_type === "cancellation" ? [
        `Kündigungsart: ${value.termination_type === "extraordinary" ? "Außerordentlich" : "Ordentlich"}`,
        `Gewünschtes Ende: ${value.requested_end === "earliest" ? "Zum frühestmöglichen Zeitpunkt" : value.requested_end}`,
        `Begründung: ${value.reason || "Keine Angabe"}`,
      ] : []),
      value.notice,
      "Kontakt: support@zevyq.de",
    ].join("\n");
  }

  function download() {
    if (!receipt) return;
    const url = URL.createObjectURL(new Blob(["\uFEFF", receiptText(receipt)], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ZEVYQ-Eingang-${receipt.request_id}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("art") === "widerruf") {
      setKind("withdrawal");
    }
  }, []);

  const cancellation = kind === "cancellation";

  return (
    <LegalPage title="Kündigung und Widerruf">
      {receipt ? (
        <section aria-live="polite">
          <h2>Deine Erklärung ist eingegangen</h2>
          <p>Eine Eingangsbestätigung wird an {receipt.customer_email} versandt. Speichere deinen Beleg zusätzlich hier.</p>
          <pre className="mt-5 whitespace-pre-wrap break-words rounded-xl border border-white/15 p-5 font-sans text-sm">{receiptText(receipt)}</pre>
          <button type="button" className={`${buttonClass} mt-5`} onClick={download}>Eingangsbestätigung herunterladen</button>
        </section>
      ) : (
        <>
          <p>Hier kannst du deinen ZEVYQ-Vertrag ohne Anmeldung kündigen oder widerrufen. Eine Kündigung beendet den Vertrag zum maßgeblichen Termin; ein Widerruf betrifft deine Erklärung zum Vertragsschluss.</p>
          {!review ? (
            <form onSubmit={preview} className="space-y-5">
              <label className="block">
                Was möchtest du tun?
                <select className={inputClass} value={kind} onChange={event => {
                  setKind(event.target.value as typeof kind); setKey(""); setError("");
                }}>
                  <option value="cancellation">Vertrag kündigen</option>
                  <option value="withdrawal">Vertrag widerrufen</option>
                </select>
              </label>
              <label className="block">Vollständiger Name
                <input className={inputClass} required maxLength={120} autoComplete="name" value={fields.customer_name} onChange={event => update("customer_name", event.target.value)} />
              </label>
              <label className="block">E-Mail-Adresse für die Eingangsbestätigung
                <input className={inputClass} required type="email" maxLength={254} autoComplete="email" value={fields.customer_email} onChange={event => update("customer_email", event.target.value)} />
              </label>
              <label className="block">Welchen Vertrag betrifft deine Erklärung?
                <textarea className={inputClass} required maxLength={500} rows={3} placeholder="Zum Beispiel: ZEVYQ Premium monatlich, Konto-E-Mail, Bestell- oder Rechnungsreferenz" value={fields.contract_reference} onChange={event => update("contract_reference", event.target.value)} />
              </label>
              {cancellation && (
                <>
                  <label className="block">Kündigungsart
                    <select className={inputClass} value={fields.termination_type} onChange={event => update("termination_type", event.target.value)}>
                      <option value="ordinary">Ordentliche Kündigung</option>
                      <option value="extraordinary">Außerordentliche Kündigung</option>
                    </select>
                  </label>
                  <label className="block">Gewünschter Beendigungszeitpunkt
                    <select className={inputClass} value={fields.requested_end === "earliest" ? "earliest" : "date"} onChange={event => update("requested_end", event.target.value === "earliest" ? "earliest" : "")}>
                      <option value="earliest">Zum frühestmöglichen Zeitpunkt</option>
                      <option value="date">Wunschdatum angeben</option>
                    </select>
                  </label>
                  {fields.requested_end !== "earliest" && (
                    <label className="block">Wunschdatum
                      <input className={inputClass} required type="date" value={fields.requested_end} onChange={event => update("requested_end", event.target.value)} />
                    </label>
                  )}
                  <label className="block">{fields.termination_type === "extraordinary" ? "Außerordentlicher Kündigungsgrund (erforderlich)" : "Mitteilung (optional)"}
                    <textarea className={inputClass} required={fields.termination_type === "extraordinary"} maxLength={2000} rows={3} value={fields.reason} onChange={event => update("reason", event.target.value)} />
                  </label>
                </>
              )}
              <p>Wir verwenden diese Angaben zur Zuordnung und Bearbeitung deiner Erklärung sowie für die Bestätigung. Weitere Informationen findest du im <a href="/datenschutz">Datenschutz</a>.</p>
              <button className={buttonClass} type="submit">Erklärung prüfen</button>
            </form>
          ) : (
            <section>
              <h2>{cancellation ? "Kündigung prüfen" : "Widerruf prüfen"}</h2>
              <dl className="space-y-3 rounded-xl border border-white/15 p-5">
                <div><dt>Name</dt><dd className="break-words">{fields.customer_name}</dd></div>
                <div><dt>E-Mail</dt><dd className="break-all">{fields.customer_email}</dd></div>
                <div><dt>Vertrag</dt><dd className="whitespace-pre-wrap break-words">{fields.contract_reference}</dd></div>
                {cancellation && <>
                  <div><dt>Kündigungsart</dt><dd>{fields.termination_type === "extraordinary" ? "Außerordentlich" : "Ordentlich"}</dd></div>
                  <div><dt>Gewünschtes Ende</dt><dd>{fields.requested_end === "earliest" ? "Zum frühestmöglichen Zeitpunkt" : fields.requested_end}</dd></div>
                  <div><dt>Begründung / Mitteilung</dt><dd className="whitespace-pre-wrap break-words">{fields.reason || "Keine Angabe"}</dd></div>
                </>}
              </dl>
              <p>{cancellation ? "Hiermit kündige ich den bezeichneten Vertrag." : "Hiermit widerrufe ich den bezeichneten Vertrag."}</p>
              <div className="mt-5 flex flex-wrap gap-4">
                <button type="button" disabled={busy} className={buttonClass} onClick={() => void submit()}>
                  {busy ? "Wird übermittelt …" : cancellation ? "Jetzt kündigen" : "Widerruf bestätigen"}
                </button>
                <button type="button" disabled={busy} className="rounded-xl border border-white/20 px-5 py-3 disabled:opacity-50" onClick={() => { setReview(false); setError(""); }}>
                  ← Zurück
                </button>
              </div>
            </section>
          )}
          {error && <p role="alert" className="text-red-300">{error} Falls unklar ist, ob deine Erklärung angekommen ist, wiederhole die Übermittlung mit unveränderten Angaben. Alternativ erreichst du uns unter support@zevyq.de.</p>}
        </>
      )}
    </LegalPage>
  );
}