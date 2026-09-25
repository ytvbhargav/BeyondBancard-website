"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  companyMenu,
  cta,
  partnersMenu,
  portals,
  resourcesMenu,
  solutionsMenu,
} from "@/content/site";
import { featuredIndustries, hasIndustryPage, industryPath, menuIndustries } from "@/content/industries";
import { href } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types/content";

type MenuKey = "solutions" | "industries" | "partners" | "resources" | "company";

const PANEL_WIDTH: Record<MenuKey, number> = {
  solutions: 1000,
  industries: 880,
  partners: 640,
  resources: 280,
  company: 280,
};

const MENU: { key: MenuKey; label: string }[] = [
  { key: "solutions", label: "Solutions" },
  { key: "industries", label: "Industries" },
  { key: "partners", label: "Partners" },
  { key: "resources", label: "Resources" },
  { key: "company", label: "Company" },
];

function panelStyle(key: MenuKey) {
  return { width: `min(${PANEL_WIDTH[key]}px, calc(100vw - 48px))` };
}

function MenuLink({ link, index, className, children }: { link: NavLink; index: number; className?: string; children?: React.ReactNode }) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href(link.href)}
        className={cn(
          "menu-stagger -mx-2.5 flex min-h-11 items-center rounded-sm px-2.5 text-[0.9375rem] text-ink-900 transition-colors duration-(--duration-fast) hover:bg-paper hover:text-brand-700",
          className,
        )}
        style={{ "--i": index } as React.CSSProperties}
      >
        {children ?? link.label}
      </Link>
    </NavigationMenuLink>
  );
}

