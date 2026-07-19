import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { StatGrid } from "@/components/domain";
import { roverGenerations } from "@/content/site-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return roverGenerations.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const gen = roverGenerations.find((g) => g.slug === slug);
  if (!gen) return {};
  return buildMetadata({
    title: `${gen.name} · ${gen.year}`,
    description: gen.summary,
    path: `/rover/archive/${gen.slug}`,
  });
}

export default async function ArchiveDetailPage({ params }: Props) {
  const { slug } = await params;
  const gen = roverGenerations.find((g) => g.slug === slug);
  if (!gen) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Archive · ${gen.year}`}
        title={gen.name}
        description={gen.summary}
        primaryCta={{ label: "All generations", href: "/rover/archive" }}
        secondaryCta={{ label: "Current rover", href: "/rover" }}
        tone="mars"
      >
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge tone="mars">{gen.result}</Badge>
          {gen.chips.map((c) => (
            <Badge key={c} tone="neutral">
              {c}
            </Badge>
          ))}
        </div>
      </PageHero>

      <section className="section-y" aria-labelledby="recap-heading">
        <Container className="space-y-8">
          <h2 id="recap-heading">Season recap</h2>
          <p className="max-w-3xl text-muted-foreground leading-relaxed">
            {gen.name} ({gen.year}) represents a full design-build-test cycle for the FISAT Rover
            Team. This archive entry captures the platform intent, key specs, and competition
            outcome so future batches can learn without reverse-engineering tribal knowledge.
          </p>
          <StatGrid
            items={gen.chips.map((chip, i) => ({
              label: ["Primary spec", "Mobility", "Capability", "Note"][i] ?? "Spec",
              value: chip,
            }))}
          />
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/achievements">Competition results</Link>
            </Button>
            <Button asChild variant="tertiary">
              <Link href="/engineering">Design reports</Link>
            </Button>
          </div>
        </Container>
      </section>

      <CtaBand
        tone="dual"
        headline="The next generation is being built now."
        primaryCta={{ label: "Meet Artemis", href: "/rover" }}
        secondaryCta={{ label: "Join the team", href: "/join" }}
      />
    </>
  );
}
