import * as React from "react";
import { cn } from "@/lib/utils";

// shadcn/ui Input, restyled: 48px tall, 16px text (no iOS zoom), clear invalid state.
export const fieldBase =
  "h-12 w-full min-w-0 rounded-sm border border-line-strong bg-surface px-4 text-base text-ink-900 transition-[border-color,box-shadow] duration-(--duration-fast) placeholder:text-muted hover:border-ink-700/50 focus-visible:border-brand-600 focus-visible:shadow-[0_0_0_3px_var(--color-brand-100)] aria-invalid:border-danger-600 disabled:cursor-not-allowed disabled:opacity-50";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldBase, className)} {...props} />;
}

export { Input };
