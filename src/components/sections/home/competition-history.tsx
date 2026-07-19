import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { Reveal } from "@/components/sections/home/reveal";
import { homeCompetitions } from "@/components/sections/home/content";

export function HomeCompetitionHistory() {
  return (
    <section
      id="competition-history"
      className="section-y scroll-mt-24"
      aria-labelledby="competition-heading"
    >
      <Container className="space-y-10">
        <Reveal>
          <SectionHeading
            id="competition-heading"
            eyebrow={homeCompetitions.eyebrow}
            title={homeCompetitions.title}
            body={homeCompetitions.body}
          />
        </Reveal>

        <ol className="relative ms-3 space-y-0 border-s border-border md:ms-4">
          {homeCompetitions.milestones.map((item, i) => (
            <Reveal
              key={item.year}
              as="li"
              delayMs={i * 70}
              className="relative ps-8 pb-10 last:pb-0"
            >
              <span
                className="bg-primary ring-background absolute top-1.5 -start-[5px] size-2.5 rounded-full ring-4"
                aria-hidden
              />
              <div className="flex flex-wrap items-center gap-2">
                <time className="font-mono text-sm font-semibold text-primary" dateTime={item.year}>
                  {item.year}
                </time>
                <Badge tone="neutral">{item.result}</Badge>
              </div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <Button asChild variant="secondary">
            <Link href={homeCompetitions.cta.href}>{homeCompetitions.cta.label}</Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
