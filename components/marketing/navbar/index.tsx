import { NavbarBackground } from "./navbar-background"
import { NavbarBar } from "./navbar-bar"
import { NavbarBrand } from "./navbar-brand"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-pitchly-border/80 bg-pitchly-canvas/75 shadow-[0_14px_44px_-30px_rgb(15_23_42/0.38)] backdrop-blur-xl supports-[backdrop-filter]:bg-pitchly-canvas/65">
      <NavbarBackground />
      <div className="relative mx-auto w-[min(100%-1.25rem,80vw)] max-w-none">
        <NavbarBar>
          <NavbarBrand />
        </NavbarBar>
      </div>
    </header>
  )
}
