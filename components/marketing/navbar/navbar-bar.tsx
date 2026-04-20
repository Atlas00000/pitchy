"use client"

import { useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { NavbarAuth } from "./navbar-auth"
import { NAVBAR_MARKETING_LINKS } from "./navbar-data"

export function NavbarBar({ children }: { children: ReactNode }) {
  const barRef = useRef<HTMLDivElement>(null)
  const [glowX, setGlowX] = useState(50)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div
      ref={barRef}
      className="relative flex min-h-16 items-center gap-3 py-2 md:h-[4.25rem] md:gap-5 md:py-0"
      onMouseMove={(e) => {
        const r = barRef.current?.getBoundingClientRect()
        if (!r) return
        setGlowX(((e.clientX - r.left) / r.width) * 100)
      }}
      onMouseLeave={() => setGlowX(50)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80 md:opacity-100"
        style={{
          backgroundImage: `radial-gradient(140px 90px at ${glowX}% 48%, rgb(79 70 229 / 0.16), transparent 70%)`,
        }}
        aria-hidden
      />

      <div className="relative z-[1] flex w-full min-w-0 flex-col gap-2.5 md:flex-row md:flex-nowrap md:items-center md:gap-5">
        <div className="flex w-full items-center gap-3 md:w-auto">
          <div className="shrink-0">{children}</div>
          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-pitchly-border-strong/70 bg-pitchly-canvas/80 text-pitchly-text-secondary transition-colors hover:text-pitchly-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitchly-brand/40 md:hidden"
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileMenuOpen ? "true" : "false"}
            aria-controls="marketing-mobile-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>

        <nav
          className="hidden min-w-0 flex-1 justify-center gap-0.5 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] md:flex md:gap-1 [&::-webkit-scrollbar]:hidden"
          aria-label="Page sections"
        >
          {NAVBAR_MARKETING_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-xl px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-pitchly-text-muted transition-colors duration-150 hover:bg-pitchly-brand-light/70 hover:text-pitchly-brand sm:px-3 sm:text-[11px] md:tracking-[0.18em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 md:block">
          <NavbarAuth />
        </div>

        <div
          id="marketing-mobile-menu"
          className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
        >
          <div className="space-y-2 rounded-2xl border border-pitchly-border bg-pitchly-canvas/95 p-2.5 shadow-pitchly-raised">
            <nav className="grid gap-1" aria-label="Mobile page sections">
              {NAVBAR_MARKETING_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-pitchly-text-secondary transition-colors hover:bg-pitchly-brand-light/70 hover:text-pitchly-brand"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-pitchly-border pt-2">
              <NavbarAuth />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
