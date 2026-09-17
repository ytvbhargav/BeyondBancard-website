import { expect, test, type Page } from "@playwright/test";

/**
 * S1 parity (build spec §15.I, D-039): the WebGL glow must match the static
 * CSS glow it replaces. Needs a real GPU; where Chromium falls back to a
 * software renderer the canvas never mounts and the test is skipped.
 */
test.use({ launchOptions: { args: ["--use-gl=angle", "--use-angle=d3d11", "--enable-gpu"] } });

const HIDE = `header, [data-announcement-bar], .hero-display, .hero-terminal-window, [data-hero-bar],
[data-hero] > div:nth-child(2) { visibility: hidden !important; }`;

async function sampleGlow(page: Page, width: number, height: number) {
  await page.addStyleTag({ content: HIDE });
  // Let the hidden layers leave the compositor before capturing (a real-time wait: the
  // WebGL page runs on a paused fake clock, so in-page rAF would never fire).
  await page.waitForTimeout(400);
  const png = (await page.screenshot({ scale: "css" })).toString("base64");
  const points = [
    [width / 2, 150],
    [width * 0.2, height * 0.6],
    [width / 2, height - 110],
    [width * 0.3, height - 110],
    [width * 0.8, height * 0.4],
  ];
  // 5x5 average so the shader's dither doesn't count as a difference.
  return page.evaluate(
    async ({ png, points }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${png}`;
      await img.decode();
      const c = new OffscreenCanvas(img.width, img.height);
      const g = c.getContext("2d")!;
      g.drawImage(img, 0, 0);
      return points.map(([x, y]) => {
        const d = g.getImageData(Math.round(x) - 2, Math.round(y) - 2, 5, 5).data;
        const sum = [0, 0, 0];
        for (let i = 0; i < d.length; i += 4) for (let k = 0; k < 3; k++) sum[k] += d[i + k];
        return sum.map((v) => v / 25);
      });
    },
    { png, points },
  );
}

test.describe("hero WebGL glow matches the CSS glow", () => {
  test.skip(({ isMobile }) => isMobile, "WebGL loads at 64rem and up only");

  for (const [width, height] of [
    [1536, 730],
    [1440, 900],
  ]) {
    test(`${width}x${height}`, async ({ browser }) => {
      // Two page loads, a mount loop and two fades: under a full parallel run this can pass 30s.
      test.slow();
      const glContext = await browser.newContext({ viewport: { width, height } });
      const glPage = await glContext.newPage();
      // The shader drifts slowly with time. The page runs on a paused fake clock that the
      // test steps by hand, so the canvas mounts and draws at shader time ~0 however long
      // a busy machine takes to capture. The canvas fade is a CSS transition and still
      // runs in real time.
      const t0 = Date.parse("2026-01-01T00:00:00Z");
      await glPage.clock.install({ time: t0 });
      await glPage.clock.pauseAt(t0 + 1000);
      await glPage.goto("/", { waitUntil: "load" });
      let mounted = false;
      for (let i = 0; i < 24 && !mounted; i++) {
        await glPage.clock.runFor(250); // the idle-callback gate, then React commits in real time
        mounted = await glPage
          .waitForSelector("main canvas", { state: "attached", timeout: 400 })
          .then(() => true)
          .catch(() => false);
      }
      test.skip(!mounted, "no hardware WebGL in this environment");
      await glPage.clock.runFor(100); // starts the fade and draws a few frames at shader time <= 0.1s
      await glPage.waitForTimeout(1500);
      // The comparison only means something once the canvas has fully faded in over the CSS glow.
      await expect.poll(() => glPage.locator("main canvas").evaluate((c) => getComputedStyle(c).opacity)).toBe("1");
      const webgl = await sampleGlow(glPage, width, height);
      await glContext.close();

      const cssContext = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
      const cssPage = await cssContext.newPage();
      await cssPage.goto("/", { waitUntil: "load" });
      await cssPage.waitForTimeout(1500);
      const css = await sampleGlow(cssPage, width, height);
      await cssContext.close();

      webgl.forEach((rgb, i) => {
        const delta = rgb.reduce((s, v, k) => s + Math.abs(v - css[i][k]), 0) / 3;
        expect(delta, `mean |ΔRGB| at point ${i + 1}: webgl ${rgb.map(Math.round)} vs css ${css[i].map(Math.round)}`).toBeLessThanOrEqual(3);
      });
    });
  }
});
