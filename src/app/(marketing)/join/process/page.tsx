import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { FaqList } from "@/components/domain";
import { joinFaqs } from "@/content/site-content";

export const metadata = buildMetadata({
  title: "Recruitment Process",
  description: "Timeline, steps, and FAQ for joining the FISAT Rover Team.",
  path: "/join/process",
});

const steps = [
  {
    title: "Apply",
    detail: "Submit the form with your primary subsystem preference and a short note on what you want to own.",
  },
  {
    title: "Task or conversation",
    detail: "A lightweight take-home or chat with a lead — designed to show how you think, not trick questions.",
  },
  {
    title: "Team fit",
    detail: "Meet the subsystem group, understand cadence, and ask anything about the season.",
  },
  {
    title: "Offer & onboard",
    detail: "Welcome kit, repo access, first design review, and a mentor assignment.",
  },
] as const;

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Recruitment · Process"
        title="Clear steps. No black box."
        description="Typically 2–3 weeks from application to offer. Every stage is designed to respect your time."
        primaryCta={{ label: "Start application", href: "/join/apply" }}
        secondaryCta={{ label: "Open roles", href: "/join/roles" }}
      />

      <section className="section-y" aria-labelledby="steps-heading">
        <Container className="space-y-8">
          <h2 id="steps-heading">How it works</h2>
          <ol className="grid gap-4 md:grid-cols-2">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <p className="text-overline text-primary">Step {i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </li>
            ))}
          </ol>
          <Button asChild variant="primary">
            <Link href="/join/apply">Apply now</Link>
          </Button>
        </Container>
      </section>

      <section className="section-y border-t border-border bg-subtle" aria-labelledby="faq-heading">
        <Container className="max-w-3xl space-y-6">
          <h2 id="faq-heading">FAQ</h2>
          <FaqList items={[...joinFaqs]} />
        </Container>
      </section>

      <CtaBand
        tone="join"
        headline="Questions before you apply?"
        primaryCta={{ label: "Contact", href: "/contact" }}
        secondaryCta={{ label: "Apply", href: "/join/apply" }}
      />
    </>
  );
}