import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { openRoles } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Open Roles",
  description: "FISAT Rover Team open roles by subsystem.",
  path: "/join/roles",
});

export default function RolesPage() {
  return (
    <>
      <PageHero
        eyebrow="Recruitment · Roles"
        title="Roles by subsystem"
        description="Filter by interest, then apply. Closed roles still accept notify-me interest via the application form."
        primaryCta={{ label: "Apply", href: "/join/apply" }}
        secondaryCta={{ label: "Process", href: "/join/process" }}
      />

      <section className="section-y" aria-labelledby="roles-heading">
        <Container className="space-y-4">
          <h2 id="roles-heading" className="sr-only">
            Role listings
          </h2>
          <ul className="space-y-3">
            {openRoles.map((role) => (
              <li key={role.title}>
                <article className="flex flex-col gap-3 rounded-xl border border-border bg-card px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold tracking-tight">{role.title}</h3>
                      <Badge tone={role.status === "open" ? "success" : "neutral"}>
                        {role.status === "open" ? "Open" : "Closed"}
                      </Badge>
                      <Badge tone="accent">{role.subsystem}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{role.summary}</p>
                  </div>
                  <Button
                    asChild
                    variant={role.status === "open" ? "primary" : "secondary"}
                    className="shrink-0"
                  >
                    <Link href="/join/apply">
                      {role.status === "open" ? "Apply" : "Get notified"}
                    </Link>
                  </Button>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        tone="join"
        headline="Don't see a perfect fit?"
        subhead="Tell us your strengths — we place people where impact is highest."
        primaryCta={{ label: "General application", href: "/join/apply" }}
        secondaryCta={{ label: "FAQ", href: "/join" }}
      />
    </>
  );
}
