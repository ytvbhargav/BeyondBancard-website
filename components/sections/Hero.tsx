"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MaybeConfirm } from "@/components/ui/confirm";
import { HeroGradient } from "@/components/sections/HeroGradient";
import { HeroDevice } from "@/components/illustrations/HeroDevice";
import { cta } from "@/content/site";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useUnderwritingSequence } from "@/lib/useUnderwritingSequence";
import type { Confirmable } from "@/types/content";

type HeroProps = {
  title: string;
  lead: string;
  facts: Confirmable<string>[];
  card: { title: string; industry: string; checks: string[] };
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

/**
 * Homepage hero (PRD §9.1.1), centred composition: an oversized headline split
 * around a tilted merchant device whose screen runs the underwriting sequence
 * (S2), pill CTAs over the device, the lead beneath, and a floating glass bar
 * with the key facts and the live application status.
 */
export function Hero({ title, lead, facts, card }: HeroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const inView = useInView(stageRef, { once: true, amount: 0.25 });
  const seq = useUnderwritingSequence(card.checks.length, { enabled: inView, reduce });

  const words = title.split(" ");
  const line1 = words.slice(0, 2).join(" ");
  const middle = words[2] ?? "";
  const end = words.slice(3).join(" ");

  // On large screens the device sits in the gap of the headline's second line.
  useEffect(() => {
    const stage = stageRef.current;
    const device = deviceRef.current;
    if (!stage || !device) return;
    const place = () => {
      const slot = stage.querySelector<HTMLElement>("[data-device-slot]");
      if (!slot || slot.offsetWidth === 0) {
        device.style.removeProperty("--dx");
        device.style.removeProperty("--dy");
        device.style.removeProperty("scale");
        return;
      }
      // Shorter screens get a slightly smaller device so its screen clears the CTAs.
      device.style.scale = String(Math.min(1, Math.max(0.78, (window.innerHeight - 124) / 776)));
      const s = stage.getBoundingClientRect();
      const r = slot.getBoundingClientRect();
      // Vertical anchor is the top of the headline line that holds the slot.
      const line = (slot.parentElement ?? slot).getBoundingClientRect();
      device.style.setProperty("--dx", `${Math.round(r.left + r.width / 2 - s.left)}px`);
      device.style.setProperty("--dy", `${Math.round(line.top - s.top)}px`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(stage);
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
    };
  }, []);

  const statusText = seq.approved ? "Approved" : "Underwriting in progress";

  return (
    <section className="tone-dark relative isolate flex flex-col overflow-hidden bg-ink-900 lg:min-h-[calc(100svh-7.75rem)]">
      <HeroGradient />
      {/* Fades the device into the bar area */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-56 bg-gradient-to-t from-ink-900 via-ink-900/85 to-transparent"
      />

      <Container className="relative flex flex-1 flex-col">
        <div
          ref={stageRef}
          className="relative flex flex-1 flex-col items-center pt-10 pb-8 text-center md:pt-14 lg:pt-[clamp(1rem,4svh,4rem)] lg:pb-28"
        >
          <h1 className="hero-title relative z-20 text-on-dark [text-shadow:0_2px_24px_color-mix(in_srgb,var(--color-ink-950)_45%,transparent)]">
            <span className="anim-rise block" style={delay(0)}>
              {line1}
            </span>{" "}
            <span className="block lg:flex lg:items-end lg:justify-center">
              <span className="anim-rise inline-block" style={delay(80)}>
                {middle}
              </span>{" "}
              <span data-device-slot aria-hidden className="hidden shrink-0 lg:block lg:w-[clamp(12rem,18vw,16rem)]" />
              <span className="anim-rise inline-block" style={delay(140)}>
                {end}
              </span>
            </span>
          </h1>

          <div
            ref={deviceRef}
            className="relative z-10 mx-auto mt-6 -mb-[6.5rem] w-[12.5rem] sm:-mb-[8.5rem] sm:w-[14rem] lg:absolute lg:top-[calc(var(--dy,9rem)-1rem)] lg:origin-top lg:left-[var(--dx,50%)] lg:mx-0 lg:mt-0 lg:mb-0 lg:w-[clamp(12.5rem,16vw,15rem)] lg:-translate-x-1/2"
          >
            <div className="anim-rise-device" style={delay(220)}>
              <HeroDevice
                title={card.title}
                industry={card.industry}
                checks={card.checks}
                states={seq.states}
                approved={seq.approved}
                reduce={reduce}
              />
            </div>
          </div>

          <div
            className="anim-rise relative z-20 flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:mt-[clamp(7.5rem,18svh,10.5rem)]"
            style={delay(320)}
          >
            <Button href={cta.apply.href} variant="inverse" arrow>
              {cta.apply.label}
            </Button>
            <Button href={cta.expert.href} variant="secondary-dark" className="bg-ink-950/40 backdrop-blur-sm">
              {cta.expert.label}
            </Button>
          </div>

          <p
            className="anim-rise relative z-20 mt-6 max-w-[40rem] text-[1.0625rem] leading-relaxed text-balance text-on-dark [text-shadow:0_1px_16px_var(--color-ink-950)] lg:text-[1.125rem]"
            style={delay(400)}
          >
            {lead}
          </p>
        </div>

        {/* Floating fact bar */}
        <div
          className="anim-rise relative z-20 pb-10 lg:absolute lg:inset-x-10 lg:bottom-6 lg:pb-0"
          style={delay(480)}
        >
          <div className="flex flex-col gap-4 rounded-md border border-white/10 bg-ink-950/55 p-5 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between lg:rounded-pill lg:py-2 lg:pr-2 lg:pl-7">
            <ul className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-0">
              {facts.map((f, i) => (
                <li
                  key={f.value}
                  className={cn(
                    "type-small flex items-center gap-2.5 text-left text-on-dark",
                    i > 0 && "lg:border-l lg:border-white/10 lg:pl-6",
                    i < facts.length - 1 && "lg:pr-6",
                  )}
                >
                  <span aria-hidden className="size-2 shrink-0 rounded-pill bg-success-600 ring-4 ring-success-600/20" />
                  <MaybeConfirm item={f} variant="marker">
                    {f.value}
                  </MaybeConfirm>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-4 lg:border-t-0 lg:pt-0">
              <span className="type-small hidden text-on-dark-muted xl:inline">Example application</span>
              <span
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-pill px-3.5 text-[0.8125rem] font-semibold whitespace-nowrap",
                  seq.approved ? "bg-success-100 text-success-700" : "bg-warning-100 text-warning-700",
                )}
              >
                {seq.approved && <Check aria-hidden strokeWidth={3} className="size-3.5" />}
                {statusText}
              </span>
              <span className="sr-only" aria-live="polite" aria-atomic="true">
                Example application status: {statusText}
              </span>
              <button
                type="button"
                onClick={seq.replay}
                disabled={seq.running}
                aria-label="Replay the underwriting example"
                className="inline-flex h-11 items-center gap-1.5 rounded-pill px-4 text-[0.875rem] font-semibold text-on-dark transition-[background-color,opacity] duration-(--duration-fast) hover:bg-white/10 disabled:opacity-40"
              >
                <RotateCcw aria-hidden strokeWidth={2} className="size-4" />
                Replay
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
