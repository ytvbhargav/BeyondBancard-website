import { Landmark } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MaybeConfirm } from "@/components/ui/confirm";
import { Marquee } from "@/components/motion/Marquee";
import type { Confirmable } from "@/types/content";

/** Sponsor banks and gateways (PRD §9.1.2, S3). */
export function TrustStrip({
  label,
  badges,
  stat,
}: {
  label: string;
  badges: Confirmable<string>[];
  stat?: Confirmable<string>;
}) {
  return (
    <section aria-label="Sponsor banks and technology partners" className="border-b border-line bg-surface">
      <Container className="grid items-center gap-6 py-8 lg:grid-cols-12 lg:gap-8">
        <div className="flex items-start gap-3 lg:col-span-4">
          <Landmark aria-hidden strokeWidth={1.75} className="mt-0.5 size-5 shrink-0 text-brand-600" />
          <div>
            <p className="type-small font-medium text-ink-900">{label}</p>
            {stat && (
              <p className="type-small tabular mt-1 text-muted">
                <MaybeConfirm item={stat}>{stat.value}</MaybeConfirm>
              </p>
            )}
          </div>
        </div>
        <Marquee
          className="lg:col-span-8"
          label="Sponsor banks and gateways"
          items={badges.map((b) => (
            <MaybeConfirm key={b.value} item={b}>
              <span className="font-display text-[1.0625rem] font-semibold whitespace-nowrap text-ink-800 [font-stretch:108%]">
                {b.value}
              </span>
            </MaybeConfirm>
          ))}
        />
      </Container>
    </section>
  );
}
