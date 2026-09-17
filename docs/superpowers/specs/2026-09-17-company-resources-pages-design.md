# Company and Resources pages: design spec

**Date:** 17 Sept 2026 · **Status:** approved direction ("ok do best") · **Decision log:** D-054

Adds six menu destinations to the demo, which currently send visitors to `/coming-soon`:

| Menu | Page | Route |
|---|---|---|
| Company | About | `/about-beyond-bancard` |
| Company | Careers | `/careers` |
| Company | Contact | `/contact-us` |
| Resources | Blog index | `/news` |
| Resources | Blog article (one) | `/news/what-is-a-high-risk-merchant-account-and-how-does-it-work` |
| Resources | Client stories | `/our-clients` |
| Resources | FAQ | `/faq` |

The demo grows from 6 to 12 page templates (13 routes). This overrides the PRD §2.2 non-goal "Blog" and is logged as D-054.

---

## 1. Ground rules (apply to every page)

1. **Never invent facts.** Content comes only from (a) the PRD, (b) data already in `content/*.ts`, or (c) the live beyondbancard.com page for that route, quoted in §4. Anything unverified renders through `<Confirm note="…">` (group-level where a whole set shares one question, like testimonials in D-043) and is added to CONFIRM_LIST (the `pnpm confirm-list` script picks up `<Confirm>`/`confirm: true` usages; open questions go in `scripts/confirm-list.mjs`).
2. **Design tokens only.** No hard-coded colours, font sizes or durations. Use `type-*` utilities, `section-y`, `tabular`, `tone-dark`, `link-draw` / `link-draw-parent`, `--duration-*`, `--ease-*`, radius tokens.
3. **Existing system first.** Reuse `PageHero`, `Section` / `SectionHeader`, `FaqSection`, `CtaBand`, `FeatureGrid` (`ruled` / `rows` / `panel`), `Button`, `ChipLink` / `ChipToggle`, `RelatedLinks`, `Reveal` / `Stagger`, `Confirm`, `Field` + form primitives, `Icon`. New components only where §3 names them.
4. **Concept continuity (D-001 "the underwriting file").** Label/value rows with hairlines, tabular figures, status pills. Spend boldness in one element per page (named in each page spec); keep everything else quiet.
5. **Avoid template tells:** no eyebrow labels above headings (D-003), no numbered markers unless a real sequence (D-005), no "A · B · C" middle-dot meta strings, no identical card grids (D-004), no stock photos, no emoji, sentence-case headings, no star ratings.
6. **CTA vocabulary exact:** "Apply now", "Talk to an expert", "Become a partner" from `cta` in `content/site.ts`.
7. **Beyond Bancard** on first mention per page, "Beyond" after (PRD §10.5).
8. **Accessibility (WCAG 2.2 AA):** one H1, logical heading order, visible focus, 44px tap targets, `aria-live="polite"` for filter/search/form status, reduced motion shows final states, external links open in a new tab with arrow icon and "(opens in a new tab)" sr-only text (D-024).
9. **Motion:** transform/opacity only, reveals once, existing `Reveal`/`Stagger`/`RevealObserver`. No new scattered entrance effects; interaction motion (filter reflow, accordion, success check) is welcome.
10. **Content files are the CMS boundary:** all copy in `content/<page>.ts`; page files only compose. Page-specific types live in that content file (do not edit `types/content.ts` in parallel work).

---

## 2. Shared foundation (built before the pages)

- `lib/links.ts` and `tests/routes.ts`: add the seven routes to `DEMO_ROUTES`.
- **Removed on client feedback (D-054):** `components/layout/SectionNav.tsx` + `PageHero` prop `sectionNav?: { label: string; items: NavLink[]; current: string }`. The client read the row as FAQ and Client stories being on one page. Wayfinding stays with the header menus and breadcrumbs; the component and the prop are deleted, and no page renders the row. The original design, for the record:
  - A tab-like row of sibling links pinned to the bottom edge of the hero: *About · Careers · Contact* or *Blog · Client stories · FAQ* (data: `companyMenu` / `resourcesMenu`).
  - `<nav aria-label="Company">` / `"Resources"`; the current page link has `aria-current="page"` and a 2px brand-600 underline; others `text-muted` → `text-ink-900` on hover. 44px targets. Scrolls horizontally on narrow screens without page overflow.
  - Used on About, Careers, Contact, Blog index, Client stories, FAQ. Not on the article.
- `StickyMobileCta`: disabled on `/contact-us` and `/careers` (the bar's "Apply now" competes with those pages' jobs). Enabled on the other new routes.
- Closing band: default merchant `CtaBand` on About, Blog, article, Client stories, FAQ. Careers uses `CtaBand` with careers copy. Contact has none (the page is the call to action).

---

## 3. Page designs

Wireframes are desktop (≥1024px). Mobile stacks in DOM order unless noted.

Each page section ends with an **As built (D-054)** note. Where the note and the design above it disagree, the note describes the page as built. No page has the section tabs shown in the wireframes (§2).

### 3.1 About `/about-beyond-bancard`

**Job:** explain who Beyond is and what it stands for, then route each audience onward.
**Bold element:** the *company file*: the underwriting-file artifact applied to Beyond itself.

```
┌ PageHero (light) ─────────────────────────────────────────────────────────┐
│ Company / About                                                          │
│ We help businesses take payments          ┌ Company file ──────────────┐ │
│ securely and efficiently.  (h1)           │ Beyond Bancard  [Registered│ │
│ Lead…                                     │                   ISO/MSP] │ │
│ [Apply now] [Talk to an expert]           │ Headquarters   Orange, CA  │ │
│                                           │ Experience     20+ years ⚑ │ │
│                                           │ Coverage       Nationwide  │ │
│                                           │ Sponsor banks  Esquire Bank│ │
│                                           │                Merrick Bank│ │
│                                           │                Mission V.. │ │
│                                           └────────────────────────────┘ │
│ About   Careers   Contact   (SectionNav)                                 │
└──────────────────────────────────────────────────────────────────────────┘
 What we believe (h2, id="values")
 ─────────────────────────────────────────────────────────────────────────
 Start with the merchant (h3, large)   │ The merchant is our top priority…
 ─────────────────────────────────────────────────────────────────────────
 Build relationships and deliver…      │ …   (5 ruled rows, not numbered)
 Who we work with (h2) — 3 ruled columns with links
 Headquarters + Join the team — split band
 CtaBand (default)
```

