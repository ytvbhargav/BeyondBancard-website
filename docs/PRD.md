# PRD — Beyond Bancard Website Revamp: 6-Page Design Demo

**Version:** 1.0 · **Date:** 16 Sept 2026 · **Status:** Ready to build
**Owner:** Revamp agency · **Client:** Beyond Bancard (beyondbancard.com)
**Build tool:** Claude Code

---

## 0. How to use this document (read first, Claude Code)

1. This PRD is the single source of truth for the demo. If something is not specified here, choose the simplest option that fits §5 (Design System) and §6 (Motion System), and note the decision in `docs/DECISIONS.md`.
2. Build in the order given in §14 (Milestones). Finish and verify each milestone before starting the next.
3. **Never invent facts.** Do not add statistics, timeframes, bonuses, certifications, customer names, logos or quotes that are not in §9 (Approved Content). Anything marked `CONFIRM` must render through the `<Confirm>` component (§7.3).
4. Use the **real Beyond Bancard URLs** listed in §3. Do not rename routes.
5. Keep components reusable. The full site will later have ~100 pages using these same components.
6. After each milestone, run the checks in §12 (Quality Gates).

---

## 1. Background

Beyond Bancard is a US payment processor / ISO headquartered in Orange, California. It serves:
- Merchants in **complex and high-risk industries** (nutra, RUO peptides, CBD, vape, gaming, adult, travel, cannabis-related businesses, etc.)
- **Everyday businesses** (retail, restaurants, field services, healthcare)
- **Partners:** ISOs & agents, ISVs & software platforms, associations

The current website runs two inconsistent designs (a 2023 legacy template and an unfinished 2026 template). The client has hired us to revamp the UI/UX, content, navigation and mobile experience while **preserving existing URLs**.

Before the full build, the client wants a **6-page interactive demo** to approve the design direction.

**Positioning line (already used by the client):** *The processor that says yes.*

---

## 2. Goals and non-goals

### 2.1 Goals
- G1. Let the client approve the **visual direction, navigation, content tone and motion style** by clicking through 6 real pages on desktop and mobile.
- G2. Match or exceed the polish of leading payment websites (Stripe, PaymentCloud, Adyen) using purposeful **micro-animations**.
- G3. Build a **reusable component library and design system** that carries straight into the full build.
- G4. Communicate trust: sponsor banks, compliance, clear process, honest language.
- G5. Excellent performance and accessibility (see §11).

### 2.2 Non-goals (do NOT build in the demo)
- CMS (Sanity / WordPress) — content lives in TypeScript files
- Real form submissions, CRM or onboarding integrations
- Blog, city pages, remaining ~94 pages
- SEO setup, redirects, sitemap, analytics, tracking pixels
- Authentication / portals (Partner Login and Hub Login are external links)
- Dark mode toggle (support `prefers-color-scheme` tokens only if time permits; light mode is required)

### 2.3 Success criteria
- Client can navigate all 6 pages via the real header/mega menu on desktop and mobile.
- Lighthouse (mobile) ≥ 90 Performance, ≥ 95 Accessibility, ≥ 95 Best Practices on every page.
- Zero broken links; every non-demo link routes to `/coming-soon`.
- No invented claims; all unconfirmed items visibly flagged in demo mode.
- Client written sign-off on the checklist in §15.

---

## 3. Scope: the 6 demo pages

| # | Page | Route (keep exactly) | Template it proves |
|---|---|---|---|
| 1 | Homepage | `/` | Homepage |
| 2 | High-Risk Processing | `/accept/high-risk-processing` | Solution detail |
| 3 | Industries | `/industries` | Hub / index |
| 4 | Nutra & Supplements | `/industries/nutra-supplements` | Industry detail |
| 5 | ISOs & Agents | `/partners/isos-agents` | Partner detail |
| 6 | Apply | `/live-form` | Conversion |

Supporting routes:
- `/coming-soon` — used for every navigation link that is not one of the 6 pages. Accepts `?from=/original/path` and displays it.
- `not-found.tsx` — branded 404.

---

## 4. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (latest stable, App Router)** + **TypeScript (strict)** | All pages statically generated |
| Package manager | **pnpm** | |
| Styling | **Tailwind CSS v4** | Tokens as CSS variables in `app/globals.css` using `@theme` |
| UI primitives | **shadcn/ui** (Radix-based) | Use for NavigationMenu, Accordion, Tabs, Dialog/Sheet, Form inputs |
| Icons | **lucide-react** | Outline icons only, `strokeWidth={1.75}` |
| Motion | **motion** (`motion/react`) | Default for all UI animation |
| Scroll animation | **gsap** + **@gsap/react** (ScrollTrigger) | Only for the scroll timelines in §6.4. Verify license on gsap.com before commercial launch |
| Smooth scroll | **lenis** | Disabled when reduced motion is on |
| Hero gradient | Custom lightweight WebGL mesh gradient component (Stripe-style) | Pause when offscreen; static CSS gradient fallback |
| Illustrations | **@rive-app/react-canvas** *(optional)* | Only if a Rive file is supplied; otherwise use Motion + SVG |
| Forms | **react-hook-form** + **zod** + `@hookform/resolvers` | No network submission |
| Fonts | `next/font/google` | See §5.2 |
| Images | `next/image` | |
| Testing | **Playwright** (+ `@axe-core/playwright`), **Lighthouse CI** | |
| Lint/format | ESLint (next config) + Prettier | |
| Hosting | **Vercel** preview, password-protected | Add `X-Robots-Tag: noindex` header (demo only) |

Install:
```bash
pnpm create next-app@latest beyond-bancard-demo --ts --tailwind --app --eslint --src-dir=false --import-alias "@/*"
cd beyond-bancard-demo
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add navigation-menu accordion tabs sheet button input select label checkbox radio-group progress
pnpm add motion gsap @gsap/react lenis lucide-react react-hook-form zod @hookform/resolvers clsx tailwind-merge
pnpm add -D @playwright/test @axe-core/playwright prettier
```

---

## 5. Design system

### 5.1 Direction
**Calm, precise, trustworthy fintech.** "A steady hand in complex payments."
- Generous whitespace, strong typographic hierarchy, restrained color.
- One bold idea per section. No decoration that doesn't carry information.
- Real product-like UI illustrations (application card, dashboard snippets), not stock photos of phones.
- Avoid: purple gradients, identical card grids everywhere, ALL-CAPS headings, emoji, generic "AI template" look.

### 5.2 Typography
| Role | Font | Weights |
|---|---|---|
| Display / headings | **Archivo** (use `wdth` axis ≈ 112 for a sturdy, wide feel) | 600, 700, 800 |
| Body / UI | **IBM Plex Sans** | 400, 500, 600 |

