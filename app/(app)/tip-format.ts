type TipText = {
  market?: string | null;
  selection?: string | null;
  market_key?: string | null;
};

function goalSelection(tip: TipText): string | null {
  const selection = String(tip.selection ?? "").trim();
  const match = /^(under|over)\s+(\d+(?:[.,]\d+)?)$/i.exec(selection);
  if (!match) return null;
  return `${match[1].toLowerCase() === "under" ? "Unter" : "\u00dcber"} ${match[2].replace(".", ",")} Tore`;
}

export function formatTipSelection(tip: TipText): string {
  return goalSelection(tip) || String(tip.selection ?? "").trim() || String(tip.market ?? "").trim();
}

export function formatTipMarket(tip: TipText): string {
  if (goalSelection(tip)) return "Gesamttore";
  const market = String(tip.market ?? "").trim();
  const selection = String(tip.selection ?? "").trim();
  return market && market.toLowerCase() !== selection.toLowerCase()
    ? market
    : "Empfehlung";
}

export function formatTipLabel(tip: TipText): string {
  const selection = formatTipSelection(tip);
  const market = String(tip.market ?? "").trim();
  const originalSelection = String(tip.selection ?? "").trim();
  if (!market || goalSelection(tip) || market.toLowerCase() === originalSelection.toLowerCase()) {
    return selection;
  }
  return originalSelection ? `${market}: ${selection}` : market;
}
