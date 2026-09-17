"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChipLink } from "@/components/ui/chip";
import { Confirm, DEMO_MODE } from "@/components/ui/confirm";
import { Section } from "@/components/ui/section";
import { Highlighted, fill, plural, useFaqExplorer, type TopicResult } from "@/components/sections/FaqExplorer";
import { PHONE } from "@/lib/links";
import { cn } from "@/lib/utils";

/** A topic is current once its section top passes this share of the viewport height (as on the article rail). */
const READING_LINE = 0.4;

/**
 * FAQ answers grouped by topic (D-054). Desktop: a sticky topic rail with counts
 * on the left, one accordion per topic on the right. Below lg the rail becomes a
 * row of anchor chips above the answers while browsing. Counts, topics and open
 * answers all follow the search in the hero, whose count sits beside the field.
 */
export function FaqTopics() {
  const { topics, searching, count, term, copy, clear, resultsRef, openFor, setOpenFor } = useFaqExplorer();
  const shown = topics.filter((t) => t.items.length > 0);

  return (
    // Hero-adjacent, so a short top padding keeps the answers the search is filtering in the first view.
    <Section
      tone="surface"
      space="none"
      className="section-b pt-8 md:pt-10"
      containerClassName="lg:grid lg:grid-cols-12 lg:gap-8"
    >
      <div className="hidden lg:col-span-4 lg:block xl:col-span-3">
        <div className="sticky top-28">
          <TopicRail topics={topics} />
          <FaqHelp className="mt-12" />
        </div>
      </div>

      <div ref={resultsRef} className="lg:col-span-8 lg:col-start-5">
        {/* While searching, the topic headings already group the matches: the chips would only point at what is on screen. */}
        {!searching && <TopicChips topics={shown} />}

        <div className="space-y-14 md:space-y-16">
          {shown.map((topic) => {
            const title = <Highlighted text={topic.title} ranges={topic.titleRanges} />;
            return (
              <section
                key={topic.id}
                id={topic.id}
                aria-labelledby={`${topic.id}-title`}
                className="animate-in duration-(--duration-fast) fade-in-0"
              >
                <h2 id={`${topic.id}-title`} className="type-h3">
                  {/* Production mode hides a topic whose answers are all unconfirmed: flag it once, on the heading. */}
                  {DEMO_MODE && topic.unconfirmed ? (
                    <Confirm note={copy.topicNote} variant="marker">
                      {title}
                    </Confirm>
                  ) : (
                    title
                  )}
                </h2>
                <Accordion
                  type="multiple"
                  value={openFor(topic.id)}
                  onValueChange={(ids) => setOpenFor(topic.id, ids)}
                  className="mt-4 border-t border-line-strong"
                >
                  {topic.items.map(({ id, faq, q, a }) => (
                    <AccordionItem key={id} value={id} className="animate-in duration-(--duration-fast) fade-in-0">
                      <AccordionTrigger className="type-h4 text-ink-900">
                        <Highlighted text={faq.q} ranges={q} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="max-w-[34rem] text-muted">
                          {faq.confirm ? (
                            <Confirm note={faq.note ?? "FAQ answer"}>
                              <Highlighted text={faq.a} ranges={a} />
                            </Confirm>
                          ) : (
                            <Highlighted text={faq.a} ranges={a} />
                          )}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            );
          })}
        </div>

        {searching && count === 0 && (
          <div className="animate-in duration-(--duration-fast) fade-in-0">
            {/* The term is echoed back: a long address or URL must wrap, not widen the page. */}
            <p className="type-h3 wrap-anywhere">{fill(copy.count.none, { term })}</p>
            <p className="mt-2 max-w-[34rem] text-muted">{copy.empty.body}</p>
            <Button variant="secondary" size="sm" onClick={clear} className="mt-6">
              {copy.search.clear}
            </Button>
          </div>
        )}

        {/* Below lg the help block follows the answers (and the empty state), with its own heading. */}
        <FaqHelp heading className="mt-14 md:mt-16 lg:hidden" />
      </div>
    </Section>
  );
}

/**
 * Tracks which visible topic is being read. One IntersectionObserver reports when a
 * section crosses the band between the sticky header and the reading line; the
 * current topic is then read from layout. `layoutKey` re-observes after a search
 * changes which topics show and how tall they are.
 */
function useCurrentTopic(layoutKey: string) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = layoutKey
      .split(" ")
      .map((entry) => document.getElementById(entry.split(":")[0]))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    // Same offset the anchor jumps use: html { scroll-padding-top: header height + 16px }
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

    const update = () => {
      const line = Math.max(offset, window.innerHeight * READING_LINE);
      let id: string | null = null;
      for (const s of sections) {
        if (s.getBoundingClientRect().top > line) break;
        id = s.id;
      }
      setCurrent(id);
    };

    // The observer reports every target once on observe, so the first update needs no extra call.
    const io = new IntersectionObserver(update, {
      rootMargin: `-${Math.round(offset)}px 0px -${Math.round((1 - READING_LINE) * 100)}% 0px`,
    });
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [layoutKey]);

  return current;
}

/**
 * Desktop topic rail: label/value rows, the value being the number of (matching)
 * questions. The topic being read carries a 2px brand bar and aria-current, like
 * the article's contents rail.
 */
function TopicRail({ topics }: { topics: TopicResult[] }) {
  const { copy } = useFaqExplorer();
  const layoutKey = topics
    .filter((t) => t.items.length > 0)
    .map((t) => `${t.id}:${t.items.length}`)
    .join(" ");
  const current = useCurrentTopic(layoutKey);

  return (
    <nav aria-labelledby="faq-topics-label">
      <p id="faq-topics-label" className="type-small font-semibold text-ink-900">
        {copy.topicsLabel}
      </p>
      <ul className="mt-3 border-t border-line">
        {topics.map((t) => {
          const n = t.items.length;
          const active = n > 0 && t.id === current;
          const label = (
            <>
              <span>
                {n > 0 ? <span className="link-draw">{t.title}</span> : t.title}
                <span className="sr-only">,</span>
              </span>
              <span className={cn("tabular", active ? "text-ink-900" : "text-muted")}>
                {n}
                <span className="sr-only"> {plural(n, copy.noun)}</span>
              </span>
            </>
          );
          const row = "relative flex min-h-12 items-center justify-between gap-4 py-2 pl-3 type-small";
          return (
            <li key={t.id} className="border-b border-line">
              {n > 0 ? (
                <a
                  href={`#${t.id}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    row,
                    "link-draw-parent text-ink-900 transition-colors duration-(--duration-fast) hover:text-brand-700",
                    "before:absolute before:inset-y-2.5 before:left-0 before:w-0.5 before:rounded-pill before:bg-brand-600 before:transition-opacity before:duration-(--duration-fast)",
                    active ? "font-semibold before:opacity-100" : "before:opacity-0",
                  )}
                >
                  {label}
                </a>
              ) : (
                // Every match was filtered out: the section is hidden, so there is nothing to link to.
                <span className={cn(row, "text-muted")}>{label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Below lg, while browsing: the topics as a scrolling row of anchor chips. */
function TopicChips({ topics }: { topics: TopicResult[] }) {
  const { copy } = useFaqExplorer();
  if (topics.length === 0) return null;
  return (
    // `relative` keeps the chips' sr-only text (absolutely positioned) inside the scroller; without it the
    // off-screen chips widened the page at 390px. `py-1` gives the focus ring and hover lift room inside the
    // scroller, which clips vertically too; `-mt-1 mb-9` keeps the row where it was.
    <nav
      aria-label={copy.topicsLabel}
      className="relative -mx-5 -mt-1 mb-9 overflow-x-auto px-5 py-1 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:hidden"
    >
      <ul className="flex gap-2">
        {topics.map((t) => (
          <li key={t.id} className="flex shrink-0">
            <ChipLink href={`#${t.id}`} className="whitespace-nowrap">
              {t.title}
              <span className="tabular type-small text-muted">
                {t.items.length}
                <span className="sr-only"> {plural(t.items.length, copy.noun)}</span>
              </span>
            </ChipLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * "Still have a question?": phone and the contact form. In the desktop rail the title
 * is not a heading, so the heading outline reaches the answers first; below lg the
 * block follows the answers and keeps its h2.
 */
function FaqHelp({ className, heading = false }: { className?: string; heading?: boolean }) {
  const { copy } = useFaqExplorer();
  const Title = heading ? "h2" : "p";
  return (
    <div className={className}>
      <Title className="type-h4 text-ink-900">{copy.help.title}</Title>
      <ul className="mt-2">
        <li>
          {/* Same phone link as FaqSection */}
          <a
            href={PHONE.href}
            className="link-draw-parent inline-flex min-h-11 items-center gap-1.5 font-semibold whitespace-nowrap text-brand-700"
          >
            <Phone aria-hidden strokeWidth={1.75} className="size-4" />
            <span className="link-draw tabular">{fill(copy.help.call, { phone: PHONE.label })}</span>
          </a>
        </li>
        <li>
          <Button href={copy.help.message.href} variant="ghost" arrow>
            {copy.help.message.label}
          </Button>
        </li>
      </ul>
    </div>
  );
}
