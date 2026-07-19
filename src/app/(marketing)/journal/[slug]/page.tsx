import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { journalPosts } from "@/content/site-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.summary,
    path: `/journal/${post.slug}`,
    type: "article",
  });
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="section-y">
        <Container className="max-w-3xl space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge tone="accent">{post.category}</Badge>
              <time className="text-caption text-muted-foreground" dateTime={post.date}>
                {post.date}
              </time>
            </div>
            <h1>{post.title}</h1>
            <p className="text-body-lg text-muted-foreground">{post.summary}</p>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This build log captures a moment in the Artemis season. Full CMS-authored body
              content will replace this structured narrative once Payload is wired — the route,
              metadata, and reading layout are production-ready now.
            </p>
            <p>
              {post.summary} The team documents decisions so the next batch inherits context, not
              folklore: requirements, trade-offs, test evidence, and open questions.
            </p>
            <h2 className="text-foreground pt-4">What we shipped</h2>
            <ul className="list-disc space-y-2 ps-5">
              <li>Documented design intent and interfaces with adjacent subsystems</li>
              <li>Ran a focused test or field trial with measurable outcomes</li>
              <li>Captured photos and notes for the gallery and sponsor updates</li>
            </ul>
            <h2 className="text-foreground pt-4">What&apos;s next</h2>
            <p>
              Integration milestones continue on the path to competition readiness. Follow more
              posts in the journal, or join a subsystem if you want ownership on the next chapter.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild variant="secondary">
              <Link href="/journal">All posts</Link>
            </Button>
            <Button asChild variant="tertiary">
              <Link href="/join">Join the team</Link>
            </Button>
          </div>
        </Container>
      </article>

      <section className="section-y border-t border-border bg-subtle" aria-labelledby="related-posts">
        <Container className="space-y-6">
          <h2 id="related-posts">Related</h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/journal/${p.slug}`}
                  className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-border-strong"
                >
                  <p className="text-caption text-muted-foreground">{p.category}</p>
                  <p className="mt-1 font-medium tracking-tight">{p.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        tone="join"
        headline="Write the next log from the inside."
        primaryCta={{ label: "Apply", href: "/join/apply" }}
        secondaryCta={{ label: "Journal home", href: "/journal" }}
      />
    </>
  );
}