import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BlockSection, type BlockProps, type BlockTone } from "@/components/sections/solution/BlockSection";
import { CardSpotlight } from "@/components/sections/solution/CardSpotlight";
import { href } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { CardsBlock } from "@/types/content";

type Card = CardsBlock["cards"][number];

/**
 * Linked cards (D-058): the solutions inside a hub, cost-reduction programs,
 * hardware families. Built for 2, 3, 4 or 6 cards: three or six run three
 * across from lg (six sit two across from md); two or four sit two across from
 * md. Any other count would leave a lone card on the last row.
 * Each card is one link with the SpotlightCard interaction (brand border, 2px
 * lift, pointer glow). Keyboard focus on the link gets the same lift, border
 * and arrow as hover. The h3's link stretches over the card, so the accessible
 * name is just the title and the focus ring outlines the whole card. The label
 * at the foot is a visual cue, as in BlogLead: it stays out of reading order
 * and the link reads it as its description. Card links are internal (spec C4),
 * so they always go through href().
 */
export function SolutionCards({ block, tone, headingId, index }: BlockProps<CardsBlock>) {
  const count = block.cards.length;
  const columns =
    count % 3 === 0 ? (count > 3 ? "md:grid-cols-2 lg:grid-cols-3" : "lg:grid-cols-3") : "md:grid-cols-2";

  return (
    <BlockSection block={block} tone={tone} headingId={headingId} index={index}>
      {/* Phone-only density pass (D-060): 12px between stacked cards below sm, the 16px gap unchanged
          from sm up — the same step the stacked comparison cards take, so both card lists match. */}
      <Stagger as="ul" className={cn("grid gap-3 sm:gap-4", columns)}>
        {block.cards.map((card, i) => (
          <StaggerItem as="li" key={card.title}>
            <SolutionCard card={card} tone={tone} cueId={`${headingId}-cue-${i + 1}`} />
          </StaggerItem>
        ))}
      </Stagger>
    </BlockSection>
  );
}

function SolutionCard({ card, tone, cueId }: { card: Card; tone: BlockTone; cueId: string }) {
  if (!card.link) return <PlainCard card={card} tone={tone} />;
  return (
    <div
      className={cn(
        // Phone-only density pass (D-060): 20px padding below sm, the p-6/p-8 steps unchanged from sm up
        "group/card link-draw-parent relative isolate flex h-full flex-col rounded-md border border-line p-5 sm:p-6 md:p-8",
        // Tailwind's translate utilities set `translate`, not `transform`
        "transition-[translate,border-color] duration-(--duration-fast) ease-out hover:-translate-y-0.5 hover:border-brand-600",
        // Keyboard focus on the stretched link lifts the card as hover does
        "has-focus-visible:-translate-y-0.5 has-focus-visible:border-brand-600",
        // Opposite to the section tone, so each card reads as an object on either background
        tone === "surface" ? "bg-paper" : "bg-surface",
      )}
    >
      <CardSpotlight />
      <h3 className="type-h3 text-ink-900">
        <Link
          href={href(card.link!.href)}
          aria-describedby={cueId}
          className={cn(
            "after:absolute after:inset-0 after:rounded-md",
            "focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-(--color-focus)",
          )}
        >
          {card.title}
        </Link>
      </h3>
      {/* A headline-scale line: balance it as the headings are, so a two-line tagline splits evenly */}
      {card.tagline && <p className="type-h4 mt-3 max-w-[30rem] text-balance text-ink-900">{card.tagline}</p>}
      <p className="mt-3 max-w-[30rem] text-muted">{card.body}</p>
      {card.detail && <Detail text={card.detail} />}
      {/* Hidden, so it isn't read twice; aria-describedby still reads a hidden element it points at */}
      {/* Phone-only density pass (D-060): the gap above the link row is 24px below sm, 32px from sm up */}
      <span aria-hidden className="mt-auto flex items-center justify-between gap-4 pt-6 sm:pt-8">
        <span className="font-semibold text-ink-900 transition-colors duration-(--duration-fast) group-hover/card:text-brand-700 group-has-focus-visible/card:text-brand-700">
          <span id={cueId} className="link-draw">
            {card.link!.label}
          </span>
        </span>
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-pill border border-line text-ink-900 transition-[background-color,border-color,color] duration-(--duration-fast)",
            "group-hover/card:border-brand-600 group-hover/card:bg-brand-600 group-hover/card:text-white",
            "group-has-focus-visible/card:border-brand-600 group-has-focus-visible/card:bg-brand-600 group-has-focus-visible/card:text-white",
          )}
        >
          <ArrowRight
            strokeWidth={1.75}
            className="size-4 transition-transform duration-(--duration-fast) group-hover/card:translate-x-px group-has-focus-visible/card:translate-x-px"
          />
        </span>
      </span>
    </div>
  );
}

/** A card with no onward page: the same object without the link, hover lift or cue row. */
function PlainCard({ card, tone }: { card: Card; tone: BlockTone }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-md border border-line p-5 sm:p-6 md:p-8",
        tone === "surface" ? "bg-paper" : "bg-surface",
      )}
    >
      <h3 className="type-h3 text-ink-900">{card.title}</h3>
      {card.tagline && <p className="type-h4 mt-3 max-w-[30rem] text-balance text-ink-900">{card.tagline}</p>}
      <p className="mt-3 max-w-[30rem] text-muted">{card.body}</p>
      {card.detail && <Detail text={card.detail} />}
    </div>
  );
}

/**
 * Small print under the body ("Best for: …"). A short "Label: value" reads as
 * a file row (D-001): the label in ink, the value muted, under a hairline.
 * Phone-only density pass (D-060): the hairline sits closer below sm; the
 * 20/16px steps return from sm up.
 */
function Detail({ text }: { text: string }) {
  const match = /^([^:]{1,24}):\s+(.+)$/.exec(text);
  return (
    <p className="type-small mt-4 border-t border-line pt-3 text-muted sm:mt-5 sm:pt-4">
      {match ? (
        <>
          <span className="font-semibold text-ink-900">{match[1]}:</span> {match[2]}
        </>
      ) : (
        text
      )}
    </p>
  );
}
