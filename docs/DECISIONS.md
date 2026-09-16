# Decisions

Choices made where the PRD was silent, or where following it literally conflicted with another requirement. Newest decisions are at the bottom of each group.

## Design direction

**D-001 · Visual concept: "the underwriting file."** The PRD fixes palette, fonts and radii. Everything else borrows from the most characteristic artifact in the business, a merchant application under review: label/value rows with hairlines, tabular figures, check states and status pills. The one bold moment is the homepage card ticking to *Approved* beside "The processor that says yes." Everything around it stays quiet.

**D-002 · Status colours are semantic only.** Green = approved, amber = in review, red = form errors. None are used decoratively. Blue marks things you can click.

**D-003 · No eyebrow labels above headings.** `Eyebrow.tsx` from the PRD folder list became `components/ui/breadcrumb.tsx` and is used only for page context on interior heroes.

**D-004 · Feature sets are not identical card grids.** `FeatureGrid` has three structures chosen by meaning: `ruled` (peers under a top rule), `rows` (a vertical checklist) and `panel` (one white file panel split by inner lines). Real cards are kept only where the PRD asks for cards (industries, audience, other programmes).

**D-006 · Layout and motion pass inspired by helcim.com (requested by the client-side team, 16 Sept 2026).** Overrides parts of the PRD:
- **Section rhythm:** changed from `py-24 md:py-32` (PRD §5.4) to 56 / 80 / 100px (`section-y`). The container is 1280px with 40px side padding (1200px content).
- **Header:** full width (1440px max) with the navigation centered.
- **Homepage hero (revised on client feedback):** a centred composition modelled on Helcim's hero. The oversized headline is split around a tilted merchant device whose screen runs the S2 underwriting sequence, with pill CTAs and the lead over the device. A floating glass bar holds the fact row plus the live status and Replay. It fits within the first screen at 1280–1536px wide and ~720px tall. The device scales down on short screens; on mobile it sits between the headline and the CTAs. The hero's side-by-side underwriting card is replaced; the same sequence logic lives in `lib/useUnderwritingSequence.ts`, which the High-risk page card still uses.
- **Announcement bar:** centred single line with the close button at the far right. The unconfirmed text is flagged with a small amber marker instead of a dashed outline (`<Confirm variant="marker">`).
- **Pillars (S4):** now four large dark panels that pin in a stack on scroll; each arriving panel scales the ones beneath to 95%, 90% and 85% and darkens them slightly. This is driven by scroll position in `PillarStack` (no GSAP). Below 1024px the panels become a swipe carousel. Each panel carries a small product-UI illustration labelled "Illustration".
- **Featured industries:** a swipe carousel below 640px.
- **CtaBand:** now a full-bleed dark band with the hero's brand glow and centered copy, replacing the rounded brand-600 panel from PRD §8.6. Pages open and close on the same dark note.
- **Footer:** ends with the wordmark set edge to edge.
- **Showcase headings:** sections whose content spans the full width (the pillars stack) use centered headings. Everything else stays left-aligned.
- **What was not borrowed:** Helcim's purple/pink palette, photography and condensed type. The PRD palette, fonts and "no stock photos" rule still apply.

**D-005 · Numbers only on real sequences.** Process timelines, programme steps, form steps and "What happens next" are numbered. Pillars, risk factors and features are not.

## Tokens and type

**D-010 · Contrast fixes.** Measured against WCAG AA:
- White on `success-600` is 4.35:1, so the announcement bar uses a new `success-700 #0F7A52` (5.35:1).
- Amber text on `warning-100` is 3.6:1, so pill text uses a new `warning-700 #8F5600` (5.5:1).
- Green text on `success-100` is 3.8:1, so it uses `success-700` (4.7:1).
- `brand-600` on white is 5.2:1 and `muted` on paper is 5.7:1, both kept.
- Brand blue fails on ink (3.2:1), so dark sections use `on-dark` text, and `brand-300` for focus rings.

