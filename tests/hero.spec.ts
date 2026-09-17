import { expect, test, type Page } from "@playwright/test";
import { DEMO_ROUTES } from "./routes";

/**
 * Homepage hero v3 acceptance checks (build spec §15, D-007, D-008). Geometry
 * values were measured on the production build with the announcement bar
 * shown unless noted. Pixel checks decode screenshots in the page with canvas.
 */

type Rect = [number, number, number, number];

const dismiss = () => {
  try {
    localStorage.setItem("bb-announcement-dismissed", "1");
  } catch {}
};

async function open(page: Page, width: number, height: number, { dismissed = false } = {}) {
  await page.setViewportSize({ width, height });
  if (dismissed) await page.addInitScript(dismiss);
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
}

function measure(page: Page) {
  return page.evaluate(() => {
    const rect = (el: Element | null | undefined): [number, number, number, number] | null => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return [b.left, b.top, b.right, b.bottom];
    };
    const baselines = [...document.querySelectorAll(".hero-line")].map((line) => {
      const probe = document.createElement("span");
      probe.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline";
      line.appendChild(probe);
      const y = probe.getBoundingClientRect().top;
      probe.remove();
      return y;
    });
    const h1 = document.querySelector("h1")!;
    const foot = document.querySelector("[data-hero-foot]");
    const link = (root: Element | Document | null, name: string) =>
      [...(root?.querySelectorAll("a") ?? [])].find((a) => a.textContent?.trim().startsWith(name) && a.offsetParent);
    return {
      F: parseFloat(getComputedStyle(h1).fontSize),
      h1: rect(h1)!,
      words: [...document.querySelectorAll(".hero-word")].map((w) => rect(w)!),
      baselines,
      header: rect(document.querySelector("header"))!,
      section: rect(document.querySelector("[data-hero]"))!,
      window: rect(document.querySelector(".hero-terminal-window"))!,
      strip: rect(document.querySelector("[data-hero-bar]"))!,
      pill: rect(document.querySelector("[data-hero-bar] > div"))!,
      ctaRow: rect(foot?.querySelector("[data-hero-cta]"))!,
      footApply: rect(link(foot, "Apply now"))!,
      footExpert: rect(link(foot, "Talk to an expert"))!,
      headerApply: rect(link(document.querySelector("header"), "Apply now")),
      barExpert: rect(link(document.querySelector("[data-hero-bar]"), "Talk to an expert")),
      rotate: getComputedStyle(document.querySelector(".hero-terminal-pos")!).rotate,
      innerWidth,
      innerHeight,
    };
  });
}

/** Lets a style change reach the compositor before a screenshot. */
async function settle(page: Page) {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.waitForTimeout(150);
}

const near = (actual: number, expected: number, tolerance: number, label: string) =>
  expect(Math.abs(actual - expected), `${label}: ${actual.toFixed(1)} vs ${expected}`).toBeLessThanOrEqual(tolerance);

const nearRect = (actual: Rect, expected: Rect, tolerance: number, label: string) =>
  actual.forEach((v, i) => near(v, expected[i], tolerance, `${label}[${i}]`));

/* ------------------------------------------------------------------ A */

// Landscape desktops of every height: the first screen fills the viewport and
// the bar is docked on the fold with its own CTA (build spec §2, D-009).
const DESKTOP: {
  w: number;
  h: number;
  dismissed?: boolean;
  F: number;
  h1: Rect;
  baselines?: [number, number, number];
  pill: Rect;
  strip: [number, number];
}[] = [
  { w: 1536, h: 730, F: 153.3, h1: [376, 229, 1160, 597], baselines: [341, 464, 587], pill: [186, 656, 1350, 714], strip: [650, 730] },
  { w: 1536, h: 730, dismissed: true, F: 153.3, h1: [376, 215, 1160, 583], baselines: [327, 449, 572], pill: [186, 656, 1350, 714], strip: [650, 730] },
  { w: 1440, h: 900, F: 144, h1: [351, 268, 1089, 614], baselines: [373, 488, 603], pill: [138, 826, 1302, 884], strip: [820, 900] },
  { w: 1366, h: 768, F: 136.6, h1: [333, 268, 1033, 596], pill: [101, 694, 1265, 752], strip: [688, 768] },
  { w: 1280, h: 720, F: 128, h1: [312, 263, 968, 570], baselines: [356, 459, 561], pill: [58, 646, 1222, 704], strip: [640, 720] },
  { w: 1280, h: 800, F: 128, h1: [312, 268, 968, 575], pill: [58, 726, 1222, 784], strip: [720, 800] },
  { w: 1024, h: 768, F: 102.4, h1: [250, 268, 774, 514], baselines: [342, 424, 506], pill: [71, 694, 953, 752], strip: [688, 768] },
  { w: 1920, h: 1080, F: 153.6, h1: [567, 268, 1353, 637], baselines: [380, 503, 626], pill: [378, 1006, 1542, 1064], strip: [1000, 1080] },
  { w: 1920, h: 1080, dismissed: true, F: 153.6, h1: [567, 224, 1353, 593], pill: [378, 1006, 1542, 1064], strip: [1000, 1080] },
];

