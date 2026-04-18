"use client"

import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, TrendingUp, Upload, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { HowItWorksIconKey, HowItWorksStep, HowItWorksTone } from "./how-it-works-data"
import { HOW_IT_WORKS_STEPS } from "./how-it-works-data"

const ICONS: Record<HowItWorksIconKey, LucideIcon> = {
  upload: Upload,
  sparkles: Sparkles,
  trending: TrendingUp,
}

const TONE: Record<
  HowItWorksTone,
  { glow: string; chip: string; node: string; connectorOn: string }
> = {
  brand: {
    glow: "shadow-[0_0_0_1px_rgb(79_70_229/0.12),0_22px_50px_-18px_rgb(79_70_229/0.38)]",
    chip: "border-pitchly-brand/20 bg-pitchly-brand-light/90 text-pitchly-brand",
    node: "border-pitchly-brand bg-pitchly-brand text-white",
    connectorOn: "bg-gradient-to-b from-pitchly-brand to-pitchly-brand-muted",
  },
  muted: {
    glow: "shadow-[0_0_0_1px_rgb(129_140_248/0.14),0_22px_50px_-18px_rgb(99_102_241/0.2)]",
    chip: "border-pitchly-border-strong bg-pitchly-surface text-pitchly-brand-muted",
    node: "border-pitchly-brand-muted bg-pitchly-canvas text-pitchly-brand",
    connectorOn: "bg-gradient-to-b from-pitchly-brand-muted to-pitchly-border-strong",
  },
  excellence: {
    glow: "shadow-[0_0_0_1px_rgb(16_185_129/0.15),0_22px_50px_-18px_rgb(16_185_129/0.28)]",
    chip: "border-pitchly-score-excellence/25 bg-pitchly-brand-light/70 text-pitchly-score-excellence",
    node: "border-pitchly-score-excellence bg-pitchly-score-excellence text-white",
    connectorOn: "bg-gradient-to-b from-pitchly-brand-muted to-pitchly-score-excellence",
  },
}

function effectiveIndex(hover: number | null, pinned: number) {
  return hover !== null ? hover : pinned
}

function StepBlock({
  step,
  index,
  effective,
  onHover,
  onPick,
}: {
  step: HowItWorksStep
  index: number
  effective: number
  onHover: (i: number) => void
  onPick: (i: number) => void
}) {
  const Icon = ICONS[step.icon]
  const tone = TONE[step.tone]
  const isHot = effective === index
  const isDimmed = effective !== index
  const isLast = index === HOW_IT_WORKS_STEPS.length - 1
  const connectorLit = effective > index

  return (
    <div
      className={cn("relative flex gap-4 md:gap-5", index % 2 === 1 && "lg:translate-x-3")}
      onPointerEnter={() => onHover(index)}
      onClick={() => onPick(index)}
      role="group"
      tabIndex={-1}
      aria-label={`Step ${step.order}: ${step.title}`}
    >
      <div className="flex w-11 shrink-0 flex-col items-center pt-1 md:w-12">
        <motion.div
          id={`how-step-${step.id}`}
          className={cn(
            "relative z-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border-2 text-[11px] font-bold shadow-sm outline-none md:h-12 md:w-12",
            isHot ? tone.node : "border-pitchly-border bg-pitchly-canvas text-pitchly-text-muted"
          )}
          whileTap={{ scale: 0.96 }}
          aria-hidden
        >
          <Icon className="h-5 w-5 md:h-5 md:w-5" strokeWidth={1.75} />
        </motion.div>

        {!isLast && (
          <div className="relative mt-1 flex min-h-12 w-px flex-1 md:min-h-14">
            <div className="absolute inset-0 bg-pitchly-border" />
            <motion.div
              className={cn(
                "absolute inset-x-0 top-0 w-full origin-top",
                connectorLit ? tone.connectorOn : "bg-pitchly-border"
              )}
              initial={false}
              animate={{ scaleY: connectorLit ? 1 : 0.22 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            />
          </div>
        )}
      </div>

      <motion.article
        layout
        className={cn(
          "min-w-0 flex-1 cursor-pointer rounded-[1.65rem] border border-pitchly-border/75 bg-pitchly-canvas/80 py-5 pl-5 pr-5 shadow-sm backdrop-blur-md transition-shadow duration-300 md:rounded-[2rem] md:py-6 md:pl-7 md:pr-8",
          isHot && tone.glow
        )}
        animate={{
          scale: isHot ? 1.02 : 1,
          opacity: isDimmed ? 0.5 : 1,
          y: isHot ? -2 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-pitchly-text-muted">
            {String(step.order).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              tone.chip
            )}
          >
            {step.highlight}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-pitchly-text-primary md:text-xl">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-pitchly-text-secondary md:text-[15px] md:leading-relaxed">
          {step.description}
        </p>
      </motion.article>
    </div>
  )
}

export function HowItWorksFlow() {
  const [pinned, setPinned] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const eff = effectiveIndex(hover, pinned)

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault()
      setHover(null)
      setPinned((i) => Math.min(HOW_IT_WORKS_STEPS.length - 1, i + 1))
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault()
      setHover(null)
      setPinned((i) => Math.max(0, i - 1))
    }
    if (e.key === "Home") {
      e.preventDefault()
      setHover(null)
      setPinned(0)
    }
    if (e.key === "End") {
      e.preventDefault()
      setHover(null)
      setPinned(HOW_IT_WORKS_STEPS.length - 1)
    }
  }, [])

  return (
    <div
      data-how-rail
      className="relative rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-pitchly-brand/35 focus-visible:ring-offset-4 focus-visible:ring-offset-pitchly-canvas lg:col-span-7"
      tabIndex={0}
      role="region"
      aria-label="Pitchly workflow: ingest, structured analysis, and coaching. Arrow keys change the active step when focused."
      onKeyDown={onKeyDown}
      onPointerLeave={() => setHover(null)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget
        if (!(next instanceof Node) || !e.currentTarget.contains(next)) {
          setHover(null)
        }
      }}
    >
      <p className="mb-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-pitchly-text-muted lg:text-right">
        Upload → single-pass AI → coach — each lane matches what ships in-product
      </p>

      <div className="flex flex-col gap-2 md:gap-3">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <StepBlock
            key={step.id}
            step={step}
            index={index}
            effective={eff}
            onHover={setHover}
            onPick={(i) => {
              setPinned(i)
              setHover(null)
            }}
          />
        ))}
      </div>
    </div>
  )
}
