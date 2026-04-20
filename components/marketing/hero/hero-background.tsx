/**
 * Static ambient layers for the hero (parallax lives in `hero-product-stage` parent section if needed).
 * This file is decorative only — pointer-events none.
 */

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-[28%] -top-[45%] h-[min(120vw,900px)] w-[min(120vw,900px)] rounded-[40%] bg-gradient-to-br from-pitchly-brand-light/90 via-pitchly-brand-light/35 to-transparent blur-3xl" />
      <div className="absolute -right-[22%] top-[5%] h-[min(95vw,720px)] w-[min(95vw,720px)] rotate-[12deg] rounded-[42%] bg-gradient-to-bl from-pitchly-surface via-pitchly-raised/80 to-transparent blur-3xl" />
      <div className="absolute bottom-[-35%] left-[15%] h-[55%] w-[45%] rounded-[50%] bg-gradient-to-tr from-pitchly-brand/10 via-transparent to-transparent blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.45] [background-image:linear-gradient(115deg,rgb(148_163_184/0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_30%_20%,black,transparent)]"
      />
    </div>
  )
}
