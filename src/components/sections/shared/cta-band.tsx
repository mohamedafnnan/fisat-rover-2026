import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Cta = { label: string; href: string };

type CtaBandProps = {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  tone?: "join" | "sponsor" | "dual" | "docs";
  className?: string;
};

export function CtaBand({
  eyebrow,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  tone = "dual",
  className,
}: CtaBandProps) {
  return (
    <section className={cn("section-y", className)} aria-labelledby="cta-band-heading">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-12 elevation-2 md:px-12 md:py-14">
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              tone === "sponsor" &&
                "bg-[radial-gradient(ellipse_at_top_right,hsl(var(--mars)/0.16),transparent_55%)]",
              tone !== "sponsor" &&
                "bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.16),transparent_55%)]",
            )}
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl space-y-5 text-center">
            {eyebrow ? <p className="text-overline text-primary">{eyebrow}</p> : null}
            <h2 id="cta-band-heading" className="text-balance">
              {headline}
            </h2>
            {subhead ? <p className="text-body-lg text-muted-foreground">{subhead}</p> : null}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Button asChild variant="hero">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              {secondaryCta ? (
                <Button asChild variant="secondary" size="lg">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
