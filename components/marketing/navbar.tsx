import Link from "next/link"
import { NavAuthLinks } from "./nav-auth-links"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-pitchly-border bg-pitchly-canvas/90 backdrop-blur-md shadow-pitchly-raised">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-pitchly-brand shadow-pitchly-raised">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12L6 5L9 9L11 7L14 12H3Z" fill="white" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[15px] font-bold tracking-tight text-pitchly-text-primary">Pitchly</span>
        </Link>

        <NavAuthLinks />
      </div>
    </header>
  )
}
