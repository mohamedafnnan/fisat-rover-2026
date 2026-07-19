import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/shared/page-hero";

export const metadata = buildMetadata({
  title: "Terms",
  description: "Terms of use for the FISAT Rover Team website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        description="Ground rules for using fisatrover.in and related materials."
        tone="default"
      />
      <section className="section-y">
        <Container className="max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
          <p>
            By using this website you agree to use content responsibly. Team branding, photography,
            and technical documents remain the property of FISAT Rover Team unless explicitly
            released under another license.
          </p>
          <h2 className="text-foreground">Content</h2>
          <p>
            Information is provided for education, recruitment, sponsorship, and press. We strive
            for accuracy but make no warranties about completeness of competition results or
            specifications published as drafts.
          </p>
          <h2 className="text-foreground">Interactive experiences</h2>
          <p>
            Base Camp and other 3D experiences are optional progressive enhancements. The 2D site
            remains the authoritative source for content and accessibility.
          </p>
          <h2 className="text-foreground">Contact</h2>
          <p>
            <a className="text-primary hover:underline" href="mailto:rover@fisat.ac.in">
              rover@fisat.ac.in
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}