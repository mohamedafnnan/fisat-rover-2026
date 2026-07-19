import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { engineeringCategories } from "@/content/site-content";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const cat = engineeringCategories.find((c) => c.slug === category);
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return buildMetadata({
    title,
    description: cat ? `${title} — ${cat.title}` : title,
    path: `/engineering/${category}/${slug}`,
  });
}

export default async function EngineeringDocPage({ params }: Props) {
  const { category, slug } = await params;
  const cat = engineeringCategories.find((c) => c.slug === category);
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <article className="section-y">
      <Container className="max-w-3xl space-y-6">
        <div className="space-y-3">
          <Badge tone="accent">{cat?.title ?? "Engineering"}</Badge>
          <h1>{title}</h1>
          <p className="text-body-lg text-muted-foreground">
            Document shell ready for CMS body content, file attachments, and version history.
          </p>
        </div>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            This route establishes the engineering docs IA: category → document, with metadata and
            navigation that match the Design System. Payload collections will populate the body,
            authors, and downloadable assets without changing the page composition.
          </p>
          <h2 className="text-foreground">Intended contents</h2>
          <ul className="list-disc space-y-2 ps-5">
            <li>Purpose and scope</li>
            <li>System or process description</li>
            <li>Decisions and open questions</li>
            <li>Links to related tests, CAD, and journal posts</li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link href={`/engineering/${category}`}>Back to {cat?.title ?? "category"}</Link>
          </Button>
          <Button asChild variant="tertiary">
            <Link href="/engineering">Engineering hub</Link>
          </Button>
        </div>
      </Container>
    </article>
  );
}