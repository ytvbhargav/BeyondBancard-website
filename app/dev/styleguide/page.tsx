import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip, ChipLink } from "@/components/ui/chip";
import { Confirm } from "@/components/ui/confirm";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { TextLink } from "@/components/ui/text-link";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { UnderwritingCard } from "@/components/motion/UnderwritingCard";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { home } from "@/content/home";
import { riskFactors } from "@/content/high-risk";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false, follow: false } };

const COLORS: { group: string; tokens: { name: string; hex: string; note: string; dark?: boolean }[] }[] = [
  {
    group: "Ink",
    tokens: [
      { name: "ink-950", hex: "#07102A", note: "Footer, deep bands", dark: true },
      { name: "ink-900", hex: "#0E1B3D", note: "Hero, headings", dark: true },
      { name: "ink-800", hex: "#1B2A55", note: "Lines on dark", dark: true },
      { name: "ink-700", hex: "#2B3B6B", note: "Borders on dark", dark: true },
    ],
  },
  {
    group: "Brand (provisional)",
    tokens: [
      { name: "brand-50", hex: "#F2F5FF", note: "Hover tint" },
      { name: "brand-100", hex: "#E6ECFF", note: "Selected, spotlight" },
      { name: "brand-200", hex: "#C9D6FF", note: "Chart fill" },
      { name: "brand-300", hex: "#A3B8FF", note: "Focus on dark" },
      { name: "brand-600", hex: "#2F5BFF", note: "Actions · 5.2:1 on white", dark: true },
      { name: "brand-700", hex: "#1D3FD1", note: "Hover, link text", dark: true },
      { name: "sky-400", hex: "#5EC4FF", note: "Gradient only" },
    ],
  },
  {
    group: "Status",
    tokens: [
      { name: "success-600", hex: "#138A5E", note: "Approved marks", dark: true },
      { name: "success-700", hex: "#0F7A52", note: "Text on tint · 4.7:1", dark: true },
      { name: "warning-600", hex: "#B86E00", note: "In review marks", dark: true },
      { name: "warning-700", hex: "#8F5600", note: "Text on tint · 5.5:1", dark: true },
      { name: "danger-600", hex: "#C8322B", note: "Form errors only", dark: true },
    ],
  },
  {
    group: "Neutrals",
    tokens: [
      { name: "paper", hex: "#F6F8FB", note: "Page" },
      { name: "surface", hex: "#FFFFFF", note: "Panels" },
      { name: "line", hex: "#DCE2EE", note: "Borders" },
      { name: "muted", hex: "#56627F", note: "Secondary text · 5.7:1 on paper", dark: true },
    ],
  },
];

const TYPE = [
  { cls: "type-display", label: "display 88/48" },
  { cls: "type-h1", label: "h1 60/40" },
  { cls: "type-h2", label: "h2 44/32" },
  { cls: "type-h3", label: "h3 24/21" },
  { cls: "type-h4", label: "h4 18/17" },
  { cls: "type-body-lg", label: "body-lg 20/18" },
  { cls: "type-body", label: "body 17/16" },
  { cls: "type-small", label: "small 14" },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-14">
      <h2 className="type-h3 mb-8">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <Container className="py-16">
      <h1 className="type-h1">Styleguide</h1>
      <p className="type-body-lg mt-4 max-w-[40rem] text-muted">Tokens and components for the Beyond Bancard demo. Development only.</p>

      <Block title="Colour">
        <div className="grid gap-10">
          {COLORS.map((g) => (
            <div key={g.group}>
              <h3 className="type-h4 mb-4">{g.group}</h3>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {g.tokens.map((t) => (
                  <li key={t.name} className="overflow-hidden rounded-sm border border-line bg-surface">
                    <div className="h-16" style={{ background: `var(--color-${t.name})` }} />
                    <div className="p-3">
                      <p className="font-medium">{t.name}</p>
                      <p className="type-small tabular text-muted">{t.hex}</p>
                      <p className="type-small text-muted">{t.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Type">
        <ul className="space-y-6">
          {TYPE.map((t) => (
            <li key={t.cls} className="grid gap-2 md:grid-cols-[10rem_1fr] md:items-baseline">
              <span className="type-small tabular text-muted">{t.label}</span>
              <span className={t.cls}>The processor that says yes.</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Buttons and links">
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/live-form" arrow>
            Apply now
          </Button>
          <Button href="/schedule-a-demo" variant="secondary">
            Talk to an expert
          </Button>
          <Button variant="ghost" arrow>
            Ghost action
          </Button>
          <TextLink href="/industries">Text link</TextLink>
        </div>
        <div className="tone-dark mt-6 flex flex-wrap items-center gap-3 rounded-md bg-ink-900 p-6">
          <Button href="/live-form" arrow>
            Apply now
          </Button>
          <Button href="/schedule-a-demo" variant="secondary-dark">
            Talk to an expert
          </Button>
          <Button variant="ghost-dark">Ghost on dark</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-md bg-brand-600 p-6">
          <Button variant="inverse" arrow>
            Apply now
          </Button>
          <Button variant="inverse-outline">Talk to an expert</Button>
        </div>
      </Block>

      <Block title="Status, chips, confirm">
        <div className="flex flex-wrap items-center gap-3">
          <Badge status="approved">Approved</Badge>
          <Badge status="review">Underwriting in progress</Badge>
          <Badge status="pending">Submitted</Badge>
          <Badge status="illustration" icon={false}>
            Illustration
          </Badge>
          <Chip>Static chip</Chip>
          <ChipLink href="/industries/cbd-hemp">Link chip</ChipLink>
        </div>
        <p className="mt-8">
          A sentence with an <Confirm note="Example of a flagged claim">unverified claim</Confirm> inside it.
        </p>
      </Block>

      <Block title="Cards and panels">
        <div className="grid gap-6 lg:grid-cols-2">
          <UnderwritingCard {...home.underwriting} mode="static" completed={3} />
          <div className="grid gap-4">
            <SpotlightCard href="/industries/nutra-supplements" title="Nutra & supplements" body="Payments engineered for fast-growing commerce." />
            <SpotlightCard href="/industries/kratom" title="Kratom" body="Processing built around complex kratom commerce." size="sm" />
          </div>
        </div>
      </Block>

      <Block title="Feature structures">
        <FeatureGrid items={riskFactors.slice(0, 3)} variant="ruled" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <FeatureGrid items={riskFactors.slice(0, 3)} variant="rows" />
          <FeatureGrid items={riskFactors.slice(0, 4)} variant="panel" />
        </div>
      </Block>

      <Block title="Form controls">
        <div className="grid max-w-xl gap-4">
          <Input placeholder="Default input" />
          <Input aria-invalid defaultValue="Invalid value" />
        </div>
      </Block>
    </Container>
  );
}
