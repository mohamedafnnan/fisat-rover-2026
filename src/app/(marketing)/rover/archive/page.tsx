import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { ProjectCard } from "@/components/domain";
import { roverGenerations } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Rover Archive",
  description: "Historical record of every rover generation — our project lineage.",
  path: "/rover/archive",
});

/** Projects in product language map to rover archive generations. */
export default function ArchivePage() {
  return (
    <>
      <PageHero
        eyebrow="Projects · Archive"
        title="Every generation, documented."
        description="From foundation season to Artemis — each platform is archived with results, lessons, and subsystem lineage."
        primaryCta={{ label: "Current rover", href: "/rover" }}
        secondaryCta={{ label: "Achievements", href: "/achievements" }}
      />

      <section className="section-y" aria-labelledby="generations-heading">
        <Container className="space-y-8">
          <h2 id="generations-heading" className="sr-only">
            Rover generations
          </h2>
          <ul className="card-grid">
            {roverGenerations.map((gen) => (
              <li key={gen.slug}>
                <ProjectCard
                  href={`/rover/archive/${gen.slug}`}
                  title={`${gen.name} · ${gen.year}`}
                  summary={gen.summary}
                  eyebrow="Generation"
                  resultBadge={gen.result}
                  chips={[...gen.chips]}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        tone="docs"
        headline="Read the engineering behind the archive."
        primaryCta={{ label: "Engineering docs", href: "/engineering" }}
        secondaryCta={{ label: "Journal", href: "/journal" }}
      />
    </>
  );
}
