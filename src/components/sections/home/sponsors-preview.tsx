import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { Reveal } from "@/components/sections/home/reveal";
import { homeSponsors } from "@/components/sections/home/content";

export function HomeSponsorsPreview() {
  return (
    <section
      id="sponsors-preview"
      className="section-y scroll-mt-24"
      aria-labelledby="sponsors-heading"
    >
      <Container className="space-y-10">
        <Reveal>
          <SectionHeading
            id="sponsors-heading"
            eyebrow={homeSponsors.eyebrow}
            title={homeSponsors.title}
            body={homeSponsors.body}
          />
        </Reveal>

        <Reveal>
          <div className="rounded-xl border border-dashed border-border-strong bg-card/50 px-6 py-10 text-center">
            <p className="text-overline text-muted-foreground">Partner wall</p>
            <p className="mx-auto mt-3 max-w-md text-lg font-semibold tracking-tight">
              Become our founding sponsor for the 2026 season
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Logo placements, rover branding, campus visibility, and direct access to a
              multidisciplinary engineering team.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="primary">
                <Link href={homeSponsors.emptyCta.href}>{homeSponsors.emptyCta.label}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={homeSponsors.cta.href}>{homeSponsors.cta.label}</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {homeSponsors.tiers.map((tier, i) => (
            <Reveal key={tier.name} as="li" delayMs={i * 40}>
              <div className="flex h-full flex-col items-center justify-center gap-1 rounded-lg border border-border bg-muted/40 px-4 py-6 text-center grayscale transition-[filter,transform] duration-200 hover:-translate-y-0.5 hover:grayscale-0 motion-reduce:transform-none">
                <span className="text-sm font-semibold">{tier.name}</span>
                <span className="text-caption text-muted-foreground">{tier.note}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
