import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/shared/page-hero";

export const metadata = buildMetadata({
  title: "Privacy",
  description: "Privacy policy for the FISAT Rover Team website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="How we handle information submitted through this site."
        tone="default"
      />
      <section className="section-y">
        <Container className="max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
          <p>
            The FISAT Rover Team website collects information you voluntarily submit through forms
            (contact, applications, newsletter). We use that information only to respond to your
            inquiry or process recruitment and sponsorship requests.
          </p>
          <h2 className="text-foreground">What we collect</h2>
          <ul className="list-disc space-y-2 ps-5">
            <li>Name, email, and message content from forms</li>
            <li>Optional portfolio links and subsystem preferences on applications</li>
            <li>Standard server logs required to operate the site</li>
          </ul>
          <h2 className="text-foreground">What we do not do</h2>
          <ul className="list-disc space-y-2 ps-5">
            <li>Sell personal data</li>
            <li>Use form submissions for unrelated marketing without consent</li>
          </ul>
          <h2 className="text-foreground">Contact</h2>
          <p>
            Privacy questions:{" "}
            <a className="text-primary hover:underline" href="mailto:rover@fisat.ac.in">
              rover@fisat.ac.in
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}