"use client";

import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// shadcn/ui NavigationMenu, restyled to Beyond Bancard tokens. Viewport placement
// is handled by the consumer (see components/layout/MegaMenu.tsx).

function NavigationMenu({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      delayDuration={80}
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("flex list-none items-center gap-0.5", className)}
      {...props}
    />
  );
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn(className)} {...props} />;
}

function NavigationMenuTrigger({
  className,
  children,
  tone = "light",
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger> & { tone?: "light" | "dark" }) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        "group/trigger inline-flex h-11 items-center gap-1 rounded-pill px-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-(--duration-fast) xl:px-3",
        tone === "light"
          ? "text-ink-900 hover:bg-ink-900/[0.06] data-[state=open]:bg-ink-900/[0.06]"
          : "text-on-dark hover:bg-white/10 data-[state=open]:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden
        strokeWidth={2}
        className="size-3.5 opacity-70 transition-transform duration-(--duration-fast) ease-out group-data-[state=open]/trigger:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "top-0 left-0",
        "data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=from-]:duration-200",
        "data-[motion=from-end]:slide-in-from-right-4 data-[motion=from-start]:slide-in-from-left-4",
        "data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out data-[motion^=to-]:duration-150",
        "data-[motion=to-end]:slide-out-to-right-4 data-[motion=to-start]:slide-out-to-left-4",
        "absolute",
        className,
      )}
      {...props}
    />
  );
}

const NavigationMenuViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>
>(function NavigationMenuViewport({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      data-slot="navigation-menu-viewport"
      className={cn(
        "relative h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) origin-top overflow-hidden rounded-lg border border-line bg-surface text-ink-900 shadow-float",
        "transition-[width,height] duration-250 ease-in-out",
        "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-2 data-[state=open]:duration-200",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-top-2 data-[state=closed]:duration-150",
        className,
      )}
      {...props}
    />
  );
});

function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return <NavigationMenuPrimitive.Link data-slot="navigation-menu-link" className={cn(className)} {...props} />;
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport,
};
