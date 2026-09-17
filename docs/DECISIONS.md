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
- **Homepage hero (revised on client feedback, superseded by D-007):** a centred composition modelled on Helcim's hero. The oversized headline is split around a tilted merchant device whose screen runs the S2 underwriting sequence, with pill CTAs and the lead over the device. A floating glass bar holds the fact row plus the live status and Replay. It fits within the first screen at 1280–1536px wide and ~720px tall. The device scales down on short screens; on mobile it sits between the headline and the CTAs. The hero's side-by-side underwriting card is replaced; the same sequence logic lives in `lib/useUnderwritingSequence.ts`, which the High-risk page card still uses.
- **Announcement bar:** centred single line with the close button at the far right. The unconfirmed text is flagged with a small amber marker instead of a dashed outline (`<Confirm variant="marker">`).
- **Pillars (S4):** now four large dark panels that pin in a stack on scroll; each arriving panel scales the ones beneath to 95%, 90% and 85% and darkens them slightly. This is driven by scroll position in `PillarStack` (no GSAP). Below 1024px the panels become a swipe carousel. Each panel carries a small product-UI illustration labelled "Illustration".
- **Featured industries:** a swipe carousel below 640px.
- **CtaBand:** now a full-bleed dark band with the hero's brand glow and centered copy, replacing the rounded brand-600 panel from PRD §8.6. Pages open and close on the same dark note.
- **Footer:** ends with the wordmark set edge to edge.
- **Showcase headings:** sections whose content spans the full width (the pillars stack) use centered headings. Everything else stays left-aligned.
- **What was not borrowed:** Helcim's purple/pink palette, photography and condensed type (the homepage headline is now condensed, see D-014). The PRD palette, fonts and "no stock photos" rule still apply.

**D-005 · Numbers only on real sequences.** Process timelines, programme steps, form steps and "What happens next" are numbered. Pillars, risk factors and features are not.

**D-007 · Homepage hero v3, modelled on Helcim's hero (requested 17 Sept 2026).** Amends the D-006 hero bullet and PRD §9.1.1. See D-008 and D-009 for the review fixes (tall desktops, terminal drawing and placement, scrolled state, glass blur).
- **First desktop screen:** only the header, the headline, a tilted card terminal and a glass status bar. The CTA row, lead and fact row sit directly below, still inside the hero section, starting at or just below the fold.
- **Both CTAs stay in the first viewport:** "Apply now" in the header (a white pill on the homepage) and "Talk to an expert" in the bar, next to a call button.
- **The bar** shows check progress ("n of 4"), the example application status, "Talk to an expert", call and Replay. Helcim's bar is a savings calculator; copying it would mean inventing figures, so there is no calculator. On desktop it is sticky at the bottom of the first screen and scrolls away with it, so it never covers the CTAs below.
- **No hand.** A drawn hand read as crude and would sit under the bar. The terminal's lower body fades out under a mask instead.
- **The terminal paints in front of the headline but never hides a letter.** Its top corner sits just under the first baseline and it fills the gap in "that … says". tests/hero.spec.ts checks this with pixel masks. The placement is calibrated to this five-word title. Any other title falls back to a centred headline with the terminal below it.
- **Header on the homepage** is transparent at the top, with the hero pulled up underneath it. It stays sticky and in normal flow, never fixed, so the announcement bar, skip link, scroll padding and anchor offsets are unchanged. The resting and scrolled backgrounds are two layers that crossfade on opacity. On the homepage a CSS scroll-driven animation drives the scrolled layer, so a reload part-way down the page never shows a transparent header before hydration. Firefox has no scroll timelines and waits for JS. The hairline is now an inset shadow, so the header measures exactly 80px (it was 81px).
- **Mobile (below 1024px):** headline, masked terminal window, status pill overlapping the window, stacked CTAs, lead, facts. There is one DOM and one live region, and the DOM order matches the visual order.
- **Fixes shipped with this work:**
  - Hidden `<Confirm>` tooltips are now `display: none`. While invisible they still added 36px of horizontal scroll at 360px.
  - The capability tab scroller now bleeds to the 20px mobile gutter. It overflowed by 4px on the Nutra page at 360px.
  - The hero height now uses `--announce-h`, so it still fills the screen after the announcement is dismissed.

