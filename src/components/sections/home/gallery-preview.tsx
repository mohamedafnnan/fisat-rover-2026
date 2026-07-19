import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/home/section-heading";
import { Reveal } from "@/components/sections/home/reveal";
import { homeGallery } from "@/components/sections/home/content";
import { cn } from "@/lib/utils";

const gradients = [
  "from-sky-900/80 via-slate-800 to-amber-900/50",
  "from-stone-800 via-orange-950/60 to-stone-900",
  "from-cyan-950 via-slate-900 to-blue-900/70",
  "from-amber-950 via-stone-900 to-rose-950/40",
  "from-emerald-950 via-slate-900 to-sky-950",
  "from-violet-950 via-slate-900 to-orange-950/50",
];

export function HomeGalleryPreview() {
  return (
    <section
      id="gallery-preview"
      className="section-y scroll-mt-24 border-y border-border bg-subtle"
      aria-labelledby="gallery-heading"
    >
      <Container className="space-y-10">
        <Reveal>
          <SectionHeading
            id="gallery-heading"
            eyebrow={homeGallery.eyebrow}
            title={homeGallery.title}
            body={homeGallery.body}
          />
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {homeGallery.items.map((item, i) => (
            <Reveal key={item.id} as="li" delayMs={i * 45}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none",
                    gradients[i % gradients.length],
                  )}
                  role="img"
                  aria-label={item.alt}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-caption font-medium text-white">{item.label}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Button asChild variant="secondary">
            <Link href={homeGallery.cta.href}>{homeGallery.cta.label}</Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
