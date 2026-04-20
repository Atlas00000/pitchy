// Dashboard pages require auth + runtime data — never statically prerender
export const dynamic = "force-dynamic"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { ToastProvider } from "@/components/shared/toast"
import { ErrorBoundary } from "@/components/shared/error-boundary"
import { UserProvider } from "@/components/providers/user-provider"
import { DashboardMobileSidebarProvider } from "@/components/providers/dashboard-mobile-sidebar-provider"
import { PageCrossFade } from "@/components/motion/page-cross-fade"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")
  return (
    <ToastProvider>
      <UserProvider>
        <DashboardMobileSidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <Topbar />
              <main className="flex-1 overflow-auto bg-pitchly-canvas p-6">
                <ErrorBoundary>
                  <PageCrossFade>{children}</PageCrossFade>
                </ErrorBoundary>
              </main>
            </div>
          </div>
        </DashboardMobileSidebarProvider>
      </UserProvider>
    </ToastProvider>
  )
}
