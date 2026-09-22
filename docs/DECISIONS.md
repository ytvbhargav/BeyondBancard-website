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

## Footer

**D-053 · Footer v2, modelled on Helcim's footer (requested 17 Sept 2026). Superseded by D-055: reverted.** Amends the D-006 footer bullet and the PRD §8.4 layout. Contact data and disclosures are unchanged; the footer now links every existing menu item.

- **Layout:**
  - From 1280px: a contact rail (logo, phone/fax/email, address, social, then copyright and the verbatim disclosures) beside three link columns with 11 bold-headed groups: Accept, Protect, Grow, Operate | Complex industries, Everyday businesses, Partners | Resources, Company, Log in, Legal.
  - 1024-1279: a contact band on the links' three-column grid (the address block starts on the second column), the three columns, then the small print.
  - Every grid track is `minmax(0, …)` and the footer logo's name may wrap, so text-only zoom (200%) wraps inside the content box instead of overlapping the columns or being clipped.
  - Below 1024: native details accordions, all closed, in two columns from 768.
- **Links:**
  - There is no bottom bar; the legal links are the "Legal" group.
  - Cannabis-related businesses, the everyday groups, the portals and Become a partner are now linked.
  - The social links are 24px glyphs in on-dark, each with a small raised new-tab arrow (D-024).
  - Rows are 44px tall below lg and on coarse pointers, and stay full column width on touch; Helcim's 32px rhythm applies only to a mouse at lg and up.
  - The logo keeps its name at every width (the header hides it below 380px).
  - Phone, fax, both emails and the address are all set in on-dark; labels and nav links use on-dark-muted.
- **Wordmark:** "Beyond Bancard." in Archivo 800 at 66% width (the D-014 voice), with a brand-600 rounded-square full stop (0.28em, radius 28% like the Logo tile, so it reads as a deliberate brand shape rather than punctuation). It fills the container width exactly: one line from a 440px container, two lines below. It is built from HTML letter spans sized in cqi, decorative and aria-hidden. The stop is baseline-aligned, so it lands on the same pixel row as the letters.
  - Known limitation: the cqi sizing is calibrated for Archivo at 66% width. If Archivo fails to load (or during the swap period, if the wordmark is already on screen), the wider fallback font is clipped at the container edge; the page never scrolls sideways. next/font self-hosts and preloads Archivo, and the wordmark sits at the page end, so this is rarely visible.
- **Motion:** the letters rise from a baseline mask 40ms apart (`--duration-slow`, `--ease-out`); the stop drops in last, 600ms in, over 520ms on cubic-bezier(.34,1.35,.64,1), dipping about 0.036em below the baseline (about 7.5px at 1440) with the scale peaking near 1.024 before it settles. It runs 1.12s, once, using CSS transitions on translate/scale/rotate/opacity only. No globals.css change.
  - **Trigger:** RevealObserver, through a bare data-stagger sentinel at mid-height, clamped to at least 9lvh above the wordmark's bottom edge so it still fires on very tall screens (RevealObserver ignores the bottom 8% of the viewport).
  - **Fallbacks:** the letters are hidden only while RevealObserver is watching the sentinel (data-observed without data-shown), and that hide is a zero-length transition delayed by twice `--duration-slow` (1.2s). A wordmark already on screen at hydration (a reload at the page end, or a visitor who reached the footer before the scripts loaded) gets data-shown a frame or two later (up to about 300ms on a 6x-throttled phone), which cancels the pending hide, so it stays final and never blinks out to replay. Off screen the hide lands unseen; a visitor who reaches the footer within 1.2s of hydration simply sees the final wordmark without the entrance. Reduced motion, no JS and failed script bundles all show the final wordmark.
  - **Accepted limits:** like every `data-reveal` block on the site, the wordmark relies on the IntersectionObserver callback once RevealObserver has started watching, so a full-page capture taken without scrolling shows it hidden; a CSS failsafe would need keyframes in globals.css. On a very tall screen where only the top sliver of the wordmark is visible at load, that sliver hides 1.2s after hydration and the entrance plays when the visitor scrolls on.
  - **Hover hop (fine pointers, motion allowed):** the letter under the pointer rises 0.06em (`--duration-fast`) and settles back (`--duration-base`, `--ease-in-out`) while the pointer stays, so a parked pointer never leaves a letter raised; pointer-out never snaps. Sweeping across the word makes a wave. CSS cannot tell a resting pointer from a moving one, so a pointer parked where a letter rises hops that letter once during the entrance; accepted as a small extra lift.
  - The 520ms overshoot and the 40ms stagger (`stagger.tight` in lib/motion.ts) are the only timings outside the duration tokens.
- **New labels:** "Phone", "Fax", "Email", "Headquarters" (PRD §1: headquartered in Orange, California) and "Legal". They restate data only.
- **Type:** group headings and the Headquarters label use Archivo at 112% width (D-013).
- **Data:** `footerColumns` is replaced by `footerGroups` in `content/site.ts`.
- **Tests:** `tests/footer.spec.ts` covers structure and links on every demo route, layout and heights per breakpoint, tap targets, new-tab links, contrast, wordmark fit and overflow, the entrance (including tall screens, failed script bundles and a reload at the page end), the hover hop, text-only zoom, reduced motion, forced colours, touch-tablet targets and the sticky CTA.
- **Outside the footer:** after a reload at the page end on mobile, the sticky "Apply now / Call" bar (StickyMobileCta.tsx) can stay over the footer; scrolling there normally hides it. It predates this footer and needs its own fix in that component.
- **CONFIRM:** the "Beyond Bancard." full-stop lockup. The wordmark is aria-hidden, so it has no `<Confirm>` wrapper; the question is listed under "Open questions" in docs/CONFIRM_LIST.md (scripts/confirm-list.mjs).