- **H1:** "We help businesses take payments securely and efficiently." (live mission: "Our Goal is to Help Businesses Transact Payments Securely and Efficiently.")
- **Lead:** "Beyond Bancard gives merchants flexible payment processing and a complete package of products, including businesses other processors turn away." (live H1 + PRD positioning)
- **Company file panel** (`<dl>`, white surface, radius-md, 1px line border, label column muted, values ink, `tabular` where numeric). Status pill "Registered ISO/MSP" (success tokens, check icon, text not colour alone).
  - Headquarters: "Orange, California" (PRD §1)
  - Experience: "20+ years in payments" → `<Confirm>` (existing CONFIRM item wording "20+ years in payments").
  - Coverage: "Nationwide" (PRD §9.1 fact row)
  - Sponsor banks: Esquire Bank, Merrick Bank, Mission Valley Bank (PRD §8.5). Open question: the live About page lists **Avidia Bank**, not Esquire Bank; add to open questions, do not change disclosures.
  - Serves: "Complex and high-risk industries, everyday businesses and partners" (PRD §1)
- **Values** (`id="values"`, h2 "What we believe."). Ruled rows: title (Archivo, `type-h3` scaled up at lg) left 5 cols, body right 7 cols. One group-level `<Confirm variant="marker">` note: "Company values wording (lightly edited from the current About page)".
  1. Start with the merchant — "The merchant is our top priority. Every day we are hyper-focused on making their experience pleasant and seamless."
  2. Build relationships and deliver results — "We provide great service to consumers, to customers, to our communities and to each other. We make a real difference by working together."
  3. Act with integrity — "We openly collaborate in pursuit of the truth. We have no tolerance for politics, hidden agendas or passive-aggressive behavior. Beyond is a fully transparent organization."
  4. Team on a mission — "We are committed to helping our customers by working together with equal parts humility and ambition."
  5. Make a difference every day — "We focus on solutions, and we arrive every day inspired to make an impact through our talents, passion and hard work."
- **Who we work with** (h2): three peers, `FeatureGrid`-style ruled columns each with a text link:
  - Complex and high-risk industries — reuse PRD §9.3 line "Deep experience in regulated and emerging categories, where a generic merchant account usually falls short." → View industries (`/industries`)
  - Everyday businesses — "Retail, restaurants, field services, healthcare and more." (PRD §1) → Everyday industries (`/industries#retail`)
  - Partners — PRD partners teaser lead "Training, marketing support and competitive economics for the people who bring merchants to us." → Partner programs (`/partners/isos-agents`)
- **Headquarters and careers** split (paper): left "Headquarters" h2-sized block with address lines + map link (external, `contact.address`); right "Join the team" h2 + one line "See open roles at Beyond." + Button → `/careers`.
- **CtaBand** default.

**As built (D-054):**

- **Lead:** "Beyond Bancard gives merchants flexible payment processing and a comprehensive package of products, and works with businesses other processors turn away."
- **Company file:** rows Headquarters ("Orange, California", the map link), Experience and Coverage, then Sponsor banks with their disclosure locations (Jericho, NY; South Jordan, UT; Sun Valley, CA) on a paper strip. No Serves row, bank count or bank icons. Rows use UnderwritingCard's style: label left, value right. A second sheet sits behind the file.
- **Values:** on surface (white), split from md, titles 30px from lg, marker beside the heading text. The section closes with "We're growing across the country, and we'd like you to join the team." and a secondary "See open roles" → `/careers#open-roles`. Demo mode only: production drops the whole section.
- **Who we work with:** on paper. Icon, h3, body and a ghost arrow link per audience; rows at md, three columns on one subgrid from lg. Links: "View complex industries" → `/industries`, "View everyday businesses" → `/industries#all-industries`, "View ISOs & agents" → `/partners/isos-agents`.
- **Headquarters + Join the team band:** removed. The address was repeated a screen before the footer; the route to careers moved into the values section.
- **Browser title:** "About".

### 3.2 Careers `/careers`

**Job:** show open roles fast and make applying one click.
**Bold element:** the *roles board*: whole-row links set like application rows.

```
┌ PageHero (light) ─────────────────────────────────────────────┐
│ Company / Careers                                             │
│ Join the Beyond team. (h1)                                    │
│ Beyond Bancard is growing across the country…                 │
│ [See open roles]  careers@beyondbancard.com                   │
│ About   Careers   Contact                                     │
└───────────────────────────────────────────────────────────────┘
 Open roles (h2, id="open-roles")          5 roles ⚑
 ┌─────────────────────────────────────────────────────────────┐
 │ Junior Underwriter (h3)                    View on Indeed ↗ │
 │ Assist in assessing risk and ensuring…                      │
 ├─────────────────────────────────────────────────────────────┤
 │ Relationship Manager …                                      │
 └─────────────────────────────────────────────────────────────┘
 What it's like to work here (h2) — 4 statements, 2×2 ruled, icon + text
 Our values — compact list of the 5 value titles → /about-beyond-bancard#values
 CtaBand (careers copy)
```

