"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { FooterColumn } from "./footer-data"
import { FOOTER_COLUMNS } from "./footer-data"

export function FooterNav() {
  const [hotId, setHotId] = useState<string | null>(null)

  return (
    <div className="lg:col-span-7" onPointerLeave={() => setHotId(null)}>
      <p className="mb-5 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-pitchly-text-muted lg:text-right">
        Columns · hover to spotlight
      </p>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {FOOTER_COLUMNS.map((column) => (
          <FooterColumnBlock key={column.id} column={column} hotId={hotId} onHot={setHotId} />
        ))}
      </div>
    </div>
  )
}

function FooterColumnBlock({
  column,
  hotId,
  onHot,
}: {
  column: FooterColumn
  hotId: string | null
  onHot: (id: string | null) => void
}) {
  const isHot = hotId === column.id
  const dim = hotId !== null && !isHot

  return (
    <motion.div
      layout
      onPointerEnter={() => onHot(column.id)}
      className={cn(
        "relative rounded-2xl border px-3 py-4 md:rounded-3xl md:px-4 md:py-5",
        isHot ? "border-pitchly-brand/25 bg-pitchly-canvas/70 shadow-pitchly-raised" : "border-transparent"
      )}
      animate={{ opacity: dim ? 0.48 : 1, y: isHot ? -3 : 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-pitchly-text-muted">{column.heading}</p>

      {column.kind === "links" ? (
        <ul className="space-y-2.5">
          {column.links.map((link) => (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                className="group inline-flex items-center gap-2 text-sm font-medium text-pitchly-text-secondary transition-colors hover:text-pitchly-text-primary"
              >
                <span className="inline-block h-px w-0 bg-pitchly-brand transition-all duration-200 group-hover:w-4" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-relaxed text-pitchly-text-secondary">{column.body}</p>
      )}
    </motion.div>
  )
}
