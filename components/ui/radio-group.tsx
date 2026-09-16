"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

// shadcn/ui RadioGroup, restyled as segmented pill options.

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("flex flex-wrap gap-2", className)} {...props} />;
}

function RadioGroupItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "inline-flex h-11 min-w-20 items-center justify-center gap-2 rounded-pill border border-line-strong bg-surface px-5 text-[0.9375rem] font-medium text-ink-900 transition-colors duration-(--duration-fast)",
        "hover:border-brand-600 data-[state=checked]:border-ink-900 data-[state=checked]:bg-ink-900 data-[state=checked]:text-on-dark",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