test.describe("hero desktop geometry", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");
  test.use({ reducedMotion: "reduce" });

  for (const c of DESKTOP) {
    test(`${c.w}x${c.h}${c.dismissed ? " (announcement dismissed)" : ""}`, async ({ page }) => {
      await open(page, c.w, c.h, { dismissed: c.dismissed });
      const m = await measure(page);

      near(m.F, c.F, 0.5, "font-size");
      nearRect(m.h1, c.h1, 6, "h1");
      const ratio = ((m.h1[2] - m.h1[0]) / c.w) * 100;
      if (c.w === 1920) {
        near(ratio, 40.9, 0.5, "block % of viewport");
      } else {
        expect(ratio, "block % of viewport").toBeGreaterThanOrEqual(50.5);
        expect(ratio, "block % of viewport").toBeLessThanOrEqual(51.5);
      }
      if (c.baselines) c.baselines.forEach((b, i) => near(m.baselines[i], b, 3, `baseline ${i + 1}`));

      // Header sits over the hero, directly under the announcement bar.
      near(m.header[1], c.dismissed ? 0 : 44, 1, "header top");
      near(m.header[3] - m.header[1], 80, 0.5, "header height");
      near(m.section[1], m.header[1], 0.5, "section top = header top");

      // Glass strip and pill at the bottom of the first screen.
      near(m.strip[0], 0, 0.5, "strip left");
      near(m.strip[2], c.w, 0.5, "strip right");
      near(m.strip[1], c.strip[0], 2, "strip top");
      near(m.strip[3], c.strip[1], 2, "strip bottom");
      nearRect(m.pill, c.pill, 2, "pill");
      near(m.pill[3], m.strip[3] - 16, 2, "pill bottom");
      expect(m.headerApply, "header Apply now").not.toBeNull();
      expect(m.headerApply![3]).toBeLessThanOrEqual(m.innerHeight);

      near(m.pill[3], m.innerHeight - 16, 2, "pill on the fold");
      if (c.w >= 1280) {
        near(m.pill[2] - m.pill[0], 1164, 2, "pill width");
      } else {
        expect(m.pill[0], "pill left inset").toBeGreaterThanOrEqual(24);
        expect(m.pill[2], "pill right inset").toBeLessThanOrEqual(c.w - 24);
      }
      // Both CTAs in the first viewport (header + bar); the foot starts at the fold.
      expect(m.barExpert, "bar Talk to an expert").not.toBeNull();
      expect(m.barExpert![1]).toBeGreaterThanOrEqual(0);
      expect(m.barExpert![3]).toBeLessThanOrEqual(m.innerHeight);
      expect(m.ctaRow[1], "foot CTA row starts below the fold").toBeGreaterThanOrEqual(m.innerHeight);
      expect(m.rotate).toBe("20deg");
    });
  }

  test("2560x1440 keeps the bar docked on the fold", async ({ page }) => {
    await open(page, 2560, 1440);
    const m = await measure(page);
    near(m.pill[3], m.innerHeight - 16, 2, "pill on the fold");
    near(m.pill[2] - m.pill[0], 1164, 2, "pill width");
    expect(m.barExpert, "bar Talk to an expert").not.toBeNull();
    expect(m.ctaRow[1], "foot CTA row starts below the fold").toBeGreaterThanOrEqual(m.innerHeight);
  });

  // Portrait desktop-layout viewports (iPad Pro portrait) stop the first screen at the viewport width,
  // so the foot CTAs and lead are in the first view and the bar drops its own CTA.
  test("1024x1366 shows the foot CTAs and lead in the first view", async ({ page }) => {
    await open(page, 1024, 1366);
    const m = await measure(page);
    near(m.strip[3] - m.section[1], 1024 - 44, 1, "first screen height");
    expect(m.barExpert, "bar Talk to an expert hidden").toBeNull();
    expect(m.ctaRow[3], "foot CTA row in the first view").toBeLessThanOrEqual(m.innerHeight);
    const lead = await page.locator("[data-hero-foot] p").evaluate((el) => el.getBoundingClientRect().bottom);
    expect(lead, "lead in the first view").toBeLessThanOrEqual(m.innerHeight);
  });

  test("the first screen height is continuous across a square viewport", async ({ page }) => {
    const heights: number[] = [];
    for (const h of [1199, 1201]) {
      await open(page, 1200, h);
      const m = await measure(page);
      heights.push(m.strip[3] - m.section[1]);
    }
    near(heights[1], heights[0], 3, "first screen height at 1200x1201 vs 1200x1199");
  });

  // Short desktops (150-175% scaling, docked devtools): the headline shrinks so the bar never covers "yes.".
  for (const [w, h] of [
    [1280, 450],
    [1536, 600],
  ]) {
    test(`${w}x${h} keeps the last line above the bar`, async ({ page }) => {
      await open(page, w, h);
      const m = await measure(page);
      const descender = m.baselines[2] + 0.22 * m.F;
      expect(descender, "'yes.' descender above the strip").toBeLessThanOrEqual(m.strip[1]);
    });
  }
});

/* ------------------------------------------------------------------ B */

const MASK_CSS = `
html[data-hero-test] header, html[data-hero-test] [data-announcement-bar], html[data-hero-test] .hero-glow,
html[data-hero-test] [data-hero-bar], html[data-hero-test] [data-hero-foot] { visibility: hidden !important; }
html[data-hero-test] [data-hero] { background: #000 !important; }
html[data-hero-test] * { animation: none !important; transition: none !important; }
html[data-hero-test="text"] .hero-terminal-window { visibility: hidden !important; }
html[data-hero-test="text"] .hero-display { color: #fff !important; }
html[data-hero-test="dev"] .hero-display { color: transparent !important; }
html[data-hero-test="dev"] [data-hero] * { mask-image: none !important; }
html[data-hero-test="dev"] .hero-terminal-body > *:not(svg), html[data-hero-test="dev"] .hero-terminal-body > * *:not(svg *) {
  background: #f00 !important; color: #f00 !important; box-shadow: none !important; border-color: #f00 !important; }
html[data-hero-test="dev"] .hero-terminal-body svg path:not([fill=none]), html[data-hero-test="dev"] .hero-terminal-body svg rect { fill: #f00 !important; }
html[data-hero-test="dev"] .hero-terminal-body svg [stroke-width] { stroke: #f00 !important; }
html[data-hero-test="dev"] .hero-terminal-shade { opacity: 0 !important; }
html[data-hero-line="1"] .hero-display > .hero-line:not(:nth-child(1)),
html[data-hero-line="2"] .hero-display > .hero-line:not(:nth-child(2)),
html[data-hero-line="3"] .hero-display > .hero-line:not(:nth-child(3)) { visibility: hidden !important; }`;