Fallbacks: `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`.
> `CONFIRM`: replace with the client's brand fonts if they have them. Keep tokens so the swap is one change.

Type scale (desktop → mobile):
| Token | Desktop | Mobile | Line height | Use |
|---|---|---|---|---|
| `display` | 88px | 48px | 0.95 | Homepage H1 only |
| `h1` | 60px | 40px | 1.05 | Page H1 |
| `h2` | 44px | 32px | 1.1 | Section titles |
| `h3` | 24px | 21px | 1.2 | Card / block titles |
| `h4` | 18px | 17px | 1.3 | Small titles |
| `body-lg` | 20px | 18px | 1.55 | Lead paragraphs |
| `body` | 17px | 16px | 1.6 | Default |
| `small` | 14px | 14px | 1.5 | Meta, captions |

Rules: sentence case for all headings; body line length ≤ 70ch; no more than one lead paragraph per section.

### 5.3 Color tokens
> `CONFIRM`: exact brand blue must come from the client's logo/brand files ("Primary_Logo_Blue_Punchout"). Use the provisional values below until then. All colors must be referenced by token, never hard-coded.

```css
/* app/globals.css */
@theme {
  --color-ink-950: #07102A;   /* darkest sections, footer */
  --color-ink-900: #0E1B3D;   /* hero background, primary text on light */
  --color-ink-800: #1B2A55;   /* hover on dark, dividers on dark */
  --color-brand-600: #2F5BFF; /* PRIMARY (provisional) — buttons, links */
  --color-brand-700: #1D3FD1; /* primary hover */
  --color-brand-100: #E6ECFF; /* tints, selected states */
  --color-sky-400: #5EC4FF;   /* gradient accent only */
  --color-success-600: #138A5E; /* approved, checks */
  --color-success-100: #E3F5EC;
  --color-warning-600: #B86E00; /* in review */
  --color-warning-100: #FFF3DC;
  --color-danger-600: #C8322B;  /* form errors only */
  --color-paper: #F6F8FB;     /* page background */
  --color-surface: #FFFFFF;   /* cards, panels */
  --color-line: #DCE2EE;      /* borders */
  --color-muted: #56627F;     /* secondary text */
  --color-on-dark: #F6F8FB;
  --color-on-dark-muted: #A9B4D0;
}
```
Contrast: all text must meet WCAG AA (4.5:1 body, 3:1 large text). Verify `--color-muted` on `--color-paper`.

### 5.4 Spacing, layout, radius, elevation
- Base unit **4px**; use Tailwind spacing scale.
- Container: `max-w-[1200px] mx-auto px-6 md:px-8`.
- Section padding: `py-24 md:py-32` (dark hero sections may use `pt-16`).
- Grid: 12 columns desktop, 4 columns mobile, gap 24px.
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
- Radius: `--radius-sm 8px` (inputs, chips), `--radius-md 16px` (cards), `--radius-lg 24px` (large panels, CTA band), `--radius-pill 999px` (buttons).
- Elevation: prefer 1px `--color-line` borders. Shadows only for floating elements:
  - `--shadow-float: 0 20px 50px -20px rgba(7,16,42,0.35)` (mega menu, hero card)

### 5.5 Buttons
| Variant | Style | Use |
|---|---|---|
| `primary` | brand-600 bg, white text, pill, h-12 px-6, font 600 | "Apply now" |
| `secondary` | 1.5px border currentColor, transparent bg | "Talk to an expert" |
| `ghost` | text only, underline-on-hover animation | Tertiary links |
| `on-dark` variants | primary stays brand; secondary uses `--color-on-dark` | Hero, dark sections |

Every button: visible focus ring (`outline-2 outline-offset-2 outline-brand-600`), min tap target 44×44px, optional trailing arrow icon that nudges on hover (§6.3).

**CTA vocabulary (use exactly):**
- Primary: **Apply now** → `/live-form`
- Secondary: **Talk to an expert** → `/coming-soon?from=/schedule-a-demo`
- Phone: **(844) 365-3050** → `tel:8443653050`
- Partner: **Become a partner** → `/coming-soon?from=/partners/isos-agents#apply`

### 5.6 Icons & imagery
- lucide-react outline icons, 20–24px, color `currentColor`.
- No stock photos in the demo. Use:
  - Custom SVG/HTML "product UI" illustrations (application card, dashboard tiles, terminal outline)
  - Brand-blue mesh gradient
  - Simple geometric SVG patterns
- Logo: `public/brand/logo.svg`. `CONFIRM`: client to supply. Until then render a text wordmark "Beyond Bancard" in Archivo 800 with a simple "B" mark.

---

## 6. Motion system

### 6.1 Principles
1. **Purposeful** — motion explains state, guides attention, or gives feedback.
2. **Fast** — micro-interactions 150–250ms; reveals 400–600ms; signature sequences ≤ 5s.
3. **Once** — scroll reveals play once (`viewport={{ once: true, amount: 0.3 }}`).
4. **Cheap** — animate only `transform` and `opacity` (and `clip-path` sparingly).
5. **Accessible** — respect `prefers-reduced-motion`: disable Lenis, WebGL animation, parallax, marquee, and GSAP scrubbing; show final states immediately.
6. **Never block** — content and CTAs are readable/clickable before animations finish.

### 6.2 Motion tokens (`lib/motion.ts`)
```ts
export const duration = { instant: 0.12, fast: 0.2, base: 0.35, slow: 0.6, xslow: 0.9 } as const;
export const ease = {
  out: [0.22, 1, 0.36, 1],      // default for entrances
  inOut: [0.65, 0, 0.35, 1],    // layout/morph
  spring: { type: "spring", stiffness: 400, damping: 32 },
} as const;
export const stagger = { tight: 0.04, base: 0.08, loose: 0.14 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};
```
Provide a `useReducedMotionSafe()` hook that returns `true` when motion should be minimized.

### 6.3 Global micro-interactions (all pages)
| ID | Element | Behavior |
|---|---|---|
| M1 | Header | On scroll > 24px: height 80→64px, background gains `backdrop-blur` + subtle border. 200ms |
| M2 | Mega menu | Panel fades + slides down 8px; **panel container morphs size** smoothly when switching between top-level items (Motion `layout`). Links inside stagger in (`stagger.tight`). Hover intent delay 80ms; close delay 150ms |
| M3 | Mobile menu | Full-height sheet slides from right; accordion groups expand with height animation |
| M4 | Buttons | Hover: translateY(-1px) + arrow icon translateX(3px). Press: scale(0.98) |
| M5 | Text links | Underline draws left→right on hover (`scaleX` 0→1, origin left) |
| M6 | Cards (interactive) | Hover: border color → brand-600, translateY(-2px); optional cursor-follow spotlight (radial gradient) on desktop only |
| M7 | Section reveals | Headline + lead fade up; child items stagger (`stagger.base`) |
| M8 | Accordion (FAQ) | Height auto-animate; plus icon rotates 45° |
| M9 | Announcement bar | Dismiss collapses height; stored in `localStorage` |
| M10 | Sticky mobile CTA bar | Slides up after 40% of first viewport scrolled; hides near footer |
| M11 | Page transitions | Fade 150ms between routes (use `template.tsx`) |
| M12 | Focus | Focus rings animate in (opacity), never removed |

