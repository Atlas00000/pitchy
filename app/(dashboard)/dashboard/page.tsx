import { DashboardSummaryCards } from "@/components/layout/dashboard-summary-cards"
import { CallList } from "@/components/calls/call-list"
import { PageHeader } from "@/components/shared/page-header"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        description="Your team's call activity and performance at a glance."
      />
      <DashboardSummaryCards />
      <div>
        <h3 className="text-sm font-semibold mb-4">Recent Calls</h3>
        <CallList />
      </div>
    </div>
  )
}
