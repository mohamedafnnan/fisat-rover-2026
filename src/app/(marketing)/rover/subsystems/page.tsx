import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { ProjectCard } from "@/components/domain";
import { subsystems } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Subsystems",
  description: "Mechanical, arm, electronics, software, autonomy, and science.",
  path: "/rover/subsystems",
});

export default function SubsystemsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Rover"
        title="Six subsystems. One rover."
        description="Each subsystem is student-owned with a lead, design reviews, and a path from CAD to field validation."
        primaryCta={{ label: "Current rover", href: "/rover" }}
        secondaryCta={{ label: "Join a subsystem", href: "/join/roles" }}
      />

      <section className="section-y" aria-labelledby="grid-heading">
        <Container className="space-y-8">
          <h2 id="grid-heading" className="sr-only">
            Subsystem list
          </h2>
          <ul className="card-grid">
            {subsystems.map((sub) => (
              <li key={sub.slug}>
                <ProjectCard
                  href={`/rover/subsystems/${sub.slug}`}
                  title={sub.title}
                  summary={sub.summary}
                  eyebrow={`Lead · ${sub.lead}`}
                  chips={[...sub.chips]}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        tone="join"
        eyebrow="Recruitment"
        headline="Own a subsystem with us."
        primaryCta={{ label: "Open roles", href: "/join/roles" }}
        secondaryCta={{ label: "How to apply", href: "/join/process" }}
      />
    </>
  );
}
