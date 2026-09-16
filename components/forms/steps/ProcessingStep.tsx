"use client";

import { AnimatePresence, m } from "motion/react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, describedBy } from "@/components/forms/Field";
import { apply } from "@/content/apply";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { ApplyValues } from "@/components/forms/schema";

function YesNo({ name, label, hint }: { name: "subscriptions" | "currentlyProcessing" | "declined"; label: string; hint?: string }) {
  const { control } = useFormContext<ApplyValues>();
  return (
    <Field id={name} label={label} hint={hint} as="fieldset">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            value={field.value ?? ""}
            onValueChange={field.onChange}
            aria-labelledby={`${name}-label`}
            aria-describedby={hint ? `${name}-hint` : undefined}
          >
            <RadioGroupItem value="yes">Yes</RadioGroupItem>
            <RadioGroupItem value="no">No</RadioGroupItem>
          </RadioGroup>
        )}
      />
    </Field>
  );
}

export function ProcessingStep() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ApplyValues>();
  const processing = useWatch({ control, name: "currentlyProcessing" });
  const reduce = useReducedMotionSafe();

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Field id="monthlyVolume" label="Estimated monthly card volume" required error={errors.monthlyVolume?.message}>
        <Controller
          control={control}
          name="monthlyVolume"
          render={({ field }) => (
            <Select value={field.value || undefined} onValueChange={field.onChange} name={field.name}>
              <SelectTrigger
                id="monthlyVolume"
                ref={field.ref}
                onBlur={field.onBlur}
                aria-required
                aria-invalid={!!errors.monthlyVolume}
                aria-describedby={describedBy("monthlyVolume", { error: !!errors.monthlyVolume })}
              >
                <SelectValue placeholder="Choose a range" />
              </SelectTrigger>
              <SelectContent>
                {apply.options.monthlyVolume.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field id="averageTicket" label="Average ticket">
        <Controller
          control={control}
          name="averageTicket"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} name={field.name}>
              <SelectTrigger id="averageTicket" ref={field.ref} onBlur={field.onBlur}>
                <SelectValue placeholder="Choose a range" />
              </SelectTrigger>
              <SelectContent>
                {apply.options.averageTicket.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <div className="grid gap-6 sm:col-span-2 sm:grid-cols-2">
        <YesNo name="subscriptions" label="Do you offer subscriptions?" />
        <YesNo name="currentlyProcessing" label="Are you currently processing cards?" />
      </div>

      <AnimatePresence initial={false}>
        {processing === "yes" && (
          <m.div
            key="processor"
            className="overflow-hidden sm:col-span-2"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid gap-6 border-l-2 border-brand-200 pl-5 sm:grid-cols-2">
              <Field id="currentProcessor" label="Current processor">
                <Input id="currentProcessor" autoComplete="off" {...register("currentProcessor")} />
              </Field>
              <YesNo name="declined" label="Have you been declined or terminated by a processor?" hint={apply.declinedHelp} />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
