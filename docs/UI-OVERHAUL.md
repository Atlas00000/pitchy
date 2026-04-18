# Pitchly — UI Overhaul Philosophy

---

## The Core Philosophy

**"Data-driven confidence."**

Every screen should make the user feel like they are in control of something powerful. The UI should feel like a Bloomberg terminal crossed with a Linear dashboard — precision, density, and craft. Not a SaaS template. Not Bootstrap. Something that feels *built*, not assembled.

The white base stays. What changes is everything layered on top of it.

---

## Visual Personality

| Trait | Direction |
|-------|-----------|
| Weight | Heavy typography, bold hierarchy — headings command attention |
| Texture | Subtle depth through layered surfaces, not flat cards |
| Motion | Purposeful and fast — not decorative, every animation communicates state |
| Density | Information-rich but breathing — generous whitespace with confident grouping |
| Edge | Sharp corners on structural elements, pill/rounded on badges and chips |

The feel: **executive dashboard meets design studio**. Think Vercel + Stripe + Linear — none of the three individually, the overlap between them.

---

## Color Palette

### Base (surfaces)

| Name | Value | Use |
|------|-------|-----|
| Canvas | `#FFFFFF` | Main page background |
| Surface | `#F8FAFC` | Card and panel backgrounds |
| Raised | `#F1F5F9` | Hover states, muted inputs |
| Border | `#E2E8F0` | Dividers, card edges |
| Border strong | `#CBD5E1` | Active borders, focus rings |

### Text

| Name | Value | Use |
|------|-------|-----|
| Primary | `#0F172A` | Headings, primary content |
| Secondary | `#475569` | Body text, descriptions |
| Muted | `#94A3B8` | Placeholders, metadata |

### Brand (Indigo)

The single brand color. Indigo reads as smart, calm authority — not the electric blue every SaaS uses, not the purple that feels whimsical. It anchors the product in precision.

| Name | Value | Use |
|------|-------|-----|
| Brand | `#4F46E5` | Primary buttons, active sidebar links, focus rings |
| Brand light | `#EEF2FF` | Brand backgrounds, selected states |
| Brand muted | `#818CF8` | Icons, secondary brand moments |

### Performance (the score spectrum)

Scores are the product's core output — they need their own visual language. A 3-band spectrum that feels like a financial dashboard.

| Band | Value | Score range | Use |
|------|-------|-------------|-----|
| Critical | `#EF4444` → `#DC2626` | 0–4 | Low scores, failed states, objection alerts |
| Caution | `#F59E0B` → `#D97706` | 5–6 | Mid scores, analyzing states |
| Excellence | `#10B981` → `#059669` | 7–10 | High scores, complete states, positive trends |

### Accent (Amber)

A warm amber used selectively for "action" moments — CTAs on empty states, leaderboard highlights, upload prompts. Not overused. Creates warmth against the cool indigo.

`#F59E0B` — used in one place per screen maximum.

---

## Typography System

Two-typeface system:

- **Display + UI:** `Inter` — clean, variable weight, excellent at all sizes
- **Numbers + data:** `JetBrains Mono` — monospace for scores, IDs, timestamps. Makes data feel like data, not prose.

### Scale

| Role | Size | Weight | Tracking | Use |
|------|------|--------|----------|-----|
| Page title | 28–32px | 700 | −0.04em | Page headers |
| Section heading | 18–20px | 600 | −0.02em | Card titles, section labels |
| Body | 14px | 400 | 0 | Descriptions, transcript text |
| Label | 12px | 500 | +0.04em uppercase | Metadata, table headers |
| Score (large) | 48–64px | 700 | −0.04em | Overall call score — the hero number |
| Score (small) | 16–20px | 600 | 0 | Dimension scores, leaderboard |
| Mono data | 13–14px | 400 | 0 | Dates, IDs, counts |

---

## Depth & Shadow System

Three-level depth system replacing the current flat UI:

