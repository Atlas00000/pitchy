/**
 * Sticky header ambient strip — pointer-events none.
 */

export function NavbarBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pitchly-brand/30 to-transparent" />
      <div className="absolute -left-[15%] top-1/2 h-[220%] w-[40%] -translate-y-1/2 rotate-[-9deg] rounded-full bg-gradient-to-br from-pitchly-brand-light/55 via-transparent to-transparent blur-3xl" />
    </div>
  )
}
