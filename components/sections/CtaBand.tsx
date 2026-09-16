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
}: {
  title?: string;
  body?: string;
  primary?: Cta;
  secondary?: Cta;
}) {
  return (
    <section
      className="tone-dark relative isolate overflow-hidden bg-ink-900 py-24 md:py-32 lg:py-40"
      aria-labelledby="cta-band-title"
    >
      <div aria-hidden className="cta-glow absolute inset-0 -z-10" />
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <h2 id="cta-band-title" className="type-h1 max-w-[18ch] text-on-dark">
            {title}
          </h2>
          <p className="type-body-lg mt-6 max-w-[36rem] text-on-dark-muted">{body}</p>
          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={primary.href} arrow>
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
