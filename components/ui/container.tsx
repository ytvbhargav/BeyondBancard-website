import { cn } from "@/lib/utils";

export function Container({
  className,
  as: Tag = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
  return <Tag className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-8 lg:px-10", className)} {...props} />;
}
