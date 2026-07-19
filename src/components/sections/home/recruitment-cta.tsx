import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/home/reveal";
import { homeRecruitment } from "@/components/sections/home/content";

export function HomeRecruitmentCta() {
  return (
    <section
      id="recruitment"
      className="section-y scroll-mt-24"
      aria-labelledby="recruitment-heading"
    >
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-12 elevation-2 md:px-12 md:py-16">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,hsl(var(--mars)/0.12),transparent_50%)]"
              aria-hidden
            />
            <div className="relative mx-auto max-w-2xl space-y-6 text-center">
              <p className="text-overline text-primary">{homeRecruitment.eyebrow}</p>
              <h2 id="recruitment-heading" className="text-balance">
                {homeRecruitment.headline}
              </h2>
              <p className="text-body-lg text-muted-foreground">{homeRecruitment.subhead}</p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button asChild variant="hero">
                  <Link href={homeRecruitment.primaryCta.href}>
                    {homeRecruitment.primaryCta.label}
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href={homeRecruitment.secondaryCta.href}>
                    {homeRecruitment.secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
