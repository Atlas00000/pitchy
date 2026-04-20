/**
 * Ambient canvas for the How it works band — pointer-events none.
 */

export function HowItWorksBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute -right-[25%] top-[-20%] h-[75%] w-[65%] rotate-[6deg] rounded-[45%] bg-gradient-to-bl from-pitchly-brand-light/70 via-pitchly-surface to-transparent blur-3xl" />
      <div className="absolute -left-[18%] bottom-[-30%] h-[55%] w-[50%] rounded-[50%] bg-gradient-to-tr from-pitchly-score-excellence/10 via-transparent to-transparent blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(105deg,rgb(148_163_184/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.06)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      />

      <svg
        className="absolute bottom-[8%] right-[5%] h-[min(40vw,380px)] w-[min(40vw,380px)] text-pitchly-brand-muted/20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="0.75" strokeDasharray="6 10" />
      </svg>
    </div>
  )
}
