import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Behaviour of the Company and Resources pages (D-054) and the first page of the
 * Industries and Partners menus (D-057). The generic checks (200, one h1, links,
 * axe) already run over tests/routes.ts; this file covers what each page does.
 */

// A route's first compile on the dev server can take a while.
test.describe.configure({ timeout: 90_000 });

/**
 * Resolves once React has hydrated the element: hydrated DOM nodes carry React's
 * internal props key, so its event handlers are attached from here on.
 */
async function hydrated(locator: Locator) {
  await expect
    .poll(() => locator.evaluate((el) => Object.keys(el).some((k) => k.startsWith("__reactProps$"))), {
      message: "element is hydrated",
      timeout: 30_000,
    })
    .toBe(true);
}

/**
 * Desktop pages scroll with Lenis once the main thread is idle (touch devices and reduced
 * motion never load it). Waiting for it makes in-page jumps take the Lenis path every run.
 */
async function smoothScrollReady(page: Page, isMobile: boolean) {
  if (!isMobile) await expect(page.locator("html")).toHaveClass(/(^|\s)lenis(\s|$)/, { timeout: 15_000 });
}

/** Bottom edge of the sticky site header, in viewport pixels. */
async function headerBottom(page: Page) {
  const box = await page.getByRole("banner").boundingBox();
  return box ? box.y + box.height : 0;
}

/** Polls until the element's top sits just below the sticky header (anchor jumps honour scroll-padding-top). */
async function expectBelowHeader(page: Page, target: Locator) {
  await expect
    .poll(
      async () => {
        const bottom = await headerBottom(page);
        const top = await target.evaluate((el) => el.getBoundingClientRect().top);
        return top >= bottom - 1 && top <= bottom + 80;
      },
      { message: "target lands just below the sticky header", timeout: 10_000 },
    )
    .toBe(true);
}

/* --------------------------------- Contact --------------------------------- */

