"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SocialProofTone, SocialTestimonial } from "./social-proof-data"
import { SOCIAL_TESTIMONIALS } from "./social-proof-data"

const RAIL: Record<SocialProofTone, string> = {
  brand: "border-l-pitchly-brand bg-pitchly-brand-light/50",
  muted: "border-l-pitchly-border-strong bg-pitchly-surface/90",
  excellence: "border-l-pitchly-score-excellence bg-pitchly-brand-light/60",
}

export function SocialProofTestimonials() {
  const [index, setIndex] = useState(0)
  const active = SOCIAL_TESTIMONIALS[index] ?? SOCIAL_TESTIMONIALS[0]

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault()
      setIndex((i) => Math.min(SOCIAL_TESTIMONIALS.length - 1, i + 1))
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault()
      setIndex((i) => Math.max(0, i - 1))
    }
    if (e.key === "Home") {
      e.preventDefault()
      setIndex(0)
    }
    if (e.key === "End") {
      e.preventDefault()
      setIndex(SOCIAL_TESTIMONIALS.length - 1)
    }
  }, [])

  return (
    <div
      className="mt-16 rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 focus-visible:ring-offset-4 focus-visible:ring-offset-pitchly-canvas md:mt-20"
      tabIndex={0}
      role="region"
      aria-label="Manager outcomes tied to Pitchly outputs: speed, objection signal, and time returned from reviews."
      onKeyDown={onKeyDown}
    >
      <p className="mb-6 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-pitchly-text-muted">
        Voice-of-manager tied to the same surfaces: summaries, scores, tags, and coaching notes in one read
      </p>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="relative min-h-64 lg:col-span-8">
          <Quote
            className="pointer-events-none absolute -left-1 top-0 h-20 w-20 text-pitchly-brand/14 md:h-24 md:w-24"
            strokeWidth={1}
            aria-hidden
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-4 md:pl-6"
            >
              <blockquote className="text-[1.35rem] font-medium leading-snug tracking-tight text-pitchly-text-primary sm:text-2xl md:text-3xl md:leading-tight lg:text-[2.05rem] lg:leading-[1.2]">
                <span className="text-pitchly-brand/90">&ldquo;</span>
                {active.quote}
                <span className="text-pitchly-brand/90">&rdquo;</span>
              </blockquote>

              <footer className="mt-8 flex flex-wrap items-center gap-4 md:mt-10">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-pitchly-border bg-pitchly-surface font-mono text-sm font-bold tracking-tight text-pitchly-text-primary shadow-sm">
                  {active.initials}
                </div>
                <div>
                  <p className="text-base font-semibold text-pitchly-text-primary md:text-lg">{active.name}</p>
                  <p className="text-sm text-pitchly-text-muted">
                    {active.role} <span className="text-pitchly-border-strong">·</span> {active.company}
                  </p>
                </div>
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-4" role="group" aria-label="Choose a testimonial">
          {SOCIAL_TESTIMONIALS.map((t, i) => (
            <QuoteRailRow
              key={t.id}
              testimonial={t}
              order={i + 1}
              selected={i === index}
              onSelect={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function QuoteRailRow({
  testimonial,
  order,
  selected,
  onSelect,
}: {
  testimonial: SocialTestimonial
  order: number
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "group relative flex w-full flex-col gap-1 rounded-2xl border border-pitchly-border/70 border-l-4 bg-pitchly-canvas/75 py-4 pl-5 pr-4 text-left shadow-sm backdrop-blur-md transition-all duration-200 md:rounded-[1.65rem] md:py-4 md:pl-6",
        selected ? cn(RAIL[testimonial.tone], "shadow-pitchly-floating") : "border-l-pitchly-border/50 hover:border-l-pitchly-border-strong",
        !selected && "opacity-[0.88] hover:opacity-100"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-pitchly-text-muted">
          {String(order).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-pitchly-border bg-pitchly-surface px-2 py-0.5 font-mono text-[10px] font-bold text-pitchly-text-secondary">
          {testimonial.initials}
        </span>
      </div>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-pitchly-text-secondary transition-colors group-hover:text-pitchly-text-primary">
        {testimonial.quote}
      </p>
    </button>
  )
}
