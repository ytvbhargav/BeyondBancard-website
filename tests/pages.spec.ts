import { expect, test } from "@playwright/test";
import { DEMO_ROUTES } from "./routes";

for (const route of DEMO_ROUTES) {
  test.describe(`page ${route}`, () => {
    test("returns 200 with exactly one h1", async ({ page }) => {
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
    });

    test("has no empty or # links", async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('a[href="#"]')).toHaveCount(0);
      await expect(page.locator('a[href=""]')).toHaveCount(0);
      await expect(page.locator("a:not([href])")).toHaveCount(0);
    });

    test("internal links resolve to a demo route or coming-soon", async ({ page }) => {
      await page.goto(route);
      const hrefs = await page.locator("a[href]").evaluateAll((els) => els.map((e) => e.getAttribute("href")!));
      const internal = [...new Set(hrefs.filter((h) => h.startsWith("/")))];
      for (const href of internal) {
        const path = href.split("#")[0].split("?")[0];
        const ok = (DEMO_ROUTES as readonly string[]).includes(path) || path === "/coming-soon";
        expect(ok, `${href} on ${route}`).toBe(true);
      }
    });

    test("sends noindex header", async ({ request }) => {
      const res = await request.get(route);
      expect(res.headers()["x-robots-tag"]).toContain("noindex");
    });
  });
}

test("homepage h1 reads as one sentence", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("The processor that says yes.");
});

test("coming-soon shows the requested path", async ({ page }) => {
  await page.goto("/coming-soon?from=%2Fgrow%2Fworking-capital");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page is part of the full redesign.");
  await expect(page.getByText("/grow/working-capital")).toBeVisible();
  await page.getByRole("link", { name: "Go to homepage" }).click();
  await expect(page).toHaveURL("/");
});

test("unknown routes render the branded 404", async ({ page }) => {
  const res = await page.goto("/definitely-not-a-page");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("We couldn't find that page.");
});