### 6.4 Signature moments
| ID | Where | Description | Tech |
|---|---|---|---|
| S1 | Homepage hero | **Brand-blue WebGL mesh gradient** slowly moving behind the dark hero (ink-900 → brand-600 → sky-400 tones at low opacity). Pauses when offscreen or tab hidden. Static CSS gradient when reduced motion or WebGL unavailable | Custom `MeshGradient` component (canvas + WebGL, ≤ 15kb) |
| S2 | Homepage hero | **Underwriting card**: a merchant application card runs through 4 checks (spinner → green check), status pill changes "Underwriting in progress" (warning) → "Approved" (success), with a subtle confetti-free success pulse. Replay button. Loops only on user request | Motion sequence, `aria-live="polite"` |
| S3 | Homepage | **Trust marquee**: slow infinite horizontal scroll of text badges (sponsor banks, gateways). Pauses on hover/focus | CSS keyframes, duplicated list with `aria-hidden` copy |
| S4 | Homepage | **Pillars sequence**: Accept → Protect → Grow → Operate highlight one by one as the section scrolls (active pillar gets brand underline + icon fill) | GSAP ScrollTrigger (scrub) |
| S5 | High-Risk page | **Account lifecycle timeline**: Application → Underwriting → Launch → Monitor → Optimize; progress line fills with scroll, each node pops in | GSAP ScrollTrigger |
| S6 | Industries hub | **Filter chips** animate grid reflow (Motion `LayoutGroup` + `AnimatePresence`) | Motion |
| S7 | Nutra page | **Risk & health checklist** ticks items one by one as it enters viewport | Motion |
| S8 | ISOs page | **Program steps** connector line draws between steps | Motion (SVG `pathLength`) |
| S9 | Apply page | **Multi-step form** slides between steps; progress bar animates; success state draws an animated checkmark | Motion |

---

## 7. Architecture

### 7.1 Folder structure
```
app/
  layout.tsx                 # fonts, <Header/>, <Footer/>, <AnnouncementBar/>, LenisProvider
  template.tsx               # route fade (M11)
  globals.css                # Tailwind + tokens
  page.tsx                   # 1. Homepage
  accept/high-risk-processing/page.tsx
  industries/page.tsx
  industries/nutra-supplements/page.tsx
  partners/isos-agents/page.tsx
  live-form/page.tsx
  coming-soon/page.tsx
  not-found.tsx
components/
  layout/      Header.tsx MegaMenu.tsx MobileMenu.tsx Footer.tsx AnnouncementBar.tsx StickyMobileCta.tsx
  sections/    Hero.tsx PageHero.tsx TrustStrip.tsx PillarsSection.tsx IndustryGrid.tsx ProcessTimeline.tsx
               FeatureGrid.tsx RiskFactors.tsx CapabilityTabs.tsx ChecklistSection.tsx Testimonials.tsx
               TechMarquee.tsx FaqSection.tsx CtaBand.tsx DisclosuresBlock.tsx
  ui/          Button.tsx Container.tsx Section.tsx Eyebrow.tsx Badge.tsx Chip.tsx Card.tsx Confirm.tsx
               (+ shadcn components)
  motion/      Reveal.tsx Stagger.tsx MeshGradient.tsx UnderwritingCard.tsx Marquee.tsx CountUp.tsx
               DrawLine.tsx SpotlightCard.tsx
  forms/       ApplyForm.tsx steps/*.tsx
content/
  site.ts          # nav, footer, contact, disclosures, CTAs
  home.ts
  high-risk.ts
  industries.ts    # all 38 industries (names, slugs, groups, teasers)
  nutra.ts
  isos-agents.ts
  apply.ts
  testimonials.ts
  faqs.ts
lib/
  motion.ts  utils.ts  links.ts  useReducedMotionSafe.ts
types/
  content.ts       # shared content types (see 7.2)
public/brand/      # logo placeholder
tests/             # Playwright specs
docs/              # PRD.md, DECISIONS.md, CONFIRM_LIST.md
```

### 7.2 Content model (`types/content.ts`)
Content must be typed so it maps 1:1 to a future CMS.
```ts
export type Confirmable<T> = { value: T; confirm?: boolean; note?: string };
export type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };
export type Faq = { q: string; a: string; confirm?: boolean };
export type Industry = {
  slug: string; name: string; teaser: string;
  group: "featured" | "specialized" | "retail" | "professional" | "healthcare" | "digital";
  inDemo?: boolean;
};
export type Capability = { pillar: "Accept" | "Protect" | "Grow" | "Operate"; title: string; body: string; href: string };
export type Step = { title: string; body: string };
export type Testimonial = { quote: string; name: string; role: string; company: string };
```

### 7.3 `<Confirm>` component (critical)
Wraps any unverified content.
- **Demo mode** (`NEXT_PUBLIC_DEMO_MODE=true`, default in preview): dashed warning-600 outline + small tooltip "Client to confirm: {note}".
- **Production mode:** renders children normally **only if** `confirmed` prop is true; otherwise renders nothing.
- Every usage must also be listed in `docs/CONFIRM_LIST.md` (generate/update it).

### 7.4 Links (`lib/links.ts`)
- `DEMO_ROUTES = ['/', '/accept/high-risk-processing', '/industries', '/industries/nutra-supplements', '/partners/isos-agents', '/live-form']`
- `href(path)` → returns `path` if in `DEMO_ROUTES`, else `/coming-soon?from=${encodeURIComponent(path)}`.
- External links (portals, social, maps) open normally with `rel="noopener noreferrer"`.
- **No `href="#"` anywhere.**

---

## 8. Global components (spec)

### 8.1 AnnouncementBar
Text: "Direct RUO peptide processing is now available for merchants processing $100K+ per month." Link: "See requirements" → `href('/industries/ruo-peptides')`. Dismissible (M9). Background success-600, white text, 14px. `CONFIRM` (campaign may be temporary).

