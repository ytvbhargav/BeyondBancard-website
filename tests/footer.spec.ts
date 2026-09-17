import { expect, test, type Page } from "@playwright/test";
import { DEMO_ROUTES } from "./routes";

/**
 * Footer v2 acceptance checks (D-053). Geometry values were measured on the
 * production build. Sizes below 1024 run in the mobile project, the rest in
 * the desktop project.
 */

const GROUPS = [
  "Accept",
  "Protect",
  "Grow",
  "Operate",
  "Complex industries",
  "Everyday businesses",
  "Partners",
  "Resources",
  "Company",
  "Log in",
  "Legal",
];
const PARTNER_APPLY = `/coming-soon?from=${encodeURIComponent("/partners/isos-agents#apply")}`;

async function open(page: Page, width: number, height: number, route = "/") {
  await page.setViewportSize({ width, height });
  await page.goto(route);
  await page.evaluate(() => document.fonts.ready);
}

/** Scrolls the wordmark to the middle of the viewport. */
async function centerWordmark(page: Page) {
  await page.evaluate(() => {
    const wm = document.querySelector("[data-footer-wordmark]")!;
    const r = wm.getBoundingClientRect();
    window.scrollTo(0, r.top + window.scrollY - (window.innerHeight - r.height) / 2);
  });
  await page.waitForTimeout(150);
}

const near = (actual: number, expected: number, tolerance: number, label: string) =>
  expect(Math.abs(actual - expected), `${label}: ${actual.toFixed(2)} vs ${expected}`).toBeLessThanOrEqual(tolerance);

