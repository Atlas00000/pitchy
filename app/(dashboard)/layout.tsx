// Dashboard pages require auth + runtime data — never statically prerender
export const dynamic = "force-dynamic"

import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { ToastProvider } from "@/components/shared/toast"
import { ErrorBoundary } from "@/components/shared/error-boundary"
import { UserProvider } from "@/components/providers/user-provider"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <UserProvider>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <Topbar />
            <main className="flex-1 p-6 overflow-auto">
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
          </div>
        </div>
      </UserProvider>
    </ToastProvider>
  )
}
