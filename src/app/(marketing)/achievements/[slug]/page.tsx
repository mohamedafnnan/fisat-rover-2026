import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { achievements } from "@/content/site-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return achievements.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = achievements.find((a) => a.slug === slug);
  if (!item) return {};
  return buildMetadata({
    title: item.title,
    description: item.detail,
    path: `/achievements/${item.slug}`,
  });
}

export default async function AchievementDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = achievements.find((a) => a.slug === slug);
  if (!item) notFound();

  return (
    <>
      <article className="section-y">
        <Container className="max-w-3xl space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge tone="mars">{item.result}</Badge>
              <time className="text-caption text-muted-foreground" dateTime={item.year}>
                {item.year}
              </time>
            </div>
            <h1>{item.title}</h1>
            <p className="text-body-lg text-muted-foreground">{item.detail}</p>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This recap summarizes the season outcome and the engineering lessons carried into the
              next platform. Full media kits and judge-facing packets will attach here via CMS.
            </p>
            <h2 className="text-foreground">Highlights</h2>
            <ul className="list-disc space-y-2 ps-5">
              <li>Documented system performance against mission objectives</li>
              <li>Cross-subsystem integration under competition constraints</li>
              <li>Retrospective actions folded into Artemis planning</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/achievements">All achievements</Link>
            </Button>
            <Button asChild variant="tertiary">
              <Link href="/rover/archive">Rover archive</Link>
            </Button>
          </div>
        </Container>
      </article>
      <CtaBand
        tone="sponsor"
        headline="Back the next result."
        primaryCta={{ label: "Sponsor", href: "/sponsors" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />
    </>
  );
}