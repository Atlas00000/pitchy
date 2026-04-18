import { FooterBackground } from "./footer-background"
import { FooterBottom } from "./footer-bottom"
import { FooterBrand } from "./footer-brand"
import { FooterNav } from "./footer-nav"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-pitchly-border bg-pitchly-canvas">
      <FooterBackground />

      <div className="relative z-10 mx-auto w-[min(100%-1.5rem,80vw)] max-w-none py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-x-10">
          <FooterBrand />
          <FooterNav />
        </div>

        <FooterBottom />
      </div>
    </footer>
  )
}
