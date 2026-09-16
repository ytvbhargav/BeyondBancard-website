import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3300);
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

/**
 * E2E quality gates (PRD §12). Runs against a production build:
 *   pnpm build && pnpm test:e2e
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: { baseURL, trace: "retain-on-failure" },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `pnpm start --port ${PORT}`,
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
  ],
});
