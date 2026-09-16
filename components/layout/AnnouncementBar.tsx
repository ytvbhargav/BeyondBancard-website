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
    try {
      localStorage.setItem(ANNOUNCEMENT_KEY, "1");
    } catch {}
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.documentElement.dataset.announcement = "dismissed";
      return;
    }
    el.style.height = `${el.offsetHeight}px`;
    el.style.overflow = "hidden";
    requestAnimationFrame(() => {
      el.style.transition = "height 250ms cubic-bezier(0.65,0,0.35,1), opacity 200ms ease-out";
      el.style.height = "0px";
      el.style.opacity = "0";
    });
    el.addEventListener(
      "transitionend",
      () => {
        document.documentElement.dataset.announcement = "dismissed";
        document.getElementById("content")?.focus({ preventScroll: true });
      },
      { once: true },
    );
  }

  return (
    <div ref={ref} data-announcement-bar className="relative z-[55] bg-success-700 text-white">
      <div className="relative mx-auto flex min-h-11 max-w-[90rem] items-center justify-center px-12 py-2 sm:px-14">
        <p className="type-small text-center text-balance">
          <Confirm note={announcement.note} variant="marker" tooltip="bottom">
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
