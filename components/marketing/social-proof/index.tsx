import { SocialProofIntro } from "./social-proof-intro"
import { SocialProofStats } from "./social-proof-stats"
import { SocialProofTestimonials } from "./social-proof-testimonials"

export function SocialProof() {
  return (
    <section id="social-proof" className="relative isolate overflow-hidden py-14 md:py-28 lg:py-32">
      <div className="relative z-10 mx-auto w-full px-4 md:w-[min(100%-1.5rem,80vw)] md:px-0">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-4">
          <SocialProofIntro />
          <SocialProofStats />
        </div>

        <SocialProofTestimonials />
      </div>
    </section>
  )
}
