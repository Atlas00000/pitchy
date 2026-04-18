export const dynamic = "force-dynamic"

import { PageCrossFade } from "@/components/motion/page-cross-fade"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <PageCrossFade className="flex w-full max-w-md justify-center">{children}</PageCrossFade>
    </div>
  )
}
