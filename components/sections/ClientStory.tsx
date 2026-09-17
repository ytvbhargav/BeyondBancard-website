import Link from "next/link";
import { Confirm, DEMO_MODE } from "@/components/ui/confirm";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { href } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { ClientStory as Story } from "@/content/client-stories";
import type { NavLink } from "@/types/content";

type Flag = { confirm?: boolean; note: string };
type FileLabels = { industry: string; related: string };

/** Unconfirmed content shows in demo mode only and is omitted in production, as in FaqSection (D-042). */
export const shown = (flag: Flag) => !flag.confirm || DEMO_MODE;

/*
 * Quote sizes (D-054). The featured story is set a clear step larger than the rest: fluid from 24px on
 * phones to 44px (the type-h2 size) from 1280px, against 21px to 34px. The quote mark is sized in em,
 * so it scales with its quote.
 */
const quoteSize = {
  featured: "text-[clamp(1.5rem,0.952rem+2.247vw,2.75rem)] leading-[1.2]",
  story: "text-[clamp(1.3125rem,0.99rem+1.41vw,2.125rem)] leading-[1.3]",
};

/*
 * Client file rows (D-001), set like the contact file on /contact-us: a muted label column at least 4.5rem
 * wide, 15px values, hairlines between rows, 44px rows. The label sits above the value only when the file is
 * too narrow for the longest industry name beside it (a container query), so a value never wraps.
 */
function Row({ label, dark, children }: { label: React.ReactNode; dark: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("col-span-full grid grid-cols-subgrid items-start border-t first:border-t-0", dark && "border-ink-800")}>
      <dt
        className={cn(
          "type-small flex items-center pt-2.5 @[17rem]:min-h-11 @[17rem]:pt-0",
          dark ? "text-on-dark-muted" : "text-muted",
        )}
      >
        {label}
      </dt>
      <dd className="min-w-0 text-[0.9375rem] font-medium">{children}</dd>
    </div>
  );
}

/** Internal link value: brand colour at rest (a lighter brand tint on ink), underline drawn on hover. No arrow, as in the contact file. */
function ValueLink({ link, dark }: { link: NavLink; dark: boolean }) {
  return (
    <Link
      href={href(link.href)}
      className={cn("link-draw-parent inline-flex min-h-11 min-w-11 items-center", dark ? "text-brand-300" : "text-brand-700")}
    >
      <span className="link-draw">{link.label}</span>
    </Link>
  );
}

const headingId = (story: Story) => `story-${story.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/**
 * One client story (D-054): the quote set large in Archivo as the page's visual, with a small client file
 * beside it from 1024px and below it on narrower screens. The quote, name, role and company are the
 * testimonial exactly as supplied (PRD §9.8). The company name heads the file and names the figure.
 */
export function ClientStory({
  story,
  labels,
  context,
  featured = false,
}: {
  story: Story;
  labels: FileLabels;
  context: Flag;
  /** The first story: on ink, with the quote set a step larger. */
  featured?: boolean;
}) {
  const dark = featured;
  const id = headingId(story);

  return (
    <figure aria-labelledby={id} className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      {/* From 1280px the quote mark hangs in its own page column (inner grid with the outer gap); below that
          it sits above the quote, so the quote keeps the full width of its columns. Quote and file split 8/4
          from 1280px and 7/5 from 1024px, where four columns are too narrow for the file. */}
      <Reveal
        className={cn(
          "font-display lg:col-span-7 xl:col-span-8 xl:grid xl:grid-cols-8 xl:gap-x-8",
          featured ? quoteSize.featured : quoteSize.story,
        )}
      >
        <span
          aria-hidden
          className={cn(
            "-mb-[0.3em] block font-extrabold text-brand-600 select-none xl:mb-0",
            featured ? "text-[3.75em]" : "text-[3.5em]",
            // After the size: tailwind-merge drops a line-height that comes before a font size
            "leading-[0.75]",
          )}
        >
          “
        </span>
        <blockquote
          className={cn(
            "font-semibold tracking-[-0.01em] [font-stretch:104%] xl:col-span-7",
            featured ? "max-w-[27ch]" : "max-w-[30ch]",
            dark ? "text-on-dark" : "text-ink-900",
          )}
        >
          {/* Balanced, so a display-size quote has an even rag and no one-word last line. Chromium balances up
              to six lines (every story but the featured one); longer quotes wrap as usual. */}
          <p className="text-balance">{story.quote}</p>
        </blockquote>
      </Reveal>

      <figcaption className="lg:col-span-5 xl:col-span-4">
        <Reveal
          delay={0.1}
          className={cn("@container rounded-md border", dark ? "border-ink-800 bg-ink-950" : "border-line bg-surface")}
        >
          {/* A file as wide as the page (768 to 1023px) sets the client beside the rows instead of above them */}
          <div className="grid @[36rem]:grid-cols-2">
            <div className="px-6 pt-5 pb-4 @[36rem]:pb-5">
              <h3 id={id} className={cn("type-h4", dark ? "text-on-dark" : "text-ink-900")}>
                {story.company}
              </h3>
              <p className={cn("type-small mt-1", dark ? "text-on-dark-muted" : "text-muted")}>
                <span className={cn("font-medium", dark ? "text-on-dark" : "text-ink-900")}>{story.name}</span>, {story.role}
              </p>
            </div>
            <div className={cn("@container border-t px-6 py-1 @[36rem]:border-t-0 @[36rem]:border-l", dark && "border-ink-800")}>
              <dl className="grid grid-cols-1 @[17rem]:grid-cols-[minmax(4.5rem,auto)_minmax(0,1fr)] @[17rem]:gap-x-3">
                {shown(context) && (
                  <Row
                    dark={dark}
                    label={
                      <>
                        {labels.industry}
                        {/* The marker sits beside the label, never around it, so the label survives in production */}
                        {context.confirm && (
                          <Confirm note={context.note} variant="marker">
                            {null}
                          </Confirm>
                        )}
                      </>
                    }
                  >
                    <ValueLink link={story.industry} dark={dark} />
                  </Row>
                )}
                {story.related && (
                  <Row label={labels.related} dark={dark}>
                    <ValueLink link={story.related} dark={dark} />
                  </Row>
                )}
              </dl>
            </div>
          </div>
        </Reveal>
      </figcaption>
    </figure>
  );
}

/**
 * The stories in page order: the first featured on ink, the rest on paper split by hairlines. One labelled
 * region with a visually hidden heading, so each company name is an h3 under it. The page redirects in
 * production until display permission is confirmed, so this never renders an empty region.
 */
export function ClientStories({
  title,
  stories,
  labels,
  context,
}: {
  title: string;
  stories: Story[];
  labels: FileLabels;
  context: Flag;
}) {
  if (stories.length === 0) return null;
  const [featured, ...rest] = stories;

  return (
    <section aria-labelledby="client-stories-title">
      <h2 id="client-stories-title" className="sr-only">
        {title}
      </h2>
      <Section tone="ink" className="relative isolate overflow-hidden">
        <div aria-hidden className="page-hero-dark absolute inset-0 -z-10" />
        <ClientStory story={featured} labels={labels} context={context} featured />
      </Section>

      {rest.length > 0 && (
        <Section tone="paper">
          <div className="divide-y divide-line">
            {rest.map((story) => (
              <div key={story.name} className="py-14 first:pt-0 last:pb-0 md:py-20">
                <ClientStory story={story} labels={labels} context={context} />
              </div>
            ))}
          </div>
        </Section>
      )}
    </section>
  );
}