### 8.2 Header
- Left: logo → `/`.
- Center (≥ lg): **Solutions ▾ · Industries ▾ · Partners ▾ · Resources ▾ · Company ▾**
- Right: phone link (≥ xl), **Log in ▾** (Partner portal `https://portal.beyondbancard.com/v2/login?ref=/v2`, Merchant hub `https://hub.beyondbancard.com/`), **Apply now** button.
- < lg: logo + "Apply now" (compact) + menu button → MobileMenu.
- Sticky, M1 behavior. Keyboard: arrow keys within menus, Esc closes, focus returns to trigger.

### 8.3 MegaMenu content
**Solutions** (4 columns, each with title link, one-line descriptor, links):
- **Accept** — More ways to get paid: High-risk processing · Online payments · In-person payments · B2B payments · International payments · ACH & eCheck
- **Protect** — Keep the revenue you earn: Chargeback protection · Network tokenization · 3D Secure · Fraud & risk tools
- **Grow** — Put payments to work: Working capital · Instant payouts · Recurring billing · Cost-reduction programs
- **Operate** — Tools to run payments: Reporting · Invoicing · Payment gateways · Payment technology · POS systems · Virtual terminal
- Footer row: "Not sure where to start?" + **Talk to an expert**

URLs: `/accept/...`, `/protect/...`, `/grow/...`, `/operate/...` (slugs in §9.7).

**Industries** (2 zones):
- Featured complex industries (6, with one-line teasers): Adult · Gaming · Nutra & supplements · RUO peptides · Travel · Cannabis-related businesses
- Everyday groups (links to `/industries#<group>`): Specialized & regulated · Retail & hospitality · Professional & field services · Healthcare & wellness · Digital businesses
- CTA: **View all industries** → `/industries`

**Partners**: Partner programs (`/partners`) · ISOs & agents · ISVs & platforms · Associations — each with descriptor from §9.5.

**Resources**: Blog (`/news`) · Client stories (`/our-clients`) · FAQ (`/faq`)

**Company**: About (`/about-beyond-bancard`) · Careers (`/careers`) · Contact (`/contact-us`)

> The old "Integrations" menu is intentionally removed (no pages exist).

### 8.4 Footer
Dark (ink-950). Columns: Contact block · Solutions · Industries · Partners · Company. Then DisclosuresBlock, then bottom row (copyright, Terms, Privacy, Accessibility, social icons).
Contact block:
- (844) 365-3050 main · (661) 885-8801 fax
- sales@beyondbancard.com · boarding@beyondbancard.com
- 500 N State College Blvd., Suite 800, Orange, CA 92868 (link: `https://maps.app.goo.gl/iVN1hwaA5SxrrX2L9`)
Social: LinkedIn `https://www.linkedin.com/company/beyond-bancard/`, X `https://twitter.com/BeyondBancard`, Facebook `https://www.facebook.com/bb.beyondbancard`, Instagram `https://www.instagram.com/beyondbancard/`

### 8.5 DisclosuresBlock (use verbatim)
> Beyond Bancard is a registered ISO/MSP of Esquire Bank, Jericho, NY; Merrick Bank, South Jordan, UT; and Mission Valley Bank, Sun Valley, CA.
>
> The Clover name and logo are registered trademarks owned by Clover Network, LLC. These registered trademarks are also utilized by Fiserv Canada Ltd. Beyond Bancard operates as an Independent Sales Organization (ISO) of Fiserv Canada Ltd. All trademarks, service marks, and brand names mentioned are the exclusive property of their respective owners.
>
> © 2026 Beyond Bancard™. All rights reserved.

### 8.6 CtaBand (reusable)
Large brand-600 panel, radius-lg. Title + one sentence + Apply now (white) + Talk to an expert (outline white). Default copy:
- Title: "Build a better payments program."
- Body: "Simpler processing, better economics, or support for a complex business model. Tell us what you need and we'll build around it."
**Only one CtaBand per page.**

### 8.7 StickyMobileCta
< md only, on pages 1–5: two buttons "Apply now" / "Call" (M10).

### 8.8 FaqSection
Accordion (single open), `FAQPage`-ready structure (no JSON-LD needed for demo). Left column: title + "Something else? Call (844) 365-3050."

---

## 9. Page specifications

Section order is mandatory. Copy is approved unless marked `CONFIRM`. Animation IDs refer to §6.

### 9.1 Homepage `/`
**Purpose:** establish positioning, route each audience, drive Apply / Talk to an expert.

1. **Hero** (dark ink-900 + S1 gradient; 2 columns ≥ lg)
   - H1 (display): **The processor that says yes.**
   - Lead: "Merchant accounts for businesses other processors turn away, and for everyday businesses too. We underwrite how your business actually works, then stay involved long after approval."
   - CTAs: Apply now · Talk to an expert
   - Fact row (3 small items with green dots): "20+ years in payments" `CONFIRM` · "Nationwide coverage" · "Declined elsewhere? You can still apply"
   - Right: **UnderwritingCard (S2)** — header "New merchant application · Nutra & supplements"; fields: Sales channel "Online, card-not-present", Billing "Recurring subscription", Monthly volume "$250,000" (label the card "Example application"), Prior processor "Declined"; checks: Business model review · Transaction profile · Chargeback history · Risk structuring; final pill "Approved".
   - Animation: H1 words reveal (stagger.tight), lead + CTAs fade up, card enters from right with slight scale.
2. **TrustStrip / TechMarquee (S3)** on white:
   - Static label: "Registered ISO/MSP of Esquire Bank, Merrick Bank and Mission Valley Bank"
   - Marquee badges (text only): Esquire Bank · Merrick Bank · Mission Valley Bank · BBB Accredited Business `CONFIRM` · Authorize.net · NMI · USAePay · Clover
   - Optional stat: "15,000+ merchants" `CONFIRM`
3. **PillarsSection (S4)**
   - H2: "One partner for the whole life of your account."
   - Lead: "Approval is only the start. Beyond helps you take payments, protect them, fund growth and run the day-to-day."
   - 4 pillars, each: title, descriptor, 4 links (use Solutions menu data).
4. **Industries (IndustryGrid, featured)**
   - H2: "Built for complex commerce."
   - Lead: "Deep experience in regulated and emerging categories, where a generic merchant account usually falls short."
   - 6 SpotlightCards (M6) using featured industries + teasers (§9.3). Nutra card links to the demo page.
   - Chips row: "Everyday businesses too:" CBD & hemp · Vape & tobacco · eCommerce · Retail · Restaurants & hospitality · Auto repair
   - Button: View all industries
5. **ProcessTimeline (compact, dark section)**
   - H2: "How we get you approved, and keep you processing."
   - Steps (numbered — real sequence): Apply · Underwriting · Launch · Monitor · Optimize (bodies from §9.2 step 5)
   - Side panel "What underwriters look at": the 6 risk factors (short form).
