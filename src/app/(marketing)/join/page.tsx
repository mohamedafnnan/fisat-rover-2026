import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { FaqList } from "@/components/domain";
import { joinFaqs, openRoles } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Join the Team",
  description: "Recruitment landing — roles, process, and application for FISAT Rover Team.",
  path: "/join",
});

const benefits = [
  { title: "Own real hardware", description: "Ship subsystems that roll onto the field — not toy assignments." },
  { title: "Mentorship", description: "Leads, advisors, and alumni who have done the competition cycle." },
  { title: "Portfolio proof", description: "Design reviews, reports, and field data you can stand behind." },
] as const;

export default function JoinPage() {
  const previewRoles = openRoles.filter((r) => r.status === "open").slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Recruitment"
        title="Build a Mars rover with us."
        description="Open roles across mechanical, electronics, software, autonomy, and science. No prior rover experience required — ownership and curiosity are."
        primaryCta={{ label: "View open roles", href: "/join/roles" }}
        secondaryCta={{ label: "How applications work", href: "/join/process" }}
      />

      <section className="section-y" aria-labelledby="benefits-heading">
        <Container className="space-y-8">
          <h2 id="benefits-heading">Why join</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {benefits.map((b) => (
              <li key={b.title}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{b.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{b.description}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-y border-y border-border bg-subtle" aria-labelledby="roles-preview">
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="roles-preview">Open roles</h2>
            <Button asChild variant="secondary">
              <Link href="/join/roles">All roles</Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {previewRoles.map((role) => (
              <li key={role.title}>
                <Link
                  href="/join/apply"
                  className="flex flex-col gap-2 rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:border-border-strong sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{role.title}</p>
                    <p className="text-sm text-muted-foreground">{role.summary}</p>
                  </div>
                  <Badge tone="success">Open · {role.subsystem}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-y" aria-labelledby="faq-heading">
        <Container className="max-w-3xl space-y-6">
          <h2 id="faq-heading">FAQ</h2>
          <FaqList items={[...joinFaqs]} />
        </Container>
      </section>

      <CtaBand
        tone="join"
        headline="Ready when you are."
        primaryCta={{ label: "Apply now", href: "/join/apply" }}
        secondaryCta={{ label: "Process", href: "/join/process" }}
      />
    </>
  );
}
