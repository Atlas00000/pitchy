import { PricingBackground } from "./pricing-background"
import { PricingFootnote } from "./pricing-footnote"
import { PricingIntro } from "./pricing-intro"
import { PricingTiers } from "./pricing-tiers"

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-pitchly-surface py-24 md:py-28 lg:py-32">
      <PricingBackground />

      <div className="relative z-10 mx-auto w-[min(100%-1.5rem,80vw)] max-w-none">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-4">
          <PricingIntro />
          <PricingTiers />
        </div>

        <PricingFootnote />
      </div>
    </section>
  )
}
