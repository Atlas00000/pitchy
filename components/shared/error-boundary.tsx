"use client"

import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" }

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : "Something went wrong.",
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3 text-center px-4">
            <p className="font-medium text-sm">Something went wrong</p>
            <p className="text-xs text-muted-foreground max-w-xs">{this.state.message}</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, message: "" })}
              className="mt-2 px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
            >
              Try again
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
