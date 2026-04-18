"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PricingTier, PricingTierId } from "./pricing-data"
import { PRICING_TIERS } from "./pricing-data"

function effectiveTier(hover: PricingTierId | null, pinned: PricingTierId) {
  return hover ?? pinned
}

function TierCard({
  tier,
  hotId,
  onHover,
  onPick,
  layoutClass,
}: {
  tier: PricingTier
  hotId: PricingTierId
  onHover: (id: PricingTierId) => void
  onPick: (id: PricingTierId) => void
  layoutClass: string
}) {
  const isHot = hotId === tier.id
  const isDim = hotId !== tier.id
  const isPro = tier.primary

  return (
    <motion.div
      layout
      className={cn("relative", layoutClass)}
      onPointerEnter={() => onHover(tier.id)}
      onClick={() => onPick(tier.id)}
    >
      <motion.article
        className={cn(
          "relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border p-7 shadow-sm backdrop-blur-md transition-shadow duration-300 md:rounded-[2rem] md:p-8",
          isPro
            ? "border-white/15 bg-gradient-to-br from-pitchly-brand via-[#4338ca] to-[#312e81]"
            : "border-pitchly-border/80 bg-pitchly-canvas/85",
          isHot && isPro && "shadow-[0_28px_64px_-24px_rgb(79_70_229/0.65)]",
          isHot && !isPro && "shadow-[0_24px_56px_-22px_rgb(15_23_42/0.18)]"
        )}
        animate={{
          scale: isHot ? 1.02 : 1,
          opacity: isDim ? 0.55 : 1,
          y: isHot ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
      >
        {isPro && (
          <div className="absolute right-5 top-5 md:right-6 md:top-6">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
              Team lane
            </span>
          </div>
        )}

        <div className="relative pr-16">
          <p
            className={cn(
              "text-sm font-semibold uppercase tracking-wider",
              isPro ? "text-white/70" : "text-pitchly-text-muted"
            )}
          >
            {tier.name}
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-2">
            <span
              className={cn(
                "font-mono text-4xl font-bold tabular-nums tracking-tight md:text-5xl",
                isPro ? "text-white" : "text-pitchly-text-primary"
              )}
            >
              {tier.price}
            </span>
            <span className={cn("mb-1.5 text-sm", isPro ? "text-white/80" : "text-pitchly-text-muted")}>
              {tier.period}
            </span>
          </div>
          <p className={cn("mt-1 text-xs font-medium uppercase tracking-wide", isPro ? "text-white/60" : "text-pitchly-brand")}>
            {tier.tagline}
          </p>
          <p className={cn("mt-4 text-sm leading-relaxed md:text-[15px]", isPro ? "text-white/90" : "text-pitchly-text-secondary")}>
            {tier.description}
          </p>
        </div>

        <Link
          href={tier.ctaHref}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "mt-8 inline-flex w-full items-center justify-center rounded-2xl py-3.5 text-center text-sm font-semibold transition-transform duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.99] md:text-base",
            isPro
              ? "bg-pitchly-canvas text-pitchly-brand shadow-[0_16px_40px_-12px_rgb(0_0_0/0.35)] hover:opacity-[0.97]"
              : "bg-pitchly-brand text-white shadow-pitchly-floating hover:opacity-95"
          )}
        >
          {tier.cta}
        </Link>

        <ul className="mt-8 space-y-3">
          {tier.features.map((feat) => (
            <li key={feat} className="flex items-start gap-3">
              <Check
                className={cn("mt-0.5 h-4 w-4 shrink-0", isPro ? "text-pitchly-brand-light" : "text-pitchly-brand")}
                strokeWidth={2.25}
                aria-hidden
              />
              <span className={cn("text-sm leading-relaxed", isPro ? "text-white/95" : "text-pitchly-text-secondary")}>
                {feat}
              </span>
            </li>
          ))}
        </ul>

        <motion.div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit]",
            isPro ? "bg-gradient-to-tr from-white/12 via-transparent to-transparent" : "bg-gradient-to-br from-white/35 via-transparent to-transparent"
          )}
          animate={{ opacity: isHot ? 0.55 : 0.2 }}
        />
      </motion.article>
    </motion.div>
  )
}

export function PricingTiers() {
  const [pinned, setPinned] = useState<PricingTierId>("pro")
  const [hover, setHover] = useState<PricingTierId | null>(null)
  const hotId = effectiveTier(hover, pinned)

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      setHover(null)
      setPinned((p) => (p === "free" ? "pro" : "free"))
    }
    if (e.key === "Home") {
      e.preventDefault()
      setHover(null)
      setPinned("free")
    }
    if (e.key === "End") {
      e.preventDefault()
      setHover(null)
      setPinned("pro")
    }
  }, [])

  const free = PRICING_TIERS.find((t) => t.id === "free")!
  const pro = PRICING_TIERS.find((t) => t.id === "pro")!

  return (
    <div
      className="relative rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 focus-visible:ring-offset-4 focus-visible:ring-offset-pitchly-surface lg:col-span-7"
      tabIndex={0}
      role="region"
      aria-label="Pitchly Free vs Pro: call volume, models, analytics, and support. Arrow keys switch tiers when focused."
      onKeyDown={onKeyDown}
      onPointerLeave={() => setHover(null)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget
        if (!(next instanceof Node) || !e.currentTarget.contains(next)) {
          setHover(null)
        }
      }}
    >
      <p className="mb-5 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-pitchly-text-muted lg:text-right">
        Free vs Pro — call caps, models, analytics depth, and support mapped to what you ship today
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-5">
        <TierCard
          tier={free}
          hotId={hotId}
          onHover={setHover}
          onPick={setPinned}
          layoutClass="lg:col-span-5"
        />
        <TierCard
          tier={pro}
          hotId={hotId}
          onHover={setHover}
          onPick={setPinned}
          layoutClass="lg:col-span-7 lg:pl-1"
        />
      </div>
    </div>
  )
}
