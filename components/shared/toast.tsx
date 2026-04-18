"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const STYLES: Record<ToastType, string> = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-700",
  info: "bg-background border text-foreground",
}

let nextId = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    clearTimeout(timers.current.get(id))
    timers.current.delete(id)
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = ++nextId
      setToasts((prev) => [...prev, { id, message, type }])
      const timer = setTimeout(() => dismiss(id), 4000)
      timers.current.set(id, timer)
    },
    [dismiss]
  )

  useEffect(() => {
    const t = timers.current
    return () => { t.forEach((timer) => clearTimeout(timer)) }
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 w-[340px] max-w-[calc(100vw-2rem)]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm shadow-md animate-in slide-in-from-bottom-2 ${STYLES[toast.type]}`}
          >
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="mt-0.5 shrink-0 opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used inside ToastProvider")
  return ctx.showToast
}
