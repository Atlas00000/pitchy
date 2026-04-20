import { FeaturesBackground } from "./features-background"
import { FeaturesBento } from "./features-bento"
import { FeaturesIntro } from "./features-intro"

export function FeaturesSection() {
  return (
    <section id="features" className="relative isolate overflow-hidden bg-pitchly-surface py-14 md:py-28 lg:py-32">
      <FeaturesBackground />

      <div className="relative z-10 mx-auto w-full px-4 md:w-[min(100%-1.5rem,80vw)] md:px-0">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-6">
          <FeaturesIntro />
          <FeaturesBento />
        </div>
      </div>
    </section>
  )
}
