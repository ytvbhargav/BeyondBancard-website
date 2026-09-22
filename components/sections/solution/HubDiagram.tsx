import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/motion/Reveal";
import { BlockSection, type BlockProps } from "@/components/sections/solution/BlockSection";
import { duration, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { HubBlock } from "@/types/content";

type Side = "in" | "out";

// The centre fades up once three chips have started (seconds, like Reveal's delay).
const CENTER_DELAY = 3 * stagger.base;
// The lines only fade, never translate, so they can't come apart while the chips and the centre move.
const LINE_FADE = "transition-opacity duration-(--duration-base) ease-out";

/**
 * Hub diagram (D-058): inputs meeting in one centre (Beyond unless the block
 * names another), optionally fanning out again. With no outputs the centre is
 * the outcome. From lg: inputs, centre and outputs side by side, joined by
 * hairlines drawn in CSS: a short tick from each chip to a bracket, and an arm
 * from the bracket to the centre pill. Rows are a fixed 56px, so nothing is
 * measured. Below lg the columns stack: the inputs, a down arrow, the centre,
 * a down arrow, the outputs (see Column). The lines and arrows are aria-hidden; the meaning
 * lives in two labelled lists and the centre text. Chips stagger in and the
 * centre fades up after them; the lines sit outside both and fade in (opacity
 * only) once what they join has settled.
 */
export function HubDiagram({ block, tone, headingId, index }: BlockProps<HubBlock>) {
  const outputs = block.outputs ?? [];
  const hasOutputs = outputs.length > 0;
  // Chips take the opposite background to the section so they read on either tone.
  const chipBg = tone === "surface" ? "bg-paper" : "bg-surface";

  return (
    <BlockSection block={block} tone={tone} headingId={headingId} index={index}>
      <div
        className={cn(
          "flex flex-col items-center gap-4 lg:grid lg:items-center lg:gap-0",
          // No outputs: the junction sits on the container's centre line, the outcome to its right.
          hasOutputs ? "lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]" : "lg:grid-cols-2",
        )}
      >
        <Column items={block.inputs} side="in" label="Connects" chipBg={chipBg} />
        <div className={cn("flex flex-col items-center lg:flex-row", !hasOutputs && "lg:justify-self-start")}>
          <Arm side="in" />
          {/* Below lg the down arrows move with the centre; from lg only the pill shows */}
          <Reveal delay={CENTER_DELAY} className="flex flex-col items-center gap-4">
            <Down />
            <Center label={block.center ?? "Beyond"} />
            {hasOutputs && <Down />}
          </Reveal>
          {hasOutputs && <Arm side="out" />}
        </div>
        {hasOutputs && <Column items={outputs} side="out" label="Delivers" chipBg={chipBg} />}
      </div>
    </BlockSection>
  );
}

/**
 * One side of the hub. Below lg the chips are centred and laid out by count, so
 * no chip is left alone on a last row: three stack (a phone fits two, which
 * wraps 2 + 1); four sit two to a row, forced by a zero-height, full-width
 * ::after ordered between the second and third (the row gap moves onto the
 * items' margins so that extra line adds no space; a pair too wide for a
 * narrow phone still wraps); other counts wrap in a centred row. From lg a
 * stack of 56px rows, chips pushed towards the centre, and beside the list on
 * the centre-facing edge the lines: a tick per row and a bracket from the first
 * row's middle to the last row's (inset by half a row), so its midpoint is
 * always the column's middle, where the centre's arm meets it. The lines sit
 * outside the moving items: hidden while the list is (the Stagger's hidden
 * state in globals.css), they fade in once the last chip has started and
 * mostly settled; reduced motion shows them at once.
 */
function Column({ items, side, label, chipBg }: { items: string[]; side: Side; label: string; chipBg: string }) {
  const inbound = side === "in";
  // The stagger caps its index at 10 (globals.css).
  const delay = Math.round((Math.min(items.length - 1, 10) * stagger.base + duration.base) * 1000);
  const stack = items.length === 3;
  const pairs = items.length === 4;
  return (
    <div className="relative w-full">
      {/* The Stagger mechanism, written out so the list can carry its accessible name */}
      <ul
        aria-label={label}
        data-stagger=""
        className={cn(
          // lg resets everything below it (margins, the break, centring) to the 56px-row column.
          "lg:my-0 lg:flex-col lg:flex-nowrap lg:items-stretch lg:gap-0 lg:after:hidden",
          stack
            ? "flex flex-col items-center gap-2"
            : pairs
              ? "-my-1 flex flex-wrap justify-center gap-x-2 after:order-1 after:basis-full"
              : "flex flex-wrap justify-center gap-2",
        )}
      >
        {items.map((item, i) => (
          <li
            key={item}
            data-stagger-item=""
            className={cn(
              "max-w-full lg:my-0 lg:flex lg:h-14 lg:items-center",
              pairs && "my-1",
              // After the break (DOM order kept, so reading order matches what's seen).
              pairs && i >= 2 && "order-2",
              inbound ? "lg:justify-end lg:pr-8" : "lg:justify-start lg:pl-8",
            )}
          >
            <Chip className={cn(chipBg, "lg:whitespace-nowrap")}>{item}</Chip>
          </li>
        ))}
      </ul>
      <span
        aria-hidden
        style={{ transitionDelay: `${delay}ms` }}
        className={cn(
          "absolute inset-y-0 hidden w-8 lg:block",
          inbound ? "right-0" : "left-0",
          LINE_FADE,
          "motion-safe:[.js_[data-stagger]:not([data-shown])~&]:opacity-0",
        )}
      >
        {items.map((item) => (
          <span key={item} className="relative block h-14">
            <span className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
          </span>
        ))}
        {items.length > 1 && (
          <span className={cn("absolute inset-y-7 w-px bg-line-strong", inbound ? "right-0" : "left-0")} />
        )}
      </span>
    </div>
  );
}

/**
 * Horizontal line between a bracket and the centre, with a brand dot where it
 * meets the bracket (lg only). It sits beside the centre's Reveal, not in it,
 * so it never moves: hidden while that Reveal is, it fades in as the centre
 * settles; reduced motion shows it at once.
 */
function Arm({ side }: { side: Side }) {
  const delay = Math.round((CENTER_DELAY + duration.base) * 1000);
  return (
    <span
      aria-hidden
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "relative hidden h-px w-10 shrink-0 bg-line-strong lg:block xl:w-16",
        LINE_FADE,
        "motion-safe:[.js_:has(>[data-reveal]:not([data-shown]))>&]:opacity-0",
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 size-2 -translate-y-1/2 rounded-pill bg-brand-600",
          side === "in" ? "-left-1" : "-right-1",
        )}
      />
    </span>
  );
}

