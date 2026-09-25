"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IndustryRotator } from "@/components/sections/IndustryRotator";
import { MaybeConfirm } from "@/components/ui/confirm";
import { HeroBar } from "@/components/sections/HeroBar";
import { HeroGradient } from "@/components/sections/HeroGradient";
import { HeroTerminal } from "@/components/illustrations/HeroTerminal";
import { cta } from "@/content/site";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useUnderwritingSequence } from "@/lib/useUnderwritingSequence";
import type { Confirmable } from "@/types/content";

type HeroField = { label: string; value: string; featured?: boolean };

type HeroProps = {
  title: string;
  lead: string;
  facts: Confirmable<string>[];
  /** The industries the line above the CTAs cycles through. */
  industries: string[];
  card: { title: string; industry: string; fields: HeroField[]; checks: string[] };
};

type WordDir = "up" | "left" | "right";

/** One headline word with its CSS entrance (direction applies from 64rem). */
function Word({ dir, delay, children }: { dir: WordDir; delay: number; children: string | undefined }) {
  return (
    <span className="hero-word" data-dir={dir} style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </span>
  );
}

/**
 * Homepage hero (PRD §9.1.1, D-007). The first desktop screen holds the
 * headline, a tilted card terminal that runs the underwriting example (S2)
 * and a glass status bar; the CTAs, lead and facts follow directly below in
 * the same section (portrait desktop-layout viewports show them in the first
 * view). The header
 * sits transparently over it. All entrance motion is CSS, so the h1 paints
 * before hydration.
 *
 * The desktop split ("The processor / that [terminal] says / yes.") is
 * calibrated to a five-word title; any other title renders a plain, centred
 * headline with the terminal below it.
 */
export function Hero({ title, lead, facts, industries, card }: HeroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const inView = useInView(stageRef, { once: true, amount: 0.25 });
  // The example runs itself, over and over: there is no control for it (D-067).
  const seq = useUnderwritingSequence(card.checks.length, { enabled: inView, reduce, loop: true });
  const [fontPending, setFontPending] = useState(true);

  const words = title.split(" ");
  const split = words.length === 5;
  const figure = card.fields.find((f) => f.featured) ?? card.fields[0];
  const statusText = seq.approved ? "Approved" : "Underwriting in progress";

  useEffect(() => {
    if (!split && process.env.NODE_ENV !== "production") {
      console.warn(`Hero: the split headline expects 5 words, got ${words.length}. Rendering the plain layout.`);
    }
  }, [split, words.length]);

  // Releases the three-line height guard once the display font is in (globals.css).
  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => live && setFontPending(false));
    return () => {
      live = false;
    };
  }, []);

  return (
    <section
      data-hero
      data-hero-pre={inView ? undefined : ""}
      className="tone-dark relative isolate -mt-(--header-h) overflow-clip bg-ink-950"
    >
      <div className="hero-first relative flex flex-col">
        <HeroGradient />

        <Container className="hero-first-body relative z-10 flex flex-1 flex-col items-center pt-(--header-h)">
          <span aria-hidden className="h-6 shrink-0 lg:h-auto lg:max-h-36 lg:min-h-8 lg:flex-[2_1_0]" />

          <div
            ref={stageRef}
            data-announce-steady
            data-font-pending={fontPending ? "" : undefined}
            className={cn("hero-stage", !split && "hero-stage--plain")}
          >
            <h1 className="hero-display">
              {split ? (
                <>
                  <span className="hero-line">
                    <Word dir="up" delay={60}>
                      {words[0]}
                    </Word>{" "}
                    <Word dir="up" delay={60}>
                      {words[1]}
                    </Word>
                  </span>{" "}
                  {/* Lines 2 and 3 slide in from the outside, so no word ever moves towards the terminal */}
                  <span className="hero-line">
                    <Word dir="right" delay={140}>
                      {words[2]}
                    </Word>{" "}
                    <Word dir="left" delay={140}>
                      {words[3]}
                    </Word>
                  </span>{" "}
                  <span className="hero-line hero-line-end">
                    <Word dir="left" delay={220}>
                      {words[4]}
                    </Word>
                  </span>
                </>
              ) : (
                title
              )}
            </h1>

            <div aria-hidden className="hero-terminal-window -mx-5 sm:-mx-6 md:-mx-8 lg:mx-0">
              <div className="hero-terminal-pos">
                <div className="hero-terminal-anim">
                  <HeroTerminal
                    title={card.title}
                    industry={card.industry}
                    figure={figure}
                    checks={card.checks}
                    states={seq.states}
                    approved={seq.approved}
                    reduce={reduce}
                  />
                </div>
              </div>
            </div>
          </div>

          <span aria-hidden className="hidden lg:block lg:min-h-6 lg:flex-[1_1_0]" />
        </Container>

        <HeroBar seq={seq} count={card.checks.length} statusText={statusText} />
      </div>

      <Container data-hero-foot className="relative z-10 flex flex-col items-center pt-3 pb-14 text-center lg:pt-12 lg:pb-24">
        {/* The headline's promise, finished out loud. It sits in the foot's
            own space above the CTAs, where there is room to set it large
            without crowding the headline or the device. */}
        <IndustryRotator
          industries={industries}
          className="anim-rise mb-7 font-display text-[clamp(1.6rem,3.6vw,2.75rem)]/[1.1] font-extrabold [font-stretch:78%] lg:mb-9"
          style={{ "--delay": "240ms" } as React.CSSProperties}
        />

        <div
          data-hero-cta
          className="anim-rise flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center lg:gap-4"
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          <Button href={cta.apply.href} variant="inverse" arrow className="lg:min-w-48">
            {cta.apply.label}
          </Button>
          <Button href={cta.expert.href} variant="secondary-dark" className="bg-ink-950/40 backdrop-blur-sm lg:min-w-48">
            {cta.expert.label}
          </Button>
        </div>

        <p className="type-body-lg mt-8 max-w-[42rem] text-balance text-on-dark">{lead}</p>

        <ul className="mt-6 flex flex-col items-center gap-2 lg:flex-row lg:gap-0">
          {facts.map((f, i) => (
            <li
              key={f.value}
              className={cn(
                "type-small flex items-center gap-2.5 text-on-dark lg:px-6",
                i > 0 && "lg:border-l lg:border-white/12",
              )}
            >
              <span aria-hidden className="size-2 shrink-0 rounded-pill bg-success-600 ring-4 ring-success-600/20" />
              <MaybeConfirm item={f} variant="marker" tooltip="top" tooltipAlign="center">
                {f.value}
              </MaybeConfirm>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
