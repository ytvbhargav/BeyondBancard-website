# Top 6 industries and Solutions pages: design spec

**Date:** 21 Sept 2026 · **Status:** approved ("make a tracker and start work") · **Decision log:** D-058 · **Tracker:** `docs/TRACKER.md`

Adds 27 routes that went to `/coming-soon`:

- **Industries (4):** `/industries/gaming`, `/industries/ruo-peptides`, `/industries/travel-payment-solutions`, `/industries/crb`. Template: `IndustryDetail` (D-057), unchanged.
- **Solutions hubs (4):** `/accept`, `/protect`, `/grow`, `/operate`.
- **Solution pages (19):** every item in the Solutions menu except High-risk processing (built from the PRD).

Hubs and solution pages share one new data-driven template, `components/sections/SolutionPage.tsx`, fed by one `SolutionPageContent` object per page (`types/content.ts`).

Source copy: the live beyondbancard.com page for each route, captured 21 Sept 2026 through a headless browser (the site sits behind a SiteGround proof-of-work check). Structured outlines of every captured page (verbatim text in DOM order, including the collapsed FAQ answers) are in the session scratchpad `outline/<route with __ for />.md`, e.g. `outline/accept__online-payments.md`, `outline/industries__gaming.md`.

---

## 1. Ground rules (every page)

1. **Never invent facts** (CLAUDE.md rule 1). Copy is the live page's own words. Where the live page is unfinished or wrong, §3 says what to do; nothing is made up to fill a gap.
2. **Design tokens only;** reuse `Section`, `SectionHeader`, `FeatureGrid`, `ProcessTimeline`, `Chip`, `ChipLink`, `ChipToggle`, `Button`, `Badge`, `Icon`, `Reveal`, `Stagger`, `Confirm`, `MaybeConfirm`, `SpotlightCard` styling.
3. **Concept continuity (D-001, the underwriting file):** label/value rows with hairlines, tabular figures, status pills. No eyebrows above headings (D-003), numbers only on real sequences (D-005), no identical card grids (D-004), no stock photos or live-site images, no emoji, sentence-case headings, section h2s end with a full stop.
4. **CTA vocabulary:** hero actions are always the expert button (primary, arrow) then "Apply now" (secondary), as on High-risk and the industry pages. The expert label is "Talk to an expert" unless the live page names the expert ("Talk to a chargeback expert"), which becomes `hero.expertCta` in sentence case. Live labels such as "Get Started", "Talk to Sales", "Help Me Choose", "See How It Works", "Explore …" (in-page jumps) and the live typo "Talk to a Payments Technology" are not used.
5. **Beyond Bancard** on first mention per page (usually the hero lead), "Beyond" after (PRD §10.5).
6. **Accessibility (WCAG 2.2 AA):** one H1, h2 per section, h3 inside, visible focus, 44px targets, `aria-live="polite"` for anything that changes on input, reduced motion shows final states, colour never the only signal.
7. **Motion:** transform/opacity only, reveals once, existing `Reveal`/`Stagger`; interaction motion is welcome.
8. **Content files are the CMS boundary:** all copy lives in `content/…`; page files only compose.

## 2. Architecture

```
types/content.ts                      SolutionPageContent, SolutionBlock union, HeroFileContent, Flag
content/solutions/links.ts            solutionLink, solutionLinkAs, pillarLink, solutionBreadcrumb,
                                      solutionPillar, pickFaq, ANSWER_TO_SUPPLY
content/solutions/<slug>.ts           one SolutionPageContent per page (§5 for file and export names)
content/<industry>.ts                 IndustryDetailContent + FAQs + hero card props (§6)
components/sections/SolutionPage.tsx  template: PageHero → blocks → RelatedLinks → PillarLinks → FaqSection → CtaBand
components/sections/solution/*.tsx    one component per block kind (§4)
components/illustrations/HeroFile.tsx hero illustration
app/<route>/page.tsx                  thin wrappers (generated)
```

