"use client"

import { useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { NavbarAuth } from "./navbar-auth"
import { NAVBAR_MARKETING_LINKS } from "./navbar-data"

export function NavbarBar({ children }: { children: ReactNode }) {
  const barRef = useRef<HTMLDivElement>(null)
  const [glowX, setGlowX] = useState(50)

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

      <div className="relative z-[1] flex w-full min-w-0 flex-wrap items-center gap-3 md:flex-nowrap md:gap-5">
        <div className="shrink-0">{children}</div>

        <nav
          className="flex min-w-0 flex-1 justify-center gap-0.5 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-1 [&::-webkit-scrollbar]:hidden"
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

        <div className="ml-auto shrink-0">
          <NavbarAuth />
        </div>
      </div>
    </div>
  )
}
