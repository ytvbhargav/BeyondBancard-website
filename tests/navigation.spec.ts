import { expect, test } from "@playwright/test";

test.describe("desktop mega menu", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");

  test("opens with keyboard, Esc closes and returns focus", async ({ page }) => {
    await page.goto("/accept/high-risk-processing");
    const nav = page.getByRole("navigation", { name: "Main" });
    const trigger = nav.getByRole("button", { name: "Solutions" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(nav.getByRole("link", { name: "Chargeback protection" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("arrow keys move between top-level items", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("button", { name: "Solutions" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(nav.getByRole("button", { name: "Industries" })).toBeFocused();
  });

  test("menu links route through href()", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("button", { name: "Industries" }).click();
    const link = nav.getByRole("link", { name: /Nutra & supplements/ });
    await expect(link).toBeVisible();
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/industries/nutra-supplements");
  });
});

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("opens a sheet with accordion groups and closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Industries" }).click();
    await expect(dialog.getByRole("link", { name: "View all industries" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("sticky CTA appears after scrolling", async ({ page }) => {
    await page.goto("/industries");
    await page.mouse.wheel(0, 900);
    await expect(page.locator(".fixed.bottom-0").getByRole("link", { name: "Apply now" })).toBeVisible();
  });
});

test("announcement bar dismissal persists", async ({ page }) => {
  await page.goto("/");
  const bar = page.locator("[data-announcement-bar]");
  await expect(bar).toBeVisible();
  await page.getByRole("button", { name: "Dismiss announcement" }).click();
  await expect(bar).toBeHidden();
  await page.reload();
  await expect(bar).toBeHidden();
});
