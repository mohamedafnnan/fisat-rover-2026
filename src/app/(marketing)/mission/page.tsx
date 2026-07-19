import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { Timeline, StatGrid } from "@/components/domain";
import { achievements, missionValues } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Mission",
  description:
    "Who we are, competitions we enter, and the milestones that define the FISAT Rover Team.",
  path: "/mission",
});

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="About · Mission"
        title="Engineering for Mars, built in Kerala."
        description="FISAT Rover Team designs, fabricates, and fields planetary rovers for international competitions — proving student engineering from India can meet world-class standards."
        primaryCta={{ label: "Join the Team", href: "/join" }}
        secondaryCta={{ label: "Sponsor Us", href: "/sponsors" }}
      />

      <section className="section-y" aria-labelledby="values-heading">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <h2 id="values-heading">What we stand for</h2>
            <p className="text-muted-foreground">
              Three commitments that shape every design review, field trial, and recruitment cycle.
            </p>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {missionValues.map((value) => (
              <li key={value.title}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{value.title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-y border-y border-border bg-subtle" aria-labelledby="impact-heading">
        <Container className="space-y-8">
          <h2 id="impact-heading">Impact at a glance</h2>
          <StatGrid
            items={[
              { label: "Subsystems", value: "6" },
              { label: "Active builders", value: "40+" },
              { label: "Design seasons", value: "4" },
              { label: "Docs & reports", value: "25+" },
            ]}
          />
        </Container>
      </section>

      <section className="section-y" aria-labelledby="history-heading">
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 id="history-heading">Proof on the field</h2>
              <p className="text-muted-foreground">
                Seasons of design reports, system tests, and competition runs — archived so the next team starts ahead.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/achievements">All achievements</Link>
            </Button>
          </div>
          <Timeline
            items={achievements.map((a) => ({
              year: a.year,
              title: a.title,
              detail: a.detail,
              result: a.result,
            }))}
          />
        </Container>
      </section>

      <CtaBand
        tone="dual"
        eyebrow="Get involved"
        headline="Build with us — or back the mission."
        subhead="Recruitment and sponsorship both keep Artemis on the field."
        primaryCta={{ label: "Join", href: "/join" }}
        secondaryCta={{ label: "Sponsor", href: "/sponsors" }}
      />
    </>
  );
}
