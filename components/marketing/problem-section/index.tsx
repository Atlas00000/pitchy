import { ProblemPainRail } from "./problem-pain-rail"
import { ProblemSectionBackground } from "./problem-section-background"
import { ProblemSectionIntro } from "./problem-section-intro"

export function ProblemSection() {
  return (
    <section className="relative overflow-hidden border-y border-pitchly-border bg-pitchly-surface py-14 md:py-28 lg:py-32">
      <ProblemSectionBackground />

      <div className="relative z-10 mx-auto w-full px-4 md:w-[min(100%-1.5rem,80vw)] md:px-0">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-4">
          <ProblemSectionIntro />
          <ProblemPainRail />
        </div>
      </div>
    </section>
  )
}