function contrast(a: string, b: string) {
  const lum = (c: string) => {
    const [r, g, bl] = c
      .match(/[\d.]+/g)!
      .slice(0, 3)
      .map(Number);
    const ch = (v: number) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(bl);
  };
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Layout boxes relative to the Container content box. */
function layout(page: Page) {
  return page.evaluate(() => {
    const footer = document.querySelector("[data-site-footer]")!;
    const container = footer.firstElementChild as HTMLElement;
    const cs = getComputedStyle(container);
    const left = container.getBoundingClientRect().left + parseFloat(cs.paddingLeft);
    const box = (el: Element | null) => {
      const b = el!.getBoundingClientRect();
      return {
        left: b.left - left,
        top: b.top,
        right: b.right - left,
        bottom: b.bottom,
        width: b.width,
        height: b.height,
      };
    };
    const shown = (el: Element) => el.getClientRects().length > 0;
    return {
      contentWidth: container.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
      footerHeight: footer.getBoundingClientRect().height,
      contact: box(footer.querySelector("[data-footer-contact]")),
      contactBlocks: [...footer.querySelector("[data-footer-contact]")!.children].map(box),
      nav: box(footer.querySelector("nav")),
      smallprint: box(footer.querySelector("[data-footer-smallprint]")),
      columns: [...footer.querySelectorAll("[data-footer-column]")].filter(shown).map(box),
      h2: [...footer.querySelectorAll("h2")].filter(shown).map((h) => h.textContent!.trim()),
      summaries: [...footer.querySelectorAll("summary")].filter(shown).map(box),
      lists: [...footer.querySelectorAll("nav > div:last-child > div")].filter(shown).map(box),
      detailsOpen: [...footer.querySelectorAll("details")].map((d) => d.open),
    };
  });
}

/* ------------------------------------------------------------ structure */

test.describe("footer structure", () => {
  for (const route of DEMO_ROUTES) {
    test(`landmarks, headings and links on ${route}`, async ({ page }) => {
      await page.goto(route);
      const footer = page.getByRole("contentinfo");
      await expect(footer).toHaveCount(1);
      await expect(footer).toHaveAttribute("data-site-footer");
      await expect(page.getByRole("navigation", { name: "Footer", exact: true })).toHaveCount(1);
      await expect(footer.locator("h1")).toHaveCount(0);
      await expect(footer.locator('a[href="#"], a[href=""], a:not([href])')).toHaveCount(0);

      const hrefs = await footer.locator("a[href]").evaluateAll((els) => els.map((e) => e.getAttribute("href")!));
      for (const h of hrefs.filter((h) => h.startsWith("/"))) {
        const path = h.split("#")[0].split("?")[0];
        expect((DEMO_ROUTES as readonly string[]).includes(path) || path === "/coming-soon", h).toBe(true);
      }
      expect(
        hrefs.filter((h) => h.includes("%2Fcoming-soon")),
        "no double-wrapped coming-soon links",
      ).toEqual([]);
      const partner = hrefs.filter((h) => h.includes("isos-agents%23apply"));
      expect(partner.length).toBeGreaterThan(0);
      expect(partner.every((h) => h === PARTNER_APPLY)).toBe(true);
    });
  }
});

/* --------------------------------------------------------------- layout */

test.describe("footer layout", () => {
  for (const [w, h] of [
    [1280, 720],
    [1440, 900],
    [1536, 730],
    [1920, 1080],
  ]) {
    test(`rail and three columns at ${w}x${h}`, async ({ page, isMobile }) => {
      test.skip(isMobile, "desktop size");
      await open(page, w, h);
      const m = await layout(page);
      expect(m.h2).toEqual(GROUPS);
      expect(m.columns).toHaveLength(3);
      [330, 630.7, 931.3].forEach((x, i) => near(m.columns[i].left, x, 1, `column ${i} left`));
      m.columns.forEach((c, i) => near(c.width, 268.7, 1, `column ${i} width`));
      near(m.contact.width, 290, 1, "rail width");
      near(m.smallprint.left, 0, 0.5, "small print left");
      expect(m.smallprint.top).toBeGreaterThan(m.contact.bottom);
      near(m.footerHeight, 1463, 20, "footer height");
      if (w === 1440) [912, 738, 624].forEach((ch, i) => near(m.columns[i].height, ch, 4, `column ${i} height`));
    });
  }

  test("stacked band, columns and small print at 1024x768", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop size");
    await open(page, 1024, 768);
    const m = await layout(page);
    expect(m.h2).toEqual(GROUPS);
    expect(m.columns).toHaveLength(3);
    m.columns.forEach((c, i) => near(c.width, 293.3, 1, `column ${i} width`));
    // The band uses the columns' grid: the address block starts on the second column's edge.
    near(m.contactBlocks[0].left, m.columns[0].left, 1, "contact block left");
    near(m.contactBlocks[1].left, m.columns[1].left, 1, "address block left");
    expect(m.nav.top).toBeGreaterThan(m.contact.bottom);
    expect(m.smallprint.top).toBeGreaterThan(m.nav.bottom);
    near(m.footerHeight, 1904, 20, "footer height");
  });

  test("accordions in two columns at 768x1024", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile size");
    await open(page, 768, 1024);
    const m = await layout(page);
    expect(m.columns).toHaveLength(0);
    expect(m.summaries).toHaveLength(11);
    expect(m.lists).toHaveLength(2);
    expect(m.lists[1].left).toBeGreaterThan(m.lists[0].right);
    near(m.footerHeight, 1237, 20, "footer height");
  });

  for (const [w, h, height] of [
    [390, 844, 1833],
    [360, 740, 1855],
  ]) {
    test(`one closed accordion list at ${w}x${h}`, async ({ page, isMobile }) => {
      test.skip(!isMobile, "mobile size");
      await open(page, w, h);
      const m = await layout(page);
      expect(m.columns).toHaveLength(0);
      expect(m.summaries).toHaveLength(11);
      expect(new Set(m.summaries.map((s) => Math.round(s.left))).size).toBe(1);
      expect(m.detailsOpen.every((o) => !o)).toBe(true);
      near(m.footerHeight, height, 20, "footer height");
    });
  }
});

/* ---------------------------------------------------------- tap targets */

