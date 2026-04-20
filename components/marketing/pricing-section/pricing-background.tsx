/**
 * Ambient field behind pricing — pointer-events none.
 */

export function PricingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute left-[-22%] bottom-[-35%] h-[85%] w-[58%] rotate-[8deg] rounded-[46%] bg-gradient-to-tr from-pitchly-brand/18 via-pitchly-brand-light/50 to-transparent blur-3xl" />
      <div className="absolute -right-[15%] top-[-28%] h-[72%] w-[52%] rounded-[48%] bg-gradient-to-bl from-pitchly-canvas via-pitchly-raised to-transparent blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.42] [background-image:linear-gradient(to_right,rgb(148_163_184/0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black,transparent)]"
      />

      <svg
        className="absolute left-[8%] top-[12%] h-[min(42vw,380px)] w-[min(42vw,380px)] text-pitchly-brand/10"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M30 100 L100 40 L170 100 L100 160 Z"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
