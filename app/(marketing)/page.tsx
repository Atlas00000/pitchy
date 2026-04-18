import Link from "next/link"
import { SignOutButton } from "@/components/shared/sign-out-button"

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Pitchly</h1>
      <p className="text-lg text-muted-foreground max-w-md">
        AI-powered sales call analysis. Upload a transcript, get instant coaching notes, scores, and insights.
      </p>
      <div className="flex gap-3">
        <Link
          href="/sign-up"
          className="px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
        >
          Get Started
        </Link>
        <Link
          href="/sign-in"
          className="px-5 py-2.5 rounded-md border text-sm font-medium hover:bg-muted transition"
        >
          Sign In
        </Link>
        <SignOutButton />
      </div>
    </main>
  )
}
