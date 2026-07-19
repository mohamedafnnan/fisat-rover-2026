import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PageHeroCta = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "tertiary" | "hero";
};

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: PageHeroCta;
  secondaryCta?: PageHeroCta;
  tone?: "default" | "subtle" | "mars";
  className?: string;
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  tone = "subtle",
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "section-y border-b border-border",
        tone === "subtle" && "bg-subtle",
        tone === "mars" && "bg-[radial-gradient(ellipse_at_top_right,hsl(var(--mars)/0.12),transparent_55%)]",
        className,
      )}
    >
      <Container className="max-w-3xl space-y-5">
        {eyebrow ? <Badge tone={tone === "mars" ? "mars" : "accent"}>{eyebrow}</Badge> : null}
        <h1 className="text-balance">{title}</h1>
        {description ? (
          <p className="text-body-lg text-muted-foreground">{description}</p>
        ) : null}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap gap-3 pt-1">
            {primaryCta ? (
              <Button asChild variant={primaryCta.variant ?? "primary"}>
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button asChild variant={secondaryCta.variant ?? "secondary"}>
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
