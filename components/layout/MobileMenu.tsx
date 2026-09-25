"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import {
  companyMenu,
  cta,
  partnersMenu,
  portals,
  resourcesMenu,
  solutionsMenu,
} from "@/content/site";
import { featuredIndustries, hasIndustryPage, industryPath, moreIndustries } from "@/content/industries";
import { href } from "@/lib/links";
import { lenisRef } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types/content";

function SheetLink({ link, className, children }: { link: NavLink; className?: string; children?: React.ReactNode }) {
  return (
    <SheetClose asChild>
      <Link
        href={href(link.href)}
        className={cn("flex min-h-11 items-center text-[1rem] text-ink-900 hover:text-brand-700", className)}
      >
        {children ?? link.label}
      </Link>
    </SheetClose>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <p className="type-small mt-4 mb-1 font-medium text-muted first:mt-0">{children}</p>;
}

/** Full-height sheet from the right with accordion groups (M3). */
export function MobileMenu({ tone }: { tone: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close when the route changes (e.g. browser back while open).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (next) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        aria-label="Open menu"
        className={cn(
          "grid size-11 place-items-center rounded-pill transition-colors",
          tone === "dark" ? "text-on-dark hover:bg-white/10" : "text-ink-900 hover:bg-ink-900/[0.06]",
        )}
      >
        <Menu aria-hidden strokeWidth={1.75} className="size-6" />
      </SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          <Logo />
          <SheetClose
            aria-label="Close menu"
            className="-mr-2 grid size-11 place-items-center rounded-pill text-ink-900 hover:bg-ink-900/[0.06]"
          >
            <X aria-hidden strokeWidth={1.75} className="size-6" />
          </SheetClose>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="solutions">
              <AccordionTrigger headingLevel="h4" className="type-h4 py-4">Solutions</AccordionTrigger>
              <AccordionContent className="pb-4">
                {solutionsMenu.map((col) => (
                  <div key={col.pillar}>
                    <SubHeading>{col.pillar}</SubHeading>
                    <ul>
                      {col.links.map((l) => (
                        <li key={l.href}>
                          <SheetLink link={l} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="industries">
              <AccordionTrigger headingLevel="h4" className="type-h4 py-4">Industries</AccordionTrigger>
              <AccordionContent className="pb-4">
                <SubHeading>Complex industries</SubHeading>
                <ul>
                  {featuredIndustries.map((i) => (
                    <li key={i.slug}>
                      <SheetLink link={{ label: i.name, href: industryPath(i.slug) }} />
                    </li>
                  ))}
                </ul>
                <SubHeading>More industries</SubHeading>
                {/* Named, not linked, until these have pages of their own */}
                <ul className="grid gap-y-2 py-1">
                  {moreIndustries.map((ind) =>
                    hasIndustryPage(ind.slug) ? (
                      <li key={ind.slug}>
                        <SheetLink link={{ label: ind.name, href: industryPath(ind.slug) }} />
                      </li>
                    ) : (
                      <li key={ind.slug} className="text-ink-800">
                        {ind.name}
                      </li>
                    ),
                  )}
                </ul>
                <SheetLink link={{ label: "View all industries", href: "/industries" }} className="mt-2 font-semibold text-brand-700" />
              </AccordionContent>
            </AccordionItem>

            {(
              [
                ["partners", "Partners", partnersMenu],
                ["resources", "Resources", resourcesMenu],
                ["company", "Company", companyMenu],
              ] as const
            ).map(([key, label, links]) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger headingLevel="h4" className="type-h4 py-4">{label}</AccordionTrigger>
                <AccordionContent className="pb-4">
                  <ul>
                    {links.map((l) => (
                      <li key={l.href}>
                        <SheetLink link={l} />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="py-6">
            <p className="type-small mb-1 font-medium text-muted">Log in</p>
            <ul>
              {[portals.partner, portals.merchant].map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-1.5 text-ink-900 hover:text-brand-700"
                  >
                    {p.label}
                    <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4 text-muted" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="grid shrink-0 gap-3 border-t border-line bg-paper px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <SheetClose asChild>
            <Button href={cta.apply.href} className="w-full" arrow>
              {cta.apply.label}
            </Button>
          </SheetClose>
          <div className="grid grid-cols-2 gap-3">
            <SheetClose asChild>
              <Button href={cta.expert.href} variant="secondary" size="sm" className="w-full">
                {cta.expert.label}
              </Button>
            </SheetClose>
            <Button href={cta.phone.href} variant="secondary" size="sm" className="w-full">
              <span className="inline-flex items-center gap-2">
                <Phone aria-hidden strokeWidth={1.75} className="size-4" />
                Call
              </span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
