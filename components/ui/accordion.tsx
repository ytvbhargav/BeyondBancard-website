"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// shadcn/ui Accordion, restyled. Height auto-animates; the plus rotates 45° (M8).

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-line", className)} {...props} />;
}

function AccordionTrigger({
  className,
  children,
  headingLevel: Heading = "h3",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & { headingLevel?: "h3" | "h4" }) {
  return (
    <AccordionPrimitive.Header asChild>
      <Heading className="flex">
        <AccordionPrimitive.Trigger
          data-slot="accordion-trigger"
          className={cn(
            "group/acc flex min-h-11 flex-1 items-start justify-between gap-6 py-5 text-left transition-colors duration-(--duration-fast) hover:text-brand-700",
            className,
          )}
          {...props}
        >
          {children}
          {/* phone pass (D-063): -mt-0.5 below sm centres the 28px circle on the question's first line (type-h4 is ~22px tall at 17px), so it no longer sits ~5px low; multi-line questions stay top-aligned. sm:mt-0.5 restores today's value. */}
          <span
            aria-hidden
            className="-mt-0.5 sm:mt-0.5 grid size-7 shrink-0 place-items-center rounded-pill border border-line transition-[transform,background-color,border-color,color] duration-(--duration-base) ease-out group-hover/acc:border-brand-600 group-data-[state=open]/acc:rotate-45 group-data-[state=open]/acc:border-ink-900 group-data-[state=open]/acc:bg-ink-900 group-data-[state=open]/acc:text-on-dark"
          >
            <Plus strokeWidth={2} className="size-4" />
          </span>
        </AccordionPrimitive.Trigger>
      </Heading>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none"
      {...props}
    >
      <div className={cn("pb-6", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
