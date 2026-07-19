import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { TeamCard } from "@/components/domain";
import { alumni } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Alumni",
  description: "FISAT Rover Team alumni and where they are now.",
  path: "/team/alumni",
});

export default function AlumniPage() {
  return (
    <>
      <PageHero
        eyebrow="Team · Alumni"
        title="Where builders go next."
        description="Alumni carry rover discipline into industry, research, and the next generation of mentors."
        primaryCta={{ label: "Join the next cohort", href: "/join" }}
        secondaryCta={{ label: "Full team", href: "/team" }}
      />
      <section className="section-y" aria-labelledby="alumni-heading">
        <Container className="space-y-8">
          <h2 id="alumni-heading" className="sr-only">
            Alumni
          </h2>
          <ul className="card-grid">
            {alumni.map((m) => (
              <li key={m.name}>
                <TeamCard {...m} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand
        tone="join"
        headline="Be part of the next alumni story."
        primaryCta={{ label: "Open roles", href: "/join/roles" }}
        secondaryCta={{ label: "Apply", href: "/join/apply" }}
      />
    </>
  );
}
