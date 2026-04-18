import { HeroActions } from "./hero-actions"
import { HeroBackground } from "./hero-background"
import { HeroHeadline } from "./hero-headline"
import { HeroProductStage } from "./hero-product-stage"
import { HeroTrustLine } from "./hero-trust-line"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-pitchly-canvas pb-24 pt-20 md:pb-28 md:pt-24">
      <HeroBackground />

      <div className="relative z-10 mx-auto w-[min(100%-1.5rem,80vw)] max-w-none">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-6">
          <div className="lg:col-span-5">
            <HeroHeadline />
            <HeroActions />
            <HeroTrustLine />
          </div>
          <HeroProductStage />
        </div>
      </div>
    </section>
  )
}
