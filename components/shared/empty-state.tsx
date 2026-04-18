import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  /** Primary action (e.g. `<Button>…</Button>`). Keep one clear CTA per empty state. */
  action?: ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      {Icon && (
        <div className="rounded-2xl border border-pitchly-border bg-pitchly-surface p-5 shadow-pitchly-raised">
          <Icon className="text-pitchly-brand" size={28} strokeWidth={1.5} aria-hidden />
        </div>
      )}
      <div className="max-w-md space-y-2">
        <p className="text-xl font-semibold tracking-tight text-pitchly-text-primary">{title}</p>
        {description && (
          <p className="text-sm leading-relaxed text-pitchly-text-secondary">{description}</p>
        )}
      </div>
      {action ? <div className="flex flex-col items-center gap-2 sm:flex-row">{action}</div> : null}
    </div>
  )
}
