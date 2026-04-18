import { HowItWorksBackground } from "./how-it-works-background"
import { HowItWorksCta } from "./how-it-works-cta"
import { HowItWorksFlow } from "./how-it-works-flow"
import { HowItWorksIntro } from "./how-it-works-intro"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-pitchly-canvas py-24 md:py-28 lg:py-32">
      <HowItWorksBackground />

      <div className="relative z-10 mx-auto w-[min(100%-1.5rem,80vw)] max-w-none">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-4">
          <HowItWorksIntro />
          <HowItWorksFlow />
        </div>

        <HowItWorksCta />
      </div>
    </section>
  )
}