- **Section tones** alternate surface/paper from the first block down (the hero is paper with a bottom rule), through related solutions, the pillar links and the FAQ. Blocks never set their own tone.
- **Flags:** `Flag = { confirm?, note? }`. A block with `confirm: true` shows an amber marker beside its h2 in demo mode and is dropped whole in production (D-042), so no heading ever renders empty. Items (features, compare columns, table cells, FAQ answers) carry their own flags and render through `MaybeConfirm`/`Confirm`. Notes read as a question for the client, prefixed with the page name: `"Online payments: …"`. `pnpm confirm-list` collects them.
- **Heading ids:** each block's h2 id is `${block.id ?? "section-" + (index + 1)}-title`, passed in as `headingId`. Fixed ids elsewhere: `related-title`, `bigger-picture-title`, `faq-title`, `cta-band-title`.
- **Related solutions:** `RelatedLinks`, title "Related solutions" (as on High-risk), links built with `solutionLink()` so labels are the menu labels.
- **The bigger picture:** `PillarLinks`: the live "bigger picture" heading and lead for this pillar, then plain links to the **other three** pillars with their menu descriptors. The current pillar is not listed, so the row can't read as tabs (memory: no tab-style sibling rows).
- **FAQ:** `FaqSection` with `faq.items` (page-local, not in `content/faqs.ts`).
- **CtaBand:** default copy (PRD §8.6). The live band's "Get Started / Talk to Sales" labels are not used.

## 3. Content rules (for every content file)

**C1 Verbatim.** Body sentences are copied exactly, including the live punctuation and em dashes. Allowed mechanical edits only:
- Headings, card titles, feature titles, chip labels, table labels and button labels in **sentence case** (keep proper nouns and acronyms: Beyond, Beyond Bancard, ACH, eCheck, POS, EMV, PIN, B2B, RUO, CRB, CBD, PCI, API, Visa, Mastercard, Apple Pay, Nacha, Level 1/2/3, 3D Secure).
- Section h2s end with a full stop; titles of features, cards, chips and table labels do not.
- "Beyond" → "Beyond Bancard" at the first mention on the page.
- Straight apostrophes (`'`), as in the existing content files.
- Eyebrow labels above headings dropped (D-003); "01–04" markers dropped except on real sequences, where the steps component numbers them.
- Obvious typos fixed and listed in the file's header comment ("DisFraud & Risk" → "Fraud & risk", "Signin" → "Sign in", "plataforms").

**C2 Placeholders never render.**
- FAQ answer `X [Placeholder — Y]` → `a: "X"`, `confirm: true`, `note: "<Page>: <what Y asks> (live answer marked as a placeholder)"`.
- FAQ answer that is only a placeholder, repeats its question, or copies another question's answer → `a: ANSWER_TO_SUPPLY`, `confirm: true`, `note: "<Page>: <topic> (live answer <what is wrong>)"`.
- FAQ question that repeats the previous answer → the question is drafted minimally from its own live answer, `confirm: true`, `note: "<Page>: question wording drafted; the live question repeats the previous answer"`.
- Body copy followed by `TODO: VERIFY …` or `[Placeholder — …]` → keep the customer-facing sentence with `confirm: true` and a note; drop the marker text.
- Internal notes are dropped entirely and listed in the header comment: "Config flag: …", "Table data is configuration-driven…", "Cells marked TODO…", "This estimate connects to the same Merchant ROI experience…", "Beyond does not claim automatic credential updates unless verified.", "Beyond does not automatically claim enhanced-data capture…".
- Table cell `Text — TODO: VERIFY …` → `{ text: "Text", confirm: true, note }`.
- "Sample placeholder — pending verified customer quotes" testimonials are omitted.

**C3 Live-site errors** (copy that belongs to another page). Prefer this page's own live words (for example its FAQ answer), flagged with a note naming the problem; otherwise drop the item. A heading that names the wrong product becomes the section's own label as a sentence (e.g. "Where this fits.") and is listed in the header comment. Known cases are in §5.

**C4 Links.** Internal links only through `solutionLink("<menu label>")`, `solutionLinkAs(label, text)` or `pillarLink(pillar)`. Allowed raw hrefs (they resolve to `/coming-soon`): `/catalog`, `/grow/cash-discount`, `/grow/dual-pricing`, `/grow/surcharging`. Live links to `#`, `null`, "Integrations", "Reconciliation" or "Merchant Tools" are dropped (header comment), except where §5 maps them. Related links: no self-link, no duplicates, menu labels (so "Reporting & Analytics" and "Dashboard & Reporting" become "Reporting").

