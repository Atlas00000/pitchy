/**
 * Hex colors for Recharts (no Tailwind class resolution in SVG).
 * Matches Pitchly tokens from `styles/tokens/colors.css`.
 */
export const CHART = {
  grid: "#e2e8f0",
  axis: "#64748b",
  brand: "#4f46e5",
  brandMuted: "#818cf8",
  tooltipBg: "#ffffff",
  tooltipBorder: "#e2e8f0",
  tooltipLabel: "#0f172a",
} as const

/** Objection category fills (aligned with analysis objection-tag palette). */
export const OBJECTION_BAR_HEX: Record<string, string> = {
  price: "#ef4444",
  timing: "#f59e0b",
  authority: "#4f46e5",
  need: "#475569",
  competitor: "#818cf8",
  other: "#94a3b8",
}
