import { Hero } from "@/components/marketing/hero"
import { ProblemSection } from "@/components/marketing/problem-section"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { FeaturesSection } from "@/components/marketing/features-section"
import { SocialProof } from "@/components/marketing/social-proof"
import { PricingSection } from "@/components/marketing/pricing-section"

export default function LandingPage() {
  return (
    <main>
      <div className="px-4 py-12 md:hidden">
        <p className="text-base font-medium text-pitchly-text-primary">Mobile homepage test content.</p>
      </div>

      <div className="hidden md:block">
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <FeaturesSection />
        <SocialProof />
        <PricingSection />
      </div>
    </main>
  )
}
