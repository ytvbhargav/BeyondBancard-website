import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RevealWords } from "@/components/motion/RevealWords";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * What keeps an account healthy: the signals listed as a numbered ledger beside
 * the heading, each ticking in after the one before it. Server-rendered, with
 * the stagger handled by the page's reveal observer, so the list is complete and
 * legible without JS and with reduced motion.
 */
export function FitCheck({ title, lead, items }: { title: string; lead?: string; items: string[] }) {
  return (
    <section className="bg-paper" aria-labelledby="fitcheck-title">
      <Container className="section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <p className="type-small font-semibold tracking-[0.18em] text-brand-700 uppercase">
                {items.length} signals
              </p>
              <RevealWords as="h2" id="fitcheck-title" text={title} className="mt-5 max-w-[16ch] type-h2" />
              {lead && <p className="mt-5 max-w-[30rem] type-body-lg text-muted">{lead}</p>}
            </div>
          </div>

          <Stagger as="ol" className="lg:col-span-6 lg:col-start-7">
            {items.map((item, i) => (
              <StaggerItem
                as="li"
                key={item}
                className="flex items-start gap-4 border-t border-line py-5 first:border-t-0 first:pt-0 sm:gap-6 sm:py-6"
              >
                <span className="mt-1 w-6 shrink-0 type-small font-semibold text-muted tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-pill bg-success-600 text-white"
                >
                  <Check strokeWidth={3} className="size-3.5" />
                </span>
                <span className="max-w-[34rem] type-body-lg text-pretty text-ink-900">{item}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
