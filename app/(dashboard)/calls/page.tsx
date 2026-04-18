import Link from "next/link"
import { CallList } from "@/components/calls/call-list"
import { PageHeader } from "@/components/shared/page-header"
import { FadeInUp } from "@/components/motion/fade-in-up"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function CallsPage() {
  return (
    <div className="flex flex-col gap-6">
      <FadeInUp delay={0}>
        <PageHeader
          title="Calls"
          description="All uploaded transcripts and their analysis status."
          action={
            <Link href="/calls/new" className={cn(buttonVariants({ variant: "default", size: "default" }))}>
              + New call
            </Link>
          }
        />
      </FadeInUp>
      <FadeInUp delay={0.06}>
        <CallList />
      </FadeInUp>
    </div>
  )
}
