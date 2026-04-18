/**
 * Ambient canvas for the social proof band.
 */

export function SocialProofBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-[-12%] top-[-40%] h-[95%] w-[50%] rotate-[-11deg] rounded-[44%] bg-gradient-to-br from-pitchly-brand-light/75 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-[-32%] right-[-20%] h-[70%] w-[55%] rounded-[50%] bg-gradient-to-tl from-pitchly-score-excellence/12 via-pitchly-surface to-transparent blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.38] [background-image:linear-gradient(120deg,rgb(148_163_184/0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black_5%,black_92%,transparent)]"
      />

      <svg
        className="absolute right-[4%] top-[10%] h-[min(36vw,320px)] w-[min(36vw,320px)] text-pitchly-brand-muted/18"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M40 60c28-36 92-36 120 0 16 20 16 48 0 68-28 36-92 36-120 0-16-20-16-48 0-68Z" opacity="0.35" />
      </svg>
    </div>
  )
}
