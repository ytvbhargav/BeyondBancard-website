"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, describedBy } from "@/components/forms/Field";
import { apply } from "@/content/apply";
import type { ApplyValues } from "@/components/forms/schema";

export function BusinessStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ApplyValues>();

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Field id="legalName" label="Business legal name" required error={errors.legalName?.message} className="sm:col-span-2">
        <Input
          id="legalName"
          autoComplete="organization"
          aria-required
          aria-invalid={!!errors.legalName}
          aria-describedby={describedBy("legalName", { error: !!errors.legalName })}
          {...register("legalName")}
        />
      </Field>

      <Field id="industry" label="Industry" required error={errors.industry?.message} className="sm:col-span-2">
        <Controller
          control={control}
          name="industry"
          render={({ field }) => (
            <Select value={field.value || undefined} onValueChange={field.onChange} name={field.name}>
              <SelectTrigger
                id="industry"
                ref={field.ref}
                onBlur={field.onBlur}
                aria-required
                aria-invalid={!!errors.industry}
                aria-describedby={describedBy("industry", { error: !!errors.industry })}
              >
                <SelectValue placeholder="Choose an industry" />
              </SelectTrigger>
              <SelectContent>
                {apply.options.industries.map((g) => (
                  <SelectGroup key={g.group}>
                    <SelectLabel>{g.group}</SelectLabel>
                    {g.items.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field id="website" label="Website" error={errors.website?.message}>
        <Input
          id="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="example.com"
          aria-invalid={!!errors.website}
          aria-describedby={describedBy("website", { error: !!errors.website })}
          {...register("website")}
        />
      </Field>

      <Field id="yearsInBusiness" label="Years in business">
        <Controller
          control={control}
          name="yearsInBusiness"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} name={field.name}>
              <SelectTrigger id="yearsInBusiness" ref={field.ref} onBlur={field.onBlur}>
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {apply.options.yearsInBusiness.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field id="salesChannels" label="How do you sell?" hint="Choose all that apply." as="fieldset" className="sm:col-span-2">
        <Controller
          control={control}
          name="salesChannels"
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-2" aria-describedby="salesChannels-hint">
              {apply.options.salesChannels.map((o) => {
                const checked = field.value.includes(o);
                const id = `channel-${o.replace(/\W+/g, "-").toLowerCase()}`;
                return (
                  <label
                    key={o}
                    htmlFor={id}
                    className="flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-line-strong bg-surface px-4 text-[0.9375rem] transition-colors duration-(--duration-fast) hover:border-brand-600 has-[[data-state=checked]]:border-brand-600 has-[[data-state=checked]]:bg-brand-50"
                  >
                    <Checkbox
                      id={id}
                      checked={checked}
                      onCheckedChange={(v) =>
                        field.onChange(v ? [...field.value, o] : field.value.filter((x: string) => x !== o))
                      }
                    />
                    {o}
                  </label>
                );
              })}
            </div>
          )}
        />
      </Field>
    </div>
  );
}
