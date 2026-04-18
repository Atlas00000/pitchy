"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Home, LogIn } from "lucide-react"

/**
 * Global 404 presentation — decorative routing only; no auth or data.
 */
export function PitchlyNotFoundStage() {
  const router = useRouter()

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-pitchly-canvas px-6 py-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-[12%] h-[min(85vw,640px)] w-[min(85vw,640px)] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-pitchly-brand-light/75 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-15%] h-[55%] w-[50%] rotate-[-8deg] rounded-[45%] bg-gradient-to-tl from-pitchly-score-excellence/15 via-pitchly-raised to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.38] [background-image:linear-gradient(to_right,rgb(148_163_184/0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_42%,black,transparent)]"
        />
      </div>

      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        <motion.p
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-pitchly-brand-muted"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Route miss
        </motion.p>
        <h1 className="mt-4 select-none text-[clamp(4.5rem,18vw,9rem)] font-black leading-none tracking-tighter">
          <span className="bg-gradient-to-br from-pitchly-brand via-pitchly-brand-muted to-pitchly-score-excellence bg-clip-text text-transparent">404</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg font-medium leading-relaxed text-pitchly-text-primary md:text-xl">
          Nothing lives at this path — the canvas is blank on purpose.
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-pitchly-text-secondary md:text-base">
          Jump back to the marketing surface, sign in, or retrace a step. No data was loaded here.
        </p>
      </motion.div>

      <motion.div
        className="relative mt-12 flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, type: "spring", stiffness: 220, damping: 24 }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-pitchly-border-strong/70 bg-pitchly-canvas/85 px-6 py-3.5 text-sm font-semibold text-pitchly-text-secondary shadow-sm backdrop-blur-sm transition-all duration-150 hover:border-pitchly-brand/35 hover:text-pitchly-text-primary hover:shadow-pitchly-raised active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
          Go back
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-pitchly-brand px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_48px_-14px_rgb(79_70_229/0.55)] transition-transform duration-150 hover:-translate-y-0.5 hover:opacity-[0.96] active:scale-[0.98]"
        >
          <Home className="h-4 w-4" strokeWidth={2} aria-hidden />
          Marketing home
        </Link>
        <Link
          href="/sign-in"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-pitchly-border bg-pitchly-surface/90 px-6 py-3.5 text-sm font-semibold text-pitchly-text-secondary shadow-pitchly-raised transition-all duration-150 hover:border-pitchly-border-strong hover:text-pitchly-text-primary hover:shadow-pitchly-floating active:scale-[0.98]"
        >
          <LogIn className="h-4 w-4" strokeWidth={2} aria-hidden />
          Sign in
        </Link>
      </motion.div>

      <motion.div
        className="relative mt-14 h-px w-[min(20rem,85vw)] bg-gradient-to-r from-transparent via-pitchly-border-strong to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.25, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
