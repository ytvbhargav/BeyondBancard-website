// Generates docs/CONFIRM_LIST.md from every CONFIRM flag in the codebase:
// - `<Confirm note="...">` usages in components and pages
// - content objects with `confirm: true` and a `note`
// Run: pnpm confirm-list
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOTS = ["app", "components", "content"];
const entries = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|mts)$/.test(name)) scan(p);
  }
}

function scan(file) {
  const src = readFileSync(file, "utf8");
  const rel = file.replaceAll("\\", "/");
  if (rel.includes("components/ui/confirm.tsx") || rel.includes("app/dev/")) return;
  const lines = src.split("\n");

  lines.forEach((line, i) => {
    // <Confirm note="...">  (static string notes only; dynamic notes come from content)
    const jsx = line.match(/<Confirm[^>]*\snote="([^"]+)"/);
    if (jsx) entries.push({ note: jsx[1], file: rel, line: i + 1 });

    // confirm: true ... note: "..." on the same or following lines
    if (/confirm:\s*true/.test(line)) {
      const windowText = lines.slice(i, i + 4).join(" ");
      const m = windowText.match(/note:\s*(["'`])((?:\\.|(?!\1).)*)\1/);
      if (m) entries.push({ note: m[2].replace(/\\"/g, '"'), file: rel, line: i + 1 });
    }
  });

  // Named note fields used by dedicated Confirm wrappers (announcement, apply lead, testimonials)
  const named = [...src.matchAll(/^\s*(?:export const )?(\w*[nN]ote)\s*[:=]\s*"([^"]+)"/gm)];
  for (const m of named) {
    if (m[1] === "note" && /confirm:\s*true/.test(src.slice(Math.max(0, m.index - 200), m.index))) continue;
    // Solution blocks' visible small print is copy, not a client question (D-058)
    if (m[1] === "footnote") continue;
    const line = src.slice(0, m.index).split("\n").length;
    if (!entries.some((e) => e.file === rel && e.line === line)) entries.push({ note: m[2], file: rel, line });
  }
}

ROOTS.forEach(walk);

// Group identical notes so the client answers each question once.
const byNote = new Map();
for (const e of entries) {
  const list = byNote.get(e.note) ?? [];
  list.push(`${e.file}:${e.line}`);
  byNote.set(e.note, list);
}

const open = [
  "Official logo files and brand blue hex (\"Primary_Logo_Blue_Punchout\"). The demo now uses the logo from the live site (D-059); a reversed (white) file is still needed, because dark headers and the footer knock the black lockup out to white, which drops the blue from the mark",
  "Brand fonts, if any (currently Archivo + IBM Plex Sans)",
  "Licensed logo usage for gateways and sponsor banks (shown as text today)",
  "Apply form required fields (must match the onboarding system)",
  "Drafted supporting copy listed in docs/DECISIONS.md (D-040, D-054)",
  "Sponsor banks: the live About page lists Avidia Bank, but the disclosures (PRD §8.5) name Esquire Bank. Which is current? (D-054)",
  "Is boarding@beyondbancard.com the right address for existing-merchant support? The live Contact page labels it \"Support\" (D-054)",
  "Live Contact page FAQ: answers are attached to the wrong questions; fix on the current site (D-054)",
  "Blog URLs: live posts sit at the site root and /news/<slug> redirects there. Which structure should the full build keep? (D-054)",
  "Blog article inline links point back to the article itself. Where should they lead? (D-054)",
  "Client stories quote specific savings ($5,000 a month; hundreds of dollars a month). Does legal need a 'results vary' note on /our-clients and the homepage? (D-054)",
  "Adult: the menu teaser (PRD §9.3) says \"Payments infrastructure built for the realities of adult commerce.\" and the page H1 (live site) \"Payments built for…\". Keep both or align? (D-057)",
  "Live Adult page FAQ: the answer to \"Can Beyond integrate with my existing website or gateway?\" repeats the next question; fix on the current site (D-057)",
  "FAQ page in production mode shows only confirmed answers and hides topics with none. OK to hide the rest until confirmed? (D-054)",
  "Live Solutions and industry pages publish writer placeholders ('[Placeholder — TODO: VERIFY WITH BEYOND…]'), internal notes, copied headings, dead links and a sample testimonial. Fix on the current site: every case is listed in docs/LIVE_SITE_ISSUES.md (D-058)",
  "Solutions FAQ answers marked as placeholders on the live site are flagged here and hidden in production, so several Solutions FAQs show only a few answers until Beyond confirms them. OK? (D-058)",
  "Hero cards on the Grow pages, Chargeback protection and 3D Secure are hidden at every screen size on the live site but shown in the demo (labelled Example). Keep them? (D-058)",
  "Protect hub: the live FAQ is a copy of the Adult FAQ. The demo reuses five questions from the Protect pages instead. OK, or will Beyond supply Protect questions? (D-058)",
  "Hardware catalog (/catalog) and the Cash Discount, Dual Pricing and Surcharging pages are linked but not built. In scope for the full build? (D-058)",
  "The demo's solution pages use the live section headings where they fit; headings the live site copied from other pages were replaced with each section's own words (list in D-058). Approve the replacements? (D-058)",
  "Should the new industry and Solutions FAQs also appear on the /faq page, as Adult's do? (D-058)",
  "Accessibility page: the live statement describes the accessibility overlay on the current site. The redesign meets WCAG 2.2 AA in the build itself and runs no overlay, so those sections are flagged. Keep the overlay on the new site, or rewrite the statement? (D-062)",
  "Legal pages: Terms and Privacy are copied verbatim from the live site (22 Sept 2026). Confirm they are current, supply a 'last updated' date, and send the text for the three sections the live Terms page leaves unfinished (service availability, modifications, governing law) (D-062)",
];

const md = [
  "# CONFIRM list",
  "",
  "Everything below renders with a dashed amber outline in demo mode (`NEXT_PUBLIC_DEMO_MODE=true`) and is hidden in production until confirmed.",
  "Generated by `pnpm confirm-list` — do not edit by hand.",
  "",
  "## Flagged content",
  "",
  "| # | Client to confirm | Where |",
  "|---|---|---|",
  ...[...byNote.entries()].map(([note, where], i) => `| ${i + 1} | ${note.replaceAll("|", "\\|")} | ${where.map((w) => `\`${w}\``).join("<br>")} |`),
  "",
  "## Open questions (not flagged in the UI)",
  "",
  ...open.map((o) => `- [ ] ${o}`),
  "",
].join("\n");

writeFileSync("docs/CONFIRM_LIST.md", md);
console.log(`CONFIRM_LIST.md: ${byNote.size} unique items from ${entries.length} usages`);