/** Down arrow between the stacked groups (below lg only). */
function Down() {
  return <ArrowDown aria-hidden strokeWidth={1.75} className="size-5 shrink-0 text-muted lg:hidden" />;
}

/**
 * The centre. "Beyond" is set as the logo lockup on ink: the brand mark (white,
 * as in the dark header) beside the word. Any other centre ("POS", "Stronger payment
 * risk strategy") is its own words on the ink pill; long phrases wrap onto two
 * balanced lines, so the corners are radius-lg rather than a full pill.
 */
function Center({ label }: { label: string }) {
  if (label.trim().toLowerCase() === "beyond") {
    return (
      <p className="inline-flex shrink-0 items-center gap-2.5 rounded-pill bg-ink-900 py-2.5 pr-6 pl-2.5 text-on-dark shadow-float">
        <Image
          src="/brand/beyond-bancard-mark-white.png"
          alt=""
          width={175}
          height={201}
          className="h-6 w-auto"
        />
        <span className="font-display text-[1.1875rem] leading-none font-extrabold tracking-[-0.02em] [font-stretch:112%]">
          {label}
        </span>
      </p>
    );
  }
  return (
    <p className="type-h4 max-w-[18rem] rounded-lg bg-ink-900 px-6 py-3.5 text-center text-balance text-on-dark shadow-float">
      {label}
    </p>
  );
}
