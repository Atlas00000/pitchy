"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

type DashboardMobileSidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const DashboardMobileSidebarContext = createContext<DashboardMobileSidebarContextValue | null>(null)

export function DashboardMobileSidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen((v) => !v), [])

  const value = useMemo(
    () => ({
      open,
      setOpen,
      toggle,
    }),
    [open, toggle]
  )

  return (
    <DashboardMobileSidebarContext.Provider value={value}>{children}</DashboardMobileSidebarContext.Provider>
  )
}

export function useDashboardMobileSidebar() {
  const ctx = useContext(DashboardMobileSidebarContext)
  if (!ctx) {
    throw new Error("useDashboardMobileSidebar must be used within DashboardMobileSidebarProvider")
  }
  return ctx
}
