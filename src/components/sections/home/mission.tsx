import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { Reveal } from "@/components/sections/home/reveal";
import { homeMission } from "@/components/sections/home/content";

export function HomeMission() {
  return (
    <section id="mission" className="section-y scroll-mt-24" aria-labelledby="mission-heading">
      <Container className="space-y-10">
        <Reveal>
          <SectionHeading
            id="mission-heading"
            eyebrow={homeMission.eyebrow}
            title={homeMission.title}
            body={homeMission.body}
          />
        </Reveal>

        <ul className="grid gap-4 md:grid-cols-3">
          {homeMission.values.map((value, i) => (
            <Reveal key={value.title} as="li" delayMs={i * 80}>
              <Card className="h-full transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transform-none">
                <CardHeader>
                  <CardTitle className="text-base">{value.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Button asChild variant="secondary">
            <Link href={homeMission.cta.href}>{homeMission.cta.label}</Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