6. **Partners teaser**
   - H2: "Partner with Beyond."
   - Lead: "Training, marketing support and competitive economics for the people who bring merchants to us."
   - 3 columns: ISOs & agents · ISVs & platforms · Associations (descriptors §9.5) with links.
   - Small line: "Already a partner? Log in to the partner portal."
7. **Testimonials**
   - H2: "What merchants say."
   - Large featured quote (Andrew C.) + 3 smaller (see §9.8). Fade crossfade on mobile carousel.
8. **Technology**
   - H2: "Works with the tools you already use."
   - Body: "Connect to leading gateways and popular commerce platforms, including Shopify, WooCommerce and Squarespace. Equipment is available across nine hardware brands, from countertop POS to mobile readers." (`CONFIRM` "nine hardware brands")
   - 2×2 tiles: Authorize.net · NMI · USAePay · Clover (text tiles, no logos until licensed)
   - Tabs (PaymentCloud-style): selecting a gateway animates a mock checkout snippet.
9. **FaqSection** — use Homepage FAQs §9.9.
10. **CtaBand**.

### 9.2 High-Risk Processing `/accept/high-risk-processing`
**Purpose:** convert high-risk merchants; explain underwriting honestly.

1. **PageHero** (light, breadcrumb: Solutions / Accept / High-risk processing)
   - H1: "High-risk merchant accounts built for how your business really works."
   - Lead: "Complex industries need more than a generic merchant account. Beyond combines experienced underwriting, multiple processing paths, risk tools and ongoing support to build a processing setup that lasts."
   - CTAs: **Talk to a high-risk expert** (secondary style promoted to primary here is allowed) · Apply now
   - Visual: small UnderwritingCard variant (static, already "In review").
2. **RiskFactors** — H2 "Risk is more than an industry label." Lead: "Processors and sponsor banks look at your whole business and transaction profile. Understanding these factors is the first step to the right setup."
   Items (not numbered; icon each):
   - Industry and products — Some business types receive closer review.
   - Card-not-present sales — Online and remote sales carry more fraud and dispute risk.
   - Recurring billing — Subscriptions add lifecycle and chargeback considerations.
   - Higher ticket sizes — Larger sales mean larger financial exposure.
   - Chargeback history — Past dispute patterns shape account health.
   - International activity — Cross-border customers add complexity.
3. **Underwriting philosophy** (2 columns: text + FeatureGrid)
   - H2: "We start with how your business actually works."
   - Body: "Beyond looks past the category name to your products, customers, transaction flow, fulfillment, marketing and processing history."
   - 4 features: Multiple processing paths · Recurring commerce support · Risk tools built in · Experienced people who stay involved (bodies: reuse current site copy, rewritten to one sentence each).
4. **Featured complex industries** — 6 cards (reuse IndustryGrid featured) + View all industries.
5. **ProcessTimeline (S5, full)** — H2 "Built for the life of the account." Lead: "A healthy processing relationship needs ongoing attention to disputes, fraud, funding, volume and account changes. Beyond stays involved after launch."
   - Application — Tell us how your business sells and what you need.
   - Underwriting — Experienced reviewers assess your full business profile.
   - Launch — We set up the right processing path, gateway and tools.
   - Monitor — We watch disputes, fraud, funding and volume with you.
   - Optimize — As you grow, we adjust your setup to keep the account healthy.
6. **Related solutions** — chip links: Online payments · ACH & eCheck · Payment gateways · Chargeback protection · 3D Secure · Fraud & risk tools · Reporting
7. **FaqSection** — title "High-risk processing questions." FAQs:
   - What makes a business high risk? — Processors weigh your industry, chargeback history, transaction profile and how much you sell online, among other factors.
   - What industries does Beyond support? — Beyond has particular depth in adult, gaming, nutra and supplements, RUO peptides, travel and cannabis-related businesses, plus many everyday categories. `CONFIRM` full list
   - Why are high-risk accounts underwritten differently? — Dispute exposure, transaction patterns and regulatory considerations differ from conventional retail, so the review is more tailored.
   - Are reserves always required? — `CONFIRM` (render placeholder via `<Confirm>`: "Reserve requirements depend on your business and underwriting outcome.")
   - Can high-risk merchants accept payments online? — Yes. Online, card-not-present acceptance is available for many qualifying high-risk business models.
   - Can Beyond work with businesses declined elsewhere? — In many cases, yes. A decline from another processor doesn't automatically disqualify you. `CONFIRM`
   - How long does underwriting take? — `CONFIRM` ("Timing depends on your business and documentation.")
8. **CtaBand**.

### 9.3 Industries hub `/industries`
**Purpose:** let any merchant find their industry fast.

1. **PageHero** — H1 "Payments built around the way you do business." Lead: "Every industry has its own payment realities. Beyond combines flexible infrastructure, experienced underwriting, risk tools and hands-on support to fit your business, not force it into a generic model." CTA: Talk to a payments expert.
2. **Featured complex industries** — H2 "Complex commerce is where experience matters most." 6 large SpotlightCards with teaser + one-line description:
   - Adult — Payments infrastructure built for the realities of adult commerce.
   - Gaming — Built for high-velocity, digital-first payment environments.
   - Nutra & supplements — Payments engineered for fast-growing commerce. (**links to demo page**)
   - RUO peptides — Processing that understands Research Use Only.
   - Travel — Payments built for what happens before takeoff.
   - Cannabis-related businesses — Navigate complex payments with confidence.
