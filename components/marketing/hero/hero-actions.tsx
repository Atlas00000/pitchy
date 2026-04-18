import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HERO_CTAS } from "./hero-data"

export function HeroActions() {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
      {HERO_CTAS.map((cta) =>
        cta.variant === "primary" ? (
          <Link
            key={cta.href}
            href={cta.href}
            className="inline-flex items-center justify-center rounded-2xl bg-pitchly-brand px-8 py-3.5 text-base font-semibold text-white shadow-[0_20px_48px_-14px_rgb(79_70_229/0.55)] transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:opacity-[0.96] active:scale-[0.98]"
          >
            {cta.label}
          </Link>
        ) : (
          <Link
            key={cta.href}
            href={cta.href}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-pitchly-border bg-pitchly-canvas/90 px-8 py-3.5 text-base font-semibold text-pitchly-text-secondary shadow-pitchly-raised backdrop-blur-sm transition-all duration-150 ease-out hover:border-pitchly-border-strong hover:text-pitchly-text-primary hover:shadow-pitchly-floating active:scale-[0.98]"
          >
            {cta.label}
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Link>
        )
      )}
    </div>
  )
}