**D-011 · Full blue scale.** `brand-50`…`brand-950` were added from the provisional `#2F5BFF`, plus `ink-700` and `line-strong`, following the colour notes at the end of the PRD. Swapping the brand hex means editing `app/globals.css` only.

**D-012 · Fluid type.** Each PRD token interpolates between its mobile and desktop size with `clamp()` instead of jumping at one breakpoint. Utilities are named `type-display` … `type-small`, and tailwind-merge is taught about them in `lib/utils.ts`.

**D-013 · Archivo width.** Headings use the variable font with `font-stretch: 112%`. Archivo's ampersand is distinctive at this width; confirm the client is happy with it.

## Components and structure

**D-020 · UI file names are lowercase.** The PRD lists `Button.tsx` beside shadcn's `button.tsx`. On Windows (case-insensitive) these collide, so every `components/ui` file follows shadcn's lowercase naming. Layout, sections and motion files stay PascalCase.

**D-021 · shadcn setup.** shadcn CLI v4 (Radix base, Nova preset) was used and every component restyled to the tokens. The CLI's `cn` package was replaced with `clsx` + `tailwind-merge`, as the PRD specifies.

**D-022 · Header width.** The logo, five menus, phone, Log in and Apply now don't fit in the content width, so the header spans the full page (max 1440px) with the navigation centered (see D-006). Menu item padding tightens between 1024 and 1279px.

**D-023 · Mega menu morph.** Radix already exposes the viewport size as CSS variables, so the panel animates width and height with a CSS transition and glides horizontally under the active trigger. This replaces Motion `layout`, which would scale the text during the morph. Hover intent is 80ms and the close delay is Radix's 150ms.

**D-024 · External links** (portals, social, maps) open in a new tab with visible arrow icons and "(opens in a new tab)" screen-reader text.

**D-025 · CTA routing.** "Become a partner" always routes to `/coming-soon?from=/partners/isos-agents#apply` (PRD §5.5), even on the ISOs page. The ISOs CtaBand secondary, "Talk to our partner team", goes to `/contact-us` (coming soon).

**D-026 · Social icons** are simple drawn glyphs because lucide-react v1 removed brand icons. Swap for licensed brand assets in the full build.

**D-027 · Capability tabs** are a vertical tab list on desktop (horizontal pills on mobile), with tools listed as rows. Pillars with one tool would otherwise leave half the row empty.

**D-028 · All industries** lists the 32 non-featured industries grouped by section; the featured six sit above. Search matches name and teaser.

**D-029 · Marquee pause button.** A visible pause/play toggle was added beside the trust marquee. Pausing on hover or focus alone doesn't meet WCAG 2.2.2 for touch users.

## Motion and performance

**D-030 · Hero entrances are CSS.** The headline words, lead, CTAs and card animate with CSS keyframes, so they paint before hydration and don't delay LCP. The route fade (M11) only runs on client-side navigations, never the first load.

**D-031 · Scroll reveals without per-element JS.** `Reveal`/`Stagger` render plain markup. One `RevealObserver` (a single IntersectionObserver) marks elements shown, and CSS runs the fade-up. Content is hidden only when JS is running (`html.js`) and never with reduced motion.

**D-032 · Motion is lazy.** Interactive sequences (underwriting card, form steps, filters, checklist, tabs) use `m` components under `LazyMotion`. Layout animations (`domMax`) load only for the industries filter.

**D-033 · GSAP is dynamically imported** only when the High-risk lifecycle timeline (S5) approaches the viewport. The pillars stack no longer needs it (D-006). `@gsap/react` was removed because it would pull GSAP into the initial bundle.

**D-034 · Lenis** loads on idle, only for fine pointers with motion allowed, and pauses while the mobile menu is open.

**D-035 · Mesh gradient (S1).**
- A fresh canvas is created per mount, so a released WebGL context is never reused.
- It loads only at ≥768px, after page load on idle.
- It skips software renderers (SwiftShader/llvmpipe).
- It renders at half resolution, capped at DPR 1.5 and ~30fps, and pauses offscreen or in hidden tabs.
- The static CSS gradient is always painted underneath, so mobile and reduced-motion visitors see the same composition, just still.