async function snap(page: Page, mode: "dev" | "text", line?: number) {
  await page.evaluate(
    ([mode, line]) => {
      document.documentElement.dataset.heroTest = mode as string;
      if (line) document.documentElement.dataset.heroLine = String(line);
      else delete document.documentElement.dataset.heroLine;
    },
    [mode, line ?? 0] as const,
  );
  await settle(page);
  return (await page.screenshot({ scale: "css" })).toString("base64");
}

test.describe("hero terminal never hides a letter", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");
  test.use({ reducedMotion: "reduce" });

  for (const [w, h] of [
    [1024, 768],
    [1280, 720],
    [1440, 900],
    [1536, 730],
    [1920, 1080],
  ]) {
    test(`${w}x${h}`, async ({ page }) => {
      await open(page, w, h);
      const m = await measure(page);
      await page.addStyleTag({ content: MASK_CSS });
      const dev = await snap(page, "dev");
      const texts = [await snap(page, "text", 1), await snap(page, "text", 2), await snap(page, "text", 3)];

      const r = await page.evaluate(
        async ({ dev, texts, h1, b1, F }) => {
          const decode = async (b64: string) => {
            const img = new Image();
            img.src = `data:image/png;base64,${b64}`;
            await img.decode();
            const c = new OffscreenCanvas(img.width, img.height);
            const g = c.getContext("2d")!;
            g.drawImage(img, 0, 0);
            return { w: img.width, h: img.height, d: g.getImageData(0, 0, img.width, img.height).data };
          };
          const D = await decode(dev);
          const isDev = (x: number, y: number) => {
            if (x < 0 || y < 0 || x >= D.w || y >= D.h) return false;
            const i = (y * D.w + x) * 4;
            return D.d[i] > 128 && D.d[i + 1] < 90;
          };
          let top = -1;
          for (let y = 0; y < D.h && top < 0; y++) for (let x = 0; x < D.w; x++) if (isDev(x, y)) { top = y; break; }

          const x0 = Math.floor(h1[0]) - 10, x1 = Math.ceil(h1[2]) + 10;
          const y0 = Math.floor(h1[1]) - 10, y1 = Math.ceil(h1[3]) + 50;
          const lines = [];
          for (const [li, t] of texts.entries()) {
            const T = await decode(t);
            let hidden = 0, left = Infinity, right = Infinity, descender = Infinity;
            for (let y = y0; y < Math.min(y1, T.h); y++)
              for (let x = x0; x < x1; x++) {
                if (T.d[(y * T.w + x) * 4] <= 128) continue;
                if (isDev(x, y)) { hidden++; continue; }
                for (let d = 1; d < 160; d++) if (isDev(x + d, y)) { left = Math.min(left, d); break; }
                for (let d = 1; d < 160; d++) if (isDev(x - d, y)) { right = Math.min(right, d); break; }
                // Line 1 descenders (the "p"): nearest terminal pixel in any direction
                if (li === 0 && y > b1 + 0.03 * F)
                  for (let dy = -20; dy <= 20; dy++)
                    for (let dx = -20; dx <= 20; dx++) {
                      const dd = Math.hypot(dx, dy);
                      if (dd < descender && isDev(x + dx, y + dy)) descender = dd;
                    }
              }
            lines.push({ hidden, left, right, descender });
          }
          return { top, lines };
        },
        { dev, texts, h1: m.h1, b1: m.baselines[0], F: m.F },
      );

      const em = m.F;
      r.lines.forEach((l, i) => expect(l.hidden, `hidden glyph pixels on line ${i + 1}`).toBe(0));
      const [b1, b2] = m.baselines;
      expect(r.top - b1, "terminal top below the line-1 baseline").toBeGreaterThanOrEqual(0);
      expect(r.top - b1, "terminal top within 0.05em of the line-1 baseline").toBeLessThanOrEqual(0.05 * em + 1);
      expect(b2 - 0.69 * em - r.top, "terminal top clears the line-2 cap top").toBeGreaterThanOrEqual(0.05 * em);
      expect(r.lines[0].descender, "clearance from the 'p' descender").toBeGreaterThanOrEqual(0.08 * em);
      expect(r.lines[1].left, "clearance from 'that'").toBeGreaterThanOrEqual(0.12 * em);
      expect(r.lines[1].right, "clearance from 'says'").toBeGreaterThanOrEqual(0.12 * em);
      expect(r.lines[2].right, "clearance from 'yes.'").toBeGreaterThanOrEqual(0.4 * em);
    });
  }

  test("the entrance never passes the terminal over a letter", async ({ page }) => {
    test.slow();
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 1536, height: 730 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content: `${MASK_CSS.replace("html[data-hero-test] * { animation: none !important; transition: none !important; }", "")}
        html[data-hero-test] .hero-word, html[data-hero-test] .hero-terminal-anim { opacity: 1 !important; }`,
    });
    for (let t = 100; t <= 1100; t += 200) {
      await page.evaluate((t) => {
        for (const a of document.querySelector("[data-hero]")!.getAnimations({ subtree: true })) {
          // Scroll-driven animations (the bar CTA fade) have no time to set
          if (!(a.timeline instanceof DocumentTimeline)) continue;
          a.pause();
          a.currentTime = t;
        }
      }, t);
      const dev = await snap(page, "dev");
      const text = await snap(page, "text");
      const overlap = await page.evaluate(
        async ({ dev, text }) => {
          const decode = async (b64: string) => {
            const img = new Image();
            img.src = `data:image/png;base64,${b64}`;
            await img.decode();
            const c = new OffscreenCanvas(img.width, img.height);
            const g = c.getContext("2d")!;
            g.drawImage(img, 0, 0);
            return g.getImageData(0, 0, img.width, img.height).data;
          };
          const D = await decode(dev), T = await decode(text);
          let n = 0;
          for (let i = 0; i < D.length; i += 4) if (T[i] > 128 && T[i + 1] > 128 && D[i] > 128 && D[i + 1] < 90) n++;
          return n;
        },
        { dev, text },
      );
      expect(overlap, `terminal over glyph pixels at ${t}ms`).toBe(0);
    }
  });
});

/* ------------------------------------------------------------------ B2 */

