import { Container } from "@/components/ui/container";
import { RevealWords } from "@/components/motion/RevealWords";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";
import type { Step } from "@/types/content";

/**
 * How an account is opened and kept healthy. The steps run across the page on
 * one rule from lg, and down a rail below it, so the sequence is always whole:
 * nothing is cut off the side and nothing has to be swiped to be found.
 *
 * The rule and the nodes are drawn in CSS and the steps arrive in sequence
 * through the page's reveal observer, so the section needs no scripted motion
 * and reads the same without JavaScript.
 */
export function ProcessSteps({ id, title, lead, steps }: { id?: string; title: string; lead?: string; steps: Step[] }) {
  return (
    <section id={id} className="bg-surface" aria-labelledby="process-title">
      <Container className="section-y">
        <div className="max-w-[46rem]">
          <RevealWords as="h2" id="process-title" text={title} className="type-h2 max-w-[18ch]" />
          {lead && <p className="type-body-lg mt-5 text-pretty text-muted">{lead}</p>}
        </div>

        <Stagger
          as="ol"
          className={cn(
            "mt-12 grid gap-x-8 md:mt-16",
            // Two across on tablets, then one column per step from lg
            "md:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {steps.map((step, i) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="relative pt-10 pb-8 pl-8 md:pb-10 lg:pt-12 lg:pl-0"
            >
              {/* The rule: down the left below lg, across the top from lg */}
              <span
                aria-hidden
                className={cn(
                  "absolute bg-line",
                  "top-0 bottom-0 left-0 w-px lg:top-0 lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto",
                  i === 0 && "top-3 lg:top-0",
                  i === steps.length - 1 && "bottom-auto h-10 lg:h-px",
                )}
              />
              {/* The node where this step meets the rule */}
              <span
                aria-hidden
                className="absolute top-3 left-0 size-2.5 -translate-x-1/2 rounded-pill bg-brand-600 lg:top-0 lg:left-0 lg:-translate-y-1/2"
              />
              <p className="type-small tabular font-semibold text-brand-700">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="type-h4 mt-3 max-w-[16ch] text-balance text-ink-900">{step.title}</h3>
              <p className="mt-2 max-w-[28rem] text-pretty text-muted">{step.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