- **H1:** "Join the Beyond team." · **Lead:** "Beyond Bancard is growing across the country, and we'd like you to join the team." (live intro)
- **Hero actions:** Button "See open roles" → `#open-roles` · ghost mailto "careers@beyondbancard.com".
- **Roles board** in a single white panel split by hairlines. Each row is one link (`<a>` wrapping title + description, external Indeed, new tab). Right side: "View on Indeed" + ArrowUpRight. Hover: title `link-draw`, row background brand-50. Header shows a count ("5 open roles", computed from data) and a group `<Confirm variant="marker">` "Open roles and Indeed links are current".

  | Title | Description (live, made into sentences) | URL |
  |---|---|---|
  | Junior Underwriter | Assist in assessing risk and ensuring seamless financial transactions for clients. | https://www.indeed.com/job/junior-underwriter-084cb9710a57d836 |
  | Relationship Manager | Foster client connections and drive growth with innovative payment solutions. | https://www.indeed.com/job/relationship-manager-ee51b9fbc578b335 |
  | Junior Risk Manager | Safeguard clients' interests and optimize risk management strategies. | https://www.indeed.com/job/junior-risk-manager-3564f488b0c111e3 |
  | Technology Project Manager | Lead technological advancements that enhance payment processing at Beyond. | https://www.indeed.com/job/technology-project-manager-f2601bc78758c953 |
  | Technical Support Specialist | Provide exceptional support to merchants navigating payment technologies. | https://www.indeed.com/job/technical-support-specialist-e832fa74d0b26ab3 |

- **What it's like to work here** (h2). Four live statements verbatim, icon + statement (`type-h4`), no invented titles:
  - trending-up: "We prioritize the personal development and career trajectory of each employee."
  - megaphone: "We offer an environment where your ideas are valued."
  - users: "Through collaboration, team members can unleash their potential."
  - badge-check: "Being part of a successful team fosters a sense of pride and fulfillment."
- **Our values** (h2): the five value titles as a compact ruled list, plus a link "Read what we believe" → `/about-beyond-bancard#values`. Titles import from the About content file (single source).
- **CtaBand:** title "Don't see the right role?" · body "Send your résumé to careers@beyondbancard.com and tell us where you'd fit." · primary "Email the careers team" → `mailto:careers@beyondbancard.com` · secondary "About Beyond" → `/about-beyond-bancard`.
- No StickyMobileCta.

**As built (D-054):**

- **Hero:** "See open roles" has a down arrow, moves focus to the roles heading after the jump, and is hidden when no roles are shown. The ghost mailto link sits beside it.
- **Headings** end with a full stop: "Open roles.", "What it's like to work here.", "Our values."
- **Roles board:** directly under the hero on paper, with a 40px top padding. The count beside the heading reads "5 roles on Indeed". The group marker is on the heading, and its note now says 3 of the 5 Indeed postings are expired and 2 could not be checked (17 Sept 2026).
- **Rows:** no visible "View on Indeed"; it is in each link's accessible name. A 36px arrow disc from md, a corner arrow on phones. No scroll reveal: the board rises with the hero's CSS entrance.
- **Technology Project Manager summary:** "Lead technological advancements that enhance payment processing and customer experiences at Beyond." (live wording).
- **Production:** `roles.confirmed` is false, so the board shows "There are no open roles right now. You can still send your résumé to careers@beyondbancard.com." with no count.
- **Culture statements:** `type-body-lg` ink-900 rather than `type-h4`, in columns 7-12.
- **Our values:** inside the culture section as a ruled `type-h4` list with a ghost "Read what we believe" link. Demo mode only, like About's values.
- **CtaBand:** the "Email the careers team" button has no arrow.

### 3.3 Contact `/contact-us`

**Job:** get each visitor to the right channel, and let anyone leave a message.
**Bold element:** the *need directory*: one white panel split into four quadrants, each a need with its best channels.

```
┌ PageHero (light) ───────────────────────────────────────────────┐
│ Company / Contact                                               │
│ Talk to the right team. (h1)                                    │
│ Tell us what you need… Or call (844) 365-3050.                  │
│ About   Careers   Contact                                       │
└─────────────────────────────────────────────────────────────────┘
 What do you need? (h2)
 ┌──────────────────────────────┬──────────────────────────────┐
 │ Open a merchant account (h3) │ Help with my account         │
 │ [Apply now] Talk to an expert│ boarding@…  Merchant hub ↗   │
 │ sales@beyondbancard.com      │ Message us about this        │
 │ Message us about this        │                              │
 ├──────────────────────────────┼──────────────────────────────┤
 │ Partner with Beyond          │ Work at Beyond               │
 │ [Become a partner] Portal ↗  │ Open roles  careers@…        │
 └──────────────────────────────┴──────────────────────────────┘
 ┌ Send us a message (h2, 7 cols) ─────┐ ┌ Other ways (5 cols, sticky) ┐
 │ First name*  Last name*             │ │ Call   (844) 365-3050        │
 │ Email*       Phone                  │ │ Fax    (661) 885-8801        │
 │ Business name                       │ │ Sales  sales@…               │
 │ Topic* [select]                     │ │ Support boarding@…           │
 │ Message* [textarea]                 │ │ Visit  500 N State College… ↗│
 │ [Send message]  Demo only — no data │ │ Answers  Browse the FAQ      │
 └─────────────────────────────────────┘ └──────────────────────────────┘
```

- **H1:** "Talk to the right team." · **Lead:** "Tell us what you need and we'll point you to the right people." + inline phone link.
- **Need directory** (h2 "What do you need?"): 2×2 panel (1 column on mobile), inner hairlines, not four floating cards.
  - Open a merchant account — body "Start an application or talk through your options first." → Button Apply now (`cta.apply`), Button secondary Talk to an expert (`cta.expert`), mailto sales@beyondbancard.com.
  - Help with my account — body "Existing merchants can reach support or log in to the Merchant hub." → mailto boarding@beyondbancard.com (labelled "Support", live label), external Merchant hub (`portals.merchant`).
  - Partner with Beyond — body "Refer merchants or build a partner business with Beyond." → Button Become a partner (`cta.partner`), external Partner portal (`portals.partner`), link ISOs & agents.
  - Work at Beyond — body "See open roles or send your résumé." → link Open roles (`/careers`), mailto careers@beyondbancard.com.
  - Each quadrant (except careers, which gets it too) has a text button "Message us about this" that sets the form's Topic and moves focus to the form's first field (smooth scroll unless reduced motion).