**D-055 · Footer reverted to the D-006 footer (requested 17 Sept 2026).** The client asked for the footer exactly as it was before D-053. `components/layout/Footer.tsx` and `content/site.ts` are restored from commit 7e65eb4:
- **Layout:** the contact block and four link columns (Solutions, Industries, Partners, Company), then the disclosures, then a bottom row with copyright, Terms, Privacy, Accessibility and social icons (PRD §8.4).
- **Wordmark:** the static "Beyond Bancard" SVG set edge to edge (D-006), with no entrance or hover animation.
- **Removed with it:** `FooterNav.tsx`, `FooterWordmark.tsx`, `footerGroups` (back to `footerColumns`), `tests/footer.spec.ts`, and the "Beyond Bancard." lockup question in CONFIRM_LIST.
- **Kept:** the Company column still lists About, Careers, Contact, Blog, Client stories and FAQ; since D-054 those links open the new pages instead of `/coming-soon`.

**D-056 · Footer wordmark: fully visible, tighter spacing, rise on scroll (requested 17 Sept 2026).** Amends the D-055 wordmark.
- **Spacing:** the wordmark is no longer pushed past the footer's bottom edge (the `translate-y-[14%]` crop is gone). Its viewBox is 1000 × 136, fitted to the ink (cap tops at y≈4, the "y" descender at y≈132 below the 104 baseline), so no letter is cut. The gap above it is `mt-10 md:mt-12` (was `mt-14 md:mt-20`) and the footer gains `pb-10 md:pb-12` below it. Measured ink to neighbours: 53px above and below at 1440, 41px at 390.
- **Motion:** it rises as one piece out of its own clip box, once, when it scrolls into view: `translate` from 100% to none over 1.5 × `--duration-slow` (900ms) on `--ease-out`. No letter stagger, no hover effect, nothing after it settles.
- **Trigger:** RevealObserver, through a bare `data-stagger` sentinel that spans the wordmark and 12lvh above it. The wordmark itself can't be observed: while hidden below the clip it never intersects, and at 390px it is only ~41px tall, inside the bottom 8% RevealObserver ignores. The sentinel has `pointer-events: none`; the legal and social links it overlaps stay clickable (checked at 390 and 1440).
- **Fallbacks:** hidden only when JS runs (`html.js`) and motion is allowed, like every other reveal (D-031). Reduced motion and no-JS show the final wordmark. Like other reveals, a reload at the page end shows it rising once scripts hydrate.

## Company and Resources pages

**D-054 · Company and Resources pages (requested 17 Sept 2026).** Six Company and Resources menu destinations that went to `/coming-soon` are now demo pages. Design spec: `docs/superpowers/specs/2026-09-17-company-resources-pages-design.md`, where each page section ends with an "As built" note.

- **Scope:**
  - Seven routes join `DEMO_ROUTES` (`lib/links.ts`, `tests/routes.ts`): `/about-beyond-bancard`, `/careers`, `/contact-us`, `/news`, `/news/what-is-a-high-risk-merchant-account-and-how-does-it-work`, `/our-clients` and `/faq`.
  - This overrides the PRD §2.2 non-goal "Blog" and grows the demo beyond the six PRD pages.
  - The blog has an index and one article template. Every other post, and "Older articles", still goes to `/coming-soon`.
- **Content:** only the PRD, existing `content/*.ts`, or the live beyondbancard.com page for the route (captured 17 Sept 2026). The article body is copied verbatim. Unverified items render through `<Confirm>`, and open client questions are in `scripts/confirm-list.mjs`.
- **Section tabs removed (client feedback):** a tab-like row of sibling pages (About, Careers and Contact; Blog, Client stories and FAQ) was built under each hero, then removed. The client read it as FAQ and Client stories being on one page. Wayfinding stays with the header menus and breadcrumbs. `SectionNav.tsx` and its `PageHero` prop are deleted.
- **Rules on every page:**
  - Breadcrumbs start with "Company" or "Resources" as plain text, because neither has a hub page.
  - Browser titles are the menu labels (About, Careers, Contact, Blog, Client stories, FAQ). The article uses the post title.
  - Section h2s end with a full stop, as on the original pages. Panel labels and FAQ topic names (which double as rail labels) don't.
  - The sticky mobile CTA is off on `/contact-us` and `/careers`, where "Apply now" would compete with the page's job.
  - Production mode (D-042) drops a group of unconfirmed content whole; the contact form is the one exception. No heading renders empty: the marker sits beside the heading text, or the whole block is demo-only.
  - PRD §10.5 exception: the Careers and Client stories H1s say "Beyond". The lead right under each names Beyond Bancard.
