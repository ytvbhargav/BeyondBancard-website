import { CreditCard, LayoutDashboard, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { ChipLink } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { PillarStack } from "@/components/motion/PillarStack";
import { PillarVisual } from "@/components/illustrations/PillarVisual";
import type { SolutionColumn } from "@/content/site";
import type { Pillar } from "@/types/content";

const ICONS: Record<Pillar, LucideIcon> = {
  Accept: CreditCard,
  Protect: ShieldCheck,
  Grow: TrendingUp,
  Operate: LayoutDashboard,
};

/** Each panel's glow sits in a different corner so the stack reads as separate sheets. */
const GLOW = ["pillar-glow-a", "pillar-glow-b", "pillar-glow-c", "pillar-glow-d"];

/**
 * Pillars (S4). A dark showcase section: four large panels that stack on
 * scroll on large screens (PillarStack) and swipe on small screens.
 */
export function PillarsSection({
  title,
  lead,
  items,
}: {
  title: string;
  lead: string;
  items: SolutionColumn[];
}) {
  return (
    <section className="section-y tone-dark bg-ink-950" aria-labelledby="pillars-title">
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
            const Icon = ICONS[p.pillar];
            return (
              <article
                key={p.pillar}
                data-card
                aria-labelledby={`pillar-${p.pillar}`}
                className="relative isolate h-full origin-top overflow-hidden rounded-lg border border-ink-800 bg-ink-900 will-change-transform lg:h-[min(34rem,calc(100svh-10rem))]"
              >
                <div aria-hidden className={`${GLOW[i % GLOW.length]} absolute inset-0 -z-10`} />
                <div aria-hidden data-shade className="pointer-events-none absolute inset-0 z-20 bg-ink-950 opacity-0" />

                {/* Phone-only density pass (D-060): p-5 and gap-6 below sm; sm and up keep p-8 / gap-8. */}
                <div className="grid h-full content-start gap-6 p-5 sm:gap-8 sm:p-8 lg:grid-cols-2 lg:content-center lg:items-center lg:gap-14 lg:p-14">
                  <div className="lg:order-2">
                    {/* Phone-only density pass (D-060): the icon sits on the heading's line below sm and stacks above it from sm, as before. */}
                    <div className="flex items-center gap-3 sm:block">
                      <span
                        aria-hidden
                        className="grid size-10 shrink-0 place-items-center rounded-sm bg-brand-600 text-white sm:size-12"
                      >
                        <Icon strokeWidth={1.75} className="size-5 sm:size-6" />
                      </span>
                      <h3 id={`pillar-${p.pillar}`} className="type-h2 mt-0 text-on-dark sm:mt-6">
                        <TextLink href={p.href} className="font-bold">
                          {p.pillar}
                        </TextLink>
                      </h3>
                    </div>
                    {/* Phone-only density pass (D-060): type-body (16px) and a tighter top margin below sm. */}
                    <p className="type-body mt-2 text-on-dark-muted sm:type-body-lg sm:mt-3">{p.descriptor}.</p>
                    {/* Phone-only density pass (D-060): tighter list margin and gap below sm. The chips keep their 44px target. */}
                    <ul className="mt-5 flex flex-wrap gap-1.5 sm:mt-7 sm:gap-2">
                      {p.links.map((l) => (
                        <li key={l.href}>
                          <ChipLink href={l.href} tone="dark">
                            {l.label}
                          </ChipLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center lg:order-1">
                    <PillarVisual pillar={p.pillar} />
                  </div>
                </div>
              </article>
            );
          })}
        </PillarStack>
      </Container>
    </section>
  );
}
