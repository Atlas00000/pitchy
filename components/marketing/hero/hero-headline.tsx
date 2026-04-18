import { HERO_BODY, HERO_KICKER, HERO_TITLE } from "./hero-data"

export function HeroHeadline() {
  return (
    <div className="relative">
      <div className="inline-flex items-center gap-2 rounded-full border border-pitchly-border-strong/50 bg-pitchly-canvas/80 px-3 py-1.5 shadow-sm backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-pitchly-brand shadow-[0_0_0_3px_rgb(79_70_229/0.2)]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pitchly-brand">{HERO_KICKER}</span>
      </div>

      <h1 className="mt-6 max-w-[22ch] text-left text-4xl font-bold leading-[1.08] tracking-tight text-pitchly-text-primary sm:text-6xl sm:leading-[1.05] lg:text-7xl lg:leading-[1.02]">
        {HERO_TITLE.lead}{" "}
        <span className="bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-pitchly-score-excellence bg-clip-text text-transparent">
          {HERO_TITLE.gradient}
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-left text-lg leading-relaxed text-pitchly-text-secondary sm:text-xl">
        {HERO_BODY}
      </p>
    </div>
  )
}
