"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { announcement } from "@/content/site";
import { href } from "@/lib/links";
import { Confirm } from "@/components/ui/confirm";
import { ANNOUNCEMENT_KEY } from "@/lib/constants";

/**
 * Dismissible campaign bar (M9). A slim, centred line with the close button at
 * the far right. Dismissal collapses the height and is stored in localStorage;
 * an inline script in the root layout hides it before paint on later visits.
 */
export function AnnouncementBar() {
  const ref = useRef<HTMLDivElement>(null);

  function dismiss() {
    const el = ref.current;
    const root = document.documentElement;
    // A second click or Enter during the collapse would restart the steady offsets from a
    // zero hold and snap the headline, so a dismissal that is already running wins.
    if (root.dataset.announcement) return;
    try {
      localStorage.setItem(ANNOUNCEMENT_KEY, "1");
    } catch {}
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.dataset.announcement = "dismissed";
      return;
    }
    const h0 = el.offsetHeight;
    el.style.height = `${h0}px`;
    el.style.overflow = "hidden";

    // Layout sized from the viewport below this bar (the homepage hero) takes its
    // final size now, so the hero's sticky bar stays on the fold during the
    // collapse. Elements marked data-announce-steady would jump with that, so each
    // frame they are offset in proportion to the bar's remaining height: they
    // glide to their final place on the collapse's own curve (transform only).
    // Reading the live height every frame keeps them in step even when frames
    // are slow, which a separate transform transition does not.
    const steady = [...document.querySelectorAll<HTMLElement>("[data-announce-steady]")];
    const before = steady.map((n) => n.getBoundingClientRect().top);
    root.dataset.announcement = "dismissing";
    const hold = steady.map((n, i) => before[i] - n.getBoundingClientRect().top);
    let frame = 0;
    const follow = () => {
      const k = h0 > 0 ? el.getBoundingClientRect().height / h0 : 0;
      steady.forEach((n, i) => (n.style.translate = k > 0 ? `0 ${hold[i] * k}px` : ""));
      if (k > 0) frame = requestAnimationFrame(follow);
    };
    follow();

    requestAnimationFrame(() => {
      el.style.transition = "height 250ms cubic-bezier(0.65,0,0.35,1), opacity 200ms ease-out";
      el.style.height = "0px";
      el.style.opacity = "0";
    });
    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el || e.propertyName !== "height") return;
      el.removeEventListener("transitionend", onEnd);
      cancelAnimationFrame(frame);
      steady.forEach((n) => (n.style.translate = ""));
      root.dataset.announcement = "dismissed";
      document.getElementById("content")?.focus({ preventScroll: true });
    };
    el.addEventListener("transitionend", onEnd);
  }

  return (
    <div ref={ref} data-announcement-bar className="relative z-[55] bg-success-700 text-white">
      <div className="relative mx-auto flex min-h-11 max-w-[90rem] items-center justify-center px-12 py-2 sm:px-14">
        <p className="type-small text-center text-balance">
          <Confirm note={announcement.note} variant="marker" tooltip="bottom" tooltipAlign="center" className="static">
            {announcement.text}
          </Confirm>{" "}
          <Link
            href={href(announcement.link.href)}
            className="group/ann ml-1 inline-flex items-center gap-1 font-semibold whitespace-nowrap underline decoration-white/60 underline-offset-4 transition-colors hover:decoration-white [--color-focus:white]"
          >
            {announcement.link.label}
            <ArrowRight
              aria-hidden
              strokeWidth={2}
              className="size-3.5 transition-transform duration-(--duration-fast) group-hover/ann:translate-x-[3px]"
            />
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-1/2 right-1 grid size-11 -translate-y-1/2 place-items-center rounded-pill transition-colors duration-(--duration-fast) hover:bg-white/15 sm:right-3 [--color-focus:white]"
          aria-label="Dismiss announcement"
        >
          <X aria-hidden strokeWidth={1.75} className="size-[1.125rem]" />
        </button>
      </div>
    </div>
  );
}
