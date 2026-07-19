import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { Reveal } from "@/components/sections/home/reveal";
import { homeTeam } from "@/components/sections/home/content";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function HomeTeamPreview() {
  return (
    <section
      id="team-preview"
      className="section-y scroll-mt-24 border-y border-border bg-subtle"
      aria-labelledby="team-heading"
    >
      <Container className="space-y-10">
        <Reveal>
          <SectionHeading
            id="team-heading"
            eyebrow={homeTeam.eyebrow}
            title={homeTeam.title}
            body={homeTeam.body}
          />
        </Reveal>

        <ul className="card-grid">
          {homeTeam.members.map((member, i) => (
            <Reveal key={member.name} as="li" delayMs={i * 50}>
              <Card className="h-full transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transform-none">
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                  <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-sm font-semibold text-primary"
                    aria-hidden
                  >
                    {initials(member.name)}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <CardTitle className="text-base">{member.name}</CardTitle>
                    <CardDescription>
                      {member.role}
                      <span className="text-muted-foreground/70"> · {member.division}</span>
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Button asChild variant="secondary">
            <Link href={homeTeam.cta.href}>{homeTeam.cta.label}</Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