test.describe("footer targets", () => {
  for (const [w, h] of [
    [390, 844],
    [360, 740],
  ]) {
    test(`44px targets and working accordions at ${w}x${h}`, async ({ page, isMobile }) => {
      test.skip(!isMobile, "mobile size");
      await open(page, w, h);
      const small = () =>
        page.locator("footer").evaluate((f) =>
          [...f.querySelectorAll("a, summary")]
            .filter((el) => el.getClientRects().length > 0)
            .map((el) => ({
              name: (el.textContent || el.getAttribute("aria-label") || "").trim(),
              ...el.getBoundingClientRect().toJSON(),
            }))
            .filter((b) => b.height < 44 || b.width < 44),
        );
      expect(await small()).toEqual([]);
      // The footer always shows the name next to the logo tile, even below 380px.
      await expect(
        page.locator("footer").getByRole("link", { name: "Beyond Bancard home" }).locator("span").last(),
      ).toBeVisible();

      const summary = page.locator("footer summary", { hasText: "Protect" });
      await summary.click();
      await expect(page.locator("footer").getByRole("link", { name: "Chargeback protection" })).toBeVisible();
      expect(await small()).toEqual([]);

      await summary.focus();
      await page.keyboard.press("Enter");
      await expect(
        page.locator("footer details").filter({ has: page.locator("summary", { hasText: "Protect" }) }),
      ).not.toHaveAttribute("open");
    });
  }

  test("touch tablets keep 44px footer targets at lg widths", async ({ browser, isMobile }) => {
    test.skip(isMobile, "desktop size");
    for (const [width, height] of [
      [1024, 768],
      [1366, 1024],
    ]) {
      const ctx = await browser.newContext({ viewport: { width, height }, isMobile: true, hasTouch: true });
      const page = await ctx.newPage();
      await page.goto("/");
      const r = await page.locator("footer").evaluate((f) => ({
        coarse: matchMedia("(pointer: coarse)").matches,
        small: [...f.querySelectorAll("a, summary")]
          .filter((el) => el.getClientRects().length > 0)
          .map((el) => ({
            name: (el.textContent || el.getAttribute("aria-label") || "").trim(),
            ...el.getBoundingClientRect().toJSON(),
          }))
          .filter((b) => b.height < 44 || b.width < 44),
      }));
      expect(r.coarse).toBe(true);
      expect(r.small, `${width}x${height}`).toEqual([]);
      await ctx.close();
    }
  });

  test("32px link rhythm for a mouse at 1440", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop size");
    await open(page, 1440, 900);
    const r = await page.locator("footer nav").evaluate((nav) => {
      const shown = [...nav.querySelectorAll("a")].filter((a) => a.getClientRects().length > 0);
      return {
        min: Math.min(...shown.map((a) => a.getBoundingClientRect().height)),
        rows: [...nav.querySelectorAll("ul a")]
          .filter((a) => a.getClientRects().length > 0)
          .map((a) => a.getBoundingClientRect().height),
      };
    });
    expect(r.min).toBeGreaterThanOrEqual(24);
    r.rows.forEach((row) => near(row, 32, 0.5, "list row"));
    const pills = await page
      .locator('footer a[aria-label$="(opens in a new tab)"]')
      .evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height));
    expect(pills).toEqual([44, 44, 44, 44]);
  });
});

/* ------------------------------------------------ external links, colour */

test("external footer links open in a new tab with a visible icon", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop size");
  await open(page, 1440, 900);
  const links = await page.locator("footer a[target=_blank]").evaluateAll((els) =>
    els.map((a) => ({
      visible: a.getClientRects().length > 0,
      rel: a.getAttribute("rel") ?? "",
      svg: !!a.querySelector("svg"),
      name: `${a.textContent} ${a.getAttribute("aria-label") ?? ""}`,
    })),
  );
  expect(links.filter((l) => l.visible)).toHaveLength(7);
  for (const l of links) {
    expect(l.rel, l.name).toContain("noopener");
    expect(l.rel, l.name).toContain("noreferrer");
    expect(l.svg, l.name).toBe(true);
    expect(l.name).toMatch(/opens (map )?in a new tab/);
  }
});

