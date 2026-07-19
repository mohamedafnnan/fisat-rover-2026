import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { ProjectCard } from "@/components/domain";
import { subsystems } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Divisions",
  description: "Subsystem divisions and how the FISAT Rover Team is organized.",
  path: "/team/divisions",
});

export default function DivisionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Team · Divisions"
        title="Organized like the rover."
        description="Six divisions mirror the six subsystems — clear ownership, shared integration milestones."
        primaryCta={{ label: "Meet leadership", href: "/team" }}
        secondaryCta={{ label: "Open roles", href: "/join/roles" }}
      />
      <section className="section-y" aria-labelledby="div-heading">
        <Container className="space-y-8">
          <h2 id="div-heading" className="sr-only">
            Divisions
          </h2>
          <ul className="card-grid">
            {subsystems.map((sub) => (
              <li key={sub.slug}>
                <ProjectCard
                  href={`/rover/subsystems/${sub.slug}`}
                  title={sub.title}
                  summary={`${sub.summary} Lead: ${sub.lead}.`}
                  eyebrow="Division"
                  chips={[...sub.chips]}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand
        tone="join"
        headline="Pick a division and apply."
        primaryCta={{ label: "Apply", href: "/join/apply" }}
        secondaryCta={{ label: "Process", href: "/join/process" }}
      />
    </>
  );
}
