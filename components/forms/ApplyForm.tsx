"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Info, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BusinessStep } from "@/components/forms/steps/BusinessStep";
import { ProcessingStep } from "@/components/forms/steps/ProcessingStep";
import { ContactStep } from "@/components/forms/steps/ContactStep";
import { SuccessPanel } from "@/components/forms/SuccessPanel";
import { applySchema, defaultValues, stepFields, stepSchemas, type ApplyValues } from "@/components/forms/schema";
import { apply } from "@/content/apply";
import { duration, ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";

const STEPS = [BusinessStep, ProcessingStep, ContactStep];
const SUBMIT_DELAY = 1200;

/**
 * Multi-step application (S9). Steps slide in the direction of travel, the
 * progress bar animates, and success draws a checkmark. Nothing is sent
 * anywhere: submission is simulated.
 */
export function ApplyForm() {
  const methods = useForm<ApplyValues>({
    resolver: zodResolver(applySchema),
    defaultValues,
    mode: "onTouched",
  });
  const { control, trigger, handleSubmit, setFocus } = methods;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"editing" | "submitting" | "done">("editing");
  const [submitted, setSubmitted] = useState<ApplyValues | null>(null);
  const moved = useRef(false);
  const reduce = useReducedMotionSafe();

  const values = useWatch({ control });
  const stepValid = stepSchemas[step].safeParse(values).success;

  // The new step mounts after the old one finishes exiting, so focus its
  // heading when it attaches rather than in an effect.
  const headingRef = useCallback((el: HTMLHeadingElement | null) => {
    if (el && moved.current) el.focus();
  }, []);

  async function next() {
    const ok = await trigger(stepFields[step], { shouldFocus: true });
    if (!ok) return;
    moved.current = true;
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    moved.current = true;
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  const onSubmit = handleSubmit(
    (data) => {
      setStatus("submitting");
      // Demo: no network request. Simulate a short wait, then confirm.
      window.setTimeout(() => {
        setSubmitted(data);
        setStatus("done");
      }, SUBMIT_DELAY);
    },
    (errors) => {
      const firstInvalid = stepFields[step].find((f) => errors[f]);
      if (firstInvalid) setFocus(firstInvalid);
    },
  );

  if (status === "done" && submitted) {
    return <SuccessPanel firstName={submitted.firstName} />;
  }

  const StepComponent = STEPS[step];
  const last = step === STEPS.length - 1;
  const offset = reduce ? 0 : 32;

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (last) onSubmit(e);
          else next();
        }}
        className="rounded-lg border border-line bg-surface"
        aria-describedby="apply-required-note"
      >
        {/* phone pass (D-063): px-5 below sm matches the 20px page gutter; sm:px-8 restores today's value. */}
        <div className="border-b border-line px-5 pt-6 pb-5 sm:px-8">
          <ol className="flex items-center gap-2 sm:gap-6" aria-label="Application steps">
            {apply.steps.map((label, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={label} className="flex items-center gap-2" aria-current={current ? "step" : undefined}>
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-6 place-items-center rounded-pill text-[0.75rem] font-bold tabular transition-colors duration-(--duration-base)",
                      done && "bg-success-600 text-white",
                      current && "bg-ink-900 text-on-dark",
                      !done && !current && "border border-line-strong text-muted",
                    )}
                  >
                    {done ? <Check strokeWidth={3} className="size-3.5" /> : i + 1}
                  </span>
                  <span className={cn("type-small", current ? "font-semibold text-ink-900" : "hidden text-muted sm:inline")}>
                    {label}
                    <span className="sr-only">{done ? ", complete" : current ? ", current step" : ""}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <Progress className="mt-5" value={((step + 1) / STEPS.length) * 100} aria-label="Application progress" />
        </div>

        {/* phone pass (D-063): px-5 and pt-6 below sm (20px gutter, 8px less above the heading); sm:px-8 sm:pt-8 restore today's values. */}
        <div className="relative overflow-hidden px-5 pt-6 pb-2 sm:px-8 sm:pt-8">
          <p aria-live="polite" className="sr-only">
            Step {step + 1} of {STEPS.length}: {apply.steps[step]}
          </p>
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <m.fieldset
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * offset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * offset }}
              transition={{ duration: reduce ? 0 : duration.base, ease: ease.out }}
              disabled={status === "submitting"}
              className="min-w-0"
            >
              <legend className="sr-only">{apply.steps[step]}</legend>
              {/* phone pass (D-063): mb-5 below sm tightens the heading-to-first-field gap; sm:mb-7 restores today's value. */}
              <div className="mb-5 flex items-baseline justify-between gap-4 sm:mb-7">
                <h2 ref={headingRef} tabIndex={-1} className="type-h3 outline-none">
                  {apply.steps[step]}
                </h2>
                <p className="type-small tabular text-muted">
                  Step {step + 1} of {STEPS.length}
                </p>
              </div>
              <StepComponent />
            </m.fieldset>
          </AnimatePresence>
        </div>

        {/* phone pass (D-063): px-5 below sm matches the 20px page gutter; sm:px-8 restores today's value. */}
        <div className="mt-6 flex flex-col-reverse gap-4 border-t border-line px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p id="apply-required-note" className="type-small flex items-center gap-2 text-muted">
            <Info aria-hidden strokeWidth={1.75} className="size-4 shrink-0" />
            {last ? apply.demoNotice : "Fields marked * are required."}
          </p>
          <div className="flex gap-3">
            {step > 0 && (
              <Button variant="secondary" onClick={back} disabled={status === "submitting"}>
                Back
              </Button>
            )}
            {last ? (
              <Button type="submit" aria-disabled={!stepValid || undefined} className={cn("flex-1 sm:flex-none", !stepValid && "opacity-60")}>
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle aria-hidden strokeWidth={2} className="size-4 animate-spin" />
                    Submitting
                  </span>
                ) : (
                  "Submit application"
                )}
              </Button>
            ) : (
              <Button type="submit" arrow aria-disabled={!stepValid || undefined} className={cn("flex-1 sm:flex-none", !stepValid && "opacity-60")}>
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
