import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MaybeConfirm } from "@/components/ui/confirm";
import { Marquee } from "@/components/motion/Marquee";
import type { Confirmable } from "@/types/content";

/**
 * Credibility band (S3, D-066). The strip between the hero and Solutions keeps
 * its scrolling line; what scrolls has changed. It used to carry sponsor banks
 * and gateways, which matter operationally but not to a merchant choosing a
 * processor, and the required ISO/MSP disclosure now appears only in the
 * footer. In their place: a few merchant-facing reasons to trust Beyond.
 *
 * It is a transition as much as a section. The hero and Solutions are both
 * ink-950, so the band lifts a little blue at its top edge and closes back to
 * ink-950 at its foot, carrying the hero's light out rather than cutting it
 * off. Narrow on purpose: one line high, no cards, no heading, no metrics.
 */
export function TrustStrip({ items }: { items: Confirmable<string>[] }) {
  return (
    <section aria-label="Why merchants choose Beyond Bancard" className="relative isolate bg-ink-950 tone-dark">
      {/* Brightest under the hero and gone by the foot. Both stops carry the
          ink-950 hue: a gradient run to `transparent` interpolates through grey
          in oklab and would wash the navy out. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_180%_at_50%_-60%,var(--color-brand-900)_0%,var(--color-ink-950)_70%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-brand-400/0 via-brand-400/35 to-brand-400/0"
      />

      <Container className="py-3.5">
        <Marquee
          tone="dark"
          label="Why merchants choose Beyond Bancard"
          items={items.map((item) => (
            <span key={item.value} className="flex items-center gap-2.5 whitespace-nowrap">
              <Check aria-hidden strokeWidth={2.25} className="size-4 shrink-0 text-brand-300" />
              <span className="type-small font-medium text-on-dark">
                <MaybeConfirm item={item}>{item.value}</MaybeConfirm>
              </span>
            </span>
          ))}
        />
      </Container>
    </section>
  );
}
