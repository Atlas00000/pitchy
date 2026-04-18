interface AnalyzedWithBadgeProps {
  analyzedWith: "gemini" | "claude"
  promptVersion: string
}

const CONFIG = {
  gemini: {
    label: "Gemini 2.5 Flash",
    style: "bg-blue-50 text-blue-700 border-blue-200",
  },
  claude: {
    label: "Claude Sonnet",
    style: "bg-purple-50 text-purple-700 border-purple-200",
  },
}

export function AnalyzedWithBadge({ analyzedWith, promptVersion }: AnalyzedWithBadgeProps) {
  const { label, style } = CONFIG[analyzedWith]

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}>
      <span>Analyzed with {label}</span>
      <span className="opacity-50">·</span>
      <span className="opacity-70">{promptVersion}</span>
    </span>
  )
}
