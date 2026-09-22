# Page tracker: top 6 industries and Solutions

Started 21 Sept 2026. Copy comes from the live beyondbancard.com page for each route (captured 21 Sept 2026). Unverified or placeholder live copy is flagged with `<Confirm>`, never shown as fact.

**29 new pages:** 4 industries, 4 Solutions hubs, 19 solution pages, 2 Partners pages. Already built before this work: Adult, Nutra & supplements, High-risk processing.

Status: `Todo` · `In progress` · `Built` (page renders) · `Done` (reviewed at 390 and 1440; lint, types, build and tests pass)

**Result: 29 of 29 new pages done** (27 industries and Solutions, plus the last two Partners pages). With the 3 built earlier, 32 of 32 pages in scope.

Design spec: `docs/superpowers/specs/2026-09-21-industries-solutions-pages-design.md`

## Industries (top 6)

| # | Page | Route | Template | Status | Notes |
|---|---|---|---|---|---|
| — | Adult | `/industries/adult` | Industry detail | Done | Built earlier (D-057) |
| — | Nutra & supplements | `/industries/nutra-supplements` | Industry detail | Done | Built earlier (PRD) |
| 1 | Gaming | `/industries/gaming` | Industry detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 2 | RUO peptides | `/industries/ruo-peptides` | Industry detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 3 | Travel | `/industries/travel-payment-solutions` | Industry detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 4 | Cannabis-related businesses | `/industries/crb` | Industry detail | Done | Live copy, reviewed at 390 and 1440, tests pass |

## Solutions: hubs

| # | Page | Route | Template | Status | Notes |
|---|---|---|---|---|---|
| 5 | Accept | `/accept` | Solutions hub | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 6 | Protect | `/protect` | Solutions hub | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 7 | Grow | `/grow` | Solutions hub | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 8 | Operate | `/operate` | Solutions hub | Done | Live copy, reviewed at 390 and 1440, tests pass |

## Solutions: Accept

| # | Page | Route | Template | Status | Notes |
|---|---|---|---|---|---|
| — | High-risk processing | `/accept/high-risk-processing` | Solution detail (PRD) | Done | Built earlier (PRD) |
| 9 | Online payments | `/accept/online-payments` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 10 | In-person payments | `/accept/in-person-payments` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 11 | B2B payments | `/accept/b2b-payments` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 12 | International payments | `/accept/international-payments` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 13 | ACH & eCheck | `/accept/ach-echeck` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |

## Solutions: Protect

| # | Page | Route | Template | Status | Notes |
|---|---|---|---|---|---|
| 14 | Chargeback protection | `/protect/chargeback-protection` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 15 | Network tokenization | `/protect/network-tokenization` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 16 | 3D Secure | `/protect/3d-secure` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 17 | Fraud & risk tools | `/protect/fraud-risk-tools` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |

## Solutions: Grow

| # | Page | Route | Template | Status | Notes |
|---|---|---|---|---|---|
| 18 | Working capital | `/grow/working-capital` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 19 | Instant payouts | `/grow/instant-payouts` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 20 | Recurring billing | `/grow/recurring-billing` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 21 | Cost-reduction programs | `/grow/cost-reduction-programs` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |

## Solutions: Operate

| # | Page | Route | Template | Status | Notes |
|---|---|---|---|---|---|
| 22 | Reporting | `/operate/dashboard-reporting` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 23 | Invoicing | `/operate/invoicing` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 24 | Payment gateways | `/operate/payment-gateways` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 25 | Payment technology | `/operate/payment-technology` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 26 | POS systems | `/operate/pos` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |
| 27 | Virtual terminal | `/operate/virtual-terminal` | Solution detail | Done | Live copy, reviewed at 390 and 1440, tests pass |

## Partners (added 22 Sept 2026, D-061)

| # | Page | Route | Template | Status | Notes |
|---|---|---|---|---|---|
| — | Partner programs (hub) | `/partners` | Partner hub | Done | Built earlier (D-057) |
| — | ISOs & agents | `/partners/isos-agents` | Partner detail (PRD) | Done | Built earlier (PRD) |
| 28 | ISVs & platforms | `/partners/isvs-platforms` | Solution template | Done | Live copy; hero panel kept |
| 29 | Associations | `/partners/associations` | Solution template | Done | Live copy; hero panel dropped (invented results) |
## Shared work

| Item | Status | Notes |
|---|---|---|
| Live pages downloaded (30) | Done | Headless browser past the site's robot check |
| Live copy outlined (30) | Done | Verbatim text in page order, incl. hidden FAQ answers |
| Page routes created (27) | Done | Thin wrappers around the two templates |
| Solution detail + hub template | Done | `SolutionPage` + 15 block components, `HeroFile` |
| Routes added to `DEMO_ROUTES` and tests | Done | `lib/links.ts`, `tests/routes.ts`, screenshot script |
| Decisions log (D-058) and CONFIRM_LIST | Done | D-058; 142 flagged items + 7 new open questions |
| Lint, types, build, e2e, screenshots | Done | Build all static; 614 Playwright + axe tests pass; screenshots in `docs/screenshots/` |
| Visual review | Done | Per-page review at 390 and 1440 + consistency pass; fixes applied |
| Live-site issues for the client | Done | `docs/LIVE_SITE_ISSUES.md` |

## Live-site issues found (for the client)

The full list is in `docs/LIVE_SITE_ISSUES.md`: placeholders and internal notes shown to visitors, headings copied between pages, dead links, a sample testimonial and generic browser titles.
