"use client";

import Link from "next/link";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldError, describedBy } from "@/components/forms/Field";
import { apply } from "@/content/apply";
import { href } from "@/lib/links";
import type { ApplyValues } from "@/components/forms/schema";

export function ContactStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ApplyValues>();

  const text = (name: "firstName" | "lastName" | "email" | "phone", label: string, props: React.ComponentProps<"input">) => (
    <Field id={name} label={label} required error={errors[name]?.message}>
      <Input
        id={name}
        aria-required
        aria-invalid={!!errors[name]}
        aria-describedby={describedBy(name, { error: !!errors[name] })}
        {...props}
        {...register(name)}
      />
    </Field>
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {text("firstName", "First name", { autoComplete: "given-name" })}
      {text("lastName", "Last name", { autoComplete: "family-name" })}
      {text("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
      {text("phone", "Phone", { type: "tel", autoComplete: "tel", inputMode: "tel" })}

      <Field id="bestTime" label="Best time to call" className="sm:col-span-2">
        <Controller
          control={control}
          name="bestTime"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} name={field.name}>
              <SelectTrigger id="bestTime" ref={field.ref} onBlur={field.onBlur} className="sm:max-w-[calc(50%-0.75rem)]">
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {apply.options.bestTime.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <div className="sm:col-span-2">
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <div className="flex items-start gap-3 rounded-sm border border-line bg-paper p-4">
              <Checkbox
                id="consent"
                ref={field.ref}
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v === true)}
                onBlur={field.onBlur}
                aria-required
                aria-invalid={!!errors.consent}
                aria-describedby={describedBy("consent", { error: !!errors.consent })}
                className="mt-0.5"
              />
              <label htmlFor="consent" className="text-[0.9375rem] text-ink-900">
                {apply.consent}
                <span aria-hidden className="text-danger-600">
                  {" "}*
                </span>{" "}
                <Link
                  href={href("/privacy-policy")}
                  target="_blank"
                  className="font-medium text-brand-700 underline underline-offset-3"
                >
                  Privacy Policy
                  <span className="sr-only"> (opens in a new tab)</span>
                </Link>
              </label>
            </div>
          )}
        />
        <FieldError id="consent-error" message={errors.consent?.message} />
      </div>
    </div>
  );
}
