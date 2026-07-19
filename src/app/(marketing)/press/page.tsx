import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/shared/page-hero";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { galleryItems } from "@/content/site-content";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Press / Media Kit",
  description: "Brand assets, gallery, fact sheet, and press contact for FISAT Rover Team.",
  path: "/press",
});

const gradients = [
  "from-sky-900/80 via-slate-800 to-amber-900/50",
  "from-stone-800 via-orange-950/60 to-stone-900",
  "from-cyan-950 via-slate-900 to-blue-900/70",
  "from-amber-950 via-stone-900 to-rose-950/40",
  "from-emerald-950 via-slate-900 to-sky-950",
  "from-violet-950 via-slate-900 to-orange-950/50",
  "from-rose-950 via-stone-900 to-sky-950",
  "from-lime-950 via-slate-900 to-amber-950",
];

/** Product "Gallery" maps to Press / media + visual archive. */
export default function PressPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery · Press"
        title="Media kit & visual archive"
        description="Brand-ready facts, gallery previews, and press contact. High-resolution assets live in Google Drive for partners."
        primaryCta={{ label: "Press contact", href: "/contact" }}
        secondaryCta={{ label: "Achievements", href: "/achievements" }}
      />

      <section className="section-y" aria-labelledby="facts-heading">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 id="facts-heading">Fact sheet</h2>
            <dl className="space-y-3 text-sm">
              {[
                ["Team", "FISAT Rover Team"],
                ["Institution", "FISAT, Angamaly, Kerala"],
                ["Current rover", "Artemis (2026)"],
                ["Focus", "University rover competition systems"],
                ["Site", "https://fisatrover.in"],
                ["Press email", "press@fisatrover.in"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 border-b border-border pb-3">
                  <dt className="w-32 shrink-0 text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="secondary">
              <Link href="/contact">Request full kit</Link>
            </Button>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-semibold">Brand usage</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Logos and wordmarks are available to media and sponsors on request. Do not alter
              proportions or recolor outside approved tokens. For Base Camp or 3D assets, contact
              press for licensed stills.
            </p>
            <ul className="list-disc space-y-1 ps-5 text-sm text-muted-foreground">
              <li>Primary mark + mono variants</li>
              <li>Team photography guidelines</li>
              <li>Boilerplate paragraph</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="section-y border-y border-border bg-subtle" aria-labelledby="gallery-heading">
        <Container className="space-y-8">
          <h2 id="gallery-heading">Gallery</h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {galleryItems.map((item, i) => (
              <li key={item.id}>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none",
                      gradients[i % gradients.length],
                    )}
                    role="img"
                    aria-label={item.alt}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-caption font-medium text-white">{item.label}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            High-resolution originals are stored in the team Google Drive assets folder for approved partners.
          </p>
        </Container>
      </section>

      <CtaBand
        tone="dual"
        headline="Need assets or an interview?"
        primaryCta={{ label: "Contact press", href: "/contact" }}
        secondaryCta={{ label: "Home", href: "/" }}
      />
    </>
  );
}