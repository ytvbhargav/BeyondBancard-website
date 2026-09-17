import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

/**
 * Company values (spec §3.1) as ruled rows: the value left, what it means right.
 * Not numbered, because values have no order (D-005). Split from md, where a
 * stacked row would leave the right third of the container empty.
 */
export function ValuesList({
  items,
  className,
}: {
  items: readonly { title: string; body: string }[];
  className?: string;
}) {
  return (
    <Stagger as="ul" className={cn("border-b border-line", className)}>
      {items.map((v) => (
        <StaggerItem
          as="li"
          key={v.title}
          className="grid gap-3 border-t border-line py-8 first:border-line-strong md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
        >
          {/* 30px at lg: the Testimonials quote step; no type token exists between h3 (24px) and h2 (44px) yet */}
          <h3 className="type-h3 md:col-span-5 lg:text-[1.875rem]">{v.title}</h3>
          <p className="max-w-[36rem] type-body-lg text-muted md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
            {v.body}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
