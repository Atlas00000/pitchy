"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { staggerContainerVariants, staggerItemVariants } from "@/components/motion/motion-config"

function ShimmerBlock({ className }: { readonly className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-pitchly-surface/40 backdrop-blur-md dark:border-white/[0.06] dark:bg-pitchly-raised/30",
        className
      )}
    >
      <div aria-hidden className="absolute inset-0 rounded-[inherit] pitchly-skeleton-shimmer opacity-90" />
    </div>
  )
}

export function SummaryLoadingGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-4"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={staggerItemVariants} className="md:col-span-8 md:row-span-2">
        <ShimmerBlock className="h-[13.5rem] md:h-full md:min-h-[15.5rem]" />
      </motion.div>
      <motion.div variants={staggerItemVariants} className="md:col-span-4 md:col-start-9 md:row-start-1">
        <ShimmerBlock className="h-[10.5rem] md:min-h-[6.75rem]" />
      </motion.div>
      <motion.div variants={staggerItemVariants} className="md:col-span-2 md:col-start-9 md:row-start-2">
        <ShimmerBlock className="h-[9.5rem] md:min-h-[10.5rem]" />
      </motion.div>
      <motion.div variants={staggerItemVariants} className="md:col-span-2 md:col-start-11 md:row-start-2">
        <ShimmerBlock className="h-[9.5rem] md:min-h-[10.5rem]" />
      </motion.div>
    </motion.div>
  )
}
