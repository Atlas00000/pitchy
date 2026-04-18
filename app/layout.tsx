import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ConvexClientProvider } from "@/components/providers/convex-client-provider"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Pitchly — AI Sales Manager",
  description: "AI-powered call analysis, coaching notes, and rep performance insights.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
