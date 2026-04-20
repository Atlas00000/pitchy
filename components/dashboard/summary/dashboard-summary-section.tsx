"use client"

import { useMemo } from "react"

import { useTeamAnalytics } from "@/hooks/use-team-analytics"
import { useSummaryVisuals } from "@/hooks/use-summary-visuals"

import { SummaryLoadingGrid } from "./summary-loading-grid"
import { SummaryCardShell } from "./summary-card-shell"
import { SummaryMiniBars } from "./summary-mini-bars"
import { SummaryProgressRing } from "./summary-progress-ring"
import { SummarySparkline } from "./summary-sparkline"
import { SummaryFrictionBars } from "./summary-friction-bars"
import { SummaryVisualPanel, SummaryVisualsGrid } from "./summary-visuals-board"
import { SummaryStageFunnel } from "./summary-stage-funnel"
import { SummaryStatusDonut } from "./summary-status-donut"
import { SummaryObjectionMix } from "./summary-objection-mix"
import { SummaryRepMomentum } from "./summary-rep-momentum"
import { SummaryScoreBands } from "./summary-score-bands"
import type { SummaryMetricModel, SummaryTrendDirection } from "./summary-metric-types"

function formatObjection(raw: string | null) {
  if (!raw) return "—"
  return raw.replaceAll("_", " ")
}