test("footer text and focus ring contrast", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop size");
  await open(page, 1440, 900);
  const bg = await page.locator("[data-site-footer]").evaluate((f) => getComputedStyle(f).backgroundColor);
  expect(bg).toBe("rgb(7, 16, 42)");
  const link = page.locator("footer nav").getByRole("link", { name: "Online payments" });
  const color = await link.evaluate((a) => getComputedStyle(a).color);
  const heading = await page
    .locator("footer nav h2")
    .first()
    .evaluate((h) => getComputedStyle(h).color);
  expect(contrast(color, bg)).toBeGreaterThanOrEqual(4.5);
  expect(contrast(heading, bg)).toBeGreaterThanOrEqual(7);
  // Phone, email and the address are all contact values: one colour for all of them.
  const values = await page
    .locator('footer address a[href^="tel:"], footer address a[href^="mailto:"], footer address a[target=_blank]')
    .evaluateAll((els) => [...new Set(els.map((a) => getComputedStyle(a).color))]);
  expect(values).toEqual([heading]);
  await link.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  const outline = await link.evaluate((a) => getComputedStyle(a).outlineColor);
  expect(contrast(outline, bg)).toBeGreaterThanOrEqual(3);
});

/* ------------------------------------------------------------- wordmark */

test.describe("footer wordmark geometry", () => {
  test.use({ reducedMotion: "reduce" });

  for (const [w, h, font, height, rows] of [
    [1920, 1080, 209.2, 234.3, 1],
    [1536, 730, 209.2, 234.3, 1],
    [1440, 900, 209.2, 234.3, 1],
    [1024, 768, 164.6, 184.3, 1],
    [768, 1024, 122.7, 137.5, 1],
    [390, 844, 113.0, 237.4, 2],
    [360, 740, 103.4, 217.0, 2],
  ] as const) {
    test(`fills the container edge to edge at ${w}x${h}`, async ({ page, isMobile }) => {
      test.skip(isMobile !== w < 1024, "size belongs to the other project");
      await open(page, w, h);
      await centerWordmark(page);
      const m = await page.evaluate(() => {
        const wm = document.querySelector<HTMLElement>("[data-footer-wordmark]")!;
        const container = document.querySelector("[data-site-footer]")!.firstElementChild!;
        const cs = getComputedStyle(container);
        const r = wm.getBoundingClientRect();
        const words = wm.querySelectorAll("p > span");
        return {
          left: r.left,
          right: r.right,
          top: r.top,
          width: r.width,
          height: r.height,
          contentWidth: container.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
          font: parseFloat(getComputedStyle(wm.querySelector("p")!).fontSize),
          stopRight: wm.querySelector("[data-wm-stop]")!.getBoundingClientRect().right,
          stopTop: wm.querySelector("[data-wm-stop]")!.getBoundingClientRect().top,
          beyond: words[0].getBoundingClientRect().toJSON(),
          bancard: words[1].getBoundingClientRect().toJSON(),
          ariaHidden: wm.getAttribute("aria-hidden"),
          focusables: wm.querySelectorAll("a, button, input, [tabindex]").length,
        };
      });
      near(m.width, m.contentWidth, 0.5, "wordmark width");
      expect(m.stopRight - m.right).toBeGreaterThanOrEqual(-1);
      expect(m.stopRight - m.right).toBeLessThanOrEqual(0.5);
      near(m.font, font, 0.3, "font size");
      near(m.height, height, 1, "block height");
      if (rows === 1) expect(m.stopTop).toBeLessThan(m.beyond.bottom);
      else expect(m.bancard.top).toBeGreaterThan(m.beyond.top + 0.8 * m.font);
      expect(m.ariaHidden).toBe("true");
      expect(m.focusables).toBe(0);

      // The stop's bottom edge is the text baseline itself (baseline alignment), so it never lands a pixel off.
      const baselineGap = await page.evaluate(() => {
        const d = document.querySelectorAll("[data-wm-letter]")[12].firstElementChild!;
        const probe = document.createElement("span");
        probe.style.cssText = "display:inline-block;width:0;height:0";
        d.appendChild(probe);
        const gap =
          document.querySelector("[data-wm-stop]")!.getBoundingClientRect().bottom -
          probe.getBoundingClientRect().bottom;
        probe.remove();
        return gap;
      });
      near(baselineGap, 0, 0.05, "stop bottom vs baseline");

      // Letter and stop ink touch both content edges and never overflow them. Fixed chrome is hidden:
      // the sticky CTA can still be on screen when a test jumps to the end before hydration.
      await page.addStyleTag({ content: "header, .fixed.bottom-0 { visibility: hidden !important; }" });
      const x = Math.max(0, Math.floor(m.left) - 40);
      const clip = {
        x,
        y: Math.floor(m.top) - 10,
        width: Math.min(w, Math.ceil(m.right) + 40) - x,
        height: Math.ceil(m.height) + 20,
      };
      const png = (await page.screenshot({ clip, scale: "css" })).toString("base64");
      const ink = await page.evaluate(async (b64) => {
        const img = new Image();
        img.src = `data:image/png;base64,${b64}`;
        await img.decode();
        const c = new OffscreenCanvas(img.width, img.height);
        const g = c.getContext("2d")!;
        g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, img.width, img.height).data;
        let min = Infinity,
          max = -1;
        for (let y = 0; y < img.height; y++)
          for (let px = 0; px < img.width; px++) {
            const i = (y * img.width + px) * 4;
            if (Math.max(d[i], d[i + 1], d[i + 2]) > 110) {
              min = Math.min(min, px);
              max = Math.max(max, px);
            }
          }
        return { min, max: max + 1 };
      }, png);
      const inkLeft = x + ink.min - m.left;
      const inkRight = m.right - (x + ink.max);
      expect(inkLeft, "left ink gap").toBeGreaterThanOrEqual(-0.5);
      expect(inkLeft, "left ink gap").toBeLessThanOrEqual(2);
      expect(inkRight, "right ink gap").toBeGreaterThanOrEqual(-0.5);
      expect(inkRight, "right ink gap").toBeLessThanOrEqual(2);
    });
  }

  test("never causes horizontal overflow", async ({ page, isMobile }) => {
    test.skip(isMobile, "width sweep runs in the desktop project");
    test.slow();
    // One load, then resize: the footer is CSS-only, and 12 cold loads timed out under a busy parallel run.
    await open(page, 320, 900);
    for (const w of [320, 360, 390, 479, 480, 640, 768, 1024, 1280, 1440, 1536, 1920]) {
      await page.setViewportSize({ width: w, height: 900 });
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const [scroll, client] = await page.evaluate(() => [
        document.documentElement.scrollWidth,
        document.documentElement.clientWidth,
      ]);
      expect(scroll, `scrollWidth at ${w}`).toBe(client);
    }
  });

  test("reduced motion shows the final wordmark without scrolling", async ({ page, isMobile }) => {
    await page.goto("/");
    const s = await page.locator("[data-footer-wordmark]").evaluate((wm) => {
      const stop = getComputedStyle(wm.querySelector("[data-wm-stop]")!);
      return {
        letters: [...wm.querySelectorAll("[data-wm-letter]")].map((e) => getComputedStyle(e).translate),
        stop: { opacity: stop.opacity, translate: stop.translate, scale: stop.scale },
      };
    });
    expect(s.letters).toHaveLength(13);
    expect(s.letters.every((t) => t === "none")).toBe(true);
    expect(s.stop).toEqual({ opacity: "1", translate: "none", scale: "none" });

    if (isMobile) return;
    await centerWordmark(page);
    await page.locator("[data-wm-letter]").nth(3).hover();
    await page.waitForTimeout(400);
    expect(
      await page
        .locator("[data-wm-letter] > span")
        .nth(3)
        .evaluate((e) => [getComputedStyle(e).translate, getComputedStyle(e).transform]),
    ).toEqual(["none", "none"]);
  });

  test("renders final when the JS bundles fail to load", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    // The head script still adds html.js, but RevealObserver never runs.
    await page.route(/\/_next\/static\/.*\.js(\?.*)?$/, (r) => r.abort());
    await page.goto("/", { waitUntil: "load" });
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
    const s = await page.locator("[data-footer-wordmark]").evaluate((wm) => ({
      js: document.documentElement.classList.contains("js"),
      letters: [...wm.querySelectorAll("[data-wm-letter]")].map((e) => getComputedStyle(e).translate),
      stopOpacity: getComputedStyle(wm.querySelector("[data-wm-stop]")!).opacity,
    }));
    expect(s.js).toBe(true);
    expect(s.letters.every((t) => t === "none")).toBe(true);
    expect(s.stopOpacity).toBe("1");
  });
});

