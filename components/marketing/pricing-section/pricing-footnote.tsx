/**
 * Post-grid policy line — factual, no fake urgency.
 */

export function PricingFootnote() {
  return (
    <div className="relative mt-14 md:mt-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pitchly-border-strong to-transparent" />
      <p className="pt-8 text-left text-sm leading-relaxed text-pitchly-text-muted md:text-center">
        Pro includes a <span className="font-semibold text-pitchly-text-secondary">14-day trial</span> inside the
        workspace. Start on Free with <span className="font-semibold text-pitchly-text-secondary">no card</span> — add
        billing only when you promote the team lane.
      </p>
    </div>
  )
}
