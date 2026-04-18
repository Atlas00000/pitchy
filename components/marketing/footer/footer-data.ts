/**
 * Marketing footer — navigation and factual copy (no UI).
 */

export type FooterLink = { readonly label: string; readonly href: string }

export type FooterColumn =
  | {
      readonly id: string
      readonly heading: string
      readonly kind: "links"
      readonly links: readonly FooterLink[]
    }
  | {
      readonly id: string
      readonly heading: string
      readonly kind: "note"
      readonly body: string
    }

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    id: "product",
    heading: "Product",
    kind: "links",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Social proof", href: "#social-proof" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    id: "account",
    heading: "Account",
    kind: "links",
    links: [
      { label: "Sign in", href: "/sign-in" },
      { label: "Get started", href: "/sign-up" },
    ],
  },
  {
    id: "company",
    heading: "Company",
    kind: "note",
    body: "Privacy policy and terms of service publish at general availability. If you need paperwork before then, reach out from your workspace once you are onboarded.",
  },
] as const

export const FOOTER_TAGLINE =
  "Transcripts in, structured coaching out — the same rubric in the product is what you see on this marketing surface."