- **Message form** (client component, react-hook-form + `zod/mini` per D-036, same `Field` primitives and error pattern as `/live-form`):
  - First name* · Last name* · Email* · Phone (optional, tel) · Business name (optional) · Topic* (select: Opening a merchant account / Help with an existing account / Partnering with Beyond / Careers / Something else) · Message* (textarea, 10–1000 chars, live character count announced politely only near the limit).
  - Submit "Send message" → validates; errors inline (danger-600) and focus moves to the first invalid field. Valid → 1200ms "Sending…" (button `aria-disabled`) → success panel in place, focus moved to its heading: animated check, heading "Message sent." + "Thanks, {firstName}. We've received your message." (no reply-time promise: not a confirmed fact) + "Send another message" button that resets the form.
  - Visible notice under the button: "Demo only — no data is sent." **No network request.**
  - `<Confirm variant="marker">` group note on the form heading: "Contact form fields and routing".
  - New primitive `components/ui/textarea.tsx` styled exactly like `input.tsx`.
- **Other ways to reach us** sidebar (`<dl>` rows, sticky ≥lg): Call (phone link), Fax, Sales (mailto), Support (mailto boarding@), Visit (address, external map link), Answers (link Browse the FAQ → `/faq`). Short privacy line: "Your information is handled under our Privacy Policy." → `/privacy-policy`.
- No CtaBand. No StickyMobileCta.

**As built (D-054):**

- **Lead:** "Tell us what you need and we'll connect you with the people at Beyond Bancard who can help." followed by "Call (844) 365-3050." in FaqSection's phone link style.
- **Directory panel:** radius-md, with an icon per need (store, headset, handshake, briefcase). Stacked below md, one row per need at md, 2×2 on a subgrid from lg. Each quadrant reveals on its own.
- **At most one button per need** (Apply now, Become a partner). Every other channel is a label/value row: Advice (Talk to an expert) and Sales; Support and Portal (Log in to Merchant hub); Portal (Log in to partner portal) and Learn more (ISOs & agents program); Roles ("See open roles" → `/careers#open-roles`) and Careers.
- **Quadrant title:** "Get help with my account" (was "Help with my account"). Work at Beyond's body reads "See open roles, or email your résumé to the careers team."
- **"Message us about this":** a quiet text button with a message icon and no down arrow. Its accessible name adds the need's title.
- **Form:** on a white band after the directory. Topic options are the need titles plus "Something else"; the note on the card reads "Topic: {title}". Validation runs on submit, then on change. The screen-reader hint is "Between 10 and 1,000 characters.", and the count is announced 1s after typing stops, within 100 characters of the limit. Email error "Enter an email, like name@company.com."; phone error "Enter a full phone number with area code, or leave this blank."
- **Success:** h2 "Message sent." (`type-h2`), described by the thanks line.
- **Form flag:** the marker sits after the heading text, and the form ships in production.
- **Privacy line:** in the form footer under the demo notice, not in the sidebar.
- **Sidebar:** Phone, Fax, Address (map link) and Answers only; sales@ and boarding@ appear once, in their quadrants. Sticky from lg at 96px.
- **Browser title:** "Contact".

### 3.4 Blog index `/news`

**Job:** help merchants find a useful article quickly.
**Bold element:** the *lead article*: the newest post set as a large dark typographic panel (no image), followed by an editorial list.

```
┌ PageHero (light) ───────────────────────────────────────────────┐
│ Resources / Blog                                                │
│ Practical guides to payment processing. (h1)                    │
│ Plain-language articles on chargebacks, POS systems…            │
│ Blog   Client stories   FAQ                                     │
└─────────────────────────────────────────────────────────────────┘
 ┌ Lead article (ink-900, radius-lg) ──────────────────────────────┐
 │ Latest  June 5, 2026   Merchant service payment                 │
 │ When to question your processor or seek a review (h2, large)    │
 │ Payment processing plays a major role…                          │
 │ Read article →                                                  │
 └─────────────────────────────────────────────────────────────────┘
 All articles (h2)                         [All 11] [POS systems 4] …
 ─────────────────────────────────────────────────────────────────
 Jun 3, 2026 │ How to get a credit card terminal… (h3)│ POS systems
             │ excerpt…                               │
 ─────────────────────────────────────────────────────────────────
 …                                                  Page 1 of 8  Older articles
 CtaBand (default)
```

