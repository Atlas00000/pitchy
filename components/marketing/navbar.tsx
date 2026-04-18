import Link from "next/link"
import { NavAuthLinks } from "./nav-auth-links"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12L6 5L9 9L11 7L14 12H3Z" fill="white" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[15px] font-bold tracking-tight text-slate-900">Pitchly</span>
        </Link>

        {/* Auth-aware CTA — Sign In or Dashboard depending on session */}
        <NavAuthLinks />
      </div>
    </header>
  )
}
