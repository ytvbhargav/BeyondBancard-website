"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/Reveal";
import { FieldError, describedBy } from "@/components/forms/Field";
import { BlockTitle, ChapterMark, type BlockProps } from "@/components/sections/solution/BlockSection";
import { cn } from "@/lib/utils";
import type { EstimatorBlock } from "@/types/content";

/** Lets typing settle before hints show and the result is announced: one announcement, not one per keystroke. */
const SETTLE_MS = 600;

/** Whole dollars, "$19,500". */
const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
/** Field values, "50,000" and "3.25". */
const plain = new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 });

type Values = { volume: string; rate: string };
type Name = keyof Values;
type FieldState = { id: string; value: string; error?: string; onChange: (value: string) => void; onBlur: () => void };
type NumberFieldCopy = { label: string; unit: string; affix: "$" | "%" };

/** Reads "50,000", "$50000" and "3.25 %" alike; empty, negative or anything else is null. */
function parse(raw: string): number | null {
  const cleaned = raw.replace(/[\s,$%]/g, "");
  return /^(\d+\.?\d*|\.\d+)$/.test(cleaned) ? Number(cleaned) : null;
}

/** The annual figure (volume × rate ÷ 100 × 12, whole dollars), or a hint for each field that can't be read. */
function estimate(values: Values, block: EstimatorBlock) {
  const volume = parse(values.volume);
  const rate = parse(values.rate);
  const rateOk = rate !== null && rate <= 100;
  const errors: Partial<Record<Name, string>> = {};
  if (volume === null) errors.volume = `Enter an amount, such as ${plain.format(block.volume.defaultValue)}.`;
  if (!rateOk) errors.rate = `Enter a rate from 0 to 100, such as ${plain.format(block.rate.defaultValue)}.`;
  const annual = volume !== null && rate !== null && rateOk ? Math.round(((volume * rate) / 100) * 12) : null;
  return { annual, errors };
}

/**
 * Current processing cost estimate (D-058). Left: the h2, optional lead and two
 * fields (volume with a "$" prefix, rate with a "%" suffix; commas and signs are
 * tolerated, and a readable entry is tidied on blur). Right: a file panel laid
 * out like EnvironmentSelector's: the "Estimate" pill, the result label, the
 * annual figure, the disclaimer, then the onward button under a hairline.
 *
 * The figure follows every keystroke: one line of tabular Archivo in a panel
 * sized by the grid, so its changes move nothing. Unreadable input shows "—" and,
 * once typing settles, an inline hint in space each field keeps for it; with the
 * panel pinned to the top of its row, a hint never moves the figure either. The
 * settled result is announced through a polite live region, empty until the
 * first edit so nothing is read out on load. Stacks below lg.
 */
export function CostEstimator({ block, tone, headingId, index }: BlockProps<EstimatorBlock>) {
  const [initial] = useState<Values>(() => ({
    volume: plain.format(block.volume.defaultValue),
    rate: plain.format(block.rate.defaultValue),
  }));
  const [values, setValues] = useState(initial);
  const [settled, setSettled] = useState(initial);

  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(values), SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [values]);

  const { annual } = estimate(values, block);
  const done = estimate(settled, block);
  const announcement =
    settled === initial
      ? ""
      : done.annual === null
        ? `Estimate not available. ${[done.errors.volume, done.errors.rate].filter(Boolean).join(" ")}`
        : `${block.resultLabel}: ${dollars.format(done.annual)}`;

  const idBase = headingId.replace(/-title$/, "");
  const field = (name: Name): FieldState => ({
    id: `${idBase}-${name}`,
    value: values[name],
    error: done.errors[name],
    onChange: (next: string) => setValues((v) => ({ ...v, [name]: next })),
    onBlur: () => {
      const n = parse(values[name]);
      if (n !== null && plain.format(n) !== values[name]) setValues((v) => ({ ...v, [name]: plain.format(n) }));
    },
  });

  return (
    <Section id={block.id} tone={tone} aria-labelledby={headingId}>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
        <Reveal className="lg:col-span-5">
          <ChapterMark index={index} />
          <h2 id={headingId} className="type-h2 max-w-[20ch]">
            <BlockTitle title={block.title} flag={block} />
          </h2>
          {block.lead && <p className="type-body-lg mt-5 max-w-[28rem] text-muted">{block.lead}</p>}
          {/* No row gap: each field's hint space separates the rows */}
          <div className="mt-10 grid gap-x-6 sm:grid-cols-2 lg:max-w-[24rem] lg:grid-cols-1">
            <NumberField {...field("volume")} label={block.volume.label} unit="in dollars" affix="$" />
            <NumberField {...field("rate")} label={block.rate.label} unit="percent" affix="%" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          {/* A white file panel on either tone, like the selector and comparison panels (spec §4) */}
          <div className="rounded-md border border-line bg-surface p-5 sm:p-6 md:p-8">
            <Badge status="illustration" icon={false}>
              Estimate
            </Badge>
            <h3 className="type-h4 mt-5 max-w-[26rem]">{block.resultLabel}</h3>
            <p className={cn("type-h1 tabular mt-3 wrap-anywhere", annual === null ? "text-muted" : "text-ink-900")}>
              {annual === null ? (
                <>
                  <span aria-hidden>—</span>
                  <span className="sr-only">Not available</span>
                </>
              ) : (
                dollars.format(annual)
              )}
            </p>
            <p className="type-small mt-5 max-w-[34rem] text-muted">{block.disclaimer}</p>
            <div className="mt-8 border-t border-line pt-6">
              {/* Wraps rather than overflowing if a label outgrows a phone-width panel */}
              <Button
                href={block.cta.href}
                variant="secondary"
                arrow
                className="h-auto min-h-12 py-3 text-center whitespace-normal"
              >
                {block.cta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </Section>
  );
}

/**
 * Label, box and inline hint (the Field pattern) with the unit set inside the box:
 * "$" before the number, "%" after it. The sign is decorative; screen readers get
 * the unit from the label. `maxLength` stops entries long enough to overrun the figure.
 */
function NumberField({ id, value, error, onChange, onBlur, label, unit, affix }: FieldState & NumberFieldCopy) {
  const prefix = affix === "$";
  return (
    <div className="min-w-0">
      <Label htmlFor={id} className="mb-2">
        {label}
        <span className="sr-only">, {unit}</span>
      </Label>
      <div className="relative">
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 flex items-center text-muted",
            prefix ? "left-4" : "right-4",
          )}
        >
          {affix}
        </span>
        <Input
          id={id}
          type="text"
          inputMode="decimal"
          enterKeyHint="done"
          autoComplete="off"
          spellCheck={false}
          maxLength={prefix ? 16 : 8}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, { error: Boolean(error) })}
          className={cn("tabular", prefix ? "pl-8" : "pr-10")}
        />
      </div>
      {/* Room for a one-line hint is kept, so one appearing never pushes the panel down on phones */}
      <div className="min-h-8">
        <FieldError id={`${id}-error`} message={error} />
      </div>
    </div>
  );
}