- **H1:** "Practical guides to payment processing." · **Lead:** "Plain-language articles on chargebacks, POS systems, high-risk accounts and more, from the Beyond Bancard team." (live listing heading "Stories by our team"; author on posts is "Beyond Bancard")
- **Posts** (`content/blog.ts`, newest first; titles in sentence case with acronyms kept; excerpts are the live truncated excerpts rendered with a trailing "…"):

  | Slug | Title | Date | Categories | Excerpt (live) |
  |---|---|---|---|---|
  | when-to-question-your-processor-or-seek-a-review | When to question your processor or seek a review | 2026-06-05 | Merchant service payment | Payment processing plays a major role in daily business operations, yet many companies continue using the same provider for years without reviewing |
  | how-to-get-a-credit-card-terminal-for-my-business | How to get a credit card terminal for my business | 2026-06-03 | POS systems | Businesses today need reliable ways to accept payments quickly and securely, whether operating in retail, hospitality, service industries, or mobile |
  | are-your-pos-systems-ready-for-mobile-wallets | Are your POS systems ready for mobile wallets? | 2026-06-01 | Contactless payments, POS systems | Customer payment preferences continue changing as digital wallets become more common in retail stores, restaurants, service businesses |
  | ways-to-prevent-chargebacks-and-protect-your-business | Ways to prevent chargebacks and protect your business | 2026-04-13 | — | If you're a business owner, you know what a headache a chargeback can be, especially if you are a high-risk company like |
  | merchant-account-setup-what-documents-are-needed | Merchant account setup: what documents are needed? | 2026-04-11 | — | If you've been denied an account by a merchant processing service provider, you may be wondering why and what to do about |
  | how-to-build-a-peptide-website-in-2026 | How to build a peptide website in 2026 | 2026-04-08 | Peptide payment | If you are a peptide business owner in 2026, you know how challenging it can be as regulatory commissions tighten their grip |
  | tap-to-pay-vs-chip-vs-swipe-which-in-store-method-is-best-and-safest | Tap-to-pay vs chip vs swipe: which in-store method is best (and safest)? | 2026-04-05 | Contactless payments | In-store payment methods continue to evolve as businesses balance speed, security, and customer expectations at checkout. A credit card processing |
  | how-to-compare-pos-providers-fairly | How to compare POS providers fairly | 2026-04-03 | POS systems | Comparing providers requires more than reviewing surface-level pricing or feature lists. A POS system provider can offer similar tools |
  | how-businesses-can-reduce-chargebacks-fraud | How businesses can reduce chargebacks + fraud | 2026-04-01 | — | Chargebacks and fraud continue to impact businesses across industries, increasing operational costs and creating disruptions in payment |
  | what-is-a-high-risk-merchant-account-and-how-does-it-work | What is a high-risk merchant account and how does it work? | 2026-03-05 | — | A high-risk merchant account is a specialized payment processing account designed for businesses that card networks or banks consider |
  | pos-systems-vs-payment-terminals-vs-mobile-payments-explained | POS systems vs payment terminals vs mobile payments explained | 2026-03-03 | POS systems | Businesses today have multiple options for accepting payments, but not all systems function the same way. A POS system provider |
  | 6-steps-to-secure-credit-card-payment-processing | 6 steps to secure credit card payment processing | 2026-03-01 | E-commerce | Secure credit card payment processing is critical for protecting customer data, maintaining regulatory compliance, and preserving business |

  Post href is `/news/<slug>` resolved through `href()`: only the article route is live; the rest go to `/coming-soon`.
- **Lead article:** the newest post, dark `ink-900` panel with the `page-hero-dark`/brand glow feel, date as `<time>` (tabular), category, title at `type-h2`, excerpt, "Read article" link (whole panel is one link target via the title link + `after:absolute inset-0`, keeping text selectable).
- **Filter:** `ChipToggle`s with counts: "All" + only categories that have posts in the list (POS systems, Contactless payments, Merchant service payment, Peptide payment, E-commerce). Filters the list (the lead article stays; the list excludes it). `aria-live="polite"` status "Showing 4 articles in POS systems". Reflow uses CSS/opacity only (no `domMax`). Filter state is not in the URL.
- **List rows:** `<article>` per post in a ruled list: date column (`<time dateTime>`, `tabular`, muted, "Jun 3, 2026"), title h3 link + excerpt (max 2 lines, `line-clamp-2`), categories as small non-interactive `Chip`s on the right (stack under the title on mobile). Row hover: title `link-draw`.
- **Pagination:** "Page 1 of 8" + ghost link "Older articles" → `/news/page/2` (coming-soon). Categories with no posts on page 1 (Credit card fees, Interchange rates) are not shown; log in D-054.
- **CtaBand** default. StickyMobileCta on.

**As built (D-054):**

- **Categories** are the live ones (the listing's filter data and each post's markup, 17 Sept 2026) and replace the table's column (slugs shortened):
  - Merchant service payment: when-to-question, ways-to-prevent-chargebacks, how-to-build-a-peptide-website, how-businesses-can-reduce-chargebacks-fraud, what-is-a-high-risk-merchant-account.
  - Peptide payment: ways-to-prevent-chargebacks, merchant-account-setup, how-to-build-a-peptide-website.
  - POS systems: are-your-pos-systems-ready-for-mobile-wallets, how-to-compare-pos-providers-fairly, pos-systems-vs-payment-terminals.
  - Credit card fees: how-to-get-a-credit-card-terminal, tap-to-pay-vs-chip-vs-swipe.
  - Contactless payments: 6-steps-to-secure-credit-card-payment-processing. No post on page 1 is E-commerce.
- **Excerpts** are the full live listing excerpts in `content/blog.ts`, longer than the table's. "…" is added only where the cut falls mid-sentence.
- **Lead article:** no date or category row above the title. From lg the title (`type-h1`) and "Read article" sit left; the excerpt and label/value rows (Published with a "Latest" badge; Category) sit right. The stretched title link makes the panel's text unselectable.
- **List heading:** "Recent articles.", with the chips on their own row under it at every width (one swipeable row below md).
- **Chips:** All 11, Merchant service payment 4, POS systems 3, Peptide payment 3, Credit card fees 2, Contactless payments 1. Categories with no posts on page 1: E-commerce, Interchange rates.
- **Status:** "Showing 3 of 11 recent articles in Peptide payment" (visible while filtered, screen-reader only otherwise). While filtered, "Page 1 of 8" and "Older articles" give way to the status and "Show all recent articles".
- **Rows:** below lg title, date, excerpt, categories. From lg the date takes the left column (2), title and excerpt the middle (7), categories the right (3).

### 3.5 Article `/news/what-is-a-high-risk-merchant-account-and-how-does-it-work`

**Job:** a comfortable read that leads to the High-risk processing page.
**Bold element:** the *reading layout*: a measured prose column with a sticky "On this page" rail and scroll-spy (Google developer-docs pattern).

