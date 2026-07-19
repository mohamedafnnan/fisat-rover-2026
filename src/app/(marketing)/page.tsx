import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  path: "/",
  description:
    "Official website of the FISAT Rover Team — engineering excellence, competitions, sponsorship, and recruitment.",
});

/**
 * Foundation home shell only.
 * Full page sections (3D hero, subsystems, journal, sponsors) land in later milestones.
 */
export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <section className="section-y border-b border-border bg-subtle">
        <Container className="flex flex-col items-start gap-6 md:max-w-3xl">
          <Badge tone="accent">Foundation milestone</Badge>
          <h1 className="text-display">FISAT Rover Team</h1>
          <p className="text-body-lg text-muted-foreground">
            Official site foundation is online. Routing, design system, chrome, theme,
            SEO, and world isolation are ready for content milestones.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero">
              <Link href="/rover">Explore the Rover</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/join">Join the Team</Link>
            </Button>
            <Button asChild variant="tertiary" size="lg">
              <Link href="/sponsors">Sponsor Us</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <h2 className="mb-4">Ready systems</h2>
          <ul className="card-grid">
            {[
              "App Router + IA routes",
              "Design tokens + dark mode",
              "Navbar / Footer / Mobile nav",
              "UI primitives (shadcn-aligned)",
              "SEO metadata + JSON-LD",
              "Loading / Error / 404 shells",
              "World island isolation (/explore)",
              "GSAP + R3F dependency surface",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-card p-5 text-sm elevation-1"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
