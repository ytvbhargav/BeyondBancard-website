import { Button } from "@/components/ui/button";
import { ChipLink } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { PillarStack } from "@/components/motion/PillarStack";
import Image from "next/image";
import { home } from "@/content/home";
import type { SolutionColumn } from "@/content/site";
import { cn } from "@/lib/utils";

/** Each panel's glow sits in a different corner so the stack reads as separate sheets. */
const GLOW = ["pillar-glow-a", "pillar-glow-b", "pillar-glow-c", "pillar-glow-d"];

/**
 * Pillars (S4). A dark showcase section: four large panels that stack on
 * scroll on large screens (PillarStack) and swipe on small screens.
 */
export function PillarsSection({ title, lead, items }: { title: string; lead: string; items: SolutionColumn[] }) {
  return (
    <section className="bg-ink-950 section-y tone-dark" aria-labelledby="pillars-title">
      <Container>
        {/* Phone-only density pass (D-060): 32px under the lead below sm; sm keeps today's 40px and md its 56px. */}
        <SectionHeader
          id="pillars-title"
          title={title}
          lead={lead}
          tone="dark"
          align="center"
          className="mb-8 sm:mb-10"
        />
        <PillarStack label="Accept, Protect, Grow and Operate">
          {items.map((p, i) => {
            const card = home.pillarCards[p.pillar];
            // Accept and Grow carry the art on the left, Protect and Operate on
            // the right, so the eye crosses the card as the sequence advances.
            const artLeft = i % 2 === 0;
            return (
              <article
                key={p.pillar}
                data-card
                aria-labelledby={`pillar-${p.pillar}`}
                className="relative isolate h-full origin-top overflow-hidden rounded-lg border border-ink-800 bg-ink-900 will-change-transform lg:h-[min(34rem,calc(100svh-10rem))]"
              >
                <div aria-hidden className={`${GLOW[i % GLOW.length]} absolute inset-0 -z-10`} />
                <div
                  aria-hidden
                  data-shade
                  className="pointer-events-none absolute inset-0 z-20 bg-ink-950 opacity-0"
                />

                {/* To the approved card design (D-065): the art fills one half
                    of the card and the story fills the other, and the two swap
                    sides card to card so the four read as a sequence. The
                    stacking scroll and the panel itself are unchanged. */}
                <div
                  className={cn(
                    "grid h-full content-start gap-6 p-5 sm:gap-8 sm:p-8 lg:grid-cols-2 lg:content-center lg:items-center lg:gap-14 lg:p-14",
                    artLeft ? "lg:pl-[calc(50%+3.5rem)]" : "lg:pr-[calc(50%+3.5rem)]",
                  )}
                >
                  <div className={cn("lg:col-span-2", artLeft ? "lg:col-start-1" : "lg:col-start-1")}>
                    {/* The chapter mark: a rule, the number and what the pillar does */}
                    <p className="flex items-center gap-3">
                      <span aria-hidden className="h-px w-8 bg-sky-400" />
                      <span className="type-small font-semibold tracking-[0.14em] text-on-dark-muted uppercase">
                        <span className="text-on-dark">{card.index}</span> / {card.eyebrow}
                      </span>
                    </p>

                    <h3 id={`pillar-${p.pillar}`} className="mt-5 text-[clamp(2.5rem,4.4vw,4rem)]/[1] font-extrabold tracking-[-0.02em] text-on-dark">
                      <TextLink href={p.href} className="font-extrabold">
                        {p.pillar}
                      </TextLink>
                    </h3>

                    <p className="mt-4 type-h4 font-semibold text-on-dark">{p.descriptor}.</p>
                    <p className="mt-4 max-w-[46ch] type-body text-pretty text-on-dark-muted">{card.body}</p>

                    <ul className="mt-7 flex flex-wrap gap-1.5 sm:gap-2">
                      {p.links.map((l) => (
                        <li key={l.href}>
                          <ChipLink href={l.href} tone="dark">
                            {l.label}
                          </ChipLink>
                        </li>
                      ))}
                    </ul>

                    <Button href={p.href} variant="inverse" arrow className="mt-8">
                      Explore {p.pillar}
                    </Button>
                  </div>
                </div>

                {/* The artwork: pinned to its half of the card, bleeding to
                    every edge, and fading into the side the story sits on. */}
                <div
                  className={cn(
                    // inset-x-0 pins both edges for the stacked layout; at lg
                    // the side that is not being used has to be released, or
                    // left:0 wins and every card puts its art on the left.
                    "pointer-events-none absolute inset-x-0 top-0 h-56 overflow-hidden sm:h-72 lg:inset-y-0 lg:h-auto lg:w-1/2",
                    artLeft ? "lg:right-auto lg:left-0" : "lg:left-auto lg:right-0",
                  )}
                >
                  <Image
                    src={card.art}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-0 bg-linear-to-b from-ink-900/0 from-55% to-ink-900",
                      artLeft
                        ? "lg:bg-linear-to-r lg:from-ink-900/0 lg:from-72% lg:to-ink-900"
                        : "lg:bg-linear-to-l lg:from-ink-900/0 lg:from-72% lg:to-ink-900",
                    )}
                  />
                </div>
              </article>
            );
          })}
        </PillarStack>
      </Container>
    </section>
  );
}