```
┌ Article header (paper) ─────────────────────────────────────────┐
│ Resources / Blog / What is a high-risk merchant account…        │
│ What is a high-risk merchant account and how does it work? (h1) │
│ Published Mar 5, 2026   By Beyond Bancard   6 min read          │
└─────────────────────────────────────────────────────────────────┘
 ┌ prose (8 cols, ≤68ch) ─────────────────┐ ┌ On this page (3 cols)┐
 │ Intro paragraphs…                      │ │ ▍Section one          │
 │ Section one (h2)                       │ │  Section two          │
 │ …lists, paragraphs…                    │ │  …                    │
 │ Related: High-risk processing (callout)│ │                       │
 └────────────────────────────────────────┘ └───────────────────────┘
 FaqSection (article's own FAQ, if present)
 Related solutions (RelatedLinks chips)
 More from the blog (3 rows, same row component as index)
 CtaBand (default)
```

- **Content:** copy the live article at `https://beyondbancard.com/news/what-is-a-high-risk-merchant-account-and-how-does-it-work` **verbatim** into structured blocks in `content/blog.ts` (`{ type: "p" | "h2" | "h3" | "ul" | "ol"; … }`, paragraphs as text segments with optional internal/external links). Headings converted to sentence case (acronyms kept). Do not rewrite sentences. If the article contains superlatives or unverifiable claims (e.g. "best"), keep the words and wrap that block with `<Confirm>` note "Existing blog copy: claim to verify" (PRD §10.2). Drop the featured image (no stock photos). If the article has an FAQ block, render it through `FaqSection` with its Q&As verbatim.
- **Header:** breadcrumb Resources / Blog (→ `/news`) / title (short form). H1 = title. Meta as a small `<dl>` row (Published `<time>`, By "Beyond Bancard", Reading time computed at build from word count, 225 wpm, rounded up). No middle dots.
- **Table of contents:** built from the h2 blocks. ≥lg: sticky right rail, current section indicated by a 2px brand-600 bar and `aria-current="true"`, updated by one IntersectionObserver. <lg: a `<details>` "On this page" above the prose. Links jump with scroll-margin matching the sticky header.
- **Prose styles:** `type-body` at 17–18px, line-height 1.7, max 68ch, h2 `type-h3` with generous top margin, lists with brand-600 markers, links brand-700 with `link-draw`.
- **In-body callout** after the first h2 section: a quiet bordered panel "Looking for a high-risk merchant account?" → link High-risk processing (`/accept/high-risk-processing`) + Button Apply now. (UI copy, not article copy.)
- **Related solutions:** `RelatedLinks` chips: High-risk processing · Chargeback protection · Fraud & risk tools · Online payments.
- **More from the blog:** the three next-newest posts using the index row component.
- **CtaBand** default. StickyMobileCta on.

**As built (D-054):**

- **Header:** breadcrumb short title "High-risk merchant accounts". Meta order Published, reading time, By. Reading time is 5 min (computed), not 6. The H1 is `type-h2` below md. The meta description is the live post's.
- **Prose:** max 32em (about 68 characters; 68ch let lines run to 90). Links are brand-700 with a brand-500 underline at rest.
- **Columns:** prose 1-8, "On this page" rail 9-12. The rail comes before the prose in the DOM.
- **Flags:** only the closing "Best merchant processing service provider" heading and paragraph. Outside demo mode they also leave the contents list and the reading time. The FAQ is not flagged.
- **FAQ:** titled "High-risk account questions." and placed after the article body (the live post has it before the summary).
- **Links to the article itself** (5 inline links in the live copy) render as plain text; where they should lead is an open question.
- **More from the blog.:** the header action is a secondary "All articles" button → `/news`.
- **Category:** Merchant service payment.

### 3.6 Client stories `/our-clients`

**Job:** let prospects hear from real merchants and connect each story to what Beyond does.
**Bold element:** *oversized quotes*: each story's quote set in Archivo as the visual, with a small client file beside it.

```
┌ PageHero (light) ───────────────────────────────────────────────┐
│ Resources / Client stories                                      │
│ What merchants say about Beyond. (h1)                           │
│ Four businesses, in their own words…                            │
│ Blog   Client stories   FAQ                                     │
└─────────────────────────────────────────────────────────────────┘
 ┌ Story 1 (ink-900, featured) ────────────────────────────────────┐
 │ " Jimmy and his team at Beyond Bancard have     ┌ Client file ─┐│
 │   saved me thousands of dollars in fees…  (xl)  │ Andrew C.    ││
 │                                                 │ CEO, Univ…   ││
 │                                                 │ Industry  ⚑  ││
 │                                                 │ Travel →     ││
 │                                                 │ Mentioned    ││
 │                                                 │ Cash discount││
 │                                                 └──────────────┘│
 └─────────────────────────────────────────────────────────────────┘
 Story 2 (paper)  quote 8 cols │ file 4 cols      (hairline between)
 Story 3 (paper) …   Story 4 (paper) …
 Industries in these stories (RelatedLinks chips)
 CtaBand (default)
```

- **H1:** "What merchants say about Beyond." · **Lead:** "Four businesses, in their own words, on working with Beyond Bancard."
- **Stories** use `testimonials` from `content/testimonials.ts` unchanged (quote wording never edited, PRD §9.8), extended in `content/client-stories.ts` with context keyed by name:
  - Andrew C. — Industry: Travel → `/industries/travel-payment-solutions`; Mentioned: "Cash discount program" → Cost-reduction programs `/grow/cost-reduction-programs`
  - James W. — Industry: Medical & healthcare → `/industries/medical-healthcare`
  - Carlos H. — Industry: Restaurants & hospitality → `/industries/restaurant-hospitality`; Mentioned: "Support team"
  - Kumar S. — Industry: Jewelry → `/industries/jewelry`
  - Industry labels are inferred from business names and "Mentioned" from quote wording: one group `<Confirm variant="marker">` "Industry labels and program links for client stories", plus the existing testimonials permission note (D-043).
