/**
 * Ambient layers for the marketing problem band — no interaction, pointer-events none.
 */

export function ProblemSectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Soft brand wash — diagonal, not a centered “spotlight” blob */}
      <div className="absolute -left-[20%] top-[-30%] h-[85%] w-[70%] rotate-[-8deg] rounded-[40%] bg-gradient-to-br from-pitchly-brand-light/90 via-pitchly-brand-light/25 to-transparent blur-3xl" />
      <div className="absolute -right-[15%] bottom-[-25%] h-[60%] w-[55%] rounded-[50%] bg-gradient-to-tl from-pitchly-raised/80 via-transparent to-transparent blur-3xl" />

      {/* Fine grid — breaks the “flat Bootstrap panel” feel */}
      <div
        className="absolute inset-0 opacity-[0.45] [background-image:linear-gradient(to_right,rgb(148_163_184/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.12)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
      />

      {/* Accent arc — SVG for a deliberate “product UI” curve */}
      <svg
        className="absolute left-[8%] top-[18%] h-[min(55vw,520px)] w-[min(55vw,520px)] text-pitchly-brand/15"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M8 160 Q 100 20 192 100"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
