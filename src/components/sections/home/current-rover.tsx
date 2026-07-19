import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { Reveal } from "@/components/sections/home/reveal";
import { homeCurrentRover } from "@/components/sections/home/content";

export function HomeCurrentRover() {
  return (
    <section
      id="current-rover"
      className="section-y scroll-mt-24 border-y border-border bg-subtle"
      aria-labelledby="rover-heading"
    >
      <Container className="space-y-10">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-overline text-primary">{homeCurrentRover.eyebrow}</p>
              <h2 id="rover-heading">{homeCurrentRover.name}</h2>
              <p className="text-body-lg text-muted-foreground">{homeCurrentRover.summary}</p>
            </div>
            <Button asChild variant="primary" className="w-fit">
              <Link href={homeCurrentRover.cta.href}>
                {homeCurrentRover.cta.label}
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {homeCurrentRover.specs.map((spec) => (
              <div key={spec.label} className="rounded-lg border border-border bg-card px-4 py-3">
                <dt className="text-caption text-muted-foreground">{spec.label}</dt>
                <dd className="font-mono text-lg font-semibold tracking-tight">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div>
          <SectionHeading title="Subsystems" titleAs="h3" className="mb-4" />
          <ul className="card-grid">
            {homeCurrentRover.subsystems.map((sub, i) => (
              <Reveal key={sub.href} as="li" delayMs={i * 50}>
                <Link
                  href={sub.href}
                  className="group block h-full rounded-lg focus-visible:outline-none"
                >
                  <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-border-strong motion-reduce:transform-none">
                    <CardHeader className="space-y-2">
                      <Badge tone="accent" className="w-fit">
                        Subsystem
                      </Badge>
                      <CardTitle className="flex items-center justify-between gap-2 text-base">
                        {sub.title}
                        <ArrowUpRight
                          className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </CardTitle>
                      <CardDescription>{sub.blurb}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
