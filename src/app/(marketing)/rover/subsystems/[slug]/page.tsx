import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { ProjectCard } from "@/components/domain";
import { subsystems } from "@/content/site-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return subsystems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const sub = subsystems.find((s) => s.slug === slug);
  if (!sub) return {};
  return buildMetadata({
    title: sub.title,
    description: sub.summary,
    path: `/rover/subsystems/${sub.slug}`,
  });
}

export default async function SubsystemDetailPage({ params }: Props) {
  const { slug } = await params;
  const sub = subsystems.find((s) => s.slug === slug);
  if (!sub) notFound();

  const related = subsystems.filter((s) => s.slug !== sub.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Subsystem"
        title={sub.title}
        description={sub.summary}
        primaryCta={{ label: "Join this subsystem", href: "/join/apply" }}
        secondaryCta={{ label: "All subsystems", href: "/rover/subsystems" }}
      >
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge tone="accent">Lead · {sub.lead}</Badge>
          {sub.chips.map((c) => (
            <Badge key={c} tone="neutral">
              {c}
            </Badge>
          ))}
        </div>
      </PageHero>

      <section className="section-y" aria-labelledby="overview-heading">
        <Container className="grid gap-10 lg:grid-cols-[1fr_16rem]">
          <div className="space-y-6">
            <h2 id="overview-heading">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              The {sub.title.toLowerCase()} subsystem owns requirements, design, manufacturing or
              implementation, and field validation for Artemis. Work is tracked through design
              reviews, integration milestones, and competition readiness checklists.
            </p>
            <div className="space-y-3">
              <h3 className="text-lg">Focus areas</h3>
              <ul className="list-disc space-y-2 ps-5 text-muted-foreground">
                {sub.chips.map((chip) => (
                  <li key={chip}>{chip} ownership and documentation</li>
                ))}
                <li>Interface contracts with adjacent subsystems</li>
                <li>Test plans and field-trial evidence</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link href="/engineering">Engineering docs</Link>
              </Button>
              <Button asChild variant="tertiary">
                <Link href="/rover">Back to rover</Link>
              </Button>
            </div>
          </div>
          <aside className="h-fit rounded-xl border border-border bg-card p-5 space-y-3">
            <p className="text-overline text-muted-foreground">Quick links</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-primary hover:underline" href="/engineering/architecture">
                  System architecture
                </Link>
              </li>
              <li>
                <Link className="text-primary hover:underline" href="/journal">
                  Related build logs
                </Link>
              </li>
              <li>
                <Link className="text-primary hover:underline" href="/join/roles">
                  Open roles
                </Link>
              </li>
            </ul>
          </aside>
        </Container>
      </section>

      <section className="section-y border-t border-border bg-subtle" aria-labelledby="related-heading">
        <Container className="space-y-6">
          <h2 id="related-heading">Related subsystems</h2>
          <ul className="card-grid">
            {related.map((item) => (
              <li key={item.slug}>
                <ProjectCard
                  href={`/rover/subsystems/${item.slug}`}
                  title={item.title}
                  summary={item.summary}
                  eyebrow="Subsystem"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        tone="join"
        headline={`Build ${sub.title.toLowerCase()} with us.`}
        primaryCta={{ label: "Apply now", href: "/join/apply" }}
        secondaryCta={{ label: "Process", href: "/join/process" }}
      />
    </>
  );
}
