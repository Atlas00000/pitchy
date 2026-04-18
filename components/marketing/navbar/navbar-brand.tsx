import Link from "next/link"

/** Wordmark only — no logomark / clip art. */
export function NavbarBrand() {
  return (
    <Link
      href="/"
      className="group relative shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-pitchly-canvas"
    >
      <span className="relative text-xl font-bold tracking-tight text-pitchly-text-primary transition-opacity duration-200 group-hover:opacity-90 md:text-2xl">
        <span className="bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-pitchly-text-primary bg-clip-text text-transparent">
          Pitchly
        </span>
      </span>
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-pitchly-brand to-pitchly-brand-muted transition-all duration-300 ease-out group-hover:w-full" />
    </Link>
  )
}
