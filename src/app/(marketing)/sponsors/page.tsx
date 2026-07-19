import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { StatGrid } from "@/components/domain";
import { sponsorTiers } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Sponsors",
  description: "Why sponsor FISAT Rover Team — tiers, partners, and prospectus.",
  path: "/sponsors",
});

const valueProps = [
  {
    title: "Real engineering outcomes",
    description: "Hardware, tooling, travel, and field tests — not vanity branding.",
  },
  {
    title: "Campus + competition visibility",
    description: "Rover branding, site placement, Base Camp pavilion, and event presence.",
  },
  {
    title: "Talent pipeline",
    description: "Direct access to multidisciplinary student engineers across six subsystems.",
  },
] as const;

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sponsors"
        title="Partners who power the mission."
        description="Sponsorship funds real engineering outcomes. Become a founding partner for the 2026 season."
        primaryCta={{ label: "View tiers", href: "/sponsors/tiers" }}
        secondaryCta={{ label: "Contact sponsorship", href: "/contact" }}
        tone="mars"
      />

      <section className="section-y" aria-labelledby="value-heading">
        <Container className="space-y-8">
          <h2 id="value-heading">Why sponsor us</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {valueProps.map((v) => (
              <li key={v.title}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{v.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{v.description}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
          <StatGrid
            items={[
              { label: "Subsystems", value: "6" },
              { label: "Builders", value: "40+" },
              { label: "Seasons", value: "4" },
              { label: "Reach", value: "Campus+" },
            ]}
          />
        </Container>
      </section>

      <section className="section-y border-y border-border bg-subtle" aria-labelledby="tiers-preview">
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="tiers-preview">Sponsorship tiers</h2>
            <Button asChild variant="secondary">
              <Link href="/sponsors/tiers">Full comparison</Link>
            </Button>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sponsorTiers.map((tier) => (
              <li key={tier.name}>
                <Card className={`h-full ${tier.recommended ? "border-primary" : ""}`}>
                  <CardHeader className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{tier.name}</CardTitle>
                      {tier.recommended ? <Badge tone="accent">Recommended</Badge> : null}
                    </div>
                    <p className="font-mono text-sm text-muted-foreground">{tier.price}</p>
                    <CardDescription>{tier.benefits[0]}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-y" aria-labelledby="founding-heading">
        <Container>
          <div className="rounded-xl border border-dashed border-border-strong bg-card/50 px-6 py-10 text-center">
            <p className="text-overline text-muted-foreground">Partner wall</p>
            <h2 id="founding-heading" className="mx-auto mt-3 max-w-md text-xl font-semibold">
              Become our founding sponsor for 2026
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Logo placements, rover branding, campus visibility, and direct access to a
              multidisciplinary engineering team.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="primary">
                <Link href="/contact">Talk to us</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/sponsors/partners">Partner wall</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        tone="sponsor"
        headline="Ready to back Artemis?"
        primaryCta={{ label: "Sponsorship inquiry", href: "/contact" }}
        secondaryCta={{ label: "Tiers", href: "/sponsors/tiers" }}
      />
    </>
  );
}