| Level | Shadow | Use |
|-------|--------|-----|
| Ground | `none` | Page background |
| Raised | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` | Cards, panels |
| Floating | `0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)` | Dropdowns, toasts, hover states |
| Modal | `0 20px 60px rgba(0,0,0,0.16)` | Overlays |

Cards lift on hover. Shadows deepen on hover. Everything interactive feels physically responsive.

---

## Animation & Motion Principles

**Library:** Framer Motion — no CSS-only animations for structural elements.

### The four animation types

1. **Mount animations** — every page and card fades in + translates up `8px` over `300ms` with a staggered delay per element. Pages feel like they are *arriving*, not appearing.

2. **Micro-interactions** — buttons scale to `0.97` on press. Cards lift `−2px` and shadow deepens on hover. All `150–200ms`, `ease-out`. Nothing is instantaneous.

3. **Data reveals** — score bars animate their fill from 0 on mount. Score numbers count up from 0 to their value over `800ms`. Chart lines draw in. These are the hero moments of the product.

4. **State transitions** — status badges transition between states with a crossfade. The `analyzing` state pulses. Toasts slide in from bottom-right with spring physics. Skeleton shimmer replaces the current CSS pulse.

### Motion budget

| Context | Duration | Easing |
|---------|----------|--------|
| User action response | 150ms | ease-out |
| Content reveal | 300–500ms | ease-out |
| Data animation | 600–900ms | ease-in-out |
| Nothing | >1000ms | — |

---

## Component Design Language

### Cards
- Background: `#F8FAFC` with `1px #E2E8F0` border
- `border-radius: 12px`
- Shadow: Level 1 (raised), lifts to Level 2 on hover
- Colored left border accent (4px) for category differentiation — indigo for analysis, amber for scores, green for complete

### Sidebar
- Width: `240px`
- Active link: indigo background pill `#EEF2FF` with indigo text and left border
- Logo area: bold wordmark with a subtle indigo mark
- Section labels: uppercase 11px muted text separating nav groups
- Bottom: user avatar + name + role badge, compact

### Scores (the visual hero)
- Large score: circular ring gauge (SVG `conic-gradient`) around the number
- Ring color = performance band (red/amber/green)
- Number animates up on mount via count-up
- Dimension bars: pill-shaped, animated fill, label left + value right

### Status badges
- Pill badges with subtle background and a colored left dot
- `analyzing`: amber dot with CSS pulse animation
- `complete`: green static dot
- `failed`: red static dot
- `pending`: gray static dot

### Empty states
- Larger SVG spot illustration per section (calls, reps, analytics)
- Headline in 20px semibold
- CTA button in brand indigo

### Data tables (call lists, rep lists)
- Subtle alternating row backgrounds
- Hover: full row highlight in `#F8FAFC`
- Score column: colored pill (not raw number)
- Smooth row hover transition `150ms`

### Dashboard Summary Cards
- Icon: colored glyph on a tinted background circle
- Value: large `32px` bold monospace
- Trend indicator: small colored arrow + percentage change
- Colored 3px top border per card category
- On hover: card lifts, subtle shimmer on value

---

## Page Transitions

Framer Motion `AnimatePresence` on all dashboard routes:

1. Current page: fade out + slide up `4px` over `150ms`
2. New page: fade in + slide up from `8px` over `300ms`

Pages feel like physical layers being swapped, not URL changes.

---

## Implementation Phases

Executed one component group at a time. No file has more than one concurrent edit. Backend stays unchanged — this is a purely visual layer.

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Design tokens — Tailwind config, typography, shadow scale, color vars | Pending |
| 2 | Shared components — cards, badges, skeletons, empty states, buttons | Pending |
| 3 | Layout — sidebar, topbar, dashboard summary cards | Pending |
| 4 | Dashboard & Calls — list, detail, upload form | Pending |
| 5 | Analysis components — score ring, dimension bars, objection tags, coaching cards | Pending |
| 6 | Reps + Analytics — charts, leaderboard, rep stats | Pending |
| 7 | Landing page — all 8 marketing sections | Pending |
| 8 | Animations — Framer Motion page transitions + mount animations across all pages | Pending |

---

## Summary

Off-white surfaces · Deep indigo brand · Red → Amber → Green performance spectrum · Inter + JetBrains Mono · Three-level shadow depth · Framer Motion transitions · Score ring gauges as the visual hero · Animated data reveals · FAANG-caliber without being a carbon copy of any one product.
