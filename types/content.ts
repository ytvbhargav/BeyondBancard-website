// Shared content types. Shapes map 1:1 to a future CMS schema (PRD §7.2).

export type Confirmable<T> = { value: T; confirm?: boolean; note?: string };

export type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };

export type Faq = { q: string; a: string; confirm?: boolean; note?: string };

export type IndustryGroup =
  | "featured"
  | "specialized"
  | "retail"
  | "professional"
  | "healthcare"
  | "digital";

export type Industry = {
  slug: string;
  name: string;
  teaser: string;
  group: IndustryGroup;
  inDemo?: boolean;
};

export type Pillar = "Accept" | "Protect" | "Grow" | "Operate";

export type Capability = { pillar: Pillar; title: string; body: string; href: string };

export type Step = { title: string; body: string };

export type Testimonial = { quote: string; name: string; role: string; company: string };

export type NavLink = { label: string; href: string; description?: string; external?: boolean };

export type IconName =
  | "store"
  | "laptop"
  | "repeat"
  | "receipt"
  | "file-search"
  | "globe"
  | "layers"
  | "shield"
  | "users"
  | "wallet"
  | "headset"
  | "clock"
  | "sliders"
  | "badge-check"
  | "megaphone"
  | "trending-up"
  | "package"
  | "handshake"
  | "briefcase"
  | "credit-card"
  | "chart"
  | "activity";

export type Feature = { title: string; body: string; icon?: IconName; confirm?: boolean; note?: string };
