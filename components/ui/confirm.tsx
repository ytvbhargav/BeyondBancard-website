/*
 * The demo's "client to confirm" markers are gone: the site is in production and
 * publishes every item. `confirm` and `note` stay on the content in the CMS as an
 * editor's note of what still needs verifying (docs/CONFIRM_LIST.md lists them),
 * and these wrappers render the content plainly so call sites need no flag logic.
 */

export function Confirm({
  children,
}: {
  note?: string;
  confirmed?: boolean;
  as?: "span" | "div";
  variant?: "outline" | "marker";
  tooltip?: "top" | "bottom";
  tooltipAlign?: "start" | "center";
  className?: string;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

/** Convenience for Confirmable<T> content objects. */
export function MaybeConfirm({
  children,
}: {
  item?: { confirm?: boolean; note?: string };
  as?: "span" | "div";
  variant?: "outline" | "marker";
  tooltip?: "top" | "bottom";
  tooltipAlign?: "start" | "center";
  className?: string;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