- **About (`/about-beyond-bancard`):**
  - **Hero:** H1 "We help businesses take payments securely and efficiently." (reworded from the live mission). Lead "Beyond Bancard gives merchants flexible payment processing and a comprehensive package of products, and works with businesses other processors turn away." ("comprehensive" is the live H1's word; the rest is PRD positioning.)
  - **Company file (bold element):** the hero visual. The name, "Company file" and a "Registered ISO/MSP" approved badge that pulses once. Rows: Headquarters (Orange, California, as a map link), Experience (20+ years in payments, flagged) and Coverage (Nationwide), then the sponsor banks with their disclosure locations on a paper strip. It is a group named "Beyond Bancard company file".
  - **File rows** copy UnderwritingCard: muted label left, 15px medium tabular value right, hairlines. A second sheet sits behind the file, inset 16px with a 12px lip. The spec's Serves row (it repeated "Who we work with."), bank count pill and bank icon tiles were dropped.
  - **Sponsor banks** follow the PRD §8.5 disclosure (Esquire Bank). The live About page lists Avidia Bank instead. That is an open question; the disclosure is unchanged.
  - **"What we believe.":** five values as ruled rows, not numbered, split from md (title 5 columns, body 7). Titles are 30px from lg. The section ends with "We're growing across the country, and we'd like you to join the team." and a secondary "See open roles" to `/careers#open-roles`. Demo mode only until the wording is confirmed.
  - **Values originals** (live About page, 17 Sept 2026, numbered 01, 02, 03, 04, 04 there): "Start with the Merchant: The merchant is our top priority. Every day we are hyper-focused on making their experience with pleasant and seamless." "Build Relationships & Deliver Results: We are providing great service – to consumers, to customers, to our communities and to each other. Beyond Bancard making a real difference by working together." "Act with Integrity: We openly collaborate in pursuit of the truth. We have no tolerance for politics, hidden agendas or passive-aggressive behavior. Beyond Bancard is a fully transparent organization." "Team on a Mission: We are committed to helping our customers by working together with equal parts humility and ambition." "Make a Difference Everyday: We focus on solutions, and we arrive every day inspired to make an impact through our talents, passion and hard work." Edits: grammar, sentence case, "&" to "and", "Beyond Bancard" to "We" or "Beyond", "Everyday" to "every day". No claims were added; "great service" and "fully transparent organization" are the client's own.
  - **"Who we work with.":** three peers, each with an icon, h3, body and ghost arrow link. Stacked on phones, rows at md, and three columns on one subgrid from lg, so bodies and links line up when a title wraps. Hyphenated words don't break.
  - **Audience links name their destination:** "View complex industries" (`/industries`), "View everyday businesses" (`/industries#all-industries`; the spec's `#retail` is one group) and "View ISOs & agents" (`/partners/isos-agents`; the menu uses "Partner programs" for `/partners`).
  - **Headquarters and Join the team band removed:** the address appeared three times (file, band, footer a screen later), and the careers half repeated its own button label. The file row carries the address and the values section carries the route to careers.
- **Careers (`/careers`):**
  - **Hero:** H1 "Join the Beyond team." (live "Join the Beyond Team"), lead edited from the live intro. "See open roles" is a primary button with a down arrow (`CareersRolesLink`). It jumps to the roles heading and moves focus there, so the next Tab reaches the first role. A ghost mailto link to careers@beyondbancard.com sits beside it.
  - **Roles board (bold element):** right under the hero on the same paper tone with a 40px top padding, so the first role shows in the first view at 1366×768. "Open roles." carries the count beside it ("5 roles on Indeed", computed, hidden at 0).
  - **Rows:** one white panel split by hairlines. Each row is a single link to its Indeed posting in a new tab, named "{title} View on Indeed (opens in a new tab)" and described by the summary. No visible "View on Indeed" per row: a 36px arrow disc from md, a corner arrow on phones. Hover turns the row brand-50.
  - **No scroll reveal on the board:** it rises with the hero's CSS entrance (360ms delay). A reveal that had not fired left a focused row invisible.
  - **Postings checked 17 Sept 2026:** Junior Risk Manager, Technology Project Manager and Technical Support Specialist are expired on Indeed. Junior Underwriter and Relationship Manager returned Indeed's security check. The live page still links all five.
  - **Production:** `roles.confirmed` is false, so the board shows its empty state ("There are no open roles right now. You can still send your résumé to careers@beyondbancard.com."), with no count and no hero "See open roles".
  - **Summaries** are the live ones without their "Join Beyond Bancard as a …" lead-ins.
  - **"What it's like to work here.":** the four live statements verbatim, each under an icon, in `type-body-lg` ink-900 instead of the spec's `type-h4` (sentences of 10-13 words read dense in the display face). The list sits in columns 7-12: two columns at sm and xl, one at lg.
  - **"Our values.":** the five titles as a ruled `type-h4` list with a ghost "Read what we believe" link to `/about-beyond-bancard#values`, inside the culture section. Demo mode only, like About's values, so the link never points at a missing anchor.
  - **CtaBand:** "Don't see the right role?", with "Email the careers team" (mailto, no arrow) and "About Beyond".
- **Contact (`/contact-us`):**
  - **Hero:** H1 "Talk to the right team." Lead "Tell us what you need and we'll connect you with the people at Beyond Bancard who can help.", then "Call (844) 365-3050." in FaqSection's phone link style. No hero buttons and no CtaBand.
  - **Need directory (bold element):** "What do you need?" as one white panel (radius-md) split into four needs by hairlines. Stacked below md with the icons hidden; at md the title spans the row, with body and button left and channels right; 2×2 from lg, where subgrid rows line up the file rows across each pair. Each quadrant reveals on its own (the second of a pair 80ms later), so the first screen at 1440×900 never shows an empty panel.
  - **At most one button per need** (Apply now, Become a partner). Every other channel is a label/value file row:
    - Open a merchant account: Advice (Talk to an expert), Sales (sales@).
    - Get help with my account (was "Help with my account"): Support (boarding@), Portal (Log in to Merchant hub).
    - Partner with Beyond: Portal (Log in to partner portal), Learn more (ISOs & agents program).
    - Work at Beyond: Roles (See open roles, `/careers#open-roles`), Careers (careers@).
  - **File rows** (`fileList`, `fileRow`, `fileLabel`, `fileValue` in `ContactChannels.tsx`) are shared with the sidebar: a muted label column at least 4.5rem wide, 15px values, 44px rows. The label stacks above the value in containers under 18.75rem, so an email never breaks mid-word. Internal links have no arrow; web links keep ArrowUpRight (D-024).
  - **"Message us about this"** closes each quadrant as a quiet text button with a message icon, and its accessible name adds the need's title. It sets the form's Topic, scrolls the form card under the header (Lenis `resize()` then `scrollTo`, or a native scroll) and focuses First name. The card shows "Topic: {need}", and a polite live region announces it, again on a repeat press. From the success panel it opens a fresh form with the topic set.
  - **Message form:** on a white band after the paper directory, in 7 columns beside a 5-column sidebar. First name*, Last name*, Email*, Phone, Business name, Topic* (the four need titles plus "Something else") and Message* (10-1,000 characters). react-hook-form and `zod/mini`, as on `/live-form`. New `components/ui/textarea.tsx` matches Input.
  - **Validation** runs on submit, then on every change. Validating on blur would flag First name as soon as a directory jump moves focus there. Focus goes to the first invalid field.
  - **Character count:** the visible "n/1,000" is hidden from screen readers. They hear the count one second after typing stops, and only within 100 characters of the limit or over it. There is no `maxlength`, so pasted overflow shows an error instead of being cut.
  - **Send:** 1.2s of "Sending…" with the button `aria-disabled` and the fields disabled (focus moves to the button first). Then a success panel replaces the form: a drawn check, a focused h2 "Message sent." described by "Thanks, {firstName}. We've received your message.", and "Send another message". No network request. "Demo only — no data is sent." and the privacy line sit under the button.
  - **Flag:** "Send us a message." always renders, with the marker after it. The form ships in production despite "Contact form fields and routing", because that is a routing question, not a fact shown to visitors.
  - **"Other ways to reach us":** sticky from lg, listing only what the directory doesn't: Phone, Fax, Address (map link) and Answers (Browse the FAQ). sales@ and boarding@ appear once, in their quadrants. "Phone" matches the footer; "Address" replaces "Visit", which implied walk-ins.
- **Blog index (`/news`):**
  - **Hero:** H1 "Practical guides to payment processing." and the spec lead. No actions.
  - **Lead article (bold element):** the newest post as a dark ink-900 panel with the hero glow and no image. From lg the title (`type-h1`) and a "Read article" cue sit left; the excerpt and label/value rows (Published with a "Latest" badge, Category) sit right. No date or category row above the title (D-003). The title link stretches over the panel, so the whole panel is one target and its text can't be selected.
  - **Posts:** the 12 posts on page 1 of the live blog. Categories are the live ones, where the listing's filter data and each post's markup agree (checked 17 Sept 2026), even where they look odd: "6 steps to secure credit card payment processing" is Contactless payments. Excerpts are the live listing's, up to its cut, with an ellipsis only when the cut falls mid-sentence.
  - **"Recent articles.":** the chips sit on their own row under the heading at every width, as on `/industries`. One swipeable row below md; they wrap from md.
  - **Chips** are built from the 11 listed posts and ordered by count, then by newest post: All 11, Merchant service payment 4, POS systems 3, Peptide payment 3, Credit card fees 2, Contactless payments 1. E-commerce and Interchange rates have no posts on page 1 and get no chip.
  - **Filtering:** rows fade and rise back in only after a chip is pressed (CSS, 40ms apart). A polite status reads, for example, "Showing 3 of 11 recent articles in Peptide payment". While a category is chosen, "Page 1 of 8" and "Older articles" give way to that status and "Show all recent articles", which returns focus to the All chip. The filter is not kept in the URL.
  - **Rows:** below lg every row reads title, date, excerpt (two lines), categories. From lg the date takes its own left column and the categories sit on the right. The title link covers the row.
- **Article (`/news/what-is-a-high-risk-merchant-account-and-how-does-it-work`):**
  - **Copy:** fetched and extracted by script, then checked against the extraction. The 32 text blocks with their links and the 5 FAQ Q&As match exactly; the 9 headings match apart from case.
  - **Mechanical changes only:** h4 headings became sentence-case h2s, "•" lines became lists, whitespace collapsed, and the featured image dropped. beyondbancard.com links became internal paths, with post permalinks at `/news/<slug>`. Five inline links point back to the article itself and render as plain text (open question).
  - **Flags:** only the closing "Best merchant processing service provider" section carries "Existing blog copy: claim to verify". The FAQ answers are hedged, general statements rather than Beyond policy, so they are not flagged.
  - **Header** (`ArticleHeader`; PageHero's lead is a `<p>`, which can't hold a `<dl>`): breadcrumb Resources / Blog / "High-risk merchant accounts", the H1 (`type-h2` below md), then Published, reading time and By Beyond Bancard. Reading time is computed at 225 words a minute from the shown blocks and the FAQ: 5 min. The meta description is the live post's.
  - **Reading layout (bold element):** prose capped at 32em (about 68 characters; 68ch measures the "0" glyph and let lines run to 90), 17px, 18px from lg, line-height 1.7. Links are brand-700 with a brand-500 underline at rest, because colour alone is not enough; the full underline draws on hover. The phone number never wraps.
  - **"On this page":** from lg a sticky rail in columns 9-12, before the prose in the DOM so keyboard users reach it first; below lg a `<details>` above the prose. The current section gets a 2px brand-600 bar and `aria-current`, from one IntersectionObserver whose band runs from far above the page to the 40% line. With Lenis running, the links scroll with Lenis and focus the heading when they land. Outside demo mode, flagged headings leave the list and the reading time.
  - **Around the prose:** a callout after the first section ("Looking for a high-risk merchant account?", Apply now, High-risk processing). After the article: FaqSection "High-risk account questions." (the live post has its FAQ before the summary), Related solutions, and "More from the blog." with the three newest other posts and a secondary "All articles" button.
- **Client stories (`/our-clients`):**
  - **Hero:** H1 "What merchants say about Beyond." The lead's count comes from the number of stories ("Four businesses, in their own words, on working with Beyond Bancard."). The permission marker follows it once, for the whole set.
  - **Stories:** quote, name, role and company come from `content/testimonials.ts` unchanged. One region with a visually hidden h2 "Client stories"; each figure is named by its company h3. Story 1 is on ink with the hero glow; stories 2-4 are on paper split by hairlines, with the same structure.
  - **Quotes (bold element):** Archivo semibold at 104% width, balanced. The featured quote runs from 24px to 44px (reached at 1280px), the others from 21px to 34px. A brand-600 opening mark hangs in its own column from 1280px and sits above the quote below that. Quote and file split 7/5 at lg and 8/4 at xl.
  - **Client file:** the company as h3 over a "name, role" line, then rows only for links. Industry appears on every story, flagged beside each label because it is inferred. Related appears where a page exists: Cost-reduction programs for Andrew C., because the live page covers the cash discount program he names.
  - **File links:** internal, so no arrow: brand-700 on paper, brand-300 on ink, 44×44 targets. From 768 to 1023px the file spans the container, with the company beside the rows.
  - **Dropped from the spec:** the Client and Role rows (now the name line), "Mentioned" (now "Related"), Carlos H.'s "Support team" row (no page to link) and the "Industries in these stories" band (it repeated the four industry links).
  - **Production:** the page redirects to `/coming-soon?from=/our-clients` until display permission is confirmed, because without the quotes it has nothing to show. The Industry rows stay hidden until the labels are confirmed.
- **FAQ (`/faq`):**
  - **Hero:** H1 "Questions merchants and partners ask." Lead "Search every answer about working with Beyond Bancard, or browse by topic." It names no topics, because production hides some.
  - **Search (bold element):** the hero's action. A visible "Search questions" label with the count beside it ("23 questions", then "N matches"), a 56px pill field (64px from md), the placeholder "Try “chargebacks” or “online”" (both match confirmed answers) and a clear button in the field.
  - **Topics** (`faqTopics` in `content/faqs.ts`) reuse the existing FAQ objects, looked up by exact question, so a reworded question fails the build: Accounts and eligibility 3, High-risk processing 4, Nutra and supplements 7, Technology and security 3, Partners 6. The "declined elsewhere" question appears once, from `highRiskFaqs` ("Can Beyond work with…").
  - **"Technology and security"** replaces "Equipment, technology and security": in production only the monitoring answer remains there.
  - **Matching:** every word must appear in the question, the answer or the topic title. Case, accents and curly quotes are ignored. Matches get a brand-100 `<mark>`, title matches in the topic heading. Screen readers get a plain copy instead of the marked one.
  - **Behaviour:** answers open automatically from 3 letters, and clearing restores what was open before. Typing never moves focus. Enter focuses the first result (nothing when the field is empty) and Escape clears. The live region waits 700ms, so one count is announced. The empty state echoes the term, then "Try another word, or clear the search to see every question." and Clear search. The query is not kept in the URL.
  - **Layout:** the answers start right after the hero (32px top padding, 40px from md), so matches show in the first view. From lg a sticky rail (4 columns, 3 from xl) lists the topics with counts that follow the search. A topic with no matches turns into muted text, and the topic being read gets a 2px brand-600 bar and `aria-current`. Below lg, anchor chips show only while browsing. Each topic is an h2 over one Accordion; answers are capped at 34rem.
  - **"Still have a question?":** Call and "Send us a message" (`/contact-us#contact-form`). In the lg rail its title is a paragraph, so the heading outline reaches the topics first. Below lg it follows the answers as an h2.
  - **Production:** unconfirmed answers drop as in FaqSection, and a topic whose answers are all unconfirmed drops whole (Accounts today), leaving 10 of 23 questions. In demo mode that topic's heading carries one group marker.
- **Shared fixes made alongside:**
  - **Lenis anchors:** `LenisProvider` uses `anchors: true`. Lenis already subtracts `scroll-padding-top`, so the old `{ offset: -96 }` landed every in-page anchor 96px too low, site-wide.
  - **`href("#id")`** now returns the fragment and stays on the page. It returned "/#id", the homepage.
  - **CtaBand** has a `primaryArrow` prop, off for the careers mailto button.
  - **Reveals:** a reveal block or stagger item shows at once when something inside it has focus, so focus never lands on an invisible link.
  - **Sticky mobile CTA:** while the bar shows, `html[data-sticky-cta]` sets `scroll-padding-bottom` to the bar height plus 16px, so focused elements scroll clear of it (WCAG 2.4.11).
  - **ChipToggle:** the pressed chip keeps a 2px Highlight border in forced colours.
- **Review:** each page had design, content and accessibility/code reviews, plus one cross-page consistency review. A fixer verified and fixed the findings, and an independent recheck rated every page "pass-with-minor".
- **Drafted copy (client review):** UI copy that is not from the PRD or the live site.
  - **About:** hero H1 and lead (edited from live copy); "Company file", "Experience", "Coverage", "Sponsor banks"; "What we believe.", "Who we work with."; the three audience link labels; the careers line (edited from the live Careers intro).
  - **Careers:** hero lead (edited from the live intro); "Open roles.", "N roles on Indeed", the empty state; "What it's like to work here.", "Our values.", "Read what we believe"; the CtaBand title, body, "Email the careers team" and "About Beyond". The body ("tell us where you'd fit") invites speculative applications, where the live page only says "We'd love to hear from you!".
  - **Contact:** H1 and lead; "What do you need?", the need titles and bodies, the row labels Advice, Portal, Learn more, Roles and Careers, "Message us about this"; "Send us a message.", "Topic: {need}", "Choose a topic", "Something else", the message hint and the topic, message, email and phone errors; the privacy line; the success copy; "Other ways to reach us", "Address", "Answers", "Browse the FAQ".
  - **Blog index:** H1 and lead; "Latest", "Read article"; "Recent articles.", "Filter by category", the status lines, "Show all recent articles", "Page 1 of 8", "Older articles".
  - **Article:** breadcrumb "High-risk merchant accounts", "On this page", "{n} min read", the callout title, "High-risk account questions.", "More from the blog.", "All articles".
  - **Client stories:** H1 and lead; "Industry", "Related".
  - **FAQ:** H1 and lead; the five topic titles; "Search questions", the placeholder, counts and match lines, the empty state; "Still have a question?", "Send us a message".
- **Confirm and open questions:**
  - **Notes added:** "Company values wording (lightly edited from the current About page)" (About, Careers); the Careers roles note (expired postings, which roles are open, lightly edited summaries); "Contact form fields and routing"; "Existing blog copy: claim to verify"; "Industry shown for each client, inferred from the business name (Travel is listed under complex industries). OK to show?"; "Whole FAQ topic hidden in production until its answers are confirmed". Reused: "20+ years in payments", "Permission to display client testimonials" and the FAQ answer notes.
  - **Open questions added:** Avidia Bank or Esquire Bank as sponsor bank; whether boarding@ is the support address; the live Contact page's FAQ answers sitting under the wrong questions; the blog URL structure (live posts sit at the site root); where the article's self-links should lead; a "results vary" note for quoted savings; showing only confirmed FAQ answers (10 of 23) in production.
- **Not changed / follow-ups:**
  - No shared label/value `FileRows` primitive. The file-row pattern is still built per page, now closer to UnderwritingCard.
  - No type tokens yet for the one-off sizes: value titles (1.875rem), the two quote sizes, the article prose size and the small post-row chip.
  - The contact success panel duplicates SuccessPanel's drawn check; there is no shared SuccessCheck.
  - The article body lives in `content/blog.ts`, which the `/news` client island imports, so the index bundle includes it.
  - Accordion icons sit about 4px low against the first line of a multi-line question (shared, pre-existing).
  - The header shrinks from 80 to 64px after 24px of scroll, so a programmatic jump from the page top lands 16px high (pre-existing).
  - `tests/company-resources.spec.ts` from the spec is not written. The existing route, link and axe specs cover the new routes through `tests/routes.ts`.

**D-057 · First page of every menu: Adult and Partner programs (requested 17 Sept 2026).** The client asked that every top menu has at least its first page working. Solutions (High-risk processing), Resources (Blog) and Company (About) already did; `/industries/adult` and `/partners` were added to `DEMO_ROUTES`. Spec: §6 of `docs/superpowers/specs/2026-09-17-company-resources-pages-design.md`.
- **Industry template:** the Nutra page's composition moved line for line into `components/sections/IndustryDetail.tsx` (props `content`, `faqs`, optional `visual`; `industryDetailMetadata(content)`), with `IndustryDetailContent` in `types/content.ts`. Nutra is now a thin wrapper and measured pixel-identical at 390 and 1440 before and after. `hero.expertCta` and `whyBeyond.lead` are optional, so Nutra keeps its PRD label "Talk to a nutra payments expert" and title-only "Why Beyond.".
- **Adult content:** copied from the live beyondbancard.com/industries/adult page (17 Sept 2026) through its HTML, with headings in sentence case, labels above headings dropped (D-003), the live "01–04" numbers on the realities dropped (D-005) and "Beyond brings" made "Beyond Bancard brings" (PRD §10.5). "Card-not-present" and "industry-aware" carry word joiners so they don't break at the hyphen.
  - Capabilities take their pillar and link from `solutionsMenu`, so Recurring billing sits under Grow (the live page lists it under Accept); the live titles are kept.
  - FAQs are `adultFaqs` in `content/faqs.ts`. Answers the live page marks "[Placeholder — confirm …]" keep their sentence with `confirm: true`; the placeholder text never renders. The live answer to the website/gateway question repeats the next question, so it uses the Nutra stand-in and is flagged.
  - Hero visual: `SubscriptionDashboard` takes `business` and `ordersLabel` props (defaults are Nutra's "Supplement brand" / "Auto-ship orders"); Adult shows "Subscription content" and "Recurring billing", both from its own page copy.
  - `/faq` gains an "Adult" topic after Nutra.
- **Partner programs (`/partners`):** dark hero (H1 "Partner with Beyond Bancard.", PRD homepage partners lead, Become a partner, Log in to partner portal); the three programs from `partnersMenu` as large SpotlightCards with h3 titles; benefits "Why partner with us?" (the live heading) reusing the ISOs & agents benefit objects and their CONFIRM flags, with the live page's "best rates" / "lowest processing rates" left out (PRD §10.2); a compact "Already a partner?" band (`PartnerPortalBand`); partner FAQs; the ISOs & agents CtaBand with a program-neutral body. Nothing retyped: every string is imported from existing content except the drafted copy below.
  - No breadcrumb: a one-item trail naming only the current page reads as an eyebrow and navigates nowhere, as on the Industries hub.
  - The header starts in its dark tone on `/partners` (added to `DARK_ROUTES`).
  - Production drops unconfirmed benefits whole (D-042), so three of four show there.
- **Shared fixes made with this work:** `SpotlightCard` gains `headingLevel="h3"`. `CapabilityTabs` (Nutra and Adult) sets Radix `orientation` from a `(min-width: 64rem)` query, so arrow keys and `aria-orientation` follow the vertical desktop list; the panel shows the focus ring when it takes focus; the mobile pill row no longer clips the top of the ring.
- **Review:** each page had design, content and accessibility/code reviews, a verify-and-fix pass and an independent recheck. Both rechecks failed only on items in shared files (dark header on `/partners`, the empty Adult hero); those are fixed above and checked in the browser at 390 and 1440.
- **Drafted copy (client review):** Adult browser title "Adult payments"; FAQ stand-in "Answer to be supplied by Beyond Bancard."; "Related industries". Partners: "Choose your program.", "Contact the partner team", CtaBand body "Tell us about your business and we'll find the program that fits.", and the band body reused from the ISOs programme steps (D-040).
- **Not changed / follow-ups:** the Adult menu teaser (PRD §9.3, "Payments infrastructure built for…") and the live H1 ("Payments built for…") differ by one word — keep or align; the live capabilities lead isn't shown (CapabilityTabs has no lead); the merchant sticky CTA still shows on `/partners` below 768px, as on ISOs & agents (PRD §8.7); the FAQ and footer phone and legal links are under 44px tall inside sentences (pre-existing); in production `/partners/isos-agents` renders "Uncapped income" and "Fast turnaround" as headings with empty bodies (pre-existing, FeatureGrid).

## Top 6 industries and Solutions

**D-058 · Top 6 industries and every Solutions page (requested 21 Sept 2026).** The client asked for the rest of the top 6 industries and everything in the Solutions menu, using the live site's content. 27 routes join `DEMO_ROUTES`: Gaming, RUO peptides, Travel and Cannabis-related businesses; the hubs `/accept`, `/protect`, `/grow` and `/operate`; and the 19 other Solutions menu pages (High-risk processing already existed). Spec: `docs/superpowers/specs/2026-09-21-industries-solutions-pages-design.md`. Progress: `docs/TRACKER.md`. Problems found on the live site, for the client: `docs/LIVE_SITE_ISSUES.md`.
- **Source:** the live page for each route, captured 21 Sept 2026 with a headless browser (the site's SiteGround check blocks plain requests) and turned into outlines in page order. The outlines include the collapsed FAQ answers and the Payment technology selector's copy, which lives in a script. Each content file starts with a comment listing its Edits, Dropped items and Live-site issues.
- **Industries** (`content/gaming.ts`, `ruo-peptides.ts`, `travel.ts`, `crb.ts`) use `IndustryDetail` as Adult does.
  - **Hero visual:** the static High-risk card ("Example application", in review, 2 of 4). It shows one of the page's business models, two or three rows in the page's own words, and four items from its account-health checklist. CRB skips "Evolving regulatory landscape", which is a condition, not a check.
  - **Expert buttons:** each uses its live label in sentence case ("Talk to a gaming payments expert"). Adult now does the same ("Talk to an adult payments expert"), so all six match.
  - **CRB capabilities:** the live section is a copy of Gaming's. "Recurring billing", whose body names gaming, is dropped, and the other five are flagged as a group. `Capability` gains `confirm`/`note`, and `CapabilityTabs` renders the flag.
  - **"APIs / integrations"** (Gaming, CRB) has no menu page and links to Payment gateways.
- **Solutions template:** `SolutionPage` renders one `SolutionPageContent` object (`content/solutions/<slug>.ts`) in this order:
  1. Hero: the expert button (primary; the live label only where it names the expert), then Apply now, with an optional `HeroFile`.
  2. The page's blocks, in live order.
  3. Related solutions.
  4. All four pillars (`PillarLinks`, the live "bigger picture" heading), on one line like the live lifecycle row: the page's own pillar is the filled node, the other three are links. Built first as the other three only, and changed on client feedback (22 Sept 2026) to match the live design. The nodes are dots on a rule, under a centred heading, so the row reads as a lifecycle, not as tabs (D-054).
  5. FAQ.
  6. CtaBand.
  - **Block kinds:** 14, one component each in `components/sections/solution/`: features (panel, ruled, rows or split), steps, flow, hub, chips, compare, table, statement, cards, actions, questions, estimator, selector and callout.
  - **Section tones** alternate. Back-to-back callouts share one band. When the last block is a chips band, the pillar links come before related solutions, so the static chips never sit directly on the chip links (the live B2B and International pages use that order).
- **HeroFile:** the hero panels in the underwriting-file style (D-001): title, tag ("Example" with figures, "Illustration" without), then amount, method chips, rows, stats, steps and a status pill.
  - Done steps tick in as the panel enters the viewport.
  - Figures the live card leaves unlabelled show alone; no labels are drafted.
  - Status colours stay semantic (D-002): green only for outcomes, amber for in progress, blue for states such as Live or Connected.
  - Five live hero cards are hidden at every screen size on the live site (the Grow pages, Chargeback protection, 3D Secure). They are shown here.
- **Estimator (Cost-reduction programs):** monthly volume × rate × 12 from the visitor's own inputs. The defaults are the live $50,000 and 3.25%. No savings figure is shown.
- **Selector (Payment technology):** the six live recommendations.
- **Copy rules:**
  - Body sentences are verbatim. Headings and labels are in sentence case, and "Beyond Bancard" appears at first mention.
  - Placeholders never render. An FAQ answer with a "[Placeholder — …]" keeps its sentence and is flagged. A missing or copied answer shows "Answer to be supplied by Beyond Bancard.", flagged. Internal notes, TODO text and the sample testimonial are dropped.
  - Headings copied from another page are replaced by the section's own words:
    - Accept hub: Accept's bigger-picture heading.
    - In-person payments: "Connected acceptance."
    - Reporting: "Payment visibility."
    - Payment technology: "Where this fits."
    - Operate hub: "Why Operate with Beyond." (the h2 repeated a row title).
    - Chargeback protection and 3D Secure FAQ titles.
    - Network tokenization's H1 is its own "Keep the card number out of more places.", because the live headline is Fraud & risk tools'.
  - The Protect hub's live FAQ is Adult's. It now reuses five questions from the Protect pages by reference (`pickFaq`).
- **Links:** internal links come from the Solutions menu (`solutionLink`), so a renamed page fails the build. Dead live links ("#", null, Integrations, Reconciliation, Merchant Tools) are dropped. Reporting's "Need to connect a system?" row goes to Payment gateways. Hardware links go to `/catalog`, and the three program pages (`/grow/cash-discount`, `/grow/dual-pricing`, `/grow/surcharging`) go to coming soon.
- **Typography:** `lib/typography.ts` has `keepTogether` (a word joiner after hyphens), `keepArrows` and `NBSP`. It replaces the local helper in `content/adult.ts`. Visible text never changes.
- **Shared changes:**
  - **Types and icons:** `types/content.ts` gains the solution types, `Flag` and 22 icon names; `components/ui/icon.tsx` maps them. `confirm-list` skips the blocks' visible `footnote`.
  - **FeatureGrid:** three panel items share one row, five ruled items sit three over two, and the last ruled row no longer adds 32px of bottom padding.
  - **ChecklistSection:** an odd last item spans both columns.
  - **CapabilityTabs:** opens on the pillar with the most tools, and the phone pills are tighter.
  - **IndustryDetail:** the business-model chips wrap in balanced rows.
  - **UnderwritingCard:** the header wraps rather than squeezing.
  - **RelatedLinks:** each link chip has a blue arrow, and the band uses the 4/8 grid from lg.
  - **PageHero:** the text column has `min-w-0`, and pill buttons may wrap to two lines on phones.
  - **ProcessTimeline:** steps take flags, and the rule stops 12px short of the next node.
  - **FaqSection:** questions use `text-pretty`.
- **Visible on pages built before this work:**
  - Adult and Nutra open their capabilities on Protect.
  - Related chips show arrows (High-risk, the industries, the article).
  - Ruled feature grids end 32px higher.
  - Adult's expert button uses its live label.
- **Considered, not done:**
  - A top-aligned hero text column, so H1s sit at one height on every page. It would move every approved interior hero.
  - A flag for a block's lead alone.
  - Adding the new FAQs to `/faq`.
- **Review:** every content file and component had an independent review and a fix pass. Screenshots at 390 and 1440 of all 27 pages then had a per-page design review and a cross-page consistency review, and the fixes were applied. The main fix: the International payments hero ran off a 390px screen. Checked with lint, types, build (all static), Playwright and axe on every route, with no page wider than the viewport at 390 or 1440.
- **Drafted copy (client review):**
  - "Related solutions", "Related industries" and "Business models we support." (template titles).
  - The hero card rows on the four industries (words from each page).
  - Hero panel titles where the live card has none ("Payment activity" on Operate; the page names on B2B, 3D Secure and POS).
  - "Estimate", and "Where do you take payments?"
  - Network tokenization FAQ question 2 ("Is a network token the same as a gateway token?").
  - The stand-in answers, and every CONFIRM note.

**D-059 · The real logo (requested 22 Sept 2026).** The placeholder wordmark (a "B" tile beside "Beyond Bancard" in Archivo, PRD §5.6) is replaced by the logo from the live site.
- **Files:** `public/brand/beyond-bancard-logo.webp` (the black lockup, 312×42, transparent) and `public/brand/beyond-bancard-mark.png` (the mark alone, 270×270), both taken from beyondbancard.com on 22 Sept 2026. `app/icon.png` is the site's own icon, replacing the default Next.js `favicon.ico`.
- **Dark backgrounds:** only a black lockup is published, so the dark header (homepage, `/partners`) and the footer knock it out to white (`brightness-0 invert`). That drops the blue from the mark, so the open question now asks for a reversed file.
- **Sizes:** the full lockup is 24px tall, 28px from sm. Below 380px only the mark shows, so the header still fits the compact "Apply now" and the menu button. The link keeps its 44×44 target and its "Beyond Bancard home" name; both images are decorative (`alt=""`).
- **Illustrations:** the drawn "B" tile is gone from the hub diagrams' centre (white mark on the ink pill) and from the partner portal panel (the colour mark), so every Beyond lockup on the site is the real one.
- **Not changed:** the footer's oversized "Beyond Bancard" sign-off stays typographic (D-055).

**D-060 · Phone density pass (requested 22 Sept 2026).** The client said the cards looked too big on a phone: the homepage pillar cards measured 893px against an 844px screen, so not one card fitted. Padding, row heights and a few type steps are tighter below `sm`; every value from 640px up is unchanged (each phone value carries an `sm:` override restoring today's value). Nothing was removed or hidden, tap targets stay 44px and body text stays 16px.
- **Measured at 390×844, before → after:** pillar cards 893 → 703; the four-item feature panels 796-924 → 581-659; the example application card 521-566 → 449-490; the partner portal panel 662 → 502; the account-health checklist and the hero file panels similarly tighter. Whole pages are 2-5% shorter.
- **Where the height went:** in the pillar cards the icon now sits beside the heading rather than above it, and `PillarVisual`'s rows, chart and footer strip are tighter. `FeatureGrid`'s panel items use the ruled variant's icon-beside-title row on phones. `HeroFile`, `UnderwritingCard`, `SolutionCards`, `ChecklistSection`, `CompareColumns`, `ComparisonTable`, `PortalPreview` and `SubscriptionDashboard` each lost padding and row height.
- **Still tall on a phone, by nature:** the comparison tables' per-option cards (534px for a six-row programme comparison) and the estimator panel. Both are data, not cards.
- **Not changed:** the pillar heading's 35px link target (D-008 already logs it), and the section rhythm (D-006).

**D-061 · The last two Partners pages (requested 22 Sept 2026).** `/partners/isvs-platforms` and `/partners/associations` join `DEMO_ROUTES`, so every Partners menu item now has a page (hub, ISOs & agents, ISVs & platforms, Associations). Copy comes from the live pages, captured 22 Sept 2026, under the D-058 rules.
- **Template:** both pages use `SolutionPage`, which now takes partner pages too: `pillar` and `bigPicture` are optional (a partner page has no lifecycle row), `hero.ctas: "partner"` swaps the hero pair to "Become a partner" and "Talk to an expert" (PRD §5.5), and a new `capabilities` block renders the industry pages' `CapabilityTabs`.
- **Capability pillars corrected** from the Solutions menu, as on the industry pages: the live pages file recurring billing, flexible pricing, working capital, faster funding, POS, reporting, fraud and integrations under Accept. "Payment security" has no page of its own and links to Fraud & risk tools.
- **Associations has no hero panel.** The live card shows programme results and a satisfaction score (1,240 members enrolled, 86% adoption, $42K non-dues revenue, 4.8/5 member rating). Those read as claims about real associations even behind an "Example" tag, and the demo never shows ratings (PRD §10.2-10.4). ISVs & platforms keeps its card: it shows one example transaction, not an outcome.
- **Dropped on both:** the sample testimonial and the four "Partner Logo" placeholders the live pages publish, the section images, and the FAQ footer the template already covers. Associations also drops its section-3 lead, which is the industry pages' paragraph.
- **Drafted copy (client review):** "What the integration covers." and "What Beyond runs with you." (titles for the two label bands, whose live labels name no heading), and the "Explore …" link labels on the closing "Other partner programs." cards.
- **Follow-up:** `CapabilityTabs` has no lead, so both pages' capability paragraphs are dropped rather than held as dead data.

**D-062 · Terms and Privacy (requested 22 Sept 2026).** `/terms-conditions` and `/privacy-policy` join `DEMO_ROUTES`, so the footer's legal links work. Copy is the live page for each route, captured 22 Sept 2026, verbatim: legal wording is never rewritten.
- **Template:** `LegalPage` reuses the article reading layout (D-054): the light hero, then a measured prose column with the "On this page" rail built from the section headings. No CtaBand — a sales panel under the terms would read as part of them.
- **Mechanical edits only:** section headings in sentence case (the live pages set them as h4), the missing space after a full stop restored in two paragraphs, and the site's own URLs written as internal links.
- **Three sections cannot be published as they stand**, so each keeps its heading and shows "Text to be supplied by Beyond Bancard.", flagged (and dropped in production): Terms' "Service availability" (the live paragraph is a copy of "Account registration and usage"), Terms' "Modifications" (a copy of "Termination") and Terms' "Governing law and jurisdiction" (the live page never fills the jurisdiction in).
- **Open question:** neither live page shows when it was last updated, and legal pages normally do.
- **Accessibility (`/accessibility`)** uses the same template. The live statement describes the accessibility overlay on the current site (Alt+1 profiles, background AI remediation); the redesign meets WCAG 2.2 AA in the build itself and runs no overlay, so those sections are flagged as a group and drop in production, leaving the commitment, the browser support and the feedback address. All three footer legal links now work.
