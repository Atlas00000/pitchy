/**
 * Ambient field for the features band — pointer-events none.
 */

export function FeaturesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-[-18%] top-[-35%] h-[90%] w-[55%] rotate-[-10deg] rounded-[42%] bg-gradient-to-br from-pitchly-brand-light/85 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-[-28%] right-[-12%] h-[65%] w-[48%] rounded-[48%] bg-gradient-to-tl from-pitchly-raised via-pitchly-brand-light/30 to-transparent blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,rgb(148_163_184/0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.08)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />

      <svg
        className="absolute left-[6%] bottom-[12%] h-[min(48vw,420px)] w-[min(48vw,420px)] text-pitchly-brand/12"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M20 100 C 60 20, 140 20, 180 100 S 60 180, 20 100"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