3. **Our approach** — 4 real steps: Understand · Structure · Launch · Optimize (from current site: "We start with the business model… / Align processing, payment methods, gateway technology… / Support the journey from application… / Stay involved with reporting, chargebacks, risk…").
4. **All industries (S6)** — H2 "More industries. Same payments expertise."
   - Filter chips: All · Specialized & regulated · Retail & hospitality · Professional & field services · Healthcare & wellness · Digital businesses
   - Optional search input (client-side filter by name).
   - Compact cards (name + teaser). Each group has an `id` anchor for menu links.
   - Industry data (slug → name → teaser):
     - specialized: cbd-hemp CBD & hemp "Underwriting built around product and content review." · vape-ecig Vape & e-cig "Payment infrastructure for regulated vape commerce." · tobacco-cigar Tobacco & cigar "Payments built for regulated tobacco retail." · nicotine-pouches Nicotine pouches "Processing built around modern nicotine commerce." · hookah-shisha Hookah & shisha "Flexible payments for lounges and specialty retail." · kratom Kratom "Processing built around complex kratom commerce." · functional-mushroom Functional mushrooms "Infrastructure for emerging wellness commerce." · online-pharmacy Online pharmacy "Payments built for complex, verified pharmacy commerce." · gun-shop Gun shops "Reliable payments for regulated firearm retailers." · bail-bond Bail bonds "Payments that work around the clock." · pawn-shop Pawn shops "Payment technology for high-value, fast-moving retail."
     - retail: ecommerce eCommerce "Turn every digital checkout into a better experience." · retail Retail "Make every checkout work harder." · restaurant-hospitality Restaurants & hospitality "Keep service moving from order to payment." · hotel Hotels "Payments built around the guest journey." · auto-repair Auto repair "Make payment as smooth as the service." · car-dealership Car dealerships "Payments built for higher-value automotive commerce." · jewelry Jewelry "Protect the experience behind every high-value sale." · furniture Furniture "Flexible payments for higher-ticket retail."
     - professional: construction-contracting Construction & contracting "Get paid from job site to back office." · plumbing Plumbing "Get paid where the work happens." · moving-company Movers "Payment infrastructure for businesses that are always moving." · real-estate Real estate "Flexible payment tools for real estate businesses." · leasing Leasing "Payments built for recurring leasing relationships." · insurance Insurance "Make premium and service payments easier to collect."
     - healthcare: medical-healthcare Medical & healthcare "Easier payment collection for patients and staff." · mental-health-wellness Mental health & wellness "Simplify payment collection around ongoing care." · telehealth-virtual-care Telehealth & virtual care "Payments built for care delivered online." · medical-spa Medical spas "Better payments for modern wellness businesses."
     - digital: saas SaaS "Payments built for recurring software revenue." · web-developer-agency Web developers & agencies "Give your clients a better path to payments." · jet-charter Jet & charter "Infrastructure for high-value charter transactions."
     - featured slugs: adult, gaming, nutra-supplements, ruo-peptides, travel-payment-solutions, crb
5. **Don't see your industry?** small band — "We review many business models individually." CTA Talk to an expert.
6. **CtaBand**.

### 9.4 Nutra & Supplements `/industries/nutra-supplements`
**Purpose:** prove the industry template (reused for 38 pages).

1. **PageHero** (breadcrumb: Industries / Nutra & supplements) — H1 "Nutra and supplement payments that keep up with your growth." Lead: "Fast-growing nutraceutical and supplement brands need payment infrastructure that understands ecommerce, recurring revenue, product review and changing volume." CTAs: Talk to a nutra payments expert · Apply now. Visual: dashboard-style illustration showing subscription revenue tiles (illustrative, no real numbers — label "Illustration").
2. **Why this industry is different** — H2 "Nutra has its own payment realities." 4 items (icons, not numbered):
   - Product and claims review — What you sell and how you market it matters during underwriting.
   - Recurring commerce — Subscription and auto-ship models need payment infrastructure built for ongoing billing.
   - Ecommerce and card-not-present risk — Most nutra brands sell online, so fraud controls and visibility matter more.
   - Rapid growth — Fast-scaling brands need a setup that grows with changing volume.
3. **Business models we support** — chips: Nutraceutical ecommerce · Supplement subscriptions · Auto-ship / continuity programs · Wellness product commerce · Direct-to-consumer brands · Other qualifying nutra businesses. Note: "Eligibility is subject to underwriting."
4. **Why Beyond** — 4 features: Underwriting that starts with understanding · More ways to structure payments · Protect the processing relationship · People who stay involved.
5. **CapabilityTabs** — tabs by pillar (**correct pillars**):
   - Accept: Online payments — Ecommerce acceptance built for nutra checkout flows.
   - Grow: Recurring billing — Support for subscription and auto-ship billing. · Working capital — Capital options to help fund inventory and growth.
   - Protect: Chargeback protection — Tools to help manage disputes tied to recurring billing. · Fraud tools — Transaction-level fraud monitoring for ecommerce.
   - Operate: Reporting — Visibility into recurring revenue and transaction trends.
6. **ChecklistSection (S7)** — H2 "Built for the life of the account." Items: Chargeback activity · Recurring billing and auto-ship patterns · Refund and cancellation activity · Volume changes · Fraud monitoring · Product and claims review.
7. **ProcessTimeline (compact)** — Understand · Structure · Launch · Support & optimize.
8. **FaqSection** — "Nutra and supplement payment questions."
   - Does Beyond support my nutra or supplement business? — Beyond reviews qualifying nutraceutical, supplement and wellness businesses individually. `CONFIRM`
   - Why is this category more complex? — Product and claims review, recurring billing and ecommerce fraud exposure all call for a more specialized review.
   - What documents may be required? — `CONFIRM` ("Underwriting typically reviews your product catalog, marketing claims, website and transaction profile.")
   - Can Beyond support subscription or auto-ship billing? — Yes, recurring and auto-ship billing is supported for qualifying merchants.
   - How are chargebacks handled? — Beyond provides monitoring and dispute-management tools built around recurring billing patterns.
   - Can Beyond work with my existing website or gateway? — `CONFIRM`
   - Are there restrictions on product claims? — Yes. Marketing and product claims are reviewed during underwriting. `CONFIRM` specifics
9. **Related industries** — chips: Functional mushrooms · Kratom · CBD & hemp · eCommerce
10. **CtaBand**.

### 9.5 ISOs & Agents `/partners/isos-agents`
**Purpose:** recruit sales partners; show the programme clearly and credibly.

1. **PageHero** (dark variant) — H1 "Grow your merchant portfolio with a processor that says yes." Lead: "Offer more merchants a home, including hard-to-place businesses, with broader products, dedicated support and competitive economics." CTAs: **Become a partner** · Log in to partner portal (ghost, external).
2. **Who it's for** — 3 short cards: Independent agents · ISOs and sales offices · Referral partners.
3. **Benefits** — H2 "Built around your success." (all numbers `CONFIRM`)
   - Uncapped income — High residual earnings and activation bonuses. `CONFIRM` "residuals up to 100%", "bonuses up to $10,000"
   - In-house support — A dedicated team of relationship managers, plus training and marketing resources.
   - Fast turnaround — Quick application decisions. `CONFIRM` "2-hour application turnaround"
   - Flexibility — Work from anywhere and set your own schedule.
   - Broader approvals — Place high-risk and hard-to-place merchants other processors decline.
   - Equipment and tools — Access to leading POS systems, terminals and gateways.
   - Use `CountUp` only for confirmed numbers; otherwise show text without numbers.
