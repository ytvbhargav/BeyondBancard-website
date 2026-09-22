import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/Reveal";
import { cta, ctaBandDefault } from "@/content/site";
import type { Cta } from "@/types/content";

/**
 * Closing call to action (PRD §8.6), one per page. Full-bleed dark band with
 * the hero's brand glow, so every page opens and closes on the same note.
 */
export function CtaBand({
  title = ctaBandDefault.title,
  body = ctaBandDefault.body,
  primary = cta.apply,
  secondary = cta.expert,
  primaryArrow = true,
}: {
  title?: string;
  body?: string;
  primary?: Cta;
  secondary?: Cta;
  /** The nudging arrow means "go somewhere"; turn it off for actions such as a mailto link. */
  primaryArrow?: boolean;
}) {
  // phone pass (D-063): py-16 below sm, one step above the 56px section rhythm (D-006) so the
  // band still reads as the closing moment without ~190px of empty dark into the footer.
  // sm:py-24 restores today's 96px; md and lg are unchanged.
  return (
    <section
      className="tone-dark relative isolate overflow-hidden bg-ink-900 py-16 sm:py-24 md:py-32 lg:py-40"
      aria-labelledby="cta-band-title"
    >
      <div aria-hidden className="cta-glow absolute inset-0 -z-10" />
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          {/* phone pass (D-063): one type step down below sm, matching PageHero's h1, so the default
              title sets as "Build a better / payments program." (2 lines, not 3 with two orphan
              words) at 375-430px. sm:type-h1 restores it. */}
          <h2 id="cta-band-title" className="type-h2 max-w-[18ch] text-on-dark sm:type-h1">
            {title}
          </h2>
          <p className="type-body-lg mt-6 max-w-[36rem] text-on-dark-muted">{body}</p>
          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={primary.href} arrow={primaryArrow}>
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="secondary-dark">
              {secondary.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
