import Link from "next/link"

/**
 * Closing strip — airy, not a boxed “Bootstrap panel”.
 */
export function HowItWorksCta() {
  return (
    <div className="relative mt-16 md:mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pitchly-border-strong to-transparent" />
      <div className="flex flex-col gap-6 pt-10 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="max-w-lg">
          <p className="text-xl font-semibold tracking-tight text-pitchly-text-primary md:text-2xl">Ship the first report today</p>
          <p className="mt-2 text-sm leading-relaxed text-pitchly-text-secondary md:text-base">
            No card on file. Upload a real transcript and keep the full analysis in your workspace.
          </p>
        </div>
        <Link
          href="/sign-up"
          className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-pitchly-brand px-8 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_-12px_rgb(79_70_229/0.55)] transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:opacity-[0.96] active:scale-[0.98]"
        >
          Start for free
        </Link>
      </div>
    </div>
  )
}