4. **How the programme works (S8)** — numbered steps: Apply to partner · Get onboarded and trained · Submit merchants · Track and earn in the partner portal.
5. **Partner portal preview** — illustrated UI panel (illustrative data, labelled "Illustration") showing application statuses and residual summary.
6. **Other partner programs** — cards: ISVs & platforms ("Embed payments, enhance your product and create recurring revenue.") · Associations ("Create a valuable payment benefit for members while generating recurring revenue.")
7. **FaqSection** — "Partner program questions."
   - Who can become a partner? — Independent agents, ISOs, sales offices and referral partners. `CONFIRM`
   - Is there a cost to join? — `CONFIRM` (current site says resources are offered "without the cost of registering")
   - How are residuals paid? — `CONFIRM`
   - Can I submit high-risk merchants? — Yes, subject to underwriting.
   - What support do partners get? — Relationship managers, training and marketing resources.
8. **CtaBand** — Title "Ready to grow with Beyond?" CTAs: Become a partner · Talk to our partner team.

### 9.6 Apply `/live-form`
**Purpose:** demonstrate a friendly, fast, trustworthy application start.

Layout: 2 columns ≥ lg (form 7 cols, trust sidebar 5 cols). No StickyMobileCta.
1. Header: H1 "Apply for a merchant account." Lead: "It takes about five minutes. A payments expert will review your details and contact you about next steps." `CONFIRM` "five minutes"
2. **ApplyForm (S9)** — 3 steps with animated progress bar:
   - **Step 1 — Your business:** Business legal name* · Industry* (select from industries list + "Other") · Website (url) · Years in business (select: <1, 1–2, 3–5, 5+) · How do you sell? (multi: In person, Online, Phone/mail, B2B invoicing)
   - **Step 2 — Processing:** Estimated monthly card volume* (select ranges: <$10K, $10K–50K, $50K–100K, $100K–500K, $500K+) · Average ticket (select ranges) · Do you offer subscriptions? (yes/no) · Currently processing? (yes/no) → if yes: Current processor (text) · Have you been declined or terminated by a processor? (yes/no, helper text: "This won't automatically disqualify you.")
   - **Step 3 — Contact:** First name* · Last name* · Email* · Phone* · Best time to call (select) · Consent checkbox* "I agree to be contacted by Beyond Bancard about my application." + Privacy link
   - Validation: zod; inline errors (danger-600) slide in; Next disabled until step valid; Back keeps values.
   - Submit: simulate 1.2s loading → success panel with animated checkmark: "Thanks, {firstName}. Your application has been received." + "What happens next" 3 steps (Review · Call from an expert · Underwriting) + "Back to home". **No network request.** Show a small demo-mode notice: "Demo only — no data is sent."
3. **Trust sidebar** (sticky ≥ lg): "Why merchants choose Beyond" (3 bullets: Experienced underwriting · Multiple processing paths · People who stay involved) · "Prefer to talk?" phone + Talk to an expert · Sponsor bank disclosure (short) · Security note "Your information is handled under our Privacy Policy." (link)

### 9.7 Solution URL slugs (for menus)
`/accept/` → `high-risk-processing`, `online-payments`, `in-person-payments`, `b2b-payments`, `international-payments`, `ach-echeck`
`/protect/` → `chargeback-protection`, `network-tokenization`, `3d-secure`, `fraud-risk-tools`
`/grow/` → `working-capital`, `instant-payouts`, `recurring-billing`, `cost-reduction-programs`  (hub is `/grow`, NOT `/ggrow`)
`/operate/` → `dashboard-reporting`, `invoicing`, `payment-gateways`, `payment-technology`, `pos`, `virtual-terminal`
Other: `/catalog`, `/partners`, `/partners/isvs-platforms`, `/partners/associations`, `/news`, `/our-clients`, `/faq`, `/about-beyond-bancard`, `/careers`, `/contact-us`, `/schedule-a-demo`, `/terms-conditions`, `/privacy-policy`, `/accessibility`

### 9.8 Testimonials (approved — existing on client site; `CONFIRM` permission to display)
1. "Jimmy and his team at Beyond Bancard have saved me thousands of dollars in fees with their cash discount program. I have saved over $5,000 a month in fees with this great new program. I highly recommend anyone to give the team at Beyond Bancard a try." — **Andrew C.**, CEO, Universal Travel Group *(featured)*
2. "Beyond Bancard has provided A1 service for my business. Eighty-five percent of my business is credit card processing. The team at Beyond Bancard customized a program catering to the needs of my business." — **James W.**, Owner, Smile Time Dental Group
3. "Over the last few years we have made use of Beyond Bancard's support team numerous times, and they have always assisted us in resolving the issue with an entirely satisfactory result." — **Carlos H.**, Owner, Papas and Beer
4. "Beyond Bancard gets it done. They have lowered my interest rate and helped my business save hundreds of dollars a month. I highly recommend them." — **Kumar S.**, Owner, Lifetime Jewelers

Do not edit quote wording. Do not add star ratings, photos or logos.

### 9.9 Homepage FAQs
- Can I monitor my transactions? — Yes. Our PCI-compliant, web-based payment gateway lets you monitor transactions 24/7.
- Can you work with businesses declined elsewhere? — In many cases, yes. A decline from another processor doesn't automatically disqualify you. `CONFIRM`
- Do you offer equipment? — Yes. We offer equipment across nine brands, from standalone restaurant POS to portable readers. `CONFIRM`
- How are my transactions kept secure? — Transactions run through industry-leading gateways held to PCI compliance standards, and we hold multiple compliance certifications. `CONFIRM` which
- Do you have a partner program? — Yes. We support agent partners with training, marketing resources and competitive processing rates.

### 9.10 Coming soon `/coming-soon`
Centered message: "This page is part of the full redesign." Show requested path (`from`). Buttons: Back · Go to homepage. Include `noindex`.

---

## 10. Content rules
1. Voice: plain, confident, specific. Short sentences. Sentence case.
2. No superlatives without proof ("best", "lowest", "#1").
3. No invented numbers, logos, certifications, awards, customers or quotes.
4. Illustrations with numbers must be labelled "Example" or "Illustration".
5. Use "Beyond Bancard" on first mention per page, "Beyond" after.
6. Every `CONFIRM` item → `<Confirm note="...">` + entry in `docs/CONFIRM_LIST.md`.
7. Keep regulatory disclosures verbatim (§8.5).

---

## 11. Non-functional requirements

### 11.1 Accessibility (WCAG 2.2 AA)
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one H1 per page, logical heading order.
- Skip link "Skip to content".
- Full keyboard support for menus, tabs, accordions, form steps; visible focus.
- `aria-live="polite"` for UnderwritingCard status and form step changes/errors.
- Color is never the only indicator (icons/text with status colors).
- Marquee duplicates `aria-hidden="true"`; pause on hover/focus.
- Respect `prefers-reduced-motion` everywhere (§6.1).
- Pinch-zoom allowed (no `maximum-scale`/`user-scalable=no`).
- Tap targets ≥ 44px.

