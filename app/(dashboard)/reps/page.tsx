import { RepList } from "@/components/reps/rep-list"
import { PageHeader } from "@/components/shared/page-header"
import { FadeInUp } from "@/components/motion/fade-in-up"

export default function RepsPage() {
  return (
    <div className="flex flex-col gap-6">
      <FadeInUp delay={0}>
        <PageHeader title="Reps" description="All sales reps and their call performance." />
      </FadeInUp>
      <FadeInUp delay={0.06}>
        <RepList />
      </FadeInUp>
    </div>
  )
}
