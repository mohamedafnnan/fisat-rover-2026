import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { TeamCard } from "@/components/domain";
import { advisors } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Advisors",
  description: "Faculty and industry advisors supporting the FISAT Rover Team.",
  path: "/team/advisors",
});

export default function AdvisorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Team · Advisors"
        title="Mentors behind the mission."
        description="Faculty and industry advisors guide design reviews, safety, and long-term team culture."
        primaryCta={{ label: "Full team", href: "/team" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />
      <section className="section-y" aria-labelledby="adv-heading">
        <Container className="space-y-8">
          <h2 id="adv-heading" className="sr-only">
            Advisors
          </h2>
          <ul className="card-grid">
            {advisors.map((m) => (
              <li key={m.name}>
                <TeamCard {...m} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand
        tone="dual"
        headline="Want to advise or mentor?"
        primaryCta={{ label: "Contact us", href: "/contact" }}
        secondaryCta={{ label: "Sponsor", href: "/sponsors" }}
      />
    </>
  );
}
