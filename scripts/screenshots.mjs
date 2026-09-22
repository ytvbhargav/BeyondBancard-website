// Capture full-page screenshots of demo routes at 390px and 1440px.
// Usage: node scripts/screenshots.mjs [baseUrl] [outDir] [route ...]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "docs/screenshots";
const routes = process.argv.slice(4).length
  ? process.argv.slice(4)
  : [
      "/",
      "/accept/high-risk-processing",
      "/industries",
      "/industries/nutra-supplements",
      "/partners/isos-agents",
      "/live-form",
      "/about-beyond-bancard",
      "/careers",
      "/contact-us",
      "/news",
      "/news/what-is-a-high-risk-merchant-account-and-how-does-it-work",
      "/our-clients",
      "/faq",
      // D-057
      "/industries/adult",
      "/partners",
      // Top 6 industries and Solutions (D-058)
      "/industries/gaming",
      "/industries/ruo-peptides",
      "/industries/travel-payment-solutions",
      "/industries/crb",
      "/accept",
      "/accept/online-payments",
      "/accept/in-person-payments",
      "/accept/b2b-payments",
      "/accept/international-payments",
      "/accept/ach-echeck",
      "/protect",
      "/protect/chargeback-protection",
      "/protect/network-tokenization",
      "/protect/3d-secure",
      "/protect/fraud-risk-tools",
      "/grow",
      "/grow/working-capital",
      "/grow/instant-payouts",
      "/grow/recurring-billing",
      "/grow/cost-reduction-programs",
      "/operate",
      "/operate/dashboard-reporting",
      "/operate/invoicing",
      "/operate/payment-gateways",
      "/operate/payment-technology",
      "/operate/pos",
      "/operate/virtual-terminal",
      "/partners/isvs-platforms",
      "/partners/associations",
      "/terms-conditions",
      "/privacy-policy",
      "/accessibility",
    ];
const widths = (process.env.WIDTHS ?? "390,1440").split(",").map(Number);
const reduced = process.env.REDUCED === "1";

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 844 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    // Scroll through so once-only reveals fire, then return to the top.
    await page.evaluate(async () => {
      const step = 300;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 140));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    await page.waitForTimeout(Number(process.env.SETTLE ?? 5200));
    const name = (route === "/" ? "home" : route.slice(1).replaceAll("/", "_")) + `-${width}.png`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: true });
    console.log("saved", name);
  }
  await context.close();
}
await browser.close();
