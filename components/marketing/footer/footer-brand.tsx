import Link from "next/link"
import { FOOTER_TAGLINE } from "./footer-data"

export function FooterBrand() {
  return (
    <div className="relative lg:col-span-5">
      <Link href="/" className="group inline-flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-pitchly-canvas">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pitchly-brand to-[#312e81] text-lg font-bold tracking-tight text-white shadow-[0_18px_40px_-14px_rgb(79_70_229/0.55)] transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
          P
        </span>
        <span className="text-2xl font-bold tracking-tight text-pitchly-text-primary md:text-3xl">Pitchly</span>
      </Link>

      <div className="mt-6 h-px w-24 bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-transparent md:w-32" />

      <p className="mt-6 max-w-md text-left text-sm leading-relaxed text-pitchly-text-secondary md:text-base">
        {FOOTER_TAGLINE}
      </p>
    </div>
  )
}
