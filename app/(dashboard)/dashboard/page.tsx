import { DashboardSummaryCards } from "@/components/layout/dashboard-summary-cards"
import { RecentCallsShowcase } from "@/components/calls/recent/recent-calls-showcase"
import { PageHeader } from "@/components/shared/page-header"
import { FadeInUp } from "@/components/motion/fade-in-up"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <FadeInUp delay={0}>
        <PageHeader
          title="Overview"
          description="Your team's call activity and performance at a glance."
        />
      </FadeInUp>
      <FadeInUp delay={0.06}>
        <DashboardSummaryCards />
      </FadeInUp>
      <FadeInUp delay={0.12}>
        <RecentCallsShowcase />
      </FadeInUp>
    </div>
  )
}
