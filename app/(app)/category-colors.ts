export function getCategoryTextColor(category: string): string {
  const normalized = category.trim().toUpperCase();

  switch (normalized) {
    case "SAFE":
      return "text-[#159A62]";
    case "VALUE":
      return "text-[#2774D8]";
    case "VERDOPPLER":
      return "text-[#E27B19]";
    case "BEST TIP":
      return "text-[#6652D9]";
    default:
      return "text-white/65";
  }
}

export function getCategoryBorderColor(category: string): string {
  const normalized = category.trim().toUpperCase();

  switch (normalized) {
    case "SAFE":
      return "border-[#159A62]";
    case "VALUE":
      return "border-[#2774D8]";
    case "VERDOPPLER":
      return "border-[#E27B19]";
    case "BEST TIP":
      return "border-[#6652D9]";
    default:
      return "border-white/20";
  }
}
