import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/shared/page-hero";
import { ProjectCard } from "@/components/domain";
import { engineeringCategories } from "@/content/site-content";

type Props = { params: Promise<{ category: string }> };

const sampleDocs: Record<string, { slug: string; title: string; summary: string }[]> = {
  "design-reports": [
    { slug: "artemis-sdr-2026", title: "Artemis System Design Report 2026", summary: "Season narrative, subsystem summaries, and competition readiness." },
    { slug: "pathfinder-sdr-2025", title: "Pathfinder SDR 2025", summary: "Prior generation design report and lessons learned." },
  ],
  architecture: [
    { slug: "system-context", title: "System context diagram", summary: "Rover, ground station, and operator interfaces." },
    { slug: "power-tree", title: "Power tree", summary: "Distribution, budgets, and protection strategy." },
  ],
  testing: [
    { slug: "mobility-matrix", title: "Mobility test matrix", summary: "Terrain cases, metrics, and pass criteria." },
    { slug: "science-dry-run", title: "Science dry-run protocol", summary: "Sample workflow timing and failure modes." },
  ],
  standards: [
    { slug: "cad-conventions", title: "CAD conventions", summary: "Naming, layers, and release checklist." },
    { slug: "review-gates", title: "Design review gates", summary: "What must pass before manufacture or merge." },
  ],
  resources: [
    { slug: "templates", title: "Document templates", summary: "Report, test plan, and decision-record starters." },
    { slug: "open-materials", title: "Open materials", summary: "Public diagrams and educational handouts." },
  ],
};

export async function generateStaticParams() {
  return engineeringCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = engineeringCategories.find((c) => c.slug === category);
  if (!cat) return {};
  return buildMetadata({
    title: cat.title,
    description: cat.summary,
    path: `/engineering/${cat.slug}`,
  });
}

export default async function EngineeringCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = engineeringCategories.find((c) => c.slug === category);
  if (!cat) notFound();
  const docs = sampleDocs[cat.slug] ?? [];

  return (
    <>
      <PageHero
        eyebrow="Engineering"
        title={cat.title}
        description={cat.summary}
        primaryCta={{ label: "All categories", href: "/engineering" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />
      <section className="section-y">
        <Container className="space-y-8">
          {docs.length ? (
            <ul className="card-grid">
              {docs.map((doc) => (
                <li key={doc.slug}>
                  <ProjectCard
                    href={`/engineering/${cat.slug}/${doc.slug}`}
                    title={doc.title}
                    summary={doc.summary}
                    eyebrow="Document"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-border-strong px-6 py-12 text-center">
              <p className="text-muted-foreground">Documents coming soon.</p>
              <Button asChild variant="secondary" className="mt-4">
                <Link href="/engineering">Back to hub</Link>
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}