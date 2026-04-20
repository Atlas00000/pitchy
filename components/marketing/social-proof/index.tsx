import { SocialProofIntro } from "./social-proof-intro"
import { SocialProofStats } from "./social-proof-stats"
import { SocialProofTestimonials } from "./social-proof-testimonials"
import { SOCIAL_TESTIMONIALS } from "./social-proof-data"

export function SocialProof() {
  const leadTestimonial = SOCIAL_TESTIMONIALS[0]

  return (
    <section id="social-proof" className="relative isolate overflow-hidden py-14 md:py-28 lg:py-32">
      <div className="relative z-10 mx-auto w-full px-4 md:w-[min(100%-1.5rem,80vw)] md:px-0">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-4">
          <SocialProofIntro />
          <SocialProofStats />
        </div>

        <div className="md:hidden mt-10 rounded-2xl border border-pitchly-border/75 bg-pitchly-canvas/80 px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pitchly-text-muted">
            Voice of manager
          </p>
          <blockquote className="mt-3 text-base leading-relaxed text-pitchly-text-primary">
            "{leadTestimonial?.quote}"
          </blockquote>
          <p className="mt-4 text-sm text-pitchly-text-secondary">
            {leadTestimonial?.name} · {leadTestimonial?.role} · {leadTestimonial?.company}
          </p>
        </div>
        <div className="hidden md:block">
          <SocialProofTestimonials />
        </div>
      </div>
    </section>
  )
}
