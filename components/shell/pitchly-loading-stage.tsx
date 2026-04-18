"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

/**
 * Full-route loading shell — decorative only, no data fetching or auth.
 */
export function PitchlyLoadingStage() {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-pitchly-canvas px-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-[20%] top-[-25%] h-[min(90vw,720px)] w-[min(90vw,720px)] rounded-[45%] bg-gradient-to-br from-pitchly-brand-light/90 via-pitchly-brand-light/25 to-transparent blur-3xl" />
        <div className="absolute -right-[18%] bottom-[-30%] h-[min(75vw,600px)] w-[min(75vw,600px)] rotate-[10deg] rounded-[48%] bg-gradient-to-tl from-pitchly-raised via-pitchly-brand/12 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.4] [background-image:linear-gradient(105deg,rgb(148_163_184/0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_45%,black,transparent)]"
        />
      </div>

      <motion.div
        className="relative mb-10 flex h-36 w-36 items-center justify-center md:h-44 md:w-44"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-pitchly-brand/25"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border border-pitchly-brand-muted/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full bg-gradient-to-br from-pitchly-brand to-[#312e81] shadow-[0_24px_56px_-20px_rgb(79_70_229/0.55)]"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        />
        <motion.div
          className="relative z-1"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-10 w-10 text-white md:h-12 md:w-12" strokeWidth={2} aria-hidden />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-pitchly-score-excellence bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
          Pitchly
        </p>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.22em] text-pitchly-text-muted md:text-[13px]">
          Hydrating analysis shell
        </p>
      </motion.div>

      <motion.div
        className="relative mt-10 h-1.5 w-[min(18rem,70vw)] overflow-hidden rounded-full bg-pitchly-raised"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <motion.div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-pitchly-brand via-pitchly-brand-muted to-pitchly-score-excellence"
          animate={{ x: ["-120%", "320%"] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <p className="relative mt-6 max-w-sm text-center text-xs leading-relaxed text-pitchly-text-muted md:text-sm">
        Convex sync, Clerk session, and the route segment you asked for load next — same client stack as production
        calls and dashboards.
      </p>
    </div>
  )
}
