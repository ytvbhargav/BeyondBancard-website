import Image from "next/image";
import { Check, CircleDashed, LoaderCircle, Nfc } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CheckState } from "@/lib/useUnderwritingSequence";

type HeroTerminalProps = {
  title: string;
  industry: string;
  figure?: { label: string; value: string };
  checks: string[];
  states: CheckState[];
  approved: boolean;
  reduce: boolean;
};

/*
 * Geometry in hero units (1em = u). The front plate is the positioned box
 * (.hero-terminal-pos, 17.6 x 64). The body behind it is one silhouette: a
 * printer hump that rises above the plate's top right and a thinner grip
 * that runs down the right side. The hump size, the plate's top radius and
 * the placement in globals.css are calibrated together so the terminal
 * clears every glyph (tests/hero.spec.ts, "never hides a letter").
 */
const PW = 17.6; // plate width
const PH = 64; // plate height (the lower body is clipped under the bar)
const HUMP = 3.5; // hump protrusion right of the plate
const HUMP_TOP = 2.6; // hump height above the plate
const HUMP_R = 8; // hump top-right radius
const GRIP = 2.6; // grip protrusion below the hump
const R = PW + HUMP;
const K = 0.5523;

const BODY = [
  `M${PW - 10} 2`,
  `C${PW - 10} ${-HUMP_TOP * 0.55} ${PW - 7.8} ${-HUMP_TOP} ${PW - 5.5} ${-HUMP_TOP}`,
  `L${R - HUMP_R} ${-HUMP_TOP}`,
  `C${R - HUMP_R * (1 - K)} ${-HUMP_TOP} ${R} ${-HUMP_TOP + HUMP_R * (1 - K)} ${R} ${-HUMP_TOP + HUMP_R}`,
  `C${R} ${8.2} ${PW + GRIP} ${8.6} ${PW + GRIP} ${11}`,
  `L${PW + GRIP} ${PH - 2.6}`,
  `C${PW + GRIP} ${PH - 1.2} ${PW + GRIP - 1.2} ${PH} ${PW - 2.6} ${PH}`,
  `L${PW - 6} ${PH}`,
  `L${PW - 6} 2Z`,
].join(" ");

// The hump's outer edge only, for the rim light.
const RIM = [
  `M${PW - 5.5} ${-HUMP_TOP}`,
  `L${R - HUMP_R} ${-HUMP_TOP}`,
  `C${R - HUMP_R * (1 - K)} ${-HUMP_TOP} ${R} ${-HUMP_TOP + HUMP_R * (1 - K)} ${R} ${-HUMP_TOP + HUMP_R}`,
  `C${R} ${8.2} ${PW + GRIP} ${8.6} ${PW + GRIP} ${11}`,
  `L${PW + GRIP} ${PH - 2.6}`,
].join(" ");

const VIEW_TOP = -3;
const VIEW_W = R + 0.6;

/*
 * The display sits in a bezel rather than running to the top of the plate: a
 * screen curved to the shell's own corners is what made this read as a phone.
 * Above it there is room for the speaker and the scanner window, below it a
 * chin for the brand and the card slot, which is the shape of a countertop
 * Android terminal.
 */
const SCREEN_BOX = "absolute top-[3.6em] left-[1.15em] h-[30.6em] w-[15.3em] rounded-[1.3em]";

/**
 * The hero's handheld card terminal (S2), drawn with inline SVG and HTML, no
 * imagery. Every part is sized in em, so the placement wrapper's font-size
 * (one hero unit) scales the whole device; placement, tilt and entrance live
 * in globals.css (.hero-terminal-*). The screen runs the underwriting
 * sequence and is labelled Example. Decorative: the hero bar owns the live
 * status.
 */
