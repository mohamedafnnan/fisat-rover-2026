import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { ProjectCard, StatGrid } from "@/components/domain";
import { subsystems } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "The Rover",
  description: "Current-season rover overview, specs, and subsystem entry points.",
  path: "/rover",
});

const hotspots = [
  { id: "mast", label: "Mast / cameras", href: "/rover/subsystems/autonomy", x: "58%", y: "22%" },
  { id: "arm", label: "Manipulator arm", href: "/rover/subsystems/arm", x: "28%", y: "40%" },
  { id: "deck", label: "Science bay", href: "/rover/subsystems/science", x: "62%", y: "52%" },
  { id: "wheel", label: "Rocker mobility", href: "/rover/subsystems/mechanical", x: "22%", y: "72%" },
  { id: "power", label: "Power & harness", href: "/rover/subsystems/electronics", x: "48%", y: "58%" },
] as const;

export default function RoverPage() {
  return (
    <>
      <PageHero
        eyebrow="The Rover"
        title="Artemis · 2026"
        description="Our latest platform balances mass, modularity, and field serviceability — six-wheel rocker mobility, manipulator reach for equipment tasks, and a science bay built for rapid sample workflows."
        primaryCta={{ label: "Browse subsystems", href: "/rover/subsystems" }}
        secondaryCta={{ label: "Rover archive", href: "/rover/archive" }}
        tone="mars"
      >
        <StatGrid
          className="pt-4"
          items={[
            { label: "Mass budget", value: "~50 kg" },
            { label: "Drive", value: "6× rocker" },
            { label: "Arm DOF", value: "6" },
            { label: "Compute", value: "Hybrid edge" },
          ]}
        />
      </PageHero>

      <section className="section-y" aria-labelledby="diagram-heading">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <h2 id="diagram-heading">System diagram</h2>
            <p className="text-muted-foreground">
              Explore labeled hotspots — each maps to a subsystem page. Fully keyboard accessible via the list below.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--primary)/0.2),transparent_50%),linear-gradient(165deg,#1c1410,#0a0a0a)]"
              role="img"
              aria-label="Stylized Artemis rover diagram with subsystem hotspots"
            >
              <div className="absolute top-1/2 left-1/2 h-28 w-48 -translate-x-1/2 -translate-y-[45%] rounded-xl border border-white/25 bg-white/10 md:h-36 md:w-64" />
              <div className="absolute top-[38%] left-[52%] h-20 w-2 -translate-x-1/2 bg-white/25" />
              {hotspots.map((h) => (
                <Link
                  key={h.id}
                  href={h.href}
                  className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/30 transition-transform hover:scale-125 focus-visible:scale-125"
                  style={{ left: h.x, top: h.y }}
                  aria-label={h.label}
                />
              ))}
            </div>

            <ol className="space-y-2">
              {hotspots.map((h, i) => (
                <li key={h.id}>
                  <Link
                    href={h.href}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-border-strong"
                  >
                    <span className="flex items-center gap-3">
                      <Badge tone="neutral" className="font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </Badge>
                      {h.label}
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="section-y border-y border-border bg-subtle" aria-labelledby="subsystems-heading">
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="subsystems-heading">Subsystems</h2>
            <Button asChild variant="secondary">
              <Link href="/rover/subsystems">View all</Link>
            </Button>
          </div>
          <ul className="card-grid">
            {subsystems.map((sub) => (
              <li key={sub.slug}>
                <ProjectCard
                  href={`/rover/subsystems/${sub.slug}`}
                  title={sub.title}
                  summary={sub.summary}
                  eyebrow="Subsystem"
                  chips={[...sub.chips]}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        tone="docs"
        eyebrow="Engineering"
        headline="Read the design reports behind Artemis."
        subhead="Architecture, testing, and standards — documented for the next batch."
        primaryCta={{ label: "Engineering docs", href: "/engineering" }}
        secondaryCta={{ label: "Enter Base Camp", href: "/explore" }}
      />
    </>
  );
}
