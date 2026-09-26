"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MaybeConfirm } from "@/components/ui/confirm";
import { HeroBar } from "@/components/sections/HeroBar";
import { HeroGradient } from "@/components/sections/HeroGradient";
import { HeroDevicePhoto } from "@/components/illustrations/HeroDevicePhoto";
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
  /** The industries the glass bar cycles through. */
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
 * The desktop split ("The processor / that [terminal] says / yes to") is
 * calibrated to a six-word title, two words a line; any other title renders a
 * plain, centred headline with the terminal below it.
 */
export function Hero({ title, lead, facts, industries, card }: HeroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const inView = useInView(stageRef, { once: true, amount: 0.25 });
  // The example runs itself, over and over: there is no control for it (D-067).
  const seq = useUnderwritingSequence(card.checks.length, { enabled: inView, reduce, loop: true });
  const [fontPending, setFontPending] = useState(true);

  const words = title.split(" ");
  // Six words, two to a line: the last line spreads "yes" and "to" to the
  // same edges the lines above reach.
  const split = words.length === 6;
  const statusText = seq.approved ? "Approved" : "Underwriting in progress";

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
                  <span className="hero-line">
                    <Word dir="right" delay={220}>
                      {words[4]}
                    </Word>{" "}
                    <Word dir="left" delay={220}>
                      {words[5]}
                    </Word>
                  </span>
                </>
              ) : (
                title
              )}
            </h1>

            <div aria-hidden className="hero-photo-window">
              <div className="hero-photo-pos">
                <HeroDevicePhoto />
              </div>
            </div>
          </div>

          <span aria-hidden className="hidden lg:block lg:min-h-6 lg:flex-[1_1_0]" />
        </Container>

        <HeroBar seq={seq} count={card.checks.length} statusText={statusText} industries={industries} />
      </div>

      <Container data-hero-foot className="relative z-10 flex flex-col items-center pt-3 pb-14 text-center lg:pt-12 lg:pb-24">
        <div
          data-hero-cta
          className="anim-rise flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center lg:gap-4"
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          {/* The hero's pair carries a step more weight than a button
              elsewhere on the page, and the white one a drop shadow, so it
              sits on the navy rather than in it. */}
          <Button
            href={cta.apply.href}
            variant="inverse"
            size="lg"
            arrow
            className="shadow-[0_0.875rem_2.25rem_-0.75rem_rgb(2_6_23/0.75)] lg:min-w-52"
          >
            {cta.apply.label}
          </Button>
          <Button
            href={cta.expert.href}
            variant="secondary-dark"
            size="lg"
            className="border-on-dark bg-ink-950/50 backdrop-blur-sm lg:min-w-52"
          >
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