export function HeroTerminal({ title, industry, figure, checks, states, approved, reduce }: HeroTerminalProps) {
  return (
    <div className="hero-terminal-body">
      {/* Body: printer hump and grip as one silhouette */}
      <svg
        aria-hidden
        focusable="false"
        className="hero-terminal-fade-svg absolute top-[-3em] left-0 h-[67em] w-[21.7em] overflow-visible"
        viewBox={`0 ${VIEW_TOP} ${VIEW_W} ${PH - VIEW_TOP}`}
      >
        <defs>
          <linearGradient id="hero-terminal-side" gradientUnits="userSpaceOnUse" x1={PW - 3} y1="0" x2={R} y2="0">
            <stop offset="0" style={{ stopColor: "var(--color-ink-700)" }} />
            <stop offset="0.55" style={{ stopColor: "var(--color-ink-800)" }} />
            <stop offset="1" style={{ stopColor: "var(--color-ink-950)" }} />
          </linearGradient>
          <linearGradient id="hero-terminal-top" gradientUnits="userSpaceOnUse" x1="0" y1={-HUMP_TOP} x2="0" y2="14">
            <stop offset="0" style={{ stopColor: "var(--color-ink-700)", stopOpacity: 0.9 }} />
            <stop offset="1" style={{ stopColor: "var(--color-ink-900)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path d={BODY} fill="url(#hero-terminal-side)" />
        <path d={BODY} fill="url(#hero-terminal-top)" />
        <path
          d={RIM}
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeWidth="1"
          style={{ stroke: "color-mix(in srgb, var(--color-brand-300) 35%, transparent)" }}
        />
        {/* Paper slot along the top of the hump */}
        <path
          d={`M${PW - 6.4} ${-HUMP_TOP + 0.95} L${R - HUMP_R + 1.6} ${-HUMP_TOP + 0.95}`}
          strokeWidth="0.42"
          strokeLinecap="round"
          style={{ stroke: "var(--color-ink-950)" }}
        />
        <path
          d={`M${PW - 6.2} ${-HUMP_TOP + 1.3} L${R - HUMP_R + 1.4} ${-HUMP_TOP + 1.3}`}
          vectorEffect="non-scaling-stroke"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ stroke: "color-mix(in srgb, var(--color-brand-300) 18%, transparent)" }}
        />
        {/* Magstripe slot down the right edge */}
        <rect
          x={PW + GRIP - 0.55}
          y="24"
          width="0.5"
          height="19"
          rx="0.25"
          style={{ fill: "var(--color-ink-950)" }}
        />
        {/* Side keys */}
        <rect x={PW + GRIP - 0.2} y="17" width="0.6" height="3.4" rx="0.3" style={{ fill: "var(--color-ink-700)" }} />
        <rect x={PW + GRIP - 0.2} y="21.6" width="0.6" height="2.2" rx="0.3" style={{ fill: "var(--color-ink-700)" }} />
      </svg>

      {/* Front plate */}
      <div className="hero-terminal-fade absolute inset-0 rounded-[3.2em_3.2em_2.2em_2.2em] bg-ink-950 shadow-[inset_0.16em_0_0_rgb(255_255_255/0.08),inset_-0.08em_0_0_rgb(255_255_255/0.05)] inset-ring inset-ring-white/10" />

      {/* Screen */}
      <div
        className={cn(
          SCREEN_BOX,
          "overflow-hidden bg-[linear-gradient(172deg,var(--color-brand-500)_0%,var(--color-brand-700)_34%,var(--color-brand-900)_62%,var(--color-ink-950)_92%)] px-[1.1em] pt-[2.3em] pb-[1.2em] font-sans leading-[1.25] text-white",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="grid size-[2em] place-items-center rounded-[0.55em] bg-white font-display text-[1.1em] leading-none font-extrabold text-brand-700">
            B
          </span>
          <span
            className={cn(
              "hero-pre-now inline-flex items-center gap-[0.3em] rounded-pill px-[0.7em] py-[0.2em] text-[0.95em] font-semibold whitespace-nowrap transition-colors duration-(--duration-base)",
              approved ? "bg-success-100 text-success-700" : "bg-warning-100 text-warning-700",
              approved && !reduce && "approved-pulse",
            )}
          >
            {approved && <Check strokeWidth={3} className="size-[1em]" />}
            {approved ? "Approved" : "In review"}
          </span>
          {/* Final state, shown before hydration when motion is reduced */}
          <span className="hero-pre-final inline-flex items-center gap-[0.3em] rounded-pill bg-success-100 px-[0.7em] py-[0.2em] text-[0.95em] font-semibold whitespace-nowrap text-success-700">
            <Check strokeWidth={3} className="size-[1em]" />
            Approved
          </span>
        </div>

        <p className="mt-[0.9em] font-display text-[1.2em] leading-[1.15] font-bold [font-stretch:104%]">{title}</p>
        <p className="mt-[0.25em] truncate text-[0.9em] text-white/80">{industry}</p>

        {/* The Example label sits on the figure's own row, at body size, so the disclosure reads with the number.
            The figure keeps about 0.7u of clear space below the tag, so the tag never touches the digits. */}
        <div className="mt-[0.8em]">
          <div className="flex items-center justify-between gap-[0.5em] text-[0.9em] text-white/80">
            <span className="truncate">{figure?.label}</span>
            <span className="shrink-0 rounded-pill bg-white px-[0.6em] text-[1.12em] leading-[1.25] font-semibold text-brand-700">
              Example
            </span>
          </div>
          {figure && (
            <span className="mt-[0.25em] block font-display text-[2.8em] leading-none font-extrabold text-white [font-stretch:75%]">
              {figure.value}
            </span>
          )}
        </div>

        <ul className="mt-[0.9em] flex flex-col gap-[0.35em]">
          {checks.map((c, i) => {
            const s = states[i];
            return (
              <li
                key={c}
                className={cn(
                  "hero-pre-row flex h-[2.2em] items-center gap-[0.6em] rounded-[0.7em] px-[0.7em] text-[0.9em] whitespace-nowrap transition-colors duration-(--duration-base)",
                  s === "done" ? "bg-white/15 text-white" : "bg-white/[0.07] text-white/75",
                )}
              >
                <span className="hero-pre-now grid size-[1.2em] shrink-0 place-items-center">
                  {s === "done" && (
                    <span className="grid size-[1.2em] place-items-center rounded-pill bg-success-600 text-white">
                      <Check strokeWidth={3.5} className="size-[0.7em]" />
                    </span>
                  )}
                  {s === "running" && (
                    <LoaderCircle strokeWidth={2.5} className={cn("size-[1.2em] text-white", !reduce && "animate-spin")} />
                  )}
                  {s === "pending" && <CircleDashed strokeWidth={2} className="size-[1.2em] text-white/50" />}
                </span>
                <span className="hero-pre-final grid size-[1.2em] shrink-0 place-items-center rounded-pill bg-success-600 text-white">
                  <Check strokeWidth={3.5} className="size-[0.7em]" />
                </span>
                <span className="truncate">{c}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Lights up as the device turns in */}
      <div className={cn(SCREEN_BOX, "hero-terminal-shade bg-ink-950")} />

      {/* The bezel above the display carries the brand, the earpiece slot and
          the scanner window. The brand sits here rather than on the chin
          because the chin is below the fold on a short screen, and this device
          is meant to be unmistakably Beyond's. */}
      <div aria-hidden className="absolute top-[1.45em] left-[1.5em] flex w-[14.6em] items-center gap-[0.9em]">
        <Image
          src="/brand/beyond-bancard-logo-white.png"
          alt=""
          width={312}
          height={42}
          className="h-[1.45em] w-auto shrink-0"
        />
        <span className="h-[0.34em] flex-1 rounded-pill bg-ink-950/80 inset-ring inset-ring-white/10" />
        <span className="relative size-[0.95em] shrink-0 rounded-pill bg-ink-950 ring-[0.08em] ring-white/12">
          <span className="absolute top-[0.16em] left-[0.2em] size-[0.3em] rounded-pill bg-brand-300/45" />
        </span>
      </div>

      {/* The chin: where a cardholder taps */}
      <Nfc strokeWidth={2.25} className="absolute top-[35em] left-[7.4em] size-[2em] text-brand-300/70" />

      {/* Chip card slot, cut into the front below the chin */}
      <div
        aria-hidden
        className="absolute top-[38.4em] left-[2.4em] h-[0.72em] w-[12.8em] rounded-[0.36em] bg-black/70 shadow-[0_0.12em_0_rgb(255_255_255/0.08)]"
      />
    </div>
  );
}
