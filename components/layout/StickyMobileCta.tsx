"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cta } from "@/content/site";
import { DEMO_ROUTES } from "@/lib/links";
import { duration, ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

// Not on pages whose own job is the conversion, or where "Apply now" would compete with it (D-054).
const EXCLUDED: readonly string[] = ["/live-form", "/contact-us", "/careers"];
const ROUTES = DEMO_ROUTES.filter((r) => !EXCLUDED.includes(r)) as readonly string[];

/**
 * Mobile-only CTA bar (M10). Slides up once the page's hero CTAs have
 * scrolled out of view (pages without them: once 40% of the first viewport
 * has scrolled past); hides again as the footer comes into view.
 */
export function StickyMobileCta() {
  const pathname = usePathname();
  const enabled = ROUTES.includes(pathname);
  const reduce = useReducedMotionSafe();
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    // The homepage hero marks its CTA row, so three "Apply now" buttons never show at once.
    const heroCta = document.querySelector("[data-hero-cta]");
    const onScroll = () => {
      if (heroCta) setPastHero(heroCta.getBoundingClientRect().bottom < 0);
      else setPastHero(window.scrollY > window.innerHeight * 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.querySelector("[data-site-footer]");
    const io = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), {
      rootMargin: "0px 0px -80px 0px",
    });
    if (footer) io.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [enabled, pathname]);

  const show = enabled && pastHero && !footerVisible;

  // While the bar covers the bottom of the screen, keyboard focus scrolls clear of it
  // (html[data-sticky-cta] sets scroll-padding-bottom, WCAG 2.4.11).
  useEffect(() => {
    if (!show) return;
    const root = document.documentElement;
    root.setAttribute("data-sticky-cta", "");
    return () => root.removeAttribute("data-sticky-cta");
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          key="sticky-cta"
          initial={reduce ? { opacity: 0 } : { y: "110%" }}
          animate={reduce ? { opacity: 1 } : { y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: "110%" }}
          transition={{ duration: reduce ? 0 : duration.base, ease: ease.out }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
        >
          <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] gap-3">
            <Button href={cta.apply.href} className="w-full" arrow>
              {cta.apply.label}
            </Button>
            <Button href={cta.phone.href} variant="secondary" aria-label={`Call ${cta.phone.label}`}>
              <span className="inline-flex items-center gap-2">
                <Phone aria-hidden strokeWidth={1.75} className="size-4" />
                Call
              </span>
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
