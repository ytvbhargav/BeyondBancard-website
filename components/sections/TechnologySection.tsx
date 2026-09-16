"use client";

import { useState } from "react";
import { m } from "motion/react";
import { Check, Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MaybeConfirm } from "@/components/ui/confirm";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { duration, ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";
import type { Confirmable } from "@/types/content";

const KIND: Record<string, string> = {
  "Authorize.net": "Payment gateway",
  NMI: "Payment gateway",
  USAePay: "Payment gateway",
  Clover: "POS system",
};

/**
 * Technology (PRD §9.1.8). The 2×2 gateway tiles are the tab list; choosing
 * one swaps the example checkout on the right.
 */
export function TechnologySection({
  title,
  body,
  equipment,
  gateways,
}: {
  title: string;
  body: string;
  equipment: Confirmable<string>;
  gateways: string[];
}) {
  const [value, setValue] = useState(gateways[0]);
  // The first panel renders in place; later selections animate in.
  const [first, setFirst] = useState(true);
  const reduce = useReducedMotionSafe();
  const select = (v: string) => {
    setFirst(false);
    setValue(v);
  };

  return (
    <section className="section-y bg-surface" aria-labelledby="tech-title">
      <Container>
        <Tabs value={value} onValueChange={select} className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="tech-title" className="type-h2">
              {title}
            </h2>
            <p className="type-body-lg mt-5 text-muted">
              {body}{" "}
              <MaybeConfirm item={equipment}>{equipment.value}</MaybeConfirm>
            </p>
            <TabsList aria-label="Gateways and POS" className="mt-10 grid grid-cols-2 gap-3">
              {gateways.map((g) => (
                <TabsTrigger
                  key={g}
                  value={g}
                  className={cn(
                    "group/tile flex min-h-24 flex-col items-start justify-between rounded-md border bg-surface p-4 text-left transition-[border-color,box-shadow,transform] duration-(--duration-fast) ease-out",
                    "border-line hover:-translate-y-0.5 hover:border-brand-600",
                    "data-[state=active]:border-ink-900 data-[state=active]:shadow-[inset_0_0_0_1px_var(--color-ink-900)]",
                  )}
                >
                  <span className="flex w-full items-center justify-between gap-2">
                    <span className="type-h4">{g}</span>
                    <span
                      aria-hidden
                      className="grid size-5 place-items-center rounded-pill border border-line-strong text-white transition-colors group-data-[state=active]/tile:border-ink-900 group-data-[state=active]/tile:bg-ink-900"
                    >
                      <Check strokeWidth={3} className="size-3 opacity-0 group-data-[state=active]/tile:opacity-100" />
                    </span>
                  </span>
                  <span className="type-small text-muted">{KIND[g] ?? "Integration"}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative grid min-h-[27rem] place-items-center overflow-hidden rounded-lg border border-line bg-paper p-6 sm:p-10">
              {gateways.map((g) => (
                <TabsContent key={g} value={g} className="w-full max-w-[22rem]">
                  <m.div
                    initial={first ? false : { opacity: 0, y: reduce ? 0 : 14, scale: reduce ? 1 : 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: reduce ? 0 : duration.base, ease: ease.out }}
                  >
                    {KIND[g] === "POS system" ? <TerminalMock name={g} /> : <CheckoutMock gateway={g} />}
                  </m.div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </Container>
    </section>
  );
}

function CheckoutMock({ gateway }: { gateway: string }) {
  return (
    <figure className="rounded-md border border-line bg-surface shadow-float" aria-label={`Example checkout processed through ${gateway}`}>
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <span className="type-h4">Checkout</span>
        <Badge status="illustration" icon={false}>
          Example
        </Badge>
      </div>
      <div className="space-y-3 px-5 py-5" aria-hidden>
        <div className="flex items-baseline justify-between">
          <span className="type-small text-muted">Order total</span>
          <span className="tabular font-display text-[1.375rem] font-bold [font-stretch:108%]">$49.00</span>
        </div>
        <div className="rounded-sm border border-line px-3 py-2.5">
          <span className="type-small block text-muted">Card number</span>
          <span className="tabular block tracking-[0.12em]">•••• •••• •••• 4242</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-sm border border-line px-3 py-2.5">
            <span className="type-small block text-muted">Expiry</span>
            <span className="tabular block">12 / 28</span>
          </div>
          <div className="rounded-sm border border-line px-3 py-2.5">
            <span className="type-small block text-muted">CVC</span>
            <span className="tabular block tracking-[0.12em]">•••</span>
          </div>
        </div>
        <div className="flex h-12 items-center justify-center gap-2 rounded-pill bg-brand-600 font-semibold text-white">
          <Lock strokeWidth={2} className="size-4" />
          Pay $49.00
        </div>
      </div>
      <figcaption className="flex items-center justify-between gap-3 rounded-b-md border-t border-line bg-paper px-5 py-3">
        <span className="type-small text-muted">
          Processed via <span className="font-semibold text-ink-900">{gateway}</span>
        </span>
        <Badge status="approved">Approved</Badge>
      </figcaption>
    </figure>
  );
}

function TerminalMock({ name }: { name: string }) {
  return (
    <figure className="mx-auto w-full max-w-[17rem]" aria-label={`Example in-person payment on a ${name} terminal`}>
      <div className="rounded-[28px] border border-line-strong bg-ink-900 p-3 shadow-float" aria-hidden>
        <div className="rounded-[18px] bg-surface px-5 pt-6 pb-5 text-center">
          <Badge status="illustration" icon={false}>
            Example
          </Badge>
          <p className="tabular mt-5 font-display text-[2.25rem] leading-none font-extrabold [font-stretch:108%]">$49.00</p>
          <p className="type-small mt-2 text-muted">Tap, insert or swipe</p>
          <div className="mx-auto mt-6 grid size-16 place-items-center rounded-pill border-2 border-dashed border-brand-300">
            <span className="size-6 rounded-pill bg-brand-600" />
          </div>
          <div className="mt-6 flex h-11 items-center justify-center rounded-pill bg-success-100 text-[0.875rem] font-semibold text-success-700">
            Ready
          </div>
        </div>
        <div className="flex items-center justify-center py-3">
          <span className="h-1 w-12 rounded-pill bg-ink-700" />
        </div>
      </div>
      <figcaption className="type-small mt-4 text-center text-muted">
        In-person with <span className="font-semibold text-ink-900">{name}</span>
      </figcaption>
    </figure>
  );
}
