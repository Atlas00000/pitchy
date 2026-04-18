/**
 * Footer ambient layers — pointer-events none.
 */

export function FooterBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pitchly-brand/35 to-transparent" />
      <div className="absolute -left-[20%] bottom-[-40%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-[45%] bg-gradient-to-tr from-pitchly-brand-light/70 via-transparent to-transparent blur-3xl" />
      <div className="absolute -right-[18%] top-[10%] h-[45%] w-[40%] rounded-[50%] bg-gradient-to-bl from-pitchly-raised/90 to-transparent blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgb(148_163_184/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.06)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_top,black,transparent)]"
      />
    </div>
  )
}
