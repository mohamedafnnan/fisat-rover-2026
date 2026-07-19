import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { ProjectCard } from "@/components/domain";
import { engineeringCategories } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Engineering",
  description: "Documentation hub for design reports, architecture, testing, and standards.",
  path: "/engineering",
});

export default function EngineeringPage() {
  return (
    <>
      <PageHero
        eyebrow="Engineering"
        title="Documentation built like a product."
        description="Design reports, architecture, testing, and standards — maintained so a rotating student team never starts from zero."
        primaryCta={{ label: "Current rover", href: "/rover" }}
        secondaryCta={{ label: "Resources", href: "/engineering/resources" }}
      />

      <section className="section-y" aria-labelledby="cats-heading">
        <Container className="space-y-8">
          <h2 id="cats-heading" className="sr-only">
            Categories
          </h2>
          <ul className="card-grid">
            {engineeringCategories.map((cat) => (
              <li key={cat.slug}>
                <ProjectCard
                  href={`/engineering/${cat.slug}`}
                  title={cat.title}
                  summary={cat.summary}
                  eyebrow="Category"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        tone="docs"
        headline="Want the latest design report?"
        primaryCta={{ label: "Design reports", href: "/engineering/design-reports" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />
    </>
  );
}