function SolutionsPanel() {
  let i = 0;
  return (
    <div style={panelStyle("solutions")}>
      <div className="grid grid-cols-4 gap-6 p-8">
        {solutionsMenu.map((col) => (
          <div key={col.pillar}>
            <NavigationMenuLink asChild>
              <Link
                href={href(col.href)}
                className="menu-stagger group/col -mx-2.5 block rounded-sm px-2.5 py-2 hover:bg-paper"
                style={{ "--i": i++ } as React.CSSProperties}
              >
                <span className="type-h4 block text-ink-900 group-hover/col:text-brand-700">{col.pillar}</span>
                <span className="type-small mt-0.5 block text-muted">{col.descriptor}</span>
              </Link>
            </NavigationMenuLink>
            <ul className="mt-3 border-t border-line pt-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <MenuLink link={l} index={i++} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-6 border-t border-line bg-paper px-8 py-3">
        <p className="type-small text-muted">Not sure where to start?</p>
        <NavigationMenuLink asChild>
          <Link
            href={href(cta.expert.href)}
            className="group/cta inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-700"
          >
            <span className="link-draw">{cta.expert.label}</span>
            <ArrowRight aria-hidden strokeWidth={1.75} className="size-4 transition-transform duration-(--duration-fast) group-hover/cta:translate-x-[3px]" />
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}

function IndustriesPanel() {
  let i = 0;
  return (
    <div style={panelStyle("industries")} className="grid grid-cols-[1.6fr_1fr]">
      <div className="p-8">
        <p className="type-small mb-3 font-medium text-muted">Complex industries</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
          {featuredIndustries.map((ind) => (
            <li key={ind.slug}>
              <NavigationMenuLink asChild>
                <Link
                  href={href(industryPath(ind.slug))}
                  className="menu-stagger group/ind -mx-2.5 block rounded-sm px-2.5 py-2.5 transition-colors hover:bg-paper"
                  style={{ "--i": i++ } as React.CSSProperties}
                >
                  <span className="block text-[0.9375rem] font-semibold text-ink-900 group-hover/ind:text-brand-700">{ind.name}</span>
                  <span className="type-small mt-0.5 block text-muted">{ind.teaser}</span>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col border-l border-line bg-paper p-8">
        <p className="type-small mb-3 font-medium text-muted">More industries</p>
        {/* Named, not linked: none of these has a page yet, and a link would
            land on the redesign placeholder. The moment one becomes a featured
            industry it gains a page and this list links it by itself. */}
        <ul className="grid gap-y-1.5">
          {menuIndustries.map((ind) =>
            hasIndustryPage(ind.slug) ? (
              <li key={ind.slug}>
                <MenuLink link={{ label: ind.name, href: industryPath(ind.slug) }} index={i++} />
              </li>
            ) : (
              <li key={ind.slug} className="text-[0.9375rem] text-ink-800">
                {ind.name}
              </li>
            ),
          )}
        </ul>
        <NavigationMenuLink asChild>
          <Link
            href="/industries"
            className="group/all mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-[0.9375rem] font-semibold text-brand-700"
          >
            <span className="link-draw">View all industries</span>
            <ArrowRight aria-hidden strokeWidth={1.75} className="size-4 transition-transform duration-(--duration-fast) group-hover/all:translate-x-[3px]" />
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}

function PartnersPanel() {
  return (
    <div style={panelStyle("partners")}>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-1 p-8">
        {partnersMenu.map((p, i) => (
          <li key={p.href}>
            <NavigationMenuLink asChild>
              <Link
                href={href(p.href)}
                className="menu-stagger group/p -mx-2.5 block rounded-sm px-2.5 py-2.5 transition-colors hover:bg-paper"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="block text-[0.9375rem] font-semibold text-ink-900 group-hover/p:text-brand-700">{p.label}</span>
                <span className="type-small mt-0.5 block text-muted">{p.description}</span>
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-6 border-t border-line bg-paper px-8 py-3">
        <p className="type-small text-muted">Already a partner?</p>
        <NavigationMenuLink asChild>
          <a
            href={portals.partner.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-700"
          >
            <span className="link-draw">Log in to the partner portal</span>
            <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </NavigationMenuLink>
      </div>
    </div>
  );
}

function ListPanel({ links, width }: { links: NavLink[]; width: MenuKey }) {
  return (
    <ul style={panelStyle(width)} className="p-5">
      {links.map((l, i) => (
        <li key={l.href}>
          <MenuLink link={l} index={i} className="mx-0" />
        </li>
      ))}
    </ul>
  );
}

const PANELS: Record<MenuKey, () => React.ReactNode> = {
  solutions: () => <SolutionsPanel />,
  industries: () => <IndustriesPanel />,
  partners: () => <PartnersPanel />,
  resources: () => <ListPanel links={resourcesMenu} width="resources" />,
  company: () => <ListPanel links={companyMenu} width="company" />,
};

/**
 * Desktop mega menu (M2). The panel follows the active trigger and morphs
 * between sizes; Radix handles hover intent, arrow keys, Esc and focus return.
 */
export function MegaMenu({
  containerRef,
  tone,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  tone: "light" | "dark";
}) {
  const [value, setValue] = useState("");
  const [x, setX] = useState(0);
  const [glide, setGlide] = useState(false);
  const triggers = useRef<Partial<Record<MenuKey, HTMLButtonElement | null>>>({});
  const previous = useRef("");

  const place = useCallback(
    (key: MenuKey) => {
      const container = containerRef.current;
      const trigger = triggers.current[key];
      if (!container || !trigger) return;
      const c = container.getBoundingClientRect();
      const t = trigger.getBoundingClientRect();
      const width = Math.min(PANEL_WIDTH[key], window.innerWidth - 48);
      const centre = t.left + t.width / 2 - c.left;
      const min = 8;
      const max = Math.max(min, c.width - width - 8);
      setX(Math.round(Math.min(Math.max(centre - width / 2, min), max)));
    },
    [containerRef],
  );

  useLayoutEffect(() => {
    if (value) {
      // Glide only when switching between open panels, not on first open.
      setGlide(Boolean(previous.current));
      place(value as MenuKey);
    }
    previous.current = value;
  }, [value, place]);

  return (
    <NavigationMenu value={value} onValueChange={setValue} aria-label="Main">
      <NavigationMenuList>
        {MENU.map((item) => (
          <NavigationMenuItem key={item.key} value={item.key}>
            <NavigationMenuTrigger
              tone={tone}
              ref={(el) => {
                triggers.current[item.key] = el;
              }}
            >
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>{PANELS[item.key]()}</NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>

      <div
        className={cn(
          "absolute top-full left-0 z-50 pt-2",
          glide && "transition-transform duration-250 ease-in-out motion-reduce:transition-none",
        )}
        style={{ transform: `translateX(${x}px)` }}
      >
        <NavigationMenuViewport />
      </div>
    </NavigationMenu>
  );
}

/** "Log in" dropdown with the two external portals. */
export function LoginMenu({ tone }: { tone: "light" | "dark" }) {
  return (
    <NavigationMenu aria-label="Log in" className="relative">
      <NavigationMenuList>
        <NavigationMenuItem value="login">
          <NavigationMenuTrigger tone={tone}>Log in</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-64 p-3">
              {[portals.partner, portals.merchant].map((p, i) => (
                <li key={p.href}>
                  <NavigationMenuLink asChild>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="menu-stagger flex min-h-11 items-center justify-between gap-2 rounded-sm px-3 text-[0.9375rem] text-ink-900 transition-colors hover:bg-paper hover:text-brand-700"
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      {p.label}
                      <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4 text-muted" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="absolute top-full right-0 z-50 pt-2">
        <NavigationMenuViewport />
      </div>
    </NavigationMenu>
  );
}
