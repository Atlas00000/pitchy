import { FOOTER_BOTTOM_LINE } from "./footer-data"

export function FooterBottom() {
  return (
    <div className="mt-16 border-t border-pitchly-border/80 pt-10 md:mt-20 md:pt-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-left text-xs leading-relaxed text-pitchly-text-muted md:text-sm">
          © {new Date().getFullYear()} Pitchly. All rights reserved.
        </p>
        <p className="max-w-xl text-left text-xs leading-relaxed text-pitchly-text-muted md:text-right md:text-sm">
          {FOOTER_BOTTOM_LINE}
        </p>
      </div>
    </div>
  )
}
