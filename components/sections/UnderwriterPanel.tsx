import { FileSearch } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/types/content";

/** Side panel on dark sections listing the factors underwriters review. */
export function UnderwriterPanel({ title, factors }: { title: string; factors: { title: string; icon: IconName }[] }) {
  return (
    <div className="rounded-md border border-ink-800 bg-ink-900 lg:sticky lg:top-36">
      <div className="flex items-center gap-3 border-b border-ink-800 px-6 py-5">
        <FileSearch aria-hidden strokeWidth={1.75} className="size-5 text-brand-300" />
        <h3 className="type-h4 text-on-dark">{title}</h3>
      </div>
      <ul className="px-6 py-2">
        {factors.map((f) => (
          <li key={f.title} className="flex items-center gap-3.5 border-b border-ink-800 py-3.5 last:border-b-0">
            <Icon name={f.icon} className="size-5 shrink-0 text-on-dark-muted" />
            <span className="text-on-dark">{f.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
