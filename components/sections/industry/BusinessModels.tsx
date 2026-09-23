import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealWords } from "@/components/motion/RevealWords";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { businessModels } from "@/content/site";

/**
 * The business models an industry covers: the eyebrow names the list, one
 * heading carries it across every industry, and the models themselves are the
 * content.
 *
 * It is the one light band in the run of dark sections between the hero and the
 * process, which is what gives the page somewhere to breathe and the models
 * their own weight.
 */
export function BusinessModels({
  title,
  chips,
  disclaimer,
}: {
  /** Names the list, as the eyebrow over the shared heading. */
  title: string;
  chips: string[];
  disclaimer: string;
}) {
  return (
    <section className="bg-surface" aria-labelledby="models-title">
      <Container className="section-y text-center">
        <Reveal as="p" className="type-small font-semibold tracking-[0.16em] text-brand-700 uppercase">
          <span aria-hidden>— </span>
          {title.replace(/\.$/, "")}
        </Reveal>

        <RevealWords
          as="h2"
          id="models-title"
          text={businessModels.heading}
          className="mx-auto mt-5 max-w-[20ch] type-h2 text-balance"
        />

        <Stagger
          as="ul"
          // Wrapped rather than gridded, so an industry with an odd number of
          // models ends on a centred card instead of a gap.
          className="model-board mx-auto mt-12 flex max-w-[68rem] flex-wrap justify-center gap-4 text-left"
        >
          {chips.map((chip, i) => (
            <StaggerItem
              as="li"
              key={chip}
              className="model-card relative isolate flex min-h-[9.5rem] w-full flex-col justify-between overflow-hidden rounded-md border border-line bg-paper p-6 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
            >
              <span aria-hidden className="model-card-wash absolute inset-0 -z-10" />
              <span className="flex items-center gap-3">
                <span className="type-small font-semibold text-brand-700 tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="model-card-rule h-px w-6 bg-line-strong" />
              </span>
              <span className="mt-8 type-h4 text-balance text-ink-900">{chip}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal as="p" className="mt-8 type-small text-muted">
          {disclaimer}
        </Reveal>
      </Container>
    </section>
  );
}
