import * as React from "react";
import { cn } from "@/lib/utils";
import { fieldBase } from "@/components/ui/input";

// shadcn/ui Textarea, restyled to match Input: same border, focus ring and invalid state, grows vertically.
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldBase, "h-auto min-h-40 resize-y py-3 leading-6", className)}
      {...props}
    />
  );
}

export { Textarea };