**D-008 · Homepage hero v3, review fixes (17 Sept 2026).** Amends D-007, D-014 and D-039 after the design, responsive, accessibility and regression reviews.
- **Terminal drawing:** the body behind the front plate is now one SVG silhouette, a printer hump with the paper slot along its top edge that tapers into a grip with two side keys, with a rim light on the outer edge. The speaker slot is gone. The plate is 17.6u wide with 6u top corners, and the hump sticks out 3.5u.
- **Terminal placement:** left 15.58u, top 9.95u, still 20°. It now keeps at least 0.08em from the "p" descender in "processor" (it was 3-5px) and about 0.16em from "that" and "says" on both sides. The placement was solved with a pixel model of the real glyphs, and tests/hero.spec.ts checks it at five sizes.
- **Headline above the terminal:** the h1 now paints above the terminal (z-index 30 over 20). At rest they never overlap, so nothing looks different. With user text spacing, or during the entrance, the letters stay on top.
- **Tall desktops (superseded by D-009; height ≥ 52.25rem, e.g. 1440×900, 1920×1080, 2560×1440, iPad Pro portrait):** the first screen is capped at min(42rem, 10rem + 3.6 × headline size) instead of filling the viewport. The headline, terminal and bar stay together, and the CTA row, lead and facts show in the first view, as on Helcim at these sizes. The bar's own "Talk to an expert" and call button are hidden there because the foot CTAs are in view. Short desktops (the 1536×730 reference) are unchanged.
- **Short desktops:** the headline size gains a height term, min(…, (100svh − announcement − 13.5rem) / 2.4), so the bar never covers "yes." (checked down to 1280×450).
- **Scrolled state:** the terminal is faded out and clipped by a mask on the first-screen content box, which runs under the bar. Nothing of the device shows below the bar once the page scrolls. The backdrop blur moved from the full-width strip to the rounded pill, so there is no blurred rectangle.
- **Entrance:** the terminal rises 3u with a 2° turn and no overshoot. Words on lines 2 and 3 slide in from the outside. Nothing moves across a letter at any frame (checked every 100ms).
- **Glow:** a wide, low brand-500 band and a slightly higher sky-400 core brighten both sides of the terminal just above the bar, closer to the reference's brightness. The headline's worst contrast is still at least 5:1. MeshGradient mirrors the change.
- **Announcement dismissal:** `--announce-h` switches to 0 when the collapse starts (`data-announcement="dismissing"`). Elements marked `data-announce-steady` (the hero stage) are offset each frame in proportion to the bar's remaining height (transform only), so they move on the collapse's own curve. A separate transform transition was tried first: under load its compositor start lagged the height transition and the headline dipped up to 26px. Animating the hero's min-height with the collapse also stayed in sync, but re-rastered the hero every frame. The bar stays on the fold, and the headline glides 14px up instead of rising and snapping back.
- **Mobile:** the terminal window's glow is sized from the window, so a short window no longer shows a hard edge. The headline size gains a 22svh term for landscape phones. Until the display font loads, the h1 holds its three-line height (JS only), so a wide fallback font no longer pushes the terminal and CTAs (CLS with fonts delayed 2.5s: 0.093 → 0.031). The sticky mobile CTA waits until the hero CTA row has scrolled away.
- **Accessibility:**
  - In Windows contrast themes the h1 uses line-height 1.05 and the decorative terminal is hidden, so the text backplates no longer cut the letters.
  - The bar pill shrinks and truncates its labels under user text spacing instead of pushing Replay off screen.
  - Screen readers hear the status once: "Underwriting checks: n of 4 complete" and the live region. The visible duplicates are aria-hidden.
  - With reduced motion, Replay is not shown (it had nothing to replay), and the approved state is drawn in CSS before hydration.
  - `--header-h` is 5rem, so the pull-up matches the header at any default font size. The pill has a minimum height rather than a fixed one.
  - The WebGL glow now unmounts if reduced motion is switched on mid-visit.
  - The "Example" tag on the terminal is about 12px and sits on the figure's row.
  - Primary and white buttons get a border in forced colours, and the logo link is at least 44px wide.
- **Bar details:** a short "Checks" label shows from 1024px ("Underwriting checks" from 1280px). Progress marks sit at the counter's stops and hide once reached, and the counter has a ring, so a mark never touches it. On the stacked layout the status sits next to its label.
- **Tooltips:** `<Confirm tooltipAlign="center">` centres the tooltip. The announcement bar anchors it to the full-width bar, so it stays on screen at 320px.
- **Not changed:**
  - On short desktops "Talk to an expert" still shows twice while the bar scrolls away (bar and foot, about 100-400px of scroll). Hiding the bar's copy there would leave a gap in the pill or change focus order mid-scroll. (Changed in D-009.)
  - On phones with tall browser toolbars (about 390×664) only the top of the terminal shows above the status pill. A taller window would push the CTAs out of the first view.
  - Pillar heading links (35px tall) and the header under user text spacing at 1024px predate this work.

