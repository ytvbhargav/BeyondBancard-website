import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { DEMO_ROUTES } from "./routes";

for (const route of [...DEMO_ROUTES, "/coming-soon?from=%2Fnews"]) {
  test(`axe: no serious or critical violations on ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    // Let reveal-on-scroll content reach its final state before auditing.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
      window.scrollTo(0, 0);
    });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(
      blocking.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")})`),
    ).toEqual([]);
  });
}

test.describe("reduced motion renders final states", () => {
  test.use({ reducedMotion: "reduce" });

  test("homepage underwriting example is approved immediately", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[aria-live]").getByText("Example application status: Approved")).toBeAttached({ timeout: 1500 });
  });

  test("marquee does not animate", async ({ page }) => {
    await page.goto("/");
    const name = await page.locator(".marquee-track").evaluate((el) => getComputedStyle(el).animationName);
    expect(name).toBe("none");
  });

  test("no hero canvas is mounted", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(800);
    await expect(page.locator("main canvas")).toHaveCount(0);
  });
});
