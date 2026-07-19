import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { Timeline, StatGrid, ProjectCard } from "@/components/domain";
import { achievements } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Achievements",
  description: "Results, awards, rankings, and press for the FISAT Rover Team.",
  path: "/achievements",
});

export default function AchievementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Achievements"
        title="Proof on the field."
        description="Results, milestones, and recognition — evidence for sponsors, judges, and the next cohort."
        primaryCta={{ label: "Sponsor the mission", href: "/sponsors" }}
        secondaryCta={{ label: "Read the journal", href: "/journal" }}
        tone="mars"
      >
        <StatGrid
          className="pt-4"
          items={[
            { label: "Seasons", value: "4" },
            { label: "National stage", value: "2025" },
            { label: "Field trials", value: "Multi" },
            { label: "Docs shipped", value: "25+" },
          ]}
        />
      </PageHero>

      <section className="section-y" aria-labelledby="timeline-heading">
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="timeline-heading">Results timeline</h2>
            <Button asChild variant="secondary">
              <Link href="/rover/archive">Rover archive</Link>
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

      <section className="section-y border-t border-border bg-subtle" aria-labelledby="recaps-heading">
        <Container className="space-y-8">
          <h2 id="recaps-heading">Competition recaps</h2>
          <ul className="card-grid">
            {achievements.map((a) => (
              <li key={a.slug}>
                <ProjectCard
                  href={`/achievements/${a.slug}`}
                  title={a.title}
                  summary={a.detail}
                  eyebrow={a.year}
                  resultBadge={a.result}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        tone="sponsor"
        headline="Help write the next result."
        primaryCta={{ label: "Sponsor", href: "/sponsors" }}
        secondaryCta={{ label: "Join", href: "/join" }}
      />
    </>
  );
}