import type { MotionTag } from "@/components/motion/Reveal";

/**
 * Parent whose StaggerItem children fade up one after another once the group
 * is in view (M7, stagger.base = 80ms). Server-rendered; RevealObserver assigns
 * each child its index and marks the group shown.
 */
export function Stagger({
  as: Tag = "div",
  className,
  children,
  id,
}: {
  as?: MotionTag;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <Tag id={id} data-stagger="" className={className}>
      {children}
    </Tag>
  );
}

export function StaggerItem({
  as: Tag = "div",
  className,
  children,
}: {
  as?: MotionTag;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag data-stagger-item="" className={className}>
      {children}
    </Tag>
  );
}
