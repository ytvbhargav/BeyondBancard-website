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
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            entry.target.setAttribute("data-shown", "");
          } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // Gone off the bottom: arm it again for the next time down.
            entry.target.removeAttribute("data-shown");
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