test.describe("hero after scrolling", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");
  test.use({ reducedMotion: "reduce" });

  test("nothing of the terminal shows below the bar and the strip has no blur band", async ({ page }) => {
    await open(page, 1536, 730);
    await page.evaluate(() => window.scrollTo(0, 300));
    await settle(page);
    const blur = await page.locator("[data-hero-bar]").evaluate((el) => getComputedStyle(el).backdropFilter);
    expect(blur, "full-width strip is not blurred (only the pill is)").toBe("none");
    await page.addStyleTag({
      content: `header, [data-announcement-bar], .hero-glow, [data-hero-bar], [data-hero-foot], .hero-display { visibility: hidden !important; }
        [data-hero] { background: #000 !important; }
        .hero-terminal-body > *:not(svg), .hero-terminal-body > * *:not(svg *) { background: #f00 !important; color: #f00 !important; box-shadow: none !important; }
        .hero-terminal-body svg path:not([fill=none]), .hero-terminal-body svg rect { fill: #f00 !important; }
        .hero-terminal-shade { opacity: 0 !important; }`,
    });
    await settle(page);
    const stripBottom = await page.locator("[data-hero-bar]").evaluate((el) => el.getBoundingClientRect().bottom);
    const png = (await page.screenshot({ scale: "css" })).toString("base64");
    const below = await page.evaluate(
      async ({ png, from }) => {
        const img = new Image();
        img.src = `data:image/png;base64,${png}`;
        await img.decode();
        const c = new OffscreenCanvas(img.width, img.height);
        const g = c.getContext("2d")!;
        g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, img.width, img.height).data;
        let n = 0;
        for (let y = Math.ceil(from); y < img.height; y++)
          for (let x = 0; x < img.width; x++) {
            const i = (y * img.width + x) * 4;
            if (d[i] > 40 && d[i + 1] < 40) n++;
          }
        return n;
      },
      { png, from: stripBottom },
    );
    expect(below, "terminal pixels below the bar").toBe(0);
  });

  test("the bar's CTA copy fades out once the foot CTAs scroll into view, without reflowing the pill", async ({ page }) => {
    await open(page, 1536, 730);
    const state = () =>
      page.evaluate(() => ({
        cta: [...document.querySelectorAll(".hero-bar-cta > *")].map((el) => getComputedStyle(el).visibility),
        width: document.querySelector("[data-hero-bar] > div")!.getBoundingClientRect().width,
      }));
    const top = await state();
    expect(top.cta.length).toBe(3);
    expect(top.cta.every((v) => v === "visible"), "bar CTA shown at the top").toBe(true);
    await page.evaluate(() => window.scrollTo(0, 120));
    await settle(page);
    const scrolled = await state();
    expect(scrolled.cta.every((v) => v === "hidden"), "bar CTA hidden once scrolled").toBe(true);
    near(scrolled.width, top.width, 0.5, "pill width");
    await expect(page.locator("[data-hero-bar]").getByRole("link", { name: "Talk to an expert" })).toBeHidden();
    await expect(page.locator("[data-hero-foot]").getByRole("link", { name: "Talk to an expert" })).toBeInViewport();
  });
});

/* ------------------------------------------------------------------ C */

// Offsets from the hero section top (the announcement bar bottom).
const MOBILE: { w: number; h: number; h1: [number, number]; window: [number, number]; strip: [number, number]; apply: number; expert: number }[] = [
  { w: 390, h: 844, h1: [104, 262], window: [278, 594], strip: [538, 594], apply: 606, expert: 666 },
  { w: 375, h: 667, h1: [104, 255], window: [271, 431], strip: [375, 431], apply: 443, expert: 503 },
  { w: 360, h: 800, h1: [104, 248], window: [264, 536], strip: [480, 536], apply: 548, expert: 608 },
];

