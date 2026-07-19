import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { sponsorTiers } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Our Partners",
  description: "Sponsor wall and partnership recognition for FISAT Rover Team.",
  path: "/sponsors/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Sponsors · Partners"
        title="Partner wall"
        description="Founding sponsors for 2026 will appear here by tier. Be the first name on the wall."
        primaryCta={{ label: "Become a founding sponsor", href: "/contact" }}
        secondaryCta={{ label: "Tiers", href: "/sponsors/tiers" }}
      />

      <section className="section-y" aria-labelledby="wall-heading">
        <Container className="space-y-10">
          <h2 id="wall-heading" className="sr-only">
            Partner tiers
          </h2>
          {sponsorTiers.map((tier) => (
            <div key={tier.name} className="space-y-4">
              <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
              <div className="rounded-xl border border-dashed border-border-strong bg-muted/30 px-6 py-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No {tier.name.toLowerCase()} partners listed yet —{" "}
                  <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                    claim this tier
                  </Link>
                  .
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <Button asChild variant="primary">
              <Link href="/sponsors">Why sponsor</Link>
            </Button>
          </div>
        </Container>
      </section>

      <CtaBand
        tone="sponsor"
        headline="Your logo belongs here."
        primaryCta={{ label: "Sponsorship inquiry", href: "/contact" }}
        secondaryCta={{ label: "Home", href: "/" }}
      />
    </>
  );
}
