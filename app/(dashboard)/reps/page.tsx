import { RepList } from "@/components/reps/rep-list"
import { PageHeader } from "@/components/shared/page-header"

export default function RepsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reps"
        description="All sales reps and their call performance."
      />
      <RepList />
    </div>
  )
}