test.describe("hero mobile layout", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");
  test.use({ reducedMotion: "reduce" });

  for (const c of MOBILE) {
    test(`${c.w}x${c.h}`, async ({ page }) => {
      await open(page, c.w, c.h);
      const m = await measure(page);
      const top = m.section[1];
      near(m.h1[1] - top, c.h1[0], 8, "h1 top");
      near(m.h1[3] - top, c.h1[1], 8, "h1 bottom");
      expect(m.h1[3], "headline above the terminal").toBeLessThan(m.window[1]);
      near(m.window[1] - top, c.window[0], 8, "terminal window top");
      near(m.strip[1] - top, c.strip[0], 8, "status strip top");
      near(m.footApply[1] - top, c.apply, 8, "Apply now top");
      near(m.footExpert[1] - top, c.expert, 8, "Talk to an expert top");
      for (const [label, r] of [
        ["status strip", m.strip],
        ["Apply now", m.footApply],
        ["Talk to an expert", m.footExpert],
      ] as const)
        expect(r[3], `${label} inside the first viewport`).toBeLessThanOrEqual(m.innerHeight);

      // Lines centre as sentences.
      const [the, processor, that, says, yes] = m.words;
      const gaps = [
        [the[0] - m.h1[0], m.h1[2] - processor[2]],
        [that[0] - m.h1[0], m.h1[2] - says[2]],
        [yes[0] - m.h1[0], m.h1[2] - yes[2]],
      ];
      gaps.forEach(([l, r], i) => expect(Math.abs(l - r), `line ${i + 1} centred`).toBeLessThanOrEqual(4));
      expect(m.rotate).toBe("14deg");
    });
  }

  test("768x1024 puts the CTAs in one row", async ({ page }) => {
    await open(page, 768, 1024);
    const m = await measure(page);
    near(m.footApply[1], m.footExpert[1], 1, "CTAs share a row");
    near(m.ctaRow[1] - m.section[1], 698, 8, "CTA row top");
    near(m.ctaRow[3] - m.section[1], 746, 8, "CTA row bottom");
  });

  test("the status pill is sized to its content and keeps its label whole", async ({ page }) => {
    for (const [w, h] of [
      [320, 640],
      [390, 844],
      [768, 1024],
    ]) {
      await open(page, w, h);
      const r = await page.evaluate(() => {
        const pill = document.querySelector("[data-hero-bar] > div")!;
        const b = pill.getBoundingClientRect();
        const label = [...pill.children].find((el) => el.textContent?.includes("Example"))!;
        const shown = [...pill.children].filter((el) => el.getBoundingClientRect().width > 0 && getComputedStyle(el).position !== "absolute");
        const last = shown[shown.length - 1].getBoundingClientRect();
        return { left: b.left, right: b.right, truncated: label.scrollWidth > label.clientWidth + 0.5, tail: b.right - last.right };
      });
      expect(r.truncated, `label truncated at ${w}`).toBe(false);
      expect(r.left, `pill inside the gutter at ${w}`).toBeGreaterThanOrEqual(16);
      expect(r.right, `pill inside the gutter at ${w}`).toBeLessThanOrEqual(w - 16);
      expect(r.tail, `no empty space after the last item at ${w}`).toBeLessThanOrEqual(10);
    }
  });

  test("the glass pill blurs the terminal behind it", async ({ page }) => {
    test.slow();
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await open(page, 375, 667);
    await expect(page.locator("[data-hero-bar] [aria-live]")).toHaveText("Example application status: Approved", { timeout: 15_000 });
    await page.waitForTimeout(2500);
    // A finished entrance that stays in effect makes the pill's ancestor its backdrop root, so the glass blurs nothing.
    const inEffect = await page.evaluate(() =>
      [".hero-bar", "[data-hero-cta]"].map((s) => document.querySelector(s)!.getAnimations().length),
    );
    expect(inEffect, "animations still in effect on .hero-bar and the foot CTA row").toEqual([0, 0]);
    await page.addStyleTag({ content: "[data-hero-bar] > div > * { visibility: hidden !important; }" });
    await settle(page);
    const box = (await page.locator("[data-hero-bar] > div").boundingBox())!;
    const clip = { x: box.x + 28, y: box.y + 8, width: box.width - 56, height: box.height - 16 };
    const glass = (await page.screenshot({ clip, scale: "css" })).toString("base64");
    await page.addStyleTag({ content: "[data-hero-bar] > div { backdrop-filter: none !important; }" });
    await settle(page);
    const plain = (await page.screenshot({ clip, scale: "css" })).toString("base64");
    const diff = await page.evaluate(
      async ([a, b]) => {
        const decode = async (b64: string) => {
          const img = new Image();
          img.src = `data:image/png;base64,${b64}`;
          await img.decode();
          const c = new OffscreenCanvas(img.width, img.height);
          const g = c.getContext("2d")!;
          g.drawImage(img, 0, 0);
          return g.getImageData(0, 0, img.width, img.height).data;
        };
        const A = await decode(a), B = await decode(b);
        let sum = 0;
        for (let i = 0; i < A.length; i += 4) sum += (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2])) / 3;
        return sum / (A.length / 4);
      },
      [glass, plain],
    );
    expect(diff, "mean pixel difference with and without the backdrop blur").toBeGreaterThan(1.5);
  });

  test("landscape phones show the whole headline", async ({ page }) => {
    for (const [w, h] of [
      [844, 390],
      [667, 375],
    ]) {
      await open(page, w, h);
      const m = await measure(page);
      expect(m.h1[3], `h1 bottom at ${w}x${h}`).toBeLessThanOrEqual(h);
    }
  });

  test("the terminal glow has no hard top edge on short screens", async ({ page }) => {
    await open(page, 375, 667);
    const png = (await page.screenshot({ scale: "css" })).toString("base64");
    const top = (await measure(page)).window[1];
    const [above, below] = await page.evaluate(
      async ({ png, y }) => {
        const img = new Image();
        img.src = `data:image/png;base64,${png}`;
        await img.decode();
        const c = new OffscreenCanvas(img.width, img.height);
        const g = c.getContext("2d")!;
        g.drawImage(img, 0, 0);
        const px = (yy: number) => [...g.getImageData(60, Math.round(yy), 1, 1).data.slice(0, 3)];
        return [px(y - 2), px(y + 2)];
      },
      { png, y: top },
    );
    const delta = above.reduce((s, v, i) => s + Math.abs(v - below[i]), 0) / 3;
    expect(delta, `window top edge ${above} vs ${below}`).toBeLessThanOrEqual(3);
  });

  test("the sticky CTA waits until the hero CTAs have scrolled away", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const sticky = page.locator(".fixed.bottom-0").getByRole("link", { name: "Apply now" });
    await page.evaluate(() => window.scrollTo(0, 420));
    await page.waitForTimeout(500);
    await expect(sticky).toHaveCount(0);
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(sticky).toBeVisible();
  });
});

/* ------------------------------------------------------------------ D */