export function DashboardSummaryCards() {
  const {
    isLoading,
    totalCalls,
    completedCalls,
    avgScore,
    topObjection,
    weeklyVolume,
    scoreTrend,
    frictionDistribution,
    volumeLast7,
    volumePrev7,
    volumeDeltaPercent,
    volumeLast30,
    coverageLast7,
    coveragePrev7,
    coverageDeltaPercent,
  } = useTeamAnalytics()
  const summaryVisuals = useSummaryVisuals()

  const analyzedPercent = totalCalls > 0 ? Math.round((completedCalls / totalCalls) * 100) : 0

  const toTrendDirection = (delta: number): SummaryTrendDirection =>
    delta > 0 ? "up" : delta < 0 ? "down" : "flat"

  const metrics = useMemo((): readonly SummaryMetricModel[] => {
    return [
      {
        id: "volume",
        title: "Call volume",
        value: String(totalCalls),
        helper: "Transcript uploads across the latest activity window.",
        tone: "brand",
        delta: `${volumeDeltaPercent > 0 ? "+" : ""}${volumeDeltaPercent}%`,
        deltaLabel: "vs prior 7 days",
        contextLabel: `${volumeLast7} this week · ${volumeLast30} in 30d`,
        trendDirection: toTrendDirection(volumeDeltaPercent),
      },
      {
        id: "coverage",
        title: "AI coverage",
        value: `${analyzedPercent}%`,
        helper: "Share of calls with summaries, scoring, and coaching output.",
        tone: "positive",
        delta: `${coverageDeltaPercent > 0 ? "+" : ""}${coverageDeltaPercent} pts`,
        deltaLabel: "vs prior 7 days",
        contextLabel: `${coverageLast7}% this week · ${coveragePrev7}% prior`,
        trendDirection: toTrendDirection(coverageDeltaPercent),
      },
      {
        id: "rubric",
        title: "Team rubric",
        value: avgScore > 0 ? avgScore.toFixed(1) : "—",
        helper: "Current quality baseline from analyzed team calls.",
        tone: "warning",
        delta: avgScore > 0 ? "/10" : undefined,
        deltaLabel: avgScore > 0 ? "current baseline" : "score pipeline warming up",
        contextLabel: `${completedCalls}/${totalCalls || 0} calls fully analyzed`,
        trendDirection: "flat",
      },
      {
        id: "friction",
        title: "Leading friction",
        value: formatObjection(topObjection),
        helper: "Most common resistance pattern in recent pipeline activity.",
        tone: "critical",
        delta: `${frictionDistribution[0]?.label ?? "timing"}`,
        deltaLabel: "dominant pressure",
        contextLabel: `${totalCalls} calls sampled in current window`,
        trendDirection: "flat",
      },
    ]
  }, [
    totalCalls,
    completedCalls,
    avgScore,
    topObjection,
    analyzedPercent,
    volumeDeltaPercent,
    volumeLast7,
    volumeLast30,
    coverageDeltaPercent,
    coverageLast7,
    coveragePrev7,
    frictionDistribution,
  ])

  if (isLoading || summaryVisuals.isLoading) {
    return (
      <section aria-label="Team metrics loading" className="relative">
        <div className="rounded-2xl border border-pitchly-border bg-pitchly-canvas p-4 md:p-5">
          <SummaryLoadingGrid />
        </div>
      </section>
    )
  }

  const volumeMetric = metrics[0]
  const coverageMetric = metrics[1]
  const rubricMetric = metrics[2]
  const frictionMetric = metrics[3]

  return (
    <section aria-label="Team metrics" className="relative">
      <div className="rounded-2xl border border-pitchly-border bg-pitchly-canvas p-4 shadow-pitchly-raised md:p-5">
        <header className="mb-4 flex flex-col gap-2.5 md:mb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-pitchly-text-muted">
              Team pulse
            </p>
            <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-pitchly-text-primary md:text-xl">
              Dashboard performance snapshot
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-pitchly-text-secondary md:text-right">
            Weekly context for volume, coverage, quality, and pipeline friction.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:auto-rows-[minmax(148px,auto)] md:gap-3.5">
          <SummaryCardShell
            title={volumeMetric.title}
            value={volumeMetric.value}
            helper={volumeMetric.helper}
            tone={volumeMetric.tone}
            delta={volumeMetric.delta}
            deltaLabel={volumeMetric.deltaLabel}
            contextLabel={volumeMetric.contextLabel}
            trendDirection={volumeMetric.trendDirection}
            visual={<SummaryMiniBars values={weeklyVolume} leftLabel="7d ago" rightLabel="today" ariaLabel="Call volume trend over last seven days" />}
            className="md:col-span-7 md:row-span-2"
          />
          <SummaryCardShell
            title={coverageMetric.title}
            value={coverageMetric.value}
            helper={coverageMetric.helper}
            tone={coverageMetric.tone}
            delta={coverageMetric.delta}
            deltaLabel={coverageMetric.deltaLabel}
            contextLabel={coverageMetric.contextLabel}
            trendDirection={coverageMetric.trendDirection}
            visual={
              <SummaryProgressRing
                value={analyzedPercent}
                label={`${completedCalls}/${totalCalls || 0} analyzed`}
                ariaLabel="AI coverage ring for analyzed calls"
              />
            }
            className="md:col-span-5"
          />
          <SummaryCardShell
            title={rubricMetric.title}
            value={rubricMetric.value}
            helper={rubricMetric.helper}
            tone={rubricMetric.tone}
            delta={rubricMetric.delta}
            deltaLabel={rubricMetric.deltaLabel}
            contextLabel={rubricMetric.contextLabel}
            trendDirection={rubricMetric.trendDirection}
            visual={
              <SummarySparkline
                values={scoreTrend}
                leftLabel="7d ago"
                rightLabel="today"
                ariaLabel="Team rubric sparkline over last seven days"
              />
            }
            className="md:col-span-3"
          />
          <SummaryCardShell
            title={frictionMetric.title}
            value={frictionMetric.value}
            helper={frictionMetric.helper}
            tone={frictionMetric.tone}
            delta={frictionMetric.delta}
            deltaLabel={frictionMetric.deltaLabel}
            contextLabel={frictionMetric.contextLabel}
            trendDirection={frictionMetric.trendDirection}
            visual={
              <SummaryFrictionBars
                rows={frictionDistribution}
                caption="current stage pressure mix"
                ariaLabel="Pipeline friction category distribution"
              />
            }
            className="md:col-span-2"
          />
        </div>

        <SummaryVisualsGrid>
          <SummaryVisualPanel
            title="Stage funnel"
            subtitle="Where conversation volume concentrates by deal stage."
            prominence="feature"
            className="md:col-span-7 md:row-span-2"
          >
            <SummaryStageFunnel rows={summaryVisuals.stageFunnel} />
          </SummaryVisualPanel>

          <SummaryVisualPanel
            title="Status mix"
            subtitle="Pending, analyzing, complete, and failed call distribution."
            prominence="standard"
            className="md:col-span-5"
          >
            <SummaryStatusDonut rows={summaryVisuals.statusMix} />
          </SummaryVisualPanel>

          <SummaryVisualPanel
            title="Score bands"
            subtitle="Quality distribution across low, mid, and high outcomes."
            prominence="compact"
            className="md:col-span-5"
          >
            <SummaryScoreBands rows={summaryVisuals.scoreBands} />
          </SummaryVisualPanel>

          <SummaryVisualPanel
            title="Objection mix"
            subtitle="Most frequent objection categories from analyzed calls."
            prominence="feature"
            className="md:col-span-8"
          >
            <SummaryObjectionMix rows={summaryVisuals.objectionMix} />
          </SummaryVisualPanel>

          <SummaryVisualPanel
            title="Rep momentum"
            subtitle="Top 5 reps by recent call volume and scoring pace."
            prominence="standard"
            className="md:col-span-4"
          >
            <SummaryRepMomentum rows={summaryVisuals.repMomentum} />
          </SummaryVisualPanel>
        </SummaryVisualsGrid>
      </div>
    </section>
  )
}
