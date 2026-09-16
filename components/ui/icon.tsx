import {
  Activity,
  BadgeCheck,
  Briefcase,
  ChartNoAxesColumn,
  Clock,
  CreditCard,
  FileSearch,
  Globe,
  Handshake,
  Headset,
  Laptop,
  Layers,
  Megaphone,
  Package,
  Receipt,
  Repeat,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types/content";

const map: Record<IconName, LucideIcon> = {
  store: Store,
  laptop: Laptop,
  repeat: Repeat,
  receipt: Receipt,
  "file-search": FileSearch,
  globe: Globe,
  layers: Layers,
  shield: ShieldCheck,
  users: Users,
  wallet: Wallet,
  headset: Headset,
  clock: Clock,
  sliders: SlidersHorizontal,
  "badge-check": BadgeCheck,
  megaphone: Megaphone,
  "trending-up": TrendingUp,
  package: Package,
  handshake: Handshake,
  briefcase: Briefcase,
  "credit-card": CreditCard,
  chart: ChartNoAxesColumn,
  activity: Activity,
};

/** Content-driven icon lookup so content files stay serialisable. */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = map[name];
  return <C aria-hidden strokeWidth={1.75} className={className ?? "size-6"} />;
}