**D-009 · Homepage hero v3, second review fixes (17 Sept 2026).** Amends D-007 and D-008 after the second fidelity, responsive and regression reviews.
- **Tall desktops follow the build spec again.** On every landscape desktop, whatever its height, the first screen fills the viewport. The glass bar is docked on the fold at load, the pill is 1164px wide with its own "Talk to an expert" and call button, and the CTA row, lead and facts start below the fold. This replaces the D-008 cap at heights of 52.25rem and up. The cap left the bar floating halfway down the hero at 1440×900 and 1920×1080, at a narrower width, and cut the terminal off like a shelf. Measured: 1440×900 pill 138-1302 × 826-884, 1920×1080 pill 378-1542 × 1006-1064, both as in the spec.
  - Helcim's order at these sizes (headline, CTAs, lead, then a docked bar) was not copied. It needs the CTAs before the bar in the DOM, but phones need the status pill before the CTAs, and the DOM order has to match the visual order at every width. A bar docked over the CTAs would also cover a focused CTA while tabbing.
  - The hard step at 52.25rem is gone, so resizing a window no longer makes the composition jump.
  - **Portrait desktop-layout viewports** (such as iPad Pro portrait, 1024×1366) stop the first screen at the viewport width: min(100svh, 100vw) minus the announcement bar. The height is continuous across a square viewport. The CTA row, lead and facts show in the first view there, so the bar drops its own CTA copy.
  - The terminal's long lower body now fades out on its own, from 39.7u to 61.4u. On very tall screens (such as 2560×1440) its end never shows above the bar. At 1536×730, 1280×720 and 1366×768 the fade starts below the bar, so nothing changes.
- **Glass blur now renders.** The bar's entrance and the foot CTA row's `anim-rise` used fill mode `both`. A finished animation stayed in effect and made the wrapper the pill's backdrop root, so `backdrop-blur` blurred nothing. Both now use `backwards`. The keyframes are from-only, so the resting state is unchanged. A test checks that no animation stays in effect and that the blur changes the pixels behind the pill.
- **Bar CTA copy on scroll.** Once the page scrolls 16-56px, the bar's "Talk to an expert" and call button fade out. The space is kept, so the pill doesn't reflow, and hidden controls leave the tab order. A control that has focus stays visible, because tabbing into the bar during its entrance scrolls the page. This uses a CSS scroll timeline, like the header. Firefox keeps the copy. The phone number stays in the header (1280px and up) and the footer.
- **No terminal tail under the pill.** The first-screen mask is fully transparent in the bottom 1rem (below the pill), so no dark band hangs under the pill once the bar leaves the fold.
- **"Example" tag on the terminal.** The tag lost its vertical padding and the figure moved down 0.15em. There is now about 0.7u of clear space above the digits (it was about 0.25u), and the check list moves down about 3px.
- **Mobile status pill** is sized to its content (it was the full 448px at tablet widths, which left a gap before Replay). Below 360px the label reads "Example" instead of a truncated "Example ap…". Screen readers still hear the full status from the sr-only text.
- **Confirm tooltips** are nudged sideways when they open, so they stay 16px inside the viewport and never make a narrow page scroll sideways ("Nine hardware brands" on the homepage, "about five minutes" on /live-form). A small client component, `ConfirmTip`, does the nudge.
- **Announcement dismissal** ignores a second click or Enter while the collapse is running. A double-click used to restart the headline offsets and snap it 29px.
- **Not changed:**
  - **Headline shape.** Line 3 holds only "yes." (build spec §0.5), so the lower left of the block is open glow, where Helcim has a full rectangle. This is accepted. The h1 must read "The processor that says yes.", and a steeper terminal lean would need the letter-clearance pixel model solved again.
  - **Fallback font before Archivo loads** (spec risk §16.1). Next preloads the Archivo file. Hiding the terminal until JavaScript reports the font loaded would delay the terminal until hydration on every visit, including visits with the font cached. No narrow local fallback exists on every platform.
  - **Header at a larger browser default font size.** It overflows on every route, not just the hero, and predates this work. It is tracked separately.

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

