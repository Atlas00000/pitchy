import { SocialProofBackground } from "./social-proof-background"
import { SocialProofIntro } from "./social-proof-intro"
import { SocialProofStats } from "./social-proof-stats"
import { SocialProofTestimonials } from "./social-proof-testimonials"

export function SocialProof() {
  return (
    <section id="social-proof" className="relative overflow-hidden bg-pitchly-canvas py-24 md:py-28 lg:py-32">
      <SocialProofBackground />

      <div className="relative z-10 mx-auto w-[min(100%-1.5rem,80vw)] max-w-none">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-4">
          <SocialProofIntro />
          <SocialProofStats />
        </div>

        <SocialProofTestimonials />
      </div>
    </section>
  )
}
