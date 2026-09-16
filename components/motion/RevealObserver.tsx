"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal]:not([data-shown]), [data-stagger]:not([data-shown])";

/**
 * One IntersectionObserver for every Reveal and Stagger on the page, so those
 * wrappers stay server components with no hydration cost. Picks up elements
 * added later (route changes, filtered lists) with a MutationObserver.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
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
      document.querySelectorAll("[data-observed]:not([data-shown])").forEach((el) => el.removeAttribute("data-observed"));
    };
  }, [pathname]);

  return null;
}
