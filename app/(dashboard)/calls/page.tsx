import Link from "next/link"
import { CallList } from "@/components/calls/call-list"
import { PageHeader } from "@/components/shared/page-header"

export default function CallsPage() {
  return (
    <div>
      <PageHeader
        title="Calls"
        description="All uploaded transcripts and their analysis status."
        action={
          <Link
            href="/calls/new"
            className="px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
          >
            + New Call
          </Link>
        }
      />
      <CallList />
    </div>
  )
}