test.describe("no horizontal overflow", () => {
  test("homepage at every width", async ({ page, isMobile }) => {
    test.skip(isMobile, "width sweep runs in the desktop project");
    for (const w of [320, 360, 375, 390, 768, 1024, 1280, 1366, 1440, 1536, 1920]) {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto("/");
      const [scroll, client] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      expect(scroll, `scrollWidth at ${w}`).toBe(client);
    }
  });

  test("every demo route at 360", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    for (const route of DEMO_ROUTES) {
      await page.goto(route);
      const [scroll, client] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      expect(scroll, `scrollWidth on ${route}`).toBe(client);
    }
  });

  test("the announcement tooltip stays on screen at 320 and 360", async ({ page, isMobile }) => {
    test.skip(isMobile, "hover check runs in the desktop project");
    for (const w of [320, 360]) {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto("/");
      const trigger = page.locator("[data-announcement-bar] [data-confirm]");
      const point = await trigger.evaluate((el) => {
        const r = el.getClientRects()[0];
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
      await page.mouse.move(point.x, point.y);
      await page.waitForTimeout(300);
      const r = await trigger.evaluate((el) => {
        const tip = el.querySelector(":scope > span[aria-hidden]:last-child")!;
        const b = tip.getBoundingClientRect();
        return { display: getComputedStyle(tip).display, left: b.left, right: b.right, scroll: document.documentElement.scrollWidth };
      });
      expect(r.display, `tooltip shown at ${w}`).toBe("block");
      expect(r.left, `tooltip left at ${w}`).toBeGreaterThanOrEqual(0);
      expect(r.right, `tooltip right at ${w}`).toBeLessThanOrEqual(w);
      expect(r.scroll, `scrollWidth while hovering at ${w}`).toBe(w);
    }
  });

  test("an open Confirm tooltip stays on screen and adds no sideways scroll at 320 and 360", async ({ page, isMobile }) => {
    test.skip(isMobile, "hover check runs in the desktop project");
    test.slow();
    // The trust marquee never stops moving otherwise; the tooltip placement does not depend on motion.
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const w of [320, 360]) {
      await page.setViewportSize({ width: w, height: 800 });
      for (const route of ["/", "/live-form"]) {
        await page.goto(route);
        const triggers = page.locator("[data-confirm]");
        const n = await triggers.count();
        for (let i = 0; i < n; i++) {
          const t = triggers.nth(i);
          if (!(await t.isVisible())) continue;
          await t.evaluate((el) => el.scrollIntoView({ block: "center" }));
          await t.hover({ force: true });
          await page.waitForTimeout(100);
          const r = await t.evaluate((el) => {
            const tip = el.querySelector(":scope > span[aria-hidden]:last-child")!.getBoundingClientRect();
            return { left: tip.left, right: tip.right, scroll: document.documentElement.scrollWidth, note: el.getAttribute("data-confirm") };
          });
          expect(r.scroll, `scrollWidth hovering "${r.note}" on ${route} at ${w}`).toBe(w);
          expect(r.left, `tooltip left for "${r.note}" on ${route} at ${w}`).toBeGreaterThanOrEqual(0);
          expect(r.right, `tooltip right for "${r.note}" on ${route} at ${w}`).toBeLessThanOrEqual(w);
          await page.mouse.move(0, 0);
        }
      }
    }
  });
});

/* ------------------------------------------------------------------ E */

const opacityOf = (page: Page, selector: string) => page.locator(selector).evaluate((el) => getComputedStyle(el).opacity);

test.describe("header over the hero", () => {
  test("is transparent at the top of the homepage and glass once scrolled", async ({ page }) => {
    await page.goto("/");
    expect(await opacityOf(page, "[data-header-bg]")).toBe("0");
    expect(await opacityOf(page, "[data-header-base]")).toBe("0");
    const [headerTop, sectionTop] = await page.evaluate(() => [
      document.querySelector("header")!.getBoundingClientRect().top,
      document.querySelector("[data-hero]")!.getBoundingClientRect().top,
    ]);
    expect(Math.abs(headerTop - sectionTop)).toBeLessThanOrEqual(0.5);

    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(400);
    expect(await opacityOf(page, "[data-header-bg]")).toBe("1");
    await expect(page.locator("header")).toHaveAttribute("data-scrolled", "true");
    expect(await page.locator("header").evaluate((el) => el.getBoundingClientRect().height)).toBe(64);
  });

  test("keeps the hero pulled up under the header with a larger default font size", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop only");
    await page.setViewportSize({ width: 1536, height: 730 });
    await page.goto("/");
    await page.addStyleTag({ content: "html { font-size: 24px !important; }" });
    await settle(page);
    const r = await page.evaluate(() => {
      const pill = document.querySelector("[data-hero-bar] > div")!.getBoundingClientRect();
      const kids = [...document.querySelectorAll<HTMLElement>("[data-hero-bar] > div a, [data-hero-bar] > div button")]
        .filter((el) => el.offsetParent)
        .map((el) => el.getBoundingClientRect());
      return {
        header: document.querySelector("header")!.getBoundingClientRect().top,
        section: document.querySelector("[data-hero]")!.getBoundingClientRect().top,
        inside: kids.every((k) => k.top >= pill.top - 0.5 && k.bottom <= pill.bottom + 0.5),
      };
    });
    expect(Math.abs(r.header - r.section)).toBeLessThanOrEqual(0.5);
    expect(r.inside, "bar buttons inside the pill").toBe(true);
  });

  test("keeps the solid ink band on the ISOs page", async ({ page }) => {
    await page.goto("/partners/isos-agents");
    const base = await page.locator("[data-header-base]").evaluate((el) => [getComputedStyle(el).backgroundColor, getComputedStyle(el).opacity]);
    expect(base).toEqual(["rgb(14, 27, 61)", "1"]);
  });

  test("is 80px tall at the top of every route", async ({ page }) => {
    for (const route of DEMO_ROUTES) {
      await page.goto(route);
      expect(await page.locator("header").evaluate((el) => el.getBoundingClientRect().height), route).toBe(80);
    }
  });

  for (const how of ["click", "dblclick"] as const)
  test(`dismissing the announcement (${how}) keeps the bar on the fold and never snaps the headline`, async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop only");
    await page.setViewportSize({ width: 1536, height: 730 });
    await page.goto("/", { waitUntil: "load" });
    // A click before hydration does nothing, so wait for the hero to hydrate (it drops data-hero-pre once in view)
    await expect(page.locator("[data-hero]")).not.toHaveAttribute("data-hero-pre", { timeout: 15_000 });
    await page.waitForTimeout(2200);
    // The tracker starts from the click itself (bubble phase, after the bar's handler), so a slow click cannot outlast it
    await page.evaluate(() => {
      const w = window as unknown as { __track: number[][] };
      w.__track = [];
      const h1 = document.querySelector("h1")!, pill = document.querySelector("[data-hero-bar] > div")!;
      window.addEventListener(
        "click",
        () => {
          const t0 = performance.now();
          const tick = () => {
            w.__track.push([h1.getBoundingClientRect().top, pill.getBoundingClientRect().bottom]);
            if (performance.now() - t0 < 1500) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
        { once: true },
      );
    });
    await page.getByRole("button", { name: "Dismiss announcement" })[how]();
    await expect(page.locator("html")).toHaveAttribute("data-announcement", "dismissed");
    await page.waitForTimeout(1700);
    const track = await page.evaluate(() => (window as unknown as { __track: number[][] }).__track);
    expect(track.length).toBeGreaterThan(5);
    for (const [, pillBottom] of track) near(pillBottom, 714, 2, "pill bottom during dismissal");
    for (let i = 1; i < track.length; i++)
      expect(track[i][0] - track[i - 1][0], "headline never moves down during dismissal").toBeLessThanOrEqual(1);
    near(track[track.length - 1][0], 215, 2, "headline final top");
  });
});

