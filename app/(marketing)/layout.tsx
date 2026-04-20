import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { PageCrossFade } from "@/components/motion/page-cross-fade"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-pitchly-canvas text-foreground antialiased">
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col">
        <PageCrossFade className="flex flex-1 flex-col">{children}</PageCrossFade>
      </div>
      <Footer />
    </div>
  )
}
