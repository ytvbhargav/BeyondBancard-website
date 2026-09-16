"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { LoginMenu, MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/button";
import { cta } from "@/content/site";
import { cn } from "@/lib/utils";

/** Routes whose hero is dark, so the header starts on ink. */
const DARK_ROUTES = ["/", "/partners/isos-agents"];

/**
 * Sticky header (M1): 80px tall at the top of the page, 64px with a blurred
 * background and hairline once scrolled. Hysteresis stops it flickering at
 * the threshold.
 */
export function Header() {
  const pathname = usePathname();
  const tone: "light" | "dark" = DARK_ROUTES.includes(pathname) ? "dark" : "light";
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((was) => (was ? y > 8 : y > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = tone === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-(--duration-fast) ease-out",
        dark ? "tone-dark" : "",
        dark
          ? scrolled
            ? "border-ink-800 bg-ink-950/85 backdrop-blur-md"
            : "border-transparent bg-ink-900"
          : scrolled
            ? "border-line bg-surface/85 backdrop-blur-md"
            : "border-transparent bg-paper",
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          "relative mx-auto flex max-w-[90rem] items-center gap-3 px-5 transition-[height] duration-(--duration-fast) ease-out sm:px-6 md:px-8",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <div className="mr-auto flex lg:mr-0 lg:flex-1">
          <Logo tone={tone} />
        </div>

        <div className="hidden lg:block">
          <MegaMenu containerRef={containerRef} tone={tone} />
        </div>

        <div className="hidden items-center justify-end gap-1 lg:flex lg:flex-1">
          <a
            href={cta.phone.href}
            className={cn(
              "hidden h-11 items-center gap-2 rounded-pill px-3 text-[0.9375rem] font-medium whitespace-nowrap tabular transition-colors xl:inline-flex",
              dark ? "text-on-dark hover:bg-white/10" : "text-ink-900 hover:bg-ink-900/[0.06]",
            )}
          >
            <Phone aria-hidden strokeWidth={1.75} className="size-4" />
            {cta.phone.label}
          </a>
          <LoginMenu tone={tone} />
          <Button href={cta.apply.href} size="sm" className="ml-2">
            {cta.apply.label}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button href={cta.apply.href} size="sm" className="px-4">
            {cta.apply.label}
          </Button>
          <MobileMenu tone={tone} />
        </div>
      </div>
    </header>
  );
}