/* ------------------------------------------------------------------ F */

const BG_CSS = `
* { animation: none !important; transition: none !important; }
.hero-display, [data-hero] p, [data-hero] ul, [data-hero] ul *, [data-hero-bar] *, header * { color: transparent !important; }
[data-hero] ul .rounded-pill, .hero-terminal-pos, [data-hero] .anim-rise, [data-hero-bar] .rounded-pill > *,
[data-hero-bar] a, [data-hero-bar] button, [data-hero-bar] [aria-hidden], header a, header button { visibility: hidden !important; }`;

test.describe("hero contrast over the glow", () => {
  test.use({ reducedMotion: "reduce" });

  for (const [w, h] of [
    [1536, 730],
    [1440, 900],
    [1280, 720],
    [1920, 1080],
    [390, 844],
  ]) {
    test(`${w}x${h}`, async ({ page, isMobile }) => {
      test.skip(isMobile !== w < 1024, "size belongs to the other project");
      await open(page, w, h);
      const m = await measure(page);
      const boxes = await page.evaluate(() => {
        const r = (s: string) => {
          const b = document.querySelector(s)!.getBoundingClientRect();
          return [b.left, b.top + scrollY, b.right, b.bottom + scrollY];
        };
        return { lead: r("[data-hero-foot] p"), facts: r("[data-hero-foot] ul"), pill: r("[data-hero-bar] > div") };
      });
      await page.addStyleTag({ content: BG_CSS });
      await settle(page);
      const shot = (await page.screenshot({ fullPage: true, scale: "css" })).toString("base64");
      const pill = boxes.pill;
      const worst = await page.evaluate(
        async ({ shot, areas }) => {
          const img = new Image();
          img.src = `data:image/png;base64,${shot}`;
          await img.decode();
          const c = new OffscreenCanvas(img.width, img.height);
          const g = c.getContext("2d")!;
          g.drawImage(img, 0, 0);
          const d = g.getImageData(0, 0, img.width, img.height).data;
          const lum = (rgb: number[]) => {
            const [r, gg, b] = rgb.map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
            return 0.2126 * r + 0.7152 * gg + 0.0722 * b;
          };
          const ratio = (a: number[], b: number[]) => {
            const A = lum(a), B = lum(b);
            return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05);
          };
          const out: Record<string, number> = {};
          for (const [name, [x0, y0, x1, y1], fg] of areas) {
            let min = 99;
            for (let y = Math.max(0, Math.round(y0)); y <= Math.min(img.height - 1, y1); y += 4)
              for (let x = Math.max(0, Math.round(x0)); x <= Math.min(img.width - 1, x1); x += 4) {
                const i = (y * img.width + x) * 4;
                min = Math.min(min, ratio([d[i], d[i + 1], d[i + 2]], fg));
              }
            out[name] = min;
          }
          return out;
        },
        {
          shot,
          areas: [
            ["h1", m.h1, [246, 248, 251]],
            ["lead", boxes.lead, [246, 248, 251]],
            ["facts", boxes.facts, [246, 248, 251]],
            ["pill", [pill[0] + 20, pill[1] + 10, pill[2] - 20, pill[3] - 10], [201, 214, 255]],
            ["header", [w * 0.3, m.header[1] + 20, w * 0.7, m.header[1] + 60], [246, 248, 251]],
          ] as [string, number[], number[]][],
        },
      );
      expect(worst.h1, "headline").toBeGreaterThanOrEqual(4.5);
      expect(worst.lead, "lead").toBeGreaterThanOrEqual(7);
      expect(worst.facts, "facts").toBeGreaterThanOrEqual(7);
      expect(worst.pill, "brand-200 text on the pill").toBeGreaterThanOrEqual(7);
      expect(worst.header, "header nav area").toBeGreaterThanOrEqual(12);
    });
  }
});

/* ------------------------------------------------------------------ G */

test.describe("hero status and keyboard", () => {
  test("has exactly one live region, inside the bar", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-hero-bar] [aria-live]")).toHaveCount(1);
    await expect(page.locator("[data-hero] [aria-live]")).toHaveCount(1);
  });

  test("screen readers get the status once, with the check count", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-hero-bar] [aria-live]")).toHaveText("Example application status: Approved", { timeout: 10_000 });
    const snapshot = await page.locator("[data-hero-bar]").ariaSnapshot();
    expect(snapshot).toContain("Underwriting checks: 4 of 4 complete.");
    expect(snapshot.match(/Approved/g)?.length, snapshot).toBe(1);
    expect(snapshot.match(/Example application/g)?.length, snapshot).toBe(1);
  });

  test("Replay keeps focus and restarts the example", async ({ page }) => {
    await page.goto("/");
    const live = page.locator("[data-hero-bar] [aria-live]");
    await expect(live).toHaveText("Example application status: Approved", { timeout: 10_000 });
    const replay = page.getByRole("button", { name: "Replay the underwriting example" });
    await replay.focus();
    await page.keyboard.press("Enter");
    await expect(replay).toBeFocused();
    await expect(live).toHaveText("Example application status: Underwriting in progress");
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("Replay is not offered", async ({ page }) => {
      await page.goto("/");
      await expect(page.getByRole("button", { name: "Replay the underwriting example" })).toBeHidden();
    });
  });

  test("tab order runs header, bar, then the foot CTAs (short desktop)", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop order");
    await page.setViewportSize({ width: 1536, height: 730 });
    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "Apply now" }).focus();
    const order: string[] = [];
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      order.push(
        await page.evaluate(() => {
          const a = document.activeElement!;
          const where = a.closest("[data-hero-bar]") ? "bar" : a.closest("[data-hero]") ? "foot" : "other";
          return `${where}: ${a.getAttribute("aria-label") ?? a.textContent?.trim()}`;
        }),
      );
    }
    expect(order).toEqual([
      "bar: Talk to an expert",
      "bar: Call (844) 365-3050",
      "bar: Replay the underwriting example",
      "foot: Apply now",
      "foot: Talk to an expert",
    ]);
  });

  test("tab order on a portrait desktop layout skips the bar's CTA copy", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop order");
    await page.setViewportSize({ width: 1024, height: 1366 });
    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "Apply now" }).focus();
    const order: string[] = [];
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press("Tab");
      order.push(
        await page.evaluate(() => {
          const a = document.activeElement!;
          const where = a.closest("[data-hero-bar]") ? "bar" : a.closest("[data-hero]") ? "foot" : "other";
          return `${where}: ${a.getAttribute("aria-label") ?? a.textContent?.trim()}`;
        }),
      );
    }
    expect(order).toEqual(["bar: Replay the underwriting example", "foot: Apply now", "foot: Talk to an expert"]);
  });
});