test.describe("footer wordmark motion", () => {
  for (const [w, h] of [
    [1440, 900],
    [390, 844],
  ]) {
    test(`plays once when scrolled into view at ${w}x${h}`, async ({ page, isMobile }) => {
      test.skip(isMobile !== w < 1024, "size belongs to the other project");
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await open(page, w, h);
      // Waits in the page (round trips never skew the timing) until `ms` past data-shown, then reads.
      const read = (ms?: number) =>
        page.evaluate(async (ms) => {
          const win = window as unknown as { shownAt?: number };
          if (ms !== undefined)
            await new Promise<void>((resolve) => {
              const tick = () => (performance.now() - win.shownAt! >= ms ? resolve() : requestAnimationFrame(tick));
              tick();
            });
          const wm = document.querySelector("[data-footer-wordmark]")!;
          const stop = getComputedStyle(wm.querySelector("[data-wm-stop]")!);
          return {
            letters: [...wm.querySelectorAll("[data-wm-letter]")].map((e) => getComputedStyle(e).translate),
            stop: { opacity: stop.opacity, translate: stop.translate, scale: stop.scale },
            running: wm.getAnimations({ subtree: true }).length,
            shown: wm.querySelector("[data-footer-wordmark-trigger]")!.hasAttribute("data-shown"),
            top: wm.getBoundingClientRect().top,
            wmHeight: wm.getBoundingClientRect().height,
            footerHeight: document.querySelector("[data-site-footer]")!.getBoundingClientRect().height,
          };
        }, ms);

      // The hidden state exists only once RevealObserver watches the trigger, and lands 1.2s later.
      await expect(page.locator("[data-footer-wordmark-trigger]")).toHaveAttribute("data-observed", "");
      await page.waitForFunction(
        () =>
          getComputedStyle(document.querySelector("[data-wm-letter]")!).translate === "0px 105%" &&
          getComputedStyle(document.querySelector("[data-wm-stop]")!).opacity === "0",
      );
      const before = await read();
      expect(before.letters[0]).toBe("0px 105%");
      expect(before.stop.opacity).toBe("0");
      expect(before.top).toBeGreaterThan(h);
      expect(before.shown).toBe(false);

      await page.evaluate(() => {
        const trigger = document.querySelector("[data-footer-wordmark-trigger]")!;
        new MutationObserver(() => {
          if (trigger.hasAttribute("data-shown"))
            (window as unknown as { shownAt: number }).shownAt ??= performance.now();
        }).observe(trigger, { attributes: true });
        window.scrollTo(0, document.body.scrollHeight);
      });
      await expect(page.locator("[data-footer-wordmark-trigger]")).toHaveAttribute("data-shown", "", { timeout: 1000 });

      expect(
        (await read(300)).letters.some((t) => t !== "none"),
        "sequence still running at 300ms",
      ).toBe(true);

      const after = await read(1500);
      expect(after.letters.every((t) => t === "none")).toBe(true);
      expect(after.stop).toEqual({ opacity: "1", translate: "none", scale: "none" });
      expect(after.running).toBe(0);
      expect(after.footerHeight).toBe(before.footerHeight);
      expect(after.wmHeight).toBe(before.wmHeight);

      // The footer persists across client navigations: no replay.
      await page.locator("header").getByRole("link", { name: "Apply now" }).click();
      await expect(page).toHaveURL(/\/live-form$/);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(100);
      const again = await read();
      expect(again.shown).toBe(true);
      expect(again.letters.every((t) => t === "none")).toBe(true);
      expect(again.running).toBe(0);
    });
  }

  for (const [w, h] of [
    [1440, 900],
    [390, 844],
  ]) {
    test(`a reload at the page end never blanks the wordmark at ${w}x${h}`, async ({ page, isMobile }) => {
      test.skip(isMobile !== w < 1024, "size belongs to the other project");
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await open(page, w, h);
      const trigger = page.locator("[data-footer-wordmark-trigger]");
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await expect(trigger).toHaveAttribute("data-shown", "");
      await page.waitForTimeout(1500);

      // Per frame from the new document's first frame: is the wordmark in view, and is it final?
      await page.addInitScript(() => {
        const frames: { inView: boolean; final: boolean }[] = [];
        (window as unknown as { wmFrames: typeof frames }).wmFrames = frames;
        const t0 = performance.now();
        // A cancelled pending hide can leave "0px 0%" (no offset) before settling on "none".
        const still = (t: string) => t === "none" || t.split(" ").every((v) => parseFloat(v) === 0);
        const tick = () => {
          const wm = document.querySelector("[data-footer-wordmark]");
          if (wm) {
            const r = wm.getBoundingClientRect();
            const stop = getComputedStyle(wm.querySelector("[data-wm-stop]")!);
            frames.push({
              inView: r.top < innerHeight && r.bottom > 0,
              final:
                [...wm.querySelectorAll("[data-wm-letter]")].every((e) => still(getComputedStyle(e).translate)) &&
                stop.opacity === "1" &&
                still(stop.translate) &&
                (stop.scale === "none" || parseFloat(stop.scale) === 1),
            });
          }
          if (performance.now() - t0 < 4000) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      await page.reload();
      await expect(trigger).toHaveAttribute("data-shown", "");
      await page.waitForTimeout(1200);
      const frames = await page.evaluate(
        () => (window as unknown as { wmFrames: { inView: boolean; final: boolean }[] }).wmFrames,
      );
      const firstFinal = frames.findIndex((f) => f.inView && f.final);
      expect(firstFinal, "the restored scroll position shows the final wordmark").toBeGreaterThanOrEqual(0);
      expect(
        frames.slice(firstFinal).filter((f) => f.inView && !f.final),
        "no in-view frame hides a letter or the stop after the final wordmark was on screen",
      ).toEqual([]);
    });
  }

  for (const [w, h, route] of [
    [1440, 2560, "/"],
    [2560, 2880, "/"],
    [1440, 2560, "/coming-soon?from=%2Fnews"],
  ] as const) {
    test(`plays on a tall ${w}x${h} screen (${route})`, async ({ page, isMobile }) => {
      test.skip(isMobile, "desktop size");
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await open(page, w, h, route);
      const trigger = page.locator("[data-footer-wordmark-trigger]");
      await expect(trigger).toHaveAttribute("data-observed", "");
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      // The trigger stays above RevealObserver's ignored bottom 8% even at the very end of the page.
      await expect(trigger).toHaveAttribute("data-shown", "", { timeout: 1500 });
      await page.waitForTimeout(1500);
      const letters = await page
        .locator("[data-wm-letter]")
        .evaluateAll((els) => els.map((e) => getComputedStyle(e).translate));
      expect(letters.every((t) => t === "none")).toBe(true);
    });
  }

  test("hover hop lifts one letter and settles it back while the pointer stays", async ({ page, isMobile }) => {
    test.skip(isMobile, "fine pointers only");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await open(page, 1440, 900);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("[data-footer-wordmark-trigger]")).toHaveAttribute("data-shown", "");
    await page.waitForTimeout(1600);
    const font = await page
      .locator("[data-footer-wordmark] p")
      .evaluate((p) => parseFloat(getComputedStyle(p).fontSize));
    const stopBefore = await page.locator("[data-wm-stop]").boundingBox();

    // Inner-span offset from its static letter box, per frame, for letters 2, 3 and 4. The recorder starts
    // before the pointer moves, so a slow round trip under a busy parallel run can never miss the peak.
    const box = await page.locator("[data-wm-letter]").nth(3).boundingBox();
    await page.evaluate(() => {
      const L = [...document.querySelectorAll("[data-wm-letter]")];
      const off = (i: number) => L[i].firstElementChild!.getBoundingClientRect().top - L[i].getBoundingClientRect().top;
      const rows: number[][] = [];
      (window as unknown as { hopTrace: number[][] }).hopTrace = rows;
      const t0 = performance.now();
      const tick = () => {
        rows.push([off(2), off(3), off(4)]);
        if (performance.now() - t0 < 4000) requestAnimationFrame(tick);
      };
      tick();
    });
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.waitForTimeout(1000);
    const trace = await page.evaluate(() => [...(window as unknown as { hopTrace: number[][] }).hopTrace]);
    const peak = Math.min(...trace.map((r) => r[1]));
    near(peak, -0.06 * font, 1.5, "hovered letter peak");
    near(trace.at(-1)![1], 0, 0.5, "hovered letter back on the baseline while still hovered");
    expect(
      trace.flatMap((r) => [r[0], r[2]]).every((v) => Math.abs(v) < 0.01),
      "neighbours stay put",
    ).toBe(true);
    expect(await page.locator("[data-wm-stop]").boundingBox()).toEqual(stopBefore);

    // Pointer-out from a settled letter: nothing moves, everything rests.
    await page.mouse.move(4, 4);
    await page.waitForTimeout(500);
    const rest = await page
      .locator("[data-wm-letter]")
      .evaluateAll((els) =>
        els.map((e) => e.firstElementChild!.getBoundingClientRect().top - e.getBoundingClientRect().top),
      );
    expect(rest.every((v) => Math.abs(v) < 0.01)).toBe(true);
  });

  test("forced colours keep the stop visible", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop only");
    await page.emulateMedia({ forcedColors: "active" });
    await open(page, 1440, 900);
    const [stop, footer] = await page.evaluate(() => [
      getComputedStyle(document.querySelector("[data-wm-stop]")!).backgroundColor,
      getComputedStyle(document.querySelector("[data-site-footer]")!).backgroundColor,
    ]);
    expect(stop).not.toBe("rgba(0, 0, 0, 0)");
    expect(stop).not.toBe(footer);
  });
});

test.describe("footer text zoom", () => {
  for (const [w, h] of [
    [1440, 900],
    [1024, 768],
    [768, 1024],
    [360, 740],
  ] as const) {
    test(`200% text stays inside the content box at ${w}x${h}`, async ({ page, isMobile }) => {
      test.skip(isMobile !== w < 1024, "size belongs to the other project");
      await open(page, w, h);
      // Text-only zoom: the root font size doubles, the viewport does not change.
      await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const r = await page.locator("[data-site-footer]").evaluate((footer) => {
        const container = footer.firstElementChild!;
        const cs = getComputedStyle(container);
        const box = container.getBoundingClientRect();
        const left = box.left + parseFloat(cs.paddingLeft);
        const right = box.right - parseFloat(cs.paddingRight);
        const outside: string[] = [];
        const walker = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (!node.textContent!.trim() || node.parentElement!.closest("[data-footer-wordmark], .sr-only")) continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          for (const rect of range.getClientRects())
            if (rect.width && (rect.left < left - 1 || rect.right > right + 1))
              outside.push(
                `${node.textContent!.trim().slice(0, 32)} ${Math.round(rect.left)}-${Math.round(rect.right)}`,
              );
        }
        const name = footer
          .querySelector('a[aria-label="Beyond Bancard home"] > span:last-child')!
          .getBoundingClientRect();
        const overlaps = [...footer.querySelectorAll("h2, [data-footer-contact] p")]
          .filter((el) => el.getClientRects().length > 0)
          .filter((el) => {
            const b = el.getBoundingClientRect();
            return b.left < name.right && b.right > name.left && b.top < name.bottom && b.bottom > name.top;
          })
          .map((el) => el.textContent!.trim());
        return { outside, overlaps };
      });
      // Footer text only: other sections of the page are outside this check.
      expect(r.outside).toEqual([]);
      expect(r.overlaps).toEqual([]);
    });
  }
});

test("sticky mobile CTA hides at the footer", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/industries");
  const bar = page.locator(".fixed.bottom-0").getByRole("link", { name: "Apply now" });
  await page.mouse.wheel(0, 900);
  await expect(bar).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(bar).toBeHidden();
});