**D-036 · Validation uses `zod/mini`** with named imports. The classic `z` namespace added ~100kb gzipped to `/live-form`.

**D-037 · Next button is `aria-disabled`.** The PRD asks for Next to be disabled until the step is valid. A native `disabled` button can't be focused and gives no reason, so the button looks disabled but stays focusable, and pressing it shows the inline errors and focuses the first invalid field.

**D-038 · Performance status (open).** Lighthouse mobile against `pnpm start` on localhost:

| Page | Perf | A11y | Best practices | LCP | TBT | CLS |
|---|---|---|---|---|---|---|
| `/` | 64–79 | 100 | 100 | 4.0–4.5s | 370–810ms | 0 |
| `/accept/high-risk-processing` | 80–82 | 100 | 100 | 3.6s | 350–420ms | 0 |
| `/industries` | 80–86 | 100 | 100 | 3.6–4.6s | 220–230ms | 0 |
| `/industries/nutra-supplements` | 73–83 | 100 | 100 | 3.9–4.2s | 270–520ms | 0 |
| `/partners/isos-agents` | 78–81 | 100 | 100 | 3.9–4.0s | 320–370ms | 0 |
| `/live-form` | 74–81 | 100 | 100 | 3.8–4.1s | 280–590ms | 0 |

Ranges are across runs on the same machine. Accessibility and best practices meet the PRD. Performance does not yet meet ≥90.

Measured facts:
- Real LCP (4× CPU, no network throttle) is ~0.6s, at first paint (the announcement text).
- Lighthouse's simulation attributes script execution to LCP because assets arrive before first paint on localhost.
- Initial JS is ~230–285kb gzipped, of which Next.js + React are ~122kb, so the 180kb per-route budget is not achievable with this framework version alone.

Next steps:
1. Re-measure on the Vercel preview (M9).
2. Move more section wrappers to server components (Testimonials, TechnologySection shells).
3. Lazy-load the mobile menu sheet.
4. Consider dropping Lenis, the heaviest optional enhancement.

## Content

**D-040 · Drafted supporting copy.** The PRD gives titles but no body text for these, so they were written using only facts already in the PRD. Client review needed:
- **Homepage:** FAQ title "Questions merchants ask."
- **High-risk:** four philosophy feature sentences (the PRD asked for existing site copy, which wasn't supplied); featured section title and lead.
- **Industries hub:** approach heading; the four step sentences, completed from the truncated site copy in the PRD.
- **Nutra:** Why Beyond bodies; capabilities heading; checklist lead; process heading and step bodies.
- **ISOs & agents:** audience card bodies; programme step bodies; portal heading and body; CtaBand body.
- **Apply:** average-ticket ranges; best-time options; "What happens next" step bodies; all validation messages.
- **Coming soon and 404:** body copy.

**D-041 · Illustrative figures.**
- The homepage card uses only PRD-specified values ($250,000, labelled "Example application").
- The checkout mock shows $49.00, labelled "Example".
- The Nutra dashboard has no figures.
- The partner portal uses generic merchant descriptions and no amounts, labelled "Illustration".

**D-042 · Demo mode defaults on.** `<Confirm>` treats anything except `NEXT_PUBLIC_DEMO_MODE=false` as demo mode, so a missing env var never silently hides content during review. In production mode, unconfirmed FAQ items are dropped entirely.

**D-043 · Testimonials** are flagged once as a group (display permission) rather than per quote. Wording is untouched.

## Tooling

**D-050 · Next.js 16.3 (Turbopack).** The app was scaffolded into the repo root beside `docs/`. No git repository was initialized.

**D-051 · `/dev/styleguide`** is available in development and returns 404 in production builds.

**D-052 · Tests** run against a production build: `pnpm build && pnpm test:e2e`. Specs cover routes, links, noindex headers, keyboard menus, mobile menu, sticky CTA, announcement persistence, the full apply flow (including "no requests sent"), axe on every page, and reduced-motion final states, in desktop and mobile projects.