/* ------------------------------------------------------------------ G2 */

test.describe("hero robustness", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");

  test("Windows contrast themes: no line overlap and no floating terminal text", async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
    await open(page, 1536, 730);
    const r = await page.evaluate(() => ({
      lineHeight: parseFloat(getComputedStyle(document.querySelector("h1")!).lineHeight),
      F: parseFloat(getComputedStyle(document.querySelector("h1")!).fontSize),
      terminal: getComputedStyle(document.querySelector(".hero-terminal-window")!).display,
    }));
    expect(r.lineHeight / r.F).toBeGreaterThanOrEqual(1);
    expect(r.terminal).toBe("none");
  });

  test("user text spacing keeps every bar control inside the pill and the letters above the terminal", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    for (const [w, h] of [
      [1024, 768],
      [1280, 720],
    ]) {
      await open(page, w, h);
      await page.addStyleTag({
        content: "* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }",
      });
      await settle(page);
      const r = await page.evaluate(() => {
        const pill = document.querySelector("[data-hero-bar] > div")!.getBoundingClientRect();
        const kids = [...document.querySelectorAll<HTMLElement>("[data-hero-bar] > div a, [data-hero-bar] > div button")]
          .filter((el) => el.offsetParent)
          .map((el) => el.getBoundingClientRect());
        const z = (s: string) => Number(getComputedStyle(document.querySelector(s)!).zIndex);
        return {
          inside: kids.length > 0 && kids.every((k) => k.left >= pill.left && k.right <= pill.right && k.right <= innerWidth),
          h1Above: z(".hero-display") > z(".hero-terminal-window"),
        };
      });
      expect(r.inside, `bar controls inside the pill at ${w}`).toBe(true);
      expect(r.h1Above, "h1 paints above the terminal").toBe(true);
    }
  });

  test("a late display font does not move the terminal or the CTAs", async ({ page }) => {
    await page.route(/\.woff2(\?.*)?$/, async (route) => {
      await new Promise((r) => setTimeout(r, 1500));
      await route.continue();
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);
    const before = await page.locator(".hero-terminal-window").evaluate((el) => el.getBoundingClientRect().top);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    const after = await page.locator(".hero-terminal-window").evaluate((el) => el.getBoundingClientRect().top);
    near(after, before, 1, "terminal window top across the font swap");
  });
});

/* ------------------------------------------------------------------ H */

const ENTRANCE = ["hero-glow-in", "hero-glow-rise", "hero-word-up", "hero-word-left", "hero-word-right", "hero-device-in", "hero-shade-off", "hero-bar-in", "rise"];

test.describe("hero motion", () => {
  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("shows final states without entrance animations", async ({ page }) => {
      await page.goto("/");
      for (const selector of [".hero-word", ".hero-terminal-anim", ".hero-glow"]) {
        const names = await page.locator(selector).evaluateAll((els) => els.map((el) => getComputedStyle(el).animationName));
        expect(names.every((n) => n === "none"), selector).toBe(true);
      }
    });

    test("shows the approved example before hydration", async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce", viewport: { width: 1536, height: 730 } });
      const page = await context.newPage();
      await page.goto("/");
      await expect(page.locator('[data-hero-bar] [data-status-cell="approved"]')).toHaveCSS("opacity", "1");
      await expect(page.locator('[data-hero-bar] [data-status-cell="progress"]')).toHaveCSS("opacity", "0");
      await expect(page.locator("[data-hero-bar] .hero-pre-final")).toBeVisible();
      await context.close();
    });
  });

  test("entrance is CSS, transform and opacity only, and done by 1.8s", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await page.waitForTimeout(200);
    const opacities = await page.locator(".hero-word").evaluateAll((els) => els.map((el) => Number(getComputedStyle(el).opacity)));
    expect(opacities.every((o) => o > 0), "headline visible 200ms after load").toBe(true);

    const anims = await page.evaluate((names) => {
      return document
        .querySelector("[data-hero]")!
        .getAnimations({ subtree: true })
        .filter((a): a is CSSAnimation => "animationName" in a && names.includes((a as CSSAnimation).animationName))
        .map((a) => ({
          name: a.animationName,
          end: Number(a.effect!.getComputedTiming().endTime),
          props: [
            ...new Set(
              (a.effect as KeyframeEffect)
                .getKeyframes()
                .flatMap((k) => Object.keys(k))
                .filter((p) => !["offset", "computedOffset", "easing", "composite"].includes(p)),
            ),
          ],
        }));
    }, ENTRANCE);
    for (const a of anims) {
      expect(a.end, `${a.name} length`).toBeLessThanOrEqual(1800);
      expect(a.props.every((p) => p === "transform" || p === "opacity"), `${a.name} animates ${a.props.join(", ")}`).toBe(true);
    }
  });
});