test.describe("contact /contact-us", () => {
  // The need's title is read after the label from a visually hidden span. Chrome computes
  // "Message us about this : {title}" (the absolutely positioned span adds a space), so the space is optional here.
  const messageUs = (page: Page, need: string) =>
    page.getByRole("button", { name: new RegExp(`^Message us about this ?: ${need}$`) });

  test("a directory button sets the form topic and moves focus to the first field", async ({ page, isMobile }) => {
    await page.goto("/contact-us");
    const button = messageUs(page, "Partner with Beyond");
    await hydrated(button);
    await smoothScrollReady(page, isMobile);

    const firstName = page.locator("#contact-firstName");
    // The form registers its topic handler in an effect just after hydration: retry the press until it lands.
    await expect(async () => {
      await button.click();
      await expect(firstName).toBeFocused({ timeout: 1_000 });
    }).toPass({ timeout: 15_000 });

    const card = page.locator("#contact-form");
    await expect(page.locator("#contact-topic")).toHaveText("Partner with Beyond");
    await expect(card.getByText("Topic: Partner with Beyond", { exact: true })).toBeVisible();
    await expect(card.locator(':scope > p[aria-live="polite"]')).toHaveText("Topic: Partner with Beyond.");
    await expect(card).toBeInViewport();

    // Another need replaces the topic.
    await messageUs(page, "Work at Beyond").click();
    await expect(page.locator("#contact-topic")).toHaveText("Work at Beyond");
    await expect(firstName).toBeFocused();
  });

  test("submitting empty shows inline errors and focuses the first invalid field", async ({ page }) => {
    await page.goto("/contact-us");
    const submit = page.getByRole("button", { name: "Send message" });
    await hydrated(submit);
    await submit.click();

    const form = page.locator("#contact-form");
    for (const message of [
      "Enter your first name.",
      "Enter your last name.",
      "Enter an email, like name@company.com.",
      "Choose what your message is about.",
      "Enter a message of at least 10 characters.",
    ]) {
      await expect(form.getByText(message)).toBeVisible();
    }
    // Phone is optional: no error while it is blank.
    await expect(form.getByText("Enter a full phone number with area code, or leave this blank.")).toHaveCount(0);

    const firstName = page.locator("#contact-firstName");
    await expect(firstName).toBeFocused();
    await expect(firstName).toHaveAttribute("aria-invalid", "true");
    await expect(firstName).toHaveAttribute("aria-describedby", "contact-firstName-error");

    // Errors re-validate on change: fixing a field clears its error.
    await firstName.fill("Dana");
    await expect(form.getByText("Enter your first name.")).toHaveCount(0);
    await expect(firstName).toHaveAttribute("aria-invalid", "false");
    // The next submit focuses the new first invalid field.
    await submit.click();
    await expect(page.locator("#contact-lastName")).toBeFocused();
  });

  test("a valid message sends, shows success without any network request, and resets", async ({ page }) => {
    await page.goto("/contact-us");
    const submit = page.getByRole("button", { name: "Send message" });
    await hydrated(submit);

    await page.locator("#contact-firstName").fill("Dana");
    await page.locator("#contact-lastName").fill("Reyes");
    await page.locator("#contact-email").fill("dana@example.com");
    await page.locator("#contact-phone").fill("(555) 555-0100");
    await page.locator("#contact-businessName").fill("Acme Supplements LLC");
    await page.locator("#contact-topic").click();
    await page.getByRole("option", { name: "Something else" }).click();
    await expect(page.locator("#contact-topic")).toHaveText("Something else");
    await page.locator("#contact-message").fill("Please call me about processing for my store.");

    // Record every request from the submit on. Dev-server and framework noise is same-origin GETs only:
    // static chunks, HMR and dev endpoints, and router prefetches (?_rsc=) for links scrolled into view.
    const origin = new URL(page.url()).origin;
    const requests: string[] = [];
    page.on("request", (r) => {
      const url = new URL(r.url());
      const noise =
        r.method() === "GET" &&
        url.origin === origin &&
        (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/__nextjs") || url.searchParams.has("_rsc"));
      if (!noise) requests.push(`${r.method()} ${r.url()}`);
    });

    await submit.click();

    const sending = page.getByRole("button", { name: "Sending…" });
    await expect(sending).toBeVisible();
    await expect(sending).toHaveAttribute("aria-disabled", "true");
    await expect(page.locator("#contact-firstName")).toBeDisabled();

    const heading = page.getByRole("heading", { level: 2, name: "Message sent." });
    await expect(heading).toBeVisible({ timeout: 5_000 });
    await expect(heading).toBeFocused();
    await expect(heading).toHaveAccessibleDescription("Thanks, Dana. We've received your message.");
    await expect(page.locator("#contact-form").getByText("Demo only — no data is sent.")).toBeVisible();
    expect(requests, "no data is sent anywhere").toEqual([]);

    await page.getByRole("button", { name: "Send another message" }).click();
    const firstName = page.locator("#contact-firstName");
    await expect(firstName).toBeFocused();
    await expect(firstName).toHaveValue("");
    await expect(page.locator("#contact-message")).toHaveValue("");
    await expect(page.locator("#contact-topic")).toHaveText("Choose a topic");
    await expect(page.getByRole("button", { name: "Send message" })).toBeEnabled();
    expect(requests, "no data is sent anywhere").toEqual([]);
  });
});

/* ----------------------------------- FAQ ----------------------------------- */

test.describe("faq /faq", () => {
  const TOPIC_IDS = ["accounts", "high-risk", "nutra", "adult", "security", "partners"];
  const topicSection = (page: Page, id: string) => page.locator(`main section#${id}`);

  test("has an Adult topic", async ({ page }) => {
    await page.goto("/faq");
    const adult = topicSection(page, "adult");
    await expect(adult).toBeVisible();
    await expect(adult.getByRole("heading", { level: 2 })).toHaveText("Adult");
    await expect(adult.locator('[data-slot="accordion-trigger"]').first()).toBeVisible();
  });

  test("search filters, highlights, counts and hides empty topics; the empty state clears", async ({ page }) => {
    await page.goto("/faq");
    const search = page.getByRole("searchbox", { name: "Search questions" });
    await hydrated(search);

    const form = page.getByRole("search");
    const live = form.locator('p[aria-live="polite"]');
    // The visible count beside the label (the live region repeats some of its wording).
    const shownCount = form.locator("p:not([aria-live])");
    const questions = page.locator('main [data-slot="accordion-trigger"]');
    const total = await questions.count();
    expect(total).toBeGreaterThan(0);
    await expect(shownCount).toHaveText(`${total} questions`);
    await expect(live).toHaveText(`${total} questions`);

    // "chargeback" matches one High-risk answer, one Nutra question and two Adult questions.
    await search.fill("chargeback");
    await expect(questions).toHaveCount(4);
    await expect(shownCount).toHaveText("4 matches");
    // The live region waits for typing to settle.
    await expect(live).toHaveText("4 questions match “chargeback”");

    for (const id of ["high-risk", "nutra", "adult"]) await expect(topicSection(page, id)).toBeVisible();
    for (const id of ["accounts", "security", "partners"]) await expect(topicSection(page, id)).toHaveCount(0);

    const marks = page.locator("main mark");
    await expect(marks.first()).toBeVisible();
    for (const text of await marks.allTextContents()) expect(text.toLowerCase()).toBe("chargeback");
    await expect(topicSection(page, "nutra").locator('[data-slot="accordion-trigger"] mark')).toHaveText("chargeback");
    // Matches open automatically from three letters, so highlighted answers show too.
    await expect(topicSection(page, "high-risk").locator('[data-slot="accordion-content"] mark')).toBeVisible();

    // No match: the empty state, and its button restores every topic.
    await search.fill("zzqxj");
    const empty = page.locator("main p:not([aria-live])").filter({ hasText: /^No questions match/ });
    await expect(empty).toHaveText("No questions match “zzqxj”.");
    await expect(empty).toBeVisible();
    await expect(questions).toHaveCount(0);
    for (const id of TOPIC_IDS) await expect(topicSection(page, id)).toHaveCount(0);
    await expect(live).toHaveText("No questions match “zzqxj”.");

    // The field's own clear button has only an icon; the empty state's button has the text.
    await page.getByRole("button", { name: "Clear search" }).filter({ hasText: "Clear search" }).click();
    await expect(search).toHaveValue("");
    await expect(search).toBeFocused();
    await expect(questions).toHaveCount(total);
    for (const id of TOPIC_IDS) await expect(topicSection(page, id)).toBeVisible();
    await expect(page.locator("main mark")).toHaveCount(0);
    await expect(empty).toHaveCount(0);
    await expect(shownCount).toHaveText(`${total} questions`);
    await expect(live).toHaveText(`${total} questions`);
  });
});

/* ------------------------------- Blog index -------------------------------- */

test.describe("blog index /news", () => {
  test("category chips filter the list and update the live status", async ({ page }) => {
    await page.goto("/news");
    const chips = page.getByRole("group", { name: "Filter by category" });
    const all = chips.getByRole("button", { name: /^All\b/ });
    const peptide = chips.getByRole("button", { name: /^Peptide payment\b/ });
    await hydrated(peptide);

    const list = page.locator('section[aria-labelledby="articles-title"]');
    const rows = list.locator("article");
    const status = list.locator('p[aria-live="polite"]');

    await expect(all).toHaveAttribute("aria-pressed", "true");
    await expect(peptide).toHaveAttribute("aria-pressed", "false");
    await expect(rows).toHaveCount(11);
    await expect(status).toHaveText("Showing 11 recent articles");
    await expect(list.getByRole("link", { name: "Older articles" })).toBeVisible();

    await peptide.click();
    await expect(peptide).toHaveAttribute("aria-pressed", "true");
    await expect(all).toHaveAttribute("aria-pressed", "false");
    await expect(rows).toHaveCount(3);
    for (const row of await rows.all()) {
      await expect(row.getByRole("list", { name: "Categories" })).toContainText("Peptide payment");
    }
    await expect(status).toHaveText("Showing 3 of 11 recent articles in Peptide payment");
    await expect(status).toBeVisible();
    await expect(list.getByRole("link", { name: "Older articles" })).toHaveCount(0);

    // Another chip moves the pressed state.
    const pos = chips.getByRole("button", { name: /^POS systems\b/ });
    await pos.click();
    await expect(pos).toHaveAttribute("aria-pressed", "true");
    await expect(peptide).toHaveAttribute("aria-pressed", "false");
    await expect(rows).toHaveCount(3);
    await expect(status).toHaveText("Showing 3 of 11 recent articles in POS systems");

    // "Show all recent articles" resets and returns focus to the All chip.
    await list.getByRole("button", { name: "Show all recent articles" }).click();
    await expect(all).toHaveAttribute("aria-pressed", "true");
    await expect(all).toBeFocused();
    await expect(rows).toHaveCount(11);
    await expect(status).toHaveText("Showing 11 recent articles");
  });

  test("the lead article links to its post", async ({ page }) => {
    await page.goto("/news");
    const lead = page.locator("main article").first();
    const link = lead.getByRole("link", { name: "When to question your processor or seek a review" });
    await expect(lead.getByRole("heading", { level: 2 })).toHaveText(
      "When to question your processor or seek a review",
    );
    await expect(lead.getByText("Latest", { exact: true })).toBeVisible();
    // Only one article page is in the demo, so the newest post goes through coming-soon with its path.
    await expect(link).toHaveAttribute(
      "href",
      `/coming-soon?from=${encodeURIComponent("/news/when-to-question-your-processor-or-seek-a-review")}`,
    );
    await link.click();
    await expect(page).toHaveURL(/\/coming-soon\?from=/);
    await expect(page.getByText("/news/when-to-question-your-processor-or-seek-a-review")).toBeVisible();

    // The one demo article in the list links straight to its page.
    await page.goto("/news");
    await expect(
      page.getByRole("link", { name: "What is a high-risk merchant account and how does it work?" }),
    ).toHaveAttribute("href", "/news/what-is-a-high-risk-merchant-account-and-how-does-it-work");
  });
});

/* --------------------------------- Article --------------------------------- */

test.describe("article /news/what-is-a-high-risk-merchant-account-and-how-does-it-work", () => {
  const ARTICLE = "/news/what-is-a-high-risk-merchant-account-and-how-does-it-work";

  /** The visible "On this page" list: the sticky rail from lg, the collapsible list below it. */
  async function contents(page: Page, isMobile: boolean) {
    if (isMobile) {
      const toc = page.locator("details").filter({ has: page.locator("summary", { hasText: "On this page" }) });
      await toc.locator("summary").click();
      await expect(toc).toHaveAttribute("open", "");
    }
    return page.getByRole("navigation", { name: "On this page" });
  }

  test("contents links jump to their sections below the sticky header", async ({ page, isMobile }) => {
    await page.goto(ARTICLE);
    const nav = await contents(page, isMobile);
    const link = nav.getByRole("link", { name: "Fees, chargebacks, and risk management" });
    await hydrated(link);
    await smoothScrollReady(page, isMobile);

    await link.click();
    await expect(page).toHaveURL(/#fees-chargebacks-and-risk-management$/);
    const heading = page.locator("h2#fees-chargebacks-and-risk-management");
    await expect(heading).toBeInViewport();
    await expectBelowHeader(page, heading);

    // A second jump, back up the page.
    await nav.getByRole("link", { name: "Why some businesses are classified as high risk" }).click();
    await expect(page).toHaveURL(/#why-some-businesses-are-classified-as-high-risk$/);
    await expectBelowHeader(page, page.locator("h2#why-some-businesses-are-classified-as-high-risk"));
  });

  test("the current-section marker follows scrolling", async ({ page, isMobile }) => {
    test.skip(isMobile, "the contents rail is desktop only");
    await page.goto(ARTICLE);
    const rail = await contents(page, false);
    const current = rail.locator('a[aria-current="true"]');
    await hydrated(rail.getByRole("link").first());

    /** Scrolls so the heading sits just under the header, past the 40% reading line. */
    const scrollToHeading = (id: string) =>
      page.evaluate((headingId) => {
        const el = document.getElementById(headingId)!;
        window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 120);
      }, id);

    await scrollToHeading("how-to-apply-for-a-high-risk-merchant-account");
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText("How to apply for a high-risk merchant account");

    await scrollToHeading("why-some-businesses-are-classified-as-high-risk");
    await expect(current).toHaveText("Why some businesses are classified as high risk");
    await expect(rail.getByRole("link", { name: "How to apply for a high-risk merchant account" })).not.toHaveAttribute(
      "aria-current",
      "true",
    );
  });
});

/* --------------------------------- Careers --------------------------------- */

test.describe("careers /careers", () => {
  test("every role opens its posting in a new tab and says so", async ({ page, context }) => {
    await page.goto("/careers");
    const roles = page.locator('section[aria-labelledby="open-roles"]').getByRole("link");
    await expect(roles.first()).toBeVisible();
    const count = await roles.count();
    expect(count).toBeGreaterThan(0);
    await expect(page.getByText(`${count} roles on Indeed`)).toBeVisible();

    for (const role of await roles.all()) {
      await expect(role).toHaveAttribute("target", "_blank");
      await expect(role).toHaveAttribute("rel", /\bnoopener\b/);
      await expect(role).toHaveAccessibleName(/\S View on Indeed \(opens in a new tab\)$/);
      await expect(role).toHaveAttribute("href", /^https:\/\/www\.indeed\.com\//);
    }
    await expect(roles.first()).toHaveAccessibleName("Junior Underwriter View on Indeed (opens in a new tab)");

    // The posting opens in a new tab (served locally, so the test never reaches Indeed).
    await context.route(/^https:\/\/www\.indeed\.com\//, (route) =>
      route.fulfill({ contentType: "text/html", body: "<title>Posting</title>" }),
    );
    const [popup] = await Promise.all([page.waitForEvent("popup"), roles.first().click()]);
    await expect(popup).toHaveURL(/indeed\.com\/job\/junior-underwriter/);
    await expect(page).toHaveURL(/\/careers$/);
    await popup.close();
  });

  test('"See open roles" moves to #open-roles', async ({ page, isMobile }) => {
    await page.goto("/careers");
    const link = page.getByRole("link", { name: "See open roles" });
    await hydrated(link);
    await smoothScrollReady(page, isMobile);
    await link.click();

    await expect(page).toHaveURL(/\/careers#open-roles$/);
    const heading = page.locator("h2#open-roles");
    await expect(heading).toBeFocused();
    await expect(heading).toBeInViewport();
    await expectBelowHeader(page, heading);
  });
});

/* --------------------------- Sticky mobile CTA ------------------------------ */

test.describe("sticky mobile CTA", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  const bar = (page: Page) =>
    page.locator("div.fixed.bottom-0").filter({ has: page.getByRole("link", { name: "Apply now" }) });

  /** Scrolls well past the bar's threshold (40% of the first viewport) and waits for the page to react. */
  async function scrollPastHero(page: Page) {
    const header = page.getByRole("banner");
    await hydrated(header);
    await page.mouse.wheel(0, 900);
    await expect.poll(() => page.evaluate(() => window.scrollY > window.innerHeight * 0.4)).toBe(true);
    // The header and the bar react to the same scroll event in one render.
    await expect(header).toHaveAttribute("data-scrolled", "true");
  }

  for (const route of ["/contact-us", "/careers"]) {
    test(`is absent on ${route} after scrolling`, async ({ page }) => {
      await page.goto(route);
      await scrollPastHero(page);
      await expect(bar(page)).toHaveCount(0);
      await expect(page.locator("html")).not.toHaveAttribute("data-sticky-cta");
    });
  }

  test("is present on /faq after scrolling past the hero", async ({ page }) => {
    await page.goto("/faq");
    await expect(bar(page)).toHaveCount(0);
    await scrollPastHero(page);
    await expect(bar(page)).toBeVisible();
    await expect(bar(page).getByRole("link", { name: "Call (844) 365-3050" })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-sticky-cta", "");
  });
});

/* --------------------------------- Partners -------------------------------- */

test.describe("partners /partners", () => {
  test("the three program cards are links titled by h3s", async ({ page }) => {
    await page.goto("/partners");
    const programs = page.locator('section[aria-labelledby="programs-title"]');
    await expect(programs.getByRole("heading", { level: 2 })).toHaveText("Choose your program.");

    const cards = programs.getByRole("link");
    await expect(cards).toHaveCount(3);
    const expected = [
      { title: "ISOs & agents", href: "/partners/isos-agents" },
      { title: "ISVs & platforms", href: `/coming-soon?from=${encodeURIComponent("/partners/isvs-platforms")}` },
      { title: "Associations", href: `/coming-soon?from=${encodeURIComponent("/partners/associations")}` },
    ];
    for (const [i, { title, href }] of expected.entries()) {
      const card = cards.nth(i);
      await expect(card.getByRole("heading", { level: 3 })).toHaveText(title);
      await expect(card).toHaveAttribute("href", href);
      await expect(card).toHaveAccessibleName(new RegExp(`^${title}`));
    }
  });

  test("the header starts in its dark tone, like ISOs & agents", async ({ page }) => {
    const headerTone = async (route: string) => {
      await page.goto(route);
      const header = page.getByRole("banner");
      await expect(header).toHaveAttribute("data-scrolled", "false");
      return {
        dark: await header.evaluate((el) => el.classList.contains("tone-dark")),
        background: await header.locator("[data-header-base]").evaluate((el) => {
          const style = getComputedStyle(el);
          return { color: style.backgroundColor, opacity: style.opacity };
        }),
      };
    };

    const reference = await headerTone("/partners/isos-agents");
    const light = await headerTone("/faq");
    const partners = await headerTone("/partners");

    expect(reference.dark).toBe(true);
    expect(partners).toEqual(reference);
    expect(partners.background.opacity).toBe("1");
    expect(partners.background.color).not.toBe(light.background.color);
    expect(light.dark).toBe(false);
  });
});

/* ------------------------ Industry detail template -------------------------- */

test.describe("industry detail template", () => {
  const dashboard = (page: Page) =>
    page.getByRole("figure", { name: "Illustration of a subscription revenue dashboard" });

  test("Adult shows its own hero illustration labels", async ({ page }) => {
    await page.goto("/industries/adult");
    const figure = dashboard(page);
    await expect(figure.getByText("Subscription content", { exact: true })).toBeVisible();
    await expect(figure.getByText("Recurring billing", { exact: true })).toBeVisible();
    await expect(figure.getByText("Supplement brand", { exact: true })).toHaveCount(0);
    await expect(figure.getByText("Auto-ship orders", { exact: true })).toHaveCount(0);
  });

  test("Nutra keeps its hero illustration labels", async ({ page }) => {
    await page.goto("/industries/nutra-supplements");
    const figure = dashboard(page);
    await expect(figure.getByText("Supplement brand", { exact: true })).toBeVisible();
    await expect(figure.getByText("Auto-ship orders", { exact: true })).toBeVisible();
    await expect(figure.getByText("Subscription content", { exact: true })).toHaveCount(0);
  });

  for (const route of ["/industries/adult", "/industries/nutra-supplements"]) {
    test(`capability tabs on ${route} follow the layout's orientation`, async ({ page, isMobile }) => {
      await page.goto(route);
      const tablist = page.getByRole("tablist", { name: "Capabilities by pillar" });
      const tabs = tablist.getByRole("tab");
      await hydrated(tabs.first());
      expect(await tabs.count()).toBeGreaterThan(1);

      // Vertical from lg, where the pillars stack; horizontal pills below it.
      await expect(tablist).toHaveAttribute("aria-orientation", isMobile ? "horizontal" : "vertical");

      await tabs.first().focus();
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
      await page.keyboard.press(isMobile ? "ArrowRight" : "ArrowDown");
      await expect(tabs.nth(1)).toBeFocused();
      await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
      await expect(tabs.first()).toHaveAttribute("aria-selected", "false");
    });
  }
});

/* ------------------------------ Reduced motion ------------------------------ */

test.describe("reduced motion shows revealed content without scrolling", () => {
  test.use({ reducedMotion: "reduce" });

  /** Opacity of every scroll-reveal block, and how many have not been revealed by scrolling. */
  const reveals = (page: Page) =>
    page.evaluate(() => {
      const els = [...document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger] > [data-stagger-item]")];
      const unshown = document.querySelectorAll("[data-reveal]:not([data-shown]), [data-stagger]:not([data-shown])");
      return {
        total: els.length,
        hidden: els.filter((el) => getComputedStyle(el).opacity === "0").map((el) => el.outerHTML.slice(0, 120)),
        unshown: unshown.length,
      };
    });

  for (const route of ["/about-beyond-bancard", "/our-clients"]) {
    test(route, async ({ page }) => {
      await page.goto(route);
      // Reveals only hide content once JS has marked the page.
      await expect(page.locator("html")).toHaveClass(/\bjs\b/);

      const state = await reveals(page);
      expect(state.total).toBeGreaterThan(0);
      // Blocks below the fold have not been scrolled to, and are still shown.
      expect(state.unshown).toBeGreaterThan(0);
      expect(state.hidden).toEqual([]);
      await expect(page.locator("[data-reveal]").last()).toHaveCSS("opacity", "1");

      // Control: with motion allowed, the same unscrolled blocks are hidden, so the check above is meaningful.
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await expect.poll(async () => (await reveals(page)).hidden.length).toBeGreaterThan(0);
    });
  }
});
