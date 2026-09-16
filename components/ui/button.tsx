import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { href as resolveHref, isExternal } from "@/lib/links";

/**
 * Buttons (PRD §5.5, M4). Pill shape, 44px minimum tap target, visible focus.
 * Hover lifts 1px and nudges the trailing arrow; press scales to 0.98.
 */
export const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-pill font-semibold",
    "transition-[transform,background-color,border-color,color] duration-(--duration-fast) ease-(--ease-out)",
    "hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:cursor-not-allowed",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: "bg-brand-600 text-white hover:bg-brand-700",
        secondary: "border-[1.5px] border-current bg-transparent text-ink-900 hover:bg-ink-900/5",
        "secondary-dark": "border-[1.5px] border-on-dark/70 bg-transparent text-on-dark hover:border-on-dark hover:bg-on-dark/10",
        inverse: "bg-surface text-brand-700 hover:bg-brand-50",
        "inverse-outline": "border-[1.5px] border-white/80 bg-transparent text-white hover:border-white hover:bg-white/10",
        ghost: "h-auto min-h-11 rounded-none px-0 text-brand-700 hover:translate-y-0 active:scale-100",
        "ghost-dark": "h-auto min-h-11 rounded-none px-0 text-on-dark hover:translate-y-0 active:scale-100",
      },
      size: {
        md: "h-12 px-6 text-base",
        sm: "h-11 px-5 text-[0.9375rem]",
        icon: "size-11 p-0",
      },
    },
    compoundVariants: [
      { variant: ["ghost", "ghost-dark"], size: ["md", "sm"], className: "px-0" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Common = VariantProps<typeof buttonVariants> & {
  /** Adds the trailing arrow that nudges on hover. */
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AsLink = Common &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children"> & {
    href: string;
  };

type AsButton = Common &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = AsLink | AsButton;

function Inner({ children, arrow, external, ghost }: { children: React.ReactNode; arrow?: boolean; external?: boolean; ghost?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <>
      <span className={cn(ghost && "link-draw")}>{children}</span>
      {(arrow || external) && (
        <Icon
          aria-hidden
          strokeWidth={1.75}
          className="size-[1.125em] transition-transform duration-(--duration-fast) ease-(--ease-out) group-hover/button:translate-x-[3px]"
        />
      )}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant, size, arrow, className, children } = props;
  const classes = cn(buttonVariants({ variant, size }), className);
  const ghost = variant === "ghost" || variant === "ghost-dark";

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href, variant: _v, size: _s, arrow: _a, className: _c, children: _ch, ...rest } = props;
    if (isExternal(href)) {
      const isWeb = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          <Inner arrow={arrow} external={isWeb} ghost={ghost}>
            {children}
            {isWeb && <span className="sr-only"> (opens in a new tab)</span>}
          </Inner>
        </a>
      );
    }
    const resolved = href.startsWith("/coming-soon") ? href : resolveHref(href);
    return (
      <Link href={resolved} className={classes} {...rest}>
        <Inner arrow={arrow} ghost={ghost}>
          {children}
        </Inner>
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, arrow: _a, className: _c, children: _ch, href: _h, type, ...rest } = props;
  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      <Inner arrow={arrow} ghost={ghost}>
        {children}
      </Inner>
    </button>
  );
}
