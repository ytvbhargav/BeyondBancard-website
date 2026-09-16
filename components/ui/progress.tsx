"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

// shadcn/ui Progress, restyled. Indicator scales from the left (transform only).
function Progress({ className, value, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn("relative h-1.5 w-full overflow-hidden rounded-pill bg-line", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full origin-left rounded-pill bg-brand-600 transition-transform duration-(--duration-slow) ease-out"
        style={{ transform: `scaleX(${(value ?? 0) / 100})` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
