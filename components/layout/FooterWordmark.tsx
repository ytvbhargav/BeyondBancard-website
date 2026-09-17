import type { CSSProperties } from "react";

/*
 * Calibrated for Archivo wght 800, wdth 66%, tracking -0.025em, one inline-block span per letter
 * (the kerning loss is included). Advances: "Beyond" 2.5201em, "Bancard" 2.8261em; "B" left
 * bearing 0.05em; word gap 0.12em; stop 0.04em + 0.28em.
 *   One line  = -0.05 + 2.5201 + 0.12 + 2.8261 + 0.04 + 0.28 = 5.7362em
 *   Two lines = -0.05 + 2.8261 + 0.04 + 0.28 = 3.0961em (both rows carry -0.05em)
 * Re-measure if the font file, width, weight, tracking or text changes; the stop size and gap are
 * plain additions, so changing them only needs these two sums updated.
 */

/*
 * Letter rules live on the word (`*:` = each letter, `*:*:` = its inner span), so the 13 letter
 * spans carry only data-wm-letter and --i. Plain join, not cn(): tailwind-merge must not touch these.
 *
 * Entrance: a letter sits below its word's clip only while RevealObserver is watching the trigger
 * (data-observed) and has not fired yet (no data-shown). Without JS, if the bundles fail to load,
 * or under reduced motion, the wordmark renders final. The rise (after data-shown) is transitioned,
 * 40ms apart.
 *
 * The hide itself is a zero-length transition delayed by twice --duration-slow (1.2s). RevealObserver
 * sets data-observed at hydration wherever the page is scrolled; if the wordmark is already in view
 * (a reload at the page end, or a visitor who reached the footer before the scripts arrived), its
 * data-shown follows a frame or two later (measured up to about 300ms on a 6x-throttled phone),
 * which cancels the pending hide: the wordmark that was already on screen stays put and never
 * blinks out to replay. Off screen, the hide lands 1.2s after hydration, where nobody sees it.
 *
 * Hover hop (fine pointers, motion allowed): the hovered letter rises 0.06em (translate), then a
 * delayed transform of +0.06em brings it back to the baseline while the pointer is still on it, so
 * a pointer parked on the wordmark never leaves a letter raised. On pointer-out both properties
 * return with identical timing, so a settled letter does not move and a mid-hop letter eases back
 * (no snap). Sweeping across the word makes a wave. Hit-testing stays on the static outer span.
 */
const WORD = [
  "inline-flex overflow-y-clip *:inline-block *:*:inline-block",
  "motion-safe:*:group-has-[[data-observed]:not([data-shown])]/wm:translate-y-[105%]",
  "motion-safe:*:group-has-[[data-observed]:not([data-shown])]/wm:[transition:translate_0s_linear_calc(var(--duration-slow)*2)]",
  "*:group-has-[[data-shown]]/wm:[transition:translate_var(--duration-slow)_var(--ease-out)_calc(var(--i)*40ms)]",
  "motion-safe:pointer-fine:*:*:[transition:translate_var(--duration-base)_var(--ease-out),transform_var(--duration-base)_var(--ease-out)]",
  "motion-safe:pointer-fine:*:hover:*:-translate-y-[0.06em] motion-safe:pointer-fine:*:hover:*:[transform:translateY(0.06em)]",
  "motion-safe:pointer-fine:*:hover:*:[transition:translate_var(--duration-fast)_var(--ease-out),transform_var(--duration-base)_var(--ease-in-out)_var(--duration-fast)]",
].join(" ");

const letters = (word: string, start: number) =>
  [...word].map((ch, k) => (
    <span key={k} data-wm-letter style={{ "--i": start + k } as CSSProperties}>
      <span>{ch}</span>
    </span>
  ));

/**
 * Brand sign-off: "Beyond Bancard." set edge to edge across the container, with a brand-blue
 * full stop. Letters rise from a baseline mask once in view, then the stop drops in and settles.
 * Decorative: the name is already in the logo and the copyright.
 */
export function FooterWordmark() {
  return (
    <div
      aria-hidden="true"
      translate="no"
      data-footer-wordmark
      className="group/wm @container relative mt-16 cursor-default overflow-x-clip select-none md:mt-20 lg:mt-24 print:hidden"
    >
      {/* Trigger: a bare data-stagger (no data-stagger-item children), so RevealObserver sets data-shown and the
          generic reveal CSS never applies. It sits at mid-height, but never less than 9lvh above the wordmark's
          bottom edge: RevealObserver ignores the bottom 8% of the viewport, so on very tall screens a mid-height
          trigger could never enter the observed area. Never put data-reveal or data-stagger-item on the wordmark. */}
      <span
        data-stagger
        data-footer-wordmark-trigger
        className="pointer-events-none absolute inset-x-0 top-[min(50%,calc(100%-9lvh))] h-px"
      />
      <p className="flex flex-col items-start font-display text-[length:calc(100cqi/3.0961)] leading-[1.12] font-extrabold tracking-[-0.025em] whitespace-nowrap text-on-dark [font-stretch:66%] @min-[27.5rem]:flex-row @min-[27.5rem]:gap-x-[0.12em] @min-[27.5rem]:text-[length:calc(100cqi/5.7362)]">
        <span className={`-ml-[0.05em] ${WORD}`}>{letters("Beyond", 0)}</span>
        {/* items-baseline puts the stop's bottom edge on the text baseline itself, so both snap to the same pixel row. */}
        <span className="-mt-[0.14em] -ml-[0.05em] flex items-baseline @min-[27.5rem]:mt-0 @min-[27.5rem]:ml-0">
          <span className={WORD}>{letters("Bancard", 7)}</span>
          <span
            data-wm-stop
            className="ml-[0.04em] inline-block size-[0.28em] shrink-0 origin-bottom rounded-[0.078em] bg-brand-600 group-has-[[data-shown]]/wm:[transition:translate_520ms_cubic-bezier(.34,1.35,.64,1)_var(--duration-slow),scale_520ms_cubic-bezier(.34,1.35,.64,1)_var(--duration-slow),rotate_520ms_cubic-bezier(.34,1.35,.64,1)_var(--duration-slow),opacity_var(--duration-fast)_var(--ease-out)_var(--duration-slow)] motion-safe:group-has-[[data-observed]:not([data-shown])]/wm:-translate-y-[0.9em] motion-safe:group-has-[[data-observed]:not([data-shown])]/wm:scale-40 motion-safe:group-has-[[data-observed]:not([data-shown])]/wm:-rotate-10 motion-safe:group-has-[[data-observed]:not([data-shown])]/wm:opacity-0 motion-safe:group-has-[[data-observed]:not([data-shown])]/wm:[transition:translate_0s_linear_calc(var(--duration-slow)*2),scale_0s_linear_calc(var(--duration-slow)*2),rotate_0s_linear_calc(var(--duration-slow)*2),opacity_0s_linear_calc(var(--duration-slow)*2)] forced-colors:bg-[CanvasText] forced-colors:[forced-color-adjust:none]"
          />
        </span>
      </p>
    </div>
  );
}