- **Layout:** each story is a `<figure>` with `<blockquote>` + `<figcaption>`. Story 1 on `ink-900` (quote `text-on-dark`), stories 2–4 on paper separated by hairlines, all the same structure (no zigzag). Quote type: Archivo semibold, fluid from `type-h3` (mobile) to between `type-h2` and `type-h3` (desktop), `max-w-[30ch]`-ish measure, an oversized brand-600 opening quote mark `aria-hidden`. Client file: `<dl>` label/value rows (Client, Role, Industry link, Mentioned link where present). No photos, logos or ratings.
- **Industries in these stories:** `RelatedLinks` chips for the four industries.
- **CtaBand** default. StickyMobileCta on.

**As built (D-054):**

- **Lead:** the count comes from the number of stories. The permission marker follows the lead once, for the whole set.
- **Client file:** the company as h3 over a "name, role" line, then Industry (all four stories, marker beside each label) and Related (Andrew C. only: Cost-reduction programs). No Client, Role or Mentioned rows, and no "Support team" row.
- **No "Industries in these stories" band:** story 4 is followed by the CtaBand.
- **Quotes:** featured 24px to 44px, others 21px to 34px. The mark hangs in its own column from 1280px and sits above the quote below that. Quote and file split 7/5 at lg and 8/4 at xl; measure 27ch for the featured quote, 30ch for the others; balanced wrapping.
- **Structure:** one region with a visually hidden h2 "Client stories"; each figure is named by its company h3.
- **File links:** no arrow; brand-300 on ink, brand-700 on paper.
- **Production:** the page redirects to `/coming-soon?from=/our-clients` until display permission is confirmed.

### 3.7 FAQ `/faq`

**Job:** answer a question in seconds.
**Bold element:** *search-first help centre*: a large search field in the hero filtering every answer live.

```
┌ PageHero (light) ───────────────────────────────────────────────┐
│ Resources / FAQ                                                 │
│ Questions merchants and partners ask. (h1)                      │
│ Find answers about accounts, high-risk processing…              │
│ [🔍 Search questions________________________]  23 questions      │
│ Blog   Client stories   FAQ                                     │
└─────────────────────────────────────────────────────────────────┘
 ┌ Topics (3 cols, sticky) ┐ ┌ Accounts and eligibility (h2) ──────┐
 │ Accounts and elig…   3  │ │ ▸ Can you work with businesses…      │
 │ High-risk processing 4  │ │ ▸ What industries does Beyond…       │
 │ Nutra and supplements 7 │ ├ High-risk processing (h2) ───────────┤
 │ Equipment and sec…   3  │ │ …                                    │
 │ Partners             6  │ │                                      │
 │ Still stuck? Call …     │ │                                      │
 └─────────────────────────┘ └──────────────────────────────────────┘
 CtaBand (default)
```

- **H1:** "Questions merchants and partners ask." · **Lead:** "Answers about accounts, high-risk processing, equipment, security and partnering with Beyond Bancard."
- **Topics** (defined in `content/faqs.ts` as `faqTopics`, referencing the existing FAQ objects, no wording changes, the duplicate "declined elsewhere" question kept once, from `homeFaqs`):
  - Accounts and eligibility (`id="accounts"`): homeFaqs "Can you work with businesses declined elsewhere?", highRiskFaqs "What industries does Beyond support?", highRiskFaqs "How long does underwriting take?"
  - High-risk processing (`id="high-risk"`): highRiskFaqs "What makes a business high risk?", "Why are high-risk accounts underwritten differently?", "Are reserves always required?", "Can high-risk merchants accept payments online?"
  - Nutra and supplements (`id="nutra"`): all 7 `nutraFaqs`
  - Equipment, technology and security (`id="security"`): homeFaqs "Can I monitor my transactions?", "Do you offer equipment?", "How are my transactions kept secure?"
  - Partners (`id="partners"`): homeFaqs "Do you have a partner program?" + all 5 `partnerFaqs`
  - Unconfirmed answers keep their `<Confirm>` flags and are omitted in production mode, as in `FaqSection`.
- **Search** (client): `<input type="search">` with a visible label ("Search questions", visually hidden label is not enough on its own: use a visible label or `aria-label` plus placeholder), matches question + answer text, case- and accent-insensitive, highlights matches with `<mark>` (brand-100 bg, ink text), hides empty topics, opens matching items. `aria-live="polite"` count ("6 questions match "chargeback"" / "23 questions"). Empty state: "No questions match "{term}". Try another word, or call (844) 365-3050." + Clear search button. `/` keyboard shortcut is not added (avoid conflicts).
- **Topic nav:** ≥lg sticky left rail with anchor links + counts (counts follow the search); <lg a horizontal chip row of anchors under the search. A small "Still have a question?" block: phone + Contact link (`/contact-us`).
- **Accordions:** one `Accordion type="multiple"` per topic (h2 per topic, triggers `type-h4`), reusing `components/ui/accordion.tsx` styling.
- **CtaBand** default. StickyMobileCta on.

**As built (D-054):**

- **Lead:** "Search every answer about working with Beyond Bancard, or browse by topic."
- **Topics:** the security topic is "Technology and security" (id `security`). Accounts uses highRiskFaqs "Can Beyond work with businesses declined elsewhere?".
- **Search:** also matches topic titles, highlighted in the topic heading. The count sits beside the label ("23 questions", "N matches"). Placeholder "Try “chargebacks” or “online”". Answers open automatically from 3 letters. Enter focuses the first result and Escape clears. The live region waits 700ms.
- **Empty state:** "No questions match “{term}”.", "Try another word, or clear the search to see every question." and Clear search, with no phone number. No results summary row while searching.
- **Topic nav:** the lg rail spans 4 columns (3 from xl) and marks the topic being read (2px bar, `aria-current`). Topics with no matches turn into muted text. Below lg the chips show only while browsing.
- **"Still have a question?":** a paragraph in the lg rail, an h2 after the answers below lg. "Send us a message" → `/contact-us#contact-form`.
- **Answers:** start right after the hero with a short top padding. Topic h2s are `type-h3`; answers are capped at 34rem.
- **Production:** a topic whose answers are all unconfirmed drops whole (Accounts today), leaving 10 of 23 questions. In demo mode that heading carries the marker "Whole FAQ topic hidden in production until its answers are confirmed".

