type ExplanationTip = {
  model_probability?: number | null;
  odds?: number | null;
  fair_odds?: number | null;
  value?: number | null;
  data_confidence?: number | null;
  v74_eligible?: boolean | null;
};

export function getTipExplanation(tip: ExplanationTip): { title: string; text: string }[] {
  const result: { title: string; text: string }[] = [];
  const number = (value: number, digits = 1) =>
    value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const p = tip.model_probability;
  const odds = tip.odds;
  const validProbability = typeof p === "number" && Number.isFinite(p) && p >= 0 && p <= 1;
  const validOdds = typeof odds === "number" && Number.isFinite(odds) && odds > 1;

  if (validProbability) {
    result.push({
      title: "Modellbewertung",
      text: `Das Modell sch\u00e4tzt die Eintrittswahrscheinlichkeit dieser Auswahl auf ${number(p * 100)} %. Das ist eine Modellsch\u00e4tzung und keine garantierte Trefferquote.`,
    });
  }
  if (validProbability && validOdds) {
    const implied = 1 / odds;
    const difference = (p - implied) * 100;
    result.push({
      title: "Vergleich mit der Quote",
      text: `Die gespeicherte Quote ${number(odds, 2)} entspricht rechnerisch einer Gewinnschwelle von ${number(implied * 100)} %. Die Modellsch\u00e4tzung liegt ${number(Math.abs(difference))} Prozentpunkte ${difference >= 0 ? "dar\u00fcber" : "darunter"}. Dieser Vergleich bereinigt nicht die Buchmachermarge.`,
    });
  }
  const value = tip.value;
  if (typeof value === "number" && Number.isFinite(value)) {
    result.push({
      title: "Bewerteter Quotenvorteil",
      text: value > 0
        ? `Der gespeicherte Value betr\u00e4gt +${number(value)} %. Er beschreibt den modellbasierten rechnerischen Vorteil der Quote, nicht die Gewinnwahrscheinlichkeit oder einen sicheren Gewinn.`
        : `Der gespeicherte Value betr\u00e4gt ${number(value)} %. Dieser Wert weist keinen positiven modellbasierten Quotenvorteil aus.`,
    });
  }
  const fair = tip.fair_odds;
  if (typeof fair === "number" && Number.isFinite(fair) && fair >= 1) {
    result.push({
      title: "Modellbasierte faire Quote",
      text: `Die gespeicherte faire Quote liegt bei ${number(fair, 3)}. Sie dient als Vergleichswert zur angebotenen Quote und h\u00e4ngt von der Modellsch\u00e4tzung ab.`,
    });
  }
  if (tip.v74_eligible === true) {
    result.push({
      title: "Qualit\u00e4tspr\u00fcfung",
      text: "F\u00fcr diesen Tipp ist eine bestandene V7.4-Qualit\u00e4tspr\u00fcfung gespeichert. Das belegt die Freigabe durch diese Pr\u00fcfung, aber keine sichere Spielauswertung.",
    });
  }
  return result;
}