### 11.2 Performance budgets (mobile, Lighthouse)
- LCP < 2.5s, CLS < 0.05, INP < 200ms.
- Initial JS per route ≤ 180kb gzipped (lazy-load GSAP and MeshGradient with `dynamic()`; `ssr: false` for WebGL).
- Fonts: `display: swap`, subset latin.
- MeshGradient pauses offscreen/hidden tab; caps devicePixelRatio at 1.5.

### 11.3 Responsive
Test at 360, 390, 768, 1024, 1280, 1440px. No horizontal page scroll. Mega menu becomes MobileMenu < lg.

### 11.4 Browser support
Latest Chrome, Safari (incl. iOS), Firefox, Edge.

### 11.5 Demo privacy
- Vercel password protection enabled.
- `robots.txt` disallow all + `X-Robots-Tag: noindex` header.
- No analytics, no third-party scripts except Google Fonts via `next/font` (self-hosted).

---

## 12. Quality gates (run after every milestone)
- `pnpm lint` and `pnpm tsc --noEmit` pass.
- `pnpm build` passes with all routes static.
- Playwright:
  - each demo route returns 200 and has one `h1`
  - no `a[href="#"]` and no empty hrefs
  - all internal links resolve (demo route or `/coming-soon`)
  - mega menu opens/closes with keyboard; Esc returns focus
  - Apply form: validation errors show; completes 3 steps; success state shows
  - axe: zero serious/critical violations
  - reduced-motion emulation: pages render final states
- Lighthouse CI thresholds from §2.3.
- Manual: check at 390px and 1440px; screenshot each page to `docs/screenshots/`.

---

## 13. Environment variables
```
NEXT_PUBLIC_DEMO_MODE=true
```

---

## 14. Milestones (build in this order)
| # | Milestone | Deliverables | Done when |
|---|---|---|---|
| M0 | Setup | Project, deps, lint/format, Playwright, folder structure, `docs/DECISIONS.md`, `docs/CONFIRM_LIST.md` | `pnpm build` passes |
| M1 | Design system | Tokens, fonts, Button, Container, Section, Badge, Chip, Card, Confirm, motion tokens, Reveal/Stagger, reduced-motion hook | `/dev/styleguide` route (dev only) shows all tokens & components |
| M2 | Global layout | AnnouncementBar, Header + MegaMenu (M1, M2), MobileMenu, Footer, Disclosures, CtaBand, StickyMobileCta, Lenis, route fade, coming-soon, 404 | Nav works on desktop/mobile; link tests pass |
| M3 | Homepage | All §9.1 sections incl. S1, S2, S3, S4 | Quality gates pass |
| M4 | High-Risk page | §9.2 incl. S5 | Quality gates pass |
| M5 | Industries hub + Nutra | §9.3 (S6) and §9.4 (S7) | Quality gates pass |
| M6 | ISOs & Agents | §9.5 (S8) | Quality gates pass |
| M7 | Apply | §9.6 (S9) | Form tests pass |
| M8 | Polish & QA | Cross-page consistency, performance tuning, a11y fixes, screenshots, CONFIRM_LIST complete | All §2.3 criteria met |
| M9 | Deploy | Vercel preview + password + noindex; share link | Client can open on phone and desktop |

---

## 15. Client sign-off checklist (after demo)
1. Visual direction (colors, type, logo usage)
2. Navigation and information architecture
3. Messaging and tone ("The processor that says yes")
4. CTA labels and conversion flow
5. Motion level (too much / right / too little)
6. Items in `docs/CONFIRM_LIST.md` answered
7. Platform decision for full build (Next.js + Sanity, or Next.js + headless WordPress)

---

## 16. Open questions (track in CONFIRM_LIST.md)
- Official logo files, brand blue hex, brand fonts
- Verified: 20+ years; 15,000+ merchants; BBB display permission; PCI Level 1; nine equipment brands; gateway list
- Partner terms: residuals, bonuses, turnaround, cost to join
- Underwriting: timelines, documents, reserves policy, declined-merchant appetite
- Apply form required fields (match onboarding system)
- Testimonial display permission
- RUO announcement: permanent or campaign?

---

## 17. Glossary
- **ISO** — Independent Sales Organization; resells merchant services on behalf of sponsor banks/processors.
- **MSP** — Merchant Service Provider.
- **CNP** — Card-not-present (online, phone, mail).
- **Chargeback** — A disputed transaction reversed by the cardholder's bank.
- **Reserve** — Funds held by the processor to cover potential chargebacks/losses.
- **Underwriting** — Risk review before approving a merchant account.
- **RUO** — Research Use Only (peptides category).
- **CRB** — Cannabis-related business.

Colour improvements I'd make

These apply whatever the exact blue turns out to be.

1. Standardise the logo system. Replace the three versions with one primary blue logo, a white (reversed) version for dark backgrounds, and a one-colour black version only for print or partner use. Use the same logo on every page.

2. Turn one blue into a full scale. Most small-business brands have a single blue. I'd build 10 shades from it (50 to 950), so there are proper tints for backgrounds and hover states and deep shades for dark sections, all matching the brand. Without a scale, designers improvise and colours drift across pages.

3. Add a deep navy "trust" colour. Payments brands (Stripe, Adyen, PaymentCloud) lean on dark, serious backgrounds for heroes and footers. A navy taken from the brand blue gives Beyond more authority than plain black or a bright blue.

4. Use blue-tinted neutrals. Swap plain greys for very slightly blue-tinted greys for text, borders and backgrounds. The whole site then feels like one brand instead of "blue plus random grey".

5. Add status colours with clear meanings. A high-risk processor constantly shows approvals, reviews and warnings, so define these once:

green = approved / success
amber = in review
red = errors only

Never use red for decoration, because it means "problem" in finance.

6. Keep the brand blue for actions. Use it for buttons, links and key highlights only. When everything is blue, users can't tell what's clickable.

7. Check contrast properly. Mid-blues often fail accessibility contrast for small text on white. I'd test every text/background pair against WCAG AA and darken the text version of the blue if needed, while keeping the logo colour unchanged.

8. Replace the PNG icons with one outline icon set in a single colour (navy or brand blue). This alone makes the site look far more modern.

9. Build gradients only from brand colours. For the Stripe-style animated hero, blend navy → brand blue → a lighter sky tint. No purple or off-brand colours.

10. Plan a chart palette. Dashboards and savings calculators need 5–6 distinguishable colours derived from the brand, so future charts don't look improvised.

11. Prepare for dark mode. Define colours as tokens now so a dark theme can be added later without redesigning.

12. Document it. Deliver a one-page colour guideline: swatches, hex/RGB values, allowed pairings, contrast ratings, and do/don't examples. The client's team and any future agency then stay consistent.