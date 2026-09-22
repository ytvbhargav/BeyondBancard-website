# CLAUDE.md — Beyond Bancard Redesign Demo

## What we are building
An interactive design demo for the Beyond Bancard (payment processor) website revamp: the six PRD pages plus the Company and Resources pages (D-054), Adult and Partner programs (D-057), and the top 6 industries and every Solutions page (D-058).
Client uses it to approve design, navigation, content tone and motion before the full ~100-page build.

**Full spec: `docs/PRD.md` — read it before any work. It is the source of truth.**

## Pages (keep these exact routes)
`/` · `/accept/high-risk-processing` · `/industries` · `/industries/nutra-supplements` · `/partners/isos-agents` · `/live-form`
Added in D-054: `/about-beyond-bancard` · `/careers` · `/contact-us` · `/news` · `/news/what-is-a-high-risk-merchant-account-and-how-does-it-work` · `/our-clients` · `/faq`
Added in D-057: `/industries/adult` · `/partners`
Added in D-058: `/industries/gaming` · `/industries/ruo-peptides` · `/industries/travel-payment-solutions` · `/industries/crb` · the Solutions hubs `/accept` · `/protect` · `/grow` · `/operate` and every page in the Solutions menu (`SolutionPage` template, content in `content/solutions/`).
Every other internal link → `/coming-soon?from=<path>` via `href()` in `lib/links.ts`.

## Stack
Next.js (App Router) + TypeScript strict · pnpm · Tailwind v4 (tokens in `app/globals.css`) · shadcn/ui ·
lucide-react · motion (`motion/react`) · GSAP ScrollTrigger (scroll timelines only) · Lenis ·
react-hook-form + zod · Playwright + axe · Vercel.

## Commands
- `pnpm dev` — local dev
- `pnpm lint && pnpm tsc --noEmit` — static checks
- `pnpm build` — must pass, all routes static
- `pnpm test:e2e` — Playwright (links, keyboard nav, form, axe)

## Hard rules
1. **Never invent facts** (stats, timeframes, bonuses, certifications, logos, quotes, customers).
   Unverified content must use `<Confirm note="...">` and be listed in `docs/CONFIRM_LIST.md`.
2. Use design tokens only — no hard-coded colors, font sizes or durations.
3. Motion: transform/opacity only; micro 150–250ms; reveals play once; honor `prefers-reduced-motion`.
4. No `href="#"`. No real form submissions or network calls. No analytics.
5. Accessibility WCAG 2.2 AA: keyboard menus, visible focus, one H1, aria-live for status changes, zoom allowed.
6. CTA labels exactly: "Apply now", "Talk to an expert", "Become a partner".
7. Keep regulatory disclosures verbatim (PRD §8.5).
8. Components must be reusable and data-driven from `content/*.ts` (future CMS).
9. Do not add pages, sections or dependencies not in the PRD without logging why in `docs/DECISIONS.md`.

## Workflow
- Work milestone by milestone (PRD §14). Plan first, then build, then run quality gates (PRD §12).
- After each milestone: summarize what changed, list open CONFIRM items, and stop for review.
- Take screenshots at 390px and 1440px into `docs/screenshots/` when a page is done.

## Style
- Sentence-case headings, plain language, short sentences.
- Calm, precise fintech look: whitespace, strong type, brand blue, restrained color.
- Avoid: purple gradients, all-caps headings, emoji, generic identical card grids, stock photos.
