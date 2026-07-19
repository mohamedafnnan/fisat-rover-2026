import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PagePlaceholderProps = {
  title: string;
  description: string;
  path: string;
};

/**
 * Temporary shell for routes that exist in the IA but have no content yet.
 * Keeps navigation, SEO, and layout valid during foundation milestone.
 */
export function PagePlaceholder({ title, description, path }: PagePlaceholderProps) {
  return (
    <section className="section-y">
      <Container className="max-w-3xl space-y-4">
        <Badge tone="neutral">Route ready · content next</Badge>
        <h1>{title}</h1>
        <p className="text-body-lg text-muted-foreground">{description}</p>
        <p className="text-caption text-muted-foreground font-mono">{path}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild variant="secondary">
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild variant="primary">
            <Link href="/join">Join</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
