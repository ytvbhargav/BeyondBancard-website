import { expect, test } from "@playwright/test";

test("apply form validates, completes three steps and shows success", async ({ page }) => {
  const requests: string[] = [];
  await page.goto("/live-form");
  page.on("request", (r) => {
    if (["POST", "PUT", "PATCH"].includes(r.method())) requests.push(r.url());
  });

  const next = page.getByRole("button", { name: "Next", exact: true });

  // Step 1: errors show when advancing empty
  await next.click({ force: true });
  await expect(page.getByText("Enter your business legal name.")).toBeVisible();
  await expect(page.getByText("Choose the industry closest to your business.")).toBeVisible();

  await page.locator("#legalName").fill("Acme Supplements LLC");
  await page.locator("#industry").click();
  await page.getByRole("option", { name: "Nutra & supplements" }).click();
  await page.getByLabel("Online", { exact: true }).check();
  await next.click();

  // Step 2
  await expect(page.getByRole("heading", { level: 2, name: "Processing" })).toBeFocused();
  await page.locator("#monthlyVolume").click();
  await page.getByRole("option", { name: "$100K–$500K" }).click();
  await page.getByRole("radiogroup", { name: "Are you currently processing cards?" }).getByRole("radio", { name: "Yes" }).click();
  await expect(page.locator("#currentProcessor")).toBeVisible();

  // Back keeps values
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.locator("#legalName")).toHaveValue("Acme Supplements LLC");
  await next.click();
  await next.click();

  // Step 3
  await page.locator("#firstName").fill("Dana");
  await page.locator("#lastName").fill("Reyes");
  await page.locator("#email").fill("dana@example.com");
  await page.locator("#phone").fill("(555) 555-0100");
  const submit = page.getByRole("button", { name: "Submit application" });
  await submit.click({ force: true });
  await expect(page.getByText("Agree to be contacted so we can review your application.")).toBeVisible();
  await page.locator("#consent").click();
  await submit.click();

  await expect(page.getByRole("heading", { name: "Thanks, Dana. Your application has been received." })).toBeVisible({
    timeout: 5000,
  });
  await expect(page.getByText("Demo only — no data is sent.")).toBeVisible();
  expect(requests, "no data is sent anywhere").toEqual([]);
});
