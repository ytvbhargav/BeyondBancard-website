import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/Reveal";
import { RevealWords } from "@/components/motion/RevealWords";
import { cn } from "@/lib/utils";
import type { Feature } from "@/types/content";

/**
 * The argument of the page: each reality of the industry on the left, what
 * Beyond does about it on the right, one pair per row.
 *
 * The rows sit on the page's 12-column grid and share one rhythm, so the eye
 * reads straight down the two columns rather than tracking a moving stage.
 *
 * Each row is watched on its own rather than the list as a whole, so the
 * section fills in as it is read — the pair you have reached arrives, the ones
 * below it have not yet — and within a row the reality lands a beat before the
 * answer to it. The page's reveal observer does all of it in CSS, so nothing
 * here depends on JavaScript to be readable, and with reduced motion the
 * section is simply complete.
 */
export function RealityAnswer({
  title,
  problems,
  answers,
  problemLabel = "The reality",
  answerLabel = "What Beyond does",
}: {
  title: string;
  problems: Feature[];
  answers: Feature[];
  problemLabel?: string;
  answerLabel?: string;
}) {
  const pairs = problems.map((problem, i) => ({ problem, answer: answers[i] }));

  return (
    <section
      // Rises over the hero as the page scrolls: the hero is sticky, this is
      // above it, and the lifted edge and shadow are what make it read as one
      // surface sliding over another.
      className="relative z-10 rounded-t-[2rem] bg-ink-950 tone-dark shadow-[0_-24px_60px_-24px_rgb(0_0_0/0.75)] ring-1 ring-ink-800 md:rounded-t-[2.5rem]"
      aria-labelledby="pairs-title"
    >
      <Container className="section-y">
        {/* Header on the same grid as the rows below it */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <p className="type-small font-semibold tracking-[0.14em] text-brand-300 uppercase lg:col-span-5">
            {problemLabel}
          </p>
          <p className="hidden type-small font-semibold tracking-[0.14em] text-on-dark-muted uppercase lg:col-span-6 lg:col-start-7 lg:block">
            {answerLabel}
          </p>
          <RevealWords
            as="h2"
            id="pairs-title"
            text={title}
            className="mt-2 max-w-[20ch] type-h2 text-on-dark lg:col-span-5 lg:row-start-2"
          />
        </div>

        <ol className="mt-12 md:mt-16">
          {pairs.map(({ problem, answer }, i) => (
            <Reveal
              as="li"
              key={problem.title}
              className={cn(
                "grid gap-6 border-t border-ink-800 py-10 md:py-12 lg:grid-cols-12 lg:gap-8 lg:py-14",
                i === 0 && "border-t-0 pt-0 lg:pt-0",
              )}
            >
              {/* The reality */}
              <div className="lg:col-span-5">
                <span className="type-small font-semibold text-brand-300 tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 max-w-[18ch] type-h3 text-balance text-on-dark">{problem.title}</h3>
                <p className="mt-3 max-w-[32rem] text-pretty text-on-dark-muted">{problem.body}</p>
              </div>

              {/* What Beyond does about it */}
              {answer && (
                <Reveal delay={0.14} className="lg:col-span-6 lg:col-start-7">
                  <div className="h-full rounded-md border border-ink-800 bg-ink-900 p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      {answer.icon && (
                        <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-ink-950 text-brand-300">
                          <Icon name={answer.icon} className="size-5" />
                        </span>
                      )}
                      <div className="min-w-0">
                        {/* The pairing label, for the column that has no header below lg */}
                        <p className="type-small font-semibold tracking-[0.14em] text-on-dark-muted uppercase lg:hidden">
                          {answerLabel}
                        </p>
                        <h4 className="mt-1 type-h4 text-balance text-on-dark lg:mt-0">{answer.title}</h4>
                        <p className="mt-2 max-w-[34rem] text-pretty text-on-dark-muted">{answer.body}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
