import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ColorField } from "@/components/motion/ColorField";
import { cta } from "@/content/site";

/**
 * The opening of the industries index. It shares the colour field with the
 * industry pages, so arriving on one of them afterwards feels like going
 * further into the same room — but it carries no photographs of its own: the
 * six industries are named here as a rail, and shown further down.
 *
 * The type animates in CSS, so the headline paints before hydration (it is the
 * LCP element) and the section is right with no JavaScript at all.
 */
export function IndustriesHero({
  title,
  lead,
  names,
}: {
  title: string;
  lead: string;
  /** The featured industries, as the rail that closes the section. */
  names: { name: string; href: string }[];
}) {
  return (
    <section className="relative isolate -mt-(--header-h) overflow-hidden bg-ink-950 tone-dark">
      <div aria-hidden className="page-hero-dark absolute inset-0 -z-20 opacity-80" />
      {/* Centred here rather than held to one side: this page has no picture to
          make room for, so the lake runs the width of the section. */}
      <ColorField className="-top-[30%] right-[-10%] bottom-[-40%] left-[-10%] -z-10" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950 from-10% via-ink-950/70 via-50% to-ink-950/0 to-90%"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [mask-image:radial-gradient(80%_60%_at_60%_0%,black,transparent)] [background-size:72px_72px] opacity-[0.05]"
      />

      <Container className="pt-[calc(var(--header-h)+4rem)] pb-16 md:pt-[calc(var(--header-h)+6rem)] md:pb-24 lg:pt-[calc(var(--header-h)+8rem)]">
        <div className="max-w-[52rem]">
          <p
            className="anim-rise type-small font-semibold tracking-[0.18em] text-brand-300 uppercase"
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            Industries
          </p>
          <h1
            className="anim-rise mt-5 max-w-[18ch] type-h1 text-balance text-on-dark"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            {title}
          </h1>
          <p
            className="anim-rise mt-6 max-w-[38rem] type-body-lg text-pretty text-on-dark-muted"
            style={{ "--delay": "170ms" } as React.CSSProperties}
          >
            {lead}
          </p>
          <div className="anim-rise mt-9" style={{ "--delay": "250ms" } as React.CSSProperties}>
            <Button href={cta.expert.href} arrow>
              Talk to a payments expert
            </Button>
          </div>
        </div>
      </Container>

      {/* The six the page is about, named before they are shown */}
      <div className="relative border-t border-ink-800 bg-ink-950">
        <Container className="flex flex-col gap-4 py-6 lg:flex-row lg:items-baseline lg:gap-10">
          <p className="shrink-0 type-small font-semibold tracking-[0.14em] text-brand-300 uppercase">
            Complex commerce
          </p>
          <ul className="-m-1 flex flex-wrap lg:flex-1">
            {names.map(({ name, href }) => (
              <li key={href} className="m-1">
                <a
                  href={href}
                  className="block rounded-pill border border-ink-800 px-3 py-1.5 type-small text-on-dark transition-colors duration-(--duration-fast) hover:border-brand-500 hover:text-brand-300"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
