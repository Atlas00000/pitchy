"use client"

import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { motion } from "framer-motion"

export function NavbarAuth() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return (
      <div
        className="h-10 w-[7.5rem] animate-pulse rounded-2xl bg-pitchly-raised/90 md:w-32"
        aria-hidden
      />
    )
  }

  if (isSignedIn) {
    return (
      <motion.div whileTap={{ scale: 0.98 }}>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-2xl bg-pitchly-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_36px_-12px_rgb(79_70_229/0.55)] transition-all duration-150 hover:-translate-y-0.5 hover:opacity-[0.96]"
        >
          Dashboard
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Link
        href="/sign-in"
        className="inline-flex items-center justify-center rounded-2xl border border-pitchly-border-strong/70 bg-pitchly-canvas/85 px-5 py-2.5 text-sm font-semibold text-pitchly-text-secondary shadow-sm backdrop-blur-sm transition-all duration-150 hover:border-pitchly-brand/35 hover:text-pitchly-text-primary hover:shadow-pitchly-raised"
      >
        Sign in
      </Link>
    </motion.div>
  )
}
