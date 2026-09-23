"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal], [data-stagger], [data-words]";

/**
 * One IntersectionObserver for every Reveal, Stagger and RevealWords on the
 * page, so those wrappers stay server components with no hydration cost. Picks
 * up elements added later (route changes, filtered lists) with a
 * MutationObserver.
 *
 * A reveal plays every time it is scrolled to, not only the first time: an
 * element that leaves below the fold is reset, so coming back down the page
 * fills it in again. Leaving above the fold does not reset anything — content
 * already read would otherwise re-animate under the reader on the way back up,
 * which reads as a glitch rather than as motion.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // One callback can carry several entries for the same element when the
        // page is scrolled quickly, oldest first. Only the last one describes
        // where the element actually is; acting on all of them in order can
        // leave a visible element marked hidden, with no threshold left to
        // cross to put it right — a section that stays blank.
        const latest = new Map<Element, IntersectionObserverEntry>();
        for (const entry of entries) latest.set(entry.target, entry);

        for (const entry of latest.values()) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            entry.target.setAttribute("data-shown", "");
            continue;
          }
          if (entry.isIntersecting) continue;
          // The rect is read now rather than taken from the entry, which
          // describes the moment the observer fired and may already be stale.
          const box = entry.target.getBoundingClientRect();
          if (box.top >= window.innerHeight) {
            // Gone off the bottom: arm it again for the next time down.
            entry.target.removeAttribute("data-shown");
          } else if (box.bottom <= 0) {
            // Gone off the top, which means it has been scrolled past. A fast
            // scroll can carry an element from below the fold to above it
            // between two samples, so it never reports the ratio that would
            // have shown it; without this it stays hidden for good, and the
            // section reads as blank when it is scrolled back to.
            entry.target.setAttribute("data-shown", "");
          }
        }
      },
      { threshold: [0, 0.15], rootMargin: "0px 0px -8% 0px" },
    );

    const register = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.hasAttribute("data-observed")) return;
        el.setAttribute("data-observed", "");
        if (el.hasAttribute("data-stagger")) {
          let i = 0;
          el.querySelectorAll<HTMLElement>(":scope > [data-stagger-item]").forEach((child) => {
            child.style.setProperty("--i", String(i++));
          });
        }
        io.observe(el);
      });
    };

    register(document);
    let frame = 0;
    const mo = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        register(document);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      mo.disconnect();
      document.querySelectorAll("[data-observed]").forEach((el) => el.removeAttribute("data-observed"));
    };
  }, [pathname]);

  return null;
}
