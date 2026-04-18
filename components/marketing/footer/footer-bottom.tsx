export function FooterBottom() {
  return (
    <div className="mt-16 border-t border-pitchly-border/80 pt-10 md:mt-20 md:pt-12">
      <p className="text-left text-xs leading-relaxed text-pitchly-text-muted md:text-sm">
        © {new Date().getFullYear()} Pitchly. All rights reserved.
      </p>
    </div>
  )
}
