import Link from "next/link"

const NAV = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign in", href: "/sign-in" },
      { label: "Get started", href: "/sign-up" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="border-t border-pitchly-border bg-pitchly-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-4">
          <div className="sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-pitchly-brand shadow-pitchly-raised">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 12L6 5L9 9L11 7L14 12H3Z" fill="white" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[15px] font-bold tracking-tight text-pitchly-text-primary">Pitchly</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-pitchly-text-secondary">
              AI-powered sales call analysis. Instant coaching for every rep, every call.
            </p>
          </div>

          {NAV.map(({ heading, links }) => (
            <div key={heading}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-pitchly-text-muted">
                {heading}
              </p>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-pitchly-text-secondary transition-colors duration-150 hover:text-pitchly-text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-pitchly-border pt-8 sm:flex-row">
          <p className="text-xs text-pitchly-text-muted">© {new Date().getFullYear()} Pitchly. All rights reserved.</p>
          <p className="text-xs text-pitchly-text-muted">Built for B2B SaaS sales teams.</p>
        </div>
      </div>
    </footer>
  )
}
