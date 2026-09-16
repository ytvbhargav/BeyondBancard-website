"use client";

import { AnimatePresence, m } from "motion/react";
import { CircleAlert } from "lucide-react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";

/** Inline error that slides in under a field (danger colour, icon + text). */
export function FieldError({ id, message }: { id: string; message?: string }) {
  const reduce = useReducedMotionSafe();
  return (
    <AnimatePresence initial={false}>
      {message && (
        <m.p
          key={message}
          id={id}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -4, height: 0 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, height: "auto" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, height: 0 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <span className="type-small flex items-start gap-1.5 pt-2 font-medium text-danger-600">
            <CircleAlert aria-hidden strokeWidth={2} className="mt-0.5 size-4 shrink-0" />
            {message}
          </span>
        </m.p>
      )}
    </AnimatePresence>
  );
}

/** Label + control + hint + error, wired together with ids. */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
  as = "div",
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "fieldset";
}) {
  const Tag = as;
  const LabelTag = as === "fieldset" ? "legend" : "label";
  return (
    <Tag className={cn("min-w-0", className)}>
      <LabelTag
        {...(as === "div" ? { htmlFor: id } : {})}
        id={`${id}-label`}
        className="mb-2 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-ink-900"
      >
        {label}
        {required && (
          <span aria-hidden className="text-danger-600">
            *
          </span>
        )}
      </LabelTag>
      {hint && (
        <p id={`${id}-hint`} className="type-small -mt-1 mb-2 text-muted">
          {hint}
        </p>
      )}
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </Tag>
  );
}

export function describedBy(id: string, opts: { hint?: boolean; error?: boolean }) {
  return [opts.hint && `${id}-hint`, opts.error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}
