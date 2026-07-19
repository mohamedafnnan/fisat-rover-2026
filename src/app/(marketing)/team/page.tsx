import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { TeamCard } from "@/components/domain";
import { teamLeads } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Team",
  description: "Leadership, divisions, advisors, and alumni of the FISAT Rover Team.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Builders across six subsystems."
        description="Mechanical, arm, electronics, software, autonomy, and science — led by students, mentored by faculty and alumni."
        primaryCta={{ label: "Join the Team", href: "/join" }}
        secondaryCta={{ label: "Divisions", href: "/team/divisions" }}
      />

      <section className="section-y" aria-labelledby="leads-heading">
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="leads-heading">Leadership</h2>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link href="/team/advisors">Advisors</Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link href="/team/alumni">Alumni</Link>
              </Button>
            </div>
          </div>
          <ul className="card-grid">
            {teamLeads.map((m) => (
              <li key={m.name}>
                <TeamCard {...m} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        tone="join"
        eyebrow="Recruitment"
        headline="Your name could be on this page next season."
        primaryCta={{ label: "Open roles", href: "/join/roles" }}
        secondaryCta={{ label: "Process", href: "/join/process" }}
      />
    </>
  );
}
