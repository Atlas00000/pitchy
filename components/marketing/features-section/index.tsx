import { FeaturesBackground } from "./features-background"
import { FeaturesBento } from "./features-bento"
import { FeaturesIntro } from "./features-intro"

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden bg-pitchly-surface py-24 md:py-28 lg:py-32">
      <FeaturesBackground />

      <div className="relative z-10 mx-auto w-[min(100%-1.5rem,80vw)] max-w-none">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-6">
          <FeaturesIntro />
          <FeaturesBento />
        </div>
      </div>
    </section>
  )
}