**C5 No images.** Live images (hero art, "why" photos) are dropped.

**C6 Hero visual** (`hero.visual: HeroFileContent`): the live hero mock card's own labels and figures, in sentence case, `tag: "Example"` when it shows figures, else `"Illustration"`. Status tone: `approved` only for outcomes (Authorized, Settled, Protected, Chargeback avoided, Proceed to authorization); `review` for in-progress states (Evaluating…, Under review); `neutral` for Live, Connected, Signed in, Active. Step states follow the live `done`/`active` classes. Drop decorations without meaning (a bare "8%", "↑ 12.4%"). Pages whose live hero has no mock card get no visual.

**C7 Block choice.** Blocks follow the live section order. Hero, related solutions, bigger picture and FAQ are not blocks (the template renders them). Mapping:

| Live pattern | Block |
|---|---|
| 4 icon boxes under a "Why …" label, usually beside a photo | `features`, `layout: "split"` |
| 5–6 icon boxes (ways to accept, use cases) | `features`, `layout: "ruled"` |
| 3–4 boxes numbered 01–04 that are **not** a sequence (realities, "why earlier matters") | `features`, `layout: "panel"` |
| "How it works" 01–04 | `steps` |
| `p-arch` node chain | `flow` (the `.dark` node is `focus`) |
| Inputs → BEYOND → outputs, or items → one outcome | `hub` (`center` defaults to "Beyond"; use the live centre label when it isn't BEYOND) |
| "Where this fits" list of short labels | `chips` |
| Two or three options side by side ("A vs. B", Level 1/2/3, traditional vs. expedited) | `compare` |
| Table rows | `table` |
| Heading + one or two paragraphs only | `statement` |
| Hub solution tiles, cost programs, hardware families | `cards` |
| Prompt → button rows | `actions` |
| Quoted questions | `questions` |
| ROI calculator | `estimator` |
| Environment picker | `selector` |
| Small band with one button ("Need the device too?", "Invoicing + ACH") | `callout` |

Icons for features come from `IconName` in `types/content.ts`; choose one that fits the title, or omit.

**C8 Header comment** at the top of each content file: source URL and capture date, then bullet lists "Edits", "Dropped" and "Live-site issues" (these feed D-058 and the client question list).

## 4. Block components (`components/sections/solution/`)

Every block component has the signature `export function X({ block, tone, headingId }: BlockProps<XBlock>)` (`BlockProps` from `BlockSection.tsx`) and renders one whole `<section>` labelled by `headingId`. Use `BlockSection` (standard header) or `Section` + `BlockTitle` (custom header). Keep each file focused (roughly under 150 lines).

- **FeaturesSection** (built): `FeatureGrid`; `split` = sticky left title/lead + rows.
- **PillarLinks** (built): the bigger picture.
- **FlowDiagram** (`flow`): an `<ol>` of stages. From lg one horizontal row, stages joined by arrow connectors (lucide `ArrowRight`, muted); 6–7 stages still fit (tighter padding, `type-small` detail). Below lg a vertical stack joined by down arrows. Stage = white tile (radius-sm, 1px line border, Archivo 600 label, optional muted detail); `focus` stage is `bg-ink-900 text-on-dark`. Stages stagger in; connectors fade in after. Optional `tags` as a row of static chips under the chain; optional `note` in `type-small text-muted`, wrapped in `MaybeConfirm` when `noteFlag` is set. No visible numbers; each stage has sr-only "Stage n of N".
- **HubDiagram** (`hub`): inputs → centre → optional outputs. From lg three columns: inputs as a stacked list of chips on the left, the centre as an ink-900 pill with the Beyond "B" mark or the centre label, outputs on the right, joined by thin connector lines (CSS or SVG, aria-hidden). Below lg: inputs wrap as chips, a down arrow, the centre, a down arrow, outputs. Semantics: `<ul aria-label="Connects">`, centre as text, `<ul aria-label="Delivers">`; when there are no outputs the centre is the outcome. Subtle entrance: chips stagger, connectors fade.
- **ChipBand** (`chips`): compact band like the industry "Business models" band: title (`type-h3` h2) and optional note left (4 cols), `Chip`s right (8 cols), chip background opposite to the section tone.
- **CompareColumns** (`compare`): one white panel split into 2 or 3 columns by hairlines. Two columns get a small round "vs" disc on the divider (aria-hidden; the sr text between columns is "versus"). Each column: title h3 (`type-h3`), optional subtitle (`type-body-lg` ink), optional body (muted), optional points as a ruled list. Stacks below md. Column flags wrap the body in `MaybeConfirm`. Optional `note` under the panel.
- **ComparisonTable** (`table`): a real `<table>` with an sr-only caption (the title), `th scope="col"` for options and `th scope="row"` for labels, in a white panel with hairlines, tabular text. Flagged cells render through `Confirm`. Below md, render each option as a stacked label/value card instead (the table is `hidden md:table`, the cards `md:hidden`). In production a row with any unconfirmed cell is dropped.
- **Statement** (`statement`): h2 left (5 cols), paragraphs right (7 cols, first paragraph `type-body-lg` ink-900, others muted). Stacks below lg.
- **SolutionCards** (`cards`): 2 columns for 2 or 4 cards, 3 columns from lg for 3 or 6. Each card is one link (the `SpotlightCard` interaction: border to brand-600, 2px lift, pointer spotlight on fine pointers): h3 title (`type-h3`), tagline (`type-h4` ink-900), body (muted), optional detail (`type-small`), and the link label with an arrow at the bottom. Client component only if the spotlight needs it.
- **ActionRows** (`actions`): ruled rows (file-row style): prompt as h3 (`type-h4`) left, a ghost arrow link right; stacked below sm. 56px+ rows.
- **QuestionList** (`questions`): the quotes as a ruled 2-column list (1 column below md), each in Archivo semibold (`type-h4`/`type-h3` scale), then the optional body as `type-body-lg`.
- **CostEstimator** (`estimator`, client): left: h2, lead, two labelled fields (volume with a "$" prefix, rate with a "%" suffix; `inputMode="decimal"`, defaults from content). Right: a white file panel with an "Estimate" badge, the result label, the annual figure (volume × rate ÷ 100 × 12, whole dollars, `Intl.NumberFormat("en-US")`, Archivo tabular, large), the disclaimer (`type-small`) and a secondary button (`block.cta`). Invalid or empty input shows "—" and a short inline hint, never NaN. The figure is announced through a polite live region 600ms after typing stops.
- **EnvironmentSelector** (`selector`, client): the legend as a visible label, `ChipToggle`s in a wrapping row inside `role="group"`, first option pressed by default; a result panel (white, radius-md) with the recommendation (render `**…**` as `<strong>`) in a polite live region and a secondary button (`block.link`).
- **CalloutBand** (`callout`): compact section; one white (or paper, opposite to the tone) panel: h2 (`type-h3`) and optional body left, secondary button with arrow right; stacks below md.
- **HeroFile** (`components/illustrations/HeroFile.tsx`): the hero panel in UnderwritingCard's style (`rounded-md bg-surface shadow-float`): header with title (`type-h4`), optional subtitle and the tag as `Badge status="illustration" icon={false}`; then, when present and in this order, the amount (label + large tabular Archivo figure), method chips, field rows (`<dl>` hairline rows like UnderwritingCard), stats (up to three columns split by hairlines), steps on a paper band (done = green check disc, active = brand ring with a soft pulse (opacity), pending = dashed circle; each has sr-only state text), then the status `Badge` in the footer. Done steps tick in one by one when the panel enters the viewport (like ChecklistSection); reduced motion shows the final state. `figure` with an aria-label naming it an example or illustration.

## 5. Pages

File and export names (the generated `app/**/page.tsx` imports these exactly):

| Route | File | Export |
|---|---|---|
| `/accept` | `content/solutions/accept.ts` | `accept` |
| `/protect` | `content/solutions/protect.ts` | `protect` |
| `/grow` | `content/solutions/grow.ts` | `grow` |
| `/operate` | `content/solutions/operate.ts` | `operate` |
| `/accept/online-payments` | `online-payments.ts` | `onlinePayments` |
| `/accept/in-person-payments` | `in-person-payments.ts` | `inPersonPayments` |
| `/accept/b2b-payments` | `b2b-payments.ts` | `b2bPayments` |
| `/accept/international-payments` | `international-payments.ts` | `internationalPayments` |
| `/accept/ach-echeck` | `ach-echeck.ts` | `achEcheck` |
| `/protect/chargeback-protection` | `chargeback-protection.ts` | `chargebackProtection` |
| `/protect/network-tokenization` | `network-tokenization.ts` | `networkTokenization` |
| `/protect/3d-secure` | `3d-secure.ts` | `threeDSecure` |
| `/protect/fraud-risk-tools` | `fraud-risk-tools.ts` | `fraudRiskTools` |
| `/grow/working-capital` | `working-capital.ts` | `workingCapital` |
| `/grow/instant-payouts` | `instant-payouts.ts` | `instantPayouts` |
| `/grow/recurring-billing` | `recurring-billing.ts` | `recurringBilling` |
| `/grow/cost-reduction-programs` | `cost-reduction-programs.ts` | `costReductionPrograms` |
| `/operate/dashboard-reporting` | `dashboard-reporting.ts` | `dashboardReporting` |
| `/operate/invoicing` | `invoicing.ts` | `invoicing` |
| `/operate/payment-gateways` | `payment-gateways.ts` | `paymentGateways` |
| `/operate/payment-technology` | `payment-technology.ts` | `paymentTechnology` |
| `/operate/pos` | `pos.ts` | `pos` |
| `/operate/virtual-terminal` | `virtual-terminal.ts` | `virtualTerminal` |

Common fields: `meta.title` = the menu label ("Online payments"; hubs: "Accept", "Protect", "Grow", "Operate"); `pillar`; `kind`; `breadcrumb: solutionBreadcrumb(pillar, menuLabel)` (hubs: `solutionBreadcrumb(pillar)`); `hero.title` = the live h1/h2 of the hero; `related.title` = "Related solutions"; `bigPicture` = the live "bigger picture" heading and paragraph; `faq.title` = the live FAQ heading in sentence case.

Known live-site issues and decisions per page:

- **Accept hub:** the "bigger picture" heading is Protect's ("Protect connects checkout to what happens after."): use Accept's own "Accept is where the transaction starts." with its paragraph. Hero mock: acceptance environment. Solution tiles → `cards` (High-risk processing first, as live). "Why Operate with Beyond" label is wrong; the h2 "Built for more than the transaction." is fine (labels aren't shown anyway).
- **Protect hub:** the live FAQ is a copy of the Adult FAQ. Use `pickFaq` to reuse, by reference, these live questions from the Protect pages: "What is network tokenization?", "What is 3D Secure?", "What is payment fraud prevention?", "What's the difference between fraud and a chargeback?", "What is proactive dispute resolution?" (title "Protect questions."). The section-2 paragraph repeats the Accept hub's ("Accepting a payment is only the beginning…"): use it as the lead, flagged ("Protect: section lead repeats the Accept page").
- **Grow hub:** hero mock tiles → `fields` (Capital: Working capital, Sooner: Instant payouts, Predictable: Recurring billing, Lower cost: Cost-reduction). "Four ways…" section → `cards` with the four solutions. Merchant economics → `flow` with `tags`.
- **Operate hub:** the "Why" bodies of "Technology that fits the business" and "Connected payment workflows" repeat industry-page copy: keep, each flagged. Hero mock → stats (drop "↑ 12.4%").
- **Online payments:** omit the sample testimonial.
- **In-person payments:** related "Payment Terminals" links to the virtual terminal on the live site: use "Payment technology". "Reconciliation" dropped. Section 3 (technology list) → `chips`, keeping its paragraph as the note.
- **B2B payments:** the section-2 heading/lead are fine. Level 2 & 3 → `compare` (3 columns) with the first paragraph as lead; the second paragraph is internal (drop) and the block is flagged ("B2B payments: Level 2/3 availability and any interchange effect"). The live related section is empty: build related from the page's own capabilities (ACH & eCheck, Virtual terminal, Invoicing, Recurring billing, Reporting).
- **ACH & eCheck:** the section-3 lead repeats B2B's ("Business-to-business transactions carry…"): drop it. Related items without links: map "Recurring Billing" and "B2B Payments" to their pages; drop Reconciliation and Integrations.
- **Chargeback protection:** FAQ heading reads "Dashboard & reporting questions.": use "Chargeback protection questions.". "Put rules behind the decision." → `statement`, flagged, TODO dropped.
- **Network tokenization:** the hero headline is Fraud & risk tools' ("Stop more bad transactions without blocking good customers.") and so is the hero mock. H1 = the page's own section-2 heading "Keep the card number out of more places."; that section (traditional vs. network-tokenized) becomes a `compare` titled with its label, "What network tokenization does."; no hero visual. FAQ question 2 repeats answer 1 (draft the question, C2); answer 8 repeats its question (stand-in, C2).
- **3D Secure:** FAQ heading reads "Dashboard & reporting questions.": use "3D Secure questions.". "One signal among several" → `hub` with centre "Stronger payment risk strategy" and no outputs.
- **Fraud & risk tools:** hero CTA "Talk to a Chargeback Expert" belongs to Chargeback protection: use "Talk to a payments risk expert" (the Protect hub's live label). Compare column "Fraud prevention" body is the gateway definition: use the page's own FAQ answer to "What is payment fraud prevention?", flagged. "Protect conversion" → `statement`.
- **Working capital:** "Compare cash flow solutions" has no link: drop. Feature "Business-oriented evaluation" is flagged (live placeholder).
- **Instant payouts:** hero CTA "Explore Working Capital" is wrong (ignored anyway). Related "Merchant Tools" and "Reconciliation" dropped. Both "vs" sections → `compare`.
- **Recurring billing:** hero mock lists Cash Discount/Dual Pricing/Surcharging (copied from cost reduction): drop those chips. Flow note (scheduling) flagged. "Stored payments need more than a schedule." → `hub` (centre "Stronger recurring payment environment", no outputs) with the first sentence of the paragraph as lead; the second sentence is internal.
- **Cost-reduction programs:** `cards` for the three programs (links to `/grow/cash-discount`, `/grow/dual-pricing`, `/grow/surcharging`); `table` with flagged cells; implementation features `split` (h2 "The program is only as good as the way it's implemented."); `estimator` (defaults 50000 and 3.25; CTA label "Build my cost-reduction model" → `cta.expert.href`).
- **Reporting (dashboard-reporting):** the section-3 heading is Invoicing's ("Payment collection, closer to the billing workflow."): its label is Invoicing's too, so use the page's own words for that section (the hero CTA "Explore Payment Visibility" jumps to it): "Payment visibility." (`features`, `ruled`). `questions` for the six quotes; `flow` for portfolio levels with its note; `actions` for "See something in the numbers?" (map "Explore Integrations" to "Payment gateways"). Related "Integrations" dropped.
- **Invoicing:** FAQ answer 3 copies answer 2 (stand-in, C2). Two `callout`s: payment links (→ Online payments) and ACH (→ ACH & eCheck).
- **Payment gateways:** section-2 lead repeats Reporting's ("Payment operations become easier…"): drop. "Gateway + Beyond." → `hub` (inputs ["Gateway"], centre Beyond, outputs). FAQ answer 8 is only a placeholder (stand-in).
- **Payment technology:** `selector` with the six live recommendations (legend "Where do you take payments?"; options Fixed checkout, Tableside / mobile, Customer-facing, High-volume checkout, Self-service, On-the-go; link "Browse hardware catalog" → `/catalog`). Families → `cards` (detail "Best for: …" only where live has it; links → `/catalog`). Device table flagged cells. The chips heading "POS by business model." is the POS page's: use "Where this fits.". Hardware catalog → `callout` without the (copied) paragraph.
- **POS systems:** hero CTA "Explore Gateway Solutions" belongs to gateways (ignored). Section 1 → `hub` (inputs Customer, Order / sale; centre "POS"; outputs Payments, Orders, Customers, Inventory, Employees, Reporting). Related "Integrations" dropped.
- **Virtual terminal:** "Signin" → "Sign in". The capabilities list → `chips` with the note. Related heading names working capital (not shown).

## 6. Industries

Files `content/gaming.ts`, `content/ruo-peptides.ts`, `content/travel.ts`, `content/crb.ts`, each exporting `<name>: IndustryDetailContent`, `<name>Faqs: Faq[]` and `<name>Visual` (`Omit<UnderwritingCardProps, "mode" | "completed" | "className">`), where `<name>` is `gaming`, `ruoPeptides`, `travel`, `crb`. Follow `content/adult.ts` exactly (same structure, headings, keepTogether for hyphenated compounds, capability pillars and links from the menu via `solutionPillar()`), with:

- `meta.title`: "Gaming payments", "RUO peptide payments", "Travel payments", "Cannabis-related business payments".
- `breadcrumb`: Industries / the industry name from `content/industries.ts`.
- `hero.expertCta`: the live label in sentence case ("Talk to a gaming payments expert", "Talk to an RUO payments expert", "Talk to a travel payments expert", "Talk to a CRB payments expert").
- `models.title` "Business models we support."; `whyBeyond`, `capabilities`, `checklist`, `process` titles and leads as on Adult (they match the live pages); `process.id` `<slug>-process`.
- `faq.title`: the live heading in sentence case ("Questions about gaming payments.", "Questions about RUO peptide payments.", …).
- `related`: the other featured industries, as on Adult.
- **Hero visual:** `UnderwritingCard` static (the High-risk card, "In review", 2 of 4 checks): `label: "Example application"`, `title: "Merchant application"`, `industry`: one of the page's business-model chips, `fields`: two or three label/value rows whose values are words from the page (sales channel, billing, positioning), `checks`: the first four items of the page's risk checklist.
- **Capability issues:** Gaming's "APIs / Integrations" has no menu page: pillar Operate, link Payment gateways, title kept, listed in the header comment. CRB's capabilities are a copy of Gaming's: keep the five generic ones, drop "Recurring billing" (its body names gaming), list it as a live-site issue.

## 7. Shared updates

- `lib/links.ts` and `tests/routes.ts`: the 27 routes in `DEMO_ROUTES` (done).
- `content/industries.ts`: `inDemo: true` on the four industries (done).
- `scripts/screenshots.mjs`: default routes include the new pages.
- Docs: D-058 in DECISIONS, README and `docs/CLAUDE.md` page lists, `pnpm confirm-list`, open questions in `scripts/confirm-list.mjs` (live-site issues for the client), `docs/TRACKER.md`.

## 8. Verification

- `pnpm lint`, `pnpm typecheck`, `pnpm build` (all 27 routes static).
- `pnpm test:e2e`: every new route through `tests/routes.ts` (one h1, no `#` links, internal links resolve, noindex, axe).
- Screenshots at 390 and 1440 for every new route; each page reviewed against its outline for copy fidelity and against this spec for design.

---

## 9. As built (D-058)

Where this section and the design above disagree, this section describes the pages as built. Details are in D-058.

- **Types:** a block's visible small print is `footnote` (with `footnoteFlag` on flows). `note` is only ever the client question on a flagged block. `HeroFileContent.amount.label` is optional: a figure with no label on the live page is shown alone. `Capability` and process steps accept `confirm`/`note`.
- **Template:** back-to-back callouts share one band. When the last block is a chips band, the other pillars come before related solutions.
- **The bigger picture:** all four pillars on one line (dots joined by a rule, centred heading), the page's pillar filled and the other three links. The spec's other-three-only row was changed on client feedback, 22 Sept 2026.
- **Components:** a three-item panel is one row, and five ruled items sit three over two. An odd last checklist item spans the panel. Related link chips carry a blue arrow. Hub inputs and outputs sit in a 2-column grid on phones. The expert button may wrap to two lines on phones. CapabilityTabs opens on the pillar with the most tools.
- **Hero visuals:** Payment technology has none (its live card is POS's). Network tokenization has none (its live card is Fraud & risk tools').
- **Protect hub:** the section-2 lead is kept unflagged, as on Operate, and listed as a live-site issue. The spec's "flagged" would have dropped the whole card grid in production.
- **Operate hub:** the "why" h2 is its label, "Why Operate with Beyond.", because the live h2 repeats a row title.
- **International payments:** the "why" lead is dropped because it repeats the "Experienced support" row.
- **Payment gateways:** the "One gateway isn't right for every business." chips become a statement (its paragraph); the seven labels repeat the use-case features and hub outputs.
- **Virtual terminal:** the compare columns follow the heading's order (Virtual terminal first).
- **Working capital:** the live "Compare Cash Flow Solutions" opens the contact page (dropped).
- **Typography:** `lib/typography.ts` (`keepTogether`, `keepArrows`, `NBSP`) replaces the per-file helpers.