---

## 4. Live-site source notes (captured 17 Sept 2026)

- `/about-beyond-bancard`: H1 "We Provide Merchants with Innovative, Flexible Payment Processing Solutions and a Comprehensive Package of Products."; mission "Our Goal is to Help Businesses Transact Payments Securely and Efficiently."; five values (wording in §3.1, originals kept in DECISIONS); "20+ years of industry experience"; lists Avidia Bank, Merrick Bank, Mission Valley Bank.
- `/careers`: H1 "Join the Beyond Team"; intro "Curious about being a Part of the Beyond Bancard Team? Beyond Bancard is rapidly growing across the country and is inviting you to join our team!"; four culture statements; five roles with Indeed links; careers@beyondbancard.com.
- `/contact-us`: phone, fax, "Sales" sales@, "Support" boarding@, address; no form; its FAQ answers are attached to the wrong questions (report to client, do not copy).
- `/news`: heading "Stories by our team"; 12 posts on page 1 of 8; categories All Articles, Contactless Payments, Credit Card Fees, E-commerce, Interchange Rates, Merchant Service Payment, Peptide Payment, POS Systems.
- `/our-clients`: the four PRD §9.8 testimonials, same wording.
- `/faq`: 404 on the live site.

## 5. Verification

- `pnpm lint`, `pnpm typecheck`, `pnpm build` (all routes static).
- Existing specs pick up the new routes via `tests/routes.ts` (one H1, links resolve, axe, footer links).
- New `tests/company-resources.spec.ts`: SectionNav current page; contact directory "Message us about this" sets topic + focus; contact form validation, success, reset, and zero network requests; FAQ search filtering, highlighting, empty state and live count; blog filter counts and live status; article TOC links and current-section update; careers roles open in a new tab; sticky mobile CTA absent on contact and careers; reduced motion final states.
- Screenshots at 390px and 1440px for each new route in `docs/screenshots/`.

---

## 6. Addendum (17 Sept 2026): first page of every menu (D-057)

Client request: every top menu must have at least its first page working. Solutions (High-risk processing), Resources (Blog) and Company (About) already do. Added:

| Menu | Page | Route | Template |
|---|---|---|---|
| Industries | Adult (first featured industry) | `/industries/adult` | Industry detail (the Nutra template, extracted for reuse) |
| Partners | Partner programs (first item) | `/partners` | Partner hub |

### 6.1 Adult `/industries/adult`

- **Template first.** Extract the composition of `app/industries/nutra-supplements/page.tsx` into a reusable, data-driven `components/sections/IndustryDetail.tsx` (PRD §9.4: this template is reused for 38 industry pages). The Nutra page becomes a thin wrapper and must render **identically** before and after (verify with before/after screenshots). Shared content type goes in `types/content.ts`.
- **Content:** the live page https://beyondbancard.com/industries/adult has exactly the Nutra section structure. Copy it **verbatim** (curl the HTML; do not rely on a summarising fetch), converting headings to sentence case and ALL-CAPS to sentence case:
  - Hero: H1 "Payments built for the realities of adult commerce." (live subheading; also the PRD §9.3 teaser). Lead = live intro paragraph. CTAs "Talk to an expert" (cta.expert) · Apply now. Breadcrumb Industries / Adult. Visual: reuse `SubscriptionDashboard` (subscriptions are central to this category; it has no figures) unless it reads as nutra-specific, then no visual.
  - Why this industry is different → realities (4 items, live wording) · Business models we support (7 chips + "Exact eligibility remains subject to underwriting.") · Why Beyond (4 features, live bodies) · Payment capabilities (live items, but **correct pillars** per the site IA: Recurring billing is Grow, not Accept; hrefs from `solutionsMenu`) · Risk & processing health checklist (6 items, title "Built for the life of the account.") · process (Understand, Structure, Launch, Support & optimize with live bodies) · FAQ "Questions about adult payments." (live Q&As; answers the live page marks "[Placeholder — confirm …]" render through `confirm: true` with that note, placeholder text itself never shown) · Related: other featured complex industries · CtaBand default (CTA vocabulary stays "Apply now" / "Talk to an expert", not the live "Get Started" / "Talk to Sales").
  - Set `inDemo: true` on adult in `content/industries.ts`.
- **Tone:** adult is a regulated, legitimate merchant category here; keep copy strictly professional and neutral, no imagery.

### 6.2 Partner programs `/partners`

- **Job:** route each kind of partner to the right program and show why partnering with Beyond is worth it.
- **Hero** (dark, like ISOs & agents): breadcrumb Partners (current). H1 "Partner with Beyond Bancard." Lead = homepage partners teaser lead (PRD §9.1.6) "Training, marketing support and competitive economics for the people who bring merchants to us." CTAs Become a partner (cta.partner) · Log in to partner portal (ghost-dark, external, `isosAgents.hero.portalCta`).
- **Programs** (bold element): the three programs from `partnersMenu` (ISOs & agents → demo page; ISVs & platforms; Associations → coming soon) as large `SpotlightCard`s with their PRD descriptors. Section title "Choose your program."
- **Benefits:** reuse the matching items from `isosAgents.benefits` by reference (Uncapped income, In-house support, Flexibility, Broader approvals), keeping their `confirm` flags; the live page's "best rates" / "lowest processing rates" superlatives are NOT used (PRD §10.2).
- **Already a partner?** a compact band: portal login (external) + partner team contact (`/contact-us`).
- **FAQ:** `partnerFaqs`, title "Partner program questions."
- **CtaBand:** as ISOs & agents (title "Ready to grow with Beyond?", primary Become a partner, secondary "Talk to our partner team" → `/contact-us`).
