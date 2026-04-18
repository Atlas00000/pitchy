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
]

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 12L6 5L9 9L11 7L14 12H3Z" fill="white" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[15px] font-bold tracking-tight text-slate-900">Pitchly</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              AI-powered sales call analysis. Instant coaching for every rep, every call.
            </p>
          </div>

          {/* Nav columns */}
          {NAV.map(({ heading, links }) => (
            <div key={heading}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                {heading}
              </p>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Pitchly. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Built for B2B SaaS sales teams.
          </p>
        </div>
      </div>
    </footer>
  )
}
