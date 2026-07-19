import Link from "next/link";
import { Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { sponsorTiers } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Sponsorship Tiers",
  description: "Compare FISAT Rover Team sponsorship tiers and benefits.",
  path: "/sponsors/tiers",
});

export default function SponsorTiersPage() {
  return (
    <>
      <PageHero
        eyebrow="Sponsors · Tiers"
        title="Choose how you show up."
        description="From community support to principal partnership — every tier funds real engineering."
        primaryCta={{ label: "Become a sponsor", href: "/contact" }}
        secondaryCta={{ label: "Why sponsor", href: "/sponsors" }}
        tone="mars"
      />

      <section className="section-y" aria-labelledby="compare-heading">
        <Container className="space-y-8">
          <h2 id="compare-heading" className="sr-only">
            Tier comparison
          </h2>
          <ul className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {sponsorTiers.map((tier) => (
              <li key={tier.name}>
                <Card
                  className={`flex h-full flex-col ${tier.recommended ? "border-primary elevation-2" : ""}`}
                >
                  <CardHeader className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle>{tier.name}</CardTitle>
                      {tier.recommended ? (
                        <Badge tone="accent">Recommended</Badge>
                      ) : null}
                    </div>
                    <p className="font-mono text-sm text-muted-foreground">{tier.price}</p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <ul className="space-y-2 text-sm">
                      {tier.benefits.map((b) => (
                        <li key={b} className="flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant={tier.recommended ? "primary" : "secondary"} className="mt-auto">
                      <Link href="/contact">Select {tier.name}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        tone="sponsor"
        headline="Need a custom package?"
        subhead="Principal partnerships are tailored — tell us your goals."
        primaryCta={{ label: "Contact sponsorship", href: "/contact" }}
        secondaryCta={{ label: "Partners", href: "/sponsors/partners" }}
      />
    </>
  );
}