**D-014 · Homepage display type.** Applies to the homepage h1 only, and amends PRD §5.2 (width about 112, 88px display) and D-006.
- **Setting:** Archivo at `font-stretch: 66%`, weight 800, line-height 0.8, no letter-spacing.
- **Desktop:** the font size is `min(9.6rem, 10vw, 21svh)`. Lines are justified inside a 5.12em block, which opens the gap for the terminal.
- **Below 1024px:** the size is `min((100vw − 2.5rem) × 0.188, 6.4rem)` and the lines are centred.
- **Match with Helcim:** at 1536×730 this gives the same cap height (about 106px) and block width (51% of the viewport) as Helcim's headline. Helcim's own font has unusually tall capitals, which is why Archivo needs about 153px to match their 88px.
- **Other headings** keep 112%.

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
- It loads only at ≥768px (≥1024px since D-039), after page load on idle.
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

Re-measured on 17 Sept 2026 after the hero v3 rebuild (D-007). Setup: Lighthouse 13.4.1 mobile, Google Chrome 152, `pnpm start` on localhost, 3 runs. Lighthouse 12.8.2 reported no LCP at all with Chrome 152 or Playwright's Chromium, so these numbers are not directly comparable with the table above. The previous hero was rebuilt and measured with the same setup for a fair comparison:

| `/` | Perf | A11y | Best practices | LCP (simulated) | LCP (observed) | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Hero v3 | 72–79 | 100 | 100 | 4.6s | 1.14–1.17s | 240–450ms | 0 |
| Previous hero | 76–78 | 100 | 100 | 4.6–4.7s | 1.14–1.55s | 240–300ms | 0 |

`/industries`, which did not change, measures a 4.6s simulated LCP with the same setup.

Next steps:
1. Re-measure on the Vercel preview (M9).
2. Move more section wrappers to server components (Testimonials, TechnologySection shells).
3. Lazy-load the mobile menu sheet.
4. Consider dropping Lenis, the heaviest optional enhancement.

**D-039 · Hero motion and S1 recomposition.** Amends D-030 and D-035.
- **Entrance:** CSS keyframes from first paint, transform and opacity only, settled after about 1.75s.
  - The glow fades in and its core rises (1000ms).
  - The headline words rise (900ms). On desktop, the words on lines 2 and 3 slide in from the outside (D-008; they first moved outward from the centre).
  - The terminal rises with a 2° turn and no overshoot (1600ms; since D-008, it first turned in from −14° with a 1.5° overshoot, which crossed "that"), and its screen lights up from dark (500ms, starting at 750ms).
  - The bar slides up (500ms, starting at 900ms).
  - Durations are tokens: `--duration-hero-*` in CSS and `duration.hero` in `lib/motion.ts`.
- **The S2 sequence is unchanged.** The bar's progress track follows it, and Replay is never disabled, so keyboard focus stays on it.
- **Glow:** anchored at the bottom of the first screen behind the bar, with its tail fading out by the lead. It uses brand tokens only: ink-950, brand-900/800/600/500 and sky-400. It is two layers:
  - `.hero-glow` is the static wash and only fades in.
  - `.hero-glow-core` holds the bright layers and rises.
  - Why two layers: when a single layer rose, its top edge showed as a hard band under the transparent header. Chromium also rejects `calc()` that mixes percentages and lengths in radial-gradient sizes, so the geometry stays in plain percentages.
- **WebGL (MeshGradient):** now an exact port of those CSS layers.
  - It loads at ≥1024px only (was 768px), still after load on idle, and unmounts below 1024px.
  - Parity on a hardware GPU is a mean |ΔRGB| of 1.3 or less at five sample points. tests/hero-webgl.spec.ts checks it and skips when only a software renderer is available.
- **Reduced motion:** no entrance animations, final states at once, no canvas.

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

**D-052 · Tests** run against a production build: `pnpm build && pnpm test:e2e`. Specs cover routes, links, noindex headers, keyboard menus, mobile menu, sticky CTA, announcement persistence, the full apply flow (including "no requests sent"), axe on every page, and reduced-motion final states, in desktop and mobile projects. `tests/hero.spec.ts` adds the homepage hero checks from D-007, D-008 and D-009: geometry at eight desktop sizes plus very tall, portrait and short viewports, the glass blur, the bar CTA fade on scroll, tooltip placement at 320 and 360, pixel masks proving the terminal hides no letter at rest or during the entrance, the scrolled state, mobile layout, overflow and tooltips, header layers and announcement dismissal, contrast over the glow, screen-reader status, tab order, Replay, forced colours, text spacing, font swap and entrance timing. `tests/hero-webgl.spec.ts` checks WebGL parity when a GPU is available, with the page on a paused fake clock so the capture is at shader time ~0 however slow the machine is (the shader drift made it fail under parallel load).